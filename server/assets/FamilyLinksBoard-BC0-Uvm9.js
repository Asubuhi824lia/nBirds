import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { u as useDraggable, a as useDroppable, D as DragDropProvider } from "./index-Bmi-ijfZ.js";
import { g as groupEntriesByLetter, T as ToggleButtonGroup, a as ToggleButton } from "./server-build-CgFVFTsc.js";
import Highlighter from "react-highlight-words";
import "react";
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
function withAlpha(hex, alpha) {
  const raw = hex.replace("#", "");
  if (raw.length !== 6) return hex;
  const r = parseInt(raw.slice(0, 2), 16);
  const g = parseInt(raw.slice(2, 4), 16);
  const b = parseInt(raw.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
function HighlightedLabel({
  text,
  highlights,
  colorAlpha = 1
}) {
  if (!highlights.length) {
    return /* @__PURE__ */ jsx(Fragment, { children: text });
  }
  const searchWords = highlights.map((h) => h.substring);
  const colorByWord = new Map(
    highlights.map((h) => [h.substring.toLocaleLowerCase("ru-RU"), h.color])
  );
  return /* @__PURE__ */ jsx(
    Highlighter,
    {
      searchWords,
      textToHighlight: text,
      autoEscape: true,
      caseSensitive: false,
      highlightTag: ({ children }) => {
        const chunk = String(children).toLocaleLowerCase("ru-RU");
        const color = colorByWord.get(chunk) ?? "#9b5de5";
        return /* @__PURE__ */ jsx(
          "mark",
          {
            style: {
              backgroundColor: withAlpha(color, 0.35 * colorAlpha),
              color: "inherit",
              padding: "0 2px",
              borderRadius: 2,
              boxShadow: `inset 0 -2px 0 ${withAlpha(color, colorAlpha)}`
            },
            children
          }
        );
      }
    }
  );
}
function FamilyNameItem({ entry, highlights }) {
  const { ref: dragRef, isDragging } = useDraggable({
    id: `family:${entry.id}`,
    data: { type: "family", familyId: entry.id }
  });
  const { ref: dropRef, isDropTarget } = useDroppable({
    id: `family-drop:${entry.id}`,
    data: { type: "family", familyId: entry.id }
  });
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: (node) => {
        dragRef(node);
        dropRef(node);
      },
      className: [
        "family-links-name",
        isDragging ? "is-dragging" : "",
        isDropTarget ? "is-drop-target" : ""
      ].filter(Boolean).join(" "),
      children: /* @__PURE__ */ jsx(HighlightedLabel, { text: entry.label, highlights })
    }
  );
}
function AlphabetList({
  entries,
  listColumns,
  highlightsForFamily
}) {
  const groups = groupEntriesByLetter(entries);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: [
        "family-links-main",
        listColumns === 2 ? "is-two-cols" : ""
      ].filter(Boolean).join(" "),
      children: groups.map(({ letter, entries: group }) => /* @__PURE__ */ jsxs("section", { className: "family-links-letter-block", children: [
        /* @__PURE__ */ jsx("h2", { className: "family-links-letter", children: letter }),
        /* @__PURE__ */ jsx("div", { className: "family-links-letter-items", children: group.map((entry) => /* @__PURE__ */ jsx(
          FamilyNameItem,
          {
            entry,
            highlights: highlightsForFamily(entry.id)
          },
          entry.id
        )) })
      ] }, letter))
    }
  );
}
function SubstringBlockCard({
  block,
  families,
  faded = false,
  onColorChange
}) {
  const { ref, isDragging } = useDraggable({
    id: block.id,
    data: { type: "block", blockId: block.id }
  });
  const alpha = faded ? 0.45 : 1;
  const borderColor = faded ? hexToRgba(block.color, 0.45) : block.color;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: `family-links-block${isDragging ? " is-dragging" : ""}`,
      style: { borderColor, opacity: faded ? 0.72 : 1 },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "family-links-block__header", children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "family-links-block__sub",
              style: { color: faded ? hexToRgba(block.color, 0.7) : block.color },
              children: block.substring
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "color",
              className: "family-links-block__color",
              value: block.color,
              "aria-label": "Цвет подстроки",
              onPointerDown: (e) => e.stopPropagation(),
              onClick: (e) => e.stopPropagation(),
              onChange: (e) => onColorChange(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "family-links-block__body", children: families.map((family) => /* @__PURE__ */ jsx("div", { className: "family-links-block__item", children: /* @__PURE__ */ jsx(
          HighlightedLabel,
          {
            text: family.label,
            highlights: [{ substring: block.substring, color: block.color }],
            colorAlpha: alpha
          }
        ) }, family.id)) })
      ]
    }
  );
}
function hexToRgba(hex, alpha) {
  const raw = hex.replace("#", "");
  if (raw.length !== 6) return hex;
  const r = parseInt(raw.slice(0, 2), 16);
  const g = parseInt(raw.slice(2, 4), 16);
  const b = parseInt(raw.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
function SideColumn({
  side,
  title,
  blocks,
  entriesById,
  heightCapped,
  onHeightCappedChange,
  onColorChange
}) {
  const { ref, isDropTarget } = useDroppable({
    id: `column:${side}`,
    data: { type: "column", column: side }
  });
  return /* @__PURE__ */ jsxs(
    "aside",
    {
      ref,
      className: [
        "family-links-side",
        heightCapped ? "is-sticky" : "is-flow",
        isDropTarget ? "is-drop-target" : ""
      ].filter(Boolean).join(" "),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "family-links-side__header", children: [
          /* @__PURE__ */ jsx("span", { className: "family-links-side__title", children: title }),
          /* @__PURE__ */ jsxs(
            ToggleButtonGroup,
            {
              size: "small",
              exclusive: true,
              value: heightCapped ? "capped" : "free",
              onChange: (_, value) => {
                if (value === "capped") onHeightCappedChange(true);
                if (value === "free") onHeightCappedChange(false);
              },
              "aria-label": "Ограничение высоты колонок",
              children: [
                /* @__PURE__ */ jsx(ToggleButton, { value: "capped", "aria-label": "Ограничить высоту", children: "↕" }),
                /* @__PURE__ */ jsx(ToggleButton, { value: "free", "aria-label": "Без ограничения высоты", children: "∞" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "family-links-side__body", children: blocks.map((block) => {
          const families = block.familyIds.map((id) => entriesById.get(id)).filter((e) => Boolean(e));
          return /* @__PURE__ */ jsx(
            SubstringBlockCard,
            {
              block,
              families,
              faded: side === "right",
              onColorChange: (color) => onColorChange(block.id, color)
            },
            block.id
          );
        }) })
      ]
    }
  );
}
function FamilyLinksBoard({
  entries,
  entriesById,
  blocksLeft,
  blocksRight,
  heightCapped,
  onHeightCappedChange,
  listColumns,
  onMatchFamilies,
  onMoveBlock,
  onColorChange,
  highlightsForFamily
}) {
  const handleDragEnd = (event) => {
    if (event.canceled) return;
    const source = event.operation.source;
    const target = event.operation.target;
    if (!source?.data || !target?.data) return;
    if (source.data.type === "family" && target.data.type === "family") {
      const sourceId = source.data.familyId;
      const targetId = target.data.familyId;
      if (sourceId && targetId) onMatchFamilies(sourceId, targetId);
      return;
    }
    if (source.data.type === "block" && target.data.type === "column") {
      const blockId = source.data.blockId ?? String(source.id ?? "");
      const column = target.data.column;
      if (blockId && column) onMoveBlock(blockId, column);
    }
  };
  return /* @__PURE__ */ jsx(DragDropProvider, { onDragEnd: handleDragEnd, children: /* @__PURE__ */ jsxs("div", { className: "family-links-layout", children: [
    /* @__PURE__ */ jsx(
      SideColumn,
      {
        side: "left",
        title: "Колонка слева",
        blocks: blocksLeft,
        entriesById,
        heightCapped,
        onHeightCappedChange,
        onColorChange
      }
    ),
    /* @__PURE__ */ jsx(
      AlphabetList,
      {
        entries,
        listColumns,
        highlightsForFamily
      }
    ),
    /* @__PURE__ */ jsx(
      SideColumn,
      {
        side: "right",
        title: "Колонка справа",
        blocks: blocksRight,
        entriesById,
        heightCapped,
        onHeightCappedChange,
        onColorChange
      }
    )
  ] }) });
}
export {
  FamilyLinksBoard
};
