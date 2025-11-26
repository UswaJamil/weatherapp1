import type { Metadata } from "next";
import './globals.css'
import { Nunito } from 'next/font/google'
import { ProviderWrapper } from "../app/Components/ProviderWrapper";

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: {
    default: "Weather App",
    template: "%s | Weather App",
  },
  description: "Simple weather dashboard with forecasts, facts, and unit toggle.",
  openGraph: {
    title: "Weather App",
    description: "Simple weather dashboard with forecasts, facts, and unit toggle.",
 
    url: "https://vercel.com/uswajamils-projects/weatherapp1",

    siteName: "Weather App",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Weather App preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weather App",
    description: "Simple weather dashboard with forecasts, facts, and unit toggle.",
    images: ["/og-image.svg"],
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
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={nunito.className}>
      <body>
        <ProviderWrapper>
          {children}
        </ProviderWrapper>
      </body>
    </html>
  );
}
