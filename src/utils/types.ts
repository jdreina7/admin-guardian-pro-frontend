import { FuseSettingsConfigType } from '@fuse/core/FuseSettings/FuseSettings';
import { IIdentificationType, IGenericInterface } from './interfaces';

export type IUserCreateForm = {
    uid: number;
    identificationTypeId: string;
    email: string;
    firstName: string;
    middleName: string;
    lastName: string;
    genderId: string;
    contactPhone: number;
    address: string;
    city: string;
    birthday: string;
    userImg: string;
    username: string;
    maritalStatusId: string;
    ocupationId: string;
    roleId: string;
    status: boolean;
};

export type IUser = {
    uid: number;
    identificationTypeId: IIdentificationType;
    email: string;
    firstName: string;
    middleName: string;
    lastName: string;
    genderId: IGenericInterface;
    contactPhone: number;
    address: string;
    city: string;
    birthday: string;
    userImg: string;
    username: string;
    password: string;
    maritalStatusId: IGenericInterface;
    ocupationId: IGenericInterface;
    roleId: IGenericInterface;
    status: boolean;
    lastLogin: string;
    settings: Partial<FuseSettingsConfigType>;
    shortcuts: string[];
    createdAt: string;
    updatedAt: string;
    id: string;
};

export type IUserDBResponse = {
    success: boolean;
    data: IUser[];
};
