'use client';
import { useState } from 'react';
import Link from 'next/link';
import ProjectModal from '../components/ProjectModal';
import { Project, projects } from '../types/project';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="flex flex-col min-h-screen p-8">
      <main className="flex-1">
        <div className="mb-12 flex gap-2">
          <h1 className="text-[#0000FF] text-5xl font-normal">
            CFP
          </h1>
          <p className="text-[#0000FF] text-lg font-normal">2025</p>
        </div>

        <div className="mb-8 text-[#0000FF]">
        <p className="mb-1">A lifestyle technology studio enforced by AI.</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Technology is shaped by culture—we believe people should have control, not just algorithms.</li>
            <li>We create tools that give people power, making interactions more meaningful.</li>
            <li>Creative work needs consistency, and we help people build it.</li>
            <li>This February, we&rsquo;re launching a new app to bring technology and creativity together.</li>
          </ul>
        </div>

        <Link href="https://jonghan.substack.com" target="_blank">
        <button className="border border-black/60 px-3 py-2 mb-16">
        <p className="text-sm text-black/60">
          My newsletter (Korean language)
        </p>
        </button>
        </Link>

        <div className="mb-16">
          <h2 className="text-[#0000FF] font-normal mb-4">project list</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="aspect-square bg-[#D3D3D3] cursor-pointer border border-black/50"
                onClick={() => setSelectedProject(project)}
              >
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </main>

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
          <img 
            src="/img/cfp-logo-vintage-blue.png" 
            alt="CFP Logo" 
            className="h-8 w-auto"
          />
        </div>
      </footer>

      <ProjectModal 
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
} 