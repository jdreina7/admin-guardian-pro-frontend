import { lazy } from 'react';
import i18next from 'i18next';



const Dashboard = lazy(() => import('./Dashboard'));

i18next.addResourceBundle('en', 'mailboxApp', en);
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
