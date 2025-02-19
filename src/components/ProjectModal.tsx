import { Project } from '../types/project';
import Modal from './Modal';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <Modal isOpen={!!project} onClose={onClose}>
      {project && (
        <div className="space-y-4">
          <h2 className="text-2xl font-normal text-[#0000FF]">
            {project.title}
          </h2>
          <div className="relative w-full h-auto aspect-square">
            <Image 
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
          <p className="text-gray-700">
            {project.description}
          </p>
          <div className="text-gray-600">
            {project.details}
          </div>
          <Link href={project.url} target="_blank">
            <button className="border border-black/60 px-3 py-2 mt-8">
              <p className="text-sm text-black/60">
                {project.buttonText}
              </p>
            </button>
          </Link>
        </div>
      )}
    </Modal>
  );
}