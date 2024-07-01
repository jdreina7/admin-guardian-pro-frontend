import { lazy } from 'react';

const Roles = lazy(() => import('./Roles'));

/**
 * The Roles configuration.
 */
const RolesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: ['superadmin'],
    routes: [
        {
            path: 'roles',
            element: <Roles />
        }
    ]
};

export default RolesConfig;
