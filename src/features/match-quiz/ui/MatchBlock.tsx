import { Box, Paper, Stack, Typography } from "@mui/material";
import { useDroppable } from "@dnd-kit/react";
import type { MatchBlockDef, MatchOption } from "../model/types";

type MatchBlockProps = {
  block: MatchBlockDef;
  placedOptions: MatchOption[];
  isRejecting?: boolean;
};

export function MatchBlock({ block, placedOptions, isRejecting }: MatchBlockProps) {
  const { ref, isDropTarget } = useDroppable({
    id: block.id,
    data: { blockId: block.id },
  });

  const filled = placedOptions.length;
  const minContentHeight = Math.max(block.capacity, 1) * 56;

  return (
    <Paper
      ref={ref}
      className={[
        "match-block",
        filled > 0 ? "is-active" : "",
        isRejecting ? "reject-shake" : "",
        isDropTarget ? "is-drop-target" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 300,
        width: "100%",
        bgcolor: "var(--mq-block-body)",
        border: "1px solid var(--mq-block-card-border)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <Stack
        direction="row"
        className="match-block__header"
        sx={{
          alignItems: "center",
          px: 1.5,
          py: 1,
        }}
      >
        <Typography
          variant="caption"
          className="match-block__header-muted"
          sx={{ minWidth: 48, color: "var(--mq-block-header-muted)" }}
        >
          {filled} / {block.capacity}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            flex: 1,
            textAlign: "center",
            fontWeight: 600,
            color: "inherit",
          }}
        >
          {block.keyword}
        </Typography>
        <Box sx={{ minWidth: 48 }} />
      </Stack>

      <Stack
        spacing={1}
        sx={{
          p: 1.25,
          minHeight: minContentHeight,
          justifyContent: filled ? "flex-start" : "center",
          bgcolor: "var(--mq-block-body)",
        }}
      >
        {placedOptions.map((option) => (
          <Paper
            key={option.id}
            elevation={0}
            sx={{
              p: 1,
              bgcolor: "var(--mq-block-card)",
              border: "1px solid var(--mq-block-card-border)",
            }}
          >
            <Typography
              variant="body2"
              sx={{ textAlign: "center", color: "var(--mq-block-card-text)" }}
            >
              {option.label}
            </Typography>
          </Paper>
        ))}
        {!filled && (
          <Typography
            variant="body2"
            sx={{ textAlign: "center", color: "var(--mq-block-hint)" }}
          >
            Перетащите сюда подходящие варианты
          </Typography>
        )}
      </Stack>
    </Paper>
  );
}
