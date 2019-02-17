import { without } from 'lodash';

const TOGGLE_FAV = 'TOGGLE_FAV';

const initFavs = JSON.parse(window.localStorage.getItem('favs') || '[]');

const initialState = {
    favs: initFavs.map(item => Number(item)),
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAV: {
            const { favs } = state;
            let computedFavs = [...favs];

            if (favs.includes(action.payload.id)) {
                computedFavs = without(favs, action.payload.id);
            } else {
                computedFavs = [...favs, action.payload.id];
            }

            window.localStorage.setItem('favs', JSON.stringify(computedFavs));
            return { ...state, favs: computedFavs };
        }

        default:
            return state;
    }
};

export const toggleFav = id => ({
    type: TOGGLE_FAV,
    payload: {
        id,
    },
});
