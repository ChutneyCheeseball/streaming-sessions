import "./App.css";
import { useState } from "react";
import { Session } from "./classes/Session";
import { Sessions } from "./classes/Sessions";
import { Button, Container } from "@mui/material";
import { SessionDialog } from "./components/SessionDialog";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { SessionList } from "./components/SessionList";

import { deleteSession, getSessions, postSession } from "./API/db";
import { LoadSaveButtons } from "./components/LoadSaveButtons";

// =================================================================================================
// Main Front-End App
// =================================================================================================

export const App = () => {
  // ---------------------------------------------------------------------------
  // Hooks
  // ---------------------------------------------------------------------------

  const [sessions, setSessions] = useState(new Sessions());
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [showSessionDialog, setShowSessionDialog] = useState(false);

  // ---------------------------------------------------------------------------
  // Manipulating Sessions
  // ---------------------------------------------------------------------------

  const handleAddSession = () => {
    setActiveSession(null);
    setShowSessionDialog(true);
  };

  const handleEditSession = (session: Session) => {
    setActiveSession(session);
    setShowSessionDialog(true);
  };

  const handleDeleteSession = (session: Session) => {
    const newSessions = new Sessions(
      sessions.list.filter((s) => s.id !== session.id)
    );
    setSessions(newSessions);
    deleteSession(session);
  };

  const saveSession = (session: Session) => {
    const newSessions = new Sessions(sessions.list);
    newSessions.add(session);
    setSessions(newSessions);
    setShowSessionDialog(false);
    postSession(session);
  };

  // ---------------------------------------------------------------------------
  // Load/Save Buttons
  // ---------------------------------------------------------------------------

  const loadSessions = async () => {
    const newSessions = await getSessions();
    if (newSessions !== null) {
      setSessions(newSessions);
    } else {
      console.log("Oh no");
    }
  };

  // I didn't implement posting multiple at once
  // Send one at a time
  const saveSessions = async () => {
    const toSave = [...sessions.list];
    for (let s of toSave) {
      await postSession(s);
    }
  };

  // ---------------------------------------------------------------------------
  // Main Render
  // ---------------------------------------------------------------------------

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
      <Container
        maxWidth="lg"
        style={{ backgroundColor: "white", padding: 32, borderRadius: 16 }}
      >
        <LoadSaveButtons loadAll={loadSessions} saveAll={saveSessions} />
        <SessionList
          sessions={sessions}
          onEdit={handleEditSession}
          onDelete={handleDeleteSession}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
          onClick={handleAddSession}
        >
          Add New Session
        </Button>
      </Container>
    </div>
  );
};
