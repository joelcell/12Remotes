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

import { addUser, findUserByEmail, addJob } from './store';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

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

        revalidatePath('/login');
    } catch (error) {
        return 'Registration failed.';
    }
    redirect('/login?registered=true');
}

export async function createJob(prevState: unknown, formData: FormData) {
    const session = await auth();
    if (!session?.user?.email) {
        return 'Unauthorized';
    }

    // In this demo, we find business ID by email or assume it's stored in session
    // For simplicity, let's just use the email as an identifier if we don't have a solid ID in session.
    // Ideally, session.user.id should be biz_X if they logged in as businessX@demo.com.

    const emailMatch = session.user.email.match(/business(\d+)@demo.com/);
    const bizId = emailMatch ? `biz_${emailMatch[1]}` : 'biz_custom';
    const bizName = (session.user as { companyName?: string; name?: string }).companyName || `Company of ${session.user.name}`;

    const title = formData.get('title') as string;
    const category = formData.get('category') as 'Engineering' | 'Product' | 'Marketing' | 'Operations' | 'IT' | 'Sales' | 'Design';
    const location = formData.get('location') as string;
    const salary = formData.get('salary') as string;
    const bonus = formData.get('bonus') as string;
    const description = formData.get('description') as string;
    const requirements = (formData.get('requirements') as string || '').split('\n').filter(r => r.trim());
    const responsibilities = (formData.get('responsibilities') as string || '').split('\n').filter(r => r.trim());
    const benefits = (formData.get('benefits') as string || '').split('\n').filter(r => r.trim());
    const companyInfo = formData.get('companyInfo') as string;

    if (!title || !category || !description) {
        return 'Missing required fields.';
    }

    addJob({
        id: Math.floor(Math.random() * 1000000),
        title,
        companyId: bizId,
        companyName: bizName,
        location,
        salary,
        category,
        description,
        requirements,
        responsibilities,
        benefits,
        bonus,
        companyInfo,
        status: 'Active',
        applicantsCount: 0,
        viewsCount: 0,
        postedAt: new Date()
    });

    revalidatePath('/dashboard/business');
    revalidatePath('/marketplace');
    redirect('/dashboard/business');
}
