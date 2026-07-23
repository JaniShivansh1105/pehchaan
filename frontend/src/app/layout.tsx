import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { ToastProvider } from "@/lib/hooks/useToast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PEHCHAAN | Financial Intelligence Platform",
  description: "AI-powered financial intelligence and credit readiness platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="h-full flex flex-col" suppressHydrationWarning>
        <ToastProvider>
          <div className="flex h-[100dvh] w-full bg-background overflow-hidden selection:bg-brand/20">
            <Sidebar />
            
            <div className="flex-1 flex flex-col h-[100dvh] overflow-hidden relative min-w-0">
              <Header />
              
              {/* Main Content Area */}
              <main className="flex-1 overflow-y-auto">
                {children}
              </main>
            </div>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
