
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Globe, Briefcase, Users, LayoutDashboard } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session } = useSession();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-red-900/10 bg-white/85 backdrop-blur-md">
            <div className="container mx-auto px-4 h-24 flex items-center justify-between">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-4 group">
                    {/* Logo using Next.js Image Component */}
                    <div className="relative w-16 h-16">
                        <Image
                            src="/logo-curved.png"
                            alt="12remotes Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-primary hidden sm:block">12remotes</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/marketplace" className="text-foreground/80 hover:text-primary transition-colors flex items-center gap-2 font-medium">
                        <Briefcase size={18} />
                        Find Work
                    </Link>
                    <Link href="/talent" className="text-foreground/80 hover:text-primary transition-colors flex items-center gap-2 font-medium">
                        <Users size={18} />
                        Talent Pool
                    </Link>
                    {session?.user ? (
                        <Link href={session.user.email?.includes('business') || (session.user as any).role === 'BUSINESS' ? "/dashboard/business" : "/dashboard/talent"}>
                            <button className="bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-red-800 transition-all flex items-center gap-2 font-semibold shadow-lg shadow-red-900/20">
                                <LayoutDashboard size={18} />
                                Dashboard
                            </button>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <button className="bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-red-800 transition-all flex items-center gap-2 font-semibold shadow-lg shadow-red-900/20">
                                <Globe size={18} />
                                Global Login
                            </button>
                        </Link>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-foreground"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="md:hidden glass-panel border-t border-red-900/10 p-4 space-y-4 bg-white/95">
                    <Link href="/marketplace" className="block text-foreground hover:text-primary py-3 font-medium text-lg">Find Work</Link>
                    <Link href="/talent" className="block text-foreground hover:text-primary py-3 font-medium text-lg">Talent Pool</Link>
                    {session?.user ? (
                        <Link href={session.user.email?.includes('business') || (session.user as any).role === 'BUSINESS' ? "/dashboard/business" : "/dashboard/talent"} className="block">
                            <button className="bg-primary text-white w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                                <LayoutDashboard size={18} /> Dashboard
                            </button>
                        </Link>
                    ) : (
                        <Link href="/login" className="block">
                            <button className="bg-primary text-white w-full py-3 rounded-lg font-semibold">Global Login</button>
                        </Link>
                    )}
                </div>
            )}
        </header>
    );
}
