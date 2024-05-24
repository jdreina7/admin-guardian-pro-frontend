import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import FuseLayout from '@fuse/core/FuseLayout';
import FuseTheme from '@fuse/core/FuseTheme';
import { SnackbarProvider } from 'notistack';
import { useSelector } from 'react-redux';
import createCache, { Options } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

import { selectMainTheme } from '@fuse/core/FuseSettings/store/fuseSettingsSlice';
import MockAdapterProvider from '@mock-api/MockAdapterProvider';
import rtlPlugin from 'stylis-plugin-rtl';
import { selectCurrentLanguageDirection } from 'app/store/i18nSlice';
import themeLayouts from 'app/theme-layouts/themeLayouts';
import withAppProviders from './withAppProviders';
import { AuthRouteProvider } from './auth/AuthRouteProvider';

// import axios from 'axios';
/**
 * Axios HTTP Request defaults
 */
axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}`;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

const emotionCacheOptions = {
    rtl: {
        key: 'muirtl',
        stylisPlugins: [rtlPlugin],
        insertionPoint: document.getElementById('emotion-insertion-point')
    },
    ltr: {
        key: 'muiltr',
        stylisPlugins: [],
        insertionPoint: document.getElementById('emotion-insertion-point')
    }
};

/**
 * React Query section
 */
const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 5000, refetchOnWindowFocus: false } }
});

/**
 * The main App component.
 */
function App() {
    /**
     * The language direction from the Redux store.
     */
    const langDirection = useSelector(selectCurrentLanguageDirection);

    /**
     * The main theme from the Redux store.
     */
    const mainTheme = useSelector(selectMainTheme);

    return (
        <MockAdapterProvider>
            <QueryClientProvider client={queryClient}>
                <CacheProvider value={createCache(emotionCacheOptions[langDirection] as Options)}>
                    <FuseTheme theme={mainTheme} direction={langDirection}>
                        <AuthRouteProvider>
                            <SnackbarProvider
                                maxSnack={5}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                }}
                                classes={{
                                    containerRoot: 'bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99'
                                }}
                            >
                                <FuseLayout layouts={themeLayouts} />
                            </SnackbarProvider>
                        </AuthRouteProvider>
                    </FuseTheme>
                </CacheProvider>
            </QueryClientProvider>
        </MockAdapterProvider>
    );
}

export default withAppProviders(App);
