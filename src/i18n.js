import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en/translation.json';
import translationRU from './locales/ru/translation.json';

// Определяем ресурсы (переводы)
const resources = {
  en: {
    translation: translationEN
  },
  ru: {
    translation: translationRU
  }
};

// Инициализация i18n
i18n
  .use(LanguageDetector) // Используем детектор языка
  .use(initReactI18next) // Подключаем i18next к React
  .init({
    resources,
    fallbackLng: 'en', // Язык по умолчанию, если не определен другой
    debug: true, // Включить режим отладки
    interpolation: {
      escapeValue: false // React сам экранирует HTML
    }
  });

export default i18n;
