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
    console.log("Oh no");
  }
  return null;
};

export const postSession = async (session: Session) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/sessions",
      session
    );
    console.log(response.status);
  } catch (e) {
    console.log("Oh no");
  }
};

export const deleteSession = async (session: Session) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/sessions/${session.id}`
    );
    console.log(response.status);
  } catch (e) {
    console.log("Oh no");
  }
};
