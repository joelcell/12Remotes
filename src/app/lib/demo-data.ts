
import { users, jobs, User, Job } from './store';

const LOCATIONS = ["Remote", "Remote (US)", "Remote (EU)", "Remote (APAC)", "Global"];

const COMPANY_PROFILES = [
    { name: "TechNova", info: "A leading AI startup revolutionizing data analytics." },
    { name: "FinStream", info: "Fintech company building the future of decentralized finance." },
    { name: "CloudScale", info: "Enterprise cloud solutions provider serving Fortune 500." },
    { name: "CreativeMinds", info: "Digital agency focused on award-winning brand experiences." },
    { name: "EcoGrowth", info: "Sustainable technology solutions for a greener planet." },
    { name: "HealthPlus", info: "Digital health platform connecting patients with top doctors." },
    { name: "EduLearn", info: "EdTech platform making world-class education accessible." },
    { name: "ShopEase", info: "E-commerce giant simplifying online retail for everyone." },
    { name: "SecureNet", info: "Cybersecurity firm protecting global digital assets." },
    { name: "AutoDrive", info: "Autonomous vehicle software startup." }
];

const IT_TEMPLATES = [
    {
        title: "Senior Full Stack Engineer",
        description: "We are looking for an experienced Full Stack Engineer to lead our core product team. You will architect scalable solutions and drive technical excellence.",
        requirements: [
            "5+ years of experience with React and Node.js",
            "Deep understanding of cloud architecture (AWS/GCP)",
            "Experience with database design (SQL/NoSQL)",
            "Strong problem-solving skills and leadership ability"
        ],
        responsibilities: [
            "Design and implement end-to-end features",
            "Mentor junior developers and conduct code reviews",
            "Optimize application performance and scalability",
            "Collaborate with product and design teams"
        ],
        benefits: ["Remote-first culture", "Competitive equity package", "Unlimited PTO", "Home office stipend"],
        bonus: "Sign-on bonus up to $10k"
    },
    {
        title: "DevOps Engineer",
        description: "Join our infrastructure team to build robust CI/CD pipelines and ensure high availability of our services.",
        requirements: [
            "Proficiency in Docker and Kubernetes",
            "Experience with Terraform or Ansible",
            "Strong scripting skills (verified in Python/Bash)",
            "Knowledge of monitoring tools (Prometheus, Grafana)"
        ],
        responsibilities: [
            "Manage cloud infrastructure and deployments",
            "Automate operational processes",
            "Ensure system security and compliance",
            "Troubleshoot production issues"
        ],
        benefits: ["Health, Dental, Vision insurance", "401k matching", "Annual learning budget", "Flexible hours"],
        bonus: "Performance-based annual bonus"
    }
];

const MKT_TEMPLATES = [
    {
        title: "Digital Marketing Manager",
        description: "Lead our digital marketing strategy to drive user acquisition and brand awareness globally.",
        requirements: [
            "4+ years in digital marketing or growth roles",
            "Expertise in SEO/SEM and content strategy",
            "Data-driven mindset with experience in Analytics",
            "Excellent communication and project management skills"
        ],
        responsibilities: [
            "Develop and execute multi-channel marketing campaigns",
            "Analyze campaign performance and ROI",
            "Manage social media presence and community",
            "Collaborate with sales to generate leads"
        ],
        benefits: ["Remote work", "Quarterly team retreats", "Wellness allowance", "MacBook Pro"],
        bonus: "Quarterly performance bonus (10-20%)"
    },
    {
        title: "Content Strategist",
        description: "Craft compelling narratives and content strategies that resonate with our audience and drive engagement.",
        requirements: [
            "Proven experience in content creation and strategy",
            "Strong writing and editing skills",
            "Understanding of SEO best practices",
            "Ability to work independently in a fast-paced environment"
        ],
        responsibilities: [
            "Create high-quality blog posts, whitepapers, and case studies",
            "Manage the editorial calendar",
            "Collaborate with design for visual assets",
            "Measure content performance"
        ],
        benefits: ["Flexible schedule", "Book stipend", "Mental health support", "Co-working space allowance"],
        bonus: "Year-end bonus"
    }
];

function getRandomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function initializeDemoData() {
    if (users.length > 0) return; // Already initialized

    console.log("Initializing Rich Demo Data...");

    // 1. Generate 20 Business Users
    for (let i = 1; i <= 20; i++) {
        const companyProfile = COMPANY_PROFILES[(i - 1) % COMPANY_PROFILES.length];
        const companyName = `${companyProfile.name} ${i}`; // Unique-ish name
        const businessId = `biz_${i}`;

        const business: User = {
            id: businessId,
            name: `Hiring Manager at ${companyName}`,
            email: `business${i}@demo.com`,
            password: 'password',
            role: 'BUSINESS',
            companyName: companyName,
            image: `https://avatar.vercel.sh/${businessId}`
        };
        users.push(business);

        // Generate 1-2 Jobs
        const jobCount = Math.floor(Math.random() * 2) + 1;
        for (let j = 0; j < jobCount; j++) {
            const isIT = Math.random() > 0.5;
            const category = isIT ? 'IT' : 'Marketing';
            const template = isIT ? getRandomItem(IT_TEMPLATES) : getRandomItem(MKT_TEMPLATES);

            const job: Job = {
                id: jobs.length + 1,
                title: template.title,
                companyId: businessId,
                companyName: companyName,
                location: getRandomItem(LOCATIONS),
                salary: `$${80 + Math.floor(Math.random() * 80)}k - $${160 + Math.floor(Math.random() * 60)}k`,
                category: category as any,
                description: template.description,
                requirements: template.requirements,
                responsibilities: template.responsibilities,
                benefits: template.benefits,
                bonus: template.bonus,
                companyInfo: companyProfile.info,
                status: 'Active',
                applicantsCount: Math.floor(Math.random() * 50) + 5,
                viewsCount: Math.floor(Math.random() * 500) + 100,
                postedAt: new Date(Date.now() - Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000)) // Random date last 10 days
            };
            jobs.push(job);
        }
    }

    // 2. Generate 20 Talent Users
    for (let i = 1; i <= 20; i++) {
        const talentId = `talent_${i}`;
        const talent: User = {
            id: talentId,
            name: `Talent Candidate ${i}`,
            email: `talent${i}@demo.com`,
            password: 'password',
            role: 'TALENT',
            image: `https://avatar.vercel.sh/${talentId}`
        };
        users.push(talent);
    }

    console.log(`Generated ${users.length} users and ${jobs.length} jobs.`);
}
