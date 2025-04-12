'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Project, projects } from '@/types/project';
import ProjectModal from './ProjectModal';

export default function ProjectsSection({ title }: { title: string }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <div className="mb-16">
        <h2 className="text-[#0000FF] font-normal mb-4">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="aspect-square bg-[#D3D3D3] cursor-pointer border border-black/50 relative"
              onClick={() => setSelectedProject(project)}
            >
              <Image 
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <ProjectModal 
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
} 