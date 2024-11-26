import { Session } from "./Session";

// =============================================================================
// Class representation of an array of ssessions
// =============================================================================

export class Sessions {
  private _sessions: Session[];

  constructor(sessions: Session[] = []) {
    this._sessions = sessions;
  }

  add(session: Session) {
    if (this._sessions.findIndex((ses) => ses.id === session.id) !== -1) {
      return false; // Can't add multiples with same ID
    }
    this._sessions.push(session);
    return true; // Added OK
  }

  addNew(id: number, start: number, end: number) {
    return this.add(new Session(id, start, end));
  }

  remove(session: Session) {
    const index = this._sessions.indexOf(session);
    if (index !== -1) {
      this.removeByIdx(index);
    }
  }

  removeById(id: number) {
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
