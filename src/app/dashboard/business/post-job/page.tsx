import { auth } from "@/auth";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import JobPostForm from "@/components/forms/JobPostForm";

export default async function PostJobPage() {
    const session = await auth();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard/business" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ArrowLeft size={20} className="text-gray-500" />
                        </Link>
                        <h1 className="text-xl font-bold text-gray-900">Đăng tuyển dụng mới</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src={session?.user?.image || "https://avatar.vercel.sh/biz"} alt="User" className="w-8 h-8 rounded-full border border-gray-200" />
                        <span className="text-sm font-medium text-gray-700">{session?.user?.name}</span>
                    </div>
                </div>
            </header>

            {/* Form Content */}
            <main className="flex-1 max-w-4xl mx-auto w-full p-4 md:p-8">
                <JobPostForm />
            </main>

            <footer className="py-8 text-center text-gray-400 text-sm">
                © 2024 12Remotes - Professional Business Console
            </footer>
        </div>
    );
}
