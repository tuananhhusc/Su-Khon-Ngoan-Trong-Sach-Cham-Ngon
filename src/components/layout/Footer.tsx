export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--gold-dim)] bg-[var(--background)] py-12 text-center">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-6 flex justify-center">
          <div className="h-px w-12 bg-[var(--gold)]" />
          <span className="mx-4 text-[var(--gold)]">✦</span>
          <div className="h-px w-12 bg-[var(--gold)]" />
        </div>
        
        <h2 className="font-serif text-lg font-bold tracking-tight text-[var(--ink)]">
          SỰ KHÔN NGOAN TRONG SÁCH CHÂM NGÔN
        </h2>
        
        <p className="mt-4 font-sans text-sm leading-relaxed text-[var(--ink-light)] max-w-2xl mx-auto">
          Nền tảng nghiên cứu học thuật chuyên sâu về các bản văn khôn ngoan, 
          nhằm khám phá vẻ đẹp thần học và giá trị đạo đức trường tồn của Kinh Thánh.
        </p>
        
        <div className="mt-8 flex flex-col items-center justify-center gap-4 text-xs font-sans text-[var(--ink-muted)] sm:flex-row sm:gap-8">
          <span>© 2026 Nghiên cứu Kinh Thánh</span>
          <span className="hidden sm:inline">•</span>
          <span>Dự án Phi lợi nhuận</span>
          <span className="hidden sm:inline">•</span>
          <span>Tài liệu tham khảo học thuật</span>
        </div>
        
        <p className="mt-6 font-serif text-[10px] italic opacity-40 uppercase tracking-[0.2em]">
          Ad Maiorem Dei Gloriam
        </p>
      </div>
    </footer>
  );
}
