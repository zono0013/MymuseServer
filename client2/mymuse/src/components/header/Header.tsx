'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import './header.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function Header() {
    const router = useRouter();
    const { user, logout, checkSession } = useAuth();

    useEffect(() => {
        checkSession();
    }, [checkSession]);

    const handleNavigation = () => {
        if (user) {
            router.push('/home');
        } else {
            router.push('/');
        }
    };

    return (
        <header className="my-muse-header">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="my-muse-title" onClick={handleNavigation}>
                    My Muse
                </h1>
                {user ? (
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            {user.photoUrl && (
                                <Image
                                    src={user.photoUrl}
                                    alt="Profile"
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                />
                            )}
                            <span>{user.name}</span>
                        </div>
                        <button
                            onClick={logout}
                            className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                        >
                            ログアウト
                        </button>
                    </div>
                ) : (
                    <button
                        className="login-button"
                        onClick={() => router.push('/login')}
                    >
                        Login
                    </button>
                )}
            </div>
        </header>
    );
}
