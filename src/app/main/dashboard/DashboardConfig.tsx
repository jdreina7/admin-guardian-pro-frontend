import { lazy } from 'react';
import i18next from 'i18next';

import en from './i18n/en';
import es from './i18n/es';

const Dashboard = lazy(() => import('./Dashboard'));

i18next.addResourceBundle('en', 'dashboard', en);
i18next.addResourceBundle('es', 'dashboard', es);
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
