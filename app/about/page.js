import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutPageClient from "./AboutPageClient";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "About NMBA Luxe Wear | Premium Fashion Brand Pakistan",
  description: "Discover NMBA Luxe Wear's mission to deliver premium, stylish, and affordable luxury clothing. Learn about our commitment to quality fabrics, contemporary designs, and customer satisfaction.",
  keywords: ["about us", "fashion brand", "luxury clothing", "premium shirts", "Pakistan fashion"],
  openGraph: {
    title: "About NMBA Luxe Wear | Premium Fashion Brand Pakistan",
    description: "Discover our story, mission, and commitment to bringing you the finest luxury wear with contemporary designs and exceptional quality.",
    type: "website",
  },
};

export default function About() {
  return (
    <>
      <Navbar/>
      <AboutPageClient />
    </>
  );
}
