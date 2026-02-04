
"use client"; // Enable Client Features

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import CurrencyConverter from "@/components/ui/CurrencyConverter";
import { Search, MapPin, DollarSign, Filter, X, Check } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

// Dummy Data
const JOBS = [
    { id: 1, title: "Senior Engineering Manager", company: "Fintech Global", location: "Remote", salary: "$120k - $160k", category: "Engineering" },
    { id: 2, title: "Product Lead", company: "SaaS Corp", location: "Remote (EU)", salary: "$100k - $140k", category: "Product" },
    { id: 3, title: "Head of Marketing", company: "Creative Inc", location: "Remote (US)", salary: "$130k - $180k", category: "Marketing" },
    { id: 4, title: "Operations Director", company: "Logistics Co", location: "Global", salary: "$110k - $150k", category: "Operations" },
];

export default function Marketplace() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [showOnboarding, setShowOnboarding] = useState(true);
    const [preferences, setPreferences] = useState({ role: "", location: "" });

    const filteredJobs = JOBS.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory ? job.category === selectedCategory : true;
        const matchesPref = preferences.role ? job.title.toLowerCase().includes(preferences.role.toLowerCase()) : true;
        return matchesSearch && matchesCategory && matchesPref;
    });

    const handleApply = (id: number) => {
        alert(`Application submitted for Job #${id}!`);
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col relative">
            <Header />

            {/* Onboarding Modal (Personalization) */}
            {showOnboarding && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-2xl max-w-md w-full shadow-2xl border border-red-100 animate-slide-up">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-primary">Welcome, Manager!</h2>
                                <p className="text-muted">Personalize your workspace.</p>
                            </div>
                            <button onClick={() => setShowOnboarding(false)} className="text-gray-400 hover:text-foreground">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Preferred Role</label>
                                <select
                                    className="w-full p-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                    onChange={(e) => setPreferences({ ...preferences, role: e.target.value })}
                                >
                                    <option value="">Select a role...</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Product">Product</option>
                                    <option value="Marketing">Marketing</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Location Preference</label>
                                <select
                                    className="w-full p-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                    onChange={(e) => setPreferences({ ...preferences, location: e.target.value })}
                                >
                                    <option value="">Anywhere</option>
                                    <option value="US">Americas</option>
                                    <option value="EU">Europe</option>
                                    <option value="APAC">Asia Pacific</option>
                                </select>
                            </div>

                            <button
                                onClick={() => setShowOnboarding(false)}
                                className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-red-800 transition-colors mt-4"
                            >
                                Start Exploring
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <main className="flex-grow container mx-auto px-4 pt-32 pb-20">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Sidebar */}
                    <aside className="w-full md:w-64 space-y-8">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-24">
                            <div className="flex items-center gap-2 mb-4 text-primary font-bold">
                                <Filter size={20} />
                                Filters
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h5 className="font-semibold mb-2">Category</h5>
                                    <div className="space-y-2 text-sm text-muted">
                                        {["Engineering", "Product", "Marketing", "Operations"].map(cat => (
                                            <label key={cat} className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    className="accent-primary"
                                                    checked={selectedCategory === cat}
                                                    onChange={() => setSelectedCategory(cat)}
                                                />
                                                {cat}
                                            </label>
                                        ))}
                                        <button
                                            className="text-xs text-primary font-semibold mt-2 hover:underline"
                                            onClick={() => { setSelectedCategory(null); setPreferences({ role: "", location: "" }); }}
                                        >
                                            Clear Filters
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 space-y-6">
                        <div className="flex gap-4 mb-8">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={20} />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search for management roles..."
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
                                />
                            </div>
                            <button className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-800 transition-colors shadow-lg shadow-red-900/10">
                                Search
                            </button>
                        </div>

                        {preferences.role && (
                            <div className="bg-red-50 border border-red-100 p-3 rounded-lg flex items-center gap-2 text-sm text-primary mb-4 animate-fade-in">
                                <Check size={16} />
                                Showing personalized results for <strong>{preferences.role}</strong>
                            </div>
                        )}

                        <div className="grid gap-4">
                            {filteredJobs.length > 0 ? filteredJobs.map((job) => (
                                <JobCard key={job.id} job={job} onApply={() => handleApply(job.id)} />
                            )) : (
                                <div className="text-center py-20 text-muted">
                                    <p>No jobs found matching your criteria.</p>
                                    <button
                                        onClick={() => { setSelectedCategory(null); setSearch(""); setPreferences({ role: "", location: "" }); }}
                                        className="text-primary font-bold mt-2 hover:underline"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

function JobCard({ job, onApply }: { job: any, onApply: () => void }) {
    // Parse rough salary for demo (taking lower bound)
    const baseSalary = parseInt(job.salary.replace(/[^0-9]/g, '').slice(0, 3)) * 1000;

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 hover:border-red-100 hover:shadow-lg transition-all group animate-slide-up">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{job.title}</h3>
                    <p className="text-muted">{job.company}</p>
                </div>
                <span className="bg-red-50 text-primary px-3 py-1 rounded-full text-sm font-medium">{job.location}</span>
            </div>

            <div className="flex gap-6 text-sm text-muted mb-6">
                <div className="flex items-center gap-1">
                    <MapPin size={16} /> Global
                </div>
                <div className="flex items-center gap-1">
                    <DollarSign size={16} /> {job.salary}
                    <div className="border-l border-gray-300 h-4 mx-2"></div>
                    <CurrencyConverter amountUSD={baseSalary} />
                </div>
            </div>

            <div className="flex gap-3">
                <button className="flex-1 bg-white border border-gray-200 text-foreground py-2 rounded-lg hover:border-primary hover:text-primary transition-colors font-medium">
                    View Details
                </button>
                <button
                    onClick={onApply}
                    className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-red-800 transition-colors font-medium shadow-md shadow-red-900/10"
                >
                    Apply Now
                </button>
            </div>
        </div>
    );
}
