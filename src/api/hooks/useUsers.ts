import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { TUserDBForStore } from 'src/utils/types';
import { users } from '../queries';

export const useListUsers = (token: string) => {
    return useQuery({
        queryFn: () => users.listUsers({ accessToken: token }),
        queryKey: ['list-users', token]
    });
};

export const useUpdateUser = (token: string, userID: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: TUserDBForStore) => users.updateUser({ accessToken: token, userId: userID, payload: data }),
        onError: (error) => {
            // eslint-disable-next-line no-console
            console.error('Error editing user:', error);

            throw error;
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['list-users']
            });
        },
        retry: false
    });
};

export const useCreateUser = (token: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: TUserDBForStore) => users.createUser({ accessToken: token, payload: data }),
        onError: (error) => {
            // eslint-disable-next-line no-console
            console.error('Error creating user:', error);

            return error;
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['list-users']
            });
        },
        retry: false
    });
};
