
import { fetchJobById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { MapPin, DollarSign, Calendar, Briefcase, ChevronLeft, Share2, Heart, ShieldCheck, Globe, Building2 } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function JobDetailPage({ params }: Props) {
    const { id } = await params;
    const job = await fetchJobById(parseInt(id));

    if (!job) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
            <Header />

            <main className="flex-grow pt-24 pb-20">
                {/* Navigation & Actions Top */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex justify-between items-center">
                    <Link href="/marketplace" className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium">
                        <ChevronLeft size={20} />
                        Quay lại danh sách
                    </Link>
                    <div className="flex gap-3">
                        <button className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-all">
                            <Share2 size={18} />
                        </button>
                        <button className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-all">
                            <Heart size={18} />
                        </button>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Main Content Area */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Header Section */}
                            <div className="bg-white p-6 md:p-10 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-10 -mt-10"></div>

                                <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-10">
                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-2xl flex items-center justify-center border border-gray-200 shadow-sm text-2xl font-bold text-gray-400">
                                        {job.companyName.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                                {job.category}
                                            </span>
                                            <span className="flex items-center gap-1.5 text-gray-400 text-sm">
                                                <Calendar size={14} />
                                                Đăng ngày {new Date(job.postedAt).toLocaleDateString('vi-VN')}
                                            </span>
                                        </div>
                                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
                                            {job.title}
                                        </h1>
                                        <div className="flex items-center gap-2 text-lg font-medium text-gray-600">
                                            <Building2 size={18} className="text-primary" />
                                            {job.companyName}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-2 md:grid-cols-3 gap-6">
                                    <div className="space-y-1">
                                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Mức lương</p>
                                        <p className="text-lg font-bold text-gray-900 flex items-center gap-1.5">
                                            <DollarSign size={18} className="text-green-500" />
                                            {job.salary}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Địa điểm</p>
                                        <p className="text-lg font-bold text-gray-900 flex items-center gap-1.5">
                                            <MapPin size={18} className="text-red-500" />
                                            {job.location}
                                        </p>
                                    </div>
                                    <div className="col-span-2 md:col-span-1 space-y-1">
                                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Hình thức</p>
                                        <p className="text-lg font-bold text-gray-900 flex items-center gap-1.5">
                                            <Briefcase size={18} className="text-blue-500" />
                                            Full-time Remote
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Job Body Sections */}
                            <div className="bg-white p-6 md:p-10 rounded-3xl border border-gray-100 shadow-sm space-y-10">

                                {/* Description */}
                                <section>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                        <div className="w-1.5 h-8 bg-primary rounded-full"></div>
                                        Mô tả công việc
                                    </h2>
                                    <div className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">
                                        {job.description}
                                    </div>
                                </section>

                                {/* Responsibilities */}
                                {job.responsibilities && job.responsibilities.length > 0 && (
                                    <section>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                            <div className="w-1.5 h-8 bg-blue-500 rounded-full"></div>
                                            Trách nhiệm chính
                                        </h2>
                                        <ul className="grid grid-cols-1 gap-4">
                                            {job.responsibilities.map((item, index) => (
                                                <li key={index} className="flex gap-4 group">
                                                    <div className="mt-2 w-2 h-2 rounded-full bg-blue-300 ring-4 ring-blue-50 group-hover:bg-blue-500 transition-all shrink-0"></div>
                                                    <span className="text-gray-600 text-lg leading-relaxed">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                )}

                                {/* Requirements */}
                                {job.requirements && job.requirements.length > 0 && (
                                    <section>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                            <div className="w-1.5 h-8 bg-purple-500 rounded-full"></div>
                                            Yêu cầu chuyên môn
                                        </h2>
                                        <ul className="grid grid-cols-1 gap-4">
                                            {job.requirements.map((item, index) => (
                                                <li key={index} className="flex gap-4 group">
                                                    <div className="mt-2 w-2 h-2 rounded-full bg-purple-300 ring-4 ring-purple-50 group-hover:bg-purple-500 transition-all shrink-0"></div>
                                                    <span className="text-gray-600 text-lg leading-relaxed">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                )}

                                {/* Benefits */}
                                {job.benefits && job.benefits.length > 0 && (
                                    <section>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                            <div className="w-1.5 h-8 bg-green-500 rounded-full"></div>
                                            Quyền lợi & Đãi ngộ
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {job.benefits.map((item, index) => (
                                                <div key={index} className="flex items-start gap-3 p-4 bg-green-50/30 border border-green-100 rounded-2xl">
                                                    <ShieldCheck className="text-green-500 shrink-0" size={24} />
                                                    <span className="text-gray-700 font-medium">{item}</span>
                                                </div>
                                            ))}
                                            {job.bonus && (
                                                <div className="flex items-start gap-3 p-4 bg-amber-50/30 border border-amber-100 rounded-2xl md:col-span-2">
                                                    <DollarSign className="text-amber-500 shrink-0" size={24} />
                                                    <div>
                                                        <span className="text-amber-800 font-bold block mb-1">Thưởng & Phụ cấp thêm</span>
                                                        <span className="text-gray-700">{job.bonus}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </section>
                                )}
                            </div>
                        </div>

                        {/* Sidebar / Quick Actions */}
                        <div className="space-y-8">

                            {/* Company Card */}
                            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm overflow-hidden relative">
                                <div className="relative z-10">
                                    <h3 className="text-xl font-extrabold text-gray-900 mb-6">Thông tin công ty</h3>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200 text-xl font-bold text-gray-400">
                                            {job.companyName.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-lg font-bold text-gray-900">{job.companyName}</p>
                                            <p className="text-gray-500 text-sm">Technology Solutions</p>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 text-sm italic mb-6 leading-relaxed">
                                        {job.companyInfo || "Đội ngũ sáng tạo và chuyên nghiệp, cam kết mang lại giá trị tốt nhất cho khách hàng thông qua công nghệ hàng đầu."}
                                    </p>

                                    <div className="space-y-4 pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary cursor-pointer transition-colors">
                                            <Globe size={18} />
                                            <span>Visit Website</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary cursor-pointer transition-colors">
                                            <Briefcase size={18} />
                                            <span>24 Open Jobs</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Job Quick Stats */}
                            <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-xl shadow-gray-200 relative overflow-hidden">
                                <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full -mb-20 -mr-20"></div>
                                <h3 className="text-xl font-bold mb-6 relative z-10">Tóm tắt vị trí</h3>
                                <div className="space-y-6 relative z-10">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">Ứng viên đang nộp</span>
                                        <span className="font-bold underline decoration-primary underline-offset-4">{job.applicantsCount} người</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">Lượt xem</span>
                                        <span className="font-bold">{job.viewsCount} lượt</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">Thời hạn</span>
                                        <span className="font-bold text-green-400">Đang nhận hồ sơ</span>
                                    </div>

                                    <button className="w-full bg-primary text-white py-4 rounded-2xl font-extrabold text-lg hover:bg-red-800 transition-all shadow-xl shadow-red-900/30 active:scale-[0.98] mt-4">
                                        ỨNG TUYỂN NGAY
                                    </button>
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
