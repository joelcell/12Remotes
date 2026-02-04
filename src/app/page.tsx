
"use client";

import Header from "@/components/ui/Header";
import PartnerLogos from "@/components/ui/PartnerLogos";
import JobCategories from "@/components/ui/JobCategories";
import { ArrowRight, Globe, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative flex flex-col">
      <Header />

      {/* Hero Section with Office Background */}
      <main className="relative z-0 min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Animation */}
        <div className="absolute inset-0 -z-20">
          <Image
            src="/office-bg.png"
            alt="Cloud Office"
            fill
            className="object-cover animate-ken-burns opacity-0 animate-fade-in-slow"
            style={{ animationDuration: '20s', animationFillMode: 'forwards' }}
            onLoadingComplete={(img) => img.classList.remove('opacity-0')}
          />
          <div className="absolute inset-0 bg-white/90 backdrop-blur-[2px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center space-y-8">

          {/* Main Title: Bigger and Above */}
          <h1 className="animate-slide-up text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary to-red-600 drop-shadow-sm">
            Văn Phòng Trên Mây
          </h1>

          {/* Slogan: Smaller */}
          <h2 className="animate-slide-up [animation-delay:200ms] text-2xl md:text-4xl font-light text-gray-600 tracking-wide uppercase">
            Global Talent • Local Compliance • Zero Friction
          </h2>

          <p className="animate-slide-up [animation-delay:400ms] text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            Platform for Managers to build and scale remote teams. <br />
            We handle the legal, tax, and payments. You handle the work.
          </p>

          <div className="animate-slide-up [animation-delay:600ms] flex flex-col sm:flex-row items-center justify-center gap-5 pt-8">
            <button className="group bg-primary text-white text-lg px-10 py-5 rounded-full font-bold transition-all hover:bg-red-800 hover:shadow-2xl hover:shadow-red-900/30 hover:-translate-y-1 flex items-center gap-3">
              Start Hiring
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="animate-fade-in [animation-delay:1000ms] pt-12 text-xs font-bold text-gray-400 uppercase tracking-widest">
            Trusted by active offices at
          </div>
        </div>
      </main>

      {/* Partner Logos */}
      <PartnerLogos />

      {/* Core Features */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Globe className="text-primary" size={32} />}
            title="Global-first"
            desc="Hire managers and talent from 150+ countries without entity setup."
          />
          <FeatureCard
            icon={<ShieldCheck className="text-primary" size={32} />}
            title="Compliance by default"
            desc="Automated contracts, taxes, and benefits ensuring 100% legal compliance."
          />
          <FeatureCard
            icon={<Zap className="text-primary" size={32} />}
            title="Low friction"
            desc="No emails, no spreadsheets. Integrated workflow for maximum efficiency."
          />
        </div>
      </section>

      {/* Detailed Job Categories */}
      <JobCategories />

      {/* Disclaimer Footer */}
      <footer className="bg-gray-900 text-white py-4 text-center text-sm font-medium tracking-wide">
        NỀN TẢNG NÀY CHỈ GỢI Ý VÀ TẠO VĂN PHÒNG REMOTE VÀ HYBRID
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-red-100 hover:shadow-2xl hover:shadow-red-900/5 transition-all group duration-300 transform hover:-translate-y-1">
      <div className="mb-6 p-4 bg-red-50 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3 text-foreground">{title}</h3>
      <p className="text-muted leading-relaxed text-lg">{desc}</p>
    </div>
  );
}
