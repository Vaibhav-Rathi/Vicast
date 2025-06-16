import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../app/components/theme-provider";
import { AuthProvider } from "@/lib/auth-provider";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from '@react-oauth/google'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vicast – Video Call. Record. Edit.",
  description: "Vicast is an all-in-one platform for seamless video calling, smart recording, and intuitive editing. Turn conversations into content.",
  keywords: ["Vicast", "video call", "video recording", "video editing", "communication platform"],
  authors: [{ name: "Vaibhav Rathi" }],
  creator: "Vaibhav Rathi",
  metadataBase: new URL("https://vicast.vaibhav-projects.com"),
  openGraph: {
    title: "Vicast",
    description: "Connect. Capture. Create. Video calling meets powerful editing.",
    url: "https://vicast.vaibhav-projects.com",
    siteName: "Vicast",
    images: [
      {
        url: "https://vicast.vaibhav-projects.com/favicon.svg",
        width: 1200,
        height: 630,
        alt: "Vicast – Video Call Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AuthProvider>
              <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
                {children}
              </GoogleOAuthProvider>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}