import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authConfig } from "./auth.config"
import { findUserByEmail } from "./app/lib/store"
import { initializeDemoData } from "./app/lib/demo-data"

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                if (credentials?.email && credentials?.password) {
                    const email = credentials.email as string
                    const role = credentials.role as string // We will pass this from the login form

                    // Ensure data is initialized
                    if (findUserByEmail('business1@demo.com') === undefined) {
                        initializeDemoData();
                    }

                    // 1. Check Store
                    const user = findUserByEmail(email);
                    if (user) {
                        // Simple password check (plain text for demo)
                        if (user.password === credentials.password) {
                            return {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                role: user.role,
                                image: user.image
                            }
                        }
                    }

                    // 2. Fallback Mock Logic (Keep for manual testing if needed, or remove)
                    // Let's keep the explicit role selection fallback for new on-the-fly users (like the previous demo)
                    // But generally we want to use the store now.

                    if (role === 'BUSINESS' || email.includes('@business.com')) {
                        return {
                            id: 'mock_biz',
                            name: 'Business User',
                            email: email,
                            role: 'BUSINESS',
                            image: 'https://avatar.vercel.sh/business'
                        }
                    }

                    if (role === 'TALENT' || email.includes('@talent.com')) {
                        return {
                            id: 'mock_talent',
                            name: 'Talent User',
                            email: email,
                            role: 'TALENT',
                            image: 'https://avatar.vercel.sh/talent'
                        }
                    }

                    if (role) {
                        return {
                            id: 'mock_demo',
                            name: 'Demo User',
                            email: email,
                            role: role
                        }
                    }
                }
                return null
            },
        }),
    ],
})
