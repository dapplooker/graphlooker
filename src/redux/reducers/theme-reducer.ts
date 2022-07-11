import { ThemeActionObjectTypes } from '../../utility/redux/action-object-type';
import { ThemeActionTypes } from '../../utility/redux/action-types';
import Constants from '../../utility/constant';

const label = Constants.LABELS.commonLables;

const INITIAL_STATE = {
  theme: localStorage.getItem(label.MY_THEME),
};

export const themeReducer = (state = INITIAL_STATE, { type, payload }: ThemeActionObjectTypes) => {
  switch (type) {
    case ThemeActionTypes.TOGGLE_THEME:
      return { ...state, theme: payload };
    default:
      return state;
  }
};
