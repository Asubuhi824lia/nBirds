import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState, useMemo } from "react";
import { p as parseWordsInput, l as longestWordLength, m as minGridSideForWords, r as resolveGridConfig, s as slugifyTopicId, M as MAX_GRID_SIDE, a as MIN_GRID_SIDE, c as clampGridSide, F as FillwordGrid, b as createFillwordPuzzle } from "./FillwordGrid-C3K5UCl8.js";
import { c as createSvgIcon, u as useDefaultProps, b as useSlot, I as IconButton, s as styled, P as Paper, m as memoTheme, d as createSimplePaletteValueFilter, D as DEFAULT_GRID_CONFIG, t as topicToJson, e as Typography, f as TextField, S as Stack, F as FormControlLabel, C as Checkbox, B as Button } from "./server-build-CgFVFTsc.js";
import PropTypes from "prop-types";
import clsx from "clsx";
import composeClasses from "@mui/utils/composeClasses";
import capitalize from "@mui/utils/capitalize";
import generateUtilityClasses from "@mui/utils/generateUtilityClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import "node:stream";
import "@react-router/node";
import "react-router";
import "isbot";
import "react-dom/server";
import "@mui/system";
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
function getAlertUtilityClass(slot) {
  return generateUtilityClass("MuiAlert", slot);
}
const alertClasses = generateUtilityClasses("MuiAlert", ["root", "action", "icon", "message", "filled", "colorSuccess", "colorInfo", "colorWarning", "colorError", "outlined", "standard"]);
const SuccessOutlinedIcon = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"
}), "SuccessOutlined");
const ReportProblemOutlinedIcon = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"
}), "ReportProblemOutlined");
const ErrorOutlineIcon = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
}), "ErrorOutline");
const InfoOutlinedIcon = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"
}), "InfoOutlined");
const ClearIcon = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
}), "Close");
const useUtilityClasses = (ownerState) => {
  const {
    variant,
    color,
    severity,
    classes
  } = ownerState;
  const slots = {
    root: ["root", `color${capitalize(color || severity)}`, `${variant}`],
    icon: ["icon"],
    message: ["message"],
    action: ["action"]
  };
  return composeClasses(slots, getAlertUtilityClass, classes);
};
const AlertRoot = styled(Paper, {
  name: "MuiAlert",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant]];
  }
})(memoTheme(({
  theme
}) => {
  const getColor = theme.palette.mode === "light" ? theme.darken : theme.lighten;
  const getBackgroundColor = theme.palette.mode === "light" ? theme.lighten : theme.darken;
  return {
    ...theme.typography.body2,
    backgroundColor: "transparent",
    display: "flex",
    padding: "6px 16px",
    variants: [...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["light"])).map(([color]) => ({
      props: {
        colorSeverity: color,
        variant: "standard"
      },
      style: {
        color: theme.vars ? theme.vars.palette.Alert[`${color}Color`] : getColor(theme.palette[color].light, 0.6),
        backgroundColor: theme.vars ? theme.vars.palette.Alert[`${color}StandardBg`] : getBackgroundColor(theme.palette[color].light, 0.9),
        [`& .${alertClasses.icon}`]: theme.vars ? {
          color: theme.vars.palette.Alert[`${color}IconColor`]
        } : {
          color: theme.palette[color].main
        }
      }
    })), ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["light"])).map(([color]) => ({
      props: {
        colorSeverity: color,
        variant: "outlined"
      },
      style: {
        color: theme.vars ? theme.vars.palette.Alert[`${color}Color`] : getColor(theme.palette[color].light, 0.6),
        border: `1px solid ${(theme.vars || theme).palette[color].light}`,
        [`& .${alertClasses.icon}`]: theme.vars ? {
          color: theme.vars.palette.Alert[`${color}IconColor`]
        } : {
          color: theme.palette[color].main
        }
      }
    })), ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["dark"])).map(([color]) => ({
      props: {
        colorSeverity: color,
        variant: "filled"
      },
      style: {
        fontWeight: theme.typography.fontWeightMedium,
        ...theme.vars ? {
          color: theme.vars.palette.Alert[`${color}FilledColor`],
          backgroundColor: theme.vars.palette.Alert[`${color}FilledBg`]
        } : {
          backgroundColor: theme.palette.mode === "dark" ? theme.palette[color].dark : theme.palette[color].main,
          color: theme.palette.getContrastText(theme.palette[color].main)
        }
      }
    }))]
  };
}));
const AlertIcon = styled("div", {
  name: "MuiAlert",
  slot: "Icon"
})({
  marginRight: 12,
  padding: "7px 0",
  display: "flex",
  fontSize: 22,
  opacity: 0.9
});
const AlertMessage = styled("div", {
  name: "MuiAlert",
  slot: "Message"
})({
  padding: "8px 0",
  minWidth: 0,
  overflow: "auto"
});
const AlertAction = styled("div", {
  name: "MuiAlert",
  slot: "Action"
})({
  display: "flex",
  alignItems: "flex-start",
  padding: "4px 0 0 16px",
  marginLeft: "auto",
  marginRight: -8
});
const defaultIconMapping = {
  success: /* @__PURE__ */ jsx(SuccessOutlinedIcon, {
    fontSize: "inherit"
  }),
  warning: /* @__PURE__ */ jsx(ReportProblemOutlinedIcon, {
    fontSize: "inherit"
  }),
  error: /* @__PURE__ */ jsx(ErrorOutlineIcon, {
    fontSize: "inherit"
  }),
  info: /* @__PURE__ */ jsx(InfoOutlinedIcon, {
    fontSize: "inherit"
  })
};
const Alert = /* @__PURE__ */ React.forwardRef(function Alert2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiAlert"
  });
  const {
    action,
    children,
    className,
    closeText = "Close",
    color,
    icon,
    iconMapping = defaultIconMapping,
    onClose,
    role = "alert",
    severity = "success",
    slotProps = {},
    slots = {},
    variant = "standard",
    ...other
  } = props;
  const ownerState = {
    ...props,
    color,
    severity,
    variant,
    colorSeverity: color || severity
  };
  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = {
    slots,
    slotProps
  };
  const [RootSlot, rootSlotProps] = useSlot("root", {
    ref,
    shouldForwardComponentProp: true,
    className: clsx(classes.root, className),
    elementType: AlertRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other
    },
    ownerState,
    additionalProps: {
      role,
      elevation: 0
    }
  });
  const [IconSlot, iconSlotProps] = useSlot("icon", {
    className: classes.icon,
    elementType: AlertIcon,
    externalForwardedProps,
    ownerState
  });
  const [MessageSlot, messageSlotProps] = useSlot("message", {
    className: classes.message,
    elementType: AlertMessage,
    externalForwardedProps,
    ownerState
  });
  const [ActionSlot, actionSlotProps] = useSlot("action", {
    className: classes.action,
    elementType: AlertAction,
    externalForwardedProps,
    ownerState
  });
  const [CloseButtonSlot, closeButtonProps] = useSlot("closeButton", {
    elementType: IconButton,
    externalForwardedProps,
    ownerState
  });
  const [CloseIconSlot, closeIconProps] = useSlot("closeIcon", {
    elementType: ClearIcon,
    externalForwardedProps,
    ownerState
  });
  return /* @__PURE__ */ jsxs(RootSlot, {
    ...rootSlotProps,
    children: [icon !== false ? /* @__PURE__ */ jsx(IconSlot, {
      ...iconSlotProps,
      children: icon || iconMapping[severity] || defaultIconMapping[severity]
    }) : null, /* @__PURE__ */ jsx(MessageSlot, {
      ...messageSlotProps,
      children
    }), action != null ? /* @__PURE__ */ jsx(ActionSlot, {
      ...actionSlotProps,
      children: action
    }) : null, action == null && onClose ? /* @__PURE__ */ jsx(ActionSlot, {
      ...actionSlotProps,
      children: /* @__PURE__ */ jsx(CloseButtonSlot, {
        size: "small",
        "aria-label": closeText,
        title: closeText,
        color: "inherit",
        onClick: onClose,
        ...closeButtonProps,
        children: /* @__PURE__ */ jsx(CloseIconSlot, {
          fontSize: "small",
          ...closeIconProps
        })
      })
    }) : null]
  });
});
process.env.NODE_ENV !== "production" ? Alert.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The action to display. It renders after the message, at the end of the alert.
   */
  action: PropTypes.node,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Override the default label for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @default 'Close'
   */
  closeText: PropTypes.string,
  /**
   * The color of the component. Unless provided, the value is taken from the `severity` prop.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: PropTypes.oneOfType([PropTypes.oneOf(["error", "info", "success", "warning"]), PropTypes.string]),
  /**
   * Override the icon displayed before the children.
   * Unless provided, the icon is mapped to the value of the `severity` prop.
   * Set to `false` to remove the `icon`.
   */
  icon: PropTypes.node,
  /**
   * The component maps the `severity` prop to a range of different icons,
   * for instance success to `<SuccessOutlined>`.
   * If you wish to change this mapping, you can provide your own.
   * Alternatively, you can use the `icon` prop to override the icon displayed.
   */
  iconMapping: PropTypes.shape({
    error: PropTypes.node,
    info: PropTypes.node,
    success: PropTypes.node,
    warning: PropTypes.node
  }),
  /**
   * Callback fired when the component requests to be closed.
   * When provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked.
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: PropTypes.func,
  /**
   * The ARIA role attribute of the element.
   * @default 'alert'
   */
  role: PropTypes.string,
  /**
   * The severity of the alert. This defines the color and icon used.
   * @default 'success'
   */
  severity: PropTypes.oneOfType([PropTypes.oneOf(["error", "info", "success", "warning"]), PropTypes.string]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    action: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    closeButton: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    closeIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    message: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    action: PropTypes.elementType,
    closeButton: PropTypes.elementType,
    closeIcon: PropTypes.elementType,
    icon: PropTypes.elementType,
    message: PropTypes.elementType,
    root: PropTypes.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The variant to use.
   * @default 'standard'
   */
  variant: PropTypes.oneOfType([PropTypes.oneOf(["filled", "outlined", "standard"]), PropTypes.string])
} : void 0;
function CreatePuzzle({ onAddTopic }) {
  const [title, setTitle] = useState("Моя тема");
  const [description, setDescription] = useState("");
  const [wordsText, setWordsText] = useState(
    "СИНИЦА\nДРОЗД\nВОРОНА\nЛАСТОЧКА\nСКВОРЕЦ"
  );
  const [config, setConfig] = useState({
    ...DEFAULT_GRID_CONFIG
  });
  const [previewKey, setPreviewKey] = useState(0);
  const [previewGrid, setPreviewGrid] = useState(null);
  const [placedWords, setPlacedWords] = useState([]);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const words = useMemo(() => parseWordsInput(wordsText), [wordsText]);
  const longest = useMemo(() => longestWordLength(words), [words]);
  const minSide = useMemo(
    () => minGridSideForWords(words, Boolean(config.allowTurns)),
    [words, config.allowTurns]
  );
  const effectiveConfig = useMemo(
    () => resolveGridConfig(words, config),
    [words, config]
  );
  const rowsRaised = config.rows < effectiveConfig.rows;
  const colsRaised = config.cols < effectiveConfig.cols;
  const sizeRaised = rowsRaised || colsRaised;
  const topicDraft = useMemo(
    () => ({
      id: slugifyTopicId(title),
      title: title.trim() || "Без названия",
      description: description.trim() || void 0,
      words,
      config: effectiveConfig
    }),
    [title, description, words, effectiveConfig]
  );
  const jsonText = useMemo(() => topicToJson(topicDraft), [topicDraft]);
  const regenerate = () => {
    setError(null);
    setCopied(false);
    if (words.length < 1) {
      setError("Добавьте хотя бы одно слово.");
      setPreviewGrid(null);
      setPlacedWords([]);
      return;
    }
    const next = createFillwordPuzzle(words, config);
    setPreviewGrid(next.grid);
    setPlacedWords(next.placedWords);
    setPreviewKey((k) => k + 1);
  };
  const handleAdd = () => {
    setCopied(false);
    if (words.length < 1) {
      setError("Добавьте хотя бы одно слово.");
      return;
    }
    onAddTopic(topicDraft);
  };
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonText);
      setCopied(true);
      setError(null);
    } catch {
      setError("Не удалось скопировать — выделите JSON вручную.");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "fillword-create", children: [
    /* @__PURE__ */ jsx(Typography, { variant: "h5", sx: { fontWeight: 700 }, children: "Создать филворд" }),
    /* @__PURE__ */ jsx(Typography, { className: "fillword-muted", children: "Введите слова (по одному в строке или через запятую), настройте сетку и получите JSON темы. Его можно добавить в список для прохождения." }),
    /* @__PURE__ */ jsx(
      TextField,
      {
        label: "Название темы",
        value: title,
        onChange: (e) => setTitle(e.target.value),
        fullWidth: true,
        size: "small"
      }
    ),
    /* @__PURE__ */ jsx(
      TextField,
      {
        label: "Описание (необязательно)",
        value: description,
        onChange: (e) => setDescription(e.target.value),
        fullWidth: true,
        size: "small"
      }
    ),
    /* @__PURE__ */ jsx(
      TextField,
      {
        label: "Слова",
        value: wordsText,
        onChange: (e) => setWordsText(e.target.value),
        fullWidth: true,
        multiline: true,
        minRows: 5,
        helperText: `Распознано слов: ${words.length}`
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "fillword-create__row", children: [
      /* @__PURE__ */ jsx(
        TextField,
        {
          label: "Строки",
          type: "number",
          size: "small",
          value: config.rows,
          onChange: (e) => setConfig((c) => ({
            ...c,
            rows: clampGridSide(Number(e.target.value))
          })),
          helperText: rowsRaised ? `В превью: ${effectiveConfig.rows}` : `мин. ${minSide}`,
          slotProps: {
            htmlInput: { min: MIN_GRID_SIDE, max: MAX_GRID_SIDE }
          }
        }
      ),
      /* @__PURE__ */ jsx(
        TextField,
        {
          label: "Столбцы",
          type: "number",
          size: "small",
          value: config.cols,
          onChange: (e) => setConfig((c) => ({
            ...c,
            cols: clampGridSide(Number(e.target.value))
          })),
          helperText: colsRaised ? `В превью: ${effectiveConfig.cols}` : `мин. ${minSide}`,
          slotProps: {
            htmlInput: { min: MIN_GRID_SIDE, max: MAX_GRID_SIDE }
          }
        }
      )
    ] }),
    words.length > 0 && sizeRaised && /* @__PURE__ */ jsxs(Alert, { severity: "info", children: [
      config.allowTurns ? /* @__PURE__ */ jsxs(Fragment, { children: [
        "Минимальный размер сетки генератора — ",
        MIN_GRID_SIDE,
        "×",
        MIN_GRID_SIDE,
        "."
      ] }) : longest > MIN_GRID_SIDE ? /* @__PURE__ */ jsxs(Fragment, { children: [
        "В режиме прямой линии сторона сетки не может быть меньше самого длинного слова («",
        words.find((w) => w.length === longest) ?? "",
        "»,",
        " ",
        longest,
        " букв)."
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        "Минимальный размер сетки генератора — ",
        MIN_GRID_SIDE,
        "×",
        MIN_GRID_SIDE,
        "."
      ] }),
      " ",
      "Для превью и JSON используется ",
      effectiveConfig.rows,
      "×",
      effectiveConfig.cols,
      "."
    ] }),
    words.length > 0 && !sizeRaised && /* @__PURE__ */ jsxs(Typography, { className: "fillword-muted", variant: "body2", children: [
      "Размер сетки: от ",
      minSide,
      " до ",
      MAX_GRID_SIDE,
      config.allowTurns ? " (слова могут изгибаться, длина слова не ограничивает сторону)." : longest > MIN_GRID_SIDE ? ` (нижняя граница = длина самого длинного слова, ${longest}).` : ` (минимум генератора — ${MIN_GRID_SIDE}).`
    ] }),
    /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 1, sx: { flexWrap: "wrap" }, children: [
      /* @__PURE__ */ jsx(
        FormControlLabel,
        {
          control: /* @__PURE__ */ jsx(
            Checkbox,
            {
              checked: Boolean(config.allowTurns),
              onChange: (e) => setConfig((c) => ({ ...c, allowTurns: e.target.checked }))
            }
          ),
          label: "Повороты в слове"
        }
      ),
      /* @__PURE__ */ jsx(
        FormControlLabel,
        {
          control: /* @__PURE__ */ jsx(
            Checkbox,
            {
              checked: config.allowReverse,
              disabled: Boolean(config.allowTurns),
              onChange: (e) => setConfig((c) => ({ ...c, allowReverse: e.target.checked }))
            }
          ),
          label: "Обратный порядок"
        }
      ),
      /* @__PURE__ */ jsx(
        FormControlLabel,
        {
          control: /* @__PURE__ */ jsx(
            Checkbox,
            {
              checked: config.allowDiagonal,
              onChange: (e) => setConfig((c) => ({ ...c, allowDiagonal: e.target.checked }))
            }
          ),
          label: "Диагонали"
        }
      ),
      /* @__PURE__ */ jsx(
        FormControlLabel,
        {
          control: /* @__PURE__ */ jsx(
            Checkbox,
            {
              checked: config.allowOverlap,
              onChange: (e) => setConfig((c) => ({ ...c, allowOverlap: e.target.checked }))
            }
          ),
          label: "Пересечения букв"
        }
      )
    ] }),
    config.allowTurns && /* @__PURE__ */ jsxs(Alert, { severity: "warning", children: [
      "Режим поворотов не входит в",
      " ",
      /* @__PURE__ */ jsx("code", { children: "word-search-puzzle-generator" }),
      " (только прямые линии). Размещение и выбор слова идут по соседним клеткам нашей реализацией; формат ",
      /* @__PURE__ */ jsx("code", { children: "PlacedWord.path" }),
      " тот же."
    ] }),
    /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 1, sx: { flexWrap: "wrap" }, children: [
      /* @__PURE__ */ jsx(Button, { variant: "contained", onClick: regenerate, children: "Сгенерировать превью" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outlined",
          onClick: handleAdd,
          disabled: words.length < 1,
          children: "Добавить в список тем"
        }
      ),
      /* @__PURE__ */ jsx(Button, { variant: "outlined", onClick: handleCopy, children: copied ? "Скопировано" : "Копировать JSON" })
    ] }),
    error && /* @__PURE__ */ jsx(Typography, { color: "error", variant: "body2", children: error }),
    previewGrid && /* @__PURE__ */ jsx("div", { className: "fillword-grid-wrap", children: /* @__PURE__ */ jsx(
      FillwordGrid,
      {
        remountKey: previewKey,
        grid: previewGrid,
        placedWords,
        allowTurns: Boolean(effectiveConfig.allowTurns),
        allowDiagonal: effectiveConfig.allowDiagonal,
        onWordFound: (word) => setPlacedWords(
          (prev) => prev.map(
            (pw) => pw.word === word ? { ...pw, found: true } : pw
          )
        )
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Typography, { variant: "subtitle2", sx: { mb: 1, fontWeight: 600 }, children: "JSON темы" }),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          className: "fillword-json",
          readOnly: true,
          value: jsonText,
          "aria-label": "JSON темы филворда"
        }
      ),
      /* @__PURE__ */ jsxs(Typography, { className: "fillword-muted", sx: { mt: 1 }, children: [
        "Можно вставить этот объект в",
        " ",
        /* @__PURE__ */ jsx("code", { children: "src/features/fillword/data/topics.ts" }),
        " или добавить через кнопку выше (сохранится в localStorage)."
      ] })
    ] })
  ] });
}
export {
  CreatePuzzle
};
