import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { Link as RouterLink } from "react-router";

type QuizMenuModalProps = {
  open: boolean;
  onClose: () => void;
  onRestart: () => void;
};

export function QuizMenuModal({ open, onClose, onRestart }: QuizMenuModalProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Меню уровня</DialogTitle>
      <DialogContent>
        <Stack spacing={1.5} sx={{ pt: 1 }}>
          <Button
            component={RouterLink}
            to="/match"
            variant="outlined"
            color="inherit"
            fullWidth
          >
            К темам
          </Button>
          <Button
            component={RouterLink}
            to="/"
            variant="outlined"
            color="inherit"
            fullWidth
          >
            На главную
          </Button>
          <Button variant="contained" color="primary" fullWidth onClick={onClose}>
            Продолжить
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => {
              onRestart();
              onClose();
            }}
          >
            Начать заново
          </Button>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  );
}
