import { Project } from '@/types';

export const projectsData: Project[] = [
    {
        id: 'sciverse',
        title: 'Sciverse: Physics Dialogs',
        description: 'An interactive physics learning environment inspired by the Socratic method. Features a "Mentor" AI that guides learners through concepts like Forces and Motion using interactive simulations and directed questioning.',
        imageUrl: '/api/placeholder/400/300', // We will replace this with a real screenshot later
        technologies: ['React', 'TypeScript', 'Socratic Logic', 'Interactive Canvas'],
        demoUrl: '/projects/science-lab', // Keeping route same for now, or could change to /sciverse
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