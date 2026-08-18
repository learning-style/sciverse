import { projectsData } from './data/projectsData';
import { ProjectCard } from './components/ProjectCard';

export const ShowcasePage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Project Showcase</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    A collection of projects demonstrating my journey and capabilities in software engineering.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsData.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};