import Link from 'next/link';
import { getDictionary } from "@/lib/dictionary";
import { Locale } from '@/i18n.config';
import PageWrapper from '@/components/PageWrapper';

export default async function AboutPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);

  return (
    <PageWrapper lang={lang}>
      <div className="mb-8 text-[#0000FF]">
        <p className="mb-1">{dict.home.description}</p>
        <ul className="list-disc ml-6 space-y-1">
          {dict.home.bulletPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>

      <Link href="https://jonghan.substack.com" target="_blank">
        <button className="border border-black/80 px-3 py-2 mb-16">
          <p className="text-sm text-black/80">
            {dict.home.newsletter}
          </p>
        </button>
      </Link>
    </PageWrapper>
  );
} 