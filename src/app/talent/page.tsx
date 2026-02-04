
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { Star, Shield } from "lucide-react";

export default function Talent() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Header />

            <main className="flex-grow container mx-auto px-4 pt-32 pb-20">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold">World-Class Management Talent</h1>
                    <p className="text-muted text-xl">
                        Vetted leaders ready to scale your remote operations.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <TalentCard key={item} />
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}

function TalentCard() {
    return (
        <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-red-100 hover:shadow-xl transition-all text-center group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />

            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full mb-6 overflow-hidden relative">
                {/* Placeholder Avatar */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold text-2xl">?</div>
            </div>

            <h3 className="text-xl font-bold mb-1">Sarah Jenkins</h3>
            <p className="text-primary font-medium mb-4">Product Director</p>

            <div className="flex justify-center gap-2 mb-6">
                <span className="flex items-center gap-1 bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                    <Shield size={12} /> Vetted
                </span>
                <span className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">
                    <Star size={12} /> Top 5%
                </span>
            </div>

            <p className="text-muted text-sm mb-6 leading-relaxed">
                10+ years experience in B2B SaaS. Scaled teams from 5 to 50 engineers.
            </p>

            <button className="w-full bg-white border border-gray-200 py-3 rounded-lg font-semibold hover:border-primary hover:text-primary transition-colors">
                View Profile
            </button>
        </div>
    );
}
