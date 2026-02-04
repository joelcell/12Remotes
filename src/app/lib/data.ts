'use server'
import { getJobs } from "@/app/lib/store"

export async function fetchJobs() {
    return getJobs();
}
