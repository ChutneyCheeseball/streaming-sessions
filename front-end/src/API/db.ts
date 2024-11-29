import axios from "axios";
import { Sessions } from "../classes/Sessions";
import { Session } from "../classes/Session";

export const getSessions = async () => {
  try {
    const response = await axios.get("http://localhost:3001/sessions");
    let newSessions = new Sessions();
    if (response.status === 200) {
      for (let s of response.data) {
        newSessions.addNew(s.id, s.start, s.end);
      }
      return newSessions;
    }
  } catch (e) {
    console.error("Error getting sessions:", e);
    // These could have been beautiful toast messages
    alert("Could not get sessions. Is the API service running?");
  }
  return null;
};

export const postSession = async (session: Session) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/sessions",
      session
    );
  } catch (e) {
    console.error("Error creating/updating session:", e);
    alert("Could not create/update session. Is the API service running?");
  }
};

export const deleteSession = async (session: Session) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/sessions/${session.id}`
    );
  } catch (e) {
    console.error("Error deleting session:", e);
    alert("Could not delete sessions. Is the API service running?");
  }
};
