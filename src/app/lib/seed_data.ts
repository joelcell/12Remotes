
import { User, Job } from './store';

export const SEED_USERS: User[] = [];
export const SEED_JOBS: Job[] = [];

// 1. Generate 20 Business Users
const industries = ['Tech', 'Finance', 'Healthcare', 'E-commerce', 'Education', 'Logistics', 'Marketing', 'Real Estate', 'Consulting', 'Energy'];
const companySuffixes = ['Solutions', 'Systems', 'Global', 'Tech', 'Ventures', 'Group', 'Partners', 'Labs', 'Innovations', 'Holdings'];

for (let i = 1; i <= 20; i++) {
    const industry = industries[i % industries.length];
    const suffix = companySuffixes[i % companySuffixes.length];
    const companyName = `BizCorp ${i} ${suffix}`;

    SEED_USERS.push({
        id: `biz_${i}`,
        email: `business${i}@demo.com`,
        password: 'password123',
        name: `Manager of ${companyName}`,
        role: 'BUSINESS',
        image: `https://avatar.vercel.sh/biz_${i}`,
        companyName: companyName
    });
}

// 2. Generate 20 Talent Users
const distinctRoles = ['Developer', 'Designer', 'Marketer', 'Product Manager', 'Data Analyst'];
const firstNames = ['Alex', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Jamie', 'Quinn', 'Skyler', 'Avery', 'Riley', 'Cameron', 'Dakota', 'Reese', 'Rowan', 'Sawyer', 'Parker', 'Kai', 'Elian', 'Charlie', 'Finley'];

for (let i = 1; i <= 20; i++) {
    const role = distinctRoles[i % distinctRoles.length];
    SEED_USERS.push({
        id: `talent_${i}`,
        email: `talent${i}@demo.com`,
        password: 'password123',
        name: `${firstNames[i - 1]} Talent`,
        role: 'TALENT',
        image: `https://avatar.vercel.sh/talent_${i}`
    });
}

// 3. Generate Job Postings (Approx 2 per business)
const jobTemplates = [
    {
        title: "Senior Frontend Engineer",
        category: "Engineering",
        salary: "$120,000 - $150,000",
        description: "We are looking for an experienced Frontend Engineer to lead our web development team. You will be working with React, Next.js, and TypeScript to build scalable applications.",
        requirements: ["5+ years of experience with React", "Strong understanding of web performance", "Experience with state management (Redux, Zustand)"],
        responsibilities: ["Develop new user-facing features", "Build reusable code and libraries", "Optimize application for maximum speed"],
        benefits: ["Remote work", "Health insurance", "Stock options"],
        bonus: "Sign-on bonus $5,000"
    },
    {
        title: "Product Marketing Manager",
        category: "Marketing",
        salary: "$90,000 - $120,000",
        description: "Join our marketing team to drive product adoption and growth. You will be responsible for product positioning, messaging, and go-to-market strategy.",
        requirements: ["3+ years in product marketing", "Excellent written communication skills", "Experience with B2B SaaS"],
        responsibilities: ["Create product content (blogs, whitepapers)", "Plan and execute product launches", "Collaborate with sales and product teams"],
        benefits: ["Flexible hours", "Gym membership", "Annual retreat"],
        bonus: "Performance bonus up to 10%"
    },
    {
        title: "Backend Developer (Go/Node.js)",
        category: "Engineering",
        salary: "$110,000 - $140,000",
        description: "We need a backend specialist to optimize our API and database performance. You will design and implement high-availability services.",
        requirements: ["Proficiency in Go or Node.js", "Experience with PostgreSQL/MySQL", "Knowledge of Docker and Kubernetes"],
        responsibilities: ["Design and build scalable REST APIs", "Database optimization and schema design", "Ensure system reliability"],
        benefits: ["401k matching", "Unlimited PTO", "Home office stipend"],
        bonus: "Yearly equity refresh"
    },
    {
        title: "UX/UI Designer",
        category: "Design",
        salary: "$80,000 - $110,000",
        description: "Create beautiful and intuitive user interfaces for our core product. You will work closely with product managers and engineers.",
        requirements: ["Portfolio demonstrating strong UI skills", "Proficiency in Figma", "Understanding of user-centered design principles"],
        responsibilities: ["Create wireframes and prototypes", "Conduct user research", "Maintain design system"],
        benefits: ["MacBook Pro", "Conference budget", "Health & Dental"],
        bonus: "None"
    },
    {
        title: "Sales Representative",
        category: "Sales",
        salary: "$60,000 + Commission",
        description: "Drive revenue growth by identifying and closing new business opportunities. You will be the face of the company to prospective clients.",
        requirements: ["1-2 years of sales experience", "Strong interpersonal skills", "Self-motivated and goal-oriented"],
        responsibilities: ["Prospect and qualify leads", "Demo product to potential clients", "Negotiate contracts"],
        benefits: ["Competitive commission structure", "Training program", "Company car (if applicable)"],
        bonus: "Uncapped commission"
    }
];

let jobIdCounter = 1;

// Assign jobs to businesses
SEED_USERS.filter(u => u.role === 'BUSINESS').forEach(biz => {
    // Each business gets 1-3 jobs
    const numJobs = Math.floor(Math.random() * 3) + 1;

    for (let j = 0; j < numJobs; j++) {
        const template = jobTemplates[(jobIdCounter + j) % jobTemplates.length];

        SEED_JOBS.push({
            id: jobIdCounter++,
            title: template.title,
            companyId: biz.id,
            companyName: biz.companyName!,
            location: "Remote",
            salary: template.salary,
            category: template.category as any,
            description: template.description,
            requirements: template.requirements,
            responsibilities: template.responsibilities,
            benefits: template.benefits,
            bonus: template.bonus,
            companyInfo: `${biz.companyName} is a leading company in the ${industries[parseInt(biz.id.split('_')[1]) % industries.length]} industry, dedicated to innovation and excellence.`,
            status: 'Active',
            applicantsCount: Math.floor(Math.random() * 50),
            viewsCount: Math.floor(Math.random() * 500) + 50,
            postedAt: new Date()
        });
    }
});
