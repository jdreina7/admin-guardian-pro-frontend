import { FuseSettingsConfigType } from '@fuse/core/FuseSettings/FuseSettings';
import { SweetAlertIcon } from 'sweetalert2';
import { IGenericInterface, IIdentificationType } from './interfaces';

// Users
export type TUserCreateForm = {
    uid: string;
    identificationTypeId: string;
    email: string;
    firstName: string;
    middleName: string;
    lastName: string;
    genderId: string;
    contactPhone: string;
    address: string;
    city: string;
    birthday: string;
    username: string;
    maritalStatusId: string;
    ocupationId: string;
    roleId: string;
    status: string;
};

export type TUserDBForStore = {
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
    userImg?: string;
    username: string;
    password?: string;
    maritalStatusId: string;
    ocupationId: string;
    roleId: string;
    status: boolean;
    lastLogin?: string;
    settings?: Partial<FuseSettingsConfigType>;
    shortcuts?: string[];
    createdAt?: string;
    updatedAt?: string;
    id?: string;
};

export type TUserDB = {
    uid: number | string;
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
    userImg?: string;
    username: string;
    password?: string;
    maritalStatusId: IGenericInterface;
    ocupationId: IGenericInterface;
    roleId: IGenericInterface;
    status: boolean;
    lastLogin?: string;
    settings?: Partial<FuseSettingsConfigType>;
    shortcuts?: string[];
    createdAt?: string;
    updatedAt?: string;
    id?: string;
};

export type TUserDBResponse = {
    success: boolean;
    data: TUserDB[];
};

// Identifications Types
export type TIdentificationTypesDBResponse = {
    success: boolean;
    data: TIdentificationTypeDB[];
};

export type TIdentificationTypeDB = {
    type: string;
    description: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    id: string;
};

// Ocupations
export type TOcupationsDBResponse = {
    success: boolean;
    data: TOcupationsDB[];
};

export type TOcupationsDB = {
    name: string;
    description: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    id: string;
};

// Marital Status
export type TMaritalStatusDBResponse = {
    success: boolean;
    data: TMaritalStatusDB[];
};

export type TMaritalStatusDB = {
    name: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    id: string;
};

// Genders
export type TGendersDBResponse = {
    success: boolean;
    data: TGendersDB[];
};

export type TGendersDB = {
    name: string;
    description: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    id: string;
};

// Roles
export type TRolesDBResponse = {
    success: boolean;
    data: TRolesDB[];
};

export type TRolesDB = {
    name: string;
    description: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    id: string;
};

// SwwetAlert2
export type TModalConstants = {
    modalTitle?: string;
    modalSubmitBtnText?: string;
    successMsg?: string;
    msgIcon?: SweetAlertIcon;
    msgText?: string;
    msgTitle?: string;
};
