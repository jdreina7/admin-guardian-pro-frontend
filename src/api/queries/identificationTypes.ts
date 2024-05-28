import axios, { AxiosResponse } from 'axios';
import { TIdentificationTypesDBResponse } from 'src/utils/types';

export const listIdentificationsTypes = async ({ accessToken }) => {
    const params = new URLSearchParams();

    const response: AxiosResponse<TIdentificationTypesDBResponse> = await axios.get('/identifications-types', {
        headers: { Authorization: `Bearer ${accessToken}` },
        params
    });

    return response;
};
