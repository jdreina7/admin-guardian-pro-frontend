import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TRolesDB } from 'src/utils/types';
import { roles } from '../queries';

export const useListRoles = (token: string) => {
    return useQuery({
        queryFn: () => roles.listRoles({ accessToken: token }),
        queryKey: ['list-roles', token]
    });
};

export const useUpdateRole = (token: string, roleId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: TRolesDB) => roles.updateRole({ accessToken: token, roleId, payload: data }),
        onError: (error) => {
            // eslint-disable-next-line no-console
            console.error('Error editing role:', error);

            throw error;
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['list-roles']
            });
        },
        retry: false
    });
};

export const useCreateRole = (token: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: TRolesDB) => roles.createRole({ accessToken: token, payload: data }),
        onError: (error) => {
            // eslint-disable-next-line no-console
            console.error('Error creating role:', error);

            return error;
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['list-roles']
            });
        },
        retry: false
    });
};
