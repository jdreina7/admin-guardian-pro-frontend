import { FuseSettingsConfigType } from '@fuse/core/FuseSettings/FuseSettings';

/**
 * The type definition for a user object.
 */
export type User = {
    id: string;
    email: string;
    role: string[] | string | null;
    token: string;
    data: {
        displayName: string;
        photoURL?: string;
        email?: string;
        shortcuts?: string[];
        settings?: Partial<FuseSettingsConfigType>;
        loginRedirectUrl?: string; // The URL to redirect to after login.
    };
};
