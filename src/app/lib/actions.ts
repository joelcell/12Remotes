'use server'

import { signIn, signOut } from '@/auth'
import { AuthError } from 'next-auth'

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        // Append the role to the credentials before calling signIn
        // Since signIn reads from formData automatically for credentials,
        // we assume formData has 'email', 'password', and 'role'
        await signIn('credentials', formData)
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.'
                default:
                    return 'Something went wrong.'
            }
        }
        throw error
    }
}

export async function handleSignOut() {
    await signOut()
}

import { addUser, findUserByEmail } from './store';

export async function register(prevState: string | undefined, formData: FormData) {
    try {
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const role = formData.get('role') as 'BUSINESS' | 'TALENT';

        if (!email || !password || !name || !role) {
            return 'Missing required fields.';
        }

        if (findUserByEmail(email)) {
            return 'Email already exists.';
        }

        addUser({
            id: Math.random().toString(36).substring(7),
            name,
            email,
            password,
            role,
            image: `https://avatar.vercel.sh/${email}`
        });

        // Auto login after register? Or redirect to login.
        // For simplicity, let's just return success or redirect to login.
        // We can't easily sign in from here without credentials flow again or custom signin.
        // Let's redirect to login.
    } catch (error) {
        return 'Registration failed.';
    }
}
