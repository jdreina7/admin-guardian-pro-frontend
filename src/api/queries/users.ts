import axios, { AxiosResponse } from 'axios';
import { TUserDB, TUserDBResponse } from 'src/utils/types';

export const listUsers = async ({ accessToken }) => {
    const params = new URLSearchParams();

    const response: AxiosResponse<TUserDBResponse> = await axios.get('/users', {
        headers: { Authorization: `Bearer ${accessToken}` },
        params
    });

    return response;
};

export const updateUser = async ({ accessToken, userId, payload }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    };

    const data: TUserDB = { ...(payload as TUserDB) };
    const response: AxiosResponse<TUserDBResponse> = await axios.patch(`/users/${userId}`, data, config);

    return response;
};

export const createUser = async ({ accessToken, payload }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    };

    const data: TUserDB = { ...(payload as TUserDB) };
    const response: AxiosResponse<TUserDBResponse> = await axios.post(`/users`, data, config);

    return response;
};
