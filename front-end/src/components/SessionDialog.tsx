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
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { v4 as uuidv4 } from "uuid";

// =================================================================================================
// Utility functions
// =================================================================================================

const padTime = (value: number) => {
  return value.toString().padStart(2, "0");
};

export const formatToTime = (value: number) => {
  const hoursInteger = Math.floor(value);
  const minutes = Math.round((value - hoursInteger) * 60);
  return `${padTime(hoursInteger)}:${padTime(minutes)}`;
};

export const getMarks = () => {
  const marks: { value: number; label: string }[] = [];
  // Show marks every 2 hours
  for (let i = 0; i <= 24; i += 2) {
    marks.push({ value: i, label: `${padTime(i)}:00` });
  }
  return marks;
};

// =================================================================================================
// SessionDialog component
// =================================================================================================

export const SessionDialog = (props: {
  open: boolean;
  session: Session | null;
  handleClose: () => void;
  handleSave: (session: Session) => void;
}) => {
  const { open, handleClose, handleSave } = props;
  const initialSession = props.session || new Session("", 12, 12);

  const handleChange = (_: any, newValues: number | number[]) => {
    // We are always using a range instead of a single value
    if (Array.isArray(newValues)) {
      setSession(new Session(session.id, newValues[0], newValues[1]));
    }
  };

  const [session, setSession] = useState(initialSession);

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle id="alert-dialog-title">
        {session.id ? "Edit a session" : "Add a session"}
      </DialogTitle>
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
        <DialogContentText>
          Session duration {formatToTime(session.getDuration())} hours
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ justifyContent: "center" }}>
        <Button
          onClick={handleClose}
          variant="contained"
          color="primary"
          startIcon={<CancelIcon />}
          style={{ width: 120 }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (!session.id) {
              session.id = uuidv4();
            }
            handleSave(session);
          }}
          variant="contained"
          autoFocus
          color="success"
          startIcon={<CheckCircleIcon />}
          style={{ width: 120 }}
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};
