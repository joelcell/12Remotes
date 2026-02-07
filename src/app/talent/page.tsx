
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { Star, Shield, ArrowRight } from "lucide-react";
import { fetchTalents } from "@/app/lib/data";
import { initializeDemoData } from "@/app/lib/demo-data";
import Link from "next/link";
import Image from "next/image";
import { User as UserType } from "@/app/lib/store";

export default async function Talent() {
    initializeDemoData();
    const talents = await fetchTalents();

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
            <Header />

            <main className="flex-grow container mx-auto px-4 pt-32 pb-20">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">World-Class Management Talent</h1>
                    <p className="text-gray-500 text-xl font-medium">
                        Vetted leaders ready to scale your remote operations.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {talents.map((talent) => (
                        <TalentCard key={talent.id} talent={talent} />
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}

function TalentCard({ talent }: { talent: UserType }) {
    return (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all text-center group relative overflow-hidden flex flex-col">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            <div className="w-28 h-28 mx-auto bg-gray-50 rounded-2xl mb-6 overflow-hidden relative shadow-inner group-hover:scale-105 transition-transform duration-500">
                <Image
                    src={talent.image || `https://avatar.vercel.sh/${talent.id}`}
                    alt={talent.name}
                    width={112}
                    height={112}
                    className="w-full h-full object-cover"
                />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">{talent.name}</h3>
            <p className="text-primary font-bold mb-4 uppercase tracking-wider text-xs">{talent.title || "Elite Professional"}</p>

            <div className="flex justify-center gap-2 mb-6">
                {talent.vetted && (
                    <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-widest border border-blue-100">
                        <Shield size={12} /> Vetted
                    </span>
                )}
                {talent.top5 && (
                    <span className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-widest border border-amber-100">
                        <Star size={12} /> Top 5%
                    </span>
                )}
            </div>

            <p className="text-gray-500 text-sm mb-8 leading-relaxed font-medium line-clamp-3">
                {talent.bio || "No bio provided yet."}
            </p>

            <div className="mt-auto">
                <Link href={`/talent/${talent.id}`} className="block w-full">
                    <button className="w-full bg-gray-50 border border-gray-100 py-3.5 rounded-2xl font-bold text-gray-900 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                        View Detailed Profile
                        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </Link>
            </div>
        </div>
    );
}
