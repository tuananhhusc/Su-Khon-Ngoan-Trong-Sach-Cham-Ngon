import fs from "fs";
import path from "path";

export function getArticleContent(): string {
  const filePath = path.join(process.cwd(), "chamngon.md");
  const content = fs.readFileSync(filePath, "utf-8");
  return content;
}

/** 
 * Extract headings from markdown content for TOC generation.
 * Returns an array of { id, text, level } objects.
 */
export function extractHeadings(
  markdown: string
): Array<{ id: string; text: string; level: number }> {
  const lines = markdown.split(/\r?\n/);
  const headings: Array<{ id: string; text: string; level: number }> = [];

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    // Match lines that start with text and appear to be section headers
    // The markdown file uses plain text lines as section headers (Phần X:...)
    const sectionMatch = line.match(
      /^(Phần \d+:.+)$/
    );
    if (sectionMatch) {
      const text = sectionMatch[1].trim();
      const id = slugify(text);
      headings.push({ id, text, level: 2 });
      continue;
    }

    // Match subsection headers (7.1., 7.2., etc.)
    const subMatch = line.match(
      /^(\d+\.\d+\..+)$/
    );
    if (subMatch) {
      const text = subMatch[1].trim();
      const id = slugify(text);
      headings.push({ id, text, level: 3 });
      continue;
    }

    // Match other non-numbered sub-headers (lines that are standalone titles)
    const subHeaderMatch = line.match(
      /^((?:Cơ sở|Vai trò|Ba Nguyên|Quản trị|Tâm lý|Đỉnh cao|Nguồn trích).+)$/
    );
    if (subHeaderMatch) {
      const text = subHeaderMatch[1].trim();
      const id = slugify(text);
      headings.push({ id, text, level: 3 });
    }
  }

  return headings;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
