import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slider,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { Session } from "../classes/Session";

// =============================================================================
// Utility functions
// =============================================================================

const padTime = (value: number) => {
  return value.toString().padStart(2, "0");
};

const formatToTime = (value: number) => {
  const hoursInteger = Math.floor(value);
  const minutes = Math.round((value - hoursInteger) * 60);
  return `${padTime(hoursInteger)}:${padTime(minutes)}`;
};

const getMarks = () => {
  const marks: { value: number; label: string }[] = [];
  // Show marks every 2 hours
  for (let i = 0; i <= 24; i += 2) {
    marks.push({ value: i, label: `${padTime(i)}:00` });
  }
  return marks;
};

// =============================================================================
// Main SessionDialog component
// =============================================================================

export const SessionDialog = (props: { open: boolean; handleClose: () => void }) => {
  const { open, handleClose } = props;

  const handleChange = (_: any, newValues: number | number[]) => {
    // We are always using a range instead of a single value
    if (Array.isArray(newValues)) {
      setSession(new Session(session.id, newValues[0], newValues[1]));
    }
  };

  const [session, setSession] = useState(new Session(Math.random(), 0, 1));

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle id="alert-dialog-title">Add a new session</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Use the slider to indicate the start and end time of the session.
        </DialogContentText>
        <Stack marginX={2}>
          <Slider
            style={{ marginTop: 32, marginBottom: 32 }}
            min={0}
            step={1 / 6} // We will work with 10 minute intervals
            max={24}
            value={[session.start, session.end]}
            valueLabelDisplay="auto"
            valueLabelFormat={formatToTime}
            onChange={handleChange}
            marks={getMarks()}
          />
        </Stack>
        <DialogContentText>Session duration {formatToTime(session.getDuration())} hours</DialogContentText>
      </DialogContent>
      <DialogActions style={{ justifyContent: "center" }}>
        <Button onClick={handleClose} variant="contained">
          Cancel
        </Button>
        <Button onClick={handleClose} variant="contained" autoFocus color="success">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
