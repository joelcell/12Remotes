
export interface User {
    id: string;
    email: string;
    password?: string; // In real app, this should be hashed. Here plain text for demo or simple hash.
    name: string;
    role: 'BUSINESS' | 'TALENT';
    image?: string;
    companyName?: string; // For business
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

// Global store to persist across server actions in dev env (sometimes)
// In Next.js App Router, globalThis is often used to keep singleton in dev.
const globalForStore = globalThis as unknown as {
    mockUsers: User[] | undefined;
    mockJobs: Job[] | undefined;
};

export const users: User[] = globalForStore.mockUsers || [];
export const jobs: Job[] = globalForStore.mockJobs || [];

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
