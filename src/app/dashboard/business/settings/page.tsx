
import { auth } from "@/auth";
import { ChevronLeft, Building2, User, Mail, Shield, Bell, LayoutDashboard, Briefcase, Users, FileText, Settings, Save, Upload } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export default async function BusinessSettingsPage() {
    const session = await auth();

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar (Consistent with Business Dashboard) */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-full">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                        <LayoutDashboard className="fill-current" />
                        12Remotes
                    </h2>
                    <p className="text-xs text-muted mt-1 uppercase tracking-wider font-semibold">Business Console</p>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <NavItem icon={<LayoutDashboard size={20} />} label="Overview" href="/dashboard/business" />
                    <NavItem icon={<Briefcase size={20} />} label="My Jobs" />
                    <NavItem icon={<Users size={20} />} label="Candidates" badge={12} />
                    <NavItem icon={<FileText size={20} />} label="Billing" />
                    <NavItem icon={<Settings size={20} />} label="Settings" active />
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                        <img src={session?.user?.image || "https://avatar.vercel.sh/biz"} alt="User" className="w-10 h-10 rounded-full bg-gray-100" />
                        <div>
                            <p className="text-sm font-bold text-gray-900 truncate w-32">{session?.user?.name}</p>
                            <p className="text-xs text-gray-500 truncate w-32">Employer Account</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8 text-gray-900">
                <div className="max-w-4xl font-sans">
                    {/* Header */}
                    <div className="mb-8">
                        <Link href="/dashboard/business" className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-sm font-bold mb-4 uppercase tracking-widest">
                            <ChevronLeft size={16} />
                            Quay lại Dashboard
                        </Link>
                        <h1 className="text-3xl font-extrabold text-gray-900">Cài đặt doanh nghiệp</h1>
                        <p className="text-gray-500 mt-1">Quản lý thương hiệu công ty và thông tin quản trị viên.</p>
                    </div>

                    {/* Tabs Placeholder */}
                    <div className="flex gap-8 border-b border-gray-200 mb-8 overflow-x-auto pb-px">
                        {['Hồ sơ công ty', 'Thành viên & Quyền', 'Thanh toán', 'Bảo mật'].map((tab, idx) => (
                            <button key={tab} className={clsx(
                                "pb-4 text-sm font-bold whitespace-nowrap transition-all relative",
                                idx === 0 ? "text-primary border-b-2 border-primary" : "text-gray-400 hover:text-gray-600"
                            )}>
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Settings Form Wrapper */}
                    <div className="space-y-8 animate-slide-up">

                        {/* Company Profile Section */}
                        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-100 bg-white">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <Building2 size={20} className="text-primary" />
                                    Hồ sơ thương hiệu
                                </h3>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="relative group">
                                        <div className="w-24 h-24 rounded-2xl bg-gray-50 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 overflow-hidden hover:border-primary transition-all cursor-pointer">
                                            <Upload className="text-gray-300 group-hover:text-primary mb-1" size={20} />
                                            <span className="text-[10px] font-bold text-gray-400 group-hover:text-primary">Logo</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tên công ty</label>
                                            <input type="text" defaultValue={(session?.user as { companyName?: string }).companyName || "Công ty mới"} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Lĩnh vực hoạt động</label>
                                            <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium appearance-none">
                                                <option>Technology & IT</option>
                                                <option>E-commerce</option>
                                                <option>Marketing Agency</option>
                                                <option>Fintech</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Mô tả ngắn về công ty</label>
                                            <textarea rows={3} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Admin Contact Section */}
                        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <User size={20} className="text-blue-500" />
                                    Người quản trị
                                </h3>
                            </div>
                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tên người đại diện</label>
                                    <input type="text" defaultValue={session?.user?.name || ""} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email quản trị</label>
                                    <input type="email" defaultValue={session?.user?.email || ""} className="w-full p-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed font-medium" disabled />
                                </div>
                            </div>
                        </section>

                        {/* Actions */}
                        <div className="flex justify-end gap-4 pb-10">
                            <button className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-all">
                                Hủy thay đổi
                            </button>
                            <button className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-red-800 transition-all shadow-xl shadow-red-900/20 flex items-center gap-2">
                                <Save size={18} />
                                Lưu thông tin
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function NavItem({ icon, label, active, badge, href = "#" }: { icon: React.ReactNode, label: string, active?: boolean, badge?: number, href?: string }) {
    return (
        <Link href={href} className={clsx(
            "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-1",
            active ? 'bg-primary text-white shadow-md shadow-red-900/10' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        )}>
            <div className="flex items-center gap-3">
                {icon}
                {label}
            </div>
            {badge && <span className={clsx(
                "px-2 py-0.5 rounded-full text-xs font-bold",
                active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
            )}>{badge}</span>}
        </Link>
    )
}
