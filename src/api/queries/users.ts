import axios, { AxiosResponse } from 'axios';
import { TUserDBResponse } from 'src/utils/types';

export const listUsers = async ({ accessToken }) => {
    const params = new URLSearchParams();

    const response: AxiosResponse<TUserDBResponse> = await axios.get('/users', {
        headers: { Authorization: `Bearer ${accessToken}` },
        params
    });

    return response;
};
