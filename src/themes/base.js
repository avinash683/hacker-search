import { Theme } from "@material-ui/core";
import {darkTheme, lightTheme} from "./multipleThemes";
export function getThemeByName(theme) {
  return themeMap[theme];
}

const themeMap : {[key : string] : Theme} = {
  lightTheme,
  darkTheme,
};
