import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    providers: [], // Providers defined here must be edge compatible. Credentials is fine but often we merge it in auth.ts
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.role = (user as any).role
            }
            return token
        },
        async session({ session, token }) {
            if (session?.user) {
                (session.user as any).role = token.role
            }
            return session
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
            const isOnLogin = nextUrl.pathname.startsWith('/login')

            if (isOnDashboard) {
                if (isLoggedIn) return true
                return false // Redirect unauthenticated users to login page
            } else if (isLoggedIn && isOnLogin) {
                // Redirect to appropriate dashboard if already logged in
                const role = (auth.user as any).role
                if (role === 'BUSINESS') {
                    return Response.redirect(new URL('/dashboard/business', nextUrl))
                }
                return Response.redirect(new URL('/dashboard/talent', nextUrl))
            }
            return true
        },
    },
} satisfies NextAuthConfig
