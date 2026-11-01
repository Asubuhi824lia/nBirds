import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Button, type ButtonProps } from "@mui/material";
import { Link as RouterLink } from "react-router";

type BackHomeLinkProps = {
  /** Lighter label for dark/colored headers */
  tone?: "default" | "inverse";
  sx?: ButtonProps["sx"];
};

export function BackHomeLink({ tone = "default", sx }: BackHomeLinkProps) {
  return (
    <Button
      component={RouterLink}
      to="/"
      size="small"
      startIcon={<HomeOutlinedIcon sx={{ fontSize: 18 }} />}
      aria-label="На главную"
      sx={{
        alignSelf: "flex-start",
        textTransform: "none",
        fontWeight: 500,
        px: 0.75,
        minWidth: 0,
        color: tone === "inverse" ? "inherit" : "text.secondary",
        opacity: tone === "inverse" ? 0.9 : 1,
        "&:hover": {
          backgroundColor:
            tone === "inverse" ? "rgba(255,255,255,0.12)" : "action.hover",
        },
        ...sx,
      }}
    >
      На главную
    </Button>
  );
}
