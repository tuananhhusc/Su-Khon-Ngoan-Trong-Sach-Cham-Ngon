"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Type, Printer } from "lucide-react";

export default function ReadingToolbar() {
  const [isNightMode, setIsNightMode] = useState(false);

  useEffect(() => {
    // Check local storage for theme preference
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "night") {
      setIsNightMode(true);
      document.documentElement.classList.add("theme-night");
    }
  }, []);

  const toggleTheme = () => {
    if (isNightMode) {
      document.documentElement.classList.remove("theme-night");
      localStorage.setItem("theme", "day");
      setIsNightMode(false);
    } else {
      document.documentElement.classList.add("theme-night");
      localStorage.setItem("theme", "night");
      setIsNightMode(true);
    }
  };

  const increaseFontSize = () => {
    const html = document.documentElement;
    const currentSize = parseFloat(getComputedStyle(html).fontSize);
    html.style.fontSize = `${currentSize + 1}px`;
  };

  const decreaseFontSize = () => {
    const html = document.documentElement;
    const currentSize = parseFloat(getComputedStyle(html).fontSize);
    html.style.fontSize = `${currentSize - 1}px`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="reading-toolbar flex items-center gap-1 sm:gap-3">
      <div className="flex items-center rounded-lg border border-[var(--gold-dim)] bg-[var(--background)] px-1 py-0.5 shadow-sm transition-all hover:border-[var(--gold)]">
        <button
          onClick={decreaseFontSize}
          className="px-2 py-1 text-[var(--ink-muted)] transition-colors hover:text-[var(--deep-red)] flex items-center justify-center"
          aria-label="Giảm kích thước chữ"
          title="Thu nhỏ chữ"
        >
          <span className="font-serif text-sm font-medium leading-none">A−</span>
        </button>
        <div className="h-4 w-px bg-[var(--gold-dim)]" />
        <button
          onClick={increaseFontSize}
          className="px-2 py-1 text-[var(--ink-muted)] transition-colors hover:text-[var(--deep-red)] flex items-center justify-center"
          aria-label="Tăng kích thước chữ"
          title="Phóng to chữ"
        >
          <span className="font-serif text-lg font-medium leading-none">A+</span>
        </button>
      </div>

      <button
        onClick={toggleTheme}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--gold-dim)] bg-[var(--background)] text-[var(--ink-muted)] shadow-sm transition-colors hover:text-[var(--gold)]"
        aria-label="Chuyển đổi giao diện Sáng/Tối"
        title="Giao diện Sáng / Tối"
      >
        {isNightMode ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      <button
        onClick={handlePrint}
        className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full border border-[var(--gold-dim)] bg-[var(--background)] text-[var(--ink-muted)] shadow-sm transition-colors hover:text-[var(--deep-red)]"
        aria-label="In tài liệu"
        title="In bài nghiên cứu"
      >
        <Printer size={16} />
      </button>
    </div>
  );
}
