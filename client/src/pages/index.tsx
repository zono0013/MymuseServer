// pages/index.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import LoginComponent from "@/components/auth/login";
import {authApi} from "@/lib/api/endpoints";

export default function Home() {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const checkAuth = async () => {
            try {
                const response = await fetch('http://localhost:8080/check-session', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data.status === 'authenticated') {
                        router.push('/dashboard');
                    }
                }
            } catch (error) {
                console.error('Auth check failed:', error);
            }
        };

        checkAuth();
    }, [router]);

    if (!isClient) {
        return null; // または適切なローディング表示
    }

    const handleLogin = () => {
        authApi.googleLogin();
    };

    return (
        <Layout>
            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
                    <h2 className="text-2xl font-bold text-center mb-8">Welcome to My Muse</h2>
                    <div className="flex justify-center">
                        <button
                            onClick={handleLogin}
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Googleでログイン
                        </button>
                    </div>
                </div>
            </main>
        </Layout>
    );
}