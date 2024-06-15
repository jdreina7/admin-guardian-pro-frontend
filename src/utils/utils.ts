import { User } from 'src/app/auth/user';
import { TUserDB, TUserDBResponse } from './types';

/**
 * Function for map the DB data to state user object
 * @param data Response object from DB
 * @param token Access token
 * @returns Transformed data
 */
export const transformUserDataToUserModel = async (data: TUserDBResponse, token: string): Promise<User> => {
    const userLogedData = data?.data as unknown as TUserDB;

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

/**
 * Function for transform a string to capitalize the first letter
 * @param word String to transform
 * @returns capitalized string
 */
export const capitalizeFirstLetter = (word: string): string => {
    const capitalizedWord = word[0].toUpperCase() + word.slice(1);

    return capitalizedWord;
};
