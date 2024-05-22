import { useQuery } from '@tanstack/react-query';
import { genders } from '../queries';

export const useListGenders = (token: string) => {
    return useQuery({
        queryFn: () => genders.listGenders({ accessToken: token }),
        queryKey: ['list-genders', token]
    });
};
