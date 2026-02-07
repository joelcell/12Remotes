
export interface Experience {
    company: string;
    role: string;
    period: string;
    description: string;
    campaigns?: string[];
}

export interface User {
    id: string;
    email: string;
    password?: string;
    name: string;
    role: 'BUSINESS' | 'TALENT';
    image?: string;
    companyName?: string; // For business
    // Talent specific fields
    title?: string;
    bio?: string;
    vetted?: boolean;
    top5?: boolean;
    skills?: string[];
    experience?: Experience[];
}

export interface Job {
    id: number;
    title: string;
    companyId: string;
    companyName: string;
    location: string;
    salary: string;
    category: 'Engineering' | 'Product' | 'Marketing' | 'Operations' | 'IT' | 'Sales' | 'Design';
    description: string;
    requirements: string[];
    responsibilities: string[];
    benefits: string[];
    bonus: string;
    companyInfo: string;
    status: 'Active' | 'Closed';
    applicantsCount: number;
    viewsCount: number;
    postedAt: Date;
}

import { SEED_USERS, SEED_JOBS } from './seed_data';

// Global store to persist across server actions in dev env (sometimes)
// In Next.js App Router, globalThis is often used to keep singleton in dev.
const globalForStore = globalThis as unknown as {
    mockUsers: User[] | undefined;
    mockJobs: Job[] | undefined;
};

export const users: User[] = globalForStore.mockUsers || SEED_USERS;
export const jobs: Job[] = globalForStore.mockJobs || SEED_JOBS;

if (process.env.NODE_ENV !== "production") {
    globalForStore.mockUsers = users;
    globalForStore.mockJobs = jobs;
}

export function addUser(user: User) {
    users.push(user);
}

export function addJob(job: Job) {
    jobs.push(job);
}

export function findUserByEmail(email: string) {
    return users.find(u => u.email === email);
}

export function getJobs() {
    return jobs;
}

export function getJobById(id: number) {
    return jobs.find(j => j.id === id);
}

export function getTalents() {
    return users.filter(u => u.role === 'TALENT');
}

export function getTalentById(id: string) {
    return users.find(u => u.id === id && u.role === 'TALENT');
}
