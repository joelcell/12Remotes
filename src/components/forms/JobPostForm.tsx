
'use client';

import { useActionState } from "react";
import { Send } from "lucide-react";
import Link from "next/link";
import { createJob } from "@/app/lib/actions";

export default function JobPostForm() {
    const [state, dispatch, isPending] = useActionState(createJob, null);

    return (
        <form action={dispatch} className="space-y-8 bg-white p-6 md:p-10 rounded-2xl border border-gray-200 shadow-xl">
            {state && typeof state === 'string' && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                    {state}
                </div>
            )}

            {/* Basic Info Section */}
            <section>
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-1 h-6 bg-primary rounded-full"></div>
                    <h2 className="text-xl font-bold text-gray-900">Thông tin cơ bản</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Tiêu đề công việc</label>
                        <input name="title" required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Ví dụ: Senior Frontend Engineer" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Danh mục</label>
                        <select name="category" required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white">
                            <option value="Engineering">Kỹ thuật / Engineering</option>
                            <option value="Product">Sản phẩm / Product</option>
                            <option value="Design">Thiết kế / Design</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Sales">Kinh doanh / Sales</option>
                            <option value="IT">Công nghệ thông tin / IT</option>
                            <option value="Operations">Vận hành / Operations</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Địa điểm</label>
                        <input name="location" defaultValue="Remote" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                    </div>
                </div>
            </section>

            {/* Compensation Section */}
            <section>
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-1 h-6 bg-primary rounded-full"></div>
                    <h2 className="text-xl font-bold text-gray-900">Lương & Thưởng</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Mức lương (hàng tháng/năm)</label>
                        <input name="salary" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Ví dụ: $2000 - $3500 / tháng" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Thưởng / Bonus / Phụ cấp</label>
                        <input name="bonus" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Ví dụ: Lương tháng 13, Thưởng KPI, Ăn trưa" />
                    </div>
                </div>
            </section>

            {/* Detailed Content Section */}
            <section className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-primary rounded-full"></div>
                    <h2 className="text-xl font-bold text-gray-900">Nội dung chi tiết</h2>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Mô tả công việc (JD)</label>
                    <textarea name="description" rows={5} required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Mô tả tóm tắt về vai trò và nhiệm vụ..." />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Yêu cầu công việc (Mỗi dòng một ý)</label>
                        <textarea name="requirements" rows={6} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="• 3+ năm kinh nghiệm React&#10;• Thành thạo TypeScript&#10;..." />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Trách nhiệm công việc (Mỗi dòng một ý)</label>
                        <textarea name="responsibilities" rows={6} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="• Xây dựng UI/UX cho web app&#10;• Tối ưu hiệu năng ứng dụng&#10;..." />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Quyền lợi (Mỗi dòng một ý)</label>
                        <textarea name="benefits" rows={6} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="• MacBook Pro mới nhất&#10;• Bảo hiểm sức khỏe PVI&#10;..." />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Thông tin công ty</label>
                    <textarea name="companyInfo" rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Giới thiệu về văn hóa, quy mô công ty..." />
                </div>
            </section>

            {/* Submit Button */}
            <div className="pt-10 flex flex-col md:flex-row justify-end gap-4 border-t border-gray-100">
                <Link href="/dashboard/business" className="order-2 md:order-1 px-8 py-3 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all text-center">
                    Hủy bỏ
                </Link>
                <button
                    type="submit"
                    disabled={isPending}
                    className="order-1 md:order-2 px-10 py-3 bg-primary text-white rounded-xl font-bold hover:bg-red-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-red-900/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Đang xử lý...
                        </>
                    ) : (
                        <>
                            <Send size={20} />
                            Đăng tuyển ngay
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
