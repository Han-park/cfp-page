import Link from 'next/link';
import { Locale } from '@/i18n.config';
import PageWrapper from '@/components/PageWrapper';
import { getDictionary } from '@/lib/dictionary';
import { JSX } from 'react';
import Image from 'next/image';

export default async function AboutPage({
  params,
}: {
  params: { lang: Locale }
}): Promise<JSX.Element> {
  const lang = params.lang;
  const dict = await getDictionary(lang);
  
  return (
    <PageWrapper lang={lang}>
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Left column - Thumbnail */}
        <div className="relative aspect-square bg-[#D3D3D3] border border-black/50">
          <Image 
            src="/img/thumbnail/ww.png" 
            alt="About"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Right column - Content */}
        <div className="text-[#0000FF]">
          <p className="mb-4">{dict.home.description}</p>
          <ul className="list-disc ml-6 space-y-2">
            {dict.home.bulletPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
          
          <div className="mt-8">
            <Link href="https://jonghan.substack.com" target="_blank">
              <button className="border border-black/80 px-3 py-2">
                <p className="text-sm text-black/80">
                  {dict.home.newsletter}
                </p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
} 