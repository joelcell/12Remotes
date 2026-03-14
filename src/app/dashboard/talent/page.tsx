'use client';

import React, { useEffect, useState } from "react";
import { LayoutDashboard, Briefcase, Search, Settings, FileText, Heart, Eye, Clock, User, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { getTalentSession } from "@/app/lib/talent-actions";
import { signOut } from "next-auth/react";

export default function TalentDashboard() {
    const { t, language } = useLanguage();
    const [session, setSession] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getTalentSession().then(s => {
            setSession(s);
            setIsLoading(false);
        });
    }, []);

    // Mock data for Talent Dashboard
    const stats = [
        { label: language === 'vi' ? "Ứng tuyển" : "Applications", value: 14, icon: <FileText className="text-blue-600" />, trend: language === 'vi' ? "+3 tuần này" : "+3 this week" },
        { label: language === 'vi' ? "Lượt xem hồ sơ" : "Profile Views", value: 128, icon: <Eye className="text-purple-600" />, trend: language === 'vi' ? "+15% vs tháng trước" : "+15% vs last month" },
        { label: language === 'vi' ? "Đang phỏng vấn" : "Interviewing", value: 2, icon: <Clock className="text-orange-600" />, trend: language === 'vi' ? "1 buổi hôm nay" : "1 today" },
    ];

    const recentApplications = [
        { id: 1, title: "Senior React Developer", company: "TechFlow Solutions", date: "4/2/2026", status: "Reviewing", salary: "$3000 - $4500" },
        { id: 2, title: "Lead Product Designer", company: "Creative Minds", date: "2/2/2026", status: "Interviewing", salary: "$2500 - $4000" },
        { id: 3, title: "DevOps Specialist", company: "CloudScale Inc", date: "28/1/2026", status: "Rejected", salary: "$4000 - $5500" },
    ];

    if (isLoading) return <div className="min-h-screen flex items-center justify-center font-bold text-primary animate-pulse">{t('common.loading')}</div>;

    const clsx = (...classes: any[]) => classes.filter(Boolean).join(' ');

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-full">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                        <LayoutDashboard className="fill-current" />
                        12Remotes
                    </h2>
                    <p className="text-xs text-muted mt-1 uppercase tracking-wider font-semibold">{t('dashboard_talent.title')}</p>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <NavItem icon={<LayoutDashboard size={20} />} label={t('dashboard_talent.overview')} active />
                    <NavItem icon={<Briefcase size={20} />} label={t('dashboard_talent.findJobs')} href="/marketplace" />
                    <NavItem icon={<FileText size={20} />} label={t('dashboard_talent.appliedJobs')} badge={14} />
                    <NavItem icon={<Heart size={20} />} label={t('dashboard_talent.savedJobs')} badge={5} />
                    <NavItem icon={<User size={20} />} label={t('dashboard_talent.profile')} />
                    <NavItem icon={<Settings size={20} />} label={t('common.settings')} href="/dashboard/talent/settings" />
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                        <img src={session?.user?.image || "https://avatar.vercel.sh/talent"} alt="User" className="w-10 h-10 rounded-full bg-gray-100" />
                        <div>
                            <p className="text-sm font-bold text-gray-900 truncate w-32">{session?.user?.name || "Talent User"}</p>
                            <p className="text-xs text-gray-500 truncate w-32">{session?.user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => signOut()}
                        className="w-full text-sm font-medium text-red-600 hover:bg-red-50 py-2 rounded-lg transition-colors"
                    >
                        {t('common.signOut')}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {language === 'vi' ? 'Chào mừng trở lại' : 'Welcome back'}, {session?.user?.name?.split(' ')[0] || (language === 'vi' ? 'Bạn' : 'User')}!
                        </h1>
                        <p className="text-gray-500">
                            {language === 'vi' ? 'Xem tiến độ ứng tuyển và các cơ hội mới nhất.' : 'Check your application progress and latest opportunities.'}
                        </p>
                    </div>
                    <Link href="/marketplace" className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:bg-red-800 transition-all flex items-center gap-2 shadow-xl shadow-red-900/10">
                        <Search size={18} />
                        {t('dashboard_talent.findJobs')}
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {stats.map((stat, idx) => (
                        <StatCard key={idx} {...stat} />
                    ))}
                </div>

                {/* Recent Applications Section */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
                        <h3 className="font-bold text-lg text-gray-900">{t('dashboard_talent.recentApplications')}</h3>
                        <Link href="#" className="text-sm text-primary font-bold hover:underline">
                            {language === 'vi' ? 'Xem tất cả' : 'View all'}
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 text-gray-400 text-xs font-bold uppercase tracking-widest border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4">{language === 'vi' ? 'Vị trí & Công ty' : 'Role & Company'}</th>
                                    <th className="px-6 py-4">{language === 'vi' ? 'Trạng thái' : 'Status'}</th>
                                    <th className="px-6 py-4">{language === 'vi' ? 'Mức lương' : 'Salary'}</th>
                                    <th className="px-6 py-4">{language === 'vi' ? 'Ngày nộp' : 'Date'}</th>
                                    <th className="px-6 py-4 text-right">{language === 'vi' ? 'Thao tác' : 'Actions'}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {recentApplications.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-gray-900">{app.title}</p>
                                            <p className="text-xs text-gray-500">{app.company}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={clsx(
                                                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold",
                                                app.status === "Reviewing" && "bg-blue-50 text-blue-700",
                                                app.status === "Interviewing" && "bg-orange-50 text-orange-700",
                                                app.status === "Rejected" && "bg-red-50 text-red-700"
                                            )}>
                                                <div className={clsx(
                                                    "w-1.5 h-1.5 rounded-full",
                                                    app.status === "Reviewing" && "bg-blue-500",
                                                    app.status === "Interviewing" && "bg-orange-500",
                                                    app.status === "Rejected" && "bg-red-500"
                                                )}></div>
                                                {app.status === "Reviewing" ? t('dashboard_talent.status.reviewing') :
                                                    app.status === "Interviewing" ? t('dashboard_talent.status.interviewing') :
                                                        t('dashboard_talent.status.rejected')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-700">{app.salary}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{app.date}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-gray-400 hover:text-primary transition-colors">
                                                <MoreHorizontal size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

function StatCard({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string | number, trend: string }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-start justify-between hover:border-primary/20 transition-all">
            <div>
                <p className="text-sm text-gray-500 font-bold mb-1 uppercase tracking-tight">{label}</p>
                <h4 className="text-3xl font-extrabold text-gray-900">{value}</h4>
                <p className="text-xs text-green-600 font-bold mt-2 bg-green-50 inline-block px-2.5 py-1 rounded-lg">{trend}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl">
                {icon}
            </div>
        </div>
    );
}

function NavItem({ icon, label, active, badge, href = "#" }: { icon: React.ReactNode, label: string, active?: boolean, badge?: number, href?: string }) {
    const clsx = (...classes: any[]) => classes.filter(Boolean).join(' ');
    return (
        <Link href={href} className={clsx(
            "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all mb-1",
            active ? "bg-primary text-white shadow-lg shadow-red-900/20" : "text-gray-500 hover:bg-red-50 hover:text-primary"
        )}>
            <div className="flex items-center gap-3">
                {icon}
                {label}
            </div>
            {badge && (
                <span className={clsx(
                    "px-2 py-0.5 rounded-full text-[10px] font-black tracking-tighter",
                    active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                )}>
                    {badge}
                </span>
            )}
        </Link>
    );
}
