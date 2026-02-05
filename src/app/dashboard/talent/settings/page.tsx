
import { auth } from "@/auth";
import { ChevronLeft, User, Mail, Shield, Bell, LayoutDashboard, Briefcase, FileText, Heart, Settings, Save } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export default async function TalentSettingsPage() {
    const session = await auth();

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar (Fixed for Dashboard Consistency) */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-full">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                        <LayoutDashboard className="fill-current" />
                        12Remotes
                    </h2>
                    <p className="text-xs text-muted mt-1 uppercase tracking-wider font-semibold">Talent Console</p>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <NavItem icon={<LayoutDashboard size={20} />} label="Tổng quan" href="/dashboard/talent" />
                    <NavItem icon={<Briefcase size={20} />} label="Tìm việc làm" href="/marketplace" />
                    <NavItem icon={<FileText size={20} />} label="Việc đã ứng tuyển" badge={14} />
                    <NavItem icon={<Heart size={20} />} label="Việc làm đã lưu" badge={5} />
                    <NavItem icon={<User size={20} />} label="Hồ sơ cá nhân" />
                    <NavItem icon={<Settings size={20} />} label="Cài đặt" active />
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                        <img src={session?.user?.image || "https://avatar.vercel.sh/talent"} alt="User" className="w-10 h-10 rounded-full bg-gray-100" />
                        <div>
                            <p className="text-sm font-bold text-gray-900 truncate w-32">{session?.user?.name || "Talent User"}</p>
                            <p className="text-xs text-gray-500 truncate w-32 font-medium">{session?.user?.id?.substring(0, 8) || "00000000"}...</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                <div className="max-w-4xl">
                    {/* Header */}
                    <div className="mb-8">
                        <Link href="/dashboard/talent" className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-sm font-bold mb-4 uppercase tracking-widest">
                            <ChevronLeft size={16} />
                            Quay lại Dashboard
                        </Link>
                        <h1 className="text-3xl font-extrabold text-gray-900">Cài đặt tài khoản</h1>
                        <p className="text-gray-500 mt-1">Quản lý thông tin cá nhân và thiết lập quyền riêng tư của bạn.</p>
                    </div>

                    {/* Tabs Placeholder (Visual only) */}
                    <div className="flex gap-8 border-b border-gray-200 mb-8 overflow-x-auto pb-px">
                        {['Hồ sơ cá nhân', 'Tài khoản & Bảo mật', 'Thông báo', 'CV & Tài liệu'].map((tab, idx) => (
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

                        {/* Profile Section */}
                        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <User size={20} className="text-primary" />
                                    Thông tin cơ bản
                                </h3>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="relative group">
                                        <div className="w-24 h-24 rounded-2xl bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-200 overflow-hidden">
                                            <img src={session?.user?.image || "https://avatar.vercel.sh/talent"} alt="Avatar" className="w-full h-full object-cover" />
                                        </div>
                                        <button className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-lg border border-gray-200 shadow-sm hover:text-primary transition-all">
                                            <Settings size={14} />
                                        </button>
                                    </div>
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Họ và tên</label>
                                            <input type="text" defaultValue={session?.user?.name || ""} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email liên hệ</label>
                                            <input type="email" defaultValue={session?.user?.email || ""} className="w-full p-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed font-medium" disabled />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tiêu đề chuyên môn</label>
                                            <input type="text" placeholder="Ví dụ: Senior Frontend Developer" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Professional Bio */}
                        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <FileText size={20} className="text-blue-500" />
                                    Giới thiệu bản thân
                                </h3>
                            </div>
                            <div className="p-8">
                                <textarea
                                    rows={5}
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium leading-relaxed"
                                    placeholder="Viết một đoạn giới thiệu ngắn về kinh nghiệm và mục tiêu nghề nghiệp của bạn..."
                                />
                                <p className="text-xs text-gray-400 mt-3 italic font-medium">Lưu ý: Một tiểu sử chuyên nghiệp giúp bạn thu hút hơn trong mắt nhà tuyển dụng.</p>
                            </div>
                        </section>

                        {/* Actions */}
                        <div className="flex justify-end gap-4">
                            <button className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-all">
                                Hủy thay đổi
                            </button>
                            <button className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-red-800 transition-all shadow-xl shadow-red-900/20 flex items-center gap-2">
                                <Save size={18} />
                                Lưu cài đặt
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function NavItem({ icon, label, active, badge, href = "#" }: any) {
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
