import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { Sessions } from "./classes/Sessions";
import { Slider, Stack } from "@mui/material";
import { SessionDialog } from "./components/SessionDialog";

const testSessions = [
  {
    id: 1,
    start: 0,
    end: 10,
  },
];

function App() {
  const [sessions, setSessions] = useState(new Sessions());
  const [showSessionDialog, setShowSessionDialog] = useState(false);

  const addNew = () => {
    const newSessions = new Sessions(sessions.list);
    newSessions.addNew(10000 * Math.random(), 1, 10);
    setSessions(newSessions);
  };

  return (
    <div className="App">
      <header className="App-header">
        <SessionDialog open={showSessionDialog} handleClose={() => setShowSessionDialog(false)}></SessionDialog>
        <Stack spacing={2} width={300}>
          {sessions.isEmpty() ? (
            <div>Nothing</div>
          ) : (
            sessions.list.map((session) => (
              <Slider
                key={session.id}
                min={0}
                max={100}
                value={[session.start, session.end]}
                valueLabelDisplay="auto"
                onChangeCommitted={console.log}
                disabled={true}
              />
            ))
          )}
        </Stack>

        <button style={{ padding: 10 }} onClick={() => setShowSessionDialog(true)}>
          Hello
        </button>
      </header>
    </div>
  );
}

export default App;
