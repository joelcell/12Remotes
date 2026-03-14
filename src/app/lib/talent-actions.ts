'use server';

import { auth } from "@/auth";

export async function getTalentSession() {
    const session = await auth();
    return session;
}
