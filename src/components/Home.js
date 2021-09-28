import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";

import "../styles/Home.css";

import { Typography, TextField, Button, Grid, Box } from "@mui/material";

import { useState, useEffect } from "react";
import { getThemeProps } from "@mui/system";

function Home(props) {
  const [playersName, setPlayersName] = useState("");
  //u hook
  const [players, setPlayers] = useState(
    JSON.parse(localStorage.getItem("players")) || []
  );

  //koristiti find funkciju
  const getPlayer = (name) => {
    for (let i = 0; i < players.length; i++)
      if (players[i].name === name) return players[i];

    return null;
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Grid sx={{ textAlign: "center" }} container spacing={2}>
        <Grid item xs={12}>
          <TextField
            color="secondary"
            className="screen"
            id="outlined-basic"
            variant="outlined"
            size="small"
            value={playersName}
            onChange={(event) => {
              setPlayersName(event.target.value);
            }}
            sx={{ width: 0.33 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            sx={{ marginRight: 0.5 }}
            color="secondary"
            variant="outlined"
            onClick={() => {
              if (playersName) {
                const player = getPlayer(playersName) || {
                  name: playersName,
                  score: 0,
                  level: 1,
                };

                props.history.push({
                  pathname: "/main",
                  state: { player, continue: false, players },
                });
              }
            }}
          >
            NEW GAME
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              console.log(playersName);
              console.log(getPlayer(playersName));
              if (playersName && getPlayer(playersName)) {
                const player = getPlayer(playersName);
                props.history.push({
                  pathname: "/main",
                  state: { player, continue: true, players },
                });
              }
            }}
          >
            CONTINUE
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default withRouter(Home);
