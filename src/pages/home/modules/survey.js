export const TOGGLE_FROM_SURVEY = 'TOGGLE_FROM_SURVEY';
export const CREATE_SURVEY = 'CREATE_SURVEY';
export const CANCEL_SURVEY = 'CANCEL_SURVEY';
export const CLEAR_SURVEY = 'CLEAR_SURVEY';

const initialState = {
    url: window.localStorage.getItem('last_survey_hash') || '',
    choices: [],
    clearSurvey: false,
    // voted: JSON.parse(window.localStorage.getItem('voted')) || [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_SURVEY:
        case CANCEL_SURVEY:
            return {
                ...state,
                choices: [],
            };

        case TOGGLE_FROM_SURVEY: {
            const { choices } = state;

            if (choices.includes(action.payload.id)) {
                return {
                    ...state,
                    choices: choices.filter(item => item !== action.payload.id),
                };
            }

            return { ...state, choices: [...choices, action.payload.id] };
        }

        case CLEAR_SURVEY:
            return {
                ...state,
                clearSurvey: true,
            };

        default:
            return state;
    }
};

export const toggleSurveyChoice = id => {
    return {
        type: TOGGLE_FROM_SURVEY,
        payload: {
            id,
        },
    };
};

export const createSurvey = () => ({
    type: CREATE_SURVEY,
});

export const cancelSurvey = () => ({
    type: CANCEL_SURVEY,
});

export const clearSurvey = () => ({
    type: CLEAR_SURVEY,
});
