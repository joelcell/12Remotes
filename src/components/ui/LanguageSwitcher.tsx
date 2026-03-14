'use client';

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="fixed top-4 right-4 z-[100] flex items-center bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl p-1.5 shadow-xl shadow-red-900/5 animate-fade-in group hover:shadow-2xl hover:shadow-red-900/10 transition-all duration-300">
            <div className="p-2 text-primary group-hover:rotate-12 transition-transform duration-300">
                <Globe size={18} />
            </div>

            <div className="flex bg-gray-50/50 rounded-xl p-0.5 border border-gray-100/50 ml-1">
                <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1.5 text-xs font-black tracking-tight rounded-lg transition-all duration-300 ${language === 'en'
                            ? 'bg-white text-primary shadow-sm shadow-red-900/5 scale-[1.02]'
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                >
                    EN
                </button>
                <button
                    onClick={() => setLanguage('vi')}
                    className={`px-3 py-1.5 text-xs font-black tracking-tight rounded-lg transition-all duration-300 ${language === 'vi'
                            ? 'bg-white text-primary shadow-sm shadow-red-900/5 scale-[1.02]'
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                >
                    VI
                </button>
            </div>
        </div>
    );
}
