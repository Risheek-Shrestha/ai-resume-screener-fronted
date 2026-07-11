import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, BriefcaseBusiness, CheckCheck, ClipboardCheck, Loader2, Trash2 } from "lucide-react";

import useAuth from "../../hooks/useAuth";
import { formatDateTime } from "../../utils/date";
import {
    getNotifications,
    getUnreadCount,
    markAllNotificationsRead,
    markNotificationRead,
    clearAllNotifications,
} from "../../services/notificationService";
import type { NotificationResponse } from "../../types/notification";

const POLL_INTERVAL_MS = 30_000;

function iconFor(type: NotificationResponse["type"]) {
    if (type === "APPLICATION_STATUS_CHANGED") return ClipboardCheck;
    return BriefcaseBusiness;
}

function NotificationBell() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [clearing, setClearing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const panelRef = useRef<HTMLDivElement>(null);

    // Poll unread count so the badge stays fresh even when the dropdown is closed.
    useEffect(() => {
        if (!isAuthenticated) return;

        let cancelled = false;

        const poll = async () => {
            try {
                const count = await getUnreadCount();
                if (!cancelled) setUnreadCount(count);
            } catch {
                // Silently ignore — the bell just won't show a badge until the
                // next successful poll.
            }
        };

        poll();
        const interval = setInterval(poll, POLL_INTERVAL_MS);

        return () => {
            cancelled = true;
            clearInterval(interval);
        };
    }, [isAuthenticated]);

    // Load the feed when the dropdown is opened.
    useEffect(() => {
        if (!open) return;

        let cancelled = false;

        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getNotifications(0, 10);
                if (!cancelled) {
                    setNotifications(Array.isArray(data?.content) ? data.content : []);
                }
            } catch {
                if (!cancelled) setError("Couldn't load notifications.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();

        return () => {
            cancelled = true;
        };
    }, [open]);

    // Close on outside click.
    useEffect(() => {
        if (!open) return;

        function handleClick(e: MouseEvent) {
            if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    if (!isAuthenticated) return null;

    async function handleNotificationClick(notification: NotificationResponse) {
        if (!notification.read) {
            setNotifications((prev) =>
                prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
            );
            setUnreadCount((c) => Math.max(0, c - 1));
            markNotificationRead(notification.id).catch(() => {
                // Best-effort — worst case it shows as read locally only.
            });
        }

        setOpen(false);

        if (notification.type === "APPLICATION_STATUS_CHANGED") {
            navigate("/applications");
        } else if (notification.jobId) {
            navigate(`/jobs/${notification.jobId}`);
        }
    }

    async function handleMarkAllRead() {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        setUnreadCount(0);
        try {
            await markAllNotificationsRead();
        } catch {
            // Best-effort.
        }
    }

    async function handleClearAll() {
        const previous = notifications;
        setClearing(true);
        setNotifications([]);
        setUnreadCount(0);
        try {
            await clearAllNotifications();
        } catch {
            // Roll back on failure so the user isn't left thinking it worked.
            setNotifications(previous);
            setError("Couldn't clear notifications.");
        } finally {
            setClearing(false);
        }
    }

    return (
        <div className="relative" ref={panelRef}>
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label="Notifications"
                aria-expanded={open}
                className="relative rounded-xl border border-slate-800 bg-slate-900/60 p-2.5 text-slate-300 transition hover:border-cyan-500 hover:text-cyan-400"
            >
                <Bell size={18} />
                {unreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-cyan-500 px-1 text-[10px] font-bold text-slate-950">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 z-50 mt-2 w-80 rounded-2xl border border-slate-800 bg-slate-900/95 shadow-2xl shadow-black/40 backdrop-blur-lg sm:w-96">

                    <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
                        <p className="text-sm font-semibold text-white">Notifications</p>

                        <div className="flex items-center gap-3">
                            {notifications.some((n) => !n.read) && (
                                <button
                                    type="button"
                                    onClick={handleMarkAllRead}
                                    className="inline-flex items-center gap-1 text-xs font-medium text-cyan-400 hover:text-cyan-300"
                                >
                                    <CheckCheck size={13} />
                                    Mark all read
                                </button>
                            )}

                            {notifications.length > 0 && (
                                <button
                                    type="button"
                                    onClick={handleClearAll}
                                    disabled={clearing}
                                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-red-400 disabled:opacity-50"
                                >
                                    <Trash2 size={13} />
                                    Clear all
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="max-h-96 overflow-y-auto">

                        {loading && (
                            <div className="flex items-center justify-center gap-2 py-8 text-sm text-slate-500">
                                <Loader2 size={16} className="animate-spin" />
                                Loading...
                            </div>
                        )}

                        {!loading && error && (
                            <p className="px-4 py-8 text-center text-sm text-red-400">{error}</p>
                        )}

                        {!loading && !error && notifications.length === 0 && (
                            <p className="px-4 py-8 text-center text-sm text-slate-500">
                                You're all caught up.
                            </p>
                        )}

                        {!loading && !error && notifications.map((notification) => {
                            const Icon = iconFor(notification.type);
                            return (
                                <button
                                    key={notification.id}
                                    type="button"
                                    onClick={() => handleNotificationClick(notification)}
                                    className={`flex w-full items-start gap-3 border-b border-slate-800/60 px-4 py-3 text-left transition last:border-b-0 hover:bg-slate-800/50 ${
                                        notification.read ? "opacity-60" : ""
                                    }`}
                                >
                                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                                        <Icon size={16} />
                                    </span>

                                    <span className="flex-1">
                                        <span className="block text-sm font-medium text-slate-100">
                                            {notification.title}
                                        </span>
                                        <span className="mt-0.5 block text-xs text-slate-400">
                                            {notification.message}
                                        </span>
                                        <span className="mt-1 block text-[11px] text-slate-500">
                                            {formatDateTime(notification.createdAt)}
                                        </span>
                                    </span>

                                    {!notification.read && (
                                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                                    )}
                                </button>
                            );
                        })}

                    </div>

                </div>
            )}
        </div>
    );
}

export default NotificationBell;