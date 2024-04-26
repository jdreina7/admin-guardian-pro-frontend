import { lazy } from 'react';

const Dashboard = lazy(() => import('./Dashboard'));

/**
 * The Dashboard configuration.
 */
const DashboardConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: 'dashboard',
            element: <Dashboard />
        }
    ]
};

export default DashboardConfig;
