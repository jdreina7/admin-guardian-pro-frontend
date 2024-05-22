import { useQuery } from '@tanstack/react-query';
import { maritalStatus } from '../queries';

export const useListMaritalStatus = (token: string) => {
    return useQuery({
        queryFn: () => maritalStatus.listMaritalStatus({ accessToken: token }),
        queryKey: ['list-marital-status', token]
    });
};
