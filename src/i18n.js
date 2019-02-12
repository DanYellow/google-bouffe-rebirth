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
            add_to_favs: 'Favorite',
            remove_from_favs: 'Favorited',
            add_to_survey: 'Add to survey',
            remove_from_survey: 'Remove from survey',
            display_directions: 'Directions',
            has_mg_discount: 'You have a discount with your MG ID',
            go_to_website: 'Website',
            directions: 'Directions',
            total_distance: 'Distance totale',
            walk: 'minute(s) walk',
            calories_burned: 'Calories burned',
            calories_burned_note:
                'Base calculated for an person weighting 80 kg (~176 lbs)',
        },
    },
    fr: {
        translation: {
            favorites: 'Favoris',
            all: 'Tous',
            empty_quote: 'L’enfer est vide et tous les démons sont ici',
            go_to_website: 'Site web',
            directions: 'Itinéraire',
            walk: 'minute(s) de marche',
            calories_burned_note:
                'Base calculée pour un individu de 80 kg à une allure de 3 km/h',
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
