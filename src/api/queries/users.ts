import axios, { AxiosResponse } from 'axios';
import { IUserDBResponse } from 'src/utils/types';

export const listUsers = async ({ accessToken }) => {
    const params = new URLSearchParams();

    const response: AxiosResponse<IUserDBResponse> = await axios.get('/users', {
        headers: { Authorization: `Bearer ${accessToken}` },
        params
    });

    return response;
};
