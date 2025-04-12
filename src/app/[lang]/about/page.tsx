import Link from 'next/link';
import { Locale } from '@/i18n.config';
import PageWrapper from '@/components/PageWrapper';

// Simplified version without async/await
export default function AboutPage({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  return (
    <PageWrapper lang={lang}>
      <div className="mb-8 text-[#0000FF]">
        <p className="mb-1">About page placeholder</p>
        <ul className="list-disc ml-6 space-y-1">
          <li>This is a placeholder for the about page</li>
          <li>The actual content will load dynamically in development</li>
        </ul>
      </div>

      <Link href="https://jonghan.substack.com" target="_blank">
        <button className="border border-black/80 px-3 py-2 mb-16">
          <p className="text-sm text-black/80">
            My substack blog
          </p>
        </button>
      </Link>
    </PageWrapper>
  );
} 