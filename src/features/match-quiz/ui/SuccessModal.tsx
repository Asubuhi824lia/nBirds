import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router";

type SuccessModalProps = {
  open: boolean;
  score: number;
};

export function SuccessModal({ open, score }: SuccessModalProps) {
  return (
    <Dialog open={open} fullWidth maxWidth="xs">
      <DialogTitle>Уровень пройден!</DialogTitle>
      <DialogContent>
        <Typography>
          Все вопросы сопоставлены. Набрано очков: <strong>{score}</strong>.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button component={RouterLink} to="/match" variant="contained" color="primary">
          К темам
        </Button>
      </DialogActions>
    </Dialog>
  );
}
