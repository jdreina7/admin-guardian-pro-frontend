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
    routes: [
        {
            path: 'users',
            element: <Users />
        }
    ]
};

export default UsersConfig;
