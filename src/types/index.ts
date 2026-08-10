// Core type definitions

export interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    technologies: string[];
    demoUrl?: string;
    repoUrl?: string;
    featured: boolean;
}

export interface NavItem {
    label: string;
    path: string;
}