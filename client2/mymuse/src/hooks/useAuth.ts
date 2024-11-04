// hooks/useAuth.ts
import { useAtom } from 'jotai';
import { userAtom, isLoadingAtom } from "@/atoms/userAtoms";
import { api } from '@/lib/api';
import { User } from '@/types/auth';
import {useCallback} from "react";

export const useAuth = () => {
    const [user, setUser] = useAtom(userAtom);
    const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

    const checkSession = useCallback(async () => {
        if (!isLoading && user) {
            return; // すでに認証済みの場合はスキップ
        }

        try {
            setIsLoading(true);
            const session = await api.checkSession();
            const userData: User = {
                id: session.user_id,
                name: session.name,
                email: session.email,
                photoUrl: session.picture,
            };
            setUser(userData);
        } catch (error) {
            setUser(null);
            console.error('Session check failed:', error);
        } finally {
            setIsLoading(false);
        }
    }, [setUser, setIsLoading, isLoading, user]);


    const logout = async () => {
        try {
            await api.logout();
            setUser(null);
            window.location.reload();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return {
        user,
        isLoading,
        checkSession,
        logout,
    };
};
