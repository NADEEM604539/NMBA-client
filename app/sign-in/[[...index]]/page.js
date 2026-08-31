'use client';

import { SignIn } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function SignInCatchAll() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect_url') || '/';

  return (
    <div className="min-h-screen font-sans bg-pehno-offwhite text-pehno-black flex flex-col items-center justify-center py-16 px-6 relative">
      
      {/* Return Home Link */}
      <div className="absolute top-8 left-6 md:left-12">
        <Link 
          href="/" 
          className="text-xs font-semibold text-pehno-charcoal uppercase tracking-[0.2em] hover:text-pehno-black transition-colors"
        >
          &larr; Return to Home
        </Link>
      </div>

      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        
        {/* Header / Brand Emblem */}
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="relative w-20 h-20 overflow-hidden border border-pehno-black/20 mb-6 shadow-sm">
            <Image
              src="/logo.jpeg"
              alt="PEHNO Logo"
              fill
              priority
              className="object-cover"
            />
          </div>

          <span className="text-pehno-navy text-xs tracking-[0.4em] uppercase">Client Portal</span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-serif font-light text-pehno-black uppercase tracking-[0.2em]">
            PEHNO
          </h1>
          <p className="text-[10px] font-serif text-pehno-charcoal/80 uppercase tracking-[0.25em] mt-1">
            by Sajeel Nawaz
          </p>
          <p className="mt-3 text-sm text-pehno-charcoal italic font-light tracking-wide">
            &ldquo;wear your identity&rdquo;
          </p>
        </div>

        {/* Clerk Auth Card */}
        <div className="w-full">
          <SignIn
            path="/sign-in"
            routing="path"
            redirectUrl={redirectUrl}
            appearance={{
              elements: {
                cardBox: 'shadow-none bg-transparent w-full',
                card: 'bg-white border border-pehno-black/10 p-8 sm:p-10 shadow-sm rounded-none w-full',
                headerTitle: 'font-serif font-light text-2xl uppercase tracking-[0.15em] text-pehno-black text-center',
                headerSubtitle: 'text-pehno-charcoal italic font-light text-sm text-center mt-1',
                socialButtonsBlockButton: 'border border-pehno-black/20 bg-white hover:bg-pehno-offwhite text-pehno-black font-medium text-xs uppercase tracking-[0.15em] rounded-none transition-colors duration-300 py-3.5',
                socialButtonsBlockButtonText: 'font-medium text-xs uppercase tracking-[0.15em] text-pehno-black',
                formFieldInput: 'bg-white border border-pehno-black/20 text-pehno-black placeholder:text-pehno-charcoal/40 focus:border-pehno-black focus:ring-0 rounded-none text-sm py-3 transition-colors',
                formFieldLabel: 'text-pehno-black text-xs font-semibold uppercase tracking-[0.15em]',
                formFieldLabelStar: 'text-pehno-navy',
                formButtonPrimary: 'bg-pehno-black hover:bg-pehno-black/80 text-pehno-ivory font-medium text-xs uppercase tracking-[0.2em] rounded-none py-4 transition-colors duration-300 shadow-none',
                footerActionLink: 'text-pehno-black hover:underline text-xs uppercase tracking-wider font-semibold',
                footerActionText: 'text-pehno-charcoal text-xs',
                dividerLine: 'bg-pehno-black/10',
                dividerText: 'text-pehno-charcoal/60 text-xs uppercase tracking-widest font-light',
                identityPreviewText: 'text-pehno-black font-medium',
                identityPreviewEditButton: 'text-pehno-navy font-medium hover:underline text-xs uppercase tracking-wider',
                formResendCodeLink: 'text-pehno-black hover:underline text-xs uppercase tracking-wider font-semibold',
                otpCodeFieldInput: 'bg-white border border-pehno-black/20 text-pehno-black focus:border-pehno-black rounded-none',
              },
              layout: {
                termsPageContent: 'text-pehno-charcoal',
              },
            }}
          />
        </div>

        {/* Brand Footer Statement */}
        <div className="mt-12 text-center border-t border-pehno-black/10 pt-6 w-full">
          <p className="text-xs text-pehno-charcoal uppercase tracking-[0.2em] font-light">
            Quiet in appearance. Distinct in presence.
          </p>
        </div>

      </div>
    </div>
  );
}