import LoginForm from './LoginForm';

export default function LoginPage() {
    return (
        <div className="flex bg-gray-50 min-h-screen flex-col items-center justify-center p-6 md:p-12">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg ring-1 ring-gray-900/5">
                <h1 className="mb-6 text-2xl font-bold text-center text-primary">Login to 12remotes</h1>
                <LoginForm />
            </div>
        </div>
    );
}
