import { Stack, Slider, Button } from "@mui/material";
import { Sessions } from "../classes/Sessions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Session } from "../classes/Session";
import { formatToTime } from "./SessionDialog";

export const SessionList = (props: {
  sessions: Sessions;
  onEdit: (editSession: Session) => void;
  onDelete: (deleteSession: Session) => void;
}) => {
  const { sessions, onEdit, onDelete } = props;
  return (
    <Stack spacing={4} marginBottom={8}>
      {sessions.isEmpty()
        ? "There are no sessions to view."
        : sessions.list.map((session) => (
            <Stack key={session.id} direction="row" spacing={2}>
              <Slider
                min={0}
                max={24}
                value={[session.start, session.end]}
                valueLabelDisplay="auto"
                valueLabelFormat={formatToTime}
                style={{ marginRight: 24 }}
                marks={[
                  { value: session.start, label: formatToTime(session.start) },
                  { value: session.end, label: formatToTime(session.end) },
                ]}
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => onEdit(session)}
                style={{ width: 120 }}
                size="small"
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<DeleteForeverIcon />}
                onClick={() => onDelete(session)}
                style={{ width: 120 }}
                size="small"
              >
                Delete
              </Button>
            </Stack>
          ))}
    </Stack>
  );
};
