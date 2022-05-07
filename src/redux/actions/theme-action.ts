import { ThemeActionTypes } from "../../utility/redux/action-types";
export const toggleTheme = (theme: string) => {
  return {
    type: ThemeActionTypes.TOGGLE_THEME,
    payload: theme,
  };
};
