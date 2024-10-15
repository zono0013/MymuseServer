// pages/dashboard.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import {authApi} from "@/lib/api/endpoints";

const Dashboard = () => {
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
                if (!response.ok) {
                    router.push('/');
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                router.push('/');
            }
        };

        checkAuth();
    }, [router]);

    if (!isClient) {
        return null; // または適切なローディング表示
    }

    const handleLogout = () => {
        authApi.logout()
    }

    return (
        <Layout>
            <div>Dashboard content</div>
            <button
                onClick={handleLogout}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
                logout
            </button>
        </Layout>
    );
};

export default Dashboard;