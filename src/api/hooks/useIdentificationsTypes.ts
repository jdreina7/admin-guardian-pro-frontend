import { useQuery } from '@tanstack/react-query';
import { identificationTypes } from '../queries';

export const useListIdentificationsTypes = (token: string) => {
    return useQuery({
        queryFn: () => identificationTypes.listIdentificationsTypes({ accessToken: token }),
        queryKey: ['list-identifications-types', token]
    });
};
