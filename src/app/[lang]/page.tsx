import { Locale } from '@/i18n.config';
import GitHubActivity from '@/components/GitHubActivity';
import PageWrapper from '@/components/PageWrapper';
import YoutubeSection from '@/components/YoutubeSection';
import { JSX } from 'react';
import ProjectsSection3 from '@/components/ProjectsSection3';
import ProjectsSection2 from '@/components/ProjectsSection2';
import ProjectsSection1 from '@/components/ProjectsSection1';
import ArchiveSection from '@/components/ArchiveSection';
import SubstackSection from '@/components/SubstackSection';
// import YouTubeVlogs from '@/components/YouTubeVlogs'; // Don't use both YouTube components at once

export default async function HomePage({
  params,
}: {
  params: { lang: Locale };
}): Promise<JSX.Element> {
  const lang = params.lang;
  
  return (
    <PageWrapper lang={lang}>
      <ProjectsSection3 />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <YoutubeSection />
        <SubstackSection />
      </div>
      <ProjectsSection2 />
      <ProjectsSection1 />
      <ArchiveSection />
      <GitHubActivity />
    </PageWrapper>
  );
}
