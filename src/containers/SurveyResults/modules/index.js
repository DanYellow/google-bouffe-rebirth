import { requestPending } from 'common/actions';
import { gbapimanager as GBAPIManager } from 'utils/gb-apimanager';

const SURVEY_RESULTS = 'google-bouffe/survey-results/SURVEY_RESULTS';

const getSurveyResultsSuccess = (response) => {
  return {
    type: SURVEY_RESULTS,
    payload: {
      results: response
    }
  }
}

export const getSurveyResults = (hash) => {
  return (dispatch) => {
    dispatch(requestPending(true))
    return GBAPIManager.getResults(hash).then((response) => {
      dispatch(requestPending(false))
      dispatch(
        getSurveyResultsSuccess(response)
      )
    }).catch((error) => {
      dispatch(requestPending(false))
      console.error('getSurveyResults', error);
    })
  }
};
