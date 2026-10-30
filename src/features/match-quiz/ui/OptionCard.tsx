import { Paper, Stack, Typography } from "@mui/material";
import { useDraggable } from "@dnd-kit/react";
import type { MatchOption } from "../model/types";

type OptionCardProps = {
  option: MatchOption;
  disabled?: boolean;
  instanceId?: string;
};

export function OptionCard({ option, disabled, instanceId }: OptionCardProps) {
  const { ref, isDragging } = useDraggable({
    id: instanceId ?? option.id,
    data: { optionId: option.id, blockId: option.blockId },
    disabled,
  });

  return (
    <Paper
      ref={ref}
      elevation={isDragging ? 6 : 1}
      className={`match-option-card${isDragging ? " is-dragging" : ""}`}
      sx={{
        p: 1.25,
        bgcolor: "var(--mq-options-card)",
        border: "1px solid var(--mq-options-card-border)",
        boxShadow: isDragging ? undefined : "none",
        opacity: isDragging ? 0.45 : 1,
      }}
    >
      <Stack
        direction={option.imageUrl ? "column" : "row"}
        spacing={1}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        {option.imageUrl ? (
          <img
            className="match-option-thumb"
            src={option.imageUrl}
            alt=""
            data-image-sort-key={option.imageSortKey ?? ""}
          />
        ) : null}
        <Typography
          variant="body2"
          sx={{ fontWeight: 500, textAlign: "center", width: "100%" }}
        >
          {option.label}
        </Typography>
      </Stack>
    </Paper>
  );
}
