'use client';
import Image from 'next/image';
import { projects } from '@/types/project';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Locale } from '@/i18n.config';

export default function ProjectsSection1() {
  const params = useParams();
  const lang = params.lang as Locale;

  // Filter projects with projectSeasonId: 1
  const season1Projects = projects.filter(project => project.projectSeasonId === 1);

  return (
    <div className="mb-16">
      <div className='flex justify-between'>
        <div className="flex gap-8">
          <h1 className="md:text-4xl text-2xl text-[#0000FF] font-bold">1.0</h1>
          <p className="md:text-base text-sm font-bold leading-tight text-[#0000FF]">
            {lang === 'en' ? 'Creative' : '크리에이티브'}<br/>
            {lang === 'en' ? 'Event Planning and Operation' : '이벤트 플래닝과 운영'}
          </p>
        </div>
        <p className='md:text-base text-sm font-semibold leading-tight text-[#0000FF]'>2024</p>
      </div>
      <hr className="border-t border-1 border-[#0000FF] my-4" />
      <div className="flex gap-8 flex-wrap">
        {season1Projects.map((project) => (
          <Link href={`/${lang}/p/${project.id}`} key={project.id}>
            <div>
              <div className="flex gap-4 py-3">
              
                {/* Left column - Thumbnail */}
                <div 
                  className="relative w-36 h-36 aspect-square bg-[#D3D3D3] border border-black/50 cursor-pointer"
                >
                  <Image 
                    src={project.thumbnail}
                    alt={lang === 'en' && project.localizedContent?.en?.title ? project.localizedContent.en.title : project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Right column - Title and Description */}
                <div className="flex flex-col justify-top max-w-[250px]">
                  <h3 className="text-lg font-semibold text-[#0000FF] mb-1">
                    {lang === 'en' && project.localizedContent?.en?.title 
                      ? project.localizedContent.en.title 
                      : project.title}
                  </h3>
                  <p className="text-xs text-[#0000FF]">
                    {lang === 'en' && project.localizedContent?.en?.description 
                      ? project.localizedContent.en.description 
                      : project.description}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 