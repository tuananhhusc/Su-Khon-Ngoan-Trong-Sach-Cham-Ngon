import Image from "next/image";
import { getArticleContent, slugify } from "@/lib/getContent";

interface ContentBlock {
  type: "h2" | "h3" | "paragraph" | "table" | "references-header" | "reference-item" | "divider";
  content: string;
  id?: string;
  rows?: string[][];
  headers?: string[];
  isFirstParagraph?: boolean;
  refNumber?: number;
}

interface ParsedArticle {
  blocks: ContentBlock[];
  footnotes: Record<string, string>;
}

function parseContent(raw: string): ParsedArticle {
  const lines = raw.split(/\r?\n/);
  const blocks: ContentBlock[] = [];
  const footnotes: Record<string, string> = {};
  
  let i = 0;
  let lastH2 = false;
  let inReferences = false;
  let refIndex = 1;
  
  i = 1; // Skip main title
  
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i++; continue; }
    
    if (line === "Nguồn trích dẫn") {
      blocks.push({ type: "divider", content: "" });
      blocks.push({ type: "references-header", content: line, id: slugify(line) });
      inReferences = true;
      i++;
      continue;
    }
    
    if (inReferences) {
      blocks.push({ type: "reference-item", content: line, id: `ref-${refIndex}`, refNumber: refIndex });
      
      // Store footnote text for tooltip (clean up URLs for tooltip)
      const cleanRef = line.replace(/https?:\/\/[^\s,]+/, '').trim();
      footnotes[refIndex.toString()] = cleanRef || line;
      
      refIndex++;
      i++;
      continue;
    }
    
    const sectionMatch = line.match(/^Phần \d+:.+$/);
    if (sectionMatch) {
      if (blocks.length > 0) blocks.push({ type: "divider", content: "" });
      blocks.push({ type: "h2", content: line, id: slugify(line) });
      lastH2 = true;
      i++;
      continue;
    }
    
    const subMatch = line.match(/^\d+\.\d+\..+$/);
    if (subMatch) {
      blocks.push({ type: "h3", content: line, id: slugify(line) });
      lastH2 = true;
      i++;
      continue;
    }
    
    const knownSubHeaders = [
      "Cơ sở Ngôn ngữ và Thần học của Tính nữ",
      "Vai trò của Quý bà Khôn ngoan trong Trật tự Vũ trụ",
      "Ba Nguyên mẫu (Archetypes) của Quý bà Khôn ngoan",
      "Quản trị Kinh doanh và Đạo đức Tổ chức (Organizational Leadership)",
      "Tâm lý học Nhận thức, Trị liệu Hành vi và Paremiology",
      "Đỉnh cao Cơ Đốc học",
    ];
    
    if (knownSubHeaders.some(h => line.startsWith(h))) {
      blocks.push({ type: "h3", content: line, id: slugify(line) });
      lastH2 = true;
      i++;
      continue;
    }
    
    if (isTableStart(line, lines, i)) {
      const tableResult = parseTable(lines, i);
      if (tableResult) {
        blocks.push(tableResult.block);
        i = tableResult.nextIndex;
        continue;
      }
    }
    
    blocks.push({ type: "paragraph", content: line, isFirstParagraph: lastH2 });
    lastH2 = false;
    i++;
  }
  
  return { blocks, footnotes };
}

function isTableStart(line: string, lines: string[], index: number): boolean {
  return ["Bản dịch tiếng Việt", "Khía cạnh So sánh", "Lĩnh vực Đạo đức"].some(h => line.startsWith(h));
}

function parseTable(lines: string[], startIndex: number): { block: ContentBlock; nextIndex: number } | null {
  const firstLine = lines[startIndex].trim();
  if (firstLine.startsWith("Bản dịch tiếng Việt")) return parseTranslationTable(lines, startIndex);
  else if (firstLine.startsWith("Khía cạnh So sánh")) return parseComparisonTable(lines, startIndex);
  else if (firstLine.startsWith("Lĩnh vực Đạo đức")) return parseVirtueTable(lines, startIndex);
  return null;
}

function parseTranslationTable(lines: string[], start: number): { block: ContentBlock; nextIndex: number } {
  const headers = ["Bản dịch tiếng Việt", "Châm ngôn 14:16", "Châm ngôn 14:17", "Châm ngôn 14:18"];
  const rows: string[][] = [];
  let i = start + 4; 
  
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i++; continue; }
    if (line.startsWith("Qua sự so sánh") || line.startsWith("Phần")) break;
    
    if (line.startsWith("Bản Truyền Thống") || line.startsWith("Bản Dịch Mới") || line.startsWith("Bản Phổ Thông") || line.startsWith("Bản Diễn Ý")) {
      const row: string[] = [line];
      let j = i + 1;
      let cellCount = 0;
      while (j < lines.length && cellCount < 3) {
        const nextLine = lines[j].trim();
        if (!nextLine) { j++; continue; }
        if (nextLine.startsWith("Bản ") || nextLine.startsWith("Qua sự") || nextLine.startsWith("Phần")) break;
        row.push(nextLine);
        cellCount++;
        j++;
      }
      rows.push(row);
      i = j;
      continue;
    }
    i++;
  }
  return { block: { type: "table", content: "", headers, rows }, nextIndex: i };
}

function parseComparisonTable(lines: string[], start: number): { block: ContentBlock; nextIndex: number } {
  const headers = ["Khía cạnh So sánh", "Quý bà Khôn ngoan", "Quý bà Ngu dại"];
  const rows: string[][] = [];
  let i = start + 3;
  const aspects = ["Bản chất tính cách", "Sự chuẩn bị và Cấu trúc", "Thực đơn được cung cấp", "Thông điệp Thần học", "Đích đến cuối cùng"];
  
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i++; continue; }
    if (line.startsWith("Hình ảnh Quý bà") || line.startsWith("Phần")) break;
    
    if (aspects.some(a => line.startsWith(a))) {
      const row: string[] = [line];
      let j = i + 1;
      let cellCount = 0;
      while (j < lines.length && cellCount < 2) {
        const nextLine = lines[j].trim();
        if (!nextLine) { j++; continue; }
        if (aspects.some(a => nextLine.startsWith(a)) || nextLine.startsWith("Hình ảnh") || nextLine.startsWith("Phần")) break;
        row.push(nextLine);
        cellCount++;
        j++;
      }
      rows.push(row);
      i = j;
      continue;
    }
    i++;
  }
  return { block: { type: "table", content: "", headers, rows }, nextIndex: i };
}

function parseVirtueTable(lines: string[], start: number): { block: ContentBlock; nextIndex: number } {
  const headers = ["Lĩnh vực Đạo đức", "Thói xấu do Thiếu hụt", "Đức tính tại Điểm Trung Dung", "Thói xấu do Thái quá"];
  const rows: string[][] = [];
  let i = start + 4;
  const aspects = ["Thái độ Lao động", "Sử dụng Ngôn từ"];
  
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i++; continue; }
    if (line.startsWith("Mặc dù") || line.startsWith("Phần")) break;
    
    if (aspects.some(a => line.startsWith(a))) {
      const row: string[] = [line];
      let j = i + 1;
      let cellCount = 0;
      while (j < lines.length && cellCount < 3) {
        const nextLine = lines[j].trim();
        if (!nextLine) { j++; continue; }
        if (aspects.some(a => nextLine.startsWith(a)) || nextLine.startsWith("Mặc dù") || nextLine.startsWith("Phần")) break;
        row.push(nextLine);
        cellCount++;
        j++;
      }
      rows.push(row);
      i = j;
      continue;
    }
    i++;
  }
  return { block: { type: "table", content: "", headers, rows }, nextIndex: i };
}

function processFootnotes(text: string, footnotes: Record<string, string>): string {
  return text.replace(
    /([."\u201D\u0029])(\d{1,2})(\s|$)/g,
    (_, before, num, after) => {
      const note = footnotes[num] || `Reference ${num}`;
      return `${before}<a href="#ref-${num}" class="footnote-ref" data-footnote="${note.replace(/"/g, '&quot;')}">${num}</a>${after}`;
    }
  );
}

function processInlineFormatting(text: string, footnotes: Record<string, string>): string {
  let processed = text;
  processed = processed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  processed = processed.replace(/\*(.+?)\*/g, '<em>$1</em>');
  
  processed = processed.replace(
    /"([^"]+)"/g,
    '<span class="scripture-quote">\u201C$1\u201D</span>'
  );
  
  return processFootnotes(processed, footnotes);
}

export default function ArticleBody() {
  const raw = getArticleContent();
  const { blocks, footnotes } = parseContent(raw);
  
  return (
    <article className="article-prose">
      {blocks.map((block, index) => {
        // Insert Sacred Art before Part 4
        const isPart4 = block.type === "h2" && block.content.includes("Phần 4");
        
        return (
          <div key={index}>
            {isPart4 && (
              <figure className="my-10">
                <Image
                  src="/images/lady_wisdom.png"
                  alt="Lady Wisdom - Quý bà Khôn ngoan"
                  width={800}
                  height={500}
                  className="sacred-art"
                  unoptimized
                />
                <figcaption className="sacred-art-caption">
                  "Quý bà Khôn ngoan" — Hình tượng Sáng thế và Sự Nhân cách hóa trong Châm Ngôn 8.
                </figcaption>
              </figure>
            )}

            {block.type === "h2" && <h2 id={block.id}>{block.content}</h2>}
            {block.type === "h3" && <h3 id={block.id}>{block.content}</h3>}
            {block.type === "paragraph" && (
              <p
                className={block.isFirstParagraph ? "drop-cap" : ""}
                dangerouslySetInnerHTML={{
                  __html: processInlineFormatting(block.content, footnotes),
                }}
              />
            )}
            {block.type === "table" && (
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      {block.headers?.map((h, hi) => <th key={hi}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows?.map((row, ri) => (
                      <tr key={ri}>
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            dangerouslySetInnerHTML={{
                              __html: processInlineFormatting(cell, footnotes),
                            }}
                          />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {block.type === "divider" && (
              <div className="section-divider" role="separator" aria-hidden="true">
                <span>✦ ❧ ✦</span>
              </div>
            )}
            {block.type === "references-header" && (
              <div className="references-section">
                <h2 id={block.id}>{block.content}</h2>
                <CitationGenerator />
              </div>
            )}
            {block.type === "reference-item" && (
              <div className="reference-item" id={block.id}>
                <ReferenceEntry content={block.content} refNumber={block.refNumber} />
              </div>
            )}
          </div>
        );
      })}
    </article>
  );
}

function ReferenceEntry({ content, refNumber }: { content: string; refNumber?: number }) {
  const urlMatch = content.match(/(https?:\/\/[^\s,]+)/);
  const url = urlMatch ? urlMatch[1] : null;
  const textBeforeUrl = url ? content.slice(0, content.indexOf(url)).trim() : content;
  
  return (
    <div className="flex gap-2">
      <span className="shrink-0 font-sans text-xs font-bold text-[var(--gold)] min-w-[1.5rem]">
        [{refNumber}]
      </span>
      <div>
        {textBeforeUrl && <span>{textBeforeUrl} </span>}
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        )}
      </div>
    </div>
  );
}

function CitationGenerator() {
  return (
    <div className="mb-6 rounded border border-[var(--gold-dim)] bg-[var(--gold-dim)] p-4 text-sm print:hidden">
      <h3 className="mb-2 font-sans font-semibold !border-none !p-0 !m-0 text-[var(--ink)]">
        Trích dẫn tài liệu này (Citation)
      </h3>
      <div className="space-y-3 font-sans text-xs text-[var(--ink-muted)]">
        <div>
          <strong className="block text-[var(--ink)]">APA:</strong>
          Văn chương Khôn ngoan. (2026). Sự Khôn Ngoan Trong Sách Châm Ngôn.
        </div>
        <div>
          <strong className="block text-[var(--ink)]">Chicago:</strong>
          Văn chương Khôn ngoan. "Sự Khôn Ngoan Trong Sách Châm Ngôn." 2026.
        </div>
      </div>
    </div>
  );
}
