import Link from "next/link";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#F5E6D3] via-[#FBF0E0] to-[#F7E7CE] border-t-4 border-[#248D76] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#248D76]/5 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#102C26]/5 rounded-full blur-3xl -ml-32 -mb-32" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-6 md:py-12 grid md:grid-cols-4 gap-4 md:gap-8 relative z-10">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-black text-[#102C26] uppercase tracking-wide mb-2 md:mb-3">Afia&#39;s</h3>
          <p className="text-[#6B4F2F] text-xs leading-relaxed font-medium">
            Pure, natural and organic oils for hair, skin, and wellness. Sustainably sourced, carefully crafted, and made with love for your self-care rituals.
          </p>
          <div className="mt-2 md:mt-3 flex gap-4">
            <Link href="https://www.facebook.com/share/1KJrchaFDp/" target="_blank" className="bg-white border-2 border-[#1a4d42] text-[#1a4d42] p-3 rounded-full hover:bg-[#1a4d42] hover:text-white transition-all duration-300 hover:scale-110">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="https://www.instagram.com/made.byafia?igsh=MWhrdnpzazdzMGV1dQ==" target="_blank" className="bg-white border-2 border-[#1a4d42] text-[#1a4d42] p-3 rounded-full hover:bg-[#1a4d42] hover:text-white transition-all duration-300 hover:scale-110">
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-black text-[#102C26] mb-2 md:mb-4 text-lg uppercase tracking-wide">Quick Links</h4>
          <ul className="space-y-1 md:space-y-2 text-sm">
            <li><Link href="/" className="text-[#6B4F2F] hover:text-[#1a4d42] font-semibold transition duration-300 hover:translate-x-1 inline-block">→ Home</Link></li>
            <li><Link href="/#products" className="text-[#6B4F2F] hover:text-[#1a4d42] font-semibold transition duration-300 hover:translate-x-1 inline-block">→ Shop Products</Link></li>
            <li><Link href="/#deals" className="text-[#6B4F2F] hover:text-[#1a4d42] font-semibold transition duration-300 hover:translate-x-1 inline-block">→ Special Deals</Link></li>
            <li><Link href="/orders" className="text-[#6B4F2F] hover:text-[#1a4d42] font-semibold transition duration-300 hover:translate-x-1 inline-block">→ My Orders</Link></li>
            <li><Link href="/chat" className="text-[#6B4F2F] hover:text-[#1a4d42] font-semibold transition duration-300 hover:translate-x-1 inline-block\">→ Chat Support</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-black text-[#102C26] mb-2 md:mb-4 text-lg uppercase tracking-wide">Contact Us</h4>
          <div className="space-y-2 md:space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-[#1a4d42] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[#102C26] font-bold">Phone</p>
                <a href="tel:+923336419935" className="text-[#6B4F2F] hover:text-[#1a4d42] transition font-semibold">+92 333 6419935</a>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-[#1a4d42] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[#102C26] font-bold">Email</p>
                <a href="mailto:abidamansoora016@gmail.com" className="text-[#6B4F2F] hover:text-[#1a4d42] transition font-semibold text-xs break-all">abidamansoora016@gmail.com</a>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#1a4d42] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[#102C26] font-bold">Location</p>
                <p className="text-[#6B4F2F] font-semibold">Pakistan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="font-black text-[#102C26] mb-2 md:mb-4 text-lg uppercase tracking-wide">Legal</h4>
          <ul className="space-y-2 md:space-y-3 text-sm">
            <li><Link href="/about#privacy" className="text-[#6B4F2F] hover:text-[#248D76] font-semibold transition duration-300 hover:translate-x-1 inline-block">→ Privacy Policy</Link></li>
            <li><Link href="/about#terms" className="text-[#6B4F2F] hover:text-[#248D76] font-semibold transition duration-300 hover:translate-x-1 inline-block">→ Terms & Conditions</Link></li>
            <li><Link href="/about" className="text-[#6B4F2F] hover:text-[#248D76] font-semibold transition duration-300 hover:translate-x-1 inline-block">→ About Us</Link></li>
          </ul>
        </div>

        

      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-[#248D76]/30 bg-white/40">
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-3 md:py-4 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-3 text-[#6B4F2F] text-xs md:text-sm">
          <p className="font-semibold">
            © {new Date().getFullYear()} <span className="text-[#102C26] font-black">Afia&#39;s Herbal Oils</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
