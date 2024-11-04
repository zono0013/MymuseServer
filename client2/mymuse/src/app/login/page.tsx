import { LoginButton } from '@/components/LoginButton';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
    // サーバーサイドでセッションチェック
    try {
        const headersList = await headers();
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/check-session`, {
            headers: {
                Cookie: headersList.get('cookie') || '',
            },
        });

        if (response.ok) {
            const session = await response.json();
            if (session.isLoggedIn) {
                redirect('/home');
            }
        }
    } catch (error) {
        // エラーハンドリング
        console.error('Session check failed:', error);
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6">ログイン</h1>
                <LoginButton />
            </div>
        </div>
    );
}