
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { Star, Shield, Briefcase, GraduationCap, Link as LinkIcon, Mail, Phone, MapPin } from "lucide-react";
import Link from 'next/link';

export default function TalentProfile({ params }: { params: { id: string } }) {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Header />

            <main className="flex-grow container mx-auto px-4 pt-32 pb-20">
                <div className="grid md:grid-cols-3 gap-8">

                    {/* Sidebar Profile */}
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
                            <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full mb-6 flex items-center justify-center text-4xl text-gray-400 font-bold border-4 border-white shadow-md">
                                SJ
                            </div>
                            <h1 className="text-2xl font-bold mb-1">Sarah Jenkins</h1>
                            <p className="text-primary font-medium mb-4">Level 4 - Product Director</p>

                            <div className="flex justify-center gap-2 mb-8">
                                <span className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-yellow-200">
                                    <Star size={12} fill="currentColor" /> Top 5% Talent
                                </span>
                            </div>

                            <div className="space-y-4 text-left border-t border-gray-100 pt-6">
                                <div className="flex items-center gap-3 text-sm text-muted">
                                    <Mail size={16} className="text-primary" /> sarah.j@12remotes.com
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted">
                                    <Phone size={16} className="text-primary" /> +1 (555) 123-4567
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted">
                                    <MapPin size={16} className="text-primary" /> London, UK (Remote)
                                </div>
                            </div>

                            <button className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-red-800 transition-colors mt-8 shadow-lg shadow-red-900/10">
                                Contact Sarah
                            </button>
                        </div>

                        {/* Level Justification Box */}
                        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                            <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                                <Shield size={18} /> Why Level 4?
                            </h3>
                            <p className="text-sm text-blue-800 leading-relaxed mb-4">
                                Sarah has demonstrated <strong>strategic leadership</strong> by scaling a product team from 5 to 50 members and managing a $2M budget.
                            </p>
                            <div className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">Verified Evidence</div>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="#" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                                        <LinkIcon size={14} /> Case Study: SaaS Scaling
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                                        <LinkIcon size={14} /> Award: Best PM 2024
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-8">

                        {/* Experience Section */}
                        <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Briefcase className="text-primary" /> Experience
                            </h2>
                            <div className="space-y-8 relative before:absolute before:left-2 before:top-2 before:h-full before:w-0.5 before:bg-gray-100">
                                <div className="relative pl-8">
                                    <div className="absolute left-0 top-1.5 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-sm" />
                                    <h3 className="text-lg font-bold">Director of Product</h3>
                                    <p className="text-primary font-medium">Global SaaS Corp • 2020 - Present</p>
                                    <p className="text-muted mt-2 leading-relaxed">
                                        Led the product strategy for the core enterprise platform. Managed 4 PMs and coordinated with engineering to deliver 99.9% uptime features.
                                    </p>
                                </div>
                                <div className="relative pl-8">
                                    <div className="absolute left-0 top-1.5 w-4 h-4 bg-gray-300 rounded-full border-4 border-white shadow-sm" />
                                    <h3 className="text-lg font-bold">Senior Product Manager</h3>
                                    <p className="text-primary font-medium">TechStart Inc • 2016 - 2020</p>
                                    <p className="text-muted mt-2 leading-relaxed">
                                        Launched main mobile app feature helping 1M+ users. Increased retention by 15%.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Education Section */}
                        <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <GraduationCap className="text-primary" /> Education
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <h3 className="font-bold">MBA, Technology Management</h3>
                                    <p className="text-sm text-muted">Harvard Business School</p>
                                    <p className="text-xs text-gray-400 mt-1">2016</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <h3 className="font-bold">BS, Computer Science</h3>
                                    <p className="text-sm text-muted">University of London</p>
                                    <p className="text-xs text-gray-400 mt-1">2012</p>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
