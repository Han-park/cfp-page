import Link from 'next/link';
import { Locale } from '@/i18n.config';
import PageWrapper from '@/components/PageWrapper';
import { getDictionary } from '@/lib/dictionary';
import { JSX } from 'react';

export default async function AboutPage({
  params,
}: {
  params: { lang: Locale }
}): Promise<JSX.Element> {
  const lang = params.lang;
  const dict = await getDictionary(lang);
  
  return (
    <PageWrapper lang={lang}>
      <div className="max-w-2xl">
        {/* About Content */}
        <div className="text-[#0000FF] mb-8">
          <div className="mb-6">
            {dict.home.description.split('\n').map((paragraph, index) => (
              paragraph ? <p key={index} className="mb-3">{paragraph}</p> : <br key={index} />
            ))}
          </div>
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
        
        {/* Contact Section */}
        <div className="text-[#0000FF] mt-12">
          <h2 className="text-xl font-semibold mb-4">Contact</h2>
          <ul className="space-y-2">
            <li>
              <span className="font-medium">Email:</span>{' '}
              <a href="mailto:me@han-park.info" className="hover:underline">
                me@han-park.info
              </a>
            </li>
            <li>
              <span className="font-medium">LinkedIn:</span>{' '}
              <a 
                href="https://www.linkedin.com/in/han0park/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Jong-Han Park (Founder/Ops)
              </a>
            </li>
          </ul>
        </div>
      </div>
    </PageWrapper>
  );
} 