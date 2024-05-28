import axios, { AxiosResponse } from 'axios';
import { TMaritalStatusDBResponse } from 'src/utils/types';

export const listMaritalStatus = async ({ accessToken }) => {
    const params = new URLSearchParams();

    const response: AxiosResponse<TMaritalStatusDBResponse> = await axios.get('/marital-statuses', {
        headers: { Authorization: `Bearer ${accessToken}` },
        params
    });

    return response;
};
