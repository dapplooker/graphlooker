import { LoadingActionObjectTypes } from '../../utility/redux/action-object-type';
import { LoadingActionTypes } from '../../utility/redux/action-types';
const LOADING_INITIAL_STATE = {
  loading: true,
};
export const loadingReducer = (
  state = LOADING_INITIAL_STATE,
  { type, payload }: LoadingActionObjectTypes
) => {
  switch (type) {
    case LoadingActionTypes.SET_LOADING:
      return { ...state, loading: payload };
    default:
      return state;
  }
};
