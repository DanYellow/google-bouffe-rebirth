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
            add_to_favs: 'Add to favorites',
            remove_from_favs: 'Remove from favorites',
            is_favorited: 'Favorited',
            is_not_favorited: 'Favorite',
            add_to_survey: 'Add to survey',
            remove_from_survey: 'Remove from survey',
            display_directions: 'Directions',
            has_mg_discount: 'Discount with your MG ID',
            go_to_website: 'Website',
            directions: 'Directions',
            total_distance: 'Total distance ',
            walk: 'minute(s) walk',
            calories_burned: 'Calories burned',
            calories_burned_note:
                'Base calculated for an person weighting 80 kg (~176 lbs)',
            time: 'Time',
            distance: 'Distance',
            survey: 'Survey',
            delete: 'Delete',
            survey_link: 'Survey link',
            survey_link_desc:
                'Share it with your coworkers to vote for your next lunch !',
            has_easter_egg_steamed_hams: 'You can see an Aurora Borealis',
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
            time: 'Temps',
            distance: 'Distance',
            total_distance: 'Distance totale',
            survey: 'Sondage',
            delete: 'Supprimer',
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
