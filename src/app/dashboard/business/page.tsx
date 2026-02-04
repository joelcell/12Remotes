import { auth, signOut } from "@/auth";
import { getJobs } from "@/app/lib/store";
import { LayoutDashboard, Users, Briefcase, Settings, PlusCircle, Search, MoreHorizontal, Eye, FileText, DollarSign, CheckCircle } from "lucide-react";
import Link from "next/link";

export default async function BusinessDashboard() {
    const session = await auth();
    const allJobs = getJobs();
    // Filter jobs for this business user (by email or id lookup in real app, here checking logic)
    // In store we saved companyId as 'biz_i'. 
    // We need to match the logged in user to the jobs.
    // Since we don't have a direct 'my jobs' query yet, let's filter by matching partial company name or just show all for demo if user ID doesn't match perfectly.
    // Actually, let's fetch based on email mapping if possible.
    // For specific demo user 'business1@demo.com', their id is 'biz_1'.

    // Simple filter: if user email is businessX@demo.com, we strip 'business' and get ID.
    let userJobs = [];
    if (session?.user?.email) {
        // Find our internal ID if possible, but session id might be different if we didn't persist perfectly.
        // Let's rely on the store's findUserByEmail if we could, but this is a server component.
        // For the sake of the demo visual, let's filter where companyName includes "Demo Company" if we can't match exactly, 
        // OR better: Just show a subset of jobs to simulate "My Jobs"
        userJobs = allJobs.slice(0, 5); // Just show first 5 for design demo if we can't match exact.

        // Try to match exact if using the demo logic
        const emailMatch = session.user.email.match(/business(\d+)@demo.com/);
        if (emailMatch) {
            const bizId = `biz_${emailMatch[1]}`;
            userJobs = allJobs.filter(j => j.companyId === bizId);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-full">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                        <LayoutDashboard className="fill-current" />
                        12Remotes
                    </h2>
                    <p className="text-xs text-muted mt-1 uppercase tracking-wider font-semibold">Business Console</p>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active />
                    <NavItem icon={<Briefcase size={20} />} label="My Jobs" badge={userJobs.length} />
                    <NavItem icon={<Users size={20} />} label="Candidates" badge={12} />
                    <NavItem icon={<FileText size={20} />} label="Billing" />
                    <NavItem icon={<Settings size={20} />} label="Settings" />
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                        <img src={session?.user?.image || "https://avatar.vercel.sh/biz"} alt="User" className="w-10 h-10 rounded-full bg-gray-100" />
                        <div>
                            <p className="text-sm font-bold text-gray-900 truncate w-32">{session?.user?.name}</p>
                            <p className="text-xs text-gray-500 truncate w-32">{session?.user?.email}</p>
                        </div>
                    </div>
                    <form
                        action={async () => {
                            'use server';
                            await signOut();
                        }}
                    >
                        <button className="w-full text-sm font-medium text-red-600 hover:bg-red-50 py-2 rounded-lg transition-colors">
                            Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                        <p className="text-gray-500">Welcome back, here's what's happening with your jobs.</p>
                    </div>
                    <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-red-800 transition-colors flex items-center gap-2 shadow-lg shadow-red-900/10">
                        <PlusCircle size={18} />
                        Post New Job
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard icon={<Briefcase className="text-primary" />} label="Active Jobs" value={userJobs.length} trend="+2 this week" />
                    <StatCard icon={<Users className="text-blue-600" />} label="Total Applicants" value={userJobs.reduce((acc, job) => acc + (job.applicantsCount || 0), 0)} trend="+15% vs last month" />
                    <StatCard icon={<Eye className="text-green-600" />} label="Total Views" value={userJobs.reduce((acc, job) => acc + (job.viewsCount || 0), 0)} trend="+85 today" />
                </div>

                {/* Job List Table */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-gray-900">Recent Job Postings</h3>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input type="text" placeholder="Search jobs..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-primary outline-none w-64" />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-semibold">
                                <tr>
                                    <th className="px-6 py-4">Job Title</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Applicants</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Salary</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {userJobs.length > 0 ? userJobs.map((job) => (
                                    <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-gray-900">{job.title}</p>
                                            <p className="text-xs text-gray-500">{job.location}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex -space-x-2">
                                                {[1, 2, 3].map(i => (
                                                    <img key={i} className="w-8 h-8 rounded-full border-2 border-white" src={`https://avatar.vercel.sh/${job.id}-${i}`} alt="" />
                                                ))}
                                                <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">+{job.applicantsCount - 3}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium">{job.category}</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-700">
                                            {job.salary}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-gray-400 hover:text-primary transition-colors">
                                                <MoreHorizontal size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                            No jobs found. Post your first job!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

function StatCard({ icon, label, value, trend }: any) {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start justify-between">
            <div>
                <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
                <h4 className="text-2xl font-bold text-gray-900">{value}</h4>
                <p className="text-xs text-green-600 font-semibold mt-2 bg-green-50 inline-block px-2 py-1 rounded">{trend}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
                {icon}
            </div>
        </div>
    );
}

function NavItem({ icon, label, active, badge }: any) {
    return (
        <a href="#" className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-1 ${active ? 'bg-primary/5 text-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
            <div className="flex items-center gap-3">
                {icon}
                {label}
            </div>
            {badge && <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-bold">{badge}</span>}
        </a>
    )
}
