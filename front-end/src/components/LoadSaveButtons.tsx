import { Stack, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";

// =================================================================================================
// Buttons for Loading/Saving sessions from/to DB
// =================================================================================================

export const LoadSaveButtons = (props: {
  loadAll: () => void;
  saveAll: () => void;
}) => {
  const { loadAll, saveAll } = props;
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      style={{ marginBottom: 32 }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={loadAll}
        startIcon={<DownloadIcon />}
      >
        Load All
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={saveAll}
        startIcon={<UploadIcon />}
      >
        Save All
      </Button>
    </Stack>
  );
};
