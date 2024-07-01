import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import i18next from 'i18next';
import es from '../../i18n/es/es';
import en from '../../i18n/en/en';

/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('es', 'navigation', es);

const navigationConfig: FuseNavItemType[] = [
    {
        id: 'dashboard',
        title: 'dashboard_title',
        type: 'item',
        icon: 'heroicons-outline:home',
        translate: 'dashboard_title',
        url: 'dashboard'
    },
    {
        id: 'roles',
        title: 'roles_title',
        type: 'item',
        icon: 'heroicons-outline:key',
        translate: 'roles_title',
        url: 'roles',
        auth: ['superadmin']
    },
    {
        id: 'users',
        title: 'users_title',
        type: 'item',
        icon: 'feather:users',
        translate: 'users_title',
        url: 'users',
        auth: ['admin', 'superadmin']
    }
];

export default navigationConfig;
