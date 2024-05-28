import { User } from 'src/app/auth/user';
import { IUserDB } from './interfaces';
import i18n from 'i18next';

/**
 * Function for map the DB data to state user object
 * @param data Response object from DB
 * @param token Access token
 * @returns Transformed data
 */
export const transformUserDataToUserModel = async (data: IUserDB, token: string): Promise<User> => {
    const userLogedData = data.data;

    const userData = {
        uid: userLogedData?.id,
        idNumber: userLogedData?.uid,
        role: userLogedData?.roleId?.name,
        token,
        data: {
            displayName: userLogedData?.username?.length > 0 ? userLogedData?.username : userLogedData?.email,
            photoURL: userLogedData?.userImg,
            email: userLogedData?.email,
            shortcuts: userLogedData?.shortcuts,
            settings: userLogedData?.settings
        }
    };

    return userData;
};


