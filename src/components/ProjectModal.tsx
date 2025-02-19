import { Project } from '../types/project';
import Modal from './Modal';
import Link from 'next/link';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <Modal isOpen={!!project} onClose={onClose}>
      {project && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#0000FF]">
            {project.title}
          </h2>
          <img 
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <p className="text-gray-700">
            {project.description}
          </p>
          <div className="text-gray-600">
            {project.details}
          </div>
          <Link href={project.url} target="_blank">
            <button className="border border-black/60 px-3 py-2 mt-8">
              <p className="text-sm text-black/60">
                Visit the app
              </p>
            </button>
          </Link>
        </div>
      )}
    </Modal>
  );
}