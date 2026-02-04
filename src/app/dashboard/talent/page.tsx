import { auth, signOut } from "@/auth";

export default async function TalentDashboard() {
    const session = await auth();

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Người tìm việc Dashboard</h1>
                    <form
                        action={async () => {
                            'use server';
                            await signOut();
                        }}
                    >
                        <button className="text-sm font-semibold text-gray-900 hover:text-primary">
                            Sign out
                        </button>
                    </form>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <p className="text-lg">Welcome back, {session?.user?.name || "Remote Talent"}!</p>
                        <p className="mt-2 text-gray-600">Here you can find jobs and manage your profile.</p>

                        <div className="mt-6 border-t pt-4">
                            <h3 className="font-bold text-gray-900">Your Account Details</h3>
                            <p><strong>Email:</strong> {session?.user?.email}</p>
                            <p><strong>Role:</strong> {(session?.user as any).role}</p>
                            <p><strong>ID:</strong> {(session?.user as any).id}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
