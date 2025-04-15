'use client';

import { Locale } from '@/i18n.config';
import Header from './Header';
import Image from 'next/image';

export default function PageWrapper({
  children,
  lang
}: {
  children: React.ReactNode;
  lang: Locale;
}) {
  return (
    <div className="flex flex-col min-h-screen p-8">
      <Header lang={lang} />
      <main className="flex-1 pt-32">
        {children}
      </main>

      <footer className="flex flex-col gap-8 text-[#0000FF]">
        <div className="flex justify-center">
          <Image 
            src="/img/cfp-logo-vintage-blue.png" 
            alt="CFP Logo" 
            width={100} 
            height={100} 
            quality={100}
            className="h-8 w-auto"
          />
        </div>
      </footer>
    </div>
  );
} 