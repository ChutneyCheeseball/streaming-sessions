import { Session } from "./Session";

// =============================================================================
// List of sessions
// =============================================================================

export class Sessions {
  private _sessions: Session[];

  constructor(sessions: Session[] = []) {
    this._sessions = sessions;
  }

  // Add or update
  add(session: Session) {
    const idx = this._sessions.findIndex((ses) => ses.id === session.id);
    if (idx !== -1) {
      this._sessions[idx] = session;
    } else {
      this._sessions.push(session);
    }
  }

  addNew(id: string, start: number, end: number) {
    return this.add(new Session(id, start, end));
  }

  remove(session: Session) {
    const index = this._sessions.indexOf(session);
    if (index !== -1) {
      this.removeByIdx(index);
    }
  }

  removeById(id: string) {
    const index = this._sessions.findIndex((session) => session.id === id);
    if (index !== -1) {
      this.removeByIdx(index);
    }
  }

  removeByIdx(idx: number) {
    if (idx < 0 || idx >= this._sessions.length) {
      return false; // Nothing removed
    }
    this._sessions.splice(idx, 1);
    return true; // Removed OK
  }

  get list(): Session[] {
    return [...this._sessions];
  }

  isEmpty() {
    return this._sessions.length === 0;
  }
}
