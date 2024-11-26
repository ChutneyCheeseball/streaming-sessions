// =============================================================================
// Class representation of a single session, with id, start and end
// =============================================================================

export class Session {
  private _id: number;
  private _start: number;
  private _end: number;

  constructor(id: number, start: number, end: number) {
    if (end < start) {
      throw new Error("Session end must be after start");
    }
    this._id = id;
    this._start = start;
    this._end = end;
  }

  set id(id: number) {
    this._id = id;
  }

  set start(start: number) {
    this._start = start;
  }

  set end(end: number) {
    this._end = end;
  }

  get id(): number {
    return this._id;
  }

  get start(): number {
    return this._start;
  }

  get end(): number {
    return this._end;
  }

  getDuration() {
    return this._end - this._start;
  }

  toJSON() {
    return {
      id: this.id,
      start: this.start,
      end: this.end,
    };
  }
}
