'use server'
import { getJobs, getJobById, getTalents, getTalentById } from "@/app/lib/store"

export async function fetchJobs() {
    return getJobs();
}

export async function fetchJobById(id: number) {
    return getJobById(id);
}

export async function fetchTalents() {
    return getTalents();
}

export async function fetchTalentById(id: string) {
    return getTalentById(id);
}
