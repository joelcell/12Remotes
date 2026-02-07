import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    providers: [], // Providers defined here must be edge compatible. Credentials is fine but often we merge it in auth.ts
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as { role?: string }).role
            }
            return token
        },
        async session({ session, token }) {
            if (session?.user) {
                (session.user as { role?: string }).role = token.role as string
            }
            return session
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
            const isOnLogin = nextUrl.pathname.startsWith('/login')
            const userRole = (auth?.user as { role?: string } | undefined)?.role

            if (isOnDashboard) {
                if (!isLoggedIn) return false // Redirect unauthenticated users to login page

                // Check for cross-role access
                if (nextUrl.pathname.startsWith('/dashboard/business') && userRole !== 'BUSINESS') {
                    return Response.redirect(new URL('/dashboard/talent', nextUrl))
                }
                if (nextUrl.pathname.startsWith('/dashboard/talent') && userRole !== 'TALENT') {
                    return Response.redirect(new URL('/dashboard/business', nextUrl))
                }

                // Generic /dashboard path: redirect based on role
                if (nextUrl.pathname === '/dashboard') {
                    const destination = userRole === 'BUSINESS' ? '/dashboard/business' : '/dashboard/talent'
                    return Response.redirect(new URL(destination, nextUrl))
                }

                return true
            } else if (isLoggedIn && isOnLogin) {
                // Redirect to appropriate dashboard if already logged in and trying to go to login page
                const destination = userRole === 'BUSINESS' ? '/dashboard/business' : '/dashboard/talent'
                return Response.redirect(new URL(destination, nextUrl))
            }
            return true
        },
    },
} satisfies NextAuthConfig
