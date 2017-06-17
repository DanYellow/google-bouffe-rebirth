import * as ActionTypes from '../constants/action-types';

import { gbapimanager as GBAPIManager } from '../utils/gb-apimanager'

const requestPending = (isRequestPending) => {
  return {
    type: ActionTypes.REQUEST_PENDING,
    isRequestPending
  }
}







