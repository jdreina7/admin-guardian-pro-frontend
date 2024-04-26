import { useQuery } from '@tanstack/react-query';
import { users } from '../queries';

export const useListUsers = (token: string) => {
    return useQuery({
        queryFn: () => users.listUsers({ accessToken: token }),
        queryKey: ['list-users', token]
    });
};
