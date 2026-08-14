import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "东城经纬｜北京市东城区每日数据情报",
  description: "每日更新东城区GDP、消费、PMI、人事变化、国企动态及政府采购招标信息。",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
