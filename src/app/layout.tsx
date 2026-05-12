import type { Metadata, Viewport } from "next";
import { Lora, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://tuananhhusc.github.io/Su-Khon-Ngoan-Trong-Sach-Cham-Ngon"), // Production GitHub Pages URL
  title: {
    default: "Sự Khôn Ngoan Trong Sách Châm Ngôn",
    template: "%s | Văn chương Khôn ngoan"
  },
  description:
    "Thần học, Đạo đức học và Ứng dụng Thực tiễn của Sự khôn ngoan trong Sách Châm ngôn — Nghiên cứu hàn lâm chuyên sâu về Kinh Thánh Cựu Ước.",
  authors: [{ name: "Nghiên cứu Kinh Thánh" }],
  keywords: [
    "Sách Châm ngôn",
    "Proverbs",
    "Thần học Cựu Ước",
    "Đạo đức học",
    "Quý bà Khôn ngoan",
    "Lady Wisdom",
    "Kinh Thánh Cựu Ước",
  ],
  openGraph: {
    title: "Sự Khôn Ngoan Trong Sách Châm Ngôn",
    description:
      "Báo cáo nghiên cứu hàn lâm chuyên sâu về Sách Châm Ngôn trong Kinh Thánh Cựu Ước, phân tích ngôn ngữ học, thần học và đạo đức học.",
    type: "article",
    locale: "vi_VN",
    siteName: "Văn chương Khôn ngoan",
    images: [
      {
        url: "/images/lady_wisdom.png",
        width: 1200,
        height: 630,
        alt: "Hình tượng Quý bà Khôn ngoan trong Sách Châm ngôn",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sự Khôn Ngoan Trong Sách Châm Ngôn",
    description: "Báo cáo nghiên cứu hàn lâm chuyên sâu về Kinh Thánh Cựu Ước.",
    images: ["/images/lady_wisdom.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${lora.variable} ${beVietnam.variable} antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
