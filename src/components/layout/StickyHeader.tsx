"use client";

import { useEffect, useState } from "react";
import ReadingProgressBar from "./ReadingProgressBar";
import ReadingToolbar from "./ReadingToolbar";

export default function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <ReadingProgressBar />
      <header
        className={`sticky-header ${scrolled ? "scrolled" : ""}`}
        id="sticky-header"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between sm:h-16">
            {/* Cross ornament & Title */}
            <div className="flex items-center gap-3">
              <span
                className="text-lg text-gold select-none"
                aria-hidden="true"
              >
                ✦
              </span>
              <span
                className="font-serif text-sm font-semibold tracking-wide text-ink sm:text-base lg:text-lg"
                style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                Sách Châm Ngôn
              </span>
            </div>

            {/* Reading Toolbar (Font Size, Theme, Print) */}
            <ReadingToolbar />
          </div>
        </div>
      </header>
    </>
  );
}
