# streaming-sessions front-end

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The [MUI](https://mui.com) library was used to leverage components such as the slider, icon buttons and dialogs.

## Prerequisites

The React app requires the back-end services (NodeJS, MySQL) to be running.

## Quickstart

Install the required node modules with:

### `npm install`

Thereafter you can run the project with:

### `npm start`

This runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Using the app

The following buttons appear on screen.

- **Load All** - load all sessions from API
- **Save All** - save all sessions to API
- **Add New Session** - opens a dialog to add a new session

When sessions have been added, they are represented by a read-only slider with indicated start and end times. Alongside, there are also two buttons per session.

- **Edit** - open a dialog to edit this session
- **Delete** - delete this session

The add/edit session dialog features a slider marked at 2-hour intervals. Drag the ends of the slider until the session start and end times are as required. Note that the slider snaps to 10-minute intervals, which was done deliberately for the sake of simplicity. The dialog shows the duration of the session being worked on, and has two buttons.

- **Cancel** - discard any changes made
- **Apply** - save changes

## Calculating total duration of sessions

This is implemented in `src/classes/Sessions.ts` in the `getTotalDuration()` method.

The problem is a variant of a very similiar problem I've had to solve previously, so I had a fairly good idea on how to approach it. I provided comments on the method, but in a nutshell:

1. Sort all sessions by start time, earliest first.
2. Use the first session as the first entry in the merged result set.
3. Loop over remaining sessions
4. Compare each session to the last entry in the merged result set.
5. If the session starts before the last merged one ends, overlap occurrs. Extend the end time of the last merged to whichever end time is greatest between current and last.
6. If no overlap, add the session to the result set.
7. Repeat from step 3.

The total duration is equal to the end time - start time of each entry in the result set.
