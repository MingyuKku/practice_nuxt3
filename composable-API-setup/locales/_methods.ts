import i18nConfig from '~/locales/_config';
// import { getLocaleCookie } from '~/composables/useCookie';

export function i18nMethods() {

    function getLocaleCookie() {
        const cookie = useCookie(i18nConfig.useCookieKey);
        return cookie;
    }

    function setLocaleCookie(code: string) {
        const cookie = useCookie(i18nConfig.useCookieKey, {
            maxAge: 60 * 60 * 60
        });
    
        cookie.value = code;
    }

    function getPrimaryLanguage(langInfo: string) {
        return langInfo.split(',')[0].split(';')[0];
    }
    
    
    function checkBrowserLocale(browserLang: string) {
        if (i18nConfig.locales.some(locale => browserLang.includes(locale.code))) {
            useState(i18nConfig.browserUseStateName, () => browserLang.split('-')[0]);
    
        } else {
            useState(i18nConfig.browserUseStateName, () => null);
        }
    }
    
    
    function getDesplayLocale() {
        let locale = '';
        const localeCookie = getLocaleCookie();
    
        if (
            localeCookie.value === undefined ||
            localeCookie.value === null
        ) {
    
            // 브라우저 언어가 locales에 존재하는 경우
            if (useState(i18nConfig.browserUseStateName).value) {
                locale = useState<string>(i18nConfig.browserUseStateName).value;
    
            // 브라우저 언어가 locales에 존재하지 않는 경우
            } else {
                locale = i18nConfig.defaultLocale
            }
    
        } else {
            locale = localeCookie.value;
        }
    
        return locale;
    }
    
    
    function isLocale(code: string) {
        return getDesplayLocale() === code;
    }

    return {
        getLocaleCookie,
        setLocaleCookie,
        getPrimaryLanguage,
        checkBrowserLocale,
        getDesplayLocale,
        isLocale,
    }
}

