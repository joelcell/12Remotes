'use server'
import { getJobs, getJobById } from "@/app/lib/store"

export async function fetchJobs() {
    return getJobs();
}

export async function fetchJobById(id: number) {
    return getJobById(id);
}
