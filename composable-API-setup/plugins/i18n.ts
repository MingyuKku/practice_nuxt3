import { i18nMethods } from '~/locales/_methods';

export default defineNuxtPlugin(async () => {

    const { getPrimaryLanguage, checkBrowserLocale, getDesplayLocale } = i18nMethods();

    if (process.server) {
        const headers = useRequestHeaders();
        const acceptLang = headers['accept-language'];
        const primaryLang = getPrimaryLanguage(acceptLang);

        checkBrowserLocale(primaryLang);
    }

    const locale = getDesplayLocale();
    
    const module = await import(`~/locales/${locale}.json`);
    
    return {
        provide: {
            I: module.default,
        }
    }
 
})