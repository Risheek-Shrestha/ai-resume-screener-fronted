import { useEffect } from "react";

interface SeoProps {
    title: string;
    description: string;
    path?: string;
    noindex?: boolean;
    image?: string;
}

const SITE_NAME = "AI Resume Screener";
const SITE_URL = "https://ai-resume-screener-fronted-three.vercel.app";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

function setMetaByName(name: string, content: string) {
    let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
    if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
}

function setMetaByProperty(property: string, content: string) {
    let tag = document.querySelector<HTMLMetaElement>(
        `meta[property="${property}"]`
    );
    if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
}

function setCanonical(href: string) {
    let tag = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!tag) {
        tag = document.createElement("link");
        tag.setAttribute("rel", "canonical");
        document.head.appendChild(tag);
    }
    tag.setAttribute("href", href);
}

/**
 * Drop <Seo /> at the top of any public/route-level page component to set
 * document title + meta description + Open Graph/Twitter tags + canonical
 * URL for that route. For gated pages (dashboard, admin, etc.) pass
 * noindex to keep them out of search results even if a bot ever reaches them.
 */
function Seo({ title, description, path = "/", noindex = false, image }: SeoProps) {
    useEffect(() => {
        const fullTitle = title.includes(SITE_NAME)
            ? title
            : `${title} | ${SITE_NAME}`;
        const url = `${SITE_URL}${path}`;
        const ogImage = image ?? DEFAULT_IMAGE;

        document.title = fullTitle;

        setMetaByName("description", description);
        setMetaByName("robots", noindex ? "noindex, nofollow" : "index, follow");

        setMetaByProperty("og:title", fullTitle);
        setMetaByProperty("og:description", description);
        setMetaByProperty("og:url", url);
        setMetaByProperty("og:image", ogImage);

        setMetaByName("twitter:title", fullTitle);
        setMetaByName("twitter:description", description);
        setMetaByName("twitter:url", url);
        setMetaByName("twitter:image", ogImage);

        setCanonical(url);
    }, [title, description, path, noindex, image]);

    return null;
}

export default Seo;
