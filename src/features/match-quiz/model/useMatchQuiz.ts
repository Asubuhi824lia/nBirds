import { useCallback, useMemo, useState } from "react";
import type { MatchLevel, MatchOption, PlacedByBlock } from "./types";
import { isOptionMatchForBlock, sortOptionsAlphabetically } from "./validation";

function emptyPlaced(level: MatchLevel, questionIndex: number): PlacedByBlock {
  const blocks = level.questions[questionIndex]?.blocks ?? [];
  return Object.fromEntries(blocks.map((b) => [b.id, [] as string[]]));
}

export function useMatchQuiz(level: MatchLevel) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [placedByBlock, setPlacedByBlock] = useState<PlacedByBlock>(() =>
    emptyPlaced(level, 0),
  );
  const [score, setScore] = useState(0);
  const [rejectFlashId, setRejectFlashId] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const question = level.questions[questionIndex];
  const totalQuestions = level.questions.length;

  const placedIds = useMemo(
    () => new Set(Object.values(placedByBlock).flat()),
    [placedByBlock],
  );

  const poolOptions = useMemo(() => {
    if (!question) return [];
    return question.options.filter((o) => !placedIds.has(o.id));
  }, [question, placedIds]);

  const optionsById = useMemo(() => {
    const map = new Map<string, MatchOption>();
    question?.options.forEach((o) => map.set(o.id, o));
    return map;
  }, [question]);

  const isQuestionDone = useMemo(() => {
    if (!question) return false;
    return question.blocks.every(
      (block) => (placedByBlock[block.id]?.length ?? 0) >= block.capacity,
    );
  }, [question, placedByBlock]);

  const tryPlace = useCallback(
    (optionId: string, blockId: string): boolean => {
      const option = optionsById.get(optionId);
      if (!option || !question) return false;

      const block = question.blocks.find((b) => b.id === blockId);
      if (!block) return false;

      const current = placedByBlock[blockId] ?? [];
      if (current.length >= block.capacity) return false;
      if (placedIds.has(optionId)) return false;

      if (!isOptionMatchForBlock(option, blockId)) {
        setRejectFlashId(blockId);
        window.setTimeout(() => setRejectFlashId(null), 520);
        return false;
      }

      const nextIds = sortOptionsAlphabetically(
        [...current, optionId]
          .map((id) => optionsById.get(id))
          .filter((o): o is MatchOption => Boolean(o)),
      ).map((o) => o.id);

      setPlacedByBlock((prev) => ({ ...prev, [blockId]: nextIds }));
      setScore((s) => s + 1);
      return true;
    },
    [optionsById, question, placedByBlock, placedIds],
  );

  const goNextQuestion = useCallback(() => {
    if (questionIndex + 1 >= totalQuestions) {
      setIsComplete(true);
      return;
    }
    const next = questionIndex + 1;
    setQuestionIndex(next);
    setPlacedByBlock(emptyPlaced(level, next));
  }, [questionIndex, totalQuestions, level]);

  const restart = useCallback(() => {
    setQuestionIndex(0);
    setPlacedByBlock(emptyPlaced(level, 0));
    setScore(0);
    setRejectFlashId(null);
    setIsComplete(false);
  }, [level]);

  return {
    level,
    question,
    questionIndex,
    totalQuestions,
    progressDone: isComplete ? totalQuestions : questionIndex,
    score,
    poolOptions,
    placedByBlock,
    optionsById,
    isQuestionDone,
    isComplete,
    rejectFlashId,
    tryPlace,
    goNextQuestion,
    restart,
  };
}
