import './App.css';
import React, { useState} from "react";
import Main from "./components/Main";
import {ThemeProvider} from "@material-ui/styles";
import FlashOffIcon from '@material-ui/icons/FlashOff';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import {createTheme} from "@material-ui/core";
import {darkTheme, lightTheme} from "./themes/multipleThemes";

function App() {
    const [theme, setTheme] = useState(true);
    const icon = !theme ? <FlashOnIcon /> : <FlashOffIcon />;
    const appliedTheme = createTheme(theme ? lightTheme : darkTheme);

    return (
    <div>
        <ThemeProvider theme={appliedTheme}>
          <Main theme={theme} setTheme={setTheme} icon={icon}/>
        </ThemeProvider>
    </div>
  );
}

export default App;
