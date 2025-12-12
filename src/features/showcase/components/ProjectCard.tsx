import { Link } from 'react-router-dom';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Project } from '@/types';

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-colors group flex flex-col h-full">
            {/* Image Placeholder */}
            <div className="h-48 bg-slate-800 flex items-center justify-center text-slate-600 relative overflow-hidden">
                <span className="z-10">{project.title} Preview</span>
                <div className="absolute inset-0 bg-slate-800 group-hover:bg-slate-700 transition-colors" />
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2 text-slate-100 group-hover:text-blue-400 transition-colors">
                    {project.title}
                </h3>
                
                <p className="text-slate-400 text-sm mb-4 flex-grow">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-slate-800 text-xs rounded-md text-slate-300 border border-slate-700">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-3 mt-auto">
                    {project.demoUrl && (
                        <Link 
                            to={project.demoUrl}
                            className="flex-1 inline-flex justify-center items-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
                        >
                            Launch <ArrowRight size={16} className="ml-2" />
                        </Link>
                    )}
                    
                    {project.repoUrl && (
                        <a 
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex justify-center items-center p-2 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                            aria-label="View Source Code"
                        >
                            <Github size={20} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};