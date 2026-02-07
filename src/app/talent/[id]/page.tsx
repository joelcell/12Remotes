
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { fetchTalentById } from "@/app/lib/data";
import { initializeDemoData } from "@/app/lib/demo-data";
import { notFound } from "next/navigation";
import { Briefcase, Calendar, CheckCircle2, Globe, GraduationCap, Mail, MapPin, Share2, Shield, Star, Award, Zap } from "lucide-react";
import Link from "next/link";

interface Props {
    params: { id: string };
}

export default async function TalentProfilePage({ params }: Props) {
    initializeDemoData();
    const { id } = await params;
    const talent = await fetchTalentById(id);

    if (!talent) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#F8F9FB] text-gray-900 flex flex-col font-sans">
            <Header />

            <main className="flex-grow pt-32 pb-20">
                <div className="container mx-auto px-4">
                    {/* Breadcrumbs & Actions */}
                    <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                            <Link href="/talent" className="hover:text-primary transition-colors">Talent Pool</Link>
                            <span>/</span>
                            <span className="text-gray-900 font-bold">{talent.name}</span>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold hover:border-primary hover:text-primary transition-all shadow-sm">
                                <Share2 size={16} /> Share Profile
                            </button>
                            <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-red-800 transition-all shadow-lg shadow-red-900/20 active:scale-95">
                                <Mail size={16} /> Contact {talent.name.split(' ')[0]}
                            </button>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column: Profile Card */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-xl shadow-gray-200/50 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6">
                                    <div className="flex gap-2">
                                        {talent.vetted && <Shield className="text-blue-500" size={24} />}
                                        {talent.top5 && <Star className="text-amber-500 fill-amber-500" size={24} />}
                                    </div>
                                </div>

                                <div className="flex flex-col items-center text-center">
                                    <div className="w-40 h-40 bg-gray-50 rounded-3xl mb-6 overflow-hidden shadow-inner ring-4 ring-gray-50 ring-offset-0">
                                        <img
                                            src={talent.image || `https://avatar.vercel.sh/${talent.id}`}
                                            alt={talent.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h1 className="text-2xl font-extrabold mb-1">{talent.name}</h1>
                                    <p className="text-primary font-bold uppercase tracking-tight text-sm mb-4">{talent.title || "Elite Talent"}</p>

                                    <div className="flex items-center gap-4 text-gray-500 text-sm mb-8 font-medium">
                                        <span className="flex items-center gap-1.5"><MapPin size={14} /> Remote</span>
                                        <span className="flex items-center gap-1.5"><Globe size={14} /> Global</span>
                                    </div>

                                    <div className="w-full pt-8 border-t border-gray-50 space-y-4">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Availability</span>
                                            <span className="bg-green-50 text-green-700 px-3 py-1 rounded-lg font-bold">In 2 Weeks</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Work Type</span>
                                            <span className="text-gray-900 font-bold">Contract / Full-time</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-xl shadow-gray-200/50">
                                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                    <Zap size={20} className="text-primary" />
                                    Core Expertise
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {talent.skills?.map((skill: string, idx: number) => (
                                        <span key={`${skill}-${idx}`} className="bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-xs font-bold border border-gray-100">
                                            {skill}
                                        </span>
                                    )) || (
                                            ['Management', 'Product Architecture', 'Remote Leadership'].map((s, idx) => (
                                                <span key={`${s}-${idx}`} className="bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-xs font-bold border border-gray-100">{s}</span>
                                            ))
                                        )}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Bio & Experience */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white rounded-[2rem] border border-gray-100 p-10 shadow-xl shadow-gray-200/50">
                                <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-3 text-gray-900">
                                    <UserPlus className="text-primary" size={24} />
                                    Professional Biography
                                </h2>
                                <p className="text-gray-600 leading-relaxed text-lg font-medium italic">
                                    "{talent.bio || "Crafting the future of remote-first engineering teams and scalable architectures."}"
                                </p>
                            </div>

                            <div className="bg-white rounded-[2rem] border border-gray-100 p-10 shadow-xl shadow-gray-200/50">
                                <h2 className="text-2xl font-extrabold mb-10 flex items-center gap-3 text-gray-900">
                                    <Award className="text-primary" size={24} />
                                    Professional Roadmap
                                </h2>

                                <div className="space-y-12">
                                    {talent.experience?.map((exp, idx: number) => (
                                        <div key={idx} className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-px before:bg-gray-100 last:before:hidden">
                                            <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-primary" />

                                            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900">{exp.role}</h3>
                                                    <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                                        <Briefcase size={14} /> {exp.company}
                                                    </div>
                                                </div>
                                                <div className="bg-gray-50 text-gray-500 px-4 py-1.5 rounded-lg text-xs font-extrabold tracking-widest border border-gray-100">
                                                    <Calendar size={12} className="inline mr-1" /> {exp.period}
                                                </div>
                                            </div>

                                            <p className="text-gray-500 font-medium leading-relaxed mb-6">
                                                {exp.description}
                                            </p>

                                            {exp.campaigns && exp.campaigns.length > 0 && (
                                                <div className="bg-primary/[0.03] rounded-2xl p-6 border border-primary/5">
                                                    <h4 className="text-[10px] font-extrabold text-primary uppercase tracking-[0.2em] mb-4">Tactical Successes</h4>
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        {exp.campaigns.map((camp: string) => (
                                                            <div key={camp} className="flex items-start gap-3">
                                                                <CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" />
                                                                <span className="text-sm font-bold text-gray-700">{camp}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

function UserPlus(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" x2="19" y1="8" y2="14" />
            <line x1="22" x2="16" y1="11" y2="11" />
        </svg>
    )
}
