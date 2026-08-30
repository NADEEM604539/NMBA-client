import Link from "next/link";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-pehno-black text-pehno-ivory border-t border-pehno-charcoal/40">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid md:grid-cols-4 gap-10 md:gap-8">
        {/* About Section */}
        <div>
          <div className="mb-3">
            <p className="block text-3xl font-serif tracking-[0.2em] uppercase">PEHNO</p>
            <p className="block text-[10px] font-serif tracking-[0.2em] uppercase text-pehno-ivory/60 mt-1">by Sajeel Nawaz</p>
          </div>
          <p className="text-pehno-ivory/60 text-sm leading-relaxed">
            Wear your identity. Timeless pieces, refined silhouettes, made for those who do not follow the ordinary.
          </p>
          <div className="mt-5 flex gap-4">
            <Link href="https://www.instagram.com/pehnobysn?utm_source=qr&igsi=MWFyazA4NnZxMXp2NA==/" target="_blank" className="border border-pehno-ivory/30 text-pehno-ivory p-2.5 hover:bg-pehno-ivory hover:text-pehno-black transition-all duration-300">
              <Facebook className="w-4 h-4" />
            </Link>
            <Link href="https://www.instagram.com/pehnobysn?utm_source=qr&igsi=MWFyazA4NnZxMXp2NA==" target="_blank" className="border border-pehno-ivory/30 text-pehno-ivory p-2.5 hover:bg-pehno-ivory hover:text-pehno-black transition-all duration-300">
              <Instagram className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-pehno-ivory mb-4 text-xs uppercase tracking-[0.2em]">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="text-pehno-ivory/60 hover:text-pehno-ivory transition duration-300">Home</Link></li>
            <li><Link href="/products" className="text-pehno-ivory/60 hover:text-pehno-ivory transition duration-300">Collections</Link></li>
            <li><Link href="/orders" className="text-pehno-ivory/60 hover:text-pehno-ivory transition duration-300">My Orders</Link></li>
            <li><Link href="/chat" className="text-pehno-ivory/60 hover:text-pehno-ivory transition duration-300">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold text-pehno-ivory mb-4 text-xs uppercase tracking-[0.2em]">Contact Us</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-pehno-ivory/50 flex-shrink-0 mt-0.5" />
              <a href="tel:+923268500034" className="text-pehno-ivory/60 hover:text-pehno-ivory transition">03268500034</a>
            </div>
            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-pehno-ivory/50 flex-shrink-0 mt-0.5" />
              <a href="mailto:pehnobysajeelnawaz@gmail.com" className="text-pehno-ivory/60 hover:text-pehno-ivory transition text-xs break-all">pehnobysajeelnawaz@gmail.com</a>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-pehno-ivory/50 flex-shrink-0 mt-0.5" />
              <p className="text-pehno-ivory/60">Pakistan</p>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="font-semibold text-pehno-ivory mb-4 text-xs uppercase tracking-[0.2em]">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about#privacy" className="text-pehno-ivory/60 hover:text-pehno-ivory transition duration-300">Privacy Policy</Link></li>
            <li><Link href="/about#terms" className="text-pehno-ivory/60 hover:text-pehno-ivory transition duration-300">Terms &amp; Conditions</Link></li>
            <li><Link href="/about" className="text-pehno-ivory/60 hover:text-pehno-ivory transition duration-300">About Us</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-pehno-ivory/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-pehno-ivory/40 text-xs tracking-wide">
          <p>&copy; {new Date().getFullYear()} PEHNO. All rights reserved.</p>
          <p className="italic">wear your identity</p>
        </div>
      </div>
    </footer>
  );
}
