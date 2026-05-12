import StickyHeader from "@/components/layout/StickyHeader";
import Footer from "@/components/layout/Footer";
import ArticleHeader from "@/components/article/ArticleHeader";
import ArticleBody from "@/components/article/ArticleBody";
import TableOfContents from "@/components/article/TableOfContents";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { extractHeadings, getArticleContent } from "@/lib/getContent";

export default function HomePage() {
  const content = getArticleContent();
  const headings = extractHeadings(content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "headline": "Sự Khôn Ngoan Trong Sách Châm Ngôn",
    "datePublished": "2026-05-12",
    "author": {
      "@type": "Person",
      "name": "Văn chương Khôn ngoan"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Nghiên cứu Kinh Thánh"
    },
    "description": "Báo cáo nghiên cứu hàn lâm chuyên sâu về Sách Châm Ngôn trong Kinh Thánh Cựu Ước, phân tích ngôn ngữ học, thần học và đạo đức học."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StickyHeader />

      <ArticleHeader />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col gap-10 pb-16 pt-4 lg:flex-row lg:gap-12">
          {/* Sidebar TOC - Desktop */}
          <aside className="hidden w-64 shrink-0 lg:block print:hidden">
            <TableOfContents headings={headings} />
          </aside>

          {/* Main article content */}
          <main className="min-w-0 flex-1">
            <ArticleBody />
          </main>
        </div>
      </div>

      {/* Mobile TOC (renders its own fixed-position elements) */}
      <div className="lg:hidden print:hidden">
        <TableOfContents headings={headings} />
      </div>

      <ScrollToTop />
      <Footer />
    </>
  );
}
