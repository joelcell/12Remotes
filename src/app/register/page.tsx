
import RegisterForm from './RegisterForm';
import { Suspense } from 'react';
import { UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
    return (
        <div className="flex bg-gray-50/50 min-h-screen flex-col items-center justify-center p-6 md:p-12 font-sans overflow-hidden relative">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>

            <div className="w-full max-w-lg rounded-3xl bg-white p-10 md:p-16 shadow-2xl shadow-gray-200 border border-gray-100 animate-slide-up relative z-10">
                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 bg-red-50 text-primary rounded-2xl flex items-center justify-center shadow-lg shadow-red-900/10 border border-primary/10">
                        <UserPlus size={32} />
                    </div>
                </div>

                <h1 className="mb-2 text-4xl font-extrabold text-center text-gray-900 tracking-tight">Gia nhập đội ngũ</h1>
                <p className="text-gray-400 text-center mb-10 font-bold uppercase tracking-widest text-xs">Khởi đầu hành trình remote của bạn</p>

                <Suspense fallback={<div className="h-64 flex items-center justify-center text-gray-400 font-bold animate-pulse">Đang tải biểu mẫu...</div>}>
                    <RegisterForm />
                </Suspense>

                <p className="mt-10 text-center text-gray-400 text-sm font-medium">
                    Đã có tài khoản? <Link href="/login" className="text-primary font-bold cursor-pointer hover:underline underline-offset-4 transition-all">Đăng nhập tại đây</Link>
                </p>
            </div>
        </div>
    );
}
