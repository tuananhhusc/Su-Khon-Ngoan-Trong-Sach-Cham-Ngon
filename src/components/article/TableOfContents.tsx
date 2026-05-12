"use client";

import { useEffect, useState, useCallback } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TocItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Find the first visible heading
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        setActiveId(visibleEntries[0].target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-80px 0px -70% 0px",
      threshold: 0,
    });

    // Observe all heading elements
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setActiveId(id);
        setIsOpen(false);
      }
    },
    []
  );

  if (headings.length === 0) return null;

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all hover:scale-105 lg:hidden"
        style={{
          background: "var(--ink)",
          color: "var(--gold-light)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          border: "1px solid var(--gold-dim)"
        }}
        aria-label="Mục lục"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar TOC */}
      <nav
        className={
          isOpen
            ? "fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] translate-x-0 overflow-y-auto bg-[var(--background)] p-6 shadow-2xl transition-transform lg:static lg:w-auto lg:translate-x-0 lg:shadow-none lg:p-0"
            : "hidden lg:block toc-sidebar"
        }
        aria-label="Mục lục bài viết"
      >
        {/* Mobile close button */}
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="mb-4 flex items-center gap-2 text-sm lg:hidden"
            style={{
              fontFamily: "var(--font-be-vietnam), Be Vietnam Pro, sans-serif",
              color: "var(--ink-muted)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Đóng
          </button>
        )}

        <div className="mb-4">
          <h2
            className="text-xs font-semibold uppercase tracking-widest"
            style={{
              fontFamily: "var(--font-be-vietnam), Be Vietnam Pro, sans-serif",
              color: "var(--gold)",
              letterSpacing: "0.12em",
            }}
          >
            ✦ Mục lục
          </h2>
          <div
            className="mt-2 h-px w-8"
            style={{ background: "var(--gold)" }}
          />
        </div>

        <ul className="space-y-0.5">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`toc-link ${
                  heading.level === 3 ? "toc-h3" : ""
                } ${activeId === heading.id ? "active" : ""}`}
              >
                {heading.level === 2
                  ? heading.text.replace(/^Phần \d+:\s*/, "")
                  : heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
