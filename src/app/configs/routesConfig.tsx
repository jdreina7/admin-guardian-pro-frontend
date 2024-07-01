import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import { FuseRouteConfigsType, FuseRoutesType } from '@fuse/utils/FuseUtils';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/error/Error404Page';
import DashboardConfig from '../main/dashboard/DashboardConfig';
import UsersConfig from '../main/users/UsersConfig';
import RolesConfig from '../main/roles/RolesConfig';
import Error500Page from '../main/error/Error500Page';
import Error403Page from '../main/error/Error403Page';

const routeConfigs: FuseRouteConfigsType = [DashboardConfig, UsersConfig, RolesConfig, SignOutConfig, SignInConfig, SignUpConfig];

/**
 * The routes of the application.
 */
const routes: FuseRoutesType = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
    {
        path: '/',
        element: <Navigate to="/dashboard" />,
        auth: settingsConfig.defaultAuth
    },
    {
        path: 'roles',
        element: <Navigate to="/roles" />
    },
    {
        path: 'users',
        element: <Navigate to="/users" />
    },
    {
        path: 'loading',
        element: <FuseLoading />
    },
    {
        path: '500',
        element: <Error500Page />
    },
    {
        path: '403',
        element: <Error403Page />
    },
    {
        path: '404',
        element: <Error404Page />
    },
    {
        path: '*',
        element: <Navigate to="404" />
    }
];

export default routes;
