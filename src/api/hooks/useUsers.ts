import { useQuery } from '@tanstack/react-query';
import { users } from '../queries';

export const useListUsers = (token: string, parameters: object) => {
    return useQuery({
        queryFn: () => users.listUsers({ accessToken: token, parameters: { ...parameters } }),
        queryKey: ['list-users', token]
    });
};
