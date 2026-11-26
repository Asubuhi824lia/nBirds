import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { u as useDraggable, b as useDragOperation, a as useDroppable, D as DragDropProvider } from "./index-Bmi-ijfZ.js";
import { useState, useRef, useMemo, useLayoutEffect, useEffect } from "react";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import { P as Paper, S as Stack, e as Typography, h as Tooltip, I as IconButton, i as Box, B as Button } from "./server-build-CgFVFTsc.js";
import "@preact/signals-core";
import "@dnd-kit/geometry";
import "@dnd-kit/collision";
import "react-dom";
import "node:stream";
import "@react-router/node";
import "react-router";
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
function OptionCard({ option, disabled, instanceId }) {
  const { ref, isDragging } = useDraggable({
    id: instanceId ?? option.id,
    data: { optionId: option.id, blockId: option.blockId },
    disabled
  });
  return /* @__PURE__ */ jsx(
    Paper,
    {
      ref,
      elevation: isDragging ? 6 : 1,
      className: `match-option-card${isDragging ? " is-dragging" : ""}`,
      sx: {
        p: 1.25,
        bgcolor: "var(--mq-options-card)",
        border: "1px solid var(--mq-options-card-border)",
        boxShadow: isDragging ? void 0 : "none",
        opacity: isDragging ? 0.45 : 1
      },
      children: /* @__PURE__ */ jsxs(
        Stack,
        {
          direction: option.imageUrl ? "column" : "row",
          spacing: 1,
          sx: { alignItems: "center", justifyContent: "center" },
          children: [
            option.imageUrl ? /* @__PURE__ */ jsx(
              "img",
              {
                className: "match-option-thumb",
                src: option.imageUrl,
                alt: "",
                "data-image-sort-key": option.imageSortKey ?? ""
              }
            ) : null,
            /* @__PURE__ */ jsx(
              Typography,
              {
                variant: "body2",
                sx: { fontWeight: 500, textAlign: "center", width: "100%" },
                children: option.label
              }
            )
          ]
        }
      )
    }
  );
}
const MARQUEE_MAX_HEIGHT = 460;
const SCROLL_SPEED = 0.55;
function OptionsList({
  options,
  instanceSuffix = ""
}) {
  return /* @__PURE__ */ jsx(Fragment, { children: options.map((option) => /* @__PURE__ */ jsx(
    OptionCard,
    {
      option,
      instanceId: instanceSuffix ? `${option.id}${instanceSuffix}` : option.id
    },
    `${option.id}${instanceSuffix}`
  )) });
}
function OptionsColumn({ options }) {
  const [marqueeMode, setMarqueeMode] = useState(false);
  const [partyHeight, setPartyHeight] = useState(null);
  const viewportRef = useRef(null);
  const groupRef = useRef(null);
  const { source } = useDragOperation();
  const isDragging = Boolean(source);
  const optionKey = useMemo(
    () => options.map((o) => o.id).join("|"),
    [options]
  );
  useLayoutEffect(() => {
    if (!marqueeMode || !options.length) {
      setPartyHeight(null);
      return;
    }
    const viewport = viewportRef.current;
    const group = groupRef.current;
    if (!viewport || !group) return;
    const measure = () => {
      const gh = group.offsetHeight;
      if (gh <= 0) return;
      const next = Math.min(gh, MARQUEE_MAX_HEIGHT);
      setPartyHeight(next);
      if (viewport.scrollTop >= gh) {
        viewport.scrollTop %= gh;
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(group);
    return () => ro.disconnect();
  }, [marqueeMode, optionKey, options.length]);
  useEffect(() => {
    if (!marqueeMode || !options.length || isDragging || partyHeight == null) {
      return;
    }
    const viewport = viewportRef.current;
    const group = groupRef.current;
    if (!viewport || !group) return;
    let raf = 0;
    const tick = () => {
      const loopAt = group.offsetHeight;
      if (loopAt > 0) {
        viewport.scrollTop += SCROLL_SPEED;
        if (viewport.scrollTop >= loopAt) {
          viewport.scrollTop -= loopAt;
        }
      }
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [marqueeMode, optionKey, options.length, isDragging, partyHeight]);
  return /* @__PURE__ */ jsxs("div", { className: "match-options-panel match-quiz-options", children: [
    /* @__PURE__ */ jsxs("div", { className: "match-options-panel__header", children: [
      /* @__PURE__ */ jsx(Typography, { variant: "subtitle2", sx: { color: "inherit", fontWeight: 600 }, children: "Варианты" }),
      /* @__PURE__ */ jsx(Tooltip, { title: marqueeMode ? "Обычный список" : "Бегущая строка", children: /* @__PURE__ */ jsx(
        IconButton,
        {
          size: "small",
          "aria-label": "Переключить бегущую строку",
          onClick: () => setMarqueeMode((v) => !v),
          children: marqueeMode ? /* @__PURE__ */ jsx(ViewAgendaIcon, { fontSize: "small" }) : /* @__PURE__ */ jsx(ViewStreamIcon, { fontSize: "small" })
        }
      ) })
    ] }),
    marqueeMode && options.length > 0 ? /* @__PURE__ */ jsx(
      "div",
      {
        className: "match-options-marquee",
        ref: viewportRef,
        style: partyHeight != null ? { height: partyHeight } : void 0,
        "aria-label": "Бегущая строка вариантов",
        children: /* @__PURE__ */ jsxs("div", { className: "match-options-marquee__inner", children: [
          /* @__PURE__ */ jsx("div", { className: "match-options-marquee__group", ref: groupRef, children: /* @__PURE__ */ jsx(OptionsList, { options }) }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "match-options-marquee__group match-options-marquee__group--ghost",
              "aria-hidden": true,
              children: /* @__PURE__ */ jsx(OptionsList, { options, instanceSuffix: "::loop" })
            }
          )
        ] })
      }
    ) : /* @__PURE__ */ jsxs("div", { className: "match-options-scroll", children: [
      /* @__PURE__ */ jsx(OptionsList, { options }),
      !options.length && /* @__PURE__ */ jsx(
        Typography,
        {
          variant: "body2",
          color: "text.secondary",
          sx: { p: 1, textAlign: "center" },
          children: "Все варианты размещены"
        }
      )
    ] })
  ] });
}
function MatchBlock({ block, placedOptions, isRejecting }) {
  const { ref, isDropTarget } = useDroppable({
    id: block.id,
    data: { blockId: block.id }
  });
  const filled = placedOptions.length;
  const minContentHeight = Math.max(block.capacity, 1) * 56;
  return /* @__PURE__ */ jsxs(
    Paper,
    {
      ref,
      className: [
        "match-block",
        filled > 0 ? "is-active" : "",
        isRejecting ? "reject-shake" : "",
        isDropTarget ? "is-drop-target" : ""
      ].filter(Boolean).join(" "),
      elevation: 0,
      sx: {
        display: "flex",
        flexDirection: "column",
        maxWidth: 300,
        width: "100%",
        bgcolor: "var(--mq-block-body)",
        border: "1px solid var(--mq-block-card-border)",
        borderRadius: "12px",
        overflow: "hidden"
      },
      children: [
        /* @__PURE__ */ jsxs(
          Stack,
          {
            direction: "row",
            className: "match-block__header",
            sx: {
              alignItems: "center",
              px: 1.5,
              py: 1
            },
            children: [
              /* @__PURE__ */ jsxs(
                Typography,
                {
                  variant: "caption",
                  className: "match-block__header-muted",
                  sx: { minWidth: 48, color: "var(--mq-block-header-muted)" },
                  children: [
                    filled,
                    " / ",
                    block.capacity
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                Typography,
                {
                  variant: "subtitle1",
                  sx: {
                    flex: 1,
                    textAlign: "center",
                    fontWeight: 600,
                    color: "inherit"
                  },
                  children: block.keyword
                }
              ),
              /* @__PURE__ */ jsx(Box, { sx: { minWidth: 48 } })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Stack,
          {
            spacing: 1,
            sx: {
              p: 1.25,
              minHeight: minContentHeight,
              justifyContent: filled ? "flex-start" : "center",
              bgcolor: "var(--mq-block-body)"
            },
            children: [
              placedOptions.map((option) => /* @__PURE__ */ jsx(
                Paper,
                {
                  elevation: 0,
                  sx: {
                    p: 1,
                    bgcolor: "var(--mq-block-card)",
                    border: "1px solid var(--mq-block-card-border)"
                  },
                  children: /* @__PURE__ */ jsx(
                    Typography,
                    {
                      variant: "body2",
                      sx: { textAlign: "center", color: "var(--mq-block-card-text)" },
                      children: option.label
                    }
                  )
                },
                option.id
              )),
              !filled && /* @__PURE__ */ jsx(
                Typography,
                {
                  variant: "body2",
                  sx: { textAlign: "center", color: "var(--mq-block-hint)" },
                  children: "Перетащите сюда подходящие варианты"
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function MatchQuizBoard({
  poolOptions,
  blocks,
  placedByBlock,
  optionsById,
  rejectFlashId,
  isQuestionDone,
  isComplete,
  onGoNext,
  onTryPlace
}) {
  const handleDragEnd = (event) => {
    if (event.canceled) return;
    const optionId = String(
      event.operation.source?.data?.optionId ?? event.operation.source?.id ?? ""
    );
    const blockId = String(event.operation.target?.id ?? "");
    if (!optionId || !blockId) return;
    onTryPlace(optionId, blockId);
  };
  return /* @__PURE__ */ jsx(DragDropProvider, { onDragEnd: handleDragEnd, children: /* @__PURE__ */ jsxs("div", { className: "match-quiz-layout", children: [
    /* @__PURE__ */ jsxs("div", { className: "match-quiz-blocks", children: [
      blocks.map((block) => {
        const placedIds = placedByBlock[block.id] ?? [];
        const placedOptions = placedIds.map((id) => optionsById.get(id)).filter((o) => Boolean(o));
        return /* @__PURE__ */ jsx(
          MatchBlock,
          {
            block,
            placedOptions,
            isRejecting: rejectFlashId === block.id
          },
          block.id
        );
      }),
      isQuestionDone && !isComplete && /* @__PURE__ */ jsx(Box, { className: "match-quiz-next", children: /* @__PURE__ */ jsx(Button, { variant: "contained", onClick: onGoNext, children: "Следующий вопрос" }) })
    ] }),
    /* @__PURE__ */ jsx(OptionsColumn, { options: poolOptions })
  ] }) });
}
export {
  MatchQuizBoard
};
