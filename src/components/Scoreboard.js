import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const columns = [
  { field: "id", headerName: "id", hide: true },
  { field: "rank", headerName: "#", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  {
    field: "score",
    headerName: "Score",
    type: "number",
    width: 130,
  },
  {
    field: "level",
    headerName: "Level",
    type: "number",
    width: 130,
  },
];

function Scoreboard(props) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const players = JSON.parse(localStorage.getItem("players")) || [];

    players.sort((a, b) =>
      a.score > b.score ? -1 : b.score > a.score ? 1 : 0
    );

    const rows = [];
    let rankCounter = 1,
      idCounter = 1;

    players.map((player, index) => {
      rows.push({
        rank: rankCounter,
        name: player.name,
        score: player.score,
        level: player.level,
        id: idCounter,
      });
      if (index !== 0)
        if (player.score !== players[index - 1].score) rankCounter++;
        else rankCounter++;

      idCounter++;
    });

    setRows(rows);
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}

export default Scoreboard;
