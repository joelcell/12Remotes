
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
    // Check if we already have enriched data (using Alex as a proxy)
    const alex = users.find(u => u.id === 'talent_1');
    if (alex && alex.experience && alex.experience.length > 0) return;

    console.log("Enriching Talent Profiles with Professional Data...");

    const TALENT_TITLES = [
        "Product Director", "Senior Marketing Manager", "Lead Frontend Engineer", "UX Research Lead",
        "Operations Manager", "Data Science Architect", "Growth Lead", "Technical Program Manager",
        "Brand Strategy Director", "DevOps Specialist", "Product Marketing Lead", "Cloud Solutions Architect"
    ];

    const SKILLS_POOL = [
        "React", "Node.js", "AWS", "Python", "Product Strategy", "Growth Hacking", "SEO/SEM",
        "UX Design", "Agile", "Kubernetes", "Data Analytics", "Public Speaking", "Team Leadership"
    ];

    const SAMPLE_COMPANIES = ["Google", "Meta", "Grab", "Spotify", "Netflix", "Athelas", "Scale AI", "Vercel"];

    // Update existing seeded talent users
    users.forEach((user, i) => {
        if (user.role === 'TALENT') {
            const index = parseInt(user.id.split('_')[1]) || 1;
            const title = TALENT_TITLES[index % TALENT_TITLES.length];

            user.title = title;
            user.vetted = Math.random() > 0.3;
            user.top5 = Math.random() > 0.6;
            user.bio = `Experienced specialist with a focus on ${title.toLowerCase()}. Passionate about building scalable remote teams and driving innovation in tech.`;

            // Ensure unique skills
            const uniqueSkills = new Set<string>();
            while (uniqueSkills.size < 3) {
                uniqueSkills.add(getRandomItem(SKILLS_POOL));
            }
            user.skills = Array.from(uniqueSkills);

            user.experience = [
                {
                    company: getRandomItem(SAMPLE_COMPANIES),
                    role: title,
                    period: "2022 - Present",
                    description: `Leading core initiatives and scaling remote operations at a fast-growing tech company. Involved in high-level architectural decisions and strategic planning.`,
                    campaigns: ["Global Expansion 2023", "Product Rebrand", "AI Integration Drive"]
                },
                {
                    company: getRandomItem(SAMPLE_COMPANIES),
                    role: "Senior Associate",
                    period: "2019 - 2022",
                    description: `Managed cross-functional teams and delivered high-impact projects. Focused on user-centric design and performance optimization.`,
                    campaigns: ["User Acquisition 2.0", "Internal Tools Optimization"]
                }
            ];
        }
    });

    console.log(`Enriched ${users.filter(u => u.role === 'TALENT').length} talent profiles.`);
}
