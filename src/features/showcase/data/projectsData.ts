import { Project } from '@/types';

export const projectsData: Project[] = [
    {
        id: 'science-lab',
        title: 'The Inquiry Engine',
        description: 'An interactive science learning environment that uses Socratic branching logic to guide learners through complex biological concepts. Features directional thinking prompts and a gamified "Lab" interface.',
        imageUrl: '/api/placeholder/400/300', // We will replace this with a real screenshot later
        technologies: ['React', 'TypeScript', 'State Machines', 'Tailwind CSS'],
        demoUrl: '/projects/science-lab', // Internal route
        repoUrl: 'https://github.com/rkpingali-stack',
        featured: true
    },
    {
        id: 'portfolio-v1',
        title: 'Citizen Architect Portfolio',
        description: 'The website you are currently looking at. A dark-mode-first, responsive personal portfolio built with modern web technologies.',
        imageUrl: '/api/placeholder/400/300',
        technologies: ['Vite', 'React', 'Tailwind CSS'],
        repoUrl: 'https://github.com/rkpingali-stack',
        featured: false
    }
];