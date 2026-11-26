import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useMemo, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { b as createFillwordPuzzle, F as FillwordGrid } from "./FillwordGrid-C3K5UCl8.js";
import { S as Stack, e as Typography, B as Button } from "./server-build-CgFVFTsc.js";
import "node:stream";
import "@react-router/node";
import "isbot";
import "react-dom/server";
import "prop-types";
import "clsx";
import "@mui/utils/composeClasses";
import "@mui/system";
import "@mui/utils/capitalize";
import "@mui/utils/generateUtilityClasses";
import "@mui/utils/generateUtilityClass";
import "@mui/system/DefaultPropsProvider";
import "@mui/system/createStyled";
import "@mui/utils/formatMuiErrorMessage";
import "@mui/utils/deepmerge";
import "@mui/system/colorManipulator";
import "@mui/system/spacing";
import "@mui/system/cssVars";
import "@mui/system/styleFunctionSx";
import "@mui/system/createTheme";
import "@mui/utils/chainPropTypes";
import "@mui/utils/integerPropType";
import "@mui/utils/useForkRef";
import "@mui/utils/appendOwnerState";
import "@mui/utils/resolveComponentProps";
import "@mui/utils/mergeSlotProps";
import "@mui/utils/refType";
import "@mui/utils/elementTypeAcceptingRef";
import "@mui/utils/isFocusVisible";
import "@mui/utils/useEventCallback";
import "@mui/utils/useOnMount";
import "@mui/utils/useTimeout";
import "@mui/utils/useEnhancedEffect";
import "@mui/utils/useLazyRef";
import "@mui/utils/isMuiElement";
import "@mui/utils/useControlled";
import "@mui/utils/useId";
import "@mui/utils/createChainedFunction";
import "@mui/utils/getReactElementRef";
import "react-is";
import "@mui/utils/ownerDocument";
import "@mui/utils/HTMLElementType";
import "@mui/system/RtlProvider";
import "@mui/utils/useSlotProps";
import "@mui/utils/isHostComponent";
import "@mui/utils/debounce";
import "@mui/utils/ownerWindow";
import "@mui/utils/isEventHandler";
import "@mui/utils/elementAcceptingRef";
import "@mui/utils/useValueAsRef";
import "@mui/utils/extractEventHandlers";
import "@mui/utils/getScrollbarSize";
import "react-dom";
import "@mui/utils/setRef";
import "@mui/utils/exactProp";
import "@mui/utils/contains";
import "@mui/utils/getActiveElement";
import "@mui/utils/useRovingTabIndex";
import "@mui/utils/ClassNameGenerator";
import "@mui/utils/unsupportedProp";
import "react-highlight-words";
import "@mui/icons-material";
import "@mui/utils/resolveProps";
import "@mui/system/Grid";
import "@mui/utils/requirePropFactory";
import "@mui/icons-material/HomeOutlined";
import "@mui/utils/usePreviousProps";
import "@popperjs/core";
import "@mui/utils/getValidReactChildren";
import "@mui/icons-material/Menu";
import "canvas-confetti";
import "formik";
function PlayPuzzle({ topic, topicsHref = "/fillword" }) {
  const [seed, setSeed] = useState(0);
  const puzzle = useMemo(
    () => createFillwordPuzzle(topic.words, topic.config),
    [topic, seed]
  );
  const [placedWords, setPlacedWords] = useState(
    puzzle.placedWords
  );
  useEffect(() => {
    setPlacedWords(puzzle.placedWords);
  }, [puzzle]);
  const foundCount = placedWords.filter((w) => w.found).length;
  const total = placedWords.length;
  const done = total > 0 && foundCount === total;
  const allowTurns = Boolean(topic.config.allowTurns);
  const handleWordFound = useCallback((word) => {
    setPlacedWords(
      (prev) => prev.map((pw) => pw.word === word ? { ...pw, found: true } : pw)
    );
  }, []);
  return /* @__PURE__ */ jsxs(Stack, { spacing: 2, children: [
    /* @__PURE__ */ jsxs(
      Stack,
      {
        direction: { xs: "column", sm: "row" },
        spacing: 1,
        sx: { alignItems: { sm: "center" }, justifyContent: "space-between" },
        children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Typography, { variant: "h5", sx: { fontWeight: 700 }, children: topic.title }),
            /* @__PURE__ */ jsxs(Typography, { className: "fillword-muted", children: [
              "Найдено: ",
              foundCount,
              " / ",
              total,
              done ? " — все слова найдены!" : "",
              allowTurns ? " · проводите слово по соседним клеткам" : ""
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 1, children: [
            /* @__PURE__ */ jsx(Button, { component: Link, to: topicsHref, variant: "outlined", children: "К темам" }),
            /* @__PURE__ */ jsx(Button, { variant: "contained", onClick: () => setSeed((s) => s + 1), children: "Новая сетка" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "fillword-play-layout", children: [
      /* @__PURE__ */ jsx("div", { className: "fillword-grid-wrap", children: /* @__PURE__ */ jsx(
        FillwordGrid,
        {
          remountKey: `${topic.id}-${seed}`,
          grid: puzzle.grid,
          placedWords,
          allowTurns,
          allowDiagonal: topic.config.allowDiagonal,
          onWordFound: handleWordFound
        }
      ) }),
      /* @__PURE__ */ jsxs("aside", { className: "fillword-words", children: [
        /* @__PURE__ */ jsx("h3", { children: "Слова" }),
        /* @__PURE__ */ jsx("ul", { children: placedWords.map((pw) => /* @__PURE__ */ jsx("li", { className: pw.found ? "is-found" : "", children: pw.word }, pw.word)) }),
        placedWords.length < topic.words.length && /* @__PURE__ */ jsx(
          Typography,
          {
            variant: "caption",
            className: "fillword-muted",
            sx: { mt: 1, display: "block" },
            children: "Часть слов не поместилась в сетку — увеличьте размер в теме."
          }
        )
      ] })
    ] })
  ] });
}
export {
  PlayPuzzle
};
