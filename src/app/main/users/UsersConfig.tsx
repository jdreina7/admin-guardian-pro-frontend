import { lazy } from 'react';

const Users = lazy(() => import('./Users'));

/**
 * The Users configuration.
 */
const UsersConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: ['admin', 'superadmin'],
    routes: [
        {
            path: 'users',
            element: <Users />
        }
    ]
};

export default UsersConfig;
