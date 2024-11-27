import "./App.css";
import { useEffect, useState } from "react";
import { Session } from "./classes/Session";
import { Sessions } from "./classes/Sessions";
import { Button, Container, Slider, Stack } from "@mui/material";
import { getMarks, SessionDialog } from "./components/SessionDialog";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { SessionList } from "./components/SessionList";

function App() {
  const [sessions, setSessions] = useState(new Sessions());
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [showSessionDialog, setShowSessionDialog] = useState(false);

  const saveSession = (session: Session) => {
    const newSessions = new Sessions(sessions.list);
    newSessions.add(session);
    setSessions(newSessions);
    setShowSessionDialog(false);
  };

  // useEffect(() => {
  //   let newSessions = new Sessions();
  //   for (let s of testSessions) {
  //     newSessions.addNew(s.id, s.start, s.end);
  //   }
  //   setSessions(newSessions);
  // }, []);

  const handleAddSession = () => {
    setActiveSession(null);
    setShowSessionDialog(true);
  };

  const handleEditSession = (session: Session) => {
    setActiveSession(session);
    setShowSessionDialog(true);
  };

  const handleDeleteSession = (session: Session) => {
    const newSessions = new Sessions(sessions.list.filter((s) => s.id !== session.id));
    setSessions(newSessions);
  };

  return (
    <div className="App">
      {showSessionDialog && (
        <SessionDialog
          open={showSessionDialog}
          session={activeSession}
          handleClose={() => setShowSessionDialog(false)}
          handleSave={saveSession}
        ></SessionDialog>
      )}
      <Container maxWidth="lg" style={{ backgroundColor: "white", padding: 32, borderRadius: 16 }}>
        <SessionList sessions={sessions} onEdit={handleEditSession} onDelete={handleDeleteSession} />
        <Button variant="contained" color="primary" startIcon={<AddCircleIcon />} onClick={handleAddSession}>
          Add New Session
        </Button>
      </Container>
    </div>
  );
}

export default App;
