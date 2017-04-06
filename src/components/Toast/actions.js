import { TOAST_SHOW } from './constants';

export const show = (message) => ({
  type: TOAST_SHOW,
    payload:{
      message
    }
});

