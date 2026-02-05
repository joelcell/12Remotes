'use client';

import { register } from '@/app/lib/actions';
import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Briefcase, User, Mail, Lock, ArrowRight, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function RegisterForm() {
    const [errorMessage, dispatch] = useActionState(register, undefined);
    const [role, setRole] = useState<'BUSINESS' | 'TALENT'>('TALENT');

    return (
        <form action={dispatch} className="space-y-6">
            {/* Role Toggle */}
            <div className="bg-gray-50 p-1.5 rounded-2xl border border-gray-100 flex items-center mb-8 relative shadow-inner">
                <button
                    type="button"
                    className={clsx(
                        "flex-1 flex items-center justify-center py-3 text-sm font-bold rounded-xl transition-all duration-300 z-10",
                        role === 'BUSINESS' ? "bg-white text-primary shadow-xl shadow-red-900/10" : "text-gray-400 hover:text-gray-600"
                    )}
                    onClick={() => setRole('BUSINESS')}
                >
                    <Briefcase size={18} className="mr-2" />
                    Doanh nghiệp
                </button>
                <button
                    type="button"
                    className={clsx(
                        "flex-1 flex items-center justify-center py-3 text-sm font-bold rounded-xl transition-all duration-300 z-10",
                        role === 'TALENT' ? "bg-white text-primary shadow-xl shadow-red-900/10" : "text-gray-400 hover:text-gray-600"
                    )}
                    onClick={() => setRole('TALENT')}
                >
                    <User size={18} className="mr-2" />
                    Ứng viên
                </button>
                <input type="hidden" name="role" value={role} />
            </div>

            <div className="space-y-5">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1" htmlFor="name">
                        Họ và tên
                    </label>
                    <div className="relative group">
                        <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={18} />
                        <input
                            className="w-full rounded-2xl border border-gray-100 bg-gray-50 p-4 pl-12 text-sm outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-medium"
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Nguyễn Văn A"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1" htmlFor="email">
                        Địa chỉ Email
                    </label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={18} />
                        <input
                            className="w-full rounded-2xl border border-gray-100 bg-gray-50 p-4 pl-12 text-sm outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-medium"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="m@example.com"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1" htmlFor="password">
                        Mật khẩu
                    </label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={18} />
                        <input
                            className="w-full rounded-2xl border border-gray-100 bg-gray-50 p-4 pl-12 text-sm outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-medium"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            minLength={6}
                            required
                        />
                    </div>
                </div>
            </div>

            <div
                className="flex h-5 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
                {errorMessage && (
                    <p className="text-xs font-bold text-red-500 animate-pulse">{errorMessage}</p>
                )}
            </div>

            <SignUpButton />
        </form>
    );
}

function SignUpButton() {
    const { pending } = useFormStatus();

    return (
        <button
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary px-8 py-4 text-lg font-extrabold text-white transition-all hover:bg-red-800 hover:shadow-2xl hover:shadow-red-900/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:translate-y-0 active:scale-[0.98]"
            aria-disabled={pending}
        >
            {pending ? 'Đang tạo tài khoản...' : (
                <>
                    Bắt đầu ngay
                    <ArrowRight size={20} />
                </>
            )}
        </button>
    );
}

function clsx(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
