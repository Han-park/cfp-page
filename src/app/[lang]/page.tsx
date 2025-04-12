// import { getDictionary } from "@/lib/dictionary";
import { Locale } from '@/i18n.config';
import GitHubActivity from '@/components/GitHubActivity';
import ProjectsSection from '@/components/ProjectsSection';
import PageWrapper from '@/components/PageWrapper';

export default /*async*/ function HomePage({ // Temporarily removed async
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  // const dict = await getDictionary(lang); // Temporarily removed await

  return (
    <PageWrapper lang={lang}>
      {/* <ProjectsSection title={dict.home.title} /> */}
      <ProjectsSection title="Projects" /> { /* Temporary placeholder */ }
      <GitHubActivity />
    </PageWrapper>
  );
} 