import axios, { AxiosResponse } from 'axios';
import { TRolesDB, TRolesDBResponse } from 'src/utils/types';

export const listRoles = async ({ accessToken }) => {
    const params = new URLSearchParams();

    const response: AxiosResponse<TRolesDBResponse> = await axios.get('/roles', {
        headers: { Authorization: `Bearer ${accessToken}` },
        params
    });

    return response;
};

export const createRole = async ({ accessToken, payload }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    };

    const data: TRolesDB = { ...(payload as TRolesDB) };
    const response: AxiosResponse<TRolesDBResponse> = await axios.post(`/roles`, data, config);

    return response;
};

export const updateRole = async ({ accessToken, roleId, payload }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    };

    const data: TRolesDB = { ...(payload as TRolesDB) };
    const response: AxiosResponse<TRolesDBResponse> = await axios.patch(`/roles/${roleId}`, data, config);

    return response;
};
