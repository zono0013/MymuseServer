import { useQuery, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/lib/api/endpoints';
import { User } from '@/types/user';

export const useAuth = () => {
    const queryClient = useQueryClient();

    const { data: user, isLoading, error } = useQuery<User>({
        queryKey: ['user'],
        queryFn: userApi.fetchUser,
        retry: false,
    });

    const logout = async () => {
        await userApi.logout();
        queryClient.clear();
        window.location.href = '/';
    };

    return {
        user,
        isLoading,
        isAuthenticated: !!user,
        error,
        logout,
    };
};