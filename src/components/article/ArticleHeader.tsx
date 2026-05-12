export default function ArticleHeader() {
  return (
    <header className="article-hero animate-fade-in-up">
      <div className="mb-4">
        <span
          className="inline-block rounded-full border px-3 py-1 font-sans text-xs font-medium uppercase tracking-widest"
          style={{
            fontFamily: "var(--font-be-vietnam), Be Vietnam Pro, sans-serif",
            borderColor: "var(--gold)",
            color: "var(--gold)",
            backgroundColor: "var(--gold-dim)",
          }}
        >
          Báo Cáo Nghiên Cứu Chuyên Sâu
        </span>
      </div>

      <h1>
        Sự Khôn Ngoan Trong Sách Châm Ngôn
      </h1>

      <p className="subtitle">
        Báo cáo Nghiên cứu Chuyên sâu — Kinh Thánh Cựu Ước
      </p>

      <div
        className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-4 text-xs sm:gap-6"
        style={{
          fontFamily: "var(--font-be-vietnam), Be Vietnam Pro, sans-serif",
          color: "var(--ink-muted)",
        }}
      >
        <span className="flex items-center gap-1.5">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          10 Phần
        </span>
        <span className="flex items-center gap-1.5">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          ~35 phút đọc
        </span>
        <span className="flex items-center gap-1.5">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          58 Trích dẫn
        </span>
      </div>
    </header>
  );
}
