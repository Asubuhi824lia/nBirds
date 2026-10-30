import { Box, Button } from "@mui/material";
import { DragDropProvider } from "@dnd-kit/react";
import type { MatchBlockDef, MatchOption, PlacedByBlock } from "../model/types";
import { OptionsColumn } from "./OptionsColumn";
import { MatchBlock } from "./MatchBlock";

type MatchQuizBoardProps = {
  poolOptions: MatchOption[];
  blocks: MatchBlockDef[];
  placedByBlock: PlacedByBlock;
  optionsById: Map<string, MatchOption>;
  rejectFlashId: string | null;
  isQuestionDone: boolean;
  isComplete: boolean;
  onGoNext: () => void;
  onTryPlace: (optionId: string, blockId: string) => boolean;
};

export function MatchQuizBoard({
  poolOptions,
  blocks,
  placedByBlock,
  optionsById,
  rejectFlashId,
  isQuestionDone,
  isComplete,
  onGoNext,
  onTryPlace,
}: MatchQuizBoardProps) {
  const handleDragEnd = (event: {
    canceled: boolean;
    operation: {
      source?: {
        id?: string | number;
        data?: { optionId?: string; blockId?: string };
      } | null;
      target?: { id?: string | number } | null;
    };
  }) => {
    if (event.canceled) return;
    const optionId = String(
      event.operation.source?.data?.optionId ?? event.operation.source?.id ?? "",
    );
    const blockId = String(event.operation.target?.id ?? "");
    if (!optionId || !blockId) return;
    onTryPlace(optionId, blockId);
  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div className="match-quiz-layout">
        <div className="match-quiz-blocks">
          {blocks.map((block) => {
            const placedIds = placedByBlock[block.id] ?? [];
            const placedOptions = placedIds
              .map((id) => optionsById.get(id))
              .filter((o): o is MatchOption => Boolean(o));

            return (
              <MatchBlock
                key={block.id}
                block={block}
                placedOptions={placedOptions}
                isRejecting={rejectFlashId === block.id}
              />
            );
          })}

          {isQuestionDone && !isComplete && (
            <Box className="match-quiz-next">
              <Button variant="contained" onClick={onGoNext}>
                Следующий вопрос
              </Button>
            </Box>
          )}
        </div>

        <OptionsColumn options={poolOptions} />
      </div>
    </DragDropProvider>
  );
}
