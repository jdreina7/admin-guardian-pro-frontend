import { useQuery } from '@tanstack/react-query';
import { ocupations } from '../queries';

export const useListOcupations = (token: string) => {
    return useQuery({
        queryFn: () => ocupations.listOcupations({ accessToken: token }),
        queryKey: ['list-ocupations', token]
    });
};
