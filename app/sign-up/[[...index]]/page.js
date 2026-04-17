'use client';

export const dynamic = 'force-dynamic';

import { SignUp } from '@clerk/nextjs';
import Image from 'next/image';

export default function SignUpCatchAll() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FFF2E1] via-[#FBF0E0] to-[#F5E6D3] flex flex-col items-center justify-center px-3 py-1 sm:px-4 sm:py-12 md:py-16">
      {/* Decorative background elements - hidden on mobile */}
      <div className="hidden sm:block absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-[#248D76]/5 rounded-full blur-3xl opacity-30" />
      <div className="hidden sm:block absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-[#102C26]/5 rounded-full blur-3xl opacity-30" />
      
      <div className="relative z-10 w-full max-w-sm sm:max-w-md lg:max-w-2xl flex flex-col">
        {/* Header Section */}
        <div className="text-center mb-5 sm:mb-6 md:mb-8">
          <div className="flex justify-center mb-2 sm:mb-3 md:mb-4">
            <div className="relative w-10 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-[#248D76] shadow-lg">
              <Image
                src="/logo.jpg"
                alt="Afia's Logo"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#102C26] tracking-wide mb-1">
            Afia<span className="text-[#248D76]">'s</span> Herbal Oils
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#6B4F2F] italic font-light">
            Create your account
          </p>
        </div>
        <div className='lg:pl-29' >

      
        {/* Auth Card */}
           <SignUp
            path="/sign-up"
            routing="path"
            redirectUrl="/"
            appearance={{
              elements: {
                card: 'bg-transparent shadow-none border-none',
                cardBox: 'bg-transparent shadow-none',
                headerTitle: 'text-[#102C26] text-2xl font-bold',
                headerSubtitle: 'text-[#6B4F2F]',
                socialButtonsBlockButton: 'bg-[#248D76] hover:bg-[#1A6B5F] text-white font-semibold border-none shadow-md hover:shadow-lg transition-all duration-300',
                socialButtonsBlockButtonText: 'font-semibold',
                formFieldInput: 'bg-white border-2 border-[#F7E7CE] text-[#3D2817] placeholder-[#A79277] focus:border-[#248D76] focus:outline-none transition-colors',
                formFieldInputShowPasswordButton: 'text-[#248D76] hover:text-[#102C26]',
                formFieldLabel: 'text-[#102C26] font-semibold',
                formFieldLabelStar: 'text-[#248D76]',
                formButtonPrimary: 'bg-gradient-to-r from-[#248D76] to-[#1A6B5F] hover:from-[#1A6B5F] hover:to-[#0F4038] text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 py-3',
                footerActionLink: 'text-[#248D76] hover:text-[#1A6B5F] font-semibold',
                footerActionText: 'text-[#6B4F2F]',
                dividerLine: 'bg-[#F7E7CE]',
                dividerText: 'text-[#A79277] font-medium',
                formResendCodeLink: 'text-[#248D76] hover:text-[#1A6B5F]',
                identifierInputField: 'bg-white border-2 border-[#F7E7CE] text-[#3D2817] focus:border-[#248D76]',
                otpCodeFieldInput: 'bg-white border-2 border-[#F7E7CE] text-[#3D2817] focus:border-[#248D76]',
                backButton: 'text-[#248D76] hover:text-[#1A6B5F]',
              },
              layout: {
                termsPageContent: 'text-[#3D2817]',
              },
            }}
          />
        </div>
          </div>

        {/* Footer Text */}
        <p className="text-center text-[#6B4F2F] text-xs sm:text-sm md:text-base lg:text-lg mt-3 sm:mt-4 md:mt-6 lg:mt-8 px-2">
          Join us and experience pure nature with our organic herbal oils
        </p>
    </div>
  );
}
