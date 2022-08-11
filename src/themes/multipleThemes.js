import { createTheme } from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";

export const lightTheme = {
  typography:{
    fontFamily: 'Open Sans',
  },
  palette: {
    type: "light",
    primary: blue,
    background: {
      default: "#f9f9f9",
      paper: "#fff",
      level1: "#fff",
      level2: "#f9f9f9"
    },
    text:{
      primary:  "#121212",
      secondary: "#605d5d",
    }
  },
  shape:{
    borderRadius:5
  }
};

export const  darkTheme = {
  typography:{
    fontFamily: 'Open Sans',
  },
  palette: {
    type: "dark",
    primary: blue,
    background: {
      default: "#121212",
      paper: "#191919",
      level1: "#222222",
      level2: "#121212",
    },
    text:{
      primary: "#ffffff" ,
      secondary: "#bbbbbb",
    }
  },
  shape:{
    borderRadius:5
  }
};