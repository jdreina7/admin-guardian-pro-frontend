import axios, { AxiosResponse } from 'axios';
import { IUserDB } from 'src/utils/types';

export const listUsers = async ({ accessToken, ...parameters }) => {
    const params = new URLSearchParams({ ...parameters });

    const response: AxiosResponse<IUserDB[]> = await axios.get('/users', {
        headers: { Authorization: `Bearer ${accessToken}` },
        params
    });

    return response;
};
