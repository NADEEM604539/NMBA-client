import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
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

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

export const metadata = {
  title: {
    default: "PEHNO | Wear Your Identity",
    template: "%s | PEHNO"
  },
  description: "PEHNO — wear your identity. Timeless pieces, refined silhouettes, made for those who do not follow the ordinary. Discover PEHNO's first collection, coming soon.",
  keywords: ["PEHNO", "luxury shirts", "designer clothing", "premium fashion", "signature shirt", "essential kurta", "tailored trouser", "signature waistcoat", "Pakistan fashion", "wear your identity"],
  authors: [{ name: "PEHNO" }],
  creator: "PEHNO",
  publisher: "PEHNO",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.pehno.pk'), // Replace with actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "PEHNO | Wear Your Identity",
    description: "Timeless pieces. Refined silhouettes. Made for those who do not follow the ordinary. Discover PEHNO.",
    url: 'https://www.pehno.pk',
    siteName: "PEHNO",
    images: [
      {
        url: '/logo.jpeg',
        width: 800,
        height: 600,
        alt: "PEHNO Logo",
      },
    ],
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "PEHNO | Wear Your Identity",
    description: "Timeless pieces. Refined silhouettes. Made for those who do not follow the ordinary.",
    images: ['/logo.jpeg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.jpeg',
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
    name: "PEHNO",
    url: 'https://www.pehno.pk',
    logo: 'https://www.pehno.pk/logo.jpeg',
    description: "PEHNO — wear your identity. Timeless pieces, refined silhouettes, made for those who do not follow the ordinary.",
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
            className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
          >
            {children}
            <Footer />
          </body>
        </html>
      </CartProvider>
    </ClerkProvider>
  );
}
