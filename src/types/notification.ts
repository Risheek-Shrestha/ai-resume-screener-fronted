// Notification types for the in-app / push notification center.
//
// NOTE: These mirror the events the backend already emails out via
// MailService / NotificationListener (see ApplicationNotificationEvent.java):
//   - JOB_POSTED           -> a new job was posted (broadcast to all users)
//   - JOB_OPEN_FOR_APPLY   -> a job opened for applications (broadcast to all users)
//   - APPLICATION_STATUS_CHANGED -> a candidate's application status changed
//                                    (sent only to the related user)
//
// The backend currently only sends these as emails. For this frontend
// feature to work end-to-end, the backend needs a small addition: persist
// each event and expose it over REST/WebSocket, e.g.
//   GET   /api/v1/notifications            (paged, current user's feed)
//   GET   /api/v1/notifications/unread-count
//   PUT   /api/v1/notifications/{id}/read
//   PUT   /api/v1/notifications/read-all
// This file assumes that contract so the frontend is ready to wire up as
// soon as those endpoints exist.

export type NotificationType =
    | "JOB_POSTED"
    | "JOB_OPEN_FOR_APPLY"
    | "APPLICATION_STATUS_CHANGED";

export interface NotificationResponse {
    id: number;
    type: NotificationType;
    title: string;
    message: string;
    jobId?: number | null;
    applicationId?: number | null;
    read: boolean;
    createdAt: string;
}

export interface NotificationPageResponse {
    content: NotificationResponse[];
    totalPages: number;
    totalElements: number;
    number: number;
}
