import { ThemeActionObjectTypes } from "../../utility/redux/action-object-type";
import { ThemeActionTypes } from "../../utility/redux/action-types";
const INITIAL_STATE = {
  theme: "dark",
};
export const themeReducer = (
  state = INITIAL_STATE,
  { type, payload }: ThemeActionObjectTypes
) => {
  switch (type) {
    case ThemeActionTypes.TOGGLE_THEME:
      return { ...state, theme: payload };
    default:
      return state;
  }
};
