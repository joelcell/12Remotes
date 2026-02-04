
import { Users, Code, Megaphone, Shield, PenTool, Database } from "lucide-react";

const CATEGORIES = [
    {
        name: "Human Resources",
        icon: <Users size={24} />,
        subs: ["Recruitment", "Employee Relations", "Compensation & Benefits"]
    },
    {
        name: "Marketing & Branding",
        icon: <Megaphone size={24} />,
        subs: ["Branding Strategy", "Digital Marketing", "Content Creation"]
    },
    {
        name: "Information Technology",
        icon: <Code size={24} />,
        subs: ["Software Development", "Cybersecurity", "DevOps"]
    },
    {
        name: "Design & Creative",
        icon: <PenTool size={24} />,
        subs: ["UI/UX Design", "Graphic Design", "Motion Graphics"]
    }
];

export default function JobCategories() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Browse by Department</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {CATEGORIES.map((cat) => (
                        <div key={cat.name} className="bg-white p-6 rounded-xl border border-gray-100 hover:border-red-100 hover:shadow-xl transition-all group">
                            <div className="w-12 h-12 bg-red-50 text-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                {cat.icon}
                            </div>
                            <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">{cat.name}</h3>
                            <ul className="space-y-2">
                                {cat.subs.map(sub => (
                                    <li key={sub} className="text-sm text-muted hover:text-foreground cursor-pointer flex items-center gap-2">
                                        <span className="w-1 h-1 bg-gray-300 rounded-full" /> {sub}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
