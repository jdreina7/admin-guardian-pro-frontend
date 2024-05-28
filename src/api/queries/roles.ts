import axios, { AxiosResponse } from 'axios';
import { TRolesDBResponse } from 'src/utils/types';

export const listRoles = async ({ accessToken }) => {
    const params = new URLSearchParams();

    const response: AxiosResponse<TRolesDBResponse> = await axios.get('/roles', {
        headers: { Authorization: `Bearer ${accessToken}` },
        params
    });

    return response;
};
