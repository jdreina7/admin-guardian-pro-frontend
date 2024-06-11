import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './i18n/en';
import es from './i18n/es';

/**
 * resources is an object that contains all the translations for the different languages.
 */
const resources = {
	en: {
		translation: {
			...en
		}
	},
	es: {
		translation: {
			...es
		}
	}
};

/**
 * i18n is initialized with the resources object and the language to use.
 * The keySeparator option is set to false because we do not use keys in form messages.welcome.
 * The interpolation option is set to false because we do not use interpolation in form messages.welcome.
 */
i18n.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		lng: 'en',
		resources,
		keySeparator: false, // we do not use keys in form messages.welcome

		interpolation: {
			escapeValue: false // react already safes from xss
		},
		backend: {
		  loadPath: './i18n/{{ns}}.ts', // Ruta a los archivos de traducción
		},
		detection: {
		  order: ['queryString', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
		  caches: ['localStorage', 'cookie'],
		},
		react: {
		  useSuspense: false,
		},
	});

export default i18n;
