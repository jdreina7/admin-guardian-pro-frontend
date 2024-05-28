import axios, { AxiosResponse } from 'axios';
import { TOcupationsDBResponse } from 'src/utils/types';

export const listOcupations = async ({ accessToken }) => {
    const params = new URLSearchParams();

    const response: AxiosResponse<TOcupationsDBResponse> = await axios.get('/ocupations', {
        headers: { Authorization: `Bearer ${accessToken}` },
        params
    });

    return response;
};
