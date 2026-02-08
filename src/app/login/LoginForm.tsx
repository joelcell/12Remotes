'use client';

import { authenticate } from '@/app/lib/actions';
import { useActionState, useState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { Briefcase, User, Mail, Lock, ArrowRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

// ... imports

export default function LoginForm() {
    const searchParams = useSearchParams();
    const [errorMessage, dispatch] = useActionState(authenticate, undefined);
    const initialRole = (searchParams.get('role') as 'BUSINESS' | 'TALENT') || 'BUSINESS';
    const [role, setRole] = useState<'BUSINESS' | 'TALENT'>(initialRole);

    // Auto-fill states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const urlRole = searchParams.get('role') as 'BUSINESS' | 'TALENT';
        if (urlRole && (urlRole === 'BUSINESS' || urlRole === 'TALENT')) {
            setRole(urlRole);
        }
    }, [searchParams]);

    const handleDemoLogin = (type: 'BUSINESS' | 'TALENT') => {
        setRole(type);
        if (type === 'BUSINESS') {
            setEmail('business1@demo.com');
            setPassword('password123');
        } else {
            setEmail('talent1@demo.com');
            setPassword('password123');
        }
    };

    const isRegistered = searchParams.get('registered') === 'true';

    return (
        <form action={dispatch} className="space-y-6">
            {isRegistered && (
                <div className="bg-green-50 border border-green-100 p-4 rounded-2xl flex items-center gap-3 animate-fade-in mb-6">
                    <div className="bg-green-500 text-white p-1 rounded-full">
                        <ArrowRight size={14} className="rotate-[-45deg]" />
                    </div>
                    <p className="text-sm font-bold text-green-700">Đăng ký thành công! Hãy đăng nhập ngay.</p>
                </div>
            )}

            {/* Quick Login - Demo Helper */}
            <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 mb-6">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 text-center">Dùng thử ngay (Demo)</p>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => handleDemoLogin('BUSINESS')}
                        className="flex-1 bg-white border border-blue-200 text-blue-700 py-2 rounded-xl text-xs font-bold hover:bg-blue-50 transition-colors shadow-sm"
                    >
                        Demo Doanh nghiệp
                    </button>
                    <button
                        type="button"
                        onClick={() => handleDemoLogin('TALENT')}
                        className="flex-1 bg-white border border-blue-200 text-blue-700 py-2 rounded-xl text-xs font-bold hover:bg-blue-50 transition-colors shadow-sm"
                    >
                        Demo Ứng viên
                    </button>
                </div>
            </div>

            {/* Role Toggle - Modernized */}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            minLength={6}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
            <LoginButton />
        </form>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary px-8 py-4 text-lg font-extrabold text-white transition-all hover:bg-red-800 hover:shadow-2xl hover:shadow-red-900/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:translate-y-0 active:scale-[0.98]"
            aria-disabled={pending}
        >
            {pending ? 'Đang xác thực...' : (
                <>
                    Đăng nhập ngay
                    <ArrowRight size={20} />
                </>
            )}
        </button>
    );
}

function clsx(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
