export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div
          className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-t-transparent"
          style={{ borderColor: "var(--gold)", borderTopColor: "transparent" }}
        />
        <p
          className="text-sm"
          style={{
            fontFamily: "var(--font-be-vietnam), Be Vietnam Pro, sans-serif",
            color: "var(--ink-muted)",
          }}
        >
          Đang tải bài nghiên cứu...
        </p>
      </div>
    </div>
  );
}
