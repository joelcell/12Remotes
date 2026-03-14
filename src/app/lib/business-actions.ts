'use server';

import { auth } from "@/auth";
import { getJobs, Job } from "@/app/lib/store";

export async function getBusinessJobs() {
    const session = await auth();
    const allJobs = getJobs();

    let userJobs: Job[] = [];
    if (session?.user?.email) {
        const emailMatch = session.user.email.match(/business(\d+)@demo.com/);
        if (emailMatch) {
            const bizId = `biz_${emailMatch[1]}`;
            userJobs = allJobs.filter(j => j.companyId === bizId);
        } else {
            userJobs = allJobs.slice(0, 5);
        }
    }
    return { userJobs, session };
}
