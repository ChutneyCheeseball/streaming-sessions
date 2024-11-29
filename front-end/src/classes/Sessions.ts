import { Session } from "./Session";

// =================================================================================================
// List of sessions
// =================================================================================================

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

  getTotalDuration() {
    // Nothing to do
    if (this.isEmpty()) {
      return 0;
    }

    // We only want the start and end times, and we want them sorted
    // with the earliest starting ones appearing first
    const intervals = this._sessions
      .map((session) => ({
        start: session.start,
        end: session.end,
      }))
      .sort((a, b) => a.start - b.start);
    // First interval is first entry in our result set
    const merged = [intervals[0]];
    // Check the others
    for (let i = 1; i < intervals.length; i++) {
      const lastMerged = merged[merged.length - 1]; // The last one merged
      const current = intervals[i]; // The one we will compare it to
      // Check if overlap occurrs
      if (current.start <= lastMerged.end) {
        // Merge to latest ending
        lastMerged.end = Math.max(current.end, lastMerged.end);
      } else {
        // Unmerged result added to set
        merged.push(current);
      }
    }

    let duration = 0;
    for (let m of merged) {
      duration += m.end - m.start;
    }
    return duration;
  }
}
