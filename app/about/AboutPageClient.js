"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function AboutPageClient() {
  const [expandedSection, setExpandedSection] = useState("about");

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F0E6D2] to-[#DFD0B8]">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-[#102C26] mb-4">
            About NMBA<span className="text-[#1a4d42]"> Luxe Wear</span>
          </h1>
          <p className="text-lg text-[#6B4F2F] max-w-3xl mx-auto">
            Discover our story, mission, and commitment to bringing you premium luxury wear with contemporary designs and exceptional quality.
          </p>
        </div>

        {/* Main Sections */}
        <div className="space-y-6">
          {/* About Us Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border-l-4 border-[#248D76]">
            <button
              onClick={() => toggleSection("about")}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#F5E6D3] transition"
            >
              <h2 className="text-2xl font-black text-[#102C26]">About Us</h2>
              {expandedSection === "about" ? (
                <ChevronUp className="w-6 h-6 text-[#248D76]" />
              ) : (
                <ChevronDown className="w-6 h-6 text-[#248D76]" />
              )}
            </button>
            {expandedSection === "about" && (
              <div className="px-6 py-6 border-t border-gray-200 space-y-4 text-[#6B4F2F]">
                <p className="leading-relaxed">
                  At NMBA Luxe Wear, we believe in redefining luxury fashion. Our mission is to provide you with premium, stylish clothing that makes you feel confident and elegant. Every piece we curate is selected for its superior quality, contemporary design, and exceptional craftsmanship.
                </p>
                <p className="leading-relaxed">
                  We are committed to quality, style, and customer satisfaction. Our collection features premium fabrics and contemporary designs that celebrate individuality. We partner with trusted designers and suppliers who share our vision of bringing affordable luxury to fashion enthusiasts.
                </p>
                <div className="bg-[#E8DCC8] p-4 rounded-lg mt-4">
                  <h3 className="font-bold text-[#102C26] mb-3">Our Core Values:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-[#1a4d42] font-bold mt-1">✓</span>
                      <span><strong>Quality:</strong> Premium fabrics and exceptional craftsmanship</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1a4d42] font-bold mt-1">✓</span>
                      <span><strong>Style:</strong> Contemporary designs for the modern wardrobe</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1a4d42] font-bold mt-1">✓</span>
                      <span><strong>Affordability:</strong> Luxury wear at accessible prices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1a4d42] font-bold mt-1">✓</span>
                      <span><strong>Customer Care:</strong> Your satisfaction is our priority</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Privacy Policy Section */}
          <div id="privacy" className="bg-white rounded-lg shadow-lg overflow-hidden border-l-4 border-[#1a4d42]">
            <button
              onClick={() => toggleSection("privacy")}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#F5E6D3] transition"
            >
              <h2 className="text-2xl font-black text-[#102C26]">Privacy Policy</h2>
              {expandedSection === "privacy" ? (
                <ChevronUp className="w-6 h-6 text-[#248D76]" />
              ) : (
                <ChevronDown className="w-6 h-6 text-[#248D76]" />
              )}
            </button>
            {expandedSection === "privacy" && (
              <div className="px-6 py-6 border-t border-gray-200 space-y-4 text-[#6B4F2F] text-sm">
                <div>
                  <h3 className="font-bold text-[#102C26] mb-2">1. Information We Collect</h3>
                  <p className="leading-relaxed">
                    We collect information you provide directly to us, such as when you create an account, place an order, or contact us for support. This may include your name, email address, phone number, shipping address, and payment information.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#102C26] mb-2">2. How We Use Your Information</h3>
                  <p className="leading-relaxed mb-2">We use your information to:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• Process and deliver your orders</li>
                    <li>• Provide customer support and respond to inquiries</li>
                    <li>• Send you updates about your order status</li>
                    <li>• Improve our website and services</li>
                    <li>• Send marketing communications (with your consent)</li>
                    <li>• Comply with legal obligations</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#102C26] mb-2">3. Data Security</h3>
                  <p className="leading-relaxed">
                    We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#102C26] mb-2">4. Third-Party Sharing</h3>
                  <p className="leading-relaxed">
                    We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, under strict confidentiality agreements.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#102C26] mb-2">5. Cookies</h3>
                  <p className="leading-relaxed">
                    Our website uses cookies to enhance your browsing experience. Cookies are small files that are stored on your device and help us remember your preferences and track website usage.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#102C26] mb-2">6. Your Rights</h3>
                  <p className="leading-relaxed">
                    You have the right to access, update, or delete your personal information at any time. To exercise these rights, please contact us at abidamansoora016@gmail.com.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#102C26] mb-2">7. Contact Us</h3>
                  <p className="leading-relaxed">
                    If you have any questions about our Privacy Policy, please contact us at:
                    <br />
                    <strong>Email:</strong> abidamansoora016@gmail.com
                    <br />
                    <strong>Phone:</strong> +92 333 6419935
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Terms & Conditions Section */}
          <div id="terms" className="bg-white rounded-lg shadow-lg overflow-hidden border-l-4 border-[#1a4d42]">
            <button
              onClick={() => toggleSection("terms")}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#F5E6D3] transition"
            >
              <h2 className="text-2xl font-black text-[#102C26]">Terms & Conditions</h2>
              {expandedSection === "terms" ? (
                <ChevronUp className="w-6 h-6 text-[#248D76]" />
              ) : (
                <ChevronDown className="w-6 h-6 text-[#248D76]" />
              )}
            </button>
            {expandedSection === "terms" && (
              <div className="px-6 py-6 border-t border-gray-200 space-y-4 text-[#6B4F2F] text-sm">
                <div>
                  <h3 className="font-bold text-[#102C26] mb-2">1. Use License</h3>
                  <p className="leading-relaxed">
                    Permission is granted to temporarily download one copy of the materials (including information and software) from Afia's Herbal Oils website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="space-y-1 ml-4 mt-2">
                    <li>• Modifying or copying the materials</li>
                    <li>• Using the materials for any commercial purpose or for any public display</li>
                    <li>• Attempting to decompile or reverse engineer any software contained on the website</li>
                    <li>• Removing any copyright or other proprietary notations from the materials</li>
                    <li>• Transferring the materials to another person or "mirroring" the materials on any other server</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#102C26] mb-2">2. Disclaimer</h3>
                  <p className="leading-relaxed">
                    The materials on Afia's Herbal Oils website are provided on an 'as is' basis. Afia's Herbal Oils makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#102C26] mb-2">3. Limitations</h3>
                  <p className="leading-relaxed">
                    In no event shall Afia's Herbal Oils or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Afia's Herbal Oils website.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#102C26] mb-2">4. Accuracy of Materials</h3>
                  <p className="leading-relaxed">
                    The materials appearing on Afia's Herbal Oils website could include technical, typographical, or photographic errors. Afia's Herbal Oils does not warrant that any of the materials on its website are accurate, complete, or current.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#102C26] mb-2">5. Links</h3>
                  <p className="leading-relaxed">
                    Afia's Herbal Oils has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Afia's Herbal Oils of the site. Use of any such linked website is at the user's own risk.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#102C26] mb-2">6. Modifications</h3>
                  <p className="leading-relaxed">
                    Afia's Herbal Oils may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#102C26] mb-2">7. Governing Law</h3>
                  <p className="leading-relaxed">
                    These terms and conditions are governed by and construed in accordance with the laws of Pakistan, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#102C26] mb-2">8. Product Information</h3>
                  <p className="leading-relaxed">
                    All product descriptions, pricing, and availability information are subject to change without notice. We strive to maintain accurate and up-to-date information, but errors may occur. We reserve the right to correct any errors, inaccuracies, or omissions.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#102C26] mb-2">9. Returns & Refunds</h3>
                  <p className="leading-relaxed">
                    All products come with a satisfaction guarantee. If you are not completely satisfied with your purchase, please contact us within 14 days of receipt for a refund or replacement.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#102C26] mb-2">10. Contact Us</h3>
                  <p className="leading-relaxed">
                    If you have any questions about these Terms and Conditions, please contact us at:
                    <br />
                    <strong>Email:</strong> abidamansoora016@gmail.com
                    <br />
                    <strong>Phone:</strong> +92 333 6419935
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Additional Info Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border-l-4 border-[#248D76]">
            <button
              onClick={() => toggleSection("help")}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#F5E6D3] transition"
            >
              <h2 className="text-2xl font-black text-[#102C26]">Need Help?</h2>
              {expandedSection === "help" ? (
                <ChevronUp className="w-6 h-6 text-[#248D76]" />
              ) : (
                <ChevronDown className="w-6 h-6 text-[#248D76]" />
              )}
            </button>
            {expandedSection === "help" && (
              <div className="px-6 py-6 border-t border-gray-200 space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="font-bold text-[#102C26]">Contact Information</h3>
                    <p className="text-[#6B4F2F]">
                      <strong>Email:</strong><br />
                      <a href="mailto:abidamansoora016@gmail.com" className="text-[#1a4d42] hover:underline">
                        abidamansoora016@gmail.com
                      </a>
                    </p>
                    <p className="text-[#6B4F2F]">
                      <strong>Phone:</strong><br />
                      <a href="tel:+923336419935" className="text-[#1a4d42] hover:underline">
                        +92 333 6419935
                      </a>
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-[#102C26]">Quick Links</h3>
                    <ul className="space-y-1 text-sm">
                      <li>
                        <Link href="/chat" className="text-[#1a4d42] hover:underline">
                          Chat with us
                        </Link>
                      </li>
                      <li>
                        <Link href="/#products" className="text-[#1a4d42] hover:underline">
                          Browse Products
                        </Link>
                      </li>
                      <li>
                        <Link href="/orders" className="text-[#1a4d42] hover:underline">
                          Track Orders
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
