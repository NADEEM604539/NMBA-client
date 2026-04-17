import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Afia's Herbal Oil | Pure, Natural & Organic Care Products",
    template: "%s | Afia's Herbal Oil"
  },
  description: "Rooted in nature and guided by purity, Afia's Herbal Oil offers lovingly crafted hair and skin care products. 100% natural, cold-pressed, and organic oils to bring out your natural radiance.",
  keywords: ["herbal oil", "organic hair oil", "natural skin care", "cold-pressed oils", "Pakistan", "Afia's herbal", "pure essential oils"],
  authors: [{ name: "Afia's Herbal Oil" }],
  creator: "Afia's Herbal Oil",
  publisher: "Afia's Herbal Oil",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.afias.pk'), // Replace with actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Afia's Herbal Oil | Pure, Natural & Organic Care Products",
    description: "Discover the power of nature with Afia's Herbal Oil. Premium hair and skin care products crafted to restore balance and bring out your natural radiance.",
    url: 'https://www.afias.pk',
    siteName: "Afia's Herbal Oil",
    images: [
      {
        url: '/logo.jpg',
        width: 800,
        height: 600,
        alt: "Afia's Herbal Oil Logo",
      },
    ],
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Afia's Herbal Oil | Pure, Natural & Organic Care Products",
    description: "100% natural, cold-pressed, and organic oils for hair and skin care.",
    images: ['/logo.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.jpg',
  },
  verification: {
    google: "aOvx6LD9u_TnyzXI3zqvzubFyTV81TIx_a6BXaUtP1U",
  },
};

import { CartProvider } from "@/lib/CartContext";

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: "Afia's Herbal Oil",
    url: 'https://www.afias.pk',
    logo: 'https://www.afias.pk/logo.jpg',
    description: "Pure, natural and organic oils for hair, skin and wellness.",
    sameAs: [
      // Add social media links here
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'Pakistan'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      areaServed: 'PK',
      availableLanguage: ['English', 'Urdu']
    }
  };

  return (
    <ClerkProvider>
      <CartProvider>
        <html lang="en">
          <head>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
          </head>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {children}
            <Footer />
          </body>
        </html>
      </CartProvider>
    </ClerkProvider>
  );
}
