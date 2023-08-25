import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";


i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources: {
            debud: true,
            fallbackLng: "en",
            en: {
                translation: {

                    Add :"add"
                }
            },
            ar: {
                translation: {

                    Add : "إضافة"
                }
            },
        },
        interpolation: {
            escapeValue: false
        }
    });

export {i18n}
