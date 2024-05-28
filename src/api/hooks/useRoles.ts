import { useQuery } from '@tanstack/react-query';
import { roles } from '../queries';

export const useListRoles = (token: string) => {
    return useQuery({
        queryFn: () => roles.listRoles({ accessToken: token }),
        queryKey: ['list-roles', token]
    });
};
