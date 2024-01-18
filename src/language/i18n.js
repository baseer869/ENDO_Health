import {I18n} from 'i18n-js';
import ko from './ko.json';
import en from './en.json';
import * as Localize from 'react-native-localize';

const locales = Localize.getLocales();

const i18n = new I18n({
  ko,
  en,
});

if (Array.isArray(locales)) {
  i18n.locale = locales[0].languageTag;
}

i18n.defaultLocale = 'en';

i18n.enableFallback = true;
export default i18n;
