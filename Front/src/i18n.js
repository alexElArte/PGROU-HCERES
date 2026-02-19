import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import des fichiers de traduction
import translationFR from './locales/fr/translation.json';
import translationEN from './locales/en/translation.json';

// Configuration des ressources (traductions)
const resources = {
  fr: {
    translation: translationFR
  },
  en: {
    translation: translationEN
  }
};

i18n
  .use(LanguageDetector) // Détecte la langue du navigateur
  .use(initReactI18next) // Passe i18n à react-i18next
  .init({
    resources,
    //lng: 'en', // Langue par défaut
    fallbackLng: 'en', // Langue de secours si traduction manquante
    
    interpolation: {
      escapeValue: false // Je sais pas trop ce que ça fait mais c'est recommandé de le mettre à false avec React d'après un post Reddit
    },
    
    // Options additionnelles utiles
    debug: false, // Mettre à true pour voir les logs en développement
    
    // Sauvegarde la langue choisie dans le localStorage
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
