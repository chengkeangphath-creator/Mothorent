import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { FavoritesProvider } from "../context/FavoritesContext";
import { LanguageProvider } from "../context/LanguageContext";
import { ThemeProvider } from "../context/ThemeContext";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import AIChatbot from "../components/common/AIChatbot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#142A44" },
    { media: "(prefers-color-scheme: dark)", color: "#081426" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Motho Rent – Cambodia's Premier Motorcycle Rental Platform",
    template: "%s | Motho Rent Cambodia",
  },
  description: "Rent reliable motorcycles, scooters, and adventure dual-sport bikes across all 25 provinces in Cambodia. Direct local owner bookings, transparent USD pricing, and free sanitized helmets.",
  keywords: [
    "motorcycle rental Cambodia",
    "rent scooter Siem Reap",
    "motorbike Phnom Penh",
    "Kampot motorcycle rental",
    "Motho Rent",
    "Cambodia road trips",
    "Angkor Wat scooter hire",
    "Koh Rong motorbike",
  ],
  authors: [{ name: "Motho Rent Cambodia" }],
  creator: "Motho Rent Team",
  publisher: "Motho Rent Marketplace",
  metadataBase: new URL("https://mothorent.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Motho Rent – Explore Cambodia on Two Wheels",
    description: "Book reliable scooters, semi-autos, and adventure dirt bikes directly from verified local owners across 25 Cambodian provinces.",
    url: "https://mothorent.com",
    siteName: "Motho Rent",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "Motho Rent – Cambodia Motorcycle Rentals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Motho Rent – Cambodia Motorcycle Rental Marketplace",
    description: "Explore Cambodia on two wheels with verified owner listings in all 25 provinces.",
    images: ["https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&h=630&q=80"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark h-full antialiased ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                var stored = localStorage.getItem('motho_theme');
                if (stored === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            })();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-slate-50 dark:bg-[#081426] text-slate-900 dark:text-[#F0F6FC] transition-colors duration-200 selection:bg-[#4A74A7] selection:text-white">
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <FavoritesProvider>
                <Navbar />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
                <AIChatbot />
              </FavoritesProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
