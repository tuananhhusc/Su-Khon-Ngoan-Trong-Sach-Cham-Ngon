# Sự Khôn Ngoan Trong Sách Châm Ngôn ✦ Báo Cáo Nghiên Cứu Chuyên Sâu

Nền tảng xuất bản nghiên cứu thần học chuyên sâu được xây dựng trên Next.js 15, tối ưu hóa cho trải nghiệm đọc học thuật trường đoạn (long-read) và tra cứu chuyên môn về văn chương khôn ngoan trong Kinh Thánh.

## ✦ Triết lý Thiết kế (Design Aesthetic)
Dự án được định hướng theo thẩm mỹ **Academic Rigor meets Catholic Liturgical** (Kỷ luật Hàn lâm kết hợp với Phụng vụ Công giáo). 
- **Bảng màu:** Sử dụng tông màu giấy da (Parchment - `#fdfdf5`), vàng đồng (Catholic Gold - `#b38b36`) và đỏ trầm (Oxford Red - `#8a1c1c`) để tạo cảm giác uy nghiêm, cổ điển.
- **Hệ Typography:** 
  - **Lora (Serif):** Phông chữ chính cho nội dung, tối ưu cho việc đọc văn bản dài và hiển thị tiếng Việt học thuật.
  - **Be Vietnam Pro (Sans-serif):** Dùng cho hệ thống điều hướng, mục lục và các chú thích kỹ thuật.

## ✦ Tính năng Nổi bật (Key Features)

### 1. Trình phân giải Markdown Chuyên dụng (Custom Parser)
Hệ thống tự động phân tích và render file `chamngon.md` với các cấu trúc phức tạp:
- **Footnotes tương tác:** Tự động phát hiện chú thích và hiển thị dưới dạng Tooltip (Pure CSS) khi di chuột.
- **Bảng học thuật chuẩn APA:** Tự động render các bảng so sánh bản dịch và phạm trù đạo đức theo phong cách tối giản của Hiệp hội Tâm lý học Hoa Kỳ (APA).
- **Chữ cái mở đầu (Drop Cap):** Tự động tạo Drop Cap cho đoạn văn đầu tiên của mỗi phần lớn.

### 2. Bộ công cụ Hỗ trợ Đọc (Reading Toolbar)
- **Cỡ chữ linh hoạt:** Điều chỉnh kích thước văn bản trực tiếp theo thời gian thực.
- **Chế độ Ban đêm (Night Mode):** Chuyển đổi sang giao diện tối (`#121212`) giúp đọc thoải mái trong điều kiện thiếu sáng mà vẫn giữ được tông màu giấy da.
- **Tối ưu hóa In ấn (Print CSS):** Tự động loại bỏ các yếu tố UI (toolbar, TOC) và tinh chỉnh lề trang để xuất ra file PDF/In ấn chuyên nghiệp.

### 3. Hệ thống Điều hướng Thông minh
- **Mục lục Động (Sticky TOC):** Luôn cố định bên trái màn hình với tính năng **Scroll Spy** (tự động highlight phần đang đọc).
- **Mobile UX:** Khay mục lục trượt (Drawer) và các nút điều hướng được tối ưu hóa cho thao tác bằng một tay trên thiết bị di động.

### 4. SEO & Metadata Chuyên sâu
- Injected **ScholarlyArticle JSON-LD Schema** giúp Google Scholar và các công cụ tìm kiếm nhận diện bài viết như một công trình nghiên cứu chính quy.
- Tích hợp đầy đủ Open Graph (Facebook/Zalo) và Twitter Cards với hình ảnh xem trước tùy chỉnh.

## ✦ Công nghệ Sử dụng (Tech Stack)

- **Framework:** Next.js 15 (App Router)
- **Ngôn ngữ:** TypeScript
- **Styling:** Tailwind CSS (v4 compatible setup)
- **Icons:** Lucide React
- **Fonts:** Google Fonts (Lora, Be Vietnam Pro)

## ✦ Cấu trúc Thư mục

```text
src/
├── app/                  # Route handlers, metadata và global styles
├── components/
│   ├── article/          # Các thành phần nội dung: ArticleBody, Header, TOC
│   └── layout/           # Các thành phần khung: StickyHeader, Footer, Toolbar
└── lib/                  # Tiện ích đọc file và xử lý dữ liệu markdown
```

## ✦ Hướng dẫn Cài đặt

1. **Clone repository:**
   ```bash
   git clone <repository-url>
   ```

2. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

3. **Chạy môi trường phát triển:**
   ```bash
   npm run dev
   ```

4. **Xây dựng bản sản xuất:**
   ```bash
   npm run build
   ```

## ✦ Ghi chú Bản quyền & Trích dẫn

Tài liệu nghiên cứu này thuộc dự án phi lợi nhuận **Văn chương Khôn ngoan**. Mọi trích dẫn vui lòng sử dụng công cụ **Citation Generator** có sẵn ở cuối bài nghiên cứu để đảm bảo đúng quy chuẩn học thuật (APA/Chicago).

---
*Ad Maiorem Dei Gloriam*
