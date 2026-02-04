'use client';

import { authenticate } from '@/app/lib/actions';
import { useFormState, useFormStatus } from 'react-dom';
import { useState } from 'react';
import { Briefcase, User } from 'lucide-react';

export default function LoginForm() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    const [role, setRole] = useState<'BUSINESS' | 'TALENT'>('BUSINESS');

    return (
        <form action={dispatch} className="space-y-4">
            {/* Role Toggle */}
            <div className="flex bg-gray-100 p-1 rounded-lg mb-6 relative">
                <div
                    className={`w-1/2 flex items-center justify-center py-2 text-sm font-medium rounded-md cursor-pointer transition-all duration-200 ${role === 'BUSINESS' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setRole('BUSINESS')}
                >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Doanh nghiệp
                </div>
                <div
                    className={`w-1/2 flex items-center justify-center py-2 text-sm font-medium rounded-md cursor-pointer transition-all duration-200 ${role === 'TALENT' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setRole('TALENT')}
                >
                    <User className="w-4 h-4 mr-2" />
                    Người tìm việc
                </div>
                <input type="hidden" name="role" value={role} />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                    Email
                </label>
                <input
                    className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                />
            </div>
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                    Password
                </label>
                <input
                    className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    id="password"
                    type="password"
                    name="password"
                    minLength={6}
                    required
                />
            </div>
            <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
                {errorMessage && (
                    <p className="text-sm text-red-500">{errorMessage}</p>
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
            className="flex w-full justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
            aria-disabled={pending}
        >
            {pending ? 'Logging in...' : 'Log in'}
        </button>
    );
}
