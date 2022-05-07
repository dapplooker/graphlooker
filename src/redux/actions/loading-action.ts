import { LoadingActionTypes } from '../../utility/redux/action-types';
export const setDataLoading = (loading: boolean) => {
  return {
    type: LoadingActionTypes.SET_LOADING,
    payload: loading,
  };
};
