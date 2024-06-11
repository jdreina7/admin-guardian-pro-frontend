import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import i18next from 'i18next';
import es from './navigation-i18n/es';
import en from './navigation-i18n/en';

/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('es', 'navigation', es);

const navigationConfig : FuseNavItemType[] = [
    {
        id: 'dashboard',
        title: 'DASHTITTLE',
        type: 'item',
        icon: 'heroicons-outline:home',
        translate: 'DASHTITTLE',
        url: 'dashboard'
    },
    {
        id: 'users',
        title: 'USERTITTLE' ,
        type: 'item',
        icon: 'feather:users',
        translate:'USERTITTLE',
        url: 'users'
    }
];

export default navigationConfig;
