import { Paper, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface FieldBlockWrapperProps {
  title?: string;
  children: ReactNode;
}

export const FieldBlockWrapper = ({ title, children }: FieldBlockWrapperProps) => (
  <Paper
    elevation={3}
    square={false}
    variant="elevation"
    sx={{ py: 2, px: 3, backgroundColor: "#fff0d9" }}
  >
    <Stack
      component="fieldset"
      spacing={1}
    >
      <Typography variant="h6" component="legend">{title}</Typography>
      {children}
    </Stack>
  </Paper>
)