"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <div
          className="mx-auto mb-4 text-4xl"
          style={{ color: "var(--deep-red)" }}
        >
          ✦
        </div>
        <h2
          className="mb-2 text-xl font-semibold"
          style={{
            fontFamily: "var(--font-lora), Georgia, serif",
            color: "var(--ink)",
          }}
        >
          Đã xảy ra lỗi
        </h2>
        <p
          className="mb-6 text-sm"
          style={{
            fontFamily: "var(--font-be-vietnam), Be Vietnam Pro, sans-serif",
            color: "var(--ink-muted)",
          }}
        >
          {error.message || "Không thể tải nội dung bài nghiên cứu."}
        </p>
        <button
          onClick={reset}
          className="rounded-md px-6 py-2.5 text-sm font-medium transition-colors"
          style={{
            fontFamily: "var(--font-be-vietnam), Be Vietnam Pro, sans-serif",
            backgroundColor: "var(--deep-red)",
            color: "var(--parchment)",
          }}
        >
          Thử lại
        </button>
      </div>
    </div>
  );
}
