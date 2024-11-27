import "./App.css";
import { useEffect, useState } from "react";
import { Session } from "./classes/Session";
import { Sessions } from "./classes/Sessions";
import { Button, Container, Stack } from "@mui/material";
import { SessionDialog } from "./components/SessionDialog";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { SessionList } from "./components/SessionList";
import axios from "axios";

function App() {
  const [sessions, setSessions] = useState(new Sessions());
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [showSessionDialog, setShowSessionDialog] = useState(false);

  const saveSession = (session: Session) => {
    const newSessions = new Sessions(sessions.list);
    newSessions.add(session);
    setSessions(newSessions);
    setShowSessionDialog(false);
    postSession(session);
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

  const getSessions = async () => {
    try {
      const response = await axios.get("http://localhost:3001/sessions");
      if (response.status === 200) {
        let newSessions = new Sessions();
        for (let s of response.data) {
          newSessions.addNew(s.id, s.start, s.end);
        }
        setSessions(newSessions);
      } else {
        console.log("Oh no");
      }
    } catch (e) {
      console.log("Oh no");
    }
  };

  const postSession = async (session: Session) => {
    try {
      const response = await axios.post("http://localhost:3001/sessions", session);
      console.log(response.status);
    } catch (e) {
      console.log("Oh no");
    }
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
        <Button variant="contained" color="primary" onClick={getSessions}>
          GET Sessions
        </Button>
      </Container>
    </div>
  );
}

export default App;
