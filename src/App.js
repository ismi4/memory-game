import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from "./components/Main";
import Home from "./components/Home";
import Scoreboard from "./components/Scoreboard";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        light: "#484848",
        main: "#212121",
        dark: "#000000",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ffa040",
        main: "#ff6f00",
        dark: "#c43e00",
        contrastText: "#000",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/main">
            <Main />
          </Route>
          <Route path="/scoreboard">
            <Scoreboard />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
