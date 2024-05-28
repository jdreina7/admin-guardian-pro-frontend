import axios, { AxiosResponse } from 'axios';
import { TGendersDBResponse } from 'src/utils/types';

export const listGenders = async ({ accessToken }) => {
    const params = new URLSearchParams();

    const response: AxiosResponse<TGendersDBResponse> = await axios.get('/genders', {
        headers: { Authorization: `Bearer ${accessToken}` },
        params
    });

    return response;
};
