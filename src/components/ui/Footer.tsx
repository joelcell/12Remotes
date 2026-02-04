
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-red-900/10 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <span className="text-2xl font-bold text-primary">12remotes</span>
                        <p className="text-muted leading-relaxed">
                            Global Talent. Local Compliance. <br />
                            The operating system for modern <br />
                            remote management.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <SocialIcon icon={<Linkedin size={20} />} href="#" />
                            <SocialIcon icon={<Twitter size={20} />} href="#" />
                            <SocialIcon icon={<Facebook size={20} />} href="#" />
                            <SocialIcon icon={<Instagram size={20} />} href="#" />
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="font-bold text-foreground mb-6">Product</h4>
                        <ul className="space-y-3">
                            <FooterLink href="/marketplace" label="Find Work" />
                            <FooterLink href="/talent" label="Hire Talent" />
                            <FooterLink href="#" label="Pricing" />
                            <FooterLink href="#" label="Enterprise" />
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="font-bold text-foreground mb-6">Company</h4>
                        <ul className="space-y-3">
                            <FooterLink href="#" label="About Us" />
                            <FooterLink href="#" label="Careers" />
                            <FooterLink href="#" label="Blog" />
                            <FooterLink href="#" label="Contact" />
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="font-bold text-foreground mb-6">Legal</h4>
                        <ul className="space-y-3">
                            <FooterLink href="#" label="Privacy Policy" />
                            <FooterLink href="#" label="Terms of Service" />
                            <FooterLink href="#" label="Cookie Policy" />
                            <FooterLink href="#" label="Security" />
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-muted text-sm">
                        © 2024 12remotes Inc. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-muted">
                        <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode, href: string }) {
    return (
        <a
            href={href}
            className="w-10 h-10 rounded-full bg-red-50 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1"
        >
            {icon}
        </a>
    );
}

function FooterLink({ href, label }: { href: string, label: string }) {
    return (
        <li>
            <Link href={href} className="text-muted hover:text-primary transition-colors block">
                {label}
            </Link>
        </li>
    );
}
