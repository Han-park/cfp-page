import Image from 'next/image';
import Header from "@/components/Header";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from '@/i18n.config';
import GitHubActivity from '@/components/GitHubActivity';
import ProjectsSection from '@/components/ProjectsSection';

export default async function Home({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang);

  return (
    <div className="flex flex-col min-h-screen p-6">
      <Header lang={lang} />
      <main className="flex-1 pt-32">
        <ProjectsSection title={dict.home.title} />
      </main>

      <GitHubActivity />

      <footer className="flex flex-col gap-8 text-[#0000FF]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h2 className="font-normal mb-1">contact</h2>
            <ul className="list-disc ml-6">
              <li>
                <a href="mailto:me@han-park.info" className="hover:underline">
                  me@han-park.info
                </a>
              </li>
            </ul>
          </div>
          <div>copyright 2025 by Han Park</div>
        </div>
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