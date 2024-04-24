export interface IAPIErrorResponse {
    message: string;
    success: boolean;
}

export interface IIdentificationType {
    type: string;
    id: string;
}

export interface IGenericInterface {
    name: string;
    id: string;
}

export interface ILayout {
    style: string;
}

export interface ITheme {
    main: string;
    navbar: string;
    toolbar: string;
    footer: string;
}
export interface ISettings {
    layout: ILayout;
    theme: ITheme;
    _id: string;
}
