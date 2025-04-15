import { Locale } from '@/i18n.config';
import { projects } from '@/types/project';
import PageWrapper from '@/components/PageWrapper';
import { getDictionary } from '@/lib/dictionary';
import { JSX } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  const paths = [];
  
  // Generate for each locale and project
  for (const locale of ['en', 'ko']) {
    for (const project of projects) {
      paths.push({
        lang: locale,
        id: project.id
      });
    }
  }
  
  return paths;
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { lang: Locale; id: string }
}): Promise<JSX.Element> {
  const { lang, id } = params;
  await getDictionary(lang); // Keep for future use but avoid unused variable warning
  
  // Find the project with the matching ID
  const project = projects.find(p => p.id === id);
  
  // If project not found, return 404
  if (!project) {
    return notFound();
  }
  
  // Get localized content if available, otherwise use default
  const localizedTitle = project.localizedContent?.[lang]?.title || project.title;
  const localizedDescription = project.localizedContent?.[lang]?.description || project.description;
  const localizedDetails = project.localizedContent?.[lang]?.details || project.details;
  const localizedButtonText = project.localizedContent?.[lang]?.buttonText || project.buttonText;
  
  // Get localized overview content if available, otherwise use default
  const localizedCategory = project.localizedContent?.[lang]?.category || project.category;
  const localizedYear = project.localizedContent?.[lang]?.year || project.year;
  const localizedScope = project.localizedContent?.[lang]?.scope || project.scope;
  const localizedCollaborator = project.localizedContent?.[lang]?.collaborator || project.collaborator;
  const localizedPosition = project.localizedContent?.[lang]?.position || project.position;
  
  // Overview section component
  const OverviewSection = () => (
    <div className="border-t border-b border-[#0000FF]/60 ml-4 my-8 max-w-xs">
      {localizedCategory && (
        <div className="gap-4 flex py-1 border-b border-[#0000FF]/60 last:border-b-0">
          <div className="font-semibold text-[#0000FF] text-sm">Category</div>
          <div className="text-[#0000FF] text-sm">{localizedCategory}</div>
        </div>
      )}
      {localizedYear && (
        <div className="gap-4 flex py-1 border-b border-[#0000FF]/60 last:border-b-0">
          <div className="font-semibold text-[#0000FF] text-sm">Year</div>
          <div className="text-[#0000FF] text-sm">{localizedYear}</div>
        </div>
      )}
      {localizedPosition && (
        <div className="gap-4 flex py-1 border-b border-[#0000FF]/60 last:border-b-0">
          <div className="font-semibold text-[#0000FF] text-sm">Committed as</div>
          <div className="text-[#0000FF] text-sm">{localizedPosition}</div>
        </div>
      )}
      {localizedScope && (
        <div className="gap-4 flex py-1 border-b border-[#0000FF]/60 last:border-b-0">
          <div className="font-semibold text-[#0000FF] text-sm">Scope</div>
          <div className="text-[#0000FF] text-sm">{localizedScope}</div>
        </div>
      )}
      {localizedCollaborator && (
        <div className="gap-4 flex py-1 border-b border-[#0000FF]/60 last:border-b-0">
          <div className="font-semibold text-[#0000FF] text-sm">Collaborator</div>
          <div className="text-[#0000FF] text-sm">{localizedCollaborator}</div>
        </div>
      )}
    </div>
  );
  
  return (
    <PageWrapper lang={lang}>
      <div className="mb-32">
        <Link href={`/${lang}`} className="text-black/40 text-sm font-semibold mb-2 inline-block">
          ← Back to Projects
        </Link>
        
        {/* For medium screens and up - 2 column layout */}
        <div className="mt-6 hidden md:grid md:grid-cols-2 md:gap-12">
          {/* Left column - Project Details */}
          <div className="mb-16 text-[#0000FF]">
            <h1 className="text-3xl font-bold mb-4">{localizedTitle}</h1>
            <p className="text-sm mb-6">{localizedDescription}</p>
            
            {/* Overview Section */}
            <OverviewSection />
            
            <div className="text-sm mt-6">
              {localizedDetails.split('\n').map((paragraph, index) => (
                paragraph ? <p key={index} className="mb-4">{paragraph}</p> : <br key={index} />
              ))}
            </div>
            
            {project.url && (
              <Link href={project.url} target="_blank">
                <button className="border border-black/80 px-4 py-2 mt-8 hover:bg-gray-100 transition">
                  <p className="text-sm text-black/80">{localizedButtonText}</p>
                </button>
              </Link>
            )}
          </div>

          {/* Right column - All Project Images */}
          <div className="space-y-6 mb-8 md:mb-0">
            {/* Display thumbnail first if available */}
            {project.thumbnail && (
              <div className="relative" style={{ width: '40%' }}>
                <Image 
                  src={project.thumbnail}
                  alt={`${localizedTitle} - Thumbnail`}
                  width={800}
                  height={600}
                  style={{ 
                    width: '100%', 
                    height: 'auto',
                    objectFit: 'contain'
                  }}
                />
              </div>
            )}
            
            {/* Then display all images from the images array */}
            {project.images.map(([imageUrl, widthRatio], index) => (
              <div 
                key={index} 
                className="relative" 
                style={{ width: `${widthRatio}%` }}
              >
                <Image 
                  src={imageUrl}
                  alt={`${localizedTitle} - Image ${index + 1}`}
                  width={800}
                  height={600}
                  style={{ 
                    width: '100%', 
                    height: 'auto',
                    objectFit: 'contain'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* For mobile view - specific stacked order */}
        <div className="md:hidden mt-6 space-y-6">
          {/* 1. Title */}
          <h1 className="text-3xl font-bold mb-4 text-[#0000FF]">{localizedTitle}</h1>
          
          {/* 2. Description */}
          <p className="text-sm text-[#0000FF]">{localizedDescription}</p>
          
          {/* 3. Thumbnail image */}
          {project.thumbnail && (
            <div className="relative" style={{ width: '40%' }}>
              <Image 
                src={project.thumbnail}
                alt={`${localizedTitle} - Thumbnail`}
                width={800}
                height={600}
                style={{ 
                  width: '100%', 
                  height: 'auto',
                  objectFit: 'contain'
                }}
              />
            </div>
          )}
          
          {/* Overview Section */}
          <OverviewSection />
          
          {/* 4. Details */}
          <div className="text-sm text-[#0000FF]">
            {localizedDetails.split('\n').map((paragraph, index) => (
              paragraph ? <p key={index} className="mb-4">{paragraph}</p> : <br key={index} />
            ))}
          </div>
          
          {/* 5. Button */}
          <div>
            {project.url && (
              <Link href={project.url} target="_blank">
                <button className="border border-black/80 px-4 py-2 hover:bg-gray-100 transition">
                  <p className="text-sm text-black/80">{localizedButtonText}</p>
                </button>
              </Link>
            )}
          </div>
          
          {/* 6. Remaining images from images array */}
          <div className="space-y-6 pt-6">
            {project.images.map(([imageUrl, widthRatio], index) => (
              <div 
                key={index} 
                className="relative" 
                style={{ width: `${widthRatio}%` }}
              >
                <Image 
                  src={imageUrl}
                  alt={`${localizedTitle} - Image ${index + 1}`}
                  width={800}
                  height={600}
                  style={{ 
                    width: '100%', 
                    height: 'auto',
                    objectFit: 'contain'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
} 