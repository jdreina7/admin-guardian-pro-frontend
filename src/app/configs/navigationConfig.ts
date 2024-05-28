import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import i18n from 'i18next';

/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */

//const { t } = useTranslation();
const getTranslationFunction = (key: string): string  => i18n.t(key);

const navigationConfig : FuseNavItemType[] = [
    {
        id: 'dashboard',
        title: `${getTranslationFunction('DASHTITTLE')}`,
        type: 'item',
        icon: 'heroicons-outline:home',
        translate: `${getTranslationFunction('DASHTITTLE')}`,
        url: 'dashboard'
    },
    {
        id: 'users',
        title: `${getTranslationFunction('USERTITTLE')}` ,
        type: 'item',
        icon: 'feather:users',
        translate:`${getTranslationFunction('USERTITTLE')}`,
        url: 'users'
    }
];

export default navigationConfig;
