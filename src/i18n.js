import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
    en: {
        translation: {
            favorites: 'Favs',
            all: 'All',
            empty_quote: 'Hell is empty and all the devils are here',
            empty_quote_author: 'William Shakespeare',
            add_to_fav: 'Add to favorites',
            add_to_survey: 'Add to survey',
            remove_to_survey: 'Remove from survey',
            display_directions: 'Display directions',
            remove_from_favorites: 'Remove from favorites',
        },
    },
    fr: {
        translation: {
            favorites: 'Favoris',
            all: 'Tous',
            empty_quote: 'L’enfer est vide et tous les démons sont ici',
        },
    },
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'en',

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
