'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Project, projects } from '@/types/project';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/lib/dictionary';
import { useEffect, useCallback } from 'react';
import { Locale } from '@/i18n.config';

export default function ArchiveSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dictionary, setDictionary] = useState<any>(null);
  const params = useParams();
  const lang = params.lang as Locale;

  // Filter projects with projectSeasonId: 'a'
  const archiveProjects = projects.filter(project => project.projectSeasonId === 'a');

  const loadDictionary = useCallback(async () => {
    if (lang) {
      const dict = await getDictionary(lang);
      setDictionary(dict);
    }
  }, [lang]);

  useEffect(() => {
    loadDictionary();
  }, [loadDictionary]);

  return (
    <div className="mb-16">
      <div className='flex justify-between'>
        <div className="flex gap-8">
          <h1 className="text-2xl text-[#0000FF] font-bold">Archive</h1>
        </div>
        <p className='text-base font-semibold leading-tight text-[#0000FF]'>2017 - 2023</p>
      </div>
      <hr className="border-t border-1 border-[#0000FF] my-4" />
      <div className="flex gap-8 flex-wrap">
        {archiveProjects.map((project) => (
          <Link href={`/${lang}/p/${project.id}`} key={project.id}>
            <div>
              <div className="flex gap-4 py-3">
              
                {/* Left column - Thumbnail */}
                <div 
                  className="relative w-36 h-36 aspect-square bg-[#D3D3D3] border border-black/50 cursor-pointer"
                >
                  <Image 
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Right column - Title and Description */}
                <div className="flex flex-col justify-top max-w-[250px]">
                  <h3 className="text-lg font-semibold text-[#0000FF] mb-1">{project.title}</h3>
                  <p className="text-xs text-[#0000FF]">{project.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 