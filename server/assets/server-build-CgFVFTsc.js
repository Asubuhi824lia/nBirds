import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, Link, useParams } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import React__default, { useState, useEffect, useMemo, forwardRef, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import composeClasses from "@mui/utils/composeClasses";
import { createSpacing, unstable_createGetCssVar, useTheme as useTheme$1, GlobalStyles as GlobalStyles$1, unstable_memoTheme, css, keyframes, createBox, createContainer, createStack } from "@mui/system";
import capitalize from "@mui/utils/capitalize";
import generateUtilityClasses from "@mui/utils/generateUtilityClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { useDefaultProps as useDefaultProps$1 } from "@mui/system/DefaultPropsProvider";
import createStyled from "@mui/system/createStyled";
import _formatErrorMessage from "@mui/utils/formatMuiErrorMessage";
import deepmerge, { isPlainObject } from "@mui/utils/deepmerge";
import { getContrastRatio, lighten, darken, alpha, private_safeDarken, private_safeLighten, private_safeAlpha, private_safeEmphasize, private_safeColorChannel, hslToRgb } from "@mui/system/colorManipulator";
import { createUnarySpacing } from "@mui/system/spacing";
import { prepareTypographyVars, prepareCssVars, createGetColorSchemeSelector } from "@mui/system/cssVars";
import styleFunctionSx, { unstable_defaultSxConfig } from "@mui/system/styleFunctionSx";
import systemCreateTheme from "@mui/system/createTheme";
import chainPropTypes from "@mui/utils/chainPropTypes";
import integerPropType from "@mui/utils/integerPropType";
import useForkRef from "@mui/utils/useForkRef";
import appendOwnerState from "@mui/utils/appendOwnerState";
import resolveComponentProps from "@mui/utils/resolveComponentProps";
import mergeSlotProps$1 from "@mui/utils/mergeSlotProps";
import refType from "@mui/utils/refType";
import elementTypeAcceptingRef from "@mui/utils/elementTypeAcceptingRef";
import isFocusVisible from "@mui/utils/isFocusVisible";
import useEventCallback from "@mui/utils/useEventCallback";
import useOnMount from "@mui/utils/useOnMount";
import useTimeout, { Timeout } from "@mui/utils/useTimeout";
import useEnhancedEffect from "@mui/utils/useEnhancedEffect";
import useLazyRef from "@mui/utils/useLazyRef";
import isMuiElement from "@mui/utils/isMuiElement";
import useControlled from "@mui/utils/useControlled";
import useId from "@mui/utils/useId";
import createChainedFunction from "@mui/utils/createChainedFunction";
import getReactElementRef from "@mui/utils/getReactElementRef";
import { isFragment } from "react-is";
import ownerDocument from "@mui/utils/ownerDocument";
import HTMLElementType from "@mui/utils/HTMLElementType";
import { useRtl } from "@mui/system/RtlProvider";
import useSlotProps from "@mui/utils/useSlotProps";
import isHostComponent from "@mui/utils/isHostComponent";
import debounce from "@mui/utils/debounce";
import ownerWindow from "@mui/utils/ownerWindow";
import isEventHandler from "@mui/utils/isEventHandler";
import elementAcceptingRef from "@mui/utils/elementAcceptingRef";
import useValueAsRef from "@mui/utils/useValueAsRef";
import extractEventHandlers from "@mui/utils/extractEventHandlers";
import getScrollbarSize from "@mui/utils/getScrollbarSize";
import * as ReactDOM from "react-dom";
import setRef from "@mui/utils/setRef";
import exactProp from "@mui/utils/exactProp";
import contains from "@mui/utils/contains";
import getActiveElement from "@mui/utils/getActiveElement";
import { isItemFocusable, useRovingTabIndexRoot, RovingTabIndexContext, useRovingTabIndexItem, useRovingTabIndexContext } from "@mui/utils/useRovingTabIndex";
import ClassNameGenerator from "@mui/utils/ClassNameGenerator";
import unsupportedProp from "@mui/utils/unsupportedProp";
import Highlighter from "react-highlight-words";
import { Upload, Download, ExpandMore, Close, Add, Save, Edit, Delete } from "@mui/icons-material";
import resolveProps from "@mui/utils/resolveProps";
import { createGrid } from "@mui/system/Grid";
import requirePropFactory from "@mui/utils/requirePropFactory";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import usePreviousProps from "@mui/utils/usePreviousProps";
import { createPopper } from "@popperjs/core";
import getValidReactChildren from "@mui/utils/getValidReactChildren";
import MenuIcon from "@mui/icons-material/Menu";
import confetti from "canvas-confetti";
import { useField, FieldArray, Formik, Form } from "formik";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function isHalloweenGarlandSeason(date = /* @__PURE__ */ new Date()) {
  const month = date.getMonth();
  const day = date.getDate();
  if (month === 9 && day >= 25) return true;
  if (month === 10 && day <= 7) return true;
  return false;
}
const PIECES$1 = [
  { kind: "bulb", color: "orange" },
  { kind: "charm", glyph: "🎃", label: "тыква" },
  { kind: "bulb", color: "purple" },
  { kind: "charm", glyph: "🦇", label: "летучая мышь" },
  { kind: "bulb", color: "lime" },
  { kind: "charm", glyph: "👻", label: "привидение" },
  { kind: "bulb", color: "amber" },
  { kind: "charm", glyph: "🕷️", label: "паук" },
  { kind: "bulb", color: "orange" },
  { kind: "charm", glyph: "🍬", label: "конфета" },
  { kind: "bulb", color: "purple" },
  { kind: "charm", glyph: "💀", label: "череп" },
  { kind: "bulb", color: "lime" },
  { kind: "charm", glyph: "🎃", label: "тыква" },
  { kind: "bulb", color: "amber" },
  { kind: "charm", glyph: "🦇", label: "летучая мышь" },
  { kind: "bulb", color: "orange" },
  { kind: "charm", glyph: "👻", label: "привидение" },
  { kind: "bulb", color: "purple" },
  { kind: "charm", glyph: "🕸️", label: "паутина" },
  { kind: "bulb", color: "lime" },
  { kind: "charm", glyph: "🎃", label: "тыква" },
  { kind: "bulb", color: "amber" },
  { kind: "charm", glyph: "🦇", label: "летучая мышь" },
  { kind: "bulb", color: "orange" }
];
function HalloweenGarland() {
  if (!isHalloweenGarlandSeason()) return null;
  return /* @__PURE__ */ jsxs(
    "aside",
    {
      className: "halloween-garland",
      "aria-hidden": "true",
      role: "presentation",
      children: [
        /* @__PURE__ */ jsx("div", { className: "halloween-garland__wire" }),
        /* @__PURE__ */ jsx("div", { className: "halloween-garland__row", children: PIECES$1.map((piece, index) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "halloween-garland__item",
            style: { animationDelay: `${index % 7 * -0.35}s` },
            children: [
              /* @__PURE__ */ jsx("span", { className: "halloween-garland__string" }),
              piece.kind === "bulb" ? /* @__PURE__ */ jsx(
                "span",
                {
                  className: `halloween-garland__bulb halloween-garland__bulb--${piece.color}`
                }
              ) : /* @__PURE__ */ jsx(
                "span",
                {
                  className: "halloween-garland__charm",
                  title: piece.label,
                  children: piece.glyph
                }
              )
            ]
          },
          `${piece.kind}-${index}`
        )) })
      ]
    }
  );
}
function isNewYearGarlandSeason(date = /* @__PURE__ */ new Date()) {
  const month = date.getMonth();
  const day = date.getDate();
  if (month === 11 && day >= 25) return true;
  if (month === 0 && day <= 8) return true;
  return false;
}
const PIECES = [
  { kind: "bulb", color: "red" },
  { kind: "charm", glyph: "🎄", label: "ёлка" },
  { kind: "bulb", color: "green" },
  { kind: "charm", glyph: "🎁", label: "снеговик" },
  { kind: "bulb", color: "gold" },
  { kind: "charm", glyph: "❄️", label: "снежинка" },
  { kind: "bulb", color: "blue" },
  { kind: "charm", glyph: "⭐", label: "звезда" },
  { kind: "bulb", color: "red" },
  { kind: "charm", glyph: "☃️", label: "снеговик" },
  { kind: "bulb", color: "green" },
  { kind: "charm", glyph: "🎅", label: "Дед Мороз" },
  { kind: "bulb", color: "gold" },
  { kind: "charm", glyph: "🎄", label: "ёлка" },
  { kind: "bulb", color: "blue" },
  { kind: "charm", glyph: "🦌", label: "снеговик" },
  { kind: "bulb", color: "red" },
  { kind: "charm", glyph: "✨", label: "блёстки" },
  { kind: "bulb", color: "green" },
  { kind: "charm", glyph: "☃️", label: "снеговик" },
  { kind: "bulb", color: "gold" },
  { kind: "charm", glyph: "🎁", label: "подарок" },
  { kind: "bulb", color: "blue" },
  { kind: "charm", glyph: "⭐", label: "звезда" },
  { kind: "bulb", color: "red" }
];
function NewYearGarland() {
  if (!isNewYearGarlandSeason()) return null;
  return /* @__PURE__ */ jsxs(
    "aside",
    {
      className: "newyear-garland",
      "aria-hidden": "true",
      role: "presentation",
      children: [
        /* @__PURE__ */ jsx("div", { className: "newyear-garland__wire" }),
        /* @__PURE__ */ jsx("div", { className: "newyear-garland__row", children: PIECES.map((piece, index) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "newyear-garland__item",
            style: { animationDelay: `${index % 7 * -0.35}s` },
            children: [
              /* @__PURE__ */ jsx("span", { className: "newyear-garland__string" }),
              piece.kind === "bulb" ? /* @__PURE__ */ jsx(
                "span",
                {
                  className: `newyear-garland__bulb newyear-garland__bulb--${piece.color}`
                }
              ) : /* @__PURE__ */ jsx(
                "span",
                {
                  className: "newyear-garland__charm",
                  title: piece.label,
                  children: piece.glyph
                }
              )
            ]
          },
          `${piece.kind}-${index}`
        )) })
      ]
    }
  );
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [isNewYearGarlandSeason() ? /* @__PURE__ */ jsx(NewYearGarland, {}) : isHalloweenGarlandSeason() ? /* @__PURE__ */ jsx(HalloweenGarland, {}) : null, /* @__PURE__ */ jsx("section", {
      style: {
        display: "flex",
        justifyContent: "safe center",
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        minWidth: 0
      },
      children: /* @__PURE__ */ jsx(Outlet, {})
    })]
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const common = {
  black: "#000",
  white: "#fff"
};
const red = {
  50: "#ffebee",
  100: "#ffcdd2",
  200: "#ef9a9a",
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  600: "#e53935",
  700: "#d32f2f",
  800: "#c62828",
  900: "#b71c1c",
  A100: "#ff8a80",
  A200: "#ff5252",
  A400: "#ff1744",
  A700: "#d50000"
};
const pink = {
  50: "#fce4ec",
  100: "#f8bbd0",
  200: "#f48fb1",
  300: "#f06292",
  400: "#ec407a",
  500: "#e91e63",
  600: "#d81b60",
  700: "#c2185b",
  800: "#ad1457",
  900: "#880e4f",
  A100: "#ff80ab",
  A200: "#ff4081",
  A400: "#f50057",
  A700: "#c51162"
};
const purple = {
  50: "#f3e5f5",
  100: "#e1bee7",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  600: "#8e24aa",
  700: "#7b1fa2",
  800: "#6a1b9a",
  900: "#4a148c",
  A100: "#ea80fc",
  A200: "#e040fb",
  A400: "#d500f9",
  A700: "#aa00ff"
};
const indigo = {
  50: "#e8eaf6",
  100: "#c5cae9",
  200: "#9fa8da",
  300: "#7986cb",
  400: "#5c6bc0",
  500: "#3f51b5",
  600: "#3949ab",
  700: "#303f9f",
  800: "#283593",
  900: "#1a237e",
  A100: "#8c9eff",
  A200: "#536dfe",
  A400: "#3d5afe",
  A700: "#304ffe"
};
const blue = {
  50: "#e3f2fd",
  100: "#bbdefb",
  200: "#90caf9",
  300: "#64b5f6",
  400: "#42a5f5",
  500: "#2196f3",
  600: "#1e88e5",
  700: "#1976d2",
  800: "#1565c0",
  900: "#0d47a1",
  A100: "#82b1ff",
  A200: "#448aff",
  A400: "#2979ff",
  A700: "#2962ff"
};
const lightBlue = {
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  700: "#0288d1",
  900: "#01579b"
};
const cyan = {
  50: "#e0f7fa",
  100: "#b2ebf2",
  200: "#80deea",
  300: "#4dd0e1",
  400: "#26c6da",
  500: "#00bcd4",
  600: "#00acc1",
  700: "#0097a7",
  800: "#00838f",
  900: "#006064",
  A100: "#84ffff",
  A200: "#18ffff",
  A400: "#00e5ff",
  A700: "#00b8d4"
};
const teal = {
  50: "#e0f2f1",
  100: "#b2dfdb",
  200: "#80cbc4",
  300: "#4db6ac",
  400: "#26a69a",
  500: "#009688",
  600: "#00897b",
  700: "#00796b",
  800: "#00695c",
  900: "#004d40",
  A100: "#a7ffeb",
  A200: "#64ffda",
  A400: "#1de9b6",
  A700: "#00bfa5"
};
const green = {
  50: "#e8f5e9",
  100: "#c8e6c9",
  200: "#a5d6a7",
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  600: "#43a047",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20",
  A100: "#b9f6ca",
  A200: "#69f0ae",
  A400: "#00e676",
  A700: "#00c853"
};
const lime = {
  50: "#f9fbe7",
  100: "#f0f4c3",
  200: "#e6ee9c",
  300: "#dce775",
  400: "#d4e157",
  500: "#cddc39",
  600: "#c0ca33",
  700: "#afb42b",
  800: "#9e9d24",
  900: "#827717",
  A100: "#f4ff81",
  A200: "#eeff41",
  A400: "#c6ff00",
  A700: "#aeea00"
};
const yellow = {
  50: "#fffde7",
  100: "#fff9c4",
  200: "#fff59d",
  300: "#fff176",
  400: "#ffee58",
  500: "#ffeb3b",
  600: "#fdd835",
  700: "#fbc02d",
  800: "#f9a825",
  900: "#f57f17",
  A100: "#ffff8d",
  A200: "#ffff00",
  A400: "#ffea00",
  A700: "#ffd600"
};
const amber = {
  50: "#fff8e1",
  100: "#ffecb3",
  200: "#ffe082",
  300: "#ffd54f",
  400: "#ffca28",
  500: "#ffc107",
  600: "#ffb300",
  700: "#ffa000",
  800: "#ff8f00",
  900: "#ff6f00",
  A100: "#ffe57f",
  A200: "#ffd740",
  A400: "#ffc400",
  A700: "#ffab00"
};
const orange = {
  50: "#fff3e0",
  100: "#ffe0b2",
  200: "#ffcc80",
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  600: "#fb8c00",
  700: "#f57c00",
  800: "#ef6c00",
  900: "#e65100",
  A100: "#ffd180",
  A200: "#ffab40",
  A400: "#ff9100",
  A700: "#ff6d00"
};
const brown = {
  50: "#efebe9",
  100: "#d7ccc8",
  200: "#bcaaa4",
  300: "#a1887f",
  400: "#8d6e63",
  500: "#795548",
  600: "#6d4c41",
  700: "#5d4037",
  800: "#4e342e",
  900: "#3e2723",
  A100: "#d7ccc8",
  A200: "#bcaaa4",
  A400: "#8d6e63",
  A700: "#5d4037"
};
const grey = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  A100: "#f5f5f5",
  A200: "#eeeeee",
  A400: "#bdbdbd",
  A700: "#616161"
};
const blueGrey = {
  50: "#eceff1",
  100: "#cfd8dc",
  200: "#b0bec5",
  300: "#90a4ae",
  400: "#78909c",
  500: "#607d8b",
  600: "#546e7a",
  700: "#455a64",
  800: "#37474f",
  900: "#263238",
  A100: "#cfd8dc",
  A200: "#b0bec5",
  A400: "#78909c",
  A700: "#455a64"
};
const THEME_ID = "$$material";
function getLight() {
  return {
    // The colors used to style the text.
    text: {
      // The most important text.
      primary: "rgba(0, 0, 0, 0.87)",
      // Secondary text.
      secondary: "rgba(0, 0, 0, 0.6)",
      // Disabled text have even lower visual prominence.
      disabled: "rgba(0, 0, 0, 0.38)"
    },
    // The color used to divide different elements.
    divider: "rgba(0, 0, 0, 0.12)",
    // The background colors used to style the surfaces.
    // Consistency between these values is important.
    background: {
      paper: common.white,
      default: common.white
    },
    // The colors used to style the action elements.
    action: {
      // The color of an active action like an icon button.
      active: "rgba(0, 0, 0, 0.54)",
      // The color of an hovered action.
      hover: "rgba(0, 0, 0, 0.04)",
      hoverOpacity: 0.04,
      // The color of a selected action.
      selected: "rgba(0, 0, 0, 0.08)",
      selectedOpacity: 0.08,
      // The color of a disabled action.
      disabled: "rgba(0, 0, 0, 0.26)",
      // The background color of a disabled action.
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(0, 0, 0, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.12
    }
  };
}
const light = getLight();
function getDark() {
  return {
    text: {
      primary: common.white,
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
      icon: "rgba(255, 255, 255, 0.5)"
    },
    divider: "rgba(255, 255, 255, 0.12)",
    background: {
      paper: "#121212",
      default: "#121212"
    },
    action: {
      active: common.white,
      hover: "rgba(255, 255, 255, 0.08)",
      hoverOpacity: 0.08,
      selected: "rgba(255, 255, 255, 0.16)",
      selectedOpacity: 0.16,
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(255, 255, 255, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.24
    }
  };
}
const dark = getDark();
function addLightOrDark(intent, direction, shade, tonalOffset) {
  const tonalOffsetLight = tonalOffset.light || tonalOffset;
  const tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;
  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === "light") {
      intent.light = lighten(intent.main, tonalOffsetLight);
    } else if (direction === "dark") {
      intent.dark = darken(intent.main, tonalOffsetDark);
    }
  }
}
function mixLightOrDark(colorSpace, intent, direction, shade, tonalOffset) {
  const tonalOffsetLight = tonalOffset.light || tonalOffset;
  const tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;
  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === "light") {
      intent.light = `color-mix(in ${colorSpace}, ${intent.main}, #fff ${(tonalOffsetLight * 100).toFixed(0)}%)`;
    } else if (direction === "dark") {
      intent.dark = `color-mix(in ${colorSpace}, ${intent.main}, #000 ${(tonalOffsetDark * 100).toFixed(0)}%)`;
    }
  }
}
function getDefaultPrimary(mode = "light") {
  if (mode === "dark") {
    return {
      main: blue[200],
      light: blue[50],
      dark: blue[400]
    };
  }
  return {
    main: blue[700],
    light: blue[400],
    dark: blue[800]
  };
}
function getDefaultSecondary(mode = "light") {
  if (mode === "dark") {
    return {
      main: purple[200],
      light: purple[50],
      dark: purple[400]
    };
  }
  return {
    main: purple[500],
    light: purple[300],
    dark: purple[700]
  };
}
function getDefaultError(mode = "light") {
  if (mode === "dark") {
    return {
      main: red[500],
      light: red[300],
      dark: red[700]
    };
  }
  return {
    main: red[700],
    light: red[400],
    dark: red[800]
  };
}
function getDefaultInfo(mode = "light") {
  if (mode === "dark") {
    return {
      main: lightBlue[400],
      light: lightBlue[300],
      dark: lightBlue[700]
    };
  }
  return {
    main: lightBlue[700],
    light: lightBlue[500],
    dark: lightBlue[900]
  };
}
function getDefaultSuccess(mode = "light") {
  if (mode === "dark") {
    return {
      main: green[400],
      light: green[300],
      dark: green[700]
    };
  }
  return {
    main: green[800],
    light: green[500],
    dark: green[900]
  };
}
function getDefaultWarning(mode = "light") {
  if (mode === "dark") {
    return {
      main: orange[400],
      light: orange[300],
      dark: orange[700]
    };
  }
  return {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: orange[500],
    dark: orange[900]
  };
}
function contrastColor(background) {
  return `oklch(from ${background} var(--__l) 0 h / var(--__a))`;
}
function createPalette(palette) {
  const {
    mode = "light",
    contrastThreshold = 3,
    tonalOffset = 0.2,
    colorSpace,
    ...other
  } = palette;
  const primary = palette.primary || getDefaultPrimary(mode);
  const secondary = palette.secondary || getDefaultSecondary(mode);
  const error = palette.error || getDefaultError(mode);
  const info = palette.info || getDefaultInfo(mode);
  const success = palette.success || getDefaultSuccess(mode);
  const warning = palette.warning || getDefaultWarning(mode);
  function getContrastText(background) {
    if (colorSpace) {
      return contrastColor(background);
    }
    const contrastText = getContrastRatio(background, dark.text.primary) >= contrastThreshold ? dark.text.primary : light.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const contrast = getContrastRatio(background, contrastText);
      if (contrast < 3) {
        console.error([`MUI: The contrast ratio of ${contrast}:1 for ${contrastText} on ${background}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join("\n"));
      }
    }
    return contrastText;
  }
  const augmentColor = ({
    color,
    name,
    mainShade = 500,
    lightShade = 300,
    darkShade = 700
  }) => {
    color = {
      ...color
    };
    if (!color.main && color[mainShade]) {
      color.main = color[mainShade];
    }
    if (!color.hasOwnProperty("main")) {
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${name ? ` (${name})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${mainShade}\` property.` : _formatErrorMessage(11, name ? ` (${name})` : "", mainShade));
    }
    if (typeof color.main !== "string") {
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${name ? ` (${name})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(color.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : _formatErrorMessage(12, name ? ` (${name})` : "", JSON.stringify(color.main)));
    }
    if (colorSpace) {
      mixLightOrDark(colorSpace, color, "light", lightShade, tonalOffset);
      mixLightOrDark(colorSpace, color, "dark", darkShade, tonalOffset);
    } else {
      addLightOrDark(color, "light", lightShade, tonalOffset);
      addLightOrDark(color, "dark", darkShade, tonalOffset);
    }
    if (!color.contrastText) {
      color.contrastText = getContrastText(color.main);
    }
    return color;
  };
  let modeHydrated;
  if (mode === "light") {
    modeHydrated = getLight();
  } else if (mode === "dark") {
    modeHydrated = getDark();
  }
  if (process.env.NODE_ENV !== "production") {
    if (!modeHydrated) {
      console.error(`MUI: The palette mode \`${mode}\` is not supported.`);
    }
  }
  const paletteOutput = deepmerge({
    // A collection of common colors.
    common: {
      ...common
    },
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode,
    // The colors used to represent primary interface elements for a user.
    primary: augmentColor({
      color: primary,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: augmentColor({
      color: secondary,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: augmentColor({
      color: error,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: augmentColor({
      color: warning,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: augmentColor({
      color: info,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: augmentColor({
      color: success,
      name: "success"
    }),
    // The grey colors.
    grey,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText,
    // Generate a rich color object.
    augmentColor,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset,
    // The light and dark mode object.
    ...modeHydrated
  }, other);
  return paletteOutput;
}
function createMixins(breakpoints, mixins) {
  return {
    toolbar: {
      minHeight: 56,
      [breakpoints.up("xs")]: {
        "@media (orientation: landscape)": {
          minHeight: 48
        }
      },
      [breakpoints.up("sm")]: {
        minHeight: 64
      }
    },
    ...mixins
  };
}
function round$1(value) {
  return Math.round(value * 1e5) / 1e5;
}
const caseAllCaps = {
  textTransform: "uppercase"
};
const defaultFontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';
function createTypography(palette, typography) {
  const {
    fontFamily = defaultFontFamily,
    // The default font size of the Material Specification.
    fontSize = 14,
    // px
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    fontWeightBold = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize = 16,
    // Apply the CSS properties to all the variants.
    allVariants,
    pxToRem: pxToRem2,
    ...other
  } = typeof typography === "function" ? typography(palette) : typography;
  if (process.env.NODE_ENV !== "production") {
    if (typeof fontSize !== "number") {
      console.error("MUI: `fontSize` is required to be a number.");
    }
    if (typeof htmlFontSize !== "number") {
      console.error("MUI: `htmlFontSize` is required to be a number.");
    }
  }
  const coef = fontSize / 14;
  const pxToRem = pxToRem2 || ((size) => `${size / htmlFontSize * coef}rem`);
  const buildVariant = (fontWeight, size, lineHeight, letterSpacing, casing) => ({
    fontFamily,
    fontWeight,
    fontSize: pxToRem(size),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight,
    // The letter spacing was designed for the Roboto font-family. Using the same letter-spacing
    // across font-families can cause issues with the kerning.
    ...fontFamily === defaultFontFamily ? {
      letterSpacing: `${round$1(letterSpacing / size)}em`
    } : {},
    ...casing,
    ...allVariants
  });
  const variants = {
    h1: buildVariant(fontWeightLight, 96, 1.167, -1.5),
    h2: buildVariant(fontWeightLight, 60, 1.2, -0.5),
    h3: buildVariant(fontWeightRegular, 48, 1.167, 0),
    h4: buildVariant(fontWeightRegular, 34, 1.235, 0.25),
    h5: buildVariant(fontWeightRegular, 24, 1.334, 0),
    h6: buildVariant(fontWeightMedium, 20, 1.6, 0.15),
    subtitle1: buildVariant(fontWeightRegular, 16, 1.75, 0.15),
    subtitle2: buildVariant(fontWeightMedium, 14, 1.57, 0.1),
    body1: buildVariant(fontWeightRegular, 16, 1.5, 0.15),
    body2: buildVariant(fontWeightRegular, 14, 1.43, 0.15),
    button: buildVariant(fontWeightMedium, 14, 1.75, 0.4, caseAllCaps),
    caption: buildVariant(fontWeightRegular, 12, 1.66, 0.4),
    overline: buildVariant(fontWeightRegular, 12, 2.66, 1, caseAllCaps),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return deepmerge({
    htmlFontSize,
    pxToRem,
    fontFamily,
    fontSize,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold,
    ...variants
  }, other, {
    clone: false
    // No need to clone deep
  });
}
const shadowKeyUmbraOpacity = 0.2;
const shadowKeyPenumbraOpacity = 0.14;
const shadowAmbientShadowOpacity = 0.12;
function createShadow(...px) {
  return [`${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(0,0,0,${shadowKeyUmbraOpacity})`, `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0,0,0,${shadowKeyPenumbraOpacity})`, `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0,0,0,${shadowAmbientShadowOpacity})`].join(",");
}
const shadows = ["none", createShadow(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), createShadow(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), createShadow(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)];
const DEFAULT_TRANSITION_PROPS$1 = ["all"];
const EMPTY_OPTIONS$1 = {};
const easing = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
};
const duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195
};
function formatMs(milliseconds) {
  return `${Math.round(milliseconds)}ms`;
}
function getAutoHeightDuration(height) {
  if (!height) {
    return 0;
  }
  const constant = height / 36;
  return Math.min(Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10), 3e3);
}
function createTransitions(inputTransitions) {
  const transitions = {
    ...inputTransitions
  };
  delete transitions.reducedMotion;
  const mergedEasing = {
    ...easing,
    ...transitions.easing
  };
  const mergedDuration = {
    ...duration,
    ...transitions.duration
  };
  const createTransitionValue = (props = DEFAULT_TRANSITION_PROPS$1, options = EMPTY_OPTIONS$1) => {
    const {
      duration: durationOption = mergedDuration.standard,
      easing: easingOption = mergedEasing.easeInOut,
      delay = 0,
      ...other
    } = options;
    if (process.env.NODE_ENV !== "production") {
      const isString = (value) => typeof value === "string";
      const isNumber = (value) => !Number.isNaN(parseFloat(value));
      if (!isString(props) && !Array.isArray(props)) {
        console.error('MUI: Argument "props" must be a string or Array.');
      }
      if (!isNumber(durationOption) && !isString(durationOption)) {
        console.error(`MUI: Argument "duration" must be a number or a string but found ${durationOption}.`);
      }
      if (!isString(easingOption)) {
        console.error('MUI: Argument "easing" must be a string.');
      }
      if (!isNumber(delay) && !isString(delay)) {
        console.error('MUI: Argument "delay" must be a number or a string.');
      }
      if (typeof options !== "object") {
        console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join("\n"));
      }
      if (Object.keys(other).length !== 0) {
        console.error(`MUI: Unrecognized argument(s) [${Object.keys(other).join(",")}].`);
      }
    }
    return (Array.isArray(props) ? props : [props]).map((animatedProp) => `${animatedProp} ${typeof durationOption === "string" ? durationOption : formatMs(durationOption)} ${easingOption} ${typeof delay === "string" ? delay : formatMs(delay)}`).join(",");
  };
  const create = transitions.create ?? createTransitionValue;
  return {
    getAutoHeightDuration,
    create,
    ...transitions,
    easing: mergedEasing,
    duration: mergedDuration
  };
}
const EMPTY_MOTION = {};
function createMotion(inputMotion = EMPTY_MOTION) {
  return {
    reducedMotion: "never",
    ...inputMotion
  };
}
const zIndex = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
function isSerializable(val) {
  return isPlainObject(val) || typeof val === "undefined" || typeof val === "string" || typeof val === "boolean" || typeof val === "number" || Array.isArray(val);
}
function stringifyTheme(baseTheme = {}) {
  const serializableTheme = {
    ...baseTheme
  };
  function serializeTheme(object) {
    const array = Object.entries(object);
    for (let index = 0; index < array.length; index++) {
      const [key, value] = array[index];
      if (!isSerializable(value) || key.startsWith("unstable_") || key.startsWith("internal_")) {
        delete object[key];
      } else if (isPlainObject(value)) {
        object[key] = {
          ...value
        };
        serializeTheme(object[key]);
      }
    }
  }
  serializeTheme(serializableTheme);
  return `import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';

const theme = ${JSON.stringify(serializableTheme, null, 2)};

theme.breakpoints = createBreakpoints(theme.breakpoints || {});
theme.motion = { reducedMotion: 'never', ...theme.motion };
theme.transitions = createTransitions(theme.transitions || {});

export default theme;`;
}
function coefficientToPercentage(coefficient) {
  if (typeof coefficient === "number") {
    return `${(coefficient * 100).toFixed(0)}%`;
  }
  return `calc((${coefficient}) * 100%)`;
}
const parseAddition = (str) => {
  if (!Number.isNaN(+str)) {
    return +str;
  }
  const numbers = str.match(/\d*\.?\d+/g);
  if (!numbers) {
    return 0;
  }
  let sum = 0;
  for (let i = 0; i < numbers.length; i += 1) {
    sum += +numbers[i];
  }
  return sum;
};
function attachColorManipulators(theme) {
  Object.assign(theme, {
    alpha(color, coefficient) {
      const obj = this || theme;
      if (obj.colorSpace) {
        return `oklch(from ${color} l c h / ${typeof coefficient === "string" ? `calc(${coefficient})` : coefficient})`;
      }
      if (obj.vars) {
        return `rgba(${color.replace(/var\(--([^,\s)]+)(?:,[^)]+)?\)+/g, "var(--$1Channel)")} / ${typeof coefficient === "string" ? `calc(${coefficient})` : coefficient})`;
      }
      return alpha(color, parseAddition(coefficient));
    },
    lighten(color, coefficient) {
      const obj = this || theme;
      if (obj.colorSpace) {
        return `color-mix(in ${obj.colorSpace}, ${color}, #fff ${coefficientToPercentage(coefficient)})`;
      }
      return lighten(color, coefficient);
    },
    darken(color, coefficient) {
      const obj = this || theme;
      if (obj.colorSpace) {
        return `color-mix(in ${obj.colorSpace}, ${color}, #000 ${coefficientToPercentage(coefficient)})`;
      }
      return darken(color, coefficient);
    }
  });
}
function createThemeNoVars(options = {}, ...args) {
  const {
    breakpoints: breakpointsInput,
    mixins: mixinsInput = {},
    spacing: spacingInput,
    palette: paletteInput = {},
    motion: motionInput = {},
    transitions: transitionsInput = {},
    typography: typographyInput = {},
    shape: shapeInput,
    colorSpace,
    ...other
  } = options;
  if (options.vars && // The error should throw only for the root theme creation because user is not allowed to use a custom node `vars`.
  // `generateThemeVars` is the closest identifier for checking that the `options` is a result of `createTheme` with CSS variables so that user can create new theme for nested ThemeProvider.
  options.generateThemeVars === void 0) {
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name or follow the [docs](https://mui.com/material-ui/customization/css-theme-variables/usage/) to enable the feature." : _formatErrorMessage(22));
  }
  const palette = createPalette({
    ...paletteInput,
    colorSpace
  });
  const systemTheme = systemCreateTheme(options);
  let muiTheme = deepmerge(systemTheme, {
    mixins: createMixins(systemTheme.breakpoints, mixinsInput),
    palette,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: shadows.slice(),
    typography: createTypography(palette, typographyInput),
    motion: createMotion(motionInput),
    transitions: createTransitions(transitionsInput),
    zIndex: {
      ...zIndex
    }
  });
  muiTheme = deepmerge(muiTheme, other);
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  delete muiTheme.transitions.reducedMotion;
  if (process.env.NODE_ENV !== "production") {
    const stateClasses = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"];
    const traverse = (node, component) => {
      let key;
      for (key in node) {
        const child = node[key];
        if (stateClasses.includes(key) && Object.keys(child).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const stateClass = generateUtilityClass("", key);
            console.error([`MUI: The \`${component}\` component increases the CSS specificity of the \`${key}\` internal state.`, "You can not override it like this: ", JSON.stringify(node, null, 2), "", `Instead, you need to use the '&.${stateClass}' syntax:`, JSON.stringify({
              root: {
                [`&.${stateClass}`]: child
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join("\n"));
          }
          node[key] = {};
        }
      }
    };
    Object.keys(muiTheme.components).forEach((component) => {
      const styleOverrides = muiTheme.components[component].styleOverrides;
      if (styleOverrides && component.startsWith("Mui")) {
        traverse(styleOverrides, component);
      }
    });
  }
  muiTheme.unstable_sxConfig = {
    ...unstable_defaultSxConfig,
    ...other?.unstable_sxConfig
  };
  muiTheme.unstable_sx = function sx(props) {
    return styleFunctionSx({
      sx: props,
      theme: this
    });
  };
  muiTheme.toRuntimeSource = stringifyTheme;
  attachColorManipulators(muiTheme);
  return muiTheme;
}
function getOverlayAlpha(elevation) {
  let alphaValue;
  if (elevation < 1) {
    alphaValue = 5.11916 * elevation ** 2;
  } else {
    alphaValue = 4.5 * Math.log(elevation + 1) + 2;
  }
  return Math.round(alphaValue * 10) / 1e3;
}
const defaultDarkOverlays = [...Array(25)].map((_, index) => {
  if (index === 0) {
    return "none";
  }
  const overlay = getOverlayAlpha(index);
  return `linear-gradient(rgba(255 255 255 / ${overlay}), rgba(255 255 255 / ${overlay}))`;
});
function getOpacity(mode) {
  return {
    inputPlaceholder: mode === "dark" ? 0.5 : 0.42,
    inputUnderline: mode === "dark" ? 0.7 : 0.42,
    switchTrackDisabled: mode === "dark" ? 0.2 : 0.12,
    switchTrack: mode === "dark" ? 0.3 : 0.38
  };
}
function getOverlays(mode) {
  return mode === "dark" ? defaultDarkOverlays : [];
}
function createColorScheme(options) {
  const {
    palette: paletteInput = {
      mode: "light"
    },
    // need to cast to avoid module augmentation test
    opacity,
    overlays,
    colorSpace,
    ...other
  } = options;
  const palette = createPalette({
    ...paletteInput,
    colorSpace
  });
  return {
    palette,
    opacity: {
      ...getOpacity(palette.mode),
      ...opacity
    },
    overlays: overlays || getOverlays(palette.mode),
    ...other
  };
}
function shouldSkipGeneratingVar(keys) {
  return keys[0] === "motion" || !!keys[0].match(/(cssVarPrefix|colorSchemeSelector|modularCssLayers|rootSelector|typography|mixins|breakpoints|direction|transitions)/) || !!keys[0].match(/sxConfig$/) || // ends with sxConfig
  keys[0] === "palette" && !!keys[1]?.match(/(mode|contrastThreshold|tonalOffset)/);
}
const excludeVariablesFromRoot = (cssVarPrefix) => [...[...Array(25)].map((_, index) => `--${cssVarPrefix ? `${cssVarPrefix}-` : ""}overlays-${index}`), `--${cssVarPrefix ? `${cssVarPrefix}-` : ""}palette-AppBar-darkBg`, `--${cssVarPrefix ? `${cssVarPrefix}-` : ""}palette-AppBar-darkColor`];
const defaultGetSelector = (theme) => (colorScheme, css2) => {
  const root2 = theme.rootSelector || ":root";
  const selector = theme.colorSchemeSelector;
  let rule = selector;
  if (selector === "class") {
    rule = ".%s";
  }
  if (selector === "data") {
    rule = "[data-%s]";
  }
  if (selector?.startsWith("data-") && !selector.includes("%s")) {
    rule = `[${selector}="%s"]`;
  }
  if (theme.defaultColorScheme === colorScheme) {
    if (colorScheme === "dark") {
      const excludedVariables = {};
      excludeVariablesFromRoot(theme.cssVarPrefix).forEach((cssVar) => {
        excludedVariables[cssVar] = css2[cssVar];
        delete css2[cssVar];
      });
      if (rule === "media") {
        return {
          [root2]: css2,
          [`@media (prefers-color-scheme: dark)`]: {
            [root2]: excludedVariables
          }
        };
      }
      if (rule) {
        return {
          [rule.replace("%s", colorScheme)]: excludedVariables,
          [`${root2}, ${rule.replace("%s", colorScheme)}`]: css2
        };
      }
      return {
        [root2]: {
          ...css2,
          ...excludedVariables
        }
      };
    }
    if (rule && rule !== "media") {
      return `${root2}, ${rule.replace("%s", String(colorScheme))}`;
    }
  } else if (colorScheme) {
    if (rule === "media") {
      return {
        [`@media (prefers-color-scheme: ${String(colorScheme)})`]: {
          [root2]: css2
        }
      };
    }
    if (rule) {
      return rule.replace("%s", String(colorScheme));
    }
  }
  return root2;
};
function assignNode(obj, keys) {
  keys.forEach((k) => {
    if (!obj[k]) {
      obj[k] = {};
    }
  });
}
function setColor(obj, key, defaultValue) {
  if (!obj[key] && defaultValue) {
    obj[key] = defaultValue;
  }
}
function toRgb(color) {
  if (typeof color !== "string" || !color.startsWith("hsl")) {
    return color;
  }
  return hslToRgb(color);
}
function setColorChannel(obj, key) {
  if (!(`${key}Channel` in obj)) {
    obj[`${key}Channel`] = private_safeColorChannel(toRgb(obj[key]), `MUI: Can't create \`palette.${key}Channel\` because \`palette.${key}\` is not one of these formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().
To suppress this warning, you need to explicitly provide the \`palette.${key}Channel\` as a string (in rgb format, for example "12 12 12") or undefined if you want to remove the channel token.`);
  }
}
function getSpacingVal(spacingInput) {
  if (typeof spacingInput === "number") {
    return `${spacingInput}px`;
  }
  if (typeof spacingInput === "string" || typeof spacingInput === "function" || Array.isArray(spacingInput)) {
    return spacingInput;
  }
  return "8px";
}
const silent = (fn) => {
  try {
    return fn();
  } catch (error) {
  }
  return void 0;
};
const createGetCssVar = (cssVarPrefix = "mui") => unstable_createGetCssVar(cssVarPrefix);
function attachColorScheme$1(colorSpace, colorSchemes, scheme, restTheme, colorScheme) {
  if (!scheme) {
    return void 0;
  }
  scheme = scheme === true ? {} : scheme;
  const mode = colorScheme === "dark" ? "dark" : "light";
  if (!restTheme) {
    colorSchemes[colorScheme] = createColorScheme({
      ...scheme,
      palette: {
        mode,
        ...scheme?.palette
      },
      colorSpace
    });
    return void 0;
  }
  const {
    palette,
    ...muiTheme
  } = createThemeNoVars({
    ...restTheme,
    palette: {
      mode,
      ...scheme?.palette
    },
    colorSpace
  });
  colorSchemes[colorScheme] = {
    ...scheme,
    palette,
    opacity: {
      ...getOpacity(mode),
      ...scheme?.opacity
    },
    overlays: scheme?.overlays || getOverlays(mode)
  };
  return muiTheme;
}
function createThemeWithVars(options = {}, ...args) {
  const {
    colorSchemes: colorSchemesInput = {
      light: true
    },
    defaultColorScheme: defaultColorSchemeInput,
    disableCssColorScheme = false,
    cssVarPrefix = "mui",
    nativeColor = false,
    shouldSkipGeneratingVar: shouldSkipGeneratingVar$1 = shouldSkipGeneratingVar,
    colorSchemeSelector: selector = colorSchemesInput.light && colorSchemesInput.dark ? "media" : void 0,
    rootSelector = ":root",
    ...input
  } = options;
  const firstColorScheme = Object.keys(colorSchemesInput)[0];
  const defaultColorScheme = defaultColorSchemeInput || (colorSchemesInput.light && firstColorScheme !== "light" ? "light" : firstColorScheme);
  const getCssVar = createGetCssVar(cssVarPrefix);
  const {
    [defaultColorScheme]: defaultSchemeInput,
    light: builtInLight,
    dark: builtInDark,
    ...customColorSchemes
  } = colorSchemesInput;
  const colorSchemes = {
    ...customColorSchemes
  };
  let defaultScheme = defaultSchemeInput;
  if (defaultColorScheme === "dark" && !("dark" in colorSchemesInput) || defaultColorScheme === "light" && !("light" in colorSchemesInput)) {
    defaultScheme = true;
  }
  if (!defaultScheme) {
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The \`colorSchemes.${defaultColorScheme}\` option is either missing or invalid.` : _formatErrorMessage(21, defaultColorScheme));
  }
  let colorSpace;
  if (nativeColor) {
    colorSpace = "oklch";
  }
  const muiTheme = attachColorScheme$1(colorSpace, colorSchemes, defaultScheme, input, defaultColorScheme);
  if (builtInLight && !colorSchemes.light) {
    attachColorScheme$1(colorSpace, colorSchemes, builtInLight, void 0, "light");
  }
  if (builtInDark && !colorSchemes.dark) {
    attachColorScheme$1(colorSpace, colorSchemes, builtInDark, void 0, "dark");
  }
  let theme = {
    defaultColorScheme,
    ...muiTheme,
    cssVarPrefix,
    colorSchemeSelector: selector,
    rootSelector,
    getCssVar,
    colorSchemes,
    font: {
      ...prepareTypographyVars(muiTheme.typography),
      ...muiTheme.font
    },
    spacing: getSpacingVal(input.spacing)
  };
  Object.keys(theme.colorSchemes).forEach((key) => {
    const palette = theme.colorSchemes[key].palette;
    const setCssVarColor = (cssVar) => {
      const tokens = cssVar.split("-");
      const color = tokens[1];
      const colorToken = tokens[2];
      return getCssVar(cssVar, palette[color][colorToken]);
    };
    if (palette.mode === "light") {
      setColor(palette.common, "background", "#fff");
      setColor(palette.common, "onBackground", "#000");
    }
    if (palette.mode === "dark") {
      setColor(palette.common, "background", "#000");
      setColor(palette.common, "onBackground", "#fff");
    }
    function colorMix(method, color, coefficient) {
      if (colorSpace) {
        let mixer;
        if (method === private_safeAlpha) {
          mixer = `transparent ${((1 - coefficient) * 100).toFixed(0)}%`;
        }
        if (method === private_safeDarken) {
          mixer = `#000 ${(coefficient * 100).toFixed(0)}%`;
        }
        if (method === private_safeLighten) {
          mixer = `#fff ${(coefficient * 100).toFixed(0)}%`;
        }
        return `color-mix(in ${colorSpace}, ${color}, ${mixer})`;
      }
      return method(color, coefficient);
    }
    assignNode(palette, ["Alert", "AppBar", "Avatar", "Button", "Chip", "FilledInput", "LinearProgress", "Skeleton", "Slider", "SnackbarContent", "SpeedDialAction", "StepConnector", "StepContent", "Switch", "TableCell", "Tooltip"]);
    if (palette.mode === "light") {
      setColor(palette.Alert, "errorColor", colorMix(private_safeDarken, nativeColor ? getCssVar("palette-error-light") : palette.error.light, 0.6));
      setColor(palette.Alert, "infoColor", colorMix(private_safeDarken, nativeColor ? getCssVar("palette-info-light") : palette.info.light, 0.6));
      setColor(palette.Alert, "successColor", colorMix(private_safeDarken, nativeColor ? getCssVar("palette-success-light") : palette.success.light, 0.6));
      setColor(palette.Alert, "warningColor", colorMix(private_safeDarken, nativeColor ? getCssVar("palette-warning-light") : palette.warning.light, 0.6));
      setColor(palette.Alert, "errorFilledBg", setCssVarColor("palette-error-main"));
      setColor(palette.Alert, "infoFilledBg", setCssVarColor("palette-info-main"));
      setColor(palette.Alert, "successFilledBg", setCssVarColor("palette-success-main"));
      setColor(palette.Alert, "warningFilledBg", setCssVarColor("palette-warning-main"));
      setColor(palette.Alert, "errorFilledColor", silent(() => palette.getContrastText(palette.error.main)));
      setColor(palette.Alert, "infoFilledColor", silent(() => palette.getContrastText(palette.info.main)));
      setColor(palette.Alert, "successFilledColor", silent(() => palette.getContrastText(palette.success.main)));
      setColor(palette.Alert, "warningFilledColor", silent(() => palette.getContrastText(palette.warning.main)));
      setColor(palette.Alert, "errorStandardBg", colorMix(private_safeLighten, nativeColor ? getCssVar("palette-error-light") : palette.error.light, 0.9));
      setColor(palette.Alert, "infoStandardBg", colorMix(private_safeLighten, nativeColor ? getCssVar("palette-info-light") : palette.info.light, 0.9));
      setColor(palette.Alert, "successStandardBg", colorMix(private_safeLighten, nativeColor ? getCssVar("palette-success-light") : palette.success.light, 0.9));
      setColor(palette.Alert, "warningStandardBg", colorMix(private_safeLighten, nativeColor ? getCssVar("palette-warning-light") : palette.warning.light, 0.9));
      setColor(palette.Alert, "errorIconColor", setCssVarColor("palette-error-main"));
      setColor(palette.Alert, "infoIconColor", setCssVarColor("palette-info-main"));
      setColor(palette.Alert, "successIconColor", setCssVarColor("palette-success-main"));
      setColor(palette.Alert, "warningIconColor", setCssVarColor("palette-warning-main"));
      setColor(palette.AppBar, "defaultBg", setCssVarColor("palette-grey-100"));
      setColor(palette.Avatar, "defaultBg", setCssVarColor("palette-grey-400"));
      setColor(palette.Button, "inheritContainedBg", setCssVarColor("palette-grey-300"));
      setColor(palette.Button, "inheritContainedHoverBg", setCssVarColor("palette-grey-A100"));
      setColor(palette.Chip, "defaultBorder", setCssVarColor("palette-grey-400"));
      setColor(palette.Chip, "defaultAvatarColor", setCssVarColor("palette-grey-700"));
      setColor(palette.Chip, "defaultIconColor", setCssVarColor("palette-grey-700"));
      setColor(palette.FilledInput, "bg", "rgba(0, 0, 0, 0.06)");
      setColor(palette.FilledInput, "hoverBg", "rgba(0, 0, 0, 0.09)");
      setColor(palette.FilledInput, "disabledBg", "rgba(0, 0, 0, 0.12)");
      setColor(palette.LinearProgress, "primaryBg", colorMix(private_safeLighten, nativeColor ? getCssVar("palette-primary-main") : palette.primary.main, 0.62));
      setColor(palette.LinearProgress, "secondaryBg", colorMix(private_safeLighten, nativeColor ? getCssVar("palette-secondary-main") : palette.secondary.main, 0.62));
      setColor(palette.LinearProgress, "errorBg", colorMix(private_safeLighten, nativeColor ? getCssVar("palette-error-main") : palette.error.main, 0.62));
      setColor(palette.LinearProgress, "infoBg", colorMix(private_safeLighten, nativeColor ? getCssVar("palette-info-main") : palette.info.main, 0.62));
      setColor(palette.LinearProgress, "successBg", colorMix(private_safeLighten, nativeColor ? getCssVar("palette-success-main") : palette.success.main, 0.62));
      setColor(palette.LinearProgress, "warningBg", colorMix(private_safeLighten, nativeColor ? getCssVar("palette-warning-light") : palette.warning.main, 0.62));
      setColor(palette.Skeleton, "bg", colorSpace ? colorMix(private_safeAlpha, nativeColor ? getCssVar("palette-text-primary") : palette.text.primary, 0.11) : `rgba(${setCssVarColor("palette-text-primaryChannel")} / 0.11)`);
      setColor(palette.Slider, "primaryTrack", colorMix(private_safeLighten, nativeColor ? getCssVar("palette-primary-main") : palette.primary.main, 0.62));
      setColor(palette.Slider, "secondaryTrack", colorMix(private_safeLighten, nativeColor ? getCssVar("palette-secondary-main") : palette.secondary.main, 0.62));
      setColor(palette.Slider, "errorTrack", colorMix(private_safeLighten, nativeColor ? getCssVar("palette-error-main") : palette.error.main, 0.62));
      setColor(palette.Slider, "infoTrack", colorMix(private_safeLighten, nativeColor ? getCssVar("palette-info-main") : palette.info.main, 0.62));
      setColor(palette.Slider, "successTrack", colorMix(private_safeLighten, nativeColor ? getCssVar("palette-success-main") : palette.success.main, 0.62));
      setColor(palette.Slider, "warningTrack", colorMix(private_safeLighten, nativeColor ? getCssVar("palette-warning-main") : palette.warning.main, 0.62));
      const snackbarContentBackground = colorSpace ? colorMix(private_safeDarken, nativeColor ? getCssVar("palette-background-default") : palette.background.default, 0.6825) : private_safeEmphasize(palette.background.default, 0.8);
      setColor(palette.SnackbarContent, "bg", snackbarContentBackground);
      setColor(palette.SnackbarContent, "color", silent(() => colorSpace ? dark.text.primary : palette.getContrastText(snackbarContentBackground)));
      setColor(palette.SpeedDialAction, "fabHoverBg", private_safeEmphasize(palette.background.paper, 0.15));
      setColor(palette.StepConnector, "border", setCssVarColor("palette-grey-400"));
      setColor(palette.StepContent, "border", setCssVarColor("palette-grey-400"));
      setColor(palette.Switch, "defaultColor", setCssVarColor("palette-common-white"));
      setColor(palette.Switch, "defaultDisabledColor", setCssVarColor("palette-grey-100"));
      setColor(palette.Switch, "primaryDisabledColor", colorMix(private_safeLighten, nativeColor ? getCssVar("palette-primary-main") : palette.primary.main, 0.62));
      setColor(palette.Switch, "secondaryDisabledColor", colorMix(private_safeLighten, nativeColor ? getCssVar("palette-secondary-main") : palette.secondary.main, 0.62));
      setColor(palette.Switch, "errorDisabledColor", colorMix(private_safeLighten, nativeColor ? getCssVar("palette-error-main") : palette.error.main, 0.62));
      setColor(palette.Switch, "infoDisabledColor", colorMix(private_safeLighten, nativeColor ? getCssVar("palette-info-main") : palette.info.main, 0.62));
      setColor(palette.Switch, "successDisabledColor", colorMix(private_safeLighten, nativeColor ? getCssVar("palette-success-main") : palette.success.main, 0.62));
      setColor(palette.Switch, "warningDisabledColor", colorMix(private_safeLighten, nativeColor ? getCssVar("palette-warning-main") : palette.warning.main, 0.62));
      setColor(palette.TableCell, "border", colorMix(private_safeLighten, private_safeAlpha(nativeColor ? getCssVar("palette-divider") : palette.divider, 1), 0.88));
      setColor(palette.Tooltip, "bg", colorMix(private_safeAlpha, nativeColor ? getCssVar("palette-grey-700") : palette.grey[700], 0.92));
    }
    if (palette.mode === "dark") {
      setColor(palette.Alert, "errorColor", colorMix(private_safeLighten, nativeColor ? getCssVar("palette-error-light") : palette.error.light, 0.6));
      setColor(palette.Alert, "infoColor", colorMix(private_safeLighten, nativeColor ? getCssVar("palette-info-light") : palette.info.light, 0.6));
      setColor(palette.Alert, "successColor", colorMix(private_safeLighten, nativeColor ? getCssVar("palette-success-light") : palette.success.light, 0.6));
      setColor(palette.Alert, "warningColor", colorMix(private_safeLighten, nativeColor ? getCssVar("palette-warning-light") : palette.warning.light, 0.6));
      setColor(palette.Alert, "errorFilledBg", setCssVarColor("palette-error-dark"));
      setColor(palette.Alert, "infoFilledBg", setCssVarColor("palette-info-dark"));
      setColor(palette.Alert, "successFilledBg", setCssVarColor("palette-success-dark"));
      setColor(palette.Alert, "warningFilledBg", setCssVarColor("palette-warning-dark"));
      setColor(palette.Alert, "errorFilledColor", silent(() => palette.getContrastText(palette.error.dark)));
      setColor(palette.Alert, "infoFilledColor", silent(() => palette.getContrastText(palette.info.dark)));
      setColor(palette.Alert, "successFilledColor", silent(() => palette.getContrastText(palette.success.dark)));
      setColor(palette.Alert, "warningFilledColor", silent(() => palette.getContrastText(palette.warning.dark)));
      setColor(palette.Alert, "errorStandardBg", colorMix(private_safeDarken, nativeColor ? getCssVar("palette-error-light") : palette.error.light, 0.9));
      setColor(palette.Alert, "infoStandardBg", colorMix(private_safeDarken, nativeColor ? getCssVar("palette-info-light") : palette.info.light, 0.9));
      setColor(palette.Alert, "successStandardBg", colorMix(private_safeDarken, nativeColor ? getCssVar("palette-success-light") : palette.success.light, 0.9));
      setColor(palette.Alert, "warningStandardBg", colorMix(private_safeDarken, nativeColor ? getCssVar("palette-warning-light") : palette.warning.light, 0.9));
      setColor(palette.Alert, "errorIconColor", setCssVarColor("palette-error-main"));
      setColor(palette.Alert, "infoIconColor", setCssVarColor("palette-info-main"));
      setColor(palette.Alert, "successIconColor", setCssVarColor("palette-success-main"));
      setColor(palette.Alert, "warningIconColor", setCssVarColor("palette-warning-main"));
      setColor(palette.AppBar, "defaultBg", setCssVarColor("palette-grey-900"));
      setColor(palette.AppBar, "darkBg", setCssVarColor("palette-background-paper"));
      setColor(palette.AppBar, "darkColor", setCssVarColor("palette-text-primary"));
      setColor(palette.Avatar, "defaultBg", setCssVarColor("palette-grey-600"));
      setColor(palette.Button, "inheritContainedBg", setCssVarColor("palette-grey-800"));
      setColor(palette.Button, "inheritContainedHoverBg", setCssVarColor("palette-grey-700"));
      setColor(palette.Chip, "defaultBorder", setCssVarColor("palette-grey-700"));
      setColor(palette.Chip, "defaultAvatarColor", setCssVarColor("palette-grey-300"));
      setColor(palette.Chip, "defaultIconColor", setCssVarColor("palette-grey-300"));
      setColor(palette.FilledInput, "bg", "rgba(255, 255, 255, 0.09)");
      setColor(palette.FilledInput, "hoverBg", "rgba(255, 255, 255, 0.13)");
      setColor(palette.FilledInput, "disabledBg", "rgba(255, 255, 255, 0.12)");
      setColor(palette.LinearProgress, "primaryBg", colorMix(private_safeDarken, nativeColor ? getCssVar("palette-primary-main") : palette.primary.main, 0.5));
      setColor(palette.LinearProgress, "secondaryBg", colorMix(private_safeDarken, nativeColor ? getCssVar("palette-secondary-main") : palette.secondary.main, 0.5));
      setColor(palette.LinearProgress, "errorBg", colorMix(private_safeDarken, nativeColor ? getCssVar("palette-error-main") : palette.error.main, 0.5));
      setColor(palette.LinearProgress, "infoBg", colorMix(private_safeDarken, nativeColor ? getCssVar("palette-info-main") : palette.info.main, 0.5));
      setColor(palette.LinearProgress, "successBg", colorMix(private_safeDarken, nativeColor ? getCssVar("palette-success-main") : palette.success.main, 0.5));
      setColor(palette.LinearProgress, "warningBg", colorMix(private_safeDarken, nativeColor ? getCssVar("palette-warning-main") : palette.warning.main, 0.5));
      setColor(palette.Skeleton, "bg", colorSpace ? colorMix(private_safeAlpha, nativeColor ? getCssVar("palette-text-primary") : palette.text.primary, 0.13) : `rgba(${setCssVarColor("palette-text-primaryChannel")} / 0.13)`);
      setColor(palette.Slider, "primaryTrack", colorMix(private_safeDarken, nativeColor ? getCssVar("palette-primary-main") : palette.primary.main, 0.5));
      setColor(palette.Slider, "secondaryTrack", colorMix(private_safeDarken, nativeColor ? getCssVar("palette-secondary-main") : palette.secondary.main, 0.5));
      setColor(palette.Slider, "errorTrack", colorMix(private_safeDarken, nativeColor ? getCssVar("palette-error-main") : palette.error.main, 0.5));
      setColor(palette.Slider, "infoTrack", colorMix(private_safeDarken, nativeColor ? getCssVar("palette-info-main") : palette.info.main, 0.5));
      setColor(palette.Slider, "successTrack", colorMix(private_safeDarken, nativeColor ? getCssVar("palette-success-main") : palette.success.main, 0.5));
      setColor(palette.Slider, "warningTrack", colorMix(private_safeDarken, nativeColor ? getCssVar("palette-warning-light") : palette.warning.main, 0.5));
      const snackbarContentBackground = colorSpace ? colorMix(private_safeLighten, nativeColor ? getCssVar("palette-background-default") : palette.background.default, 0.985) : private_safeEmphasize(palette.background.default, 0.98);
      setColor(palette.SnackbarContent, "bg", snackbarContentBackground);
      setColor(palette.SnackbarContent, "color", silent(() => colorSpace ? light.text.primary : palette.getContrastText(snackbarContentBackground)));
      setColor(palette.SpeedDialAction, "fabHoverBg", private_safeEmphasize(palette.background.paper, 0.15));
      setColor(palette.StepConnector, "border", setCssVarColor("palette-grey-600"));
      setColor(palette.StepContent, "border", setCssVarColor("palette-grey-600"));
      setColor(palette.Switch, "defaultColor", setCssVarColor("palette-grey-300"));
      setColor(palette.Switch, "defaultDisabledColor", setCssVarColor("palette-grey-600"));
      setColor(palette.Switch, "primaryDisabledColor", colorMix(private_safeDarken, nativeColor ? getCssVar("palette-primary-main") : palette.primary.main, 0.55));
      setColor(palette.Switch, "secondaryDisabledColor", colorMix(private_safeDarken, nativeColor ? getCssVar("palette-secondary-main") : palette.secondary.main, 0.55));
      setColor(palette.Switch, "errorDisabledColor", colorMix(private_safeDarken, nativeColor ? getCssVar("palette-error-main") : palette.error.main, 0.55));
      setColor(palette.Switch, "infoDisabledColor", colorMix(private_safeDarken, nativeColor ? getCssVar("palette-info-main") : palette.info.main, 0.55));
      setColor(palette.Switch, "successDisabledColor", colorMix(private_safeDarken, nativeColor ? getCssVar("palette-success-main") : palette.success.main, 0.55));
      setColor(palette.Switch, "warningDisabledColor", colorMix(private_safeDarken, nativeColor ? getCssVar("palette-warning-light") : palette.warning.main, 0.55));
      setColor(palette.TableCell, "border", colorMix(private_safeDarken, private_safeAlpha(nativeColor ? getCssVar("palette-divider") : palette.divider, 1), 0.68));
      setColor(palette.Tooltip, "bg", colorMix(private_safeAlpha, nativeColor ? getCssVar("palette-grey-700") : palette.grey[700], 0.92));
    }
    if (!nativeColor) {
      setColorChannel(palette.background, "default");
      setColorChannel(palette.background, "paper");
      setColorChannel(palette.common, "background");
      setColorChannel(palette.common, "onBackground");
      setColorChannel(palette, "divider");
    }
    Object.keys(palette).forEach((color) => {
      const colors2 = palette[color];
      if (color !== "tonalOffset" && !nativeColor && colors2 && typeof colors2 === "object") {
        if (colors2.main) {
          setColor(palette[color], "mainChannel", private_safeColorChannel(toRgb(colors2.main)));
        }
        if (colors2.light) {
          setColor(palette[color], "lightChannel", private_safeColorChannel(toRgb(colors2.light)));
        }
        if (colors2.dark) {
          setColor(palette[color], "darkChannel", private_safeColorChannel(toRgb(colors2.dark)));
        }
        if (colors2.contrastText) {
          setColor(palette[color], "contrastTextChannel", private_safeColorChannel(toRgb(colors2.contrastText)));
        }
        if (color === "text") {
          setColorChannel(palette[color], "primary");
          setColorChannel(palette[color], "secondary");
        }
        if (color === "action") {
          if (colors2.active) {
            setColorChannel(palette[color], "active");
          }
          if (colors2.selected) {
            setColorChannel(palette[color], "selected");
          }
        }
      }
    });
  });
  theme = args.reduce((acc, argument) => deepmerge(acc, argument), theme);
  const parserConfig = {
    prefix: cssVarPrefix,
    disableCssColorScheme,
    shouldSkipGeneratingVar: shouldSkipGeneratingVar$1,
    getSelector: defaultGetSelector(theme),
    enableContrastVars: nativeColor
  };
  const {
    vars,
    generateThemeVars,
    generateStyleSheets
  } = prepareCssVars(theme, parserConfig);
  theme.vars = vars;
  Object.entries(theme.colorSchemes[theme.defaultColorScheme]).forEach(([key, value]) => {
    theme[key] = value;
  });
  theme.generateThemeVars = generateThemeVars;
  theme.generateStyleSheets = generateStyleSheets;
  theme.generateSpacing = function generateSpacing() {
    return createSpacing(input.spacing, createUnarySpacing(this));
  };
  theme.getColorSchemeSelector = createGetColorSchemeSelector(selector);
  theme.spacing = theme.generateSpacing();
  theme.shouldSkipGeneratingVar = shouldSkipGeneratingVar$1;
  theme.unstable_sxConfig = {
    ...unstable_defaultSxConfig,
    ...input?.unstable_sxConfig
  };
  theme.unstable_sx = function sx(props) {
    return styleFunctionSx({
      sx: props,
      theme: this
    });
  };
  theme.internal_cache = {};
  theme.toRuntimeSource = stringifyTheme;
  return theme;
}
function attachColorScheme(theme, scheme, colorScheme) {
  if (!theme.colorSchemes) {
    return void 0;
  }
  if (colorScheme) {
    theme.colorSchemes[scheme] = {
      ...colorScheme !== true && colorScheme,
      palette: createPalette({
        ...colorScheme === true ? {} : colorScheme.palette,
        mode: scheme
      })
      // cast type to skip module augmentation test
    };
  }
}
function createTheme(options = {}, ...args) {
  const {
    palette,
    cssVariables = false,
    colorSchemes: initialColorSchemes = !palette ? {
      light: true
    } : void 0,
    defaultColorScheme: initialDefaultColorScheme = palette?.mode,
    ...other
  } = options;
  const defaultColorSchemeInput = initialDefaultColorScheme || "light";
  const defaultScheme = initialColorSchemes?.[defaultColorSchemeInput];
  const colorSchemesInput = {
    ...initialColorSchemes,
    ...palette ? {
      [defaultColorSchemeInput]: {
        ...typeof defaultScheme !== "boolean" && defaultScheme,
        palette
      }
    } : void 0
  };
  if (cssVariables === false) {
    if (!("colorSchemes" in options)) {
      return createThemeNoVars(options, ...args);
    }
    let paletteOptions = palette;
    if (!("palette" in options)) {
      if (colorSchemesInput[defaultColorSchemeInput]) {
        if (colorSchemesInput[defaultColorSchemeInput] !== true) {
          paletteOptions = colorSchemesInput[defaultColorSchemeInput].palette;
        } else if (defaultColorSchemeInput === "dark") {
          paletteOptions = {
            mode: "dark"
          };
        }
      }
    }
    const theme = createThemeNoVars({
      ...options,
      palette: paletteOptions
    }, ...args);
    theme.defaultColorScheme = defaultColorSchemeInput;
    theme.colorSchemes = colorSchemesInput;
    if (theme.palette.mode === "light") {
      theme.colorSchemes.light = {
        ...colorSchemesInput.light !== true && colorSchemesInput.light,
        palette: theme.palette
      };
      attachColorScheme(theme, "dark", colorSchemesInput.dark);
    }
    if (theme.palette.mode === "dark") {
      theme.colorSchemes.dark = {
        ...colorSchemesInput.dark !== true && colorSchemesInput.dark,
        palette: theme.palette
      };
      attachColorScheme(theme, "light", colorSchemesInput.light);
    }
    return theme;
  }
  if (!palette && !("light" in colorSchemesInput) && defaultColorSchemeInput === "light") {
    colorSchemesInput.light = true;
  }
  return createThemeWithVars({
    ...other,
    colorSchemes: colorSchemesInput,
    defaultColorScheme: defaultColorSchemeInput,
    ...typeof cssVariables !== "boolean" && cssVariables
  }, ...args);
}
function getAccordionSummaryUtilityClass(slot) {
  return generateUtilityClass("MuiAccordionSummary", slot);
}
const accordionSummaryClasses = generateUtilityClasses("MuiAccordionSummary", ["root", "expanded", "focusVisible", "disabled", "gutters", "content", "expandIconWrapper"]);
function getCheckboxUtilityClass(slot) {
  return generateUtilityClass("MuiCheckbox", slot);
}
const checkboxClasses = generateUtilityClasses("MuiCheckbox", ["root", "checked", "disabled", "indeterminate", "colorPrimary", "colorSecondary", "sizeSmall", "sizeMedium"]);
function getStyleValue(value) {
  return parseInt(value, 10) || 0;
}
const styles$3 = {
  shadow: {
    // Visibility needed to hide the extra text area on iPads
    visibility: "hidden",
    // Remove from the content flow
    position: "absolute",
    // Ignore the scrollbar width
    overflow: "hidden",
    height: 0,
    top: 0,
    left: 0,
    // Create a new layer, increase the isolation of the computed values
    transform: "translateZ(0)"
  }
};
function isObjectEmpty(object) {
  for (const _ in object) {
    return false;
  }
  return true;
}
function isEmpty$1(obj) {
  return isObjectEmpty(obj) || obj.outerHeightStyle === 0 && !obj.overflowing;
}
const TextareaAutosize = /* @__PURE__ */ React.forwardRef(function TextareaAutosize2(props, forwardedRef) {
  const {
    onChange,
    maxRows,
    minRows = 1,
    style,
    value,
    ...other
  } = props;
  const {
    current: isControlled
  } = React.useRef(value != null);
  const textareaRef = React.useRef(null);
  const handleRef = useForkRef(forwardedRef, textareaRef);
  const heightRef = React.useRef(null);
  const hiddenTextareaRef = React.useRef(null);
  const calculateTextareaStyles = React.useCallback(() => {
    const textarea = textareaRef.current;
    const hiddenTextarea = hiddenTextareaRef.current;
    if (!textarea || !hiddenTextarea) {
      return void 0;
    }
    const containerWindow = ownerWindow(textarea);
    const computedStyle = containerWindow.getComputedStyle(textarea);
    if (computedStyle.width === "0px") {
      return {
        outerHeightStyle: 0,
        overflowing: false
      };
    }
    hiddenTextarea.style.width = computedStyle.width;
    hiddenTextarea.value = textarea.value || props.placeholder || "x";
    if (hiddenTextarea.value.slice(-1) === "\n") {
      hiddenTextarea.value += " ";
    }
    const boxSizing = computedStyle.boxSizing;
    const padding = getStyleValue(computedStyle.paddingBottom) + getStyleValue(computedStyle.paddingTop);
    const border = getStyleValue(computedStyle.borderBottomWidth) + getStyleValue(computedStyle.borderTopWidth);
    const innerHeight = hiddenTextarea.scrollHeight;
    hiddenTextarea.value = "x";
    const singleRowHeight = hiddenTextarea.scrollHeight;
    let outerHeight = innerHeight;
    if (minRows) {
      outerHeight = Math.max(Number(minRows) * singleRowHeight, outerHeight);
    }
    if (maxRows) {
      outerHeight = Math.min(Number(maxRows) * singleRowHeight, outerHeight);
    }
    outerHeight = Math.max(outerHeight, singleRowHeight);
    const outerHeightStyle = outerHeight + (boxSizing === "border-box" ? padding + border : 0);
    const overflowing = Math.abs(outerHeight - innerHeight) <= 1;
    return {
      outerHeightStyle,
      overflowing
    };
  }, [maxRows, minRows, props.placeholder]);
  const didHeightChange = useEventCallback(() => {
    const textarea = textareaRef.current;
    const textareaStyles = calculateTextareaStyles();
    if (!textarea || !textareaStyles || isEmpty$1(textareaStyles)) {
      return false;
    }
    const outerHeightStyle = textareaStyles.outerHeightStyle;
    return heightRef.current != null && heightRef.current !== outerHeightStyle;
  });
  const syncHeight = React.useCallback(() => {
    const textarea = textareaRef.current;
    const textareaStyles = calculateTextareaStyles();
    if (!textarea || !textareaStyles || isEmpty$1(textareaStyles)) {
      return;
    }
    const outerHeightStyle = textareaStyles.outerHeightStyle;
    if (heightRef.current !== outerHeightStyle) {
      heightRef.current = outerHeightStyle;
      textarea.style.height = `${outerHeightStyle}px`;
    }
    textarea.style.overflow = textareaStyles.overflowing ? "hidden" : "";
  }, [calculateTextareaStyles]);
  const frameRef = React.useRef(-1);
  useEnhancedEffect(() => {
    const debouncedHandleResize = debounce(syncHeight);
    const textarea = textareaRef?.current;
    if (!textarea) {
      return void 0;
    }
    const containerWindow = ownerWindow(textarea);
    containerWindow.addEventListener("resize", debouncedHandleResize);
    let resizeObserver;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        if (didHeightChange()) {
          resizeObserver.unobserve(textarea);
          cancelAnimationFrame(frameRef.current);
          syncHeight();
          frameRef.current = requestAnimationFrame(() => {
            resizeObserver.observe(textarea);
          });
        }
      });
      resizeObserver.observe(textarea);
    }
    return () => {
      debouncedHandleResize.clear();
      cancelAnimationFrame(frameRef.current);
      containerWindow.removeEventListener("resize", debouncedHandleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [calculateTextareaStyles, syncHeight, didHeightChange]);
  useEnhancedEffect(() => {
    syncHeight();
  });
  const handleChange = (event) => {
    if (!isControlled) {
      syncHeight();
    }
    const textarea = event.target;
    const countOfCharacters = textarea.value.length;
    const isLastCharacterNewLine = textarea.value.endsWith("\n");
    const isEndOfTheLine = textarea.selectionStart === countOfCharacters;
    if (isLastCharacterNewLine && isEndOfTheLine) {
      textarea.setSelectionRange(countOfCharacters, countOfCharacters);
    }
    if (onChange) {
      onChange(event);
    }
  };
  return /* @__PURE__ */ jsxs(React.Fragment, {
    children: [/* @__PURE__ */ jsx("textarea", {
      value,
      onChange: handleChange,
      ref: handleRef,
      rows: minRows,
      style,
      ...other
    }), /* @__PURE__ */ jsx("textarea", {
      "aria-hidden": true,
      className: props.className,
      readOnly: true,
      ref: hiddenTextareaRef,
      tabIndex: -1,
      style: {
        ...styles$3.shadow,
        ...style,
        paddingTop: 0,
        paddingBottom: 0
      }
    })]
  });
});
process.env.NODE_ENV !== "production" ? TextareaAutosize.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Maximum number of rows to display.
   */
  maxRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Minimum number of rows to display.
   * @default 1
   */
  minRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  placeholder: PropTypes.string,
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * @ignore
   */
  value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.number, PropTypes.string])
} : void 0;
const FormControlContext = /* @__PURE__ */ React.createContext(void 0);
if (process.env.NODE_ENV !== "production") {
  FormControlContext.displayName = "FormControlContext";
}
function useFormControl() {
  return React.useContext(FormControlContext);
}
function useFormControlState({
  props,
  states
}) {
  const muiFormControl = React.useContext(FormControlContext);
  const result = {};
  states.forEach((state) => {
    const value = props[state];
    result[state] = value === void 0 && muiFormControl ? muiFormControl[state] : value;
  });
  return [result, muiFormControl];
}
const defaultTheme$1 = createTheme();
function useTheme() {
  const theme = useTheme$1(defaultTheme$1);
  if (process.env.NODE_ENV !== "production") {
    React.useDebugValue(theme);
  }
  return theme[THEME_ID] || theme;
}
function GlobalStyles(props) {
  return /* @__PURE__ */ jsx(GlobalStyles$1, {
    ...props,
    defaultTheme: defaultTheme$1,
    themeId: THEME_ID
  });
}
process.env.NODE_ENV !== "production" ? GlobalStyles.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The styles you want to apply globally.
   */
  styles: PropTypes.oneOfType([PropTypes.array, PropTypes.func, PropTypes.number, PropTypes.object, PropTypes.string, PropTypes.bool])
} : void 0;
function slotShouldForwardProp(prop) {
  return prop !== "ownerState" && prop !== "theme" && prop !== "sx" && prop !== "as";
}
const rootShouldForwardProp = (prop) => slotShouldForwardProp(prop) && prop !== "classes";
const styled = createStyled({
  themeId: THEME_ID,
  defaultTheme: defaultTheme$1,
  rootShouldForwardProp
});
function globalCss(styles2) {
  return function GlobalStylesWrapper(props) {
    return (
      // Pigment CSS `globalCss` support callback with theme inside an object but `GlobalStyles` support theme as a callback value.
      /* @__PURE__ */ jsx(GlobalStyles, {
        styles: typeof styles2 === "function" ? (theme) => styles2({
          theme,
          ...props
        }) : styles2
      })
    );
  };
}
const memoTheme = unstable_memoTheme;
process.env.NODE_ENV !== "production" ? {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  value: PropTypes.object.isRequired
} : void 0;
function useDefaultProps(params) {
  return useDefaultProps$1(params);
}
function hasValue(value) {
  return value != null && !(Array.isArray(value) && value.length === 0);
}
function isFilled(obj, SSR = false) {
  return obj && (hasValue(obj.value) && obj.value !== "" || SSR && hasValue(obj.defaultValue) && obj.defaultValue !== "");
}
function isAdornedStart(obj) {
  return obj.startAdornment;
}
function getInputBaseUtilityClass(slot) {
  return generateUtilityClass("MuiInputBase", slot);
}
const inputBaseClasses = generateUtilityClasses("MuiInputBase", ["root", "formControl", "focused", "disabled", "adornedStart", "adornedEnd", "error", "sizeSmall", "multiline", "colorSecondary", "fullWidth", "hiddenLabel", "readOnly", "input", "inputTypeSearch"]);
const defaultStyles = {
  transition: "none"
};
function resolveReducedMotionStyles(reducedMotion, styles2) {
  if (reducedMotion === "always") {
    return styles2;
  }
  if (reducedMotion === "system") {
    return {
      "@media (prefers-reduced-motion: reduce)": styles2
    };
  }
  return null;
}
const reflow = (node) => node.scrollTop;
const EMPTY_STYLE = {};
const DEFAULT_TRANSITION_PROPS = ["all"];
const EMPTY_OPTIONS = {};
function normalizedTransitionCallback(nodeRef, callback) {
  return (maybeIsAppearing) => {
    if (callback) {
      const node = nodeRef.current;
      if (maybeIsAppearing === void 0) {
        callback(node);
      } else {
        callback(node, maybeIsAppearing);
      }
    }
  };
}
function getTransitionChildStyle(state, inProp, baseStyles, hiddenStyles2, styleProp, childStyle) {
  const base = state === "exited" && !inProp ? hiddenStyles2 : baseStyles[state] || baseStyles.exited;
  return styleProp || childStyle ? {
    ...base,
    ...styleProp,
    ...childStyle
  } : base;
}
function getTransitionProps(props, options) {
  const {
    timeout,
    easing: easing2,
    style = EMPTY_STYLE
  } = props;
  return {
    duration: style.transitionDuration ?? (typeof timeout === "number" ? timeout : timeout[options.mode] || 0),
    easing: style.transitionTimingFunction ?? (typeof easing2 === "object" ? easing2[options.mode] : easing2),
    delay: style.transitionDelay
  };
}
function getReducedMotionStyles(theme, styles2) {
  const resolvedStyles = styles2 ?? defaultStyles;
  return resolveReducedMotionStyles(theme.motion?.reducedMotion, resolvedStyles);
}
function getTransitionStyles(theme, props = DEFAULT_TRANSITION_PROPS, options = EMPTY_OPTIONS) {
  const transition = theme.transitions?.create?.(props, options);
  const reducedMotionStyles = getReducedMotionStyles(theme);
  if (transition === void 0) {
    return reducedMotionStyles ?? EMPTY_STYLE;
  }
  const transitionStyles = {
    transition
  };
  return reducedMotionStyles ? {
    ...transitionStyles,
    ...reducedMotionStyles
  } : transitionStyles;
}
var _InputGlobalStyles;
const MUI_AUTO_FILL = "mui-auto-fill";
const MUI_AUTO_FILL_CANCEL = "mui-auto-fill-cancel";
const rootOverridesResolver = (props, styles2) => {
  const {
    ownerState
  } = props;
  return [styles2.root, ownerState.formControl && styles2.formControl, ownerState.startAdornment && styles2.adornedStart, ownerState.endAdornment && styles2.adornedEnd, ownerState.error && styles2.error, ownerState.size === "small" && styles2.sizeSmall, ownerState.multiline && styles2.multiline, ownerState.color && styles2[`color${capitalize(ownerState.color)}`], ownerState.fullWidth && styles2.fullWidth, ownerState.hiddenLabel && styles2.hiddenLabel];
};
const inputOverridesResolver = (props, styles2) => {
  const {
    ownerState
  } = props;
  return [styles2.input, ownerState.type === "search" && styles2.inputTypeSearch];
};
const useUtilityClasses$Z = (ownerState) => {
  const {
    classes,
    color,
    disabled,
    error,
    endAdornment,
    focused,
    formControl,
    fullWidth,
    hiddenLabel,
    multiline,
    readOnly,
    size,
    startAdornment,
    type
  } = ownerState;
  const slots = {
    root: ["root", `color${capitalize(color)}`, disabled && "disabled", error && "error", fullWidth && "fullWidth", focused && "focused", formControl && "formControl", size && size !== "medium" && `size${capitalize(size)}`, multiline && "multiline", startAdornment && "adornedStart", endAdornment && "adornedEnd", hiddenLabel && "hiddenLabel", readOnly && "readOnly"],
    input: ["input", disabled && "disabled", type === "search" && "inputTypeSearch", readOnly && "readOnly"]
  };
  return composeClasses(slots, getInputBaseUtilityClass, classes);
};
const InputBaseRoot = styled("div", {
  name: "MuiInputBase",
  slot: "Root",
  overridesResolver: rootOverridesResolver
})(memoTheme(({
  theme
}) => ({
  ...theme.typography.body1,
  color: (theme.vars || theme).palette.text.primary,
  lineHeight: "1.4375em",
  // 23px
  boxSizing: "border-box",
  // Prevent padding issue with fullWidth.
  position: "relative",
  cursor: "text",
  display: "inline-flex",
  alignItems: "center",
  [`&.${inputBaseClasses.disabled}`]: {
    color: (theme.vars || theme).palette.text.disabled,
    cursor: "default"
  },
  variants: [{
    props: ({
      ownerState
    }) => ownerState.multiline,
    style: {
      padding: "4px 0 5px"
    }
  }, {
    props: ({
      ownerState,
      size
    }) => ownerState.multiline && size === "small",
    style: {
      paddingTop: 1
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.fullWidth,
    style: {
      width: "100%"
    }
  }]
})));
const InputBaseInput = styled("input", {
  name: "MuiInputBase",
  slot: "Input",
  overridesResolver: inputOverridesResolver
})(memoTheme(({
  theme
}) => {
  const light2 = theme.palette.mode === "light";
  const placeholder = {
    color: "currentColor",
    ...theme.vars ? {
      opacity: theme.vars.opacity.inputPlaceholder
    } : {
      opacity: light2 ? 0.42 : 0.5
    },
    ...getTransitionStyles(theme, "opacity", {
      duration: theme.transitions.duration.shorter
    })
  };
  const placeholderHidden = {
    opacity: "0 !important"
  };
  const placeholderVisible = theme.vars ? {
    opacity: theme.vars.opacity.inputPlaceholder
  } : {
    opacity: light2 ? 0.42 : 0.5
  };
  return {
    font: "inherit",
    letterSpacing: "inherit",
    color: "currentColor",
    padding: "4px 0 5px",
    border: 0,
    boxSizing: "content-box",
    background: "none",
    height: "1.4375em",
    // Reset 23pxthe native input line-height
    margin: 0,
    // Reset for Safari
    WebkitTapHighlightColor: "transparent",
    display: "block",
    // Make the flex item shrink with Firefox
    minWidth: 0,
    width: "100%",
    "&::-webkit-input-placeholder": placeholder,
    "&::-moz-placeholder": placeholder,
    // Firefox 19+
    "&::-ms-input-placeholder": placeholder,
    // Edge
    "&:focus": {
      outline: 0
    },
    // Reset Firefox invalid required input style
    "&:invalid": {
      boxShadow: "none"
    },
    "&::-webkit-search-decoration": {
      // Remove the padding when type=search.
      WebkitAppearance: "none"
    },
    // Show and hide the placeholder logic
    [`label[data-shrink=false] + .${inputBaseClasses.formControl} &`]: {
      "&::-webkit-input-placeholder": placeholderHidden,
      "&::-moz-placeholder": placeholderHidden,
      // Firefox 19+
      "&::-ms-input-placeholder": placeholderHidden,
      // Edge
      "&:focus::-webkit-input-placeholder": placeholderVisible,
      "&:focus::-moz-placeholder": placeholderVisible,
      // Firefox 19+
      "&:focus::-ms-input-placeholder": placeholderVisible
      // Edge
    },
    [`&.${inputBaseClasses.disabled}`]: {
      opacity: 1,
      // Reset iOS opacity
      WebkitTextFillColor: (theme.vars || theme).palette.text.disabled
      // Fix opacity Safari bug
    },
    variants: [{
      props: ({
        ownerState
      }) => !ownerState.disableInjectingGlobalStyles,
      style: {
        animationName: MUI_AUTO_FILL_CANCEL,
        animationDuration: "10ms",
        "&:-webkit-autofill": {
          animationDuration: "5000s",
          animationName: MUI_AUTO_FILL
        }
      }
    }, {
      props: {
        size: "small"
      },
      style: {
        paddingTop: 1
      }
    }, {
      props: ({
        ownerState
      }) => ownerState.multiline,
      style: {
        height: "auto",
        resize: "none",
        padding: 0,
        paddingTop: 0
      }
    }, {
      props: {
        type: "search"
      },
      style: {
        MozAppearance: "textfield"
        // Improve type search style.
      }
    }]
  };
}));
const InputGlobalStyles = globalCss({
  // Keep keyframes non-empty for Emotion production builds. Animation properties are ignored
  // inside keyframes, avoiding the visible display animation triggered by Chrome 117+.
  [`@keyframes ${MUI_AUTO_FILL}`]: {
    from: {
      animationName: MUI_AUTO_FILL
    }
  },
  [`@keyframes ${MUI_AUTO_FILL_CANCEL}`]: {
    from: {
      animationName: MUI_AUTO_FILL_CANCEL
    }
  }
});
const InputBase = /* @__PURE__ */ React.forwardRef(function InputBase2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiInputBase"
  });
  const {
    "aria-describedby": ariaDescribedby,
    "aria-label": ariaLabel,
    autoComplete,
    autoFocus,
    className,
    color,
    defaultValue,
    disabled,
    disableInjectingGlobalStyles,
    endAdornment,
    error,
    fullWidth = false,
    id,
    inputComponent = "input",
    inputProps: inputPropsProp = {},
    inputRef: inputRefProp,
    margin,
    maxRows,
    minRows,
    multiline = false,
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    onKeyDown,
    onKeyUp,
    placeholder,
    readOnly,
    renderSuffix,
    rows,
    size,
    slotProps = {},
    slots = {},
    startAdornment,
    type = "text",
    value: valueProp,
    ...other
  } = props;
  const value = inputPropsProp.value != null ? inputPropsProp.value : valueProp;
  const {
    current: isControlled
  } = React.useRef(value != null);
  const inputRef = React.useRef();
  const handleInputRefWarning = React.useCallback((instance) => {
    if (process.env.NODE_ENV !== "production") {
      if (instance && instance.nodeName !== "INPUT" && !instance.focus) {
        console.error(["MUI: You have provided a `inputComponent` to the input component", "that does not correctly handle the `ref` prop.", "Make sure the `ref` prop is called with a HTMLInputElement."].join("\n"));
      }
    }
  }, []);
  const handleInputRef = useForkRef(inputRef, inputRefProp, inputPropsProp.ref, handleInputRefWarning);
  const [focused, setFocused] = React.useState(false);
  const [fcs, muiFormControl] = useFormControlState({
    props,
    states: ["color", "disabled", "error", "hiddenLabel", "size", "required", "filled"]
  });
  if (process.env.NODE_ENV !== "production") {
    React.useEffect(() => {
      if (muiFormControl) {
        return muiFormControl.registerEffect();
      }
      return void 0;
    }, [muiFormControl]);
  }
  fcs.focused = muiFormControl ? muiFormControl.focused : focused;
  React.useEffect(() => {
    if (!muiFormControl && disabled && focused) {
      setFocused(false);
      if (onBlur) {
        onBlur();
      }
    }
  }, [muiFormControl, disabled, focused, onBlur]);
  const onFilled = muiFormControl && muiFormControl.onFilled;
  const onEmpty = muiFormControl && muiFormControl.onEmpty;
  const checkDirty = React.useCallback((obj) => {
    if (isFilled(obj)) {
      if (onFilled) {
        onFilled();
      }
    } else if (onEmpty) {
      onEmpty();
    }
  }, [onFilled, onEmpty]);
  useEnhancedEffect(() => {
    if (isControlled) {
      checkDirty({
        value
      });
    }
  }, [value, checkDirty, isControlled]);
  useEnhancedEffect(() => {
    if (!autoFocus) {
      return;
    }
    const input = inputRef.current;
    if (!input) {
      return;
    }
    const doc = ownerDocument(input);
    const activeElement = getActiveElement(doc);
    const noElementFocused = activeElement == null || activeElement === doc.body || activeElement === doc.documentElement;
    if (input === activeElement) {
      if (muiFormControl && muiFormControl.onFocus) {
        muiFormControl.onFocus();
      } else {
        setFocused(true);
      }
    } else if (noElementFocused) {
      input.focus();
    }
  }, [autoFocus]);
  const handleFocus = (event) => {
    if (onFocus) {
      onFocus(event);
    }
    if (inputPropsProp.onFocus) {
      inputPropsProp.onFocus(event);
    }
    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    } else {
      setFocused(true);
    }
  };
  const handleBlur = (event) => {
    if (onBlur) {
      onBlur(event);
    }
    if (inputPropsProp.onBlur) {
      inputPropsProp.onBlur(event);
    }
    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    } else {
      setFocused(false);
    }
  };
  const handleChange = (event, ...args) => {
    if (!isControlled) {
      const element = event.target || inputRef.current;
      if (element == null) {
        throw new Error(process.env.NODE_ENV !== "production" ? "MUI: Expected valid input target. Did you use a custom `inputComponent` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info." : _formatErrorMessage(1));
      }
      checkDirty({
        value: element.value
      });
    }
    if (inputPropsProp.onChange) {
      inputPropsProp.onChange(event, ...args);
    }
    if (onChange) {
      onChange(event, ...args);
    }
  };
  React.useEffect(() => {
    checkDirty(inputRef.current);
  }, []);
  const handleClick = (event) => {
    if (inputRef.current && event.currentTarget === event.target) {
      inputRef.current.focus();
    }
    if (onClick) {
      onClick(event);
    }
  };
  let InputComponent = inputComponent;
  let inputProps = inputPropsProp;
  if (multiline && InputComponent === "input") {
    if (rows) {
      if (process.env.NODE_ENV !== "production") {
        if (minRows || maxRows) {
          console.warn("MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.");
        }
      }
      inputProps = {
        type: void 0,
        minRows: rows,
        maxRows: rows,
        ...inputProps
      };
    } else {
      inputProps = {
        type: void 0,
        maxRows,
        minRows,
        ...inputProps
      };
    }
    InputComponent = TextareaAutosize;
  }
  const handleAutoFill = (event) => {
    checkDirty(event.animationName === MUI_AUTO_FILL_CANCEL ? inputRef.current : {
      value: "x"
    });
  };
  React.useEffect(() => {
    if (muiFormControl) {
      muiFormControl.setAdornedStart(Boolean(startAdornment));
    }
  }, [muiFormControl, startAdornment]);
  const ownerState = {
    ...props,
    color: fcs.color || "primary",
    disabled: fcs.disabled,
    endAdornment,
    error: fcs.error,
    focused: fcs.focused,
    formControl: muiFormControl,
    fullWidth,
    hiddenLabel: fcs.hiddenLabel,
    multiline,
    size: fcs.size,
    startAdornment,
    type
  };
  const classes = useUtilityClasses$Z(ownerState);
  const Root = slots.root || InputBaseRoot;
  const rootProps = slotProps.root || {};
  const Input3 = slots.input || InputBaseInput;
  inputProps = {
    ...inputProps,
    ...slotProps.input
  };
  return /* @__PURE__ */ jsxs(React.Fragment, {
    children: [!disableInjectingGlobalStyles && typeof InputGlobalStyles === "function" && // For Emotion/Styled-components, InputGlobalStyles will be a function
    // For Pigment CSS, this has no effect because the InputGlobalStyles will be null.
    (_InputGlobalStyles || (_InputGlobalStyles = /* @__PURE__ */ jsx(InputGlobalStyles, {}))), /* @__PURE__ */ jsxs(Root, {
      ...rootProps,
      ref,
      onClick: handleClick,
      ...other,
      ...!isHostComponent(Root) && {
        ownerState: {
          ...ownerState,
          ...rootProps.ownerState
        }
      },
      className: clsx(classes.root, rootProps.className, className, readOnly && "MuiInputBase-readOnly"),
      children: [startAdornment, /* @__PURE__ */ jsx(FormControlContext.Provider, {
        value: null,
        children: /* @__PURE__ */ jsx(Input3, {
          "aria-invalid": fcs.error,
          "aria-describedby": ariaDescribedby,
          "aria-label": ariaLabel,
          autoComplete,
          autoFocus,
          defaultValue,
          disabled: fcs.disabled,
          id,
          onAnimationStart: handleAutoFill,
          name,
          placeholder,
          readOnly,
          required: fcs.required,
          rows,
          value,
          onKeyDown,
          onKeyUp,
          type,
          ...inputProps,
          ...!isHostComponent(Input3) && {
            as: InputComponent,
            ownerState: {
              ...ownerState,
              ...inputProps.ownerState
            }
          },
          ref: handleInputRef,
          className: clsx(classes.input, inputProps.className, readOnly && "MuiInputBase-readOnly"),
          onBlur: handleBlur,
          onChange: handleChange,
          onFocus: handleFocus
        })
      }), endAdornment, renderSuffix ? renderSuffix({
        ...fcs,
        startAdornment
      }) : null]
    })]
  });
});
process.env.NODE_ENV !== "production" ? InputBase.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  "aria-describedby": PropTypes.string,
  /**
   * @ignore
   */
  "aria-label": PropTypes.string,
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: PropTypes.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: PropTypes.oneOfType([PropTypes.oneOf(["primary", "secondary", "error", "info", "success", "warning"]), PropTypes.string]),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, GlobalStyles for the auto-fill keyframes will not be injected/removed on mount/unmount. Make sure to inject them at the top of your application.
   * This option is intended to help with boosting the initial rendering performance if you are loading a big amount of Input components at once.
   * @default false
   */
  disableInjectingGlobalStyles: PropTypes.bool,
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: PropTypes.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   * @default 'input'
   */
  inputComponent: elementTypeAcceptingRef,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#attributes) applied to the `input` element.
   * @default {}
   */
  inputProps: PropTypes.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: PropTypes.oneOf(["dense", "none"]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * If `true`, a [TextareaAutosize](https://mui.com/material-ui/react-textarea-autosize/) element is rendered.
   * @default false
   */
  multiline: PropTypes.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * Callback fired when the `input` is blurred.
   *
   * Notice that the first argument (event) might be undefined.
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * Callback fired when the `input` doesn't satisfy its constraints.
   */
  onInvalid: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  onKeyUp: PropTypes.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: PropTypes.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: PropTypes.bool,
  /**
   * @ignore
   */
  renderSuffix: PropTypes.func,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: PropTypes.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The size of the component.
   */
  size: PropTypes.oneOfType([PropTypes.oneOf(["medium", "small"]), PropTypes.string]),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: PropTypes.shape({
    input: PropTypes.object,
    root: PropTypes.object
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: PropTypes.shape({
    input: PropTypes.elementType,
    root: PropTypes.elementType
  }),
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types).
   * @default 'text'
   */
  type: PropTypes.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: PropTypes.any
} : void 0;
function getFilledInputUtilityClass(slot) {
  return generateUtilityClass("MuiFilledInput", slot);
}
const filledInputClasses = {
  ...inputBaseClasses,
  ...generateUtilityClasses("MuiFilledInput", ["root", "underline", "input", "adornedStart", "adornedEnd", "sizeSmall", "multiline", "hiddenLabel"])
};
function getFormControlLabelUtilityClasses(slot) {
  return generateUtilityClass("MuiFormControlLabel", slot);
}
const formControlLabelClasses = generateUtilityClasses("MuiFormControlLabel", ["root", "labelPlacementStart", "labelPlacementTop", "labelPlacementBottom", "disabled", "label", "error", "required", "asterisk"]);
function getFormHelperTextUtilityClasses(slot) {
  return generateUtilityClass("MuiFormHelperText", slot);
}
const formHelperTextClasses = generateUtilityClasses("MuiFormHelperText", ["root", "error", "disabled", "sizeSmall", "sizeMedium", "contained", "focused", "filled", "required"]);
function getFormLabelUtilityClasses(slot) {
  return generateUtilityClass("MuiFormLabel", slot);
}
const formLabelClasses = generateUtilityClasses("MuiFormLabel", ["root", "colorSecondary", "focused", "disabled", "error", "filled", "required", "asterisk"]);
function getInputUtilityClass(slot) {
  return generateUtilityClass("MuiInput", slot);
}
const inputClasses = {
  ...inputBaseClasses,
  ...generateUtilityClasses("MuiInput", ["root", "underline", "input"])
};
const listItemButtonClasses = generateUtilityClasses("MuiListItemButton", ["root", "focusVisible", "dense", "alignItemsFlexStart", "disabled", "divider", "gutters", "selected"]);
function getMenuItemUtilityClass(slot) {
  return generateUtilityClass("MuiMenuItem", slot);
}
const menuItemClasses = generateUtilityClasses("MuiMenuItem", ["root", "focusVisible", "dense", "disabled", "divider", "gutters", "selected"]);
function getNativeSelectUtilityClasses(slot) {
  return generateUtilityClass("MuiNativeSelect", slot);
}
const nativeSelectClasses = generateUtilityClasses("MuiNativeSelect", ["root", "select", "multiple", "filled", "outlined", "standard", "disabled", "icon", "iconOpen", "iconFilled", "iconOutlined", "iconStandard", "nativeInput", "error"]);
function getOutlinedInputUtilityClass(slot) {
  return generateUtilityClass("MuiOutlinedInput", slot);
}
const outlinedInputClasses = {
  ...inputBaseClasses,
  ...generateUtilityClasses("MuiOutlinedInput", ["root", "notchedOutline", "input"])
};
function getRadioUtilityClass(slot) {
  return generateUtilityClass("MuiRadio", slot);
}
const radioClasses = generateUtilityClasses("MuiRadio", ["root", "checked", "disabled", "colorPrimary", "colorSecondary", "sizeSmall"]);
function getToggleButtonUtilityClass(slot) {
  return generateUtilityClass("MuiToggleButton", slot);
}
const toggleButtonClasses = generateUtilityClasses("MuiToggleButton", ["root", "disabled", "selected", "standard", "primary", "secondary", "sizeSmall", "sizeMedium", "sizeLarge", "fullWidth"]);
function getSvgIconUtilityClass(slot) {
  return generateUtilityClass("MuiSvgIcon", slot);
}
generateUtilityClasses("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const useUtilityClasses$Y = (ownerState) => {
  const {
    color,
    fontSize,
    classes
  } = ownerState;
  const slots = {
    root: ["root", color !== "inherit" && `color${capitalize(color)}`, `fontSize${capitalize(fontSize)}`]
  };
  return composeClasses(slots, getSvgIconUtilityClass, classes);
};
const SvgIconRoot = styled("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.color !== "inherit" && styles2[`color${capitalize(ownerState.color)}`], styles2[`fontSize${capitalize(ownerState.fontSize)}`]];
  }
})(memoTheme(({
  theme
}) => ({
  userSelect: "none",
  width: "1em",
  height: "1em",
  display: "inline-block",
  flexShrink: 0,
  ...getTransitionStyles(theme, "fill", {
    duration: (theme.vars ?? theme).transitions?.duration?.shorter
  }),
  variants: [
    {
      props: (props) => !props.hasSvgAsChild,
      style: {
        // the <svg> will define the property that has `currentColor`
        // for example heroicons uses fill="none" and stroke="currentColor"
        fill: "currentColor"
      }
    },
    {
      props: {
        fontSize: "inherit"
      },
      style: {
        fontSize: "inherit"
      }
    },
    {
      props: {
        fontSize: "small"
      },
      style: {
        fontSize: theme.typography?.pxToRem?.(20) || "1.25rem"
      }
    },
    {
      props: {
        fontSize: "medium"
      },
      style: {
        fontSize: theme.typography?.pxToRem?.(24) || "1.5rem"
      }
    },
    {
      props: {
        fontSize: "large"
      },
      style: {
        fontSize: theme.typography?.pxToRem?.(35) || "2.1875rem"
      }
    },
    // TODO v5 deprecate color prop, v6 remove for sx
    ...Object.entries((theme.vars ?? theme).palette).filter(([, value]) => value && value.main).map(([color]) => ({
      props: {
        color
      },
      style: {
        color: (theme.vars ?? theme).palette?.[color]?.main
      }
    })),
    {
      props: {
        color: "action"
      },
      style: {
        color: (theme.vars ?? theme).palette?.action?.active
      }
    },
    {
      props: {
        color: "disabled"
      },
      style: {
        color: (theme.vars ?? theme).palette?.action?.disabled
      }
    },
    {
      props: {
        color: "inherit"
      },
      style: {
        color: void 0
      }
    }
  ]
})));
const SvgIcon = /* @__PURE__ */ React.forwardRef(function SvgIcon2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiSvgIcon"
  });
  const {
    children,
    className,
    color = "inherit",
    component = "svg",
    fontSize = "medium",
    htmlColor,
    inheritViewBox = false,
    titleAccess,
    viewBox = "0 0 24 24",
    ...other
  } = props;
  const hasSvgAsChild = /* @__PURE__ */ React.isValidElement(children) && children.type === "svg";
  const ownerState = {
    ...props,
    color,
    component,
    fontSize,
    instanceFontSize: inProps.fontSize,
    inheritViewBox,
    viewBox,
    hasSvgAsChild
  };
  const more = {};
  if (!inheritViewBox) {
    more.viewBox = viewBox;
  }
  const classes = useUtilityClasses$Y(ownerState);
  return /* @__PURE__ */ jsxs(SvgIconRoot, {
    as: component,
    className: clsx(classes.root, className),
    focusable: "false",
    color: htmlColor,
    "aria-hidden": titleAccess ? void 0 : true,
    role: titleAccess ? "img" : void 0,
    ref,
    ...more,
    ...other,
    ...hasSvgAsChild && children.props,
    ownerState,
    children: [hasSvgAsChild ? children.props.children : children, titleAccess ? /* @__PURE__ */ jsx("title", {
      children: titleAccess
    }) : null]
  });
});
process.env.NODE_ENV !== "production" ? SvgIcon.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Node passed into the SVG element.
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
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: PropTypes.oneOfType([PropTypes.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), PropTypes.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: PropTypes.oneOfType([PropTypes.oneOf(["inherit", "large", "medium", "small"]), PropTypes.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: PropTypes.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: PropTypes.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: PropTypes.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: PropTypes.string
} : void 0;
SvgIcon.muiName = "SvgIcon";
function createSvgIcon(path, displayName) {
  function Component(props, ref) {
    return /* @__PURE__ */ jsx(SvgIcon, {
      "data-testid": process.env.NODE_ENV !== "production" ? `${displayName}Icon` : void 0,
      ref,
      ...props,
      children: path
    });
  }
  if (process.env.NODE_ENV !== "production") {
    Component.displayName = `${displayName}Icon`;
  }
  Component.muiName = SvgIcon.muiName;
  return /* @__PURE__ */ React.memo(/* @__PURE__ */ React.forwardRef(Component));
}
function mergeSlotProps(externalSlotProps, defaultSlotProps) {
  if (!externalSlotProps) {
    return defaultSlotProps;
  }
  function extractHandlers(externalSlotPropsValue, defaultSlotPropsValue) {
    const handlers2 = {};
    Object.keys(defaultSlotPropsValue).forEach((key) => {
      if (isEventHandler(key, defaultSlotPropsValue[key]) && typeof externalSlotPropsValue[key] === "function") {
        handlers2[key] = (...args) => {
          externalSlotPropsValue[key](...args);
          defaultSlotPropsValue[key](...args);
        };
      }
    });
    return handlers2;
  }
  if (typeof externalSlotProps === "function" || typeof defaultSlotProps === "function") {
    return (ownerState) => {
      const defaultSlotPropsValue = typeof defaultSlotProps === "function" ? defaultSlotProps(ownerState) : defaultSlotProps;
      const externalSlotPropsValue = typeof externalSlotProps === "function" ? externalSlotProps({
        ...ownerState,
        ...defaultSlotPropsValue
      }) : externalSlotProps;
      const className2 = clsx(ownerState?.className, defaultSlotPropsValue?.className, externalSlotPropsValue?.className);
      const handlers2 = extractHandlers(externalSlotPropsValue, defaultSlotPropsValue);
      return {
        ...defaultSlotPropsValue,
        ...externalSlotPropsValue,
        ...handlers2,
        ...!!className2 && {
          className: className2
        },
        ...defaultSlotPropsValue?.style && externalSlotPropsValue?.style && {
          style: {
            ...defaultSlotPropsValue.style,
            ...externalSlotPropsValue.style
          }
        },
        ...defaultSlotPropsValue?.sx && externalSlotPropsValue?.sx && {
          sx: [...Array.isArray(defaultSlotPropsValue.sx) ? defaultSlotPropsValue.sx : [defaultSlotPropsValue.sx], ...Array.isArray(externalSlotPropsValue.sx) ? externalSlotPropsValue.sx : [externalSlotPropsValue.sx]]
        }
      };
    };
  }
  const typedDefaultSlotProps = defaultSlotProps;
  const handlers = extractHandlers(externalSlotProps, typedDefaultSlotProps);
  const className = clsx(typedDefaultSlotProps?.className, externalSlotProps?.className);
  return {
    ...defaultSlotProps,
    ...externalSlotProps,
    ...handlers,
    ...!!className && {
      className
    },
    ...typedDefaultSlotProps?.style && externalSlotProps?.style && {
      style: {
        ...typedDefaultSlotProps.style,
        ...externalSlotProps.style
      }
    },
    ...typedDefaultSlotProps?.sx && externalSlotProps?.sx && {
      sx: [...Array.isArray(typedDefaultSlotProps.sx) ? typedDefaultSlotProps.sx : [typedDefaultSlotProps.sx], ...Array.isArray(externalSlotProps.sx) ? externalSlotProps.sx : [externalSlotProps.sx]]
    }
  };
}
const TransitionGroupContext = React__default.createContext(null);
function resolveTimeouts(timeout) {
  if (timeout == null) {
    return {
      appear: void 0,
      enter: void 0,
      exit: void 0
    };
  }
  if (typeof timeout === "number") {
    return {
      appear: timeout,
      enter: timeout,
      exit: timeout
    };
  }
  const enter = timeout.enter;
  const exit = timeout.exit;
  const appear = timeout.appear !== void 0 ? timeout.appear : enter;
  return {
    appear,
    enter,
    exit
  };
}
function getCompletionTimeout(params) {
  if (params.autoTimeout != null) {
    return params.autoTimeout;
  }
  const resolved = resolveTimeouts(params.timeout);
  if (params.currentStatus === "entering") {
    return params.isAppearing ? resolved.appear ?? resolved.enter ?? null : resolved.enter ?? null;
  }
  return resolved.exit ?? null;
}
function Transition(props) {
  const {
    in: inProp = false,
    appear = false,
    enter = true,
    exit = true,
    mountOnEnter = false,
    unmountOnExit = false,
    timeout,
    addEndListener,
    reduceMotion = false,
    getAutoTimeout,
    nodeRef,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    children,
    ...childProps
  } = props;
  const parentGroup = React.useContext(TransitionGroupContext);
  const shouldEnterOnMount = parentGroup && !parentGroup.isMounting ? enter : appear;
  const [status, setStatus] = React.useState(() => {
    if (inProp) {
      return shouldEnterOnMount ? "exited" : "entered";
    }
    if (mountOnEnter || unmountOnExit) {
      return "unmounted";
    }
    return "exited";
  });
  const statusRef = React.useRef(status);
  statusRef.current = status;
  if (inProp && status === "unmounted") {
    statusRef.current = "exited";
    setStatus("exited");
  }
  const shouldAppearOnMountRef = React.useRef(inProp && shouldEnterOnMount);
  const mountedRef = React.useRef(false);
  const nextCallbackRef = React.useRef(null);
  const lastFiredStatusRef = React.useRef(status);
  const isAppearingRef = React.useRef(false);
  const transitionReduceMotionRef = React.useRef(reduceMotion);
  const propsRef = useValueAsRef({
    timeout,
    addEndListener,
    reduceMotion,
    getAutoTimeout,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    enter,
    exit,
    mountOnEnter,
    unmountOnExit,
    nodeRef,
    parentGroup
  });
  const cancelPendingCallback = React.useCallback(() => {
    if (nextCallbackRef.current !== null) {
      nextCallbackRef.current.cancel();
      nextCallbackRef.current = null;
    }
  }, []);
  const makeCallback = React.useCallback((handler) => {
    let active = true;
    const wrapped = () => {
      if (active) {
        active = false;
        nextCallbackRef.current = null;
        handler();
      }
    };
    wrapped.cancel = () => {
      active = false;
    };
    nextCallbackRef.current = wrapped;
    return wrapped;
  }, []);
  const scheduleTransitionEnd = React.useCallback((nextStatus, currentStatus) => {
    let timeoutId;
    const clearTimer = () => {
      if (timeoutId !== void 0) {
        clearTimeout(timeoutId);
        timeoutId = void 0;
      }
    };
    const done = makeCallback(() => {
      clearTimer();
      statusRef.current = nextStatus;
      setStatus(nextStatus);
    });
    const cancelDone = done.cancel;
    done.cancel = () => {
      clearTimer();
      cancelDone();
    };
    const node = propsRef.current.nodeRef.current;
    const listener = propsRef.current.addEndListener;
    const hasAutoTimeout = propsRef.current.getAutoTimeout !== void 0;
    const autoTimeout = propsRef.current.getAutoTimeout?.();
    const authoredTimeout = getCompletionTimeout({
      currentStatus,
      isAppearing: isAppearingRef.current,
      timeout: propsRef.current.timeout,
      autoTimeout
    });
    const transitionReduceMotion = transitionReduceMotionRef.current;
    const fallbackTimeout = authoredTimeout ?? (transitionReduceMotion && hasAutoTimeout ? 0 : null);
    const scheduleTimer = (value) => {
      timeoutId = setTimeout(done, value);
    };
    if (!node) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(["MUI: The transition child does not expose a DOM element.", "Make sure the child accepts a ref and forwards it to the underlying DOM element.", "The transition animation cannot be observed without a DOM element and will be skipped."].join("\n"));
      }
      scheduleTimer(0);
      return;
    }
    if (listener) {
      if (fallbackTimeout != null) {
        scheduleTimer(transitionReduceMotion ? 0 : fallbackTimeout);
      }
      if (listener.length >= 2) {
        listener(node, done);
      } else {
        listener(done);
      }
      return;
    }
    scheduleTimer(transitionReduceMotion ? 0 : authoredTimeout ?? 0);
  }, [makeCallback, propsRef]);
  const performEnter = React.useCallback((mounting) => {
    const current = propsRef.current;
    const isAppearing = current.parentGroup ? current.parentGroup.isMounting : mounting;
    isAppearingRef.current = isAppearing;
    if (!mounting && !current.enter) {
      statusRef.current = "entered";
      setStatus("entered");
      return;
    }
    transitionReduceMotionRef.current = current.reduceMotion;
    current.onEnter?.(isAppearing);
    statusRef.current = "entering";
    setStatus("entering");
  }, [propsRef]);
  const performExit = React.useCallback(() => {
    const current = propsRef.current;
    if (!current.exit) {
      statusRef.current = "exited";
      setStatus("exited");
      return;
    }
    transitionReduceMotionRef.current = current.reduceMotion;
    current.onExit?.();
    statusRef.current = "exiting";
    setStatus("exiting");
  }, [propsRef]);
  const updateStatus = React.useCallback((mounting, nextStatus) => {
    cancelPendingCallback();
    if (nextStatus === "entering") {
      const current = propsRef.current;
      if (current.mountOnEnter || current.unmountOnExit) {
        const node = current.nodeRef.current;
        if (node) {
          reflow(node);
        }
      }
      performEnter(mounting);
    } else {
      performExit();
    }
  }, [cancelPendingCallback, performEnter, performExit, propsRef]);
  useEnhancedEffect(() => {
    mountedRef.current = true;
    if (shouldAppearOnMountRef.current) {
      shouldAppearOnMountRef.current = false;
      updateStatus(true, "entering");
    }
    return () => {
      mountedRef.current = false;
      cancelPendingCallback();
    };
  }, [cancelPendingCallback, updateStatus]);
  useEnhancedEffect(() => {
    if (!mountedRef.current) {
      return;
    }
    const current = statusRef.current;
    if (inProp) {
      if (current !== "entering" && current !== "entered") {
        updateStatus(false, "entering");
      }
    } else if (current === "entering" || current === "entered") {
      updateStatus(false, "exiting");
    } else if (current === "exited" && unmountOnExit) {
      statusRef.current = "unmounted";
      setStatus("unmounted");
    }
  }, [inProp, status, unmountOnExit, updateStatus]);
  useEnhancedEffect(() => {
    if (status === "unmounted" || lastFiredStatusRef.current === "unmounted") {
      lastFiredStatusRef.current = status;
      return;
    }
    const prev = lastFiredStatusRef.current;
    if (prev === status) {
      return;
    }
    lastFiredStatusRef.current = status;
    const current = propsRef.current;
    if (status === "entering") {
      current.onEntering?.(isAppearingRef.current);
      scheduleTransitionEnd("entered", "entering");
    } else if (status === "exiting") {
      current.onExiting?.();
      scheduleTransitionEnd("exited", "exiting");
    } else if (status === "entered") {
      current.onEntered?.(isAppearingRef.current);
    } else if (status === "exited") {
      current.onExited?.();
    }
  }, [propsRef, scheduleTransitionEnd, status]);
  if (status === "unmounted") {
    return null;
  }
  return /* @__PURE__ */ jsx(TransitionGroupContext.Provider, {
    value: null,
    children: children(status, childProps)
  });
}
process.env.NODE_ENV !== "production" ? Transition.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  addEndListener: PropTypes.func,
  /**
   * @ignore
   */
  appear: PropTypes.bool,
  /**
   * @ignore
   */
  children: PropTypes.func.isRequired,
  /**
   * @ignore
   */
  enter: PropTypes.bool,
  /**
   * @ignore
   */
  exit: PropTypes.bool,
  /**
   * @ignore
   */
  getAutoTimeout: PropTypes.func,
  /**
   * @ignore
   */
  in: PropTypes.bool,
  /**
   * @ignore
   */
  mountOnEnter: PropTypes.bool,
  /**
   * @ignore
   */
  nodeRef: PropTypes.shape({
    current: (props, propName) => {
      if (props[propName] == null) {
        return null;
      }
      if (typeof props[propName] !== "object" || props[propName].nodeType !== 1) {
        return new Error(`Expected prop '${propName}' to be of type Element`);
      }
      return null;
    }
  }).isRequired,
  /**
   * @ignore
   */
  onEnter: PropTypes.func,
  /**
   * @ignore
   */
  onEntered: PropTypes.func,
  /**
   * @ignore
   */
  onEntering: PropTypes.func,
  /**
   * @ignore
   */
  onExit: PropTypes.func,
  /**
   * @ignore
   */
  onExited: PropTypes.func,
  /**
   * @ignore
   */
  onExiting: PropTypes.func,
  /**
   * @ignore
   */
  reduceMotion: PropTypes.bool,
  /**
   * @ignore
   */
  timeout: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    appear: PropTypes.number,
    enter: PropTypes.number,
    exit: PropTypes.number
  })]),
  /**
   * @ignore
   */
  unmountOnExit: PropTypes.bool
} : void 0;
const MEDIA_QUERY = "(prefers-reduced-motion: reduce)";
const REDUCED_MOTION_DURATION = 0;
const REDUCED_MOTION_DELAY = "0ms";
const NOOP$1 = () => {
};
const getDefaultSnapshot = () => false;
const getReducedMotionSnapshot = () => true;
const subscribeNoop = () => NOOP$1;
function useReducedMotionMediaQueryOld(enabled) {
  const [queryState, setQueryState] = React.useState(() => ({
    enabled,
    matches: enabled ? null : false
  }));
  let matches = queryState.matches;
  if (queryState.enabled !== enabled) {
    matches = null;
    if (!enabled) {
      matches = false;
    }
  }
  useEnhancedEffect(() => {
    const setResolvedMatches = (nextMatches) => {
      setQueryState((previousState) => {
        if (previousState.enabled === enabled && previousState.matches === nextMatches) {
          return previousState;
        }
        return {
          enabled,
          matches: nextMatches
        };
      });
    };
    if (!enabled) {
      if (queryState.enabled) {
        setResolvedMatches(false);
      }
      return void 0;
    }
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      setResolvedMatches(false);
      return void 0;
    }
    const mediaQueryList = window.matchMedia(MEDIA_QUERY);
    const update = () => {
      setResolvedMatches(mediaQueryList.matches);
    };
    update();
    mediaQueryList.addEventListener("change", update);
    return () => {
      mediaQueryList.removeEventListener("change", update);
    };
  }, [enabled, queryState.enabled]);
  return matches;
}
const safeReact = {
  ...React
};
const maybeReactUseSyncExternalStore = safeReact.useSyncExternalStore;
function useReducedMotionMediaQueryNew(enabled) {
  const getServerSnapshot = enabled ? getReducedMotionSnapshot : getDefaultSnapshot;
  const [getSnapshot, subscribe] = React.useMemo(() => {
    if (!enabled || typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return [getDefaultSnapshot, subscribeNoop];
    }
    const mediaQueryList = window.matchMedia(MEDIA_QUERY);
    return [() => mediaQueryList.matches, (notify) => {
      mediaQueryList.addEventListener("change", notify);
      return () => {
        mediaQueryList.removeEventListener("change", notify);
      };
    }];
  }, [enabled]);
  return maybeReactUseSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
const useReducedMotionMediaQuery = maybeReactUseSyncExternalStore !== void 0 ? useReducedMotionMediaQueryNew : useReducedMotionMediaQueryOld;
function useReducedMotion(mode, disablePrefersReducedMotion) {
  const prefersReducedMotion = useReducedMotionMediaQuery(!disablePrefersReducedMotion && mode === "system");
  const shouldReduceMotion = !disablePrefersReducedMotion && (mode === "always" || mode === "system" && prefersReducedMotion !== false);
  return React.useMemo(() => ({
    shouldReduceMotion,
    getTransitionTiming(timing) {
      if (!shouldReduceMotion) {
        return timing;
      }
      return {
        duration: REDUCED_MOTION_DURATION,
        delay: REDUCED_MOTION_DELAY
      };
    }
  }), [shouldReduceMotion]);
}
function useSlot(name, parameters) {
  const {
    className,
    elementType: initialElementType,
    ownerState,
    externalForwardedProps,
    internalForwardedProps,
    shouldForwardComponentProp = false,
    ...useSlotPropsParams
  } = parameters;
  const {
    component: rootComponent,
    slots = {
      [name]: void 0
    },
    slotProps = {
      [name]: void 0
    },
    ...other
  } = externalForwardedProps;
  const elementType = slots[name] || initialElementType;
  const resolvedComponentsProps = resolveComponentProps(slotProps[name], ownerState);
  const {
    props: {
      component: slotComponent,
      ...mergedProps
    },
    internalRef
  } = mergeSlotProps$1({
    className,
    ...useSlotPropsParams,
    externalForwardedProps: name === "root" ? other : void 0,
    externalSlotProps: resolvedComponentsProps
  });
  const ref = useForkRef(internalRef, resolvedComponentsProps?.ref, parameters.ref);
  const LeafComponent = name === "root" ? slotComponent || rootComponent : slotComponent;
  const props = appendOwnerState(elementType, {
    ...name === "root" && !rootComponent && !slots[name] && internalForwardedProps,
    ...name !== "root" && !slots[name] && internalForwardedProps,
    ...mergedProps,
    ...LeafComponent && !shouldForwardComponentProp && {
      as: LeafComponent
    },
    ...LeafComponent && shouldForwardComponentProp && {
      component: LeafComponent
    },
    ref
  }, ownerState);
  return [elementType, props];
}
function getCollapseUtilityClass(slot) {
  return generateUtilityClass("MuiCollapse", slot);
}
generateUtilityClasses("MuiCollapse", ["root", "horizontal", "vertical", "entered", "hidden", "wrapper", "wrapperInner"]);
const EMPTY_OBJECT = {};
const useUtilityClasses$X = (ownerState) => {
  const {
    orientation,
    classes
  } = ownerState;
  const slots = {
    root: ["root", orientation],
    entered: ["entered"],
    hidden: ["hidden"],
    wrapper: ["wrapper", orientation],
    wrapperInner: ["wrapperInner", orientation]
  };
  return composeClasses(slots, getCollapseUtilityClass, classes);
};
const CollapseRoot = styled("div", {
  name: "MuiCollapse",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, styles2[ownerState.orientation], ownerState.state === "entered" && styles2.entered, ownerState.state === "exited" && !ownerState.in && ownerState.collapsedSize === "0px" && styles2.hidden];
  }
})(memoTheme(({
  theme
}) => ({
  height: 0,
  overflow: "hidden",
  transition: theme.transitions.create("height"),
  variants: [{
    props: {
      orientation: "horizontal"
    },
    style: {
      height: "auto",
      width: 0,
      transition: theme.transitions.create("width")
    }
  }, {
    props: {
      state: "entered"
    },
    style: {
      height: "auto",
      overflow: "visible"
    }
  }, {
    props: {
      state: "entered",
      orientation: "horizontal"
    },
    style: {
      width: "auto"
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.state === "exited" && !ownerState.in && ownerState.collapsedSize === "0px",
    style: {
      visibility: "hidden"
    }
  }]
})));
const CollapseWrapper = styled("div", {
  name: "MuiCollapse",
  slot: "Wrapper"
})({
  // Prevent children with negative margins from making the measured size too small.
  display: "flex",
  width: "100%",
  variants: [{
    props: {
      orientation: "horizontal"
    },
    style: {
      width: "auto",
      height: "100%"
    }
  }]
});
const CollapseWrapperInner = styled("div", {
  name: "MuiCollapse",
  slot: "WrapperInner"
})({
  width: "100%",
  variants: [{
    props: {
      orientation: "horizontal"
    },
    style: {
      width: "auto",
      height: "100%"
    }
  }]
});
const Collapse = /* @__PURE__ */ React.forwardRef(function Collapse2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiCollapse"
  });
  const {
    addEndListener,
    children,
    className,
    collapsedSize: collapsedSizeProp = "0px",
    component,
    disablePrefersReducedMotion = false,
    easing: easing2,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    orientation = "vertical",
    slots = EMPTY_OBJECT,
    slotProps = EMPTY_OBJECT,
    style,
    timeout = duration.standard,
    // eslint-disable-next-line react/prop-types
    TransitionComponent = Transition,
    ...other
  } = props;
  const ownerState = {
    ...props,
    orientation,
    collapsedSize: collapsedSizeProp
  };
  const classes = useUtilityClasses$X(ownerState);
  const theme = useTheme();
  const wrapperRef = React.useRef(null);
  const autoTransitionDuration = React.useRef(null);
  const collapsedSize = typeof collapsedSizeProp === "number" ? `${collapsedSizeProp}px` : collapsedSizeProp;
  const isHorizontal = orientation === "horizontal";
  const size = isHorizontal ? "width" : "height";
  const reducedMotion = useReducedMotion(theme.motion.reducedMotion, disablePrefersReducedMotion);
  const nodeRef = React.useRef(null);
  const handleRef = useForkRef(ref, nodeRef);
  const getWrapperSize = () => wrapperRef.current ? wrapperRef.current[isHorizontal ? "clientWidth" : "clientHeight"] : 0;
  const handleEnter = normalizedTransitionCallback(nodeRef, (node, isAppearing) => {
    if (wrapperRef.current && isHorizontal) {
      wrapperRef.current.style.position = "absolute";
    }
    node.style[size] = collapsedSize;
    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });
  const handleEntering = normalizedTransitionCallback(nodeRef, (node, isAppearing) => {
    const wrapperSize = getWrapperSize();
    if (wrapperRef.current && isHorizontal) {
      wrapperRef.current.style.position = "";
    }
    const {
      duration: transitionDuration,
      easing: transitionTimingFunction
    } = getTransitionProps({
      style,
      timeout,
      easing: easing2
    }, {
      mode: "enter"
    });
    if (timeout === "auto" && !reducedMotion.shouldReduceMotion) {
      const duration2 = theme.transitions.getAutoHeightDuration(wrapperSize);
      autoTransitionDuration.current = duration2;
    } else {
      autoTransitionDuration.current = null;
    }
    const transitionTiming = reducedMotion.getTransitionTiming({
      duration: autoTransitionDuration.current ?? transitionDuration,
      delay: void 0
    });
    node.style.transitionDuration = typeof transitionTiming.duration === "string" ? transitionTiming.duration : `${transitionTiming.duration}ms`;
    node.style[size] = `${wrapperSize}px`;
    node.style.transitionTimingFunction = transitionTimingFunction;
    if (onEntering) {
      onEntering(node, isAppearing);
    }
  });
  const handleEntered = normalizedTransitionCallback(nodeRef, (node, isAppearing) => {
    node.style[size] = "auto";
    if (onEntered) {
      onEntered(node, isAppearing);
    }
  });
  const handleExit = normalizedTransitionCallback(nodeRef, (node) => {
    node.style[size] = `${getWrapperSize()}px`;
    if (onExit) {
      onExit(node);
    }
  });
  const handleExited = normalizedTransitionCallback(nodeRef, onExited);
  const handleExiting = normalizedTransitionCallback(nodeRef, (node) => {
    const wrapperSize = getWrapperSize();
    const {
      duration: transitionDuration,
      easing: transitionTimingFunction
    } = getTransitionProps({
      style,
      timeout,
      easing: easing2
    }, {
      mode: "exit"
    });
    if (timeout === "auto" && !reducedMotion.shouldReduceMotion) {
      const duration2 = theme.transitions.getAutoHeightDuration(wrapperSize);
      autoTransitionDuration.current = duration2;
    } else {
      autoTransitionDuration.current = null;
    }
    const transitionTiming = reducedMotion.getTransitionTiming({
      duration: autoTransitionDuration.current ?? transitionDuration,
      delay: void 0
    });
    node.style.transitionDuration = typeof transitionTiming.duration === "string" ? transitionTiming.duration : `${transitionTiming.duration}ms`;
    node.style[size] = collapsedSize;
    node.style.transitionTimingFunction = transitionTimingFunction;
    if (onExiting) {
      onExiting(node);
    }
  });
  const handleAddEndListener = addEndListener ? (next) => {
    addEndListener(nodeRef.current, next);
  } : void 0;
  const externalForwardedProps = {
    slots,
    slotProps,
    component
  };
  const [RootSlot, rootSlotProps] = useSlot("root", {
    ref: handleRef,
    className: clsx(classes.root, className),
    elementType: CollapseRoot,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      style: {
        [isHorizontal ? "minWidth" : "minHeight"]: collapsedSize,
        ...style
      }
    }
  });
  const [WrapperSlot, wrapperSlotProps] = useSlot("wrapper", {
    ref: wrapperRef,
    className: classes.wrapper,
    elementType: CollapseWrapper,
    externalForwardedProps,
    ownerState
  });
  const [WrapperInnerSlot, wrapperInnerSlotProps] = useSlot("wrapperInner", {
    className: classes.wrapperInner,
    elementType: CollapseWrapperInner,
    externalForwardedProps,
    ownerState
  });
  return /* @__PURE__ */ jsx(TransitionComponent, {
    in: inProp,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: handleAddEndListener,
    getAutoTimeout: timeout === "auto" ? () => autoTransitionDuration.current : void 0,
    reduceMotion: reducedMotion.shouldReduceMotion,
    nodeRef,
    timeout: timeout === "auto" ? null : timeout,
    ...other,
    children: (state, {
      ownerState: incomingOwnerState,
      ...restChildProps
    }) => {
      const stateOwnerState = {
        ...ownerState,
        state
      };
      return /* @__PURE__ */ jsx(RootSlot, {
        ...rootSlotProps,
        className: clsx(rootSlotProps.className, {
          "entered": classes.entered,
          "exited": !inProp && collapsedSize === "0px" && classes.hidden
        }[state]),
        ownerState: stateOwnerState,
        ...restChildProps,
        children: /* @__PURE__ */ jsx(WrapperSlot, {
          ...wrapperSlotProps,
          ownerState: stateOwnerState,
          children: /* @__PURE__ */ jsx(WrapperInnerSlot, {
            ...wrapperInnerSlotProps,
            ownerState: stateOwnerState,
            children
          })
        })
      });
    }
  });
});
process.env.NODE_ENV !== "production" ? Collapse.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger.
   * Use it when you need custom logic to decide when the transition has ended.
   * Note: Timeouts are still used as a fallback if provided.
   *
   * @param {HTMLElement} node The transitioning DOM node.
   * @param {Function} done Call this when the transition has finished.
   */
  addEndListener: PropTypes.func,
  /**
   * The content node to be collapsed.
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
   * The width (horizontal) or height (vertical) of the container when collapsed.
   * @default '0px'
   */
  collapsedSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: elementTypeAcceptingRef,
  /**
   * If `true`, the transition ignores `theme.motion.reducedMotion` and keeps its normal timing.
   * @default false
   */
  disablePrefersReducedMotion: PropTypes.bool,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: PropTypes.oneOfType([PropTypes.shape({
    enter: PropTypes.string,
    exit: PropTypes.string
  }), PropTypes.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: PropTypes.bool,
  /**
   * @ignore
   */
  onEnter: PropTypes.func,
  /**
   * @ignore
   */
  onEntered: PropTypes.func,
  /**
   * @ignore
   */
  onEntering: PropTypes.func,
  /**
   * @ignore
   */
  onExit: PropTypes.func,
  /**
   * @ignore
   */
  onExited: PropTypes.func,
  /**
   * @ignore
   */
  onExiting: PropTypes.func,
  /**
   * The transition orientation.
   * @default 'vertical'
   */
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    wrapper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    wrapperInner: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
    wrapper: PropTypes.elementType,
    wrapperInner: PropTypes.elementType
  }),
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default duration.standard
   */
  timeout: PropTypes.oneOfType([PropTypes.oneOf(["auto"]), PropTypes.number, PropTypes.shape({
    appear: PropTypes.number,
    enter: PropTypes.number,
    exit: PropTypes.number
  })])
} : void 0;
if (Collapse) {
  Collapse.muiSupportAuto = true;
}
function getPaperUtilityClass(slot) {
  return generateUtilityClass("MuiPaper", slot);
}
generateUtilityClasses("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const useUtilityClasses$W = (ownerState) => {
  const {
    square,
    elevation,
    variant,
    classes
  } = ownerState;
  const slots = {
    root: ["root", variant, !square && "rounded", variant === "elevation" && `elevation${elevation}`]
  };
  return composeClasses(slots, getPaperUtilityClass, classes);
};
const PaperRoot = styled("div", {
  name: "MuiPaper",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, styles2[ownerState.variant], !ownerState.square && styles2.rounded, ownerState.variant === "elevation" && styles2[`elevation${ownerState.elevation}`]];
  }
})(memoTheme(({
  theme
}) => ({
  backgroundColor: (theme.vars || theme).palette.background.paper,
  color: (theme.vars || theme).palette.text.primary,
  ...getTransitionStyles(theme, "box-shadow"),
  variants: [{
    props: ({
      ownerState
    }) => !ownerState.square,
    style: {
      borderRadius: theme.shape.borderRadius
    }
  }, {
    props: {
      variant: "outlined"
    },
    style: {
      border: `1px solid ${(theme.vars || theme).palette.divider}`
    }
  }, {
    props: {
      variant: "elevation"
    },
    style: {
      boxShadow: "var(--Paper-shadow)",
      backgroundImage: "var(--Paper-overlay)"
    }
  }]
})));
const Paper = /* @__PURE__ */ React.forwardRef(function Paper2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiPaper"
  });
  const theme = useTheme();
  const {
    className,
    component = "div",
    elevation = 1,
    square = false,
    variant = "elevation",
    ...other
  } = props;
  const ownerState = {
    ...props,
    component,
    elevation,
    square,
    variant
  };
  const classes = useUtilityClasses$W(ownerState);
  if (process.env.NODE_ENV !== "production") {
    if (theme.shadows[elevation] === void 0) {
      console.error([`MUI: The elevation provided <Paper elevation={${elevation}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${elevation}]\` is defined.`].join("\n"));
    }
  }
  return /* @__PURE__ */ jsx(PaperRoot, {
    as: component,
    ownerState,
    className: clsx(classes.root, className),
    ref,
    ...other,
    style: {
      ...variant === "elevation" && {
        "--Paper-shadow": (theme.vars || theme).shadows[elevation],
        ...theme.vars && {
          "--Paper-overlay": theme.vars.overlays?.[elevation]
        },
        ...!theme.vars && theme.palette.mode === "dark" && {
          "--Paper-overlay": `linear-gradient(${alpha("#fff", getOverlayAlpha(elevation))}, ${alpha("#fff", getOverlayAlpha(elevation))})`
        }
      },
      ...other.style
    }
  });
});
process.env.NODE_ENV !== "production" ? Paper.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation: chainPropTypes(integerPropType, (props) => {
    const {
      elevation,
      variant
    } = props;
    if (elevation > 0 && variant === "outlined") {
      return new Error(`MUI: Combining \`elevation={${elevation}}\` with \`variant="${variant}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`);
    }
    return null;
  }),
  /**
   * If `true`, rounded corners are disabled.
   * @default false
   */
  square: PropTypes.bool,
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The variant to use.
   * @default 'elevation'
   */
  variant: PropTypes.oneOfType([PropTypes.oneOf(["elevation", "outlined"]), PropTypes.string])
} : void 0;
const AccordionContext = /* @__PURE__ */ React.createContext({});
if (process.env.NODE_ENV !== "production") {
  AccordionContext.displayName = "AccordionContext";
}
function getAccordionUtilityClass(slot) {
  return generateUtilityClass("MuiAccordion", slot);
}
const accordionClasses = generateUtilityClasses("MuiAccordion", ["root", "heading", "rounded", "expanded", "disabled", "gutters", "region"]);
const useUtilityClasses$V = (ownerState) => {
  const {
    classes,
    square,
    expanded,
    disabled,
    disableGutters
  } = ownerState;
  const slots = {
    root: ["root", !square && "rounded", expanded && "expanded", disabled && "disabled", !disableGutters && "gutters"],
    heading: ["heading"],
    region: ["region"]
  };
  return composeClasses(slots, getAccordionUtilityClass, classes);
};
const AccordionRoot = styled(Paper, {
  name: "MuiAccordion",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${accordionClasses.region}`]: styles2.region
    }, styles2.root, !ownerState.square && styles2.rounded, !ownerState.disableGutters && styles2.gutters];
  }
})(memoTheme(({
  theme
}) => {
  const transition = {
    duration: theme.transitions.duration.shortest
  };
  return {
    position: "relative",
    ...getTransitionStyles(theme, ["margin"], transition),
    overflowAnchor: "none",
    // Keep the same scrolling position
    "&::before": {
      position: "absolute",
      left: 0,
      top: -1,
      right: 0,
      height: 1,
      content: '""',
      opacity: 1,
      backgroundColor: (theme.vars || theme).palette.divider,
      ...getTransitionStyles(theme, ["opacity", "background-color"], transition)
    },
    "&:first-of-type": {
      "&::before": {
        display: "none"
      }
    },
    [`&.${accordionClasses.expanded}`]: {
      "&::before": {
        opacity: 0
      },
      "&:first-of-type": {
        marginTop: 0
      },
      "&:last-of-type": {
        marginBottom: 0
      },
      "& + &": {
        "&::before": {
          display: "none"
        }
      }
    },
    [`&.${accordionClasses.disabled}`]: {
      backgroundColor: (theme.vars || theme).palette.action.disabledBackground
    }
  };
}), memoTheme(({
  theme
}) => ({
  variants: [{
    props: (props) => !props.square,
    style: {
      borderRadius: 0,
      "&:first-of-type": {
        borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
        borderTopRightRadius: (theme.vars || theme).shape.borderRadius
      },
      "&:last-of-type": {
        borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
        borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
        // Fix a rendering issue on Edge
        "@supports (-ms-ime-align: auto)": {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0
        }
      }
    }
  }, {
    props: (props) => !props.disableGutters,
    style: {
      [`&.${accordionClasses.expanded}`]: {
        margin: "16px 0"
      }
    }
  }]
})));
const AccordionHeading = styled("h3", {
  name: "MuiAccordion",
  slot: "Heading"
})({
  all: "unset"
});
const AccordionRegion = styled("div", {
  name: "MuiAccordion",
  slot: "Region"
})({});
const Accordion = /* @__PURE__ */ React.forwardRef(function Accordion2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiAccordion"
  });
  const {
    children: childrenProp,
    className,
    defaultExpanded = false,
    disabled = false,
    disableGutters = false,
    expanded: expandedProp,
    onChange,
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const [expanded, setExpandedState] = useControlled({
    controlled: expandedProp,
    default: defaultExpanded,
    name: "Accordion",
    state: "expanded"
  });
  const handleChange = React.useCallback((event) => {
    setExpandedState(!expanded);
    if (onChange) {
      onChange(event, !expanded);
    }
  }, [expanded, onChange, setExpandedState]);
  const [summary, ...children] = React.Children.toArray(childrenProp);
  const contextValue = React.useMemo(() => ({
    expanded,
    disabled,
    disableGutters,
    toggle: handleChange
  }), [expanded, disabled, disableGutters, handleChange]);
  const ownerState = {
    ...props,
    disabled,
    disableGutters,
    expanded
  };
  const classes = useUtilityClasses$V(ownerState);
  const externalForwardedProps = {
    slots,
    slotProps
  };
  const [RootSlot, rootProps] = useSlot("root", {
    elementType: AccordionRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other
    },
    className: clsx(classes.root, className),
    shouldForwardComponentProp: true,
    ownerState,
    ref
  });
  const [AccordionHeadingSlot, accordionProps] = useSlot("heading", {
    elementType: AccordionHeading,
    externalForwardedProps,
    className: classes.heading,
    ownerState
  });
  const [TransitionSlot, transitionProps] = useSlot("transition", {
    elementType: Collapse,
    externalForwardedProps,
    ownerState
  });
  const [AccordionRegionSlot, accordionRegionProps] = useSlot("region", {
    elementType: AccordionRegion,
    externalForwardedProps,
    ownerState,
    className: classes.region,
    additionalProps: {
      "aria-labelledby": summary.props.id,
      id: summary.props["aria-controls"],
      role: "region"
    }
  });
  return /* @__PURE__ */ jsxs(RootSlot, {
    ...rootProps,
    children: [/* @__PURE__ */ jsx(AccordionHeadingSlot, {
      ...accordionProps,
      children: /* @__PURE__ */ jsx(AccordionContext.Provider, {
        value: contextValue,
        children: summary
      })
    }), /* @__PURE__ */ jsx(TransitionSlot, {
      in: expanded,
      timeout: "auto",
      ...transitionProps,
      children: /* @__PURE__ */ jsx(AccordionRegionSlot, {
        ...accordionRegionProps,
        children
      })
    })]
  });
});
process.env.NODE_ENV !== "production" ? Accordion.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: chainPropTypes(PropTypes.node.isRequired, (props) => {
    const summary = React.Children.toArray(props.children)[0];
    if (isFragment(summary)) {
      return new Error("MUI: The Accordion doesn't accept a Fragment as a child. Consider providing an array instead.");
    }
    if (!/* @__PURE__ */ React.isValidElement(summary)) {
      return new Error("MUI: Expected the first child of Accordion to be a valid element.");
    }
    return null;
  }),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, expands the accordion by default.
   * @default false
   */
  defaultExpanded: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, it removes the margin between two expanded accordion items and prevents the increased height when expanded.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * If `true`, expands the accordion, otherwise collapses it.
   * Setting this prop enables control over the accordion.
   */
  expanded: PropTypes.bool,
  /**
   * Callback fired when the expand/collapse state is changed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {boolean} expanded The `expanded` state of the accordion.
   */
  onChange: PropTypes.func,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    heading: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    region: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    transition: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    heading: PropTypes.elementType,
    region: PropTypes.elementType,
    root: PropTypes.elementType,
    transition: PropTypes.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
function getAccordionDetailsUtilityClass(slot) {
  return generateUtilityClass("MuiAccordionDetails", slot);
}
generateUtilityClasses("MuiAccordionDetails", ["root"]);
const useUtilityClasses$U = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getAccordionDetailsUtilityClass, classes);
};
const AccordionDetailsRoot = styled("div", {
  name: "MuiAccordionDetails",
  slot: "Root"
})(memoTheme(({
  theme
}) => ({
  padding: theme.spacing(1, 2, 2)
})));
const AccordionDetails = /* @__PURE__ */ React.forwardRef(function AccordionDetails2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiAccordionDetails"
  });
  const {
    className,
    ...other
  } = props;
  const ownerState = props;
  const classes = useUtilityClasses$U(ownerState);
  return /* @__PURE__ */ jsx(AccordionDetailsRoot, {
    className: clsx(classes.root, className),
    ref,
    ownerState,
    ...other
  });
});
process.env.NODE_ENV !== "production" ? AccordionDetails.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
function useFocusableWhenDisabled(parameters) {
  const {
    focusableWhenDisabled,
    disabled,
    composite = false,
    tabIndex: tabIndexProp = 0,
    isNativeButton
  } = parameters;
  const isFocusableComposite = composite && focusableWhenDisabled !== false;
  const isNonFocusableComposite = composite && focusableWhenDisabled === false;
  const props = React.useMemo(() => {
    const additionalProps = {
      // allow Tabbing away from focusableWhenDisabled elements
      onKeyDown(event) {
        if (disabled && focusableWhenDisabled && event.key !== "Tab") {
          event.preventDefault();
        }
      }
    };
    if (!composite) {
      additionalProps.tabIndex = tabIndexProp;
      if (!isNativeButton && disabled) {
        additionalProps.tabIndex = focusableWhenDisabled ? tabIndexProp : -1;
      }
    }
    if (isNativeButton && (focusableWhenDisabled || isFocusableComposite) || !isNativeButton && disabled) {
      additionalProps["aria-disabled"] = disabled;
    }
    if (isNativeButton && (!focusableWhenDisabled || isNonFocusableComposite)) {
      additionalProps.disabled = disabled;
    }
    return additionalProps;
  }, [composite, disabled, focusableWhenDisabled, isFocusableComposite, isNonFocusableComposite, isNativeButton, tabIndexProp]);
  return props;
}
const EMPTY = {};
function useButtonBase(parameters) {
  const {
    nativeButton,
    nativeButtonProp,
    internalNativeButton = nativeButton,
    allowInferredHostMismatch = false,
    disabled,
    type,
    hasFormAction = false,
    tabIndex = 0,
    focusableWhenDisabled: focusableWhenDisabledParam,
    stopEventPropagation = false,
    onBeforeKeyDown,
    onBeforeKeyUp
  } = parameters;
  const rootRef = React.useRef(null);
  const focusableWhenDisabled = focusableWhenDisabledParam === true;
  const focusableWhenDisabledProps = useFocusableWhenDisabled({
    focusableWhenDisabled,
    disabled,
    isNativeButton: nativeButton,
    tabIndex
  });
  if (process.env.NODE_ENV !== "production") {
    React.useEffect(() => {
      const root2 = rootRef.current;
      if (root2 == null) {
        return;
      }
      const isButtonTag = root2.tagName === "BUTTON";
      if (nativeButtonProp !== void 0) {
        if (nativeButtonProp && !isButtonTag) {
          const message = "MUI: A component that acts as a button expected a native <button> because the `nativeButton` prop is true. Rendering a non-<button> removes native button semantics, which can impact forms and accessibility. Render a real <button> or set `nativeButton` to `false`.";
          console.error(message);
        }
        if (!nativeButtonProp && isButtonTag) {
          const message = "MUI: A component that acts as a button expected a non-<button> because the `nativeButton` prop is false. Rendering a <button> keeps native behavior while additionally applies non-native attributes and handlers, which can add unintended extra attributes (such as `role` or `aria-disabled`). Render a non-<button> such as <div>, or set `nativeButton` to `true`.";
          console.error(message);
        }
        return;
      }
      if (allowInferredHostMismatch) {
        return;
      }
      if (internalNativeButton && !isButtonTag) {
        const message = "MUI: A component rendering a native <button> resolved to a non-<button> element, but `nativeButton={false}` was not specified and the resolved root is a non-<button>. When rendering a custom component, set `nativeButton={false}` explicitly or render a <button> element.";
        console.error(message);
      }
      if (!internalNativeButton && isButtonTag) {
        const message = "MUI: A component that acts as a non-native button resolved to a native <button> element, but `nativeButton={true}` was not specified. When rendering a custom component, set `nativeButton={true}` explicitly or render a non-<button> element.";
        console.error(message);
      }
    }, [allowInferredHostMismatch, internalNativeButton, nativeButtonProp]);
  }
  const hasNativeKeyboardActivation = React.useCallback(() => {
    const root2 = rootRef.current;
    if (root2 == null) {
      return nativeButton;
    }
    if (root2.tagName === "BUTTON") {
      return true;
    }
    return Boolean(root2.tagName === "A" && root2.href);
  }, [nativeButton]);
  const buttonProps = React.useMemo(() => {
    const resolvedButtonProps = focusableWhenDisabled ? {} : {
      tabIndex: disabled ? -1 : tabIndex
    };
    if (nativeButton) {
      resolvedButtonProps.type = type === void 0 && !hasFormAction ? "button" : type;
      if (!focusableWhenDisabled) {
        resolvedButtonProps.disabled = disabled;
      }
    } else {
      resolvedButtonProps.role = "button";
      if (!focusableWhenDisabled && disabled) {
        resolvedButtonProps["aria-disabled"] = disabled;
      }
    }
    if (focusableWhenDisabled) {
      return {
        ...resolvedButtonProps,
        ...focusableWhenDisabledProps
      };
    }
    return resolvedButtonProps;
  }, [disabled, focusableWhenDisabled, focusableWhenDisabledProps, hasFormAction, nativeButton, tabIndex, type]);
  const getButtonProps = React.useCallback((externalProps = EMPTY) => {
    const {
      onClick: externalOnClick,
      onKeyDown: externalOnKeyDown,
      onKeyUp: externalOnKeyUp,
      ...otherExternalProps
    } = externalProps;
    const handleClick = (event) => {
      if (stopEventPropagation) {
        event.stopPropagation();
      }
      if (disabled) {
        event.preventDefault();
        return;
      }
      externalOnClick?.(event);
    };
    const handleKeyDown = (event) => {
      if (focusableWhenDisabled) {
        focusableWhenDisabledProps.onKeyDown(event);
      }
      if (disabled) {
        return;
      }
      onBeforeKeyDown?.(event);
      externalOnKeyDown?.(event);
      if (event.target !== event.currentTarget || hasNativeKeyboardActivation()) {
        return;
      }
      if (event.key === " ") {
        event.preventDefault();
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        event.currentTarget.click();
      }
    };
    const handleKeyUp = (event) => {
      if (disabled) {
        return;
      }
      onBeforeKeyUp?.(event);
      externalOnKeyUp?.(event);
      if (event.target === event.currentTarget && !hasNativeKeyboardActivation() && event.key === " " && !event.defaultPrevented) {
        event.currentTarget.click();
      }
    };
    return {
      ...buttonProps,
      ...otherExternalProps,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp
    };
  }, [buttonProps, disabled, focusableWhenDisabled, focusableWhenDisabledProps, hasNativeKeyboardActivation, onBeforeKeyDown, onBeforeKeyUp, stopEventPropagation]);
  return {
    getButtonProps,
    rootRef
  };
}
class LazyRipple {
  /** React ref to the ripple instance */
  /** If the ripple component should be mounted */
  /** Promise that resolves when the ripple component is mounted */
  /** If the ripple component has been mounted */
  /** React state hook setter */
  static create() {
    return new LazyRipple();
  }
  static use() {
    const ripple = useLazyRef(LazyRipple.create).current;
    const [shouldMount, setShouldMount] = React.useState(false);
    ripple.shouldMount = shouldMount;
    ripple.setShouldMount = setShouldMount;
    React.useEffect(ripple.mountEffect, [shouldMount]);
    return ripple;
  }
  constructor() {
    this.ref = {
      current: null
    };
    this.mounted = null;
    this.didMount = false;
    this.shouldMount = false;
    this.setShouldMount = null;
  }
  mount() {
    if (!this.mounted) {
      this.mounted = createControlledPromise();
      this.shouldMount = true;
      this.setShouldMount(this.shouldMount);
    }
    return this.mounted;
  }
  mountEffect = () => {
    if (this.shouldMount && !this.didMount) {
      if (this.ref.current !== null) {
        this.didMount = true;
        this.mounted.resolve();
      }
    }
  };
  /* Ripple API */
  start(...args) {
    this.mount().then(() => this.ref.current?.start(...args));
  }
  stop(...args) {
    this.mount().then(() => this.ref.current?.stop(...args));
  }
  pulsate(...args) {
    this.mount().then(() => this.ref.current?.pulsate(...args));
  }
}
function useLazyRipple() {
  return LazyRipple.use();
}
function createControlledPromise() {
  let resolve;
  let reject;
  const p = new Promise((resolveFn, rejectFn) => {
    resolve = resolveFn;
    reject = rejectFn;
  });
  p.resolve = resolve;
  p.reject = reject;
  return p;
}
function Ripple(props) {
  const {
    className,
    classes,
    pulsate = false,
    rippleX,
    rippleY,
    rippleSize,
    in: inProp,
    onExited,
    timeout
  } = props;
  const [leaving, setLeaving] = React.useState(false);
  const exitTimer = useTimeout();
  const exitTimerStartedRef = React.useRef(false);
  const onExitedRef = React.useRef(onExited);
  onExitedRef.current = onExited;
  const hasExitedCallback = onExited != null;
  const rippleClassName = clsx(className, classes.ripple, classes.rippleVisible, pulsate && classes.ripplePulsate);
  const rippleStyles = {
    width: rippleSize,
    height: rippleSize,
    top: -(rippleSize / 2) + rippleY,
    left: -(rippleSize / 2) + rippleX
  };
  const childClassName = clsx(classes.child, leaving && classes.childLeaving, pulsate && classes.childPulsate);
  if (!inProp && !leaving) {
    setLeaving(true);
  }
  React.useEffect(() => {
    if (!inProp && hasExitedCallback) {
      if (!exitTimerStartedRef.current) {
        exitTimerStartedRef.current = true;
        exitTimer.start(timeout, () => {
          exitTimerStartedRef.current = false;
          onExitedRef.current?.();
        });
      }
    } else {
      exitTimerStartedRef.current = false;
      exitTimer.clear();
    }
  }, [exitTimer, hasExitedCallback, inProp, timeout]);
  return /* @__PURE__ */ jsx("span", {
    className: rippleClassName,
    style: rippleStyles,
    children: /* @__PURE__ */ jsx("span", {
      className: childClassName
    })
  });
}
process.env.NODE_ENV !== "production" ? Ripple.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  /**
   * @ignore - controlled by TouchRipple
   */
  in: PropTypes.bool,
  /**
   * @ignore - controlled by TouchRipple
   */
  onExited: PropTypes.func,
  /**
   * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
   */
  pulsate: PropTypes.bool,
  /**
   * Diameter of the ripple.
   */
  rippleSize: PropTypes.number,
  /**
   * Horizontal position of the ripple center.
   */
  rippleX: PropTypes.number,
  /**
   * Vertical position of the ripple center.
   */
  rippleY: PropTypes.number,
  /**
   * Exit delay.
   */
  timeout: PropTypes.number.isRequired
} : void 0;
const touchRippleClasses = generateUtilityClasses("MuiTouchRipple", ["root", "ripple", "rippleVisible", "ripplePulsate", "child", "childLeaving", "childPulsate"]);
const DURATION = 550;
const DELAY_RIPPLE = 80;
const EMPTY_OBJ = {};
const EMPTY_ARRAY = [];
const NOOP = () => {
};
function mergeRippleOrder(prevOrder, nextActiveKeys) {
  const nextKeySet = new Set(nextActiveKeys);
  const nextKeysPending = /* @__PURE__ */ new Map();
  let pendingKeys = [];
  for (const prevKey of prevOrder) {
    if (nextKeySet.has(prevKey)) {
      if (pendingKeys.length > 0) {
        nextKeysPending.set(prevKey, pendingKeys);
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }
  const nextOrder = [];
  for (const nextKey of nextActiveKeys) {
    const pendingBefore = nextKeysPending.get(nextKey);
    if (pendingBefore) {
      nextOrder.push(...pendingBefore);
    }
    nextOrder.push(nextKey);
  }
  nextOrder.push(...pendingKeys);
  return nextOrder;
}
function computeRippleState({
  event,
  element,
  center
}) {
  const rect = element ? element.getBoundingClientRect() : {
    width: 0,
    height: 0,
    left: 0,
    top: 0
  };
  let rippleX;
  let rippleY;
  if (center || event === void 0 || event.clientX === 0 && event.clientY === 0 || !event.clientX && !event.touches) {
    rippleX = Math.round(rect.width / 2);
    rippleY = Math.round(rect.height / 2);
  } else {
    const {
      clientX,
      clientY
    } = event.touches && event.touches.length > 0 ? event.touches[0] : event;
    rippleX = Math.round(clientX - rect.left);
    rippleY = Math.round(clientY - rect.top);
  }
  let rippleSize;
  if (center) {
    rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);
    if (rippleSize % 2 === 0) {
      rippleSize += 1;
    }
  } else {
    const sizeX = Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
    const sizeY = Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
    rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
  }
  return {
    rippleX,
    rippleY,
    rippleSize
  };
}
const enterKeyframe = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`;
const exitKeyframe = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;
const pulsateKeyframe = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`;
function getAnimationStyles(theme) {
  if (theme.motion.reducedMotion === "always") {
    return null;
  }
  const styles2 = css`
    &.${touchRippleClasses.rippleVisible} {
      animation-name: ${enterKeyframe};
      animation-duration: ${DURATION}ms;
      animation-timing-function: ${theme.transitions.easing.easeInOut};
    }

    &.${touchRippleClasses.ripplePulsate} {
      animation-duration: ${theme.transitions.duration.shorter}ms;
    }

    & .${touchRippleClasses.childLeaving} {
      animation-name: ${exitKeyframe};
      animation-duration: ${DURATION}ms;
      animation-timing-function: ${theme.transitions.easing.easeInOut};
    }

    & .${touchRippleClasses.childPulsate} {
      animation-name: ${pulsateKeyframe};
      animation-duration: 2500ms;
      animation-timing-function: ${theme.transitions.easing.easeInOut};
      animation-iteration-count: infinite;
      animation-delay: 200ms;
    }
  `;
  if (theme.motion.reducedMotion === "system") {
    return css`
      @media (prefers-reduced-motion: no-preference) {
        ${styles2}
      }
    `;
  }
  return styles2;
}
const TouchRippleRoot = styled("span", {
  name: "MuiTouchRipple",
  slot: "Root"
})({
  overflow: "hidden",
  pointerEvents: "none",
  position: "absolute",
  zIndex: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: "inherit"
});
const TouchRippleRipple = styled(Ripple, {
  name: "MuiTouchRipple",
  slot: "Ripple"
})`
  opacity: 0;
  position: absolute;

  &.${touchRippleClasses.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
  }

  /*
   * Order matters: 'child', 'childLeaving' and 'childPulsate' apply to the same
   * element with equal specificity, so the later rule wins. 'child' must come
   * before 'childLeaving' so the leaving 'opacity: 0' takes precedence. A focus
   * (pulsate) ripple keeps 'pulsateKeyframe' (no opacity animation) on exit, so
   * it relies on this static 'opacity: 0' to disappear on blur instead of
   * lingering until removal.
   */
  & .${touchRippleClasses.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${touchRippleClasses.childLeaving} {
    opacity: 0;
  }

  & .${touchRippleClasses.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
  }

  ${({
  theme
}) => getAnimationStyles(theme)}
`;
const TouchRipple = /* @__PURE__ */ React.forwardRef(function TouchRipple2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiTouchRipple"
  });
  const theme = useTheme();
  const reducedMotion = useReducedMotion(theme.motion.reducedMotion, false);
  const {
    center: centerProp = false,
    classes = EMPTY_OBJ,
    className,
    ...other
  } = props;
  const [rippleState, setRippleState] = React.useState({
    items: EMPTY_ARRAY,
    order: EMPTY_ARRAY
  });
  const ripples = rippleState.items;
  const nextKey = React.useRef(0);
  const rippleCallback = React.useRef(null);
  const mountedRef = React.useRef(false);
  useOnMount(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });
  React.useEffect(() => {
    if (rippleCallback.current) {
      rippleCallback.current();
      rippleCallback.current = null;
    }
  }, [ripples]);
  const ignoringMouseDown = React.useRef(false);
  const startTimer = useTimeout();
  const startTimerCommit = React.useRef(null);
  const container = React.useRef(null);
  const handleExited = useEventCallback((key) => {
    if (!mountedRef.current) {
      return;
    }
    setRippleState((prevState) => {
      const nextItems = prevState.items.filter((ripple) => ripple.key !== key);
      const nextOrder = mergeRippleOrder(prevState.order.filter((rippleKey) => rippleKey !== key), nextItems.filter((ripple) => !ripple.exiting).map((ripple) => ripple.key));
      return {
        items: nextItems,
        order: nextOrder
      };
    });
  });
  const startCommit = useEventCallback((params) => {
    const {
      pulsate: pulsate2,
      rippleX,
      rippleY,
      rippleSize,
      cb
    } = params;
    const key = nextKey.current;
    nextKey.current += 1;
    setRippleState((prevState) => {
      const nextItems = [...prevState.items, {
        key,
        pulsate: pulsate2,
        rippleX,
        rippleY,
        rippleSize,
        exiting: false
      }];
      return {
        items: nextItems,
        order: mergeRippleOrder(prevState.order, nextItems.filter((ripple) => !ripple.exiting).map((ripple) => ripple.key))
      };
    });
    rippleCallback.current = cb;
  });
  const start = useEventCallback((event = EMPTY_OBJ, options = EMPTY_OBJ, cb = NOOP) => {
    const {
      pulsate: pulsate2 = false,
      center = centerProp || options.pulsate,
      fakeElement = false
      // Used only by tests.
    } = options;
    if (event?.type === "mousedown" && ignoringMouseDown.current) {
      ignoringMouseDown.current = false;
      return;
    }
    if (event?.type === "touchstart") {
      ignoringMouseDown.current = true;
    }
    const element = fakeElement ? null : container.current;
    const {
      rippleX,
      rippleY,
      rippleSize
    } = computeRippleState({
      event,
      element,
      center
    });
    if (event?.touches) {
      if (startTimerCommit.current === null) {
        startTimerCommit.current = () => {
          startCommit({
            pulsate: pulsate2,
            rippleX,
            rippleY,
            rippleSize,
            cb
          });
        };
        startTimer.start(DELAY_RIPPLE, () => {
          if (startTimerCommit.current) {
            startTimerCommit.current();
            startTimerCommit.current = null;
          }
        });
      }
    } else {
      startCommit({
        pulsate: pulsate2,
        rippleX,
        rippleY,
        rippleSize,
        cb
      });
    }
  });
  const pulsate = useEventCallback(() => {
    start(EMPTY_OBJ, {
      pulsate: true
    });
  });
  const stop = useEventCallback((event, cb) => {
    startTimer.clear();
    if (event?.type === "touchend" && startTimerCommit.current) {
      startTimerCommit.current();
      startTimerCommit.current = null;
      startTimer.start(0, () => {
        stop(event, cb);
      });
      return;
    }
    startTimerCommit.current = null;
    setRippleState((prevState) => {
      const firstActiveIndex = prevState.items.findIndex((ripple) => !ripple.exiting);
      if (firstActiveIndex === -1) {
        return prevState;
      }
      const nextItems = prevState.items.slice();
      nextItems[firstActiveIndex] = {
        ...nextItems[firstActiveIndex],
        exiting: true
      };
      return {
        items: nextItems,
        order: mergeRippleOrder(prevState.order, nextItems.filter((ripple) => !ripple.exiting).map((ripple) => ripple.key))
      };
    });
    rippleCallback.current = cb;
  });
  React.useImperativeHandle(ref, () => ({
    pulsate,
    start,
    stop
  }), [pulsate, start, stop]);
  const rippleByKey = new Map(ripples.map((ripple) => [ripple.key, ripple]));
  const orderedRipples = rippleState.order.map((rippleKey) => rippleByKey.get(rippleKey)).filter(Boolean);
  return /* @__PURE__ */ jsx(TouchRippleRoot, {
    className: clsx(touchRippleClasses.root, classes.root, className),
    ref: container,
    ...other,
    children: orderedRipples.map((ripple) => /* @__PURE__ */ jsx(TouchRippleRipple, {
      classes: {
        ripple: clsx(classes.ripple, touchRippleClasses.ripple),
        rippleVisible: clsx(classes.rippleVisible, touchRippleClasses.rippleVisible),
        ripplePulsate: clsx(classes.ripplePulsate, touchRippleClasses.ripplePulsate),
        child: clsx(classes.child, touchRippleClasses.child),
        childLeaving: clsx(classes.childLeaving, touchRippleClasses.childLeaving),
        childPulsate: clsx(classes.childPulsate, touchRippleClasses.childPulsate)
      },
      timeout: reducedMotion.shouldReduceMotion ? 0 : DURATION,
      pulsate: ripple.pulsate,
      rippleX: ripple.rippleX,
      rippleY: ripple.rippleY,
      rippleSize: ripple.rippleSize,
      in: !ripple.exiting,
      onExited: () => handleExited(ripple.key)
    }, ripple.key))
  });
});
process.env.NODE_ENV !== "production" ? TouchRipple.propTypes = {
  /**
   * If `true`, the ripple starts at the center of the component
   * rather than at the point of interaction.
   */
  center: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string
} : void 0;
function getButtonBaseUtilityClass(slot) {
  return generateUtilityClass("MuiButtonBase", slot);
}
const buttonBaseClasses = generateUtilityClasses("MuiButtonBase", ["root", "disabled", "focusVisible"]);
const useUtilityClasses$T = (ownerState) => {
  const {
    disabled,
    focusVisible,
    focusVisibleClassName,
    suppressFocusVisible,
    classes
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && !suppressFocusVisible && "focusVisible"]
  };
  const composedClasses = composeClasses(slots, getButtonBaseUtilityClass, classes);
  if (focusVisible && !suppressFocusVisible && focusVisibleClassName) {
    composedClasses.root += ` ${focusVisibleClassName}`;
  }
  return composedClasses;
};
const ButtonBaseRoot = styled("button", {
  name: "MuiButtonBase",
  slot: "Root"
})({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  WebkitTapHighlightColor: "transparent",
  backgroundColor: "transparent",
  // Reset default value
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
  border: 0,
  margin: 0,
  // Remove the margin in Safari
  borderRadius: 0,
  padding: 0,
  // Remove the padding in Firefox
  cursor: "pointer",
  userSelect: "none",
  verticalAlign: "middle",
  MozAppearance: "none",
  // Reset
  WebkitAppearance: "none",
  // Reset
  textDecoration: "none",
  // So we take precedent over the style of a native <a /> element.
  color: "inherit",
  "&::-moz-focus-inner": {
    borderStyle: "none"
    // Remove Firefox dotted outline.
  },
  [`&.${buttonBaseClasses.disabled}`]: {
    pointerEvents: "none",
    // Disable link interactions
    cursor: "default"
  },
  "@media print": {
    colorAdjust: "exact"
  }
});
const ButtonBase = /* @__PURE__ */ React.forwardRef(function ButtonBase2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiButtonBase"
  });
  const {
    action,
    centerRipple = false,
    children,
    className,
    component = "button",
    disabled = false,
    disableRipple = false,
    disableTouchRipple = false,
    focusRipple = false,
    focusVisibleClassName,
    /* eslint-disable react/prop-types */
    // replaces internal handling in Chip, other components can opt-in individually to use this in the future
    focusableWhenDisabled,
    // escape hatch to suppress the focusVisible state and callback
    // used by anchored <Menu>s to to suppress focus visible styling when opened with a pointer
    suppressFocusVisible = false,
    // private prop to allow native vs non-native button props to be resolved before mount
    internalNativeButton: internalNativeButtonProp,
    /* eslint-enable react/prop-types */
    LinkComponent = "a",
    nativeButton: nativeButtonProp,
    onBlur,
    onClick: onClickProp,
    onContextMenu,
    onDragLeave,
    onFocus,
    onFocusVisible,
    onKeyDown: onKeyDownProp,
    onKeyUp: onKeyUpProp,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    tabIndex = 0,
    TouchRippleProps,
    touchRippleRef,
    type,
    ...other
  } = props;
  const isLink = Boolean(other.href || other.to);
  const hasFormAction = Boolean(other.formAction);
  let ComponentProp = component;
  if (ComponentProp === "button" && isLink) {
    ComponentProp = LinkComponent;
  }
  const internalNativeButton = typeof ComponentProp === "string" ? ComponentProp === "button" : internalNativeButtonProp ?? false;
  const nativeButton = nativeButtonProp ?? internalNativeButton;
  const ripple = useLazyRipple();
  const handleRippleRef = useForkRef(ripple.ref, touchRippleRef);
  const [focusVisible, setFocusVisible] = React.useState(false);
  if ((disabled || suppressFocusVisible) && focusVisible) {
    setFocusVisible(false);
  }
  const handleBeforeKeyDown = useEventCallback((event) => {
    if (focusRipple && !event.repeat && focusVisible && event.key === " ") {
      ripple.stop(event, () => {
        ripple.start(event);
      });
    }
  });
  const handleBeforeKeyUp = useEventCallback((event) => {
    if (focusRipple && event.key === " " && focusVisible && !event.defaultPrevented) {
      ripple.stop(event, () => {
        ripple.pulsate(event);
      });
    }
  });
  const {
    getButtonProps,
    rootRef: buttonRef
  } = useButtonBase({
    nativeButton,
    nativeButtonProp,
    internalNativeButton,
    allowInferredHostMismatch: isLink || typeof ComponentProp === "string",
    disabled,
    type,
    hasFormAction,
    tabIndex,
    onBeforeKeyDown: handleBeforeKeyDown,
    onBeforeKeyUp: handleBeforeKeyUp
  });
  const {
    onClick,
    onKeyDown,
    onKeyUp,
    ...buttonProps
  } = getButtonProps({
    onClick: onClickProp,
    onKeyDown: onKeyDownProp,
    onKeyUp: onKeyUpProp
  });
  React.useImperativeHandle(action, () => ({
    focusVisible: () => {
      setFocusVisible(true);
      buttonRef.current.focus();
    }
  }), [buttonRef]);
  const enableTouchRipple = ripple.shouldMount && !disableRipple && !disabled;
  React.useEffect(() => {
    if (focusVisible && focusRipple && !disableRipple) {
      ripple.pulsate();
    }
  }, [disableRipple, focusRipple, focusVisible, ripple]);
  const handleMouseDown = useRippleHandler(ripple, "start", onMouseDown, disableTouchRipple);
  const handleContextMenu = useRippleHandler(ripple, "stop", onContextMenu, disableTouchRipple);
  const handleDragLeave = useRippleHandler(ripple, "stop", onDragLeave, disableTouchRipple);
  const handleMouseUp = useRippleHandler(ripple, "stop", onMouseUp, disableTouchRipple);
  const handleMouseLeave = useRippleHandler(ripple, "stop", (event) => {
    if (focusVisible) {
      event.preventDefault();
    }
    if (onMouseLeave) {
      onMouseLeave(event);
    }
  }, disableTouchRipple);
  const handleTouchStart = useRippleHandler(ripple, "start", onTouchStart, disableTouchRipple);
  const handleTouchEnd = useRippleHandler(ripple, "stop", onTouchEnd, disableTouchRipple);
  const handleTouchMove = useRippleHandler(ripple, "stop", onTouchMove, disableTouchRipple);
  const handleBlur = useRippleHandler(ripple, "stop", (event) => {
    if (!isFocusVisible(event.target)) {
      setFocusVisible(false);
    }
    if (onBlur) {
      onBlur(event);
    }
  }, false);
  const handleFocus = useEventCallback((event) => {
    if (!buttonRef.current) {
      buttonRef.current = event.currentTarget;
    }
    if (!suppressFocusVisible && isFocusVisible(event.target)) {
      setFocusVisible(true);
      if (onFocusVisible) {
        onFocusVisible(event);
      }
    }
    if (onFocus) {
      onFocus(event);
    }
  });
  const linkProps = {};
  if (isLink) {
    linkProps.tabIndex = disabled ? -1 : tabIndex;
    if (disabled) {
      linkProps["aria-disabled"] = disabled;
    }
    linkProps.type = type;
  }
  const handleRef = useForkRef(ref, buttonRef);
  const ownerState = {
    ...props,
    centerRipple,
    component,
    disabled,
    disableRipple,
    disableTouchRipple,
    focusRipple,
    suppressFocusVisible,
    tabIndex,
    focusVisible
  };
  const classes = useUtilityClasses$T(ownerState);
  return /* @__PURE__ */ jsxs(ButtonBaseRoot, {
    as: ComponentProp,
    className: clsx(classes.root, className),
    ownerState,
    onBlur: handleBlur,
    onClick,
    onContextMenu: handleContextMenu,
    onFocus: handleFocus,
    onKeyDown,
    onKeyUp,
    onMouseDown: handleMouseDown,
    onMouseLeave: handleMouseLeave,
    onMouseUp: handleMouseUp,
    onDragLeave: handleDragLeave,
    onTouchEnd: handleTouchEnd,
    onTouchMove: handleTouchMove,
    onTouchStart: handleTouchStart,
    ref: handleRef,
    ...isLink ? linkProps : buttonProps,
    ...other,
    children: [children, enableTouchRipple ? /* @__PURE__ */ jsx(TouchRipple, {
      ref: handleRippleRef,
      center: centerRipple,
      ...TouchRippleProps
    }) : null]
  });
});
function useRippleHandler(ripple, rippleAction, eventCallback, skipRippleAction = false) {
  return useEventCallback((event) => {
    if (eventCallback) {
      eventCallback(event);
    }
    if (!skipRippleAction) {
      ripple[rippleAction](event);
    }
    return true;
  });
}
process.env.NODE_ENV !== "production" ? ButtonBase.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports `focusVisible()` action.
   */
  action: refType,
  /**
   * If `true`, the ripples are centered.
   * They won't start at the cursor interaction position.
   * @default false
   */
  centerRipple: PropTypes.bool,
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: elementTypeAcceptingRef,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * If `true`, the touch ripple effect is disabled.
   * @default false
   */
  disableTouchRipple: PropTypes.bool,
  /**
   * If `true`, the base button will have a keyboard focus ripple.
   * @default false
   */
  focusRipple: PropTypes.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * @ignore
   */
  formAction: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /**
   * @ignore
   */
  href: PropTypes.any,
  /**
   * The component used to render a link when the `href` prop is provided.
   * @default 'a'
   */
  LinkComponent: PropTypes.elementType,
  /**
   * Whether the custom component is expected to render a native `<button>` element
   * when passing a React component to the `component` or `slots` prop.
   */
  nativeButton: PropTypes.bool,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onContextMenu: PropTypes.func,
  /**
   * @ignore
   */
  onDragLeave: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
   */
  onFocusVisible: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  onKeyUp: PropTypes.func,
  /**
   * @ignore
   */
  onMouseDown: PropTypes.func,
  /**
   * @ignore
   */
  onMouseLeave: PropTypes.func,
  /**
   * @ignore
   */
  onMouseUp: PropTypes.func,
  /**
   * @ignore
   */
  onTouchEnd: PropTypes.func,
  /**
   * @ignore
   */
  onTouchMove: PropTypes.func,
  /**
   * @ignore
   */
  onTouchStart: PropTypes.func,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * @default 0
   */
  tabIndex: PropTypes.number,
  /**
   * Props applied to the `TouchRipple` element.
   */
  TouchRippleProps: PropTypes.object,
  /**
   * A ref that points to the `TouchRipple` element.
   */
  touchRippleRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
    current: PropTypes.shape({
      pulsate: PropTypes.func.isRequired,
      start: PropTypes.func.isRequired,
      stop: PropTypes.func.isRequired
    })
  })]),
  /**
   * The HTML [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#type)
   * attribute applied to `button` and `a` elements.
   * Ignored when rendering non-native buttons.
   * @default 'button'
   */
  type: PropTypes.string
} : void 0;
const useUtilityClasses$S = (ownerState) => {
  const {
    classes,
    expanded,
    disabled,
    disableGutters
  } = ownerState;
  const slots = {
    root: ["root", expanded && "expanded", disabled && "disabled", !disableGutters && "gutters"],
    focusVisible: ["focusVisible"],
    content: ["content", expanded && "expanded"],
    expandIconWrapper: ["expandIconWrapper", expanded && "expanded"]
  };
  return composeClasses(slots, getAccordionSummaryUtilityClass, classes);
};
const AccordionSummaryRoot = styled(ButtonBase, {
  name: "MuiAccordionSummary",
  slot: "Root"
})(memoTheme(({
  theme
}) => ({
  display: "flex",
  width: "100%",
  minHeight: 48,
  padding: theme.spacing(0, 2),
  ...getTransitionStyles(theme, ["min-height", "background-color"], {
    duration: theme.transitions.duration.shortest
  }),
  [`&.${accordionSummaryClasses.focusVisible}`]: {
    backgroundColor: (theme.vars || theme).palette.action.focus
  },
  [`&.${accordionSummaryClasses.disabled}`]: {
    opacity: (theme.vars || theme).palette.action.disabledOpacity
  },
  [`&:hover:not(.${accordionSummaryClasses.disabled})`]: {
    cursor: "pointer"
  },
  variants: [{
    props: (props) => !props.disableGutters,
    style: {
      [`&.${accordionSummaryClasses.expanded}`]: {
        minHeight: 64
      }
    }
  }]
})));
const AccordionSummaryContent = styled("span", {
  name: "MuiAccordionSummary",
  slot: "Content"
})(memoTheme(({
  theme
}) => ({
  display: "flex",
  textAlign: "start",
  flexGrow: 1,
  margin: "12px 0",
  variants: [{
    props: (props) => !props.disableGutters,
    style: {
      ...getTransitionStyles(theme, ["margin"], {
        duration: theme.transitions.duration.shortest
      }),
      [`&.${accordionSummaryClasses.expanded}`]: {
        margin: "20px 0"
      }
    }
  }]
})));
const AccordionSummaryExpandIconWrapper = styled("span", {
  name: "MuiAccordionSummary",
  slot: "ExpandIconWrapper"
})(memoTheme(({
  theme
}) => ({
  display: "flex",
  color: (theme.vars || theme).palette.action.active,
  transform: "rotate(0deg)",
  ...getTransitionStyles(theme, "transform", {
    duration: theme.transitions.duration.shortest
  }),
  [`&.${accordionSummaryClasses.expanded}`]: {
    transform: "rotate(180deg)"
  }
})));
const AccordionSummary = /* @__PURE__ */ React.forwardRef(function AccordionSummary2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiAccordionSummary"
  });
  const {
    children,
    className,
    expandIcon,
    focusVisibleClassName,
    onClick,
    slots,
    slotProps,
    ...other
  } = props;
  const {
    disabled = false,
    disableGutters,
    expanded,
    toggle
  } = React.useContext(AccordionContext);
  const handleChange = (event) => {
    if (toggle) {
      toggle(event);
    }
    if (onClick) {
      onClick(event);
    }
  };
  const ownerState = {
    ...props,
    expanded,
    disabled,
    disableGutters
  };
  const classes = useUtilityClasses$S(ownerState);
  const externalForwardedProps = {
    slots,
    slotProps
  };
  const [RootSlot, rootSlotProps] = useSlot("root", {
    ref,
    shouldForwardComponentProp: true,
    className: clsx(classes.root, className),
    elementType: AccordionSummaryRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other
    },
    ownerState,
    additionalProps: {
      focusRipple: false,
      disableRipple: true,
      internalNativeButton: true,
      disabled,
      "aria-expanded": expanded,
      focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName)
    },
    getSlotProps: (handlers) => ({
      ...handlers,
      onClick: (event) => {
        handlers.onClick?.(event);
        handleChange(event);
      }
    })
  });
  const [ContentSlot, contentSlotProps] = useSlot("content", {
    className: classes.content,
    elementType: AccordionSummaryContent,
    externalForwardedProps,
    ownerState
  });
  const [ExpandIconWrapperSlot, expandIconWrapperSlotProps] = useSlot("expandIconWrapper", {
    className: classes.expandIconWrapper,
    elementType: AccordionSummaryExpandIconWrapper,
    externalForwardedProps,
    ownerState
  });
  return /* @__PURE__ */ jsxs(RootSlot, {
    ...rootSlotProps,
    children: [/* @__PURE__ */ jsx(ContentSlot, {
      ...contentSlotProps,
      children
    }), expandIcon && /* @__PURE__ */ jsx(ExpandIconWrapperSlot, {
      ...expandIconWrapperSlotProps,
      children: expandIcon
    })]
  });
});
process.env.NODE_ENV !== "production" ? AccordionSummary.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * The icon to display as the expand indicator.
   */
  expandIcon: PropTypes.node,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    content: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    expandIconWrapper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    content: PropTypes.elementType,
    expandIconWrapper: PropTypes.elementType,
    root: PropTypes.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
function hasCorrectMainProperty(obj) {
  return typeof obj.main === "string";
}
function checkSimplePaletteColorValues(obj, additionalPropertiesToCheck = []) {
  if (!hasCorrectMainProperty(obj)) {
    return false;
  }
  for (const value of additionalPropertiesToCheck) {
    if (!obj.hasOwnProperty(value) || typeof obj[value] !== "string") {
      return false;
    }
  }
  return true;
}
function createSimplePaletteValueFilter(additionalPropertiesToCheck = []) {
  return ([, value]) => value && checkSimplePaletteColorValues(value, additionalPropertiesToCheck);
}
function getCircularProgressUtilityClass(slot) {
  return generateUtilityClass("MuiCircularProgress", slot);
}
generateUtilityClasses("MuiCircularProgress", ["root", "determinate", "indeterminate", "colorPrimary", "colorSecondary", "svg", "track", "circle", "circleDisableShrink"]);
const SIZE = 44;
let warnedMinMaxWithoutVariant = false;
let warnedInvalidMinMaxValue = false;
const circularRotateKeyframe = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;
const circularDashKeyframe = keyframes`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`;
const rotateAnimation = typeof circularRotateKeyframe !== "string" ? css`
        animation: ${circularRotateKeyframe} 1.4s linear infinite;
      ` : null;
const dashAnimation = typeof circularDashKeyframe !== "string" ? css`
        animation: ${circularDashKeyframe} 1.4s ease-in-out infinite;
      ` : null;
const useUtilityClasses$R = (ownerState) => {
  const {
    classes,
    variant,
    color,
    disableShrink
  } = ownerState;
  const slots = {
    root: ["root", variant, `color${capitalize(color)}`],
    svg: ["svg"],
    track: ["track"],
    circle: ["circle", disableShrink && "circleDisableShrink"]
  };
  return composeClasses(slots, getCircularProgressUtilityClass, classes);
};
const CircularProgressRoot = styled("span", {
  name: "MuiCircularProgress",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, styles2[ownerState.variant], styles2[`color${capitalize(ownerState.color)}`]];
  }
})(memoTheme(({
  theme
}) => {
  const reducedMotionAnimationStyles = getReducedMotionStyles(theme, {
    animation: "none"
  });
  return {
    display: "inline-block",
    variants: [{
      props: {
        variant: "determinate"
      },
      style: {
        ...getTransitionStyles(theme, "transform")
      }
    }, {
      props: {
        variant: "indeterminate"
      },
      style: rotateAnimation || {
        animation: `${circularRotateKeyframe} 1.4s linear infinite`
      }
    }, ...reducedMotionAnimationStyles ? [{
      props: {
        variant: "indeterminate"
      },
      style: reducedMotionAnimationStyles
    }] : [], ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
      props: {
        color
      },
      style: {
        color: (theme.vars || theme).palette[color].main
      }
    }))]
  };
}));
const CircularProgressSVG = styled("svg", {
  name: "MuiCircularProgress",
  slot: "Svg"
})({
  display: "block"
  // Keeps the progress centered
});
const CircularProgressCircle = styled("circle", {
  name: "MuiCircularProgress",
  slot: "Circle",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.circle, ownerState.disableShrink && styles2.circleDisableShrink];
  }
})(memoTheme(({
  theme
}) => {
  const reducedMotionAnimationStyles = getReducedMotionStyles(theme, {
    animation: "none"
  });
  return {
    stroke: "currentColor",
    variants: [{
      props: {
        variant: "determinate"
      },
      style: {
        ...getTransitionStyles(theme, "stroke-dashoffset")
      }
    }, {
      props: {
        variant: "indeterminate"
      },
      style: {
        // Some default value that looks fine while waiting for the animation to kick in.
        strokeDasharray: "80px, 200px",
        strokeDashoffset: 0
        // Add the unit to fix a Edge 16 and below bug.
      }
    }, {
      props: ({
        ownerState
      }) => ownerState.variant === "indeterminate" && !ownerState.disableShrink,
      style: dashAnimation || {
        // At runtime for Pigment CSS, `dashAnimation` will be null and the generated keyframe will be used.
        animation: `${circularDashKeyframe} 1.4s ease-in-out infinite`
      }
    }, ...reducedMotionAnimationStyles ? [{
      props: ({
        ownerState
      }) => ownerState.variant === "indeterminate" && !ownerState.disableShrink,
      style: reducedMotionAnimationStyles
    }] : []]
  };
}));
const CircularProgressTrack = styled("circle", {
  name: "MuiCircularProgress",
  slot: "Track"
})(memoTheme(({
  theme
}) => ({
  stroke: "currentColor",
  opacity: (theme.vars || theme).palette.action.activatedOpacity
})));
const CircularProgress = /* @__PURE__ */ React.forwardRef(function CircularProgress2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiCircularProgress"
  });
  const {
    className,
    color = "primary",
    disableShrink = false,
    enableTrackSlot = false,
    min: minProp,
    max: maxProp,
    size = 40,
    style,
    thickness = 3.6,
    value = props.min ?? 0,
    variant = "indeterminate",
    ...other
  } = props;
  if (process.env.NODE_ENV !== "production") {
    if (!warnedMinMaxWithoutVariant && variant === "indeterminate" && (minProp !== void 0 || maxProp !== void 0)) {
      console.warn(`MUI: You have provided the \`min\` or \`max\` props with an 'indeterminate' variant. These props will have no effect.`);
      warnedMinMaxWithoutVariant = true;
    }
  }
  const min = minProp ?? 0;
  const max = maxProp ?? 100;
  const ownerState = {
    ...props,
    color,
    disableShrink,
    size,
    thickness,
    value,
    variant,
    enableTrackSlot
  };
  const classes = useUtilityClasses$R(ownerState);
  const circleStyle = {};
  const rootStyle = {};
  const rootProps = {};
  if (variant === "determinate") {
    const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
    if (process.env.NODE_ENV !== "production") {
      if (!warnedInvalidMinMaxValue && (value < min || value > max || min >= max)) {
        console.error(`MUI: The min, max, and value props in CircularProgress should be numbers where min < max and min <= value <= max. Received min=${min}, max=${max}, value=${value}.`);
        warnedInvalidMinMaxValue = true;
      }
    }
    const range = max - min;
    circleStyle.strokeDasharray = circumference.toFixed(3);
    circleStyle.strokeDashoffset = range > 0 ? `${((max - value) / range * circumference).toFixed(3)}px` : `${circumference.toFixed(3)}px`;
    rootStyle.transform = "rotate(-90deg)";
    rootProps["aria-valuenow"] = value;
    rootProps["aria-valuemin"] = min;
    rootProps["aria-valuemax"] = max;
  }
  return /* @__PURE__ */ jsx(CircularProgressRoot, {
    className: clsx(classes.root, className),
    style: {
      width: size,
      height: size,
      ...rootStyle,
      ...style
    },
    ownerState,
    ref,
    role: "progressbar",
    ...rootProps,
    ...other,
    children: /* @__PURE__ */ jsxs(CircularProgressSVG, {
      className: classes.svg,
      ownerState,
      viewBox: `${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`,
      children: [enableTrackSlot ? /* @__PURE__ */ jsx(CircularProgressTrack, {
        className: classes.track,
        ownerState,
        cx: SIZE,
        cy: SIZE,
        r: (SIZE - thickness) / 2,
        fill: "none",
        strokeWidth: thickness,
        "aria-hidden": "true"
      }) : null, /* @__PURE__ */ jsx(CircularProgressCircle, {
        className: classes.circle,
        style: circleStyle,
        ownerState,
        cx: SIZE,
        cy: SIZE,
        r: (SIZE - thickness) / 2,
        fill: "none",
        strokeWidth: thickness
      })]
    })
  });
});
process.env.NODE_ENV !== "production" ? CircularProgress.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes.oneOfType([PropTypes.oneOf(["inherit", "primary", "secondary", "error", "info", "success", "warning"]), PropTypes.string]),
  /**
   * If `true`, the shrink animation is disabled.
   * This only works if variant is `indeterminate`.
   * @default false
   */
  disableShrink: chainPropTypes(PropTypes.bool, (props) => {
    if (props.disableShrink && props.variant && props.variant !== "indeterminate") {
      return new Error("MUI: You have provided the `disableShrink` prop with a variant other than `indeterminate`. This will have no effect.");
    }
    return null;
  }),
  /**
   * If `true`, a track circle slot is mounted to show a subtle background for the progress.
   * The `size` and `thickness` apply to the track slot to be consistent with the progress circle.
   * @default false
   */
  enableTrackSlot: PropTypes.bool,
  /**
   * The maximum value for the progress indicator for the determinate variant.
   * @default 100
   */
  max: PropTypes.number,
  /**
   * The minimum value for the progress indicator for the determinate variant.
   * @default 0
   */
  min: PropTypes.number,
  /**
   * The size of the component.
   * If using a number, the pixel unit is assumed.
   * If using a string, you need to provide the CSS unit, for example '3rem'.
   * @default 40
   */
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The thickness of the circle.
   * @default 3.6
   */
  thickness: PropTypes.number,
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between `min` and `max`.
   * @default props.min ?? 0
   */
  value: PropTypes.number,
  /**
   * The variant to use.
   * Use indeterminate when there is no progress value.
   * @default 'indeterminate'
   */
  variant: PropTypes.oneOf(["determinate", "indeterminate"])
} : void 0;
function getIconButtonUtilityClass(slot) {
  return generateUtilityClass("MuiIconButton", slot);
}
const iconButtonClasses = generateUtilityClasses("MuiIconButton", ["root", "disabled", "colorInherit", "colorPrimary", "colorSecondary", "colorError", "colorInfo", "colorSuccess", "colorWarning", "edgeStart", "edgeEnd", "sizeSmall", "sizeMedium", "sizeLarge", "loading", "loadingIndicator", "loadingWrapper"]);
const useUtilityClasses$Q = (ownerState) => {
  const {
    classes,
    disabled,
    color,
    edge,
    size,
    loading
  } = ownerState;
  const slots = {
    root: ["root", loading && "loading", disabled && "disabled", color !== "default" && `color${capitalize(color)}`, edge && `edge${capitalize(edge)}`, `size${capitalize(size)}`],
    loadingIndicator: ["loadingIndicator"],
    loadingWrapper: ["loadingWrapper"]
  };
  return composeClasses(slots, getIconButtonUtilityClass, classes);
};
const IconButtonRoot = styled(ButtonBase, {
  name: "MuiIconButton",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.loading && styles2.loading, ownerState.color !== "default" && styles2[`color${capitalize(ownerState.color)}`], ownerState.edge && styles2[`edge${capitalize(ownerState.edge)}`], styles2[`size${capitalize(ownerState.size)}`]];
  }
})(memoTheme(({
  theme
}) => ({
  textAlign: "center",
  flex: "0 0 auto",
  fontSize: theme.typography.pxToRem(24),
  padding: 8,
  borderRadius: "50%",
  color: (theme.vars || theme).palette.action.active,
  ...getTransitionStyles(theme, "background-color", {
    duration: theme.transitions.duration.shortest
  }),
  variants: [{
    props: (props) => !props.disableRipple,
    style: {
      "--IconButton-hoverBg": theme.alpha((theme.vars || theme).palette.action.active, (theme.vars || theme).palette.action.hoverOpacity),
      "&:hover": {
        backgroundColor: "var(--IconButton-hoverBg)",
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      }
    }
  }, {
    props: {
      edge: "start"
    },
    style: {
      marginLeft: -12
    }
  }, {
    props: {
      edge: "start",
      size: "small"
    },
    style: {
      marginLeft: -3
    }
  }, {
    props: {
      edge: "end"
    },
    style: {
      marginRight: -12
    }
  }, {
    props: {
      edge: "end",
      size: "small"
    },
    style: {
      marginRight: -3
    }
  }]
})), memoTheme(({
  theme
}) => ({
  variants: [{
    props: {
      color: "inherit"
    },
    style: {
      color: "inherit"
    }
  }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
    props: {
      color
    },
    style: {
      color: (theme.vars || theme).palette[color].main,
      "--IconButton-hoverBg": theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.hoverOpacity)
    }
  })), {
    props: {
      size: "small"
    },
    style: {
      padding: 5,
      fontSize: theme.typography.pxToRem(18)
    }
  }, {
    props: {
      size: "large"
    },
    style: {
      padding: 12,
      fontSize: theme.typography.pxToRem(28)
    }
  }],
  [`&.${iconButtonClasses.disabled}`]: {
    backgroundColor: "transparent",
    color: (theme.vars || theme).palette.action.disabled
  },
  [`&.${iconButtonClasses.loading}`]: {
    color: "transparent"
  }
})));
const IconButtonLoadingIndicator = styled("span", {
  name: "MuiIconButton",
  slot: "LoadingIndicator"
})(({
  theme
}) => ({
  display: "none",
  position: "absolute",
  visibility: "visible",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: (theme.vars || theme).palette.action.disabled,
  variants: [{
    props: {
      loading: true
    },
    style: {
      display: "flex"
    }
  }]
}));
const IconButton = /* @__PURE__ */ React.forwardRef(function IconButton2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiIconButton"
  });
  const {
    edge = false,
    children,
    className,
    color = "default",
    disabled = false,
    disableFocusRipple = false,
    size = "medium",
    id: idProp,
    loading = null,
    loadingIndicator: loadingIndicatorProp,
    ...other
  } = props;
  const loadingId = useId(idProp);
  const loadingIndicator = loadingIndicatorProp ?? /* @__PURE__ */ jsx(CircularProgress, {
    "aria-labelledby": loadingId,
    color: "inherit",
    size: 16
  });
  const ownerState = {
    ...props,
    edge,
    color,
    disabled,
    disableFocusRipple,
    loading,
    loadingIndicator,
    size
  };
  const classes = useUtilityClasses$Q(ownerState);
  return /* @__PURE__ */ jsxs(IconButtonRoot, {
    id: loading ? loadingId : idProp,
    className: clsx(classes.root, className),
    centerRipple: true,
    internalNativeButton: true,
    focusRipple: !disableFocusRipple,
    disabled: disabled || loading,
    ref,
    ...other,
    ownerState,
    children: [typeof loading === "boolean" && // use plain HTML span to minimize the runtime overhead
    /* @__PURE__ */ jsx("span", {
      className: classes.loadingWrapper,
      style: {
        display: "contents"
      },
      children: /* @__PURE__ */ jsx(IconButtonLoadingIndicator, {
        className: classes.loadingIndicator,
        ownerState,
        children: loading && loadingIndicator
      })
    }), children]
  });
});
process.env.NODE_ENV !== "production" ? IconButton.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The icon to display.
   */
  children: chainPropTypes(PropTypes.node, (props) => {
    const found = React.Children.toArray(props.children).some((child) => /* @__PURE__ */ React.isValidElement(child) && child.props.onClick);
    if (found) {
      return new Error(["MUI: You are providing an onClick event listener to a child of a button element.", "Prefer applying it to the IconButton directly.", "This guarantees that the whole <button> will be responsive to click events."].join("\n"));
    }
    return null;
  }),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'default'
   */
  color: PropTypes.oneOfType([PropTypes.oneOf(["inherit", "default", "primary", "secondary", "error", "info", "success", "warning"]), PropTypes.string]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: PropTypes.oneOf(["end", "start", false]),
  /**
   * @ignore
   */
  id: PropTypes.string,
  /**
   * If `true`, the loading indicator is visible and the button is disabled.
   * If `true | false`, the loading wrapper is always rendered before the children to prevent [Google Translation Crash](https://github.com/mui/material-ui/issues/27853).
   * @default null
   */
  loading: PropTypes.bool,
  /**
   * Element placed before the children if the button is in loading state.
   * The node should contain an element with `role="progressbar"` with an accessible name.
   * By default, it renders a `CircularProgress` that is labeled by the button itself.
   * @default <CircularProgress color="inherit" size={16} />
   */
  loadingIndicator: PropTypes.node,
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: PropTypes.oneOfType([PropTypes.oneOf(["small", "medium", "large"]), PropTypes.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
function getTypographyUtilityClass(slot) {
  return generateUtilityClass("MuiTypography", slot);
}
const typographyClasses = generateUtilityClasses("MuiTypography", ["root", "h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "inherit", "button", "caption", "overline", "alignLeft", "alignRight", "alignCenter", "alignJustify", "noWrap", "gutterBottom"]);
const useUtilityClasses$P = (ownerState) => {
  const {
    align,
    gutterBottom,
    noWrap,
    variant,
    classes
  } = ownerState;
  const slots = {
    root: ["root", variant, ownerState.align !== "inherit" && `align${capitalize(align)}`, gutterBottom && "gutterBottom", noWrap && "noWrap"]
  };
  return composeClasses(slots, getTypographyUtilityClass, classes);
};
const TypographyRoot = styled("span", {
  name: "MuiTypography",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.variant && styles2[ownerState.variant], ownerState.align !== "inherit" && styles2[`align${capitalize(ownerState.align)}`], ownerState.noWrap && styles2.noWrap, ownerState.gutterBottom && styles2.gutterBottom];
  }
})(memoTheme(({
  theme
}) => ({
  margin: 0,
  variants: [{
    props: {
      variant: "inherit"
    },
    style: {
      // Some elements, like <button> on Chrome have default font that doesn't inherit, reset this.
      font: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  }, ...Object.entries(theme.typography).filter(([variant, value]) => variant !== "inherit" && value && typeof value === "object").map(([variant, value]) => ({
    props: {
      variant
    },
    style: value
  })), ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
    props: {
      color
    },
    style: {
      color: (theme.vars || theme).palette[color].main
    }
  })), ...Object.entries(theme.palette?.text || {}).filter(([, value]) => typeof value === "string").map(([color]) => ({
    props: {
      color: `text${capitalize(color)}`
    },
    style: {
      color: (theme.vars || theme).palette.text[color]
    }
  })), {
    props: ({
      ownerState
    }) => ownerState.align !== "inherit",
    style: {
      textAlign: "var(--Typography-textAlign)"
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.noWrap,
    style: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.gutterBottom,
    style: {
      marginBottom: "0.35em"
    }
  }]
})));
const defaultVariantMapping = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  inherit: "p"
};
const Typography = /* @__PURE__ */ React.forwardRef(function Typography2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiTypography"
  });
  const {
    color,
    align = "inherit",
    className,
    component,
    gutterBottom = false,
    noWrap = false,
    variant = "body1",
    variantMapping = defaultVariantMapping,
    ...other
  } = props;
  const ownerState = {
    ...props,
    align,
    color,
    className,
    component,
    gutterBottom,
    noWrap,
    variant,
    variantMapping
  };
  const Component = component || variantMapping[variant] || defaultVariantMapping[variant] || "span";
  const classes = useUtilityClasses$P(ownerState);
  return /* @__PURE__ */ jsx(TypographyRoot, {
    as: Component,
    ref,
    className: clsx(classes.root, className),
    ...other,
    ownerState,
    style: {
      ...align !== "inherit" && {
        "--Typography-textAlign": align
      },
      ...other.style
    }
  });
});
process.env.NODE_ENV !== "production" ? Typography.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Set the text-align on the component.
   * @default 'inherit'
   */
  align: PropTypes.oneOf(["center", "inherit", "justify", "left", "right"]),
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
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: PropTypes.oneOfType([PropTypes.oneOf(["primary", "secondary", "success", "error", "info", "warning", "textPrimary", "textSecondary", "textDisabled"]), PropTypes.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the text will have a bottom margin.
   * @default false
   */
  gutterBottom: PropTypes.bool,
  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   * @default false
   */
  noWrap: PropTypes.bool,
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * Applies the theme typography styles.
   * @default 'body1'
   */
  variant: PropTypes.oneOfType([PropTypes.oneOf(["body1", "body2", "button", "caption", "h1", "h2", "h3", "h4", "h5", "h6", "inherit", "overline", "subtitle1", "subtitle2"]), PropTypes.string]),
  /**
   * The component maps the variant prop to a range of different HTML element types.
   * For instance, subtitle1 to `<h6>`.
   * If you wish to change that mapping, you can provide your own.
   * Alternatively, you can use the `component` prop.
   * @default {
   *   h1: 'h1',
   *   h2: 'h2',
   *   h3: 'h3',
   *   h4: 'h4',
   *   h5: 'h5',
   *   h6: 'h6',
   *   subtitle1: 'h6',
   *   subtitle2: 'h6',
   *   body1: 'p',
   *   body2: 'p',
   *   inherit: 'p',
   * }
   */
  variantMapping: PropTypes.object
} : void 0;
function getAppBarUtilityClass(slot) {
  return generateUtilityClass("MuiAppBar", slot);
}
generateUtilityClasses("MuiAppBar", ["root", "positionFixed", "positionAbsolute", "positionSticky", "positionStatic", "positionRelative", "colorDefault", "colorPrimary", "colorSecondary", "colorInherit", "colorTransparent", "colorError", "colorInfo", "colorSuccess", "colorWarning"]);
const useUtilityClasses$O = (ownerState) => {
  const {
    color,
    position,
    classes
  } = ownerState;
  const slots = {
    root: ["root", `color${capitalize(color)}`, `position${capitalize(position)}`]
  };
  return composeClasses(slots, getAppBarUtilityClass, classes);
};
const joinVars = (var1, var2) => var1 ? `${var1.replace(")", "")}, ${var2})` : var2;
const AppBarRoot = styled(Paper, {
  name: "MuiAppBar",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, styles2[`position${capitalize(ownerState.position)}`], styles2[`color${capitalize(ownerState.color)}`]];
  }
})(memoTheme(({
  theme
}) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  boxSizing: "border-box",
  // Prevent padding issue with the Modal and fixed positioned AppBar.
  flexShrink: 0,
  variants: [{
    props: {
      position: "fixed"
    },
    style: {
      position: "fixed",
      zIndex: (theme.vars || theme).zIndex.appBar,
      top: 0,
      left: "auto",
      right: 0,
      "@media print": {
        // Prevent the app bar to be visible on each printed page.
        position: "absolute"
      }
    }
  }, {
    props: {
      position: "absolute"
    },
    style: {
      position: "absolute",
      zIndex: (theme.vars || theme).zIndex.appBar,
      top: 0,
      left: "auto",
      right: 0
    }
  }, {
    props: {
      position: "sticky"
    },
    style: {
      position: "sticky",
      zIndex: (theme.vars || theme).zIndex.appBar,
      top: 0,
      left: "auto",
      right: 0
    }
  }, {
    props: {
      position: "static"
    },
    style: {
      position: "static"
    }
  }, {
    props: {
      position: "relative"
    },
    style: {
      position: "relative"
    }
  }, {
    props: {
      color: "inherit"
    },
    style: {
      "--AppBar-color": "inherit",
      color: "var(--AppBar-color)"
    }
  }, {
    props: {
      color: "default"
    },
    style: {
      "--AppBar-background": theme.vars ? theme.vars.palette.AppBar.defaultBg : theme.palette.grey[100],
      "--AppBar-color": theme.vars ? theme.vars.palette.text.primary : theme.palette.getContrastText(theme.palette.grey[100]),
      ...theme.applyStyles("dark", {
        "--AppBar-background": theme.vars ? theme.vars.palette.AppBar.defaultBg : theme.palette.grey[900],
        "--AppBar-color": theme.vars ? theme.vars.palette.text.primary : theme.palette.getContrastText(theme.palette.grey[900])
      })
    }
  }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["contrastText"])).map(([color]) => ({
    props: {
      color
    },
    style: {
      "--AppBar-background": (theme.vars ?? theme).palette[color].main,
      "--AppBar-color": (theme.vars ?? theme).palette[color].contrastText
    }
  })), {
    props: (props) => props.enableColorOnDark === true && !["inherit", "transparent"].includes(props.color),
    style: {
      backgroundColor: "var(--AppBar-background)",
      color: "var(--AppBar-color)"
    }
  }, {
    props: (props) => props.enableColorOnDark === false && !["inherit", "transparent"].includes(props.color),
    style: {
      backgroundColor: "var(--AppBar-background)",
      color: "var(--AppBar-color)",
      ...theme.applyStyles("dark", {
        backgroundColor: theme.vars ? joinVars(theme.vars.palette.AppBar.darkBg, "var(--AppBar-background)") : null,
        color: theme.vars ? joinVars(theme.vars.palette.AppBar.darkColor, "var(--AppBar-color)") : null
      })
    }
  }, {
    props: {
      color: "transparent"
    },
    style: {
      "--AppBar-background": "transparent",
      "--AppBar-color": "inherit",
      backgroundColor: "var(--AppBar-background)",
      color: "var(--AppBar-color)",
      ...theme.applyStyles("dark", {
        backgroundImage: "none"
      })
    }
  }]
})));
const AppBar = /* @__PURE__ */ React.forwardRef(function AppBar2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiAppBar"
  });
  const {
    className,
    color = "primary",
    enableColorOnDark = false,
    position = "fixed",
    ...other
  } = props;
  const ownerState = {
    ...props,
    color,
    position,
    enableColorOnDark
  };
  const classes = useUtilityClasses$O(ownerState);
  return /* @__PURE__ */ jsx(AppBarRoot, {
    square: true,
    component: "header",
    ownerState,
    elevation: 4,
    className: clsx(classes.root, className, position === "fixed" && "mui-fixed"),
    ref,
    ...other
  });
});
process.env.NODE_ENV !== "production" ? AppBar.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes.oneOfType([PropTypes.oneOf(["default", "inherit", "primary", "secondary", "transparent", "error", "info", "success", "warning"]), PropTypes.string]),
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 4
   */
  elevation: PropTypes.number,
  /**
   * If true, the `color` prop is applied in dark mode.
   * @default false
   */
  enableColorOnDark: PropTypes.bool,
  /**
   * The positioning type. The behavior of the different options is described
   * [in the MDN web docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position).
   * Note: `sticky` is not universally supported and will fall back to `static` when unavailable.
   * @default 'fixed'
   */
  position: PropTypes.oneOf(["absolute", "fixed", "relative", "static", "sticky"]),
  /**
   * If `false`, rounded corners are enabled.
   * @default true
   */
  square: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
function isLayoutSupported() {
  return !(/jsdom|HappyDOM/.test(window.navigator.userAgent) || // TODO(v9): Remove the test environment check
  // eslint-disable-next-line mui/consistent-production-guard
  process.env.NODE_ENV === "test");
}
function getContainer$1(container) {
  return typeof container === "function" ? container() : container;
}
const Portal = /* @__PURE__ */ React.forwardRef(function Portal2(props, forwardedRef) {
  const {
    children,
    container,
    disablePortal = false
  } = props;
  const [mountNode, setMountNode] = React.useState(null);
  const handleRef = useForkRef(/* @__PURE__ */ React.isValidElement(children) ? getReactElementRef(children) : null, forwardedRef);
  useEnhancedEffect(() => {
    if (!disablePortal) {
      setMountNode(getContainer$1(container) || document.body);
    }
  }, [container, disablePortal]);
  useEnhancedEffect(() => {
    if (mountNode && !disablePortal) {
      setRef(forwardedRef, mountNode);
      return () => {
        setRef(forwardedRef, null);
      };
    }
    return void 0;
  }, [forwardedRef, mountNode, disablePortal]);
  if (disablePortal) {
    if (/* @__PURE__ */ React.isValidElement(children)) {
      const newProps = {
        ref: handleRef
      };
      return /* @__PURE__ */ React.cloneElement(children, newProps);
    }
    return children;
  }
  return mountNode ? /* @__PURE__ */ ReactDOM.createPortal(children, mountNode) : mountNode;
});
process.env.NODE_ENV !== "production" ? Portal.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The children to render into the `container`.
   */
  children: PropTypes.node,
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes.oneOfType([HTMLElementType, PropTypes.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: PropTypes.bool
} : void 0;
if (process.env.NODE_ENV !== "production") {
  Portal["propTypes"] = exactProp(Portal.propTypes);
}
function getPopperUtilityClass(slot) {
  return generateUtilityClass("MuiPopper", slot);
}
generateUtilityClasses("MuiPopper", ["root"]);
function flipPlacement(placement, direction) {
  if (direction === "ltr") {
    return placement;
  }
  switch (placement) {
    case "bottom-end":
      return "bottom-start";
    case "bottom-start":
      return "bottom-end";
    case "top-end":
      return "top-start";
    case "top-start":
      return "top-end";
    default:
      return placement;
  }
}
function resolveAnchorEl$1(anchorEl) {
  return typeof anchorEl === "function" ? anchorEl() : anchorEl;
}
function isHTMLElement(element) {
  return element.nodeType !== void 0;
}
function isVirtualElement(element) {
  return !isHTMLElement(element);
}
const useUtilityClasses$N = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getPopperUtilityClass, classes);
};
const defaultPopperOptions = {};
const PopperTooltip = /* @__PURE__ */ React.forwardRef(function PopperTooltip2(props, forwardedRef) {
  const {
    anchorEl,
    children,
    direction,
    disablePortal,
    modifiers,
    open,
    placement: initialPlacement,
    popperOptions,
    popperRef: popperRefProp,
    slotProps = {},
    slots = {},
    TransitionProps,
    // @ts-ignore internal logic
    ownerState: ownerStateProp,
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
    ...other
  } = props;
  const tooltipRef = React.useRef(null);
  const ownRef = useForkRef(tooltipRef, forwardedRef);
  const popperRef = React.useRef(null);
  const handlePopperRef = useForkRef(popperRef, popperRefProp);
  const handlePopperRefRef = React.useRef(handlePopperRef);
  useEnhancedEffect(() => {
    handlePopperRefRef.current = handlePopperRef;
  }, [handlePopperRef]);
  React.useImperativeHandle(popperRefProp, () => popperRef.current, []);
  const rtlPlacement = flipPlacement(initialPlacement, direction);
  const [placement, setPlacement] = React.useState(rtlPlacement);
  const [resolvedAnchorElement, setResolvedAnchorElement] = React.useState(resolveAnchorEl$1(anchorEl));
  React.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.forceUpdate();
    }
  });
  React.useEffect(() => {
    if (anchorEl) {
      setResolvedAnchorElement(resolveAnchorEl$1(anchorEl));
    }
  }, [anchorEl]);
  useEnhancedEffect(() => {
    if (!resolvedAnchorElement || !open) {
      return void 0;
    }
    const handlePopperUpdate = (data) => {
      setPlacement(data.placement);
    };
    if (process.env.NODE_ENV !== "production") {
      if (resolvedAnchorElement && isHTMLElement(resolvedAnchorElement) && resolvedAnchorElement.nodeType === 1) {
        const box = resolvedAnchorElement.getBoundingClientRect();
        if (isLayoutSupported() && box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) {
          console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join("\n"));
        }
      }
    }
    let popperModifiers = [{
      name: "preventOverflow",
      options: {
        altBoundary: disablePortal
      }
    }, {
      name: "flip",
      options: {
        altBoundary: disablePortal
      }
    }, {
      name: "onUpdate",
      enabled: true,
      phase: "afterWrite",
      fn: ({
        state
      }) => {
        handlePopperUpdate(state);
      }
    }];
    if (modifiers != null) {
      popperModifiers = popperModifiers.concat(modifiers);
    }
    if (popperOptions && popperOptions.modifiers != null) {
      popperModifiers = popperModifiers.concat(popperOptions.modifiers);
    }
    const popper = createPopper(resolvedAnchorElement, tooltipRef.current, {
      placement: rtlPlacement,
      ...popperOptions,
      modifiers: popperModifiers
    });
    handlePopperRefRef.current(popper);
    const popperElement = tooltipRef.current;
    return () => {
      if (popperElement) {
        const {
          style
        } = popperElement;
        const position = style.position;
        const top = style.top;
        const left = style.left;
        const transform = style.transform;
        popper.destroy();
        style.position = position;
        style.top = top;
        style.left = left;
        style.transform = transform;
      } else {
        popper.destroy();
      }
      handlePopperRefRef.current(null);
    };
  }, [resolvedAnchorElement, disablePortal, modifiers, open, popperOptions, rtlPlacement]);
  const childProps = {
    placement
  };
  if (TransitionProps !== null) {
    childProps.TransitionProps = TransitionProps;
  }
  const classes = useUtilityClasses$N(props);
  const Root = slots.root ?? "div";
  const rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      role: "tooltip",
      ref: ownRef
    },
    ownerState: props,
    className: classes.root
  });
  return /* @__PURE__ */ jsx(Root, {
    ...rootProps,
    children: typeof children === "function" ? children(childProps) : children
  });
});
const Popper$1 = /* @__PURE__ */ React.forwardRef(function Popper(props, forwardedRef) {
  const {
    anchorEl,
    children,
    container: containerProp,
    direction = "ltr",
    disablePortal = false,
    keepMounted = false,
    modifiers,
    open,
    placement = "bottom",
    popperOptions = defaultPopperOptions,
    popperRef,
    style,
    transition = false,
    slotProps = {},
    slots = {},
    ...other
  } = props;
  const [exited, setExited] = React.useState(true);
  const handleEnter = () => {
    setExited(false);
  };
  const handleExited = () => {
    setExited(true);
  };
  if (!keepMounted && !open && (!transition || exited)) {
    return null;
  }
  let container;
  if (containerProp) {
    container = containerProp;
  } else if (anchorEl) {
    const resolvedAnchorEl = resolveAnchorEl$1(anchorEl);
    container = resolvedAnchorEl && isHTMLElement(resolvedAnchorEl) ? ownerDocument(resolvedAnchorEl).body : ownerDocument(null).body;
  }
  const display = !open && keepMounted && (!transition || exited) ? "none" : void 0;
  const transitionProps = transition ? {
    in: open,
    onEnter: handleEnter,
    onExited: handleExited
  } : void 0;
  return /* @__PURE__ */ jsx(Portal, {
    disablePortal,
    container,
    children: /* @__PURE__ */ jsx(PopperTooltip, {
      anchorEl,
      direction,
      disablePortal,
      modifiers,
      ref: forwardedRef,
      open: transition ? !exited : open,
      placement,
      popperOptions,
      popperRef,
      slotProps,
      slots,
      ...other,
      style: {
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display,
        ...style
      },
      TransitionProps: transitionProps,
      children
    })
  });
});
process.env.NODE_ENV !== "production" ? Popper$1.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl: chainPropTypes(PropTypes.oneOfType([HTMLElementType, PropTypes.object, PropTypes.func]), (props) => {
    if (props.open) {
      const resolvedAnchorEl = resolveAnchorEl$1(props.anchorEl);
      if (resolvedAnchorEl && isHTMLElement(resolvedAnchorEl) && resolvedAnchorEl.nodeType === 1) {
        const box = resolvedAnchorEl.getBoundingClientRect();
        if (process.env.NODE_ENV !== "production") {
          if (isLayoutSupported() && box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) {
            return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join("\n"));
          }
        }
      } else if (!resolvedAnchorEl || typeof resolvedAnchorEl.getBoundingClientRect !== "function" || isVirtualElement(resolvedAnchorEl) && resolvedAnchorEl.contextElement != null && resolvedAnchorEl.contextElement.nodeType !== 1) {
        return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "It should be an HTML element instance or a virtualElement ", "(https://popper.js.org/docs/v2/virtual-elements/)."].join("\n"));
      }
    }
    return null;
  }),
  /**
   * Popper render function or node.
   */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes.oneOfType([HTMLElementType, PropTypes.func]),
  /**
   * Direction of the text.
   * @default 'ltr'
   */
  direction: PropTypes.oneOf(["ltr", "rtl"]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: PropTypes.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: PropTypes.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.object,
    effect: PropTypes.func,
    enabled: PropTypes.bool,
    fn: PropTypes.func,
    name: PropTypes.any,
    options: PropTypes.object,
    phase: PropTypes.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: PropTypes.arrayOf(PropTypes.string),
    requiresIfExists: PropTypes.arrayOf(PropTypes.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: PropTypes.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: PropTypes.shape({
    modifiers: PropTypes.array,
    onFirstUpdate: PropTypes.func,
    placement: PropTypes.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: PropTypes.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: refType,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType
  }),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: PropTypes.bool
} : void 0;
const PopperRoot = styled(Popper$1, {
  name: "MuiPopper",
  slot: "Root"
})({});
const Popper2 = /* @__PURE__ */ React.forwardRef(function Popper3(inProps, ref) {
  const isRtl = useRtl();
  const props = useDefaultProps({
    props: inProps,
    name: "MuiPopper"
  });
  const {
    anchorEl,
    component,
    container,
    disablePortal,
    keepMounted,
    modifiers,
    open,
    placement,
    popperOptions,
    popperRef,
    transition,
    slots,
    slotProps,
    ...other
  } = props;
  const otherProps = {
    anchorEl,
    container,
    disablePortal,
    keepMounted,
    modifiers,
    open,
    placement,
    popperOptions,
    popperRef,
    transition,
    ...other
  };
  return /* @__PURE__ */ jsx(PopperRoot, {
    as: component,
    direction: isRtl ? "rtl" : "ltr",
    slots,
    slotProps,
    ...otherProps,
    ref
  });
});
process.env.NODE_ENV !== "production" ? Popper2.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl: PropTypes.oneOfType([HTMLElementType, PropTypes.object, PropTypes.func]),
  /**
   * Popper render function or node.
   */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes.oneOfType([HTMLElementType, PropTypes.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: PropTypes.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: PropTypes.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.object,
    effect: PropTypes.func,
    enabled: PropTypes.bool,
    fn: PropTypes.func,
    name: PropTypes.any,
    options: PropTypes.object,
    phase: PropTypes.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: PropTypes.arrayOf(PropTypes.string),
    requiresIfExists: PropTypes.arrayOf(PropTypes.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: PropTypes.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: PropTypes.shape({
    modifiers: PropTypes.array,
    onFirstUpdate: PropTypes.func,
    placement: PropTypes.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: PropTypes.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: refType,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: PropTypes.bool
} : void 0;
function getListSubheaderUtilityClass(slot) {
  return generateUtilityClass("MuiListSubheader", slot);
}
generateUtilityClasses("MuiListSubheader", ["root", "colorPrimary", "colorInherit", "gutters", "inset", "sticky"]);
const useUtilityClasses$M = (ownerState) => {
  const {
    classes,
    color,
    disableGutters,
    inset,
    disableSticky
  } = ownerState;
  const slots = {
    root: ["root", color !== "default" && `color${capitalize(color)}`, !disableGutters && "gutters", inset && "inset", !disableSticky && "sticky"]
  };
  return composeClasses(slots, getListSubheaderUtilityClass, classes);
};
const ListSubheaderRoot = styled("li", {
  name: "MuiListSubheader",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.color !== "default" && styles2[`color${capitalize(ownerState.color)}`], !ownerState.disableGutters && styles2.gutters, ownerState.inset && styles2.inset, !ownerState.disableSticky && styles2.sticky];
  }
})(memoTheme(({
  theme
}) => ({
  boxSizing: "border-box",
  lineHeight: "48px",
  listStyle: "none",
  color: (theme.vars || theme).palette.text.secondary,
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.pxToRem(14),
  variants: [{
    props: {
      color: "primary"
    },
    style: {
      color: (theme.vars || theme).palette.primary.main
    }
  }, {
    props: {
      color: "inherit"
    },
    style: {
      color: "inherit"
    }
  }, {
    props: ({
      ownerState
    }) => !ownerState.disableGutters,
    style: {
      paddingLeft: 16,
      paddingRight: 16
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.inset,
    style: {
      paddingLeft: 72
    }
  }, {
    props: ({
      ownerState
    }) => !ownerState.disableSticky,
    style: {
      position: "sticky",
      top: 0,
      zIndex: 1,
      backgroundColor: (theme.vars || theme).palette.background.paper
    }
  }]
})));
const ListSubheader = /* @__PURE__ */ React.forwardRef(function ListSubheader2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiListSubheader"
  });
  const {
    className,
    color = "default",
    component = "li",
    disableGutters = false,
    disableSticky = false,
    inset = false,
    ...other
  } = props;
  const ownerState = {
    ...props,
    color,
    component,
    disableGutters,
    disableSticky,
    inset
  };
  const classes = useUtilityClasses$M(ownerState);
  return /* @__PURE__ */ jsx(ListSubheaderRoot, {
    as: component,
    className: clsx(classes.root, className),
    ref,
    ownerState,
    ...other
  });
});
process.env.NODE_ENV !== "production" ? ListSubheader.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'default'
   */
  color: PropTypes.oneOf(["default", "inherit", "primary"]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the List Subheader will not have gutters.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * If `true`, the List Subheader will not stick to the top during scroll.
   * @default false
   */
  disableSticky: PropTypes.bool,
  /**
   * If `true`, the List Subheader is indented.
   * @default false
   */
  inset: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
const CancelIcon = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
}), "Cancel");
function getChipUtilityClass(slot) {
  return generateUtilityClass("MuiChip", slot);
}
const chipClasses = generateUtilityClasses("MuiChip", ["root", "sizeSmall", "sizeMedium", "colorDefault", "colorError", "colorInfo", "colorPrimary", "colorSecondary", "colorSuccess", "colorWarning", "disabled", "clickable", "deletable", "outlined", "filled", "avatar", "icon", "label", "deleteIcon", "focusVisible"]);
const useUtilityClasses$L = (ownerState) => {
  const {
    classes,
    disabled,
    size,
    color,
    onDelete,
    clickable,
    variant
  } = ownerState;
  const slots = {
    root: ["root", variant, disabled && "disabled", `size${capitalize(size)}`, `color${capitalize(color)}`, clickable && "clickable", onDelete && "deletable"],
    label: ["label"],
    avatar: ["avatar"],
    icon: ["icon"],
    deleteIcon: ["deleteIcon"]
  };
  return composeClasses(slots, getChipUtilityClass, classes);
};
const ChipRoot = styled("div", {
  name: "MuiChip",
  slot: "Root",
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) && prop !== "focusableWhenDisabled" && prop !== "skipFocusWhenDisabled",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    const {
      color,
      clickable,
      onDelete,
      size,
      variant
    } = ownerState;
    return [{
      [`& .${chipClasses.avatar}`]: styles2.avatar
    }, {
      [`& .${chipClasses.icon}`]: styles2.icon
    }, {
      [`& .${chipClasses.deleteIcon}`]: styles2.deleteIcon
    }, styles2.root, styles2[`size${capitalize(size)}`], styles2[`color${capitalize(color)}`], clickable && styles2.clickable, onDelete && styles2.deletable, styles2[variant]];
  }
})(memoTheme(({
  theme
}) => {
  const textColor = theme.palette.mode === "light" ? theme.palette.grey[700] : theme.palette.grey[300];
  return {
    maxWidth: "100%",
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(13),
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 32,
    lineHeight: 1.5,
    color: (theme.vars || theme).palette.text.primary,
    backgroundColor: (theme.vars || theme).palette.action.selected,
    borderRadius: 32 / 2,
    whiteSpace: "nowrap",
    ...getTransitionStyles(theme, ["background-color", "box-shadow"]),
    // reset cursor explicitly in case ButtonBase is used
    cursor: "unset",
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
    textDecoration: "none",
    border: 0,
    // Remove `button` border
    padding: 0,
    // Remove `button` padding
    verticalAlign: "middle",
    boxSizing: "border-box",
    [`&.${chipClasses.disabled}`]: {
      opacity: (theme.vars || theme).palette.action.disabledOpacity,
      pointerEvents: "none"
    },
    [`& .${chipClasses.avatar}`]: {
      marginLeft: 5,
      marginRight: -6,
      width: 24,
      height: 24,
      color: theme.vars ? theme.vars.palette.Chip.defaultAvatarColor : textColor,
      fontSize: theme.typography.pxToRem(12)
    },
    [`& .${chipClasses.icon}`]: {
      marginLeft: 5,
      marginRight: -6
    },
    [`& .${chipClasses.deleteIcon}`]: {
      WebkitTapHighlightColor: "transparent",
      color: theme.alpha((theme.vars || theme).palette.text.primary, 0.26),
      fontSize: 22,
      cursor: "pointer",
      margin: "0 5px 0 -6px",
      "&:hover": {
        color: theme.alpha((theme.vars || theme).palette.text.primary, 0.4)
      }
    },
    variants: [{
      props: {
        color: "primary"
      },
      style: {
        [`& .${chipClasses.avatar}`]: {
          color: (theme.vars || theme).palette.primary.contrastText,
          backgroundColor: (theme.vars || theme).palette.primary.dark
        }
      }
    }, {
      props: {
        color: "secondary"
      },
      style: {
        [`& .${chipClasses.avatar}`]: {
          color: (theme.vars || theme).palette.secondary.contrastText,
          backgroundColor: (theme.vars || theme).palette.secondary.dark
        }
      }
    }, {
      props: {
        size: "small"
      },
      style: {
        height: 24,
        [`& .${chipClasses.avatar}`]: {
          marginLeft: 4,
          marginRight: -4,
          width: 18,
          height: 18,
          fontSize: theme.typography.pxToRem(10)
        },
        [`& .${chipClasses.icon}`]: {
          fontSize: 18,
          marginLeft: 4,
          marginRight: -4
        },
        [`& .${chipClasses.deleteIcon}`]: {
          fontSize: 16,
          marginRight: 4,
          marginLeft: -4
        }
      }
    }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["contrastText"])).map(([color]) => {
      return {
        props: {
          color
        },
        style: {
          backgroundColor: (theme.vars || theme).palette[color].main,
          color: (theme.vars || theme).palette[color].contrastText,
          [`& .${chipClasses.deleteIcon}`]: {
            color: theme.alpha((theme.vars || theme).palette[color].contrastText, 0.7),
            "&:hover, &:active": {
              color: (theme.vars || theme).palette[color].contrastText
            }
          }
        }
      };
    }), {
      props: (props) => props.iconColor === props.color,
      style: {
        [`& .${chipClasses.icon}`]: {
          color: theme.vars ? theme.vars.palette.Chip.defaultIconColor : textColor
        }
      }
    }, {
      props: (props) => props.iconColor === props.color && props.color !== "default",
      style: {
        [`& .${chipClasses.icon}`]: {
          color: "inherit"
        }
      }
    }, {
      props: {
        onDelete: true
      },
      style: {
        [`&.${chipClasses.focusVisible}`]: {
          backgroundColor: theme.alpha((theme.vars || theme).palette.action.selected, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.focusOpacity}`)
        }
      }
    }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["dark"])).map(([color]) => {
      return {
        props: {
          color,
          onDelete: true
        },
        style: {
          [`&.${chipClasses.focusVisible}`]: {
            background: (theme.vars || theme).palette[color].dark
          }
        }
      };
    }), {
      props: {
        clickable: true
      },
      style: {
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: theme.alpha((theme.vars || theme).palette.action.selected, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.hoverOpacity}`)
        },
        [`&.${chipClasses.focusVisible}`]: {
          backgroundColor: theme.alpha((theme.vars || theme).palette.action.selected, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.focusOpacity}`)
        },
        "&:active": {
          boxShadow: (theme.vars || theme).shadows[1]
        }
      }
    }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["dark"])).map(([color]) => ({
      props: {
        color,
        clickable: true
      },
      style: {
        [`&:hover, &.${chipClasses.focusVisible}`]: {
          backgroundColor: (theme.vars || theme).palette[color].dark
        }
      }
    })), {
      props: {
        variant: "outlined"
      },
      style: {
        backgroundColor: "transparent",
        border: theme.vars ? `1px solid ${theme.vars.palette.Chip.defaultBorder}` : `1px solid ${theme.palette.mode === "light" ? theme.palette.grey[400] : theme.palette.grey[700]}`,
        [`&.${chipClasses.clickable}:hover`]: {
          backgroundColor: (theme.vars || theme).palette.action.hover
        },
        [`&.${chipClasses.focusVisible}`]: {
          backgroundColor: (theme.vars || theme).palette.action.focus
        },
        [`& .${chipClasses.avatar}`]: {
          marginLeft: 4
        },
        [`& .${chipClasses.icon}`]: {
          marginLeft: 4
        },
        [`& .${chipClasses.deleteIcon}`]: {
          marginRight: 5
        }
      }
    }, {
      props: {
        size: "small",
        variant: "outlined"
      },
      style: {
        [`& .${chipClasses.avatar}`]: {
          marginLeft: 2
        },
        [`& .${chipClasses.icon}`]: {
          marginLeft: 2
        },
        [`& .${chipClasses.deleteIcon}`]: {
          marginRight: 3
        }
      }
    }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
      props: {
        variant: "outlined",
        color
      },
      style: {
        color: (theme.vars || theme).palette[color].main,
        border: `1px solid ${theme.alpha((theme.vars || theme).palette[color].main, 0.7)}`,
        [`&.${chipClasses.clickable}:hover`]: {
          backgroundColor: theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.hoverOpacity)
        },
        [`&.${chipClasses.focusVisible}`]: {
          backgroundColor: theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.focusOpacity)
        },
        [`& .${chipClasses.deleteIcon}`]: {
          color: theme.alpha((theme.vars || theme).palette[color].main, 0.7),
          "&:hover, &:active": {
            color: (theme.vars || theme).palette[color].main
          }
        }
      }
    }))]
  };
}));
const ChipLabel = styled("span", {
  name: "MuiChip",
  slot: "Label"
})({
  overflow: "hidden",
  textOverflow: "ellipsis",
  paddingLeft: 12,
  paddingRight: 12,
  whiteSpace: "nowrap",
  variants: [{
    props: {
      variant: "outlined"
    },
    style: {
      paddingLeft: 11,
      paddingRight: 11
    }
  }, {
    props: {
      size: "small"
    },
    style: {
      paddingLeft: 8,
      paddingRight: 8
    }
  }, {
    props: {
      size: "small",
      variant: "outlined"
    },
    style: {
      paddingLeft: 7,
      paddingRight: 7
    }
  }]
});
function isDeleteKeyboardEvent(keyboardEvent) {
  return keyboardEvent.key === "Backspace" || keyboardEvent.key === "Delete";
}
const Chip = /* @__PURE__ */ React.forwardRef(function Chip2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiChip"
  });
  const {
    avatar: avatarProp,
    className,
    clickable: clickableProp,
    color = "default",
    component: ComponentProp,
    deleteIcon: deleteIconProp,
    disabled = false,
    icon: iconProp,
    label,
    onClick,
    onDelete,
    onKeyDown,
    onKeyUp,
    size = "medium",
    variant = "filled",
    tabIndex,
    skipFocusWhenDisabled = false,
    // TODO v6: Rename to `focusableWhenDisabled`.
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const {
    nativeButton,
    ...buttonBaseProps
  } = other;
  const chipRef = React.useRef(null);
  const handleRef = useForkRef(chipRef, ref);
  const handleDeleteIconClick = (event) => {
    event.stopPropagation();
    onDelete(event);
  };
  const handleKeyDown = (event) => {
    if (event.currentTarget === event.target && isDeleteKeyboardEvent(event)) {
      event.preventDefault();
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  };
  const handleKeyUp = (event) => {
    if (event.currentTarget === event.target) {
      if (onDelete && isDeleteKeyboardEvent(event)) {
        onDelete(event);
      }
    }
    if (onKeyUp) {
      onKeyUp(event);
    }
  };
  const clickable = clickableProp !== false && onClick ? true : clickableProp;
  const component = clickable || onDelete ? ButtonBase : ComponentProp || "div";
  const ownerState = {
    ...props,
    component,
    disabled,
    size,
    color,
    iconColor: /* @__PURE__ */ React.isValidElement(iconProp) ? iconProp.props.color || color : color,
    onDelete: !!onDelete,
    clickable,
    variant
  };
  const classes = useUtilityClasses$L(ownerState);
  const moreProps = component === ButtonBase ? {
    component: ComponentProp || "div",
    internalNativeButton: false,
    focusVisibleClassName: classes.focusVisible,
    ...onDelete && {
      disableRipple: true
    },
    ...nativeButton !== void 0 && {
      nativeButton
    }
  } : {};
  let deleteIcon = null;
  if (onDelete) {
    deleteIcon = deleteIconProp && /* @__PURE__ */ React.isValidElement(deleteIconProp) ? /* @__PURE__ */ React.cloneElement(deleteIconProp, {
      className: clsx(deleteIconProp.props.className, classes.deleteIcon),
      onClick: handleDeleteIconClick
    }) : /* @__PURE__ */ jsx(CancelIcon, {
      className: classes.deleteIcon,
      onClick: handleDeleteIconClick
    });
  }
  let avatar = null;
  if (avatarProp && /* @__PURE__ */ React.isValidElement(avatarProp)) {
    avatar = /* @__PURE__ */ React.cloneElement(avatarProp, {
      className: clsx(classes.avatar, avatarProp.props.className)
    });
  }
  let icon = null;
  if (iconProp && /* @__PURE__ */ React.isValidElement(iconProp)) {
    icon = /* @__PURE__ */ React.cloneElement(iconProp, {
      className: clsx(classes.icon, iconProp.props.className)
    });
  }
  if (process.env.NODE_ENV !== "production") {
    if (avatar && icon) {
      console.error("MUI: The Chip component can not handle the avatar and the icon prop at the same time. Pick one.");
    }
  }
  const externalForwardedProps = {
    slots,
    slotProps
  };
  const [RootSlot, rootProps] = useSlot("root", {
    elementType: ChipRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...buttonBaseProps
    },
    ownerState,
    // The `component` prop is preserved because `Chip` relies on it for internal logic. If `shouldForwardComponentProp` were `false`, `useSlot` would remove the `component` prop, potentially breaking the component's behavior.
    shouldForwardComponentProp: true,
    ref: handleRef,
    className: clsx(classes.root, className),
    additionalProps: {
      disabled: clickable && disabled ? true : void 0,
      tabIndex: skipFocusWhenDisabled && disabled ? -1 : tabIndex,
      ...moreProps
    },
    getSlotProps: (handlers) => ({
      ...handlers,
      onClick: (event) => {
        handlers.onClick?.(event);
        onClick?.(event);
      },
      onKeyDown: (event) => {
        handlers.onKeyDown?.(event);
        handleKeyDown(event);
      },
      onKeyUp: (event) => {
        handlers.onKeyUp?.(event);
        handleKeyUp(event);
      }
    })
  });
  const [LabelSlot, labelProps] = useSlot("label", {
    elementType: ChipLabel,
    externalForwardedProps,
    ownerState,
    className: classes.label
  });
  return /* @__PURE__ */ jsxs(RootSlot, {
    as: component,
    ...rootProps,
    children: [avatar || icon, /* @__PURE__ */ jsx(LabelSlot, {
      ...labelProps,
      children: label
    }), deleteIcon]
  });
});
process.env.NODE_ENV !== "production" ? Chip.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The Avatar element to display.
   */
  avatar: PropTypes.element,
  /**
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children: unsupportedProp,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the chip will appear clickable, and will raise when pressed,
   * even if the onClick prop is not defined.
   * If `false`, the chip will not appear clickable, even if onClick prop is defined.
   * This can be used, for example,
   * along with the component prop to indicate an anchor Chip is clickable.
   * Note: this controls the UI and does not affect the onClick event.
   */
  clickable: PropTypes.bool,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'default'
   */
  color: PropTypes.oneOfType([PropTypes.oneOf(["default", "primary", "secondary", "error", "info", "success", "warning"]), PropTypes.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Override the default delete icon element. Shown only if `onDelete` is set.
   */
  deleteIcon: PropTypes.element,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Icon element.
   */
  icon: PropTypes.element,
  /**
   * The content of the component.
   */
  label: PropTypes.node,
  /**
   * If `true`, the component is expected to resolve to a native `<button>` element.
   * When omitted, custom components inherit the default button semantics of the current wrapper.
   * Set to `true` when a custom component resolves to a native `<button>`, or `false`
   * when it resolves to a non-button host.
   */
  nativeButton: PropTypes.bool,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * Callback fired when the delete icon is clicked.
   * If set, the delete icon will be shown.
   */
  onDelete: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  onKeyUp: PropTypes.func,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes.oneOfType([PropTypes.oneOf(["medium", "small"]), PropTypes.string]),
  /**
   * If `true`, allows the disabled chip to escape focus.
   * If `false`, allows the disabled chip to receive focus.
   * @default false
   */
  skipFocusWhenDisabled: PropTypes.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    label: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    label: PropTypes.elementType,
    root: PropTypes.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * @ignore
   */
  tabIndex: PropTypes.number,
  /**
   * The variant to use.
   * @default 'filled'
   */
  variant: PropTypes.oneOfType([PropTypes.oneOf(["filled", "outlined"]), PropTypes.string])
} : void 0;
const ArrowDropDownIcon = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "M7 10l5 5 5-5z"
}), "ArrowDropDown");
const Person = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
}), "Person");
function getAvatarUtilityClass(slot) {
  return generateUtilityClass("MuiAvatar", slot);
}
generateUtilityClasses("MuiAvatar", ["root", "colorDefault", "circular", "rounded", "square", "img", "fallback"]);
const useUtilityClasses$K = (ownerState) => {
  const {
    classes,
    variant,
    colorDefault
  } = ownerState;
  const slots = {
    root: ["root", variant, colorDefault && "colorDefault"],
    img: ["img"],
    fallback: ["fallback"]
  };
  return composeClasses(slots, getAvatarUtilityClass, classes);
};
const AvatarRoot = styled("div", {
  name: "MuiAvatar",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, styles2[ownerState.variant], ownerState.colorDefault && styles2.colorDefault];
  }
})(memoTheme(({
  theme
}) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: 40,
  height: 40,
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.pxToRem(20),
  lineHeight: 1,
  borderRadius: "50%",
  overflow: "hidden",
  userSelect: "none",
  variants: [{
    props: {
      variant: "rounded"
    },
    style: {
      borderRadius: (theme.vars || theme).shape.borderRadius
    }
  }, {
    props: {
      variant: "square"
    },
    style: {
      borderRadius: 0
    }
  }, {
    props: {
      colorDefault: true
    },
    style: {
      color: (theme.vars || theme).palette.background.default,
      "@media (forced-colors: active)": {
        boxSizing: "border-box",
        border: "1px solid ButtonBorder"
      },
      ...theme.vars ? {
        backgroundColor: theme.vars.palette.Avatar.defaultBg
      } : {
        backgroundColor: theme.palette.grey[400],
        ...theme.applyStyles("dark", {
          backgroundColor: theme.palette.grey[600]
        })
      }
    }
  }]
})));
const AvatarImg = styled("img", {
  name: "MuiAvatar",
  slot: "Img"
})({
  width: "100%",
  height: "100%",
  textAlign: "center",
  // Handle non-square image.
  objectFit: "cover",
  // Hide alt text.
  color: "transparent",
  // Hide the image broken icon, only works on Chrome.
  textIndent: 1e4
});
const AvatarFallback = styled(Person, {
  name: "MuiAvatar",
  slot: "Fallback"
})({
  width: "75%",
  height: "75%"
});
function useLoaded(src, srcSet, crossOrigin, referrerPolicy) {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    if (!src && !srcSet) {
      return void 0;
    }
    setLoaded(false);
    let active = true;
    const image = new Image();
    image.onload = () => {
      if (!active) {
        return;
      }
      setLoaded("loaded");
    };
    image.onerror = () => {
      if (!active) {
        return;
      }
      setLoaded("error");
    };
    image.crossOrigin = crossOrigin;
    image.referrerPolicy = referrerPolicy;
    image.src = src;
    if (srcSet) {
      image.srcset = srcSet;
    }
    return () => {
      active = false;
    };
  }, [crossOrigin, referrerPolicy, src, srcSet]);
  return loaded;
}
const Avatar = /* @__PURE__ */ React.forwardRef(function Avatar2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiAvatar"
  });
  const {
    alt,
    children: childrenProp,
    className,
    component = "div",
    slots = {},
    slotProps = {},
    sizes,
    src,
    srcSet,
    variant = "circular",
    ...other
  } = props;
  let children = null;
  const ownerState = {
    ...props,
    component,
    variant
  };
  const {
    crossOrigin,
    referrerPolicy
  } = (typeof slotProps.img === "function" ? slotProps.img(ownerState) : slotProps.img) ?? {};
  const loaded = useLoaded(src, srcSet, crossOrigin, referrerPolicy);
  const hasImg = src || srcSet;
  const hasImgNotFailing = hasImg && loaded !== "error";
  ownerState.colorDefault = !hasImgNotFailing;
  delete ownerState.ownerState;
  const classes = useUtilityClasses$K(ownerState);
  const externalForwardedProps = {
    slots,
    slotProps
  };
  const [RootSlot, rootSlotProps] = useSlot("root", {
    ref,
    className: clsx(classes.root, className),
    elementType: AvatarRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      component,
      ...other
    },
    ownerState
  });
  const [ImgSlot, imgSlotProps] = useSlot("img", {
    className: classes.img,
    elementType: AvatarImg,
    externalForwardedProps,
    additionalProps: {
      alt,
      src,
      srcSet,
      sizes
    },
    ownerState
  });
  const [FallbackSlot, fallbackSlotProps] = useSlot("fallback", {
    className: classes.fallback,
    elementType: AvatarFallback,
    externalForwardedProps,
    shouldForwardComponentProp: true,
    ownerState
  });
  if (hasImgNotFailing) {
    children = /* @__PURE__ */ jsx(ImgSlot, {
      ...imgSlotProps
    });
  } else if (!!childrenProp || childrenProp === 0) {
    children = childrenProp;
  } else if (hasImg && alt) {
    children = alt[0];
  } else {
    children = /* @__PURE__ */ jsx(FallbackSlot, {
      ...fallbackSlotProps
    });
  }
  return /* @__PURE__ */ jsx(RootSlot, {
    ...rootSlotProps,
    children
  });
});
process.env.NODE_ENV !== "production" ? Avatar.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Used in combination with `src` or `srcSet` to
   * provide an alt attribute for the rendered `img` element.
   */
  alt: PropTypes.string,
  /**
   * Used to render icon or text elements inside the Avatar if `src` is not set.
   * This can be an element, or just a string.
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The `sizes` attribute for the `img` element.
   */
  sizes: PropTypes.string,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    fallback: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    img: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    fallback: PropTypes.elementType,
    img: PropTypes.elementType,
    root: PropTypes.elementType
  }),
  /**
   * The `src` attribute for the `img` element.
   */
  src: PropTypes.string,
  /**
   * The `srcSet` attribute for the `img` element.
   * Use this attribute for responsive image display.
   */
  srcSet: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The shape of the avatar.
   * @default 'circular'
   */
  variant: PropTypes.oneOfType([PropTypes.oneOf(["circular", "rounded", "square"]), PropTypes.string])
} : void 0;
const styles$2 = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  },
  exiting: {
    opacity: 0
  },
  exited: {
    opacity: 0
  }
};
const hiddenStyles$1 = {
  opacity: 0,
  visibility: "hidden"
};
const Fade = /* @__PURE__ */ React.forwardRef(function Fade2(props, ref) {
  const theme = useTheme();
  const defaultTimeout = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };
  const {
    addEndListener,
    appear = true,
    children,
    disablePrefersReducedMotion = false,
    easing: easing2,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    style,
    timeout = defaultTimeout,
    ...other
  } = props;
  const reducedMotion = useReducedMotion(theme.motion.reducedMotion, disablePrefersReducedMotion);
  const nodeRef = React.useRef(null);
  const handleRef = useForkRef(nodeRef, getReactElementRef(children), ref);
  const handleEntering = normalizedTransitionCallback(nodeRef, onEntering);
  const handleEnter = normalizedTransitionCallback(nodeRef, (node, isAppearing) => {
    if (!reducedMotion.shouldReduceMotion) {
      reflow(node);
    }
    const transitionProps = getTransitionProps({
      style,
      timeout,
      easing: easing2
    }, {
      mode: "enter"
    });
    const transitionTiming = reducedMotion.getTransitionTiming({
      duration: transitionProps.duration,
      delay: transitionProps.delay
    });
    node.style.transition = theme.transitions.create("opacity", {
      duration: transitionTiming.duration,
      easing: transitionProps.easing,
      delay: transitionTiming.delay
    });
    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });
  const handleEntered = normalizedTransitionCallback(nodeRef, onEntered);
  const handleExiting = normalizedTransitionCallback(nodeRef, onExiting);
  const handleExit = normalizedTransitionCallback(nodeRef, (node) => {
    const transitionProps = getTransitionProps({
      style,
      timeout,
      easing: easing2
    }, {
      mode: "exit"
    });
    const transitionTiming = reducedMotion.getTransitionTiming({
      duration: transitionProps.duration,
      delay: transitionProps.delay
    });
    node.style.transition = theme.transitions.create("opacity", {
      duration: transitionTiming.duration,
      easing: transitionProps.easing,
      delay: transitionTiming.delay
    });
    if (onExit) {
      onExit(node);
    }
  });
  const handleExited = normalizedTransitionCallback(nodeRef, (node) => {
    node.style.transition = "";
    if (onExited) {
      onExited(node);
    }
  });
  const handleAddEndListener = addEndListener ? (next) => {
    addEndListener(nodeRef.current, next);
  } : void 0;
  return /* @__PURE__ */ jsx(Transition, {
    appear,
    in: inProp,
    nodeRef,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: handleAddEndListener,
    reduceMotion: reducedMotion.shouldReduceMotion,
    timeout,
    ...other,
    children: (state, {
      ownerState,
      ...restChildProps
    }) => {
      const childStyle = getTransitionChildStyle(state, inProp, styles$2, hiddenStyles$1, style, children.props.style);
      return /* @__PURE__ */ React.cloneElement(children, {
        style: childStyle,
        ref: handleRef,
        ...restChildProps
      });
    }
  });
});
process.env.NODE_ENV !== "production" ? Fade.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger.
   * Use it when you need custom logic to decide when the transition has ended.
   * Note: Timeouts are still used as a fallback if provided.
   *
   * @param {HTMLElement} node The transitioning DOM node.
   * @param {Function} done Call this when the transition has finished.
   */
  addEndListener: PropTypes.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: PropTypes.bool,
  /**
   * A single child content element.
   */
  children: elementAcceptingRef.isRequired,
  /**
   * If `true`, the transition ignores `theme.motion.reducedMotion` and keeps its normal timing.
   * @default false
   */
  disablePrefersReducedMotion: PropTypes.bool,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: PropTypes.oneOfType([PropTypes.shape({
    enter: PropTypes.string,
    exit: PropTypes.string
  }), PropTypes.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: PropTypes.bool,
  /**
   * @ignore
   */
  onEnter: PropTypes.func,
  /**
   * @ignore
   */
  onEntered: PropTypes.func,
  /**
   * @ignore
   */
  onEntering: PropTypes.func,
  /**
   * @ignore
   */
  onExit: PropTypes.func,
  /**
   * @ignore
   */
  onExited: PropTypes.func,
  /**
   * @ignore
   */
  onExiting: PropTypes.func,
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  timeout: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    appear: PropTypes.number,
    enter: PropTypes.number,
    exit: PropTypes.number
  })])
} : void 0;
function getBackdropUtilityClass(slot) {
  return generateUtilityClass("MuiBackdrop", slot);
}
generateUtilityClasses("MuiBackdrop", ["root", "invisible"]);
const useUtilityClasses$J = (ownerState) => {
  const {
    classes,
    invisible
  } = ownerState;
  const slots = {
    root: ["root", invisible && "invisible"]
  };
  return composeClasses(slots, getBackdropUtilityClass, classes);
};
const BackdropRoot = styled("div", {
  name: "MuiBackdrop",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.invisible && styles2.invisible];
  }
})({
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  WebkitTapHighlightColor: "transparent",
  variants: [{
    props: {
      invisible: true
    },
    style: {
      backgroundColor: "transparent"
    }
  }]
});
const Backdrop = /* @__PURE__ */ React.forwardRef(function Backdrop2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiBackdrop"
  });
  const {
    children,
    className,
    component = "div",
    invisible = false,
    open,
    slotProps = {},
    slots = {},
    transitionDuration,
    ...other
  } = props;
  const ownerState = {
    ...props,
    component,
    invisible
  };
  const classes = useUtilityClasses$J(ownerState);
  const externalForwardedProps = {
    component,
    slots,
    slotProps
  };
  const [RootSlot, rootProps] = useSlot("root", {
    elementType: BackdropRoot,
    externalForwardedProps,
    className: clsx(classes.root, className),
    ownerState
  });
  const [TransitionSlot, transitionProps] = useSlot("transition", {
    elementType: Fade,
    externalForwardedProps,
    ownerState
  });
  return /* @__PURE__ */ jsx(TransitionSlot, {
    in: open,
    timeout: transitionDuration,
    ...other,
    ...transitionProps,
    children: /* @__PURE__ */ jsx(RootSlot, {
      ...rootProps,
      ref,
      children
    })
  });
});
process.env.NODE_ENV !== "production" ? Backdrop.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */
  invisible: PropTypes.bool,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    transition: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
    transition: PropTypes.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    appear: PropTypes.number,
    enter: PropTypes.number,
    exit: PropTypes.number
  })])
} : void 0;
function useBadge(parameters) {
  const {
    badgeContent: badgeContentProp,
    invisible: invisibleProp = false,
    max: maxProp = 99,
    showZero = false
  } = parameters;
  const prevProps = usePreviousProps({
    badgeContent: badgeContentProp,
    max: maxProp
  });
  let invisible = invisibleProp;
  if (invisibleProp === false && badgeContentProp === 0 && !showZero) {
    invisible = true;
  }
  const {
    badgeContent,
    max = maxProp
  } = invisible ? prevProps : parameters;
  const displayValue = badgeContent && Number(badgeContent) > max ? `${max}+` : badgeContent;
  return {
    badgeContent,
    invisible,
    max,
    displayValue
  };
}
function getBadgeUtilityClass(slot) {
  return generateUtilityClass("MuiBadge", slot);
}
const badgeClasses = generateUtilityClasses("MuiBadge", [
  "root",
  "badge",
  "dot",
  "standard",
  "anchorOriginTopRight",
  "anchorOriginBottomRight",
  "anchorOriginTopLeft",
  "anchorOriginBottomLeft",
  "invisible",
  "colorError",
  "colorInfo",
  "colorPrimary",
  "colorSecondary",
  "colorSuccess",
  "colorWarning",
  "overlapRectangular",
  "overlapCircular",
  // TODO: v6 remove the overlap value from these class keys
  "anchorOriginTopLeftCircular",
  "anchorOriginTopLeftRectangular",
  "anchorOriginTopRightCircular",
  "anchorOriginTopRightRectangular",
  "anchorOriginBottomLeftCircular",
  "anchorOriginBottomLeftRectangular",
  "anchorOriginBottomRightCircular",
  "anchorOriginBottomRightRectangular"
]);
const RADIUS_STANDARD = 10;
const RADIUS_DOT = 4;
const useUtilityClasses$I = (ownerState) => {
  const {
    color,
    anchorOrigin,
    invisible,
    overlap,
    variant,
    classes = {}
  } = ownerState;
  const slots = {
    root: ["root"],
    badge: ["badge", variant, invisible && "invisible", `anchorOrigin${capitalize(anchorOrigin.vertical)}${capitalize(anchorOrigin.horizontal)}`, `anchorOrigin${capitalize(anchorOrigin.vertical)}${capitalize(anchorOrigin.horizontal)}${capitalize(overlap)}`, `overlap${capitalize(overlap)}`, color !== "default" && `color${capitalize(color)}`]
  };
  return composeClasses(slots, getBadgeUtilityClass, classes);
};
const BadgeRoot = styled("span", {
  name: "MuiBadge",
  slot: "Root"
})({
  position: "relative",
  display: "inline-flex",
  // For correct alignment with the text.
  verticalAlign: "middle",
  flexShrink: 0
});
const BadgeBadge = styled("span", {
  name: "MuiBadge",
  slot: "Badge",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.badge, styles2[ownerState.variant], styles2[`anchorOrigin${capitalize(ownerState.anchorOrigin.vertical)}${capitalize(ownerState.anchorOrigin.horizontal)}${capitalize(ownerState.overlap)}`], ownerState.color !== "default" && styles2[`color${capitalize(ownerState.color)}`], ownerState.invisible && styles2.invisible];
  }
})(memoTheme(({
  theme
}) => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
  position: "absolute",
  boxSizing: "border-box",
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.pxToRem(12),
  minWidth: RADIUS_STANDARD * 2,
  lineHeight: 1,
  padding: "0 6px",
  height: RADIUS_STANDARD * 2,
  borderRadius: RADIUS_STANDARD,
  zIndex: 1,
  // Render the badge on top of potential ripples.
  "@media (forced-colors: active)": {
    border: "1px solid ButtonBorder"
  },
  ...getTransitionStyles(theme, "transform", {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.enteringScreen
  }),
  variants: [...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["contrastText"])).map(([color]) => ({
    props: {
      color
    },
    style: {
      backgroundColor: (theme.vars || theme).palette[color].main,
      color: (theme.vars || theme).palette[color].contrastText
    }
  })), {
    props: {
      variant: "dot"
    },
    style: {
      borderRadius: RADIUS_DOT,
      height: RADIUS_DOT * 2,
      minWidth: RADIUS_DOT * 2,
      padding: 0
    }
  }, {
    props: {
      invisible: true
    },
    style: {
      ...getTransitionStyles(theme, "transform", {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.leavingScreen
      })
    }
  }, {
    style: {
      inset: "var(--Badge-inset)",
      transform: "scale(1) translate(var(--Badge-translate))",
      transformOrigin: "var(--Badge-origin)",
      [`&.${badgeClasses.invisible}`]: {
        transform: "scale(0) translate(var(--Badge-translate))"
      }
    }
  }]
})));
function getAnchorOrigin(anchorOrigin) {
  return {
    vertical: anchorOrigin?.vertical ?? "top",
    horizontal: anchorOrigin?.horizontal ?? "right"
  };
}
const Badge = /* @__PURE__ */ React.forwardRef(function Badge2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiBadge"
  });
  const {
    anchorOrigin: anchorOriginProp,
    className,
    classes: classesProp,
    component,
    children,
    overlap: overlapProp = "rectangular",
    color: colorProp = "default",
    invisible: invisibleProp = false,
    max: maxProp = 99,
    badgeContent: badgeContentProp,
    slots,
    slotProps,
    showZero = false,
    variant: variantProp = "standard",
    ...other
  } = props;
  const {
    badgeContent,
    invisible: invisibleFromHook,
    max,
    displayValue: displayValueFromHook
  } = useBadge({
    max: maxProp,
    invisible: invisibleProp,
    badgeContent: badgeContentProp,
    showZero
  });
  const prevProps = usePreviousProps({
    anchorOrigin: getAnchorOrigin(anchorOriginProp),
    color: colorProp,
    overlap: overlapProp,
    variant: variantProp,
    badgeContent: badgeContentProp
  });
  const invisible = invisibleFromHook || badgeContent == null && variantProp !== "dot";
  const {
    color = colorProp,
    overlap = overlapProp,
    anchorOrigin: anchorOriginPropProp,
    variant = variantProp
  } = invisible ? prevProps : props;
  const anchorOrigin = getAnchorOrigin(anchorOriginPropProp);
  const displayValue = variant !== "dot" ? displayValueFromHook : void 0;
  const ownerState = {
    ...props,
    badgeContent,
    invisible,
    max,
    displayValue,
    showZero,
    anchorOrigin,
    color,
    overlap,
    variant
  };
  const classes = useUtilityClasses$I(ownerState);
  const externalForwardedProps = {
    slots,
    slotProps
  };
  const [RootSlot, rootProps] = useSlot("root", {
    elementType: BadgeRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other
    },
    ownerState,
    className: clsx(classes.root, className),
    ref,
    additionalProps: {
      as: component
    }
  });
  const {
    vertical,
    horizontal
  } = anchorOrigin;
  const offset = overlap === "circular" ? "14%" : "0";
  const top = vertical === "top" ? offset : "auto";
  const bottom = vertical === "bottom" ? offset : "auto";
  const right = horizontal === "right" ? offset : "auto";
  const left = horizontal === "left" ? offset : "auto";
  const [BadgeSlot, badgeProps] = useSlot("badge", {
    elementType: BadgeBadge,
    externalForwardedProps,
    ownerState,
    className: classes.badge,
    additionalProps: {
      "aria-hidden": true,
      style: {
        "--Badge-translate": `${horizontal === "right" ? "50%" : "-50%"}, ${vertical === "top" ? "-50%" : "50%"}`,
        "--Badge-inset": `${top} ${right} ${bottom} ${left}`,
        "--Badge-origin": `${horizontal === "right" ? "100%" : "0%"} ${vertical === "top" ? "0%" : "100%"}`
      }
    }
  });
  return /* @__PURE__ */ jsxs(RootSlot, {
    ...rootProps,
    children: [children, /* @__PURE__ */ jsx(BadgeSlot, {
      ...badgeProps,
      children: displayValue
    })]
  });
});
process.env.NODE_ENV !== "production" ? Badge.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The anchor of the badge.
   * @default {
   *   vertical: 'top',
   *   horizontal: 'right',
   * }
   */
  anchorOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOf(["left", "right"]),
    vertical: PropTypes.oneOf(["bottom", "top"])
  }),
  /**
   * The content rendered within the badge.
   */
  badgeContent: PropTypes.node,
  /**
   * The badge will be added relative to this node.
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
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'default'
   */
  color: PropTypes.oneOfType([PropTypes.oneOf(["default", "primary", "secondary", "error", "info", "success", "warning"]), PropTypes.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the badge is invisible.
   * @default false
   */
  invisible: PropTypes.bool,
  /**
   * Max count to show.
   * @default 99
   */
  max: PropTypes.number,
  /**
   * Wrapped shape the badge should overlap.
   * @default 'rectangular'
   */
  overlap: PropTypes.oneOf(["circular", "rectangular"]),
  /**
   * Controls whether the badge is hidden when `badgeContent` is zero.
   * @default false
   */
  showZero: PropTypes.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    badge: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    badge: PropTypes.elementType,
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
  variant: PropTypes.oneOfType([PropTypes.oneOf(["dot", "standard"]), PropTypes.string])
} : void 0;
const boxClasses = generateUtilityClasses("MuiBox", ["root"]);
const defaultTheme = createTheme();
const Box = createBox({
  themeId: THEME_ID,
  defaultTheme,
  defaultClassName: boxClasses.root,
  generateClassName: ClassNameGenerator.generate
});
process.env.NODE_ENV !== "production" ? Box.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
function getButtonUtilityClass(slot) {
  return generateUtilityClass("MuiButton", slot);
}
const buttonClasses = generateUtilityClasses("MuiButton", ["root", "text", "outlined", "contained", "disableElevation", "focusVisible", "disabled", "colorInherit", "colorPrimary", "colorSecondary", "colorSuccess", "colorError", "colorInfo", "colorWarning", "sizeMedium", "sizeSmall", "sizeLarge", "fullWidth", "startIcon", "endIcon", "icon", "loading", "loadingWrapper", "loadingIconPlaceholder", "loadingIndicator", "loadingPositionCenter", "loadingPositionStart", "loadingPositionEnd"]);
const ButtonGroupContext = /* @__PURE__ */ React.createContext({});
if (process.env.NODE_ENV !== "production") {
  ButtonGroupContext.displayName = "ButtonGroupContext";
}
const ButtonGroupButtonContext = /* @__PURE__ */ React.createContext(void 0);
if (process.env.NODE_ENV !== "production") {
  ButtonGroupButtonContext.displayName = "ButtonGroupButtonContext";
}
const useUtilityClasses$H = (ownerState) => {
  const {
    color,
    disableElevation,
    fullWidth,
    size,
    variant,
    loading,
    loadingPosition,
    classes
  } = ownerState;
  const slots = {
    root: ["root", loading && "loading", variant, `size${capitalize(size)}`, `color${capitalize(color)}`, disableElevation && "disableElevation", fullWidth && "fullWidth", loading && `loadingPosition${capitalize(loadingPosition)}`],
    startIcon: ["icon", "startIcon"],
    endIcon: ["icon", "endIcon"],
    loadingIndicator: ["loadingIndicator"],
    loadingWrapper: ["loadingWrapper"]
  };
  const composedClasses = composeClasses(slots, getButtonUtilityClass, classes);
  return {
    ...classes,
    // forward the focused, disabled, etc. classes to the ButtonBase
    ...composedClasses
  };
};
const commonIconStyles = [{
  props: {
    size: "small"
  },
  style: {
    "& > *:nth-of-type(1)": {
      fontSize: 18
    }
  }
}, {
  props: {
    size: "medium"
  },
  style: {
    "& > *:nth-of-type(1)": {
      fontSize: 20
    }
  }
}, {
  props: {
    size: "large"
  },
  style: {
    "& > *:nth-of-type(1)": {
      fontSize: 22
    }
  }
}];
const ButtonRoot = styled(ButtonBase, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiButton",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, styles2[ownerState.variant], styles2[`size${capitalize(ownerState.size)}`], ownerState.color === "inherit" && styles2.colorInherit, ownerState.disableElevation && styles2.disableElevation, ownerState.fullWidth && styles2.fullWidth, ownerState.loading && styles2.loading];
  }
})(memoTheme(({
  theme
}) => {
  const inheritContainedBackgroundColor = theme.palette.mode === "light" ? theme.palette.grey[300] : theme.palette.grey[800];
  const inheritContainedHoverBackgroundColor = theme.palette.mode === "light" ? theme.palette.grey.A100 : theme.palette.grey[700];
  return {
    ...theme.typography.button,
    minWidth: 64,
    padding: "6px 16px",
    border: 0,
    borderRadius: (theme.vars || theme).shape.borderRadius,
    ...getTransitionStyles(theme, ["background-color", "box-shadow", "border-color", "color"], {
      duration: theme.transitions.duration.short
    }),
    "&:hover": {
      textDecoration: "none"
    },
    [`&.${buttonClasses.disabled}`]: {
      color: (theme.vars || theme).palette.action.disabled
    },
    variants: [{
      props: {
        variant: "contained"
      },
      style: {
        color: `var(--variant-containedColor)`,
        backgroundColor: `var(--variant-containedBg)`,
        boxShadow: (theme.vars || theme).shadows[2],
        "&:hover": {
          boxShadow: (theme.vars || theme).shadows[4],
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            boxShadow: (theme.vars || theme).shadows[2]
          }
        },
        "&:active": {
          boxShadow: (theme.vars || theme).shadows[8]
        },
        [`&.${buttonClasses.focusVisible}`]: {
          boxShadow: (theme.vars || theme).shadows[6]
        },
        [`&.${buttonClasses.disabled}`]: {
          color: (theme.vars || theme).palette.action.disabled,
          boxShadow: (theme.vars || theme).shadows[0],
          backgroundColor: (theme.vars || theme).palette.action.disabledBackground
        }
      }
    }, {
      props: {
        variant: "outlined"
      },
      style: {
        padding: "5px 15px",
        border: "1px solid currentColor",
        borderColor: `var(--variant-outlinedBorder, currentColor)`,
        backgroundColor: `var(--variant-outlinedBg)`,
        color: `var(--variant-outlinedColor)`,
        [`&.${buttonClasses.disabled}`]: {
          border: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`
        }
      }
    }, {
      props: {
        variant: "text"
      },
      style: {
        padding: "6px 8px",
        color: `var(--variant-textColor)`,
        backgroundColor: `var(--variant-textBg)`
      }
    }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
      props: {
        color
      },
      style: {
        "--variant-textColor": (theme.vars || theme).palette[color].main,
        "--variant-outlinedColor": (theme.vars || theme).palette[color].main,
        "--variant-outlinedBorder": theme.alpha((theme.vars || theme).palette[color].main, 0.5),
        "--variant-containedColor": (theme.vars || theme).palette[color].contrastText,
        "--variant-containedBg": (theme.vars || theme).palette[color].main,
        "@media (hover: hover)": {
          "&:hover": {
            "--variant-containedBg": (theme.vars || theme).palette[color].dark,
            "--variant-textBg": theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.hoverOpacity),
            "--variant-outlinedBorder": (theme.vars || theme).palette[color].main,
            "--variant-outlinedBg": theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.hoverOpacity)
          }
        }
      }
    })), {
      props: {
        color: "inherit"
      },
      style: {
        color: "inherit",
        borderColor: "currentColor",
        "--variant-containedBg": theme.vars ? theme.vars.palette.Button.inheritContainedBg : inheritContainedBackgroundColor,
        "@media (hover: hover)": {
          "&:hover": {
            "--variant-containedBg": theme.vars ? theme.vars.palette.Button.inheritContainedHoverBg : inheritContainedHoverBackgroundColor,
            "--variant-textBg": theme.alpha((theme.vars || theme).palette.text.primary, (theme.vars || theme).palette.action.hoverOpacity),
            "--variant-outlinedBg": theme.alpha((theme.vars || theme).palette.text.primary, (theme.vars || theme).palette.action.hoverOpacity)
          }
        }
      }
    }, {
      props: {
        size: "small",
        variant: "text"
      },
      style: {
        padding: "4px 5px",
        fontSize: theme.typography.pxToRem(13)
      }
    }, {
      props: {
        size: "large",
        variant: "text"
      },
      style: {
        padding: "8px 11px",
        fontSize: theme.typography.pxToRem(15)
      }
    }, {
      props: {
        size: "small",
        variant: "outlined"
      },
      style: {
        padding: "3px 9px",
        fontSize: theme.typography.pxToRem(13)
      }
    }, {
      props: {
        size: "large",
        variant: "outlined"
      },
      style: {
        padding: "7px 21px",
        fontSize: theme.typography.pxToRem(15)
      }
    }, {
      props: {
        size: "small",
        variant: "contained"
      },
      style: {
        padding: "4px 10px",
        fontSize: theme.typography.pxToRem(13)
      }
    }, {
      props: {
        size: "large",
        variant: "contained"
      },
      style: {
        padding: "8px 22px",
        fontSize: theme.typography.pxToRem(15)
      }
    }, {
      props: {
        disableElevation: true
      },
      style: {
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none"
        },
        [`&.${buttonClasses.focusVisible}`]: {
          boxShadow: "none"
        },
        "&:active": {
          boxShadow: "none"
        },
        [`&.${buttonClasses.disabled}`]: {
          boxShadow: "none"
        }
      }
    }, {
      props: {
        fullWidth: true
      },
      style: {
        width: "100%"
      }
    }, {
      props: {
        loadingPosition: "center"
      },
      style: {
        ...getTransitionStyles(theme, ["background-color", "box-shadow", "border-color"], {
          duration: theme.transitions.duration.short
        }),
        [`&.${buttonClasses.loading}`]: {
          color: "transparent"
        }
      }
    }]
  };
}));
const ButtonStartIcon = styled("span", {
  name: "MuiButton",
  slot: "StartIcon",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.startIcon, ownerState.loading && styles2.startIconLoadingStart];
  }
})(({
  theme
}) => ({
  display: "inherit",
  alignItems: "center",
  marginRight: 8,
  marginLeft: -4,
  "&::before": {
    content: '"\\200b"',
    width: 0,
    overflow: "hidden"
  },
  variants: [{
    props: {
      size: "small"
    },
    style: {
      marginLeft: -2
    }
  }, {
    props: {
      loadingPosition: "start",
      loading: true
    },
    style: {
      ...getTransitionStyles(theme, ["opacity"], {
        duration: theme.transitions.duration.short
      }),
      opacity: 0
    }
  }, {
    props: {
      loadingPosition: "start",
      loading: true,
      fullWidth: true
    },
    style: {
      marginRight: -8
    }
  }, ...commonIconStyles]
}));
const ButtonEndIcon = styled("span", {
  name: "MuiButton",
  slot: "EndIcon",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.endIcon, ownerState.loading && styles2.endIconLoadingEnd];
  }
})(({
  theme
}) => ({
  display: "inherit",
  marginRight: -4,
  marginLeft: 8,
  variants: [{
    props: {
      size: "small"
    },
    style: {
      marginRight: -2
    }
  }, {
    props: {
      loadingPosition: "end",
      loading: true
    },
    style: {
      ...getTransitionStyles(theme, ["opacity"], {
        duration: theme.transitions.duration.short
      }),
      opacity: 0
    }
  }, {
    props: {
      loadingPosition: "end",
      loading: true,
      fullWidth: true
    },
    style: {
      marginLeft: -8
    }
  }, ...commonIconStyles]
}));
const ButtonLoadingIndicator = styled("span", {
  name: "MuiButton",
  slot: "LoadingIndicator"
})(({
  theme
}) => ({
  display: "none",
  position: "absolute",
  visibility: "visible",
  variants: [{
    props: {
      loading: true
    },
    style: {
      display: "flex"
    }
  }, {
    props: {
      loadingPosition: "start"
    },
    style: {
      left: 14
    }
  }, {
    props: {
      loadingPosition: "start",
      size: "small"
    },
    style: {
      left: 10
    }
  }, {
    props: {
      variant: "text",
      loadingPosition: "start"
    },
    style: {
      left: 6
    }
  }, {
    props: {
      loadingPosition: "center"
    },
    style: {
      left: "50%",
      transform: "translate(-50%)",
      color: (theme.vars || theme).palette.action.disabled
    }
  }, {
    props: {
      loadingPosition: "end"
    },
    style: {
      right: 14
    }
  }, {
    props: {
      loadingPosition: "end",
      size: "small"
    },
    style: {
      right: 10
    }
  }, {
    props: {
      variant: "text",
      loadingPosition: "end"
    },
    style: {
      right: 6
    }
  }, {
    props: {
      loadingPosition: "start",
      fullWidth: true
    },
    style: {
      position: "relative",
      left: -10
    }
  }, {
    props: {
      loadingPosition: "end",
      fullWidth: true
    },
    style: {
      position: "relative",
      right: -10
    }
  }]
}));
const ButtonLoadingIconPlaceholder = styled("span", {
  name: "MuiButton",
  slot: "LoadingIconPlaceholder"
})({
  display: "inline-block",
  width: "1em",
  height: "1em"
});
const Button = /* @__PURE__ */ React.forwardRef(function Button2(inProps, ref) {
  const contextProps = React.useContext(ButtonGroupContext);
  const buttonGroupButtonContextPositionClassName = React.useContext(ButtonGroupButtonContext);
  const resolvedProps = resolveProps(contextProps, inProps);
  const props = useDefaultProps({
    props: resolvedProps,
    name: "MuiButton"
  });
  const {
    children,
    color = "primary",
    component = "button",
    className,
    disabled = false,
    disableElevation = false,
    disableFocusRipple = false,
    endIcon: endIconProp,
    focusVisibleClassName,
    fullWidth = false,
    id: idProp,
    loading = null,
    loadingIndicator: loadingIndicatorProp,
    loadingPosition = "center",
    size = "medium",
    startIcon: startIconProp,
    type,
    variant = "text",
    ...other
  } = props;
  const loadingId = useId(idProp);
  const loadingIndicator = loadingIndicatorProp ?? /* @__PURE__ */ jsx(CircularProgress, {
    "aria-labelledby": loadingId,
    color: "inherit",
    size: 16
  });
  const ownerState = {
    ...props,
    color,
    component,
    disabled,
    disableElevation,
    disableFocusRipple,
    fullWidth,
    loading,
    loadingIndicator,
    loadingPosition,
    size,
    type,
    variant
  };
  const classes = useUtilityClasses$H(ownerState);
  const startIcon = (startIconProp || loading && loadingPosition === "start") && /* @__PURE__ */ jsx(ButtonStartIcon, {
    className: classes.startIcon,
    ownerState,
    children: startIconProp || /* @__PURE__ */ jsx(ButtonLoadingIconPlaceholder, {
      className: classes.loadingIconPlaceholder,
      ownerState
    })
  });
  const endIcon = (endIconProp || loading && loadingPosition === "end") && /* @__PURE__ */ jsx(ButtonEndIcon, {
    className: classes.endIcon,
    ownerState,
    children: endIconProp || /* @__PURE__ */ jsx(ButtonLoadingIconPlaceholder, {
      className: classes.loadingIconPlaceholder,
      ownerState
    })
  });
  const positionClassName = buttonGroupButtonContextPositionClassName || "";
  const loader = typeof loading === "boolean" ? (
    // use plain HTML span to minimize the runtime overhead
    /* @__PURE__ */ jsx("span", {
      className: classes.loadingWrapper,
      style: {
        display: "contents"
      },
      children: loading && /* @__PURE__ */ jsx(ButtonLoadingIndicator, {
        className: classes.loadingIndicator,
        ownerState,
        children: loadingIndicator
      })
    })
  ) : null;
  const {
    root: root2,
    ...forwardedClasses
  } = classes;
  return /* @__PURE__ */ jsxs(ButtonRoot, {
    ownerState,
    className: clsx(contextProps.className, classes.root, className, positionClassName),
    component,
    disabled: disabled || loading,
    focusRipple: !disableFocusRipple,
    focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
    ref,
    internalNativeButton: true,
    type,
    id: loading ? loadingId : idProp,
    ...other,
    classes: forwardedClasses,
    children: [startIcon, loadingPosition !== "end" && loader, children, loadingPosition === "end" && loader, endIcon]
  });
});
process.env.NODE_ENV !== "production" ? Button.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes.oneOfType([PropTypes.oneOf(["inherit", "primary", "secondary", "success", "error", "info", "warning"]), PropTypes.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * Element placed after the children.
   */
  endIcon: PropTypes.node,
  /**
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: PropTypes.string,
  /**
   * @ignore
   */
  id: PropTypes.string,
  /**
   * If `true`, the loading indicator is visible and the button is disabled.
   * If `true | false`, the loading wrapper is always rendered before the children to prevent [Google Translation Crash](https://github.com/mui/material-ui/issues/27853).
   * @default null
   */
  loading: PropTypes.bool,
  /**
   * Element placed before the children if the button is in loading state.
   * The node should contain an element with `role="progressbar"` with an accessible name.
   * By default, it renders a `CircularProgress` that is labeled by the button itself.
   * @default <CircularProgress color="inherit" size={16} />
   */
  loadingIndicator: PropTypes.node,
  /**
   * The loading indicator can be positioned on the start, end, or the center of the button.
   * @default 'center'
   */
  loadingPosition: PropTypes.oneOf(["center", "end", "start"]),
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: PropTypes.oneOfType([PropTypes.oneOf(["small", "medium", "large"]), PropTypes.string]),
  /**
   * Element placed before the children.
   */
  startIcon: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * @ignore
   */
  type: PropTypes.string,
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes.oneOfType([PropTypes.oneOf(["contained", "outlined", "text"]), PropTypes.string])
} : void 0;
function getButtonGroupUtilityClass(slot) {
  return generateUtilityClass("MuiButtonGroup", slot);
}
const buttonGroupClasses = generateUtilityClasses("MuiButtonGroup", ["root", "contained", "outlined", "text", "disableElevation", "disabled", "firstButton", "fullWidth", "horizontal", "vertical", "colorPrimary", "colorSecondary", "grouped", "lastButton", "middleButton"]);
const overridesResolver$2 = (props, styles2) => {
  const {
    ownerState
  } = props;
  return [{
    [`& .${buttonGroupClasses.grouped}`]: styles2.grouped
  }, {
    [`& .${buttonGroupClasses.firstButton}`]: styles2.firstButton
  }, {
    [`& .${buttonGroupClasses.lastButton}`]: styles2.lastButton
  }, {
    [`& .${buttonGroupClasses.middleButton}`]: styles2.middleButton
  }, styles2.root, styles2[ownerState.variant], ownerState.disableElevation === true && styles2.disableElevation, ownerState.fullWidth && styles2.fullWidth, ownerState.orientation === "vertical" && styles2.vertical];
};
const useUtilityClasses$G = (ownerState) => {
  const {
    classes,
    color,
    disabled,
    disableElevation,
    fullWidth,
    orientation,
    variant
  } = ownerState;
  const slots = {
    root: ["root", variant, orientation, fullWidth && "fullWidth", disableElevation && "disableElevation", `color${capitalize(color)}`],
    grouped: ["grouped", disabled && "disabled"],
    firstButton: ["firstButton"],
    lastButton: ["lastButton"],
    middleButton: ["middleButton"]
  };
  return composeClasses(slots, getButtonGroupUtilityClass, classes);
};
const ButtonGroupRoot = styled("div", {
  name: "MuiButtonGroup",
  slot: "Root",
  overridesResolver: overridesResolver$2
})(memoTheme(({
  theme
}) => ({
  display: "inline-flex",
  borderRadius: (theme.vars || theme).shape.borderRadius,
  variants: [{
    props: {
      variant: "contained"
    },
    style: {
      boxShadow: (theme.vars || theme).shadows[2],
      [`& .${buttonGroupClasses.grouped}`]: {
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none"
        }
      }
    }
  }, {
    props: {
      disableElevation: true
    },
    style: {
      boxShadow: "none"
    }
  }, {
    props: {
      fullWidth: true
    },
    style: {
      width: "100%"
    }
  }, {
    props: {
      orientation: "vertical"
    },
    style: {
      flexDirection: "column",
      [`& .${buttonGroupClasses.lastButton},& .${buttonGroupClasses.middleButton}`]: {
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0
      },
      [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0
      }
    }
  }, {
    props: {
      orientation: "horizontal"
    },
    style: {
      [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
      },
      [`& .${buttonGroupClasses.lastButton},& .${buttonGroupClasses.middleButton}`]: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
      }
    }
  }, {
    props: {
      variant: "text",
      orientation: "horizontal"
    },
    style: {
      [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
        borderRight: theme.vars ? `1px solid ${theme.alpha(theme.vars.palette.common.onBackground, 0.23)}` : `1px solid ${theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)"}`,
        [`&.${buttonGroupClasses.disabled}`]: {
          borderRight: `1px solid ${(theme.vars || theme).palette.action.disabled}`
        }
      }
    }
  }, {
    props: {
      variant: "text",
      orientation: "vertical"
    },
    style: {
      [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
        borderBottom: theme.vars ? `1px solid ${theme.alpha(theme.vars.palette.common.onBackground, 0.23)}` : `1px solid ${theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)"}`,
        [`&.${buttonGroupClasses.disabled}`]: {
          borderBottom: `1px solid ${(theme.vars || theme).palette.action.disabled}`
        }
      }
    }
  }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).flatMap(([color]) => [{
    props: {
      variant: "text",
      color
    },
    style: {
      [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
        borderColor: theme.alpha((theme.vars || theme).palette[color].main, 0.5)
      }
    }
  }]), {
    props: {
      variant: "outlined",
      orientation: "horizontal"
    },
    style: {
      [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
        borderRightColor: "transparent",
        "&:hover": {
          borderRightColor: "currentColor"
        }
      },
      [`& .${buttonGroupClasses.lastButton},& .${buttonGroupClasses.middleButton}`]: {
        marginLeft: -1
      }
    }
  }, {
    props: {
      variant: "outlined",
      orientation: "vertical"
    },
    style: {
      [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
        borderBottomColor: "transparent",
        "&:hover": {
          borderBottomColor: "currentColor"
        }
      },
      [`& .${buttonGroupClasses.lastButton},& .${buttonGroupClasses.middleButton}`]: {
        marginTop: -1
      }
    }
  }, {
    props: {
      variant: "contained",
      orientation: "horizontal"
    },
    style: {
      [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
        borderRight: `1px solid ${(theme.vars || theme).palette.grey[400]}`,
        [`&.${buttonGroupClasses.disabled}`]: {
          borderRight: `1px solid ${(theme.vars || theme).palette.action.disabled}`
        }
      }
    }
  }, {
    props: {
      variant: "contained",
      orientation: "vertical"
    },
    style: {
      [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
        borderBottom: `1px solid ${(theme.vars || theme).palette.grey[400]}`,
        [`&.${buttonGroupClasses.disabled}`]: {
          borderBottom: `1px solid ${(theme.vars || theme).palette.action.disabled}`
        }
      }
    }
  }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["dark"])).map(([color]) => ({
    props: {
      variant: "contained",
      color
    },
    style: {
      [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]: {
        borderColor: (theme.vars || theme).palette[color].dark
      }
    }
  }))],
  [`& .${buttonGroupClasses.grouped}`]: {
    minWidth: 40
  }
})));
const ButtonGroup = /* @__PURE__ */ React.forwardRef(function ButtonGroup2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiButtonGroup"
  });
  const {
    children,
    className,
    color = "primary",
    component = "div",
    disabled = false,
    disableElevation = false,
    disableFocusRipple = false,
    disableRipple = false,
    fullWidth = false,
    orientation = "horizontal",
    size = "medium",
    variant = "outlined",
    ...other
  } = props;
  const ownerState = {
    ...props,
    color,
    component,
    disabled,
    disableElevation,
    disableFocusRipple,
    disableRipple,
    fullWidth,
    orientation,
    size,
    variant
  };
  const classes = useUtilityClasses$G(ownerState);
  const context = React.useMemo(() => ({
    className: classes.grouped,
    color,
    disabled,
    disableElevation,
    disableFocusRipple,
    disableRipple,
    fullWidth,
    size,
    variant
  }), [color, disabled, disableElevation, disableFocusRipple, disableRipple, fullWidth, size, variant, classes.grouped]);
  const validChildren = getValidReactChildren(children);
  const childrenCount = validChildren.length;
  const getButtonPositionClassName = (index) => {
    const isFirstButton = index === 0;
    const isLastButton = index === childrenCount - 1;
    if (isFirstButton && isLastButton) {
      return "";
    }
    if (isFirstButton) {
      return classes.firstButton;
    }
    if (isLastButton) {
      return classes.lastButton;
    }
    return classes.middleButton;
  };
  return /* @__PURE__ */ jsx(ButtonGroupRoot, {
    as: component,
    role: "group",
    className: clsx(classes.root, className),
    ref,
    ownerState,
    ...other,
    children: /* @__PURE__ */ jsx(ButtonGroupContext.Provider, {
      value: context,
      children: validChildren.map((child, index) => {
        return /* @__PURE__ */ jsx(ButtonGroupButtonContext.Provider, {
          value: getButtonPositionClassName(index),
          children: child
        }, index);
      })
    })
  });
});
process.env.NODE_ENV !== "production" ? ButtonGroup.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes.oneOfType([PropTypes.oneOf(["inherit", "primary", "secondary", "error", "info", "success", "warning"]), PropTypes.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation: PropTypes.bool,
  /**
   * If `true`, the button keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the button ripple effect is disabled.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * If `true`, the buttons will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: PropTypes.oneOfType([PropTypes.oneOf(["small", "medium", "large"]), PropTypes.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: PropTypes.oneOfType([PropTypes.oneOf(["contained", "outlined", "text"]), PropTypes.string])
} : void 0;
function getCardUtilityClass(slot) {
  return generateUtilityClass("MuiCard", slot);
}
generateUtilityClasses("MuiCard", ["root"]);
const useUtilityClasses$F = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getCardUtilityClass, classes);
};
const CardRoot = styled(Paper, {
  name: "MuiCard",
  slot: "Root"
})({
  overflow: "hidden"
});
const Card = /* @__PURE__ */ React.forwardRef(function Card2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiCard"
  });
  const {
    className,
    raised = false,
    ...other
  } = props;
  const ownerState = {
    ...props,
    raised
  };
  const classes = useUtilityClasses$F(ownerState);
  return /* @__PURE__ */ jsx(CardRoot, {
    className: clsx(classes.root, className),
    elevation: raised ? 8 : void 0,
    ref,
    ownerState,
    ...other
  });
});
process.env.NODE_ENV !== "production" ? Card.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * If `true`, the card will use raised styling.
   * @default false
   */
  raised: chainPropTypes(PropTypes.bool, (props) => {
    if (props.raised && props.variant === "outlined") {
      return new Error('MUI: Combining `raised={true}` with `variant="outlined"` has no effect.');
    }
    return null;
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
function getCardActionAreaUtilityClass(slot) {
  return generateUtilityClass("MuiCardActionArea", slot);
}
const cardActionAreaClasses = generateUtilityClasses("MuiCardActionArea", ["root", "focusVisible", "focusHighlight"]);
const useUtilityClasses$E = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    focusHighlight: ["focusHighlight"]
  };
  return composeClasses(slots, getCardActionAreaUtilityClass, classes);
};
const CardActionAreaRoot = styled(ButtonBase, {
  name: "MuiCardActionArea",
  slot: "Root"
})(memoTheme(({
  theme
}) => ({
  display: "block",
  textAlign: "inherit",
  borderRadius: "inherit",
  // for Safari to work https://github.com/mui/material-ui/issues/36285.
  width: "100%",
  [`&:hover .${cardActionAreaClasses.focusHighlight}`]: {
    opacity: (theme.vars || theme).palette.action.hoverOpacity,
    "@media (hover: none)": {
      opacity: 0
    }
  },
  [`&.${cardActionAreaClasses.focusVisible} .${cardActionAreaClasses.focusHighlight}`]: {
    opacity: (theme.vars || theme).palette.action.focusOpacity
  }
})));
const CardActionAreaFocusHighlight = styled("span", {
  name: "MuiCardActionArea",
  slot: "FocusHighlight"
})(memoTheme(({
  theme
}) => ({
  overflow: "hidden",
  pointerEvents: "none",
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: "inherit",
  opacity: 0,
  backgroundColor: "currentcolor",
  ...getTransitionStyles(theme, "opacity", {
    duration: theme.transitions.duration.short
  })
})));
const CardActionArea = /* @__PURE__ */ React.forwardRef(function CardActionArea2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiCardActionArea"
  });
  const {
    children,
    className,
    focusVisibleClassName,
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const ownerState = props;
  const classes = useUtilityClasses$E(ownerState);
  const externalForwardedProps = {
    slots,
    slotProps
  };
  const [RootSlot, rootProps] = useSlot("root", {
    elementType: CardActionAreaRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other
    },
    shouldForwardComponentProp: true,
    ownerState,
    ref,
    className: clsx(classes.root, className),
    additionalProps: {
      internalNativeButton: true,
      focusVisibleClassName: clsx(focusVisibleClassName, classes.focusVisible)
    }
  });
  const [FocusHighlightSlot, focusHighlightProps] = useSlot("focusHighlight", {
    elementType: CardActionAreaFocusHighlight,
    externalForwardedProps,
    ownerState,
    className: classes.focusHighlight
  });
  return /* @__PURE__ */ jsxs(RootSlot, {
    ...rootProps,
    children: [children, /* @__PURE__ */ jsx(FocusHighlightSlot, {
      ...focusHighlightProps
    })]
  });
});
process.env.NODE_ENV !== "production" ? CardActionArea.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    focusHighlight: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    focusHighlight: PropTypes.elementType,
    root: PropTypes.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
function getCardContentUtilityClass(slot) {
  return generateUtilityClass("MuiCardContent", slot);
}
generateUtilityClasses("MuiCardContent", ["root"]);
const useUtilityClasses$D = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getCardContentUtilityClass, classes);
};
const CardContentRoot = styled("div", {
  name: "MuiCardContent",
  slot: "Root"
})({
  padding: 16,
  "&:last-child": {
    paddingBottom: 24
  }
});
const CardContent = /* @__PURE__ */ React.forwardRef(function CardContent2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiCardContent"
  });
  const {
    className,
    component = "div",
    ...other
  } = props;
  const ownerState = {
    ...props,
    component
  };
  const classes = useUtilityClasses$D(ownerState);
  return /* @__PURE__ */ jsx(CardContentRoot, {
    as: component,
    className: clsx(classes.root, className),
    ownerState,
    ref,
    ...other
  });
});
process.env.NODE_ENV !== "production" ? CardContent.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
function getCardHeaderUtilityClass(slot) {
  return generateUtilityClass("MuiCardHeader", slot);
}
const cardHeaderClasses = generateUtilityClasses("MuiCardHeader", ["root", "avatar", "action", "content", "title", "subheader"]);
const useUtilityClasses$C = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    avatar: ["avatar"],
    action: ["action"],
    content: ["content"],
    title: ["title"],
    subheader: ["subheader"]
  };
  return composeClasses(slots, getCardHeaderUtilityClass, classes);
};
const CardHeaderRoot = styled("div", {
  name: "MuiCardHeader",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    return [{
      [`& .${cardHeaderClasses.title}`]: styles2.title
    }, {
      [`& .${cardHeaderClasses.subheader}`]: styles2.subheader
    }, styles2.root];
  }
})({
  display: "flex",
  alignItems: "center",
  padding: 16
});
const CardHeaderAvatar = styled("div", {
  name: "MuiCardHeader",
  slot: "Avatar"
})({
  display: "flex",
  flex: "0 0 auto",
  marginRight: 16
});
const CardHeaderAction = styled("div", {
  name: "MuiCardHeader",
  slot: "Action"
})({
  flex: "0 0 auto",
  alignSelf: "flex-start",
  marginTop: -4,
  marginRight: -8,
  marginBottom: -4
});
const CardHeaderContent = styled("div", {
  name: "MuiCardHeader",
  slot: "Content"
})({
  flex: "1 1 auto",
  // Combine this and the below selector once https://github.com/emotion-js/emotion/issues/3366 is solved
  [`.${typographyClasses.root}:where(& .${cardHeaderClasses.title})`]: {
    display: "block"
  },
  [`.${typographyClasses.root}:where(& .${cardHeaderClasses.subheader})`]: {
    display: "block"
  }
});
const CardHeader = /* @__PURE__ */ React.forwardRef(function CardHeader2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiCardHeader"
  });
  const {
    action,
    avatar,
    component = "div",
    disableTypography = false,
    subheader: subheaderProp,
    title: titleProp,
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const ownerState = {
    ...props,
    component,
    disableTypography
  };
  const classes = useUtilityClasses$C(ownerState);
  const externalForwardedProps = {
    slots,
    slotProps
  };
  let title = titleProp;
  const [TitleSlot, titleSlotProps] = useSlot("title", {
    className: classes.title,
    elementType: Typography,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      variant: avatar ? "body2" : "h5",
      component: "span"
    }
  });
  if (title != null && title.type !== Typography && !disableTypography) {
    title = /* @__PURE__ */ jsx(TitleSlot, {
      ...titleSlotProps,
      children: title
    });
  }
  let subheader = subheaderProp;
  const [SubheaderSlot, subheaderSlotProps] = useSlot("subheader", {
    className: classes.subheader,
    elementType: Typography,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      variant: avatar ? "body2" : "body1",
      color: "textSecondary",
      component: "span"
    }
  });
  if (subheader != null && subheader.type !== Typography && !disableTypography) {
    subheader = /* @__PURE__ */ jsx(SubheaderSlot, {
      ...subheaderSlotProps,
      children: subheader
    });
  }
  const [RootSlot, rootSlotProps] = useSlot("root", {
    ref,
    className: classes.root,
    elementType: CardHeaderRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other,
      component
    },
    ownerState
  });
  const [AvatarSlot, avatarSlotProps] = useSlot("avatar", {
    className: classes.avatar,
    elementType: CardHeaderAvatar,
    externalForwardedProps,
    ownerState
  });
  const [ContentSlot, contentSlotProps] = useSlot("content", {
    className: classes.content,
    elementType: CardHeaderContent,
    externalForwardedProps,
    ownerState
  });
  const [ActionSlot, actionSlotProps] = useSlot("action", {
    className: classes.action,
    elementType: CardHeaderAction,
    externalForwardedProps,
    ownerState
  });
  return /* @__PURE__ */ jsxs(RootSlot, {
    ...rootSlotProps,
    children: [avatar && /* @__PURE__ */ jsx(AvatarSlot, {
      ...avatarSlotProps,
      children: avatar
    }), /* @__PURE__ */ jsxs(ContentSlot, {
      ...contentSlotProps,
      children: [title, subheader]
    }), action && /* @__PURE__ */ jsx(ActionSlot, {
      ...actionSlotProps,
      children: action
    })]
  });
});
process.env.NODE_ENV !== "production" ? CardHeader.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The action to display in the card header.
   */
  action: PropTypes.node,
  /**
   * The Avatar element to display.
   */
  avatar: PropTypes.node,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, `subheader` and `title` won't be wrapped by a Typography component.
   * This can be useful to render an alternative Typography variant by wrapping
   * the `title` text, and optional `subheader` text
   * with the Typography component.
   * @default false
   */
  disableTypography: PropTypes.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    action: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    avatar: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    content: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    subheader: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    title: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    action: PropTypes.elementType,
    avatar: PropTypes.elementType,
    content: PropTypes.elementType,
    root: PropTypes.elementType,
    subheader: PropTypes.elementType,
    title: PropTypes.elementType
  }),
  /**
   * The content of the component.
   */
  subheader: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The content of the component.
   */
  title: PropTypes.node
} : void 0;
function getSwitchBaseUtilityClass(slot) {
  return generateUtilityClass("PrivateSwitchBase", slot);
}
generateUtilityClasses("PrivateSwitchBase", ["root", "checked", "disabled", "input", "edgeStart", "edgeEnd"]);
const useUtilityClasses$B = (ownerState) => {
  const {
    classes,
    checked,
    disabled,
    edge
  } = ownerState;
  const slots = {
    root: ["root", checked && "checked", disabled && "disabled", edge && `edge${capitalize(edge)}`],
    input: ["input"]
  };
  return composeClasses(slots, getSwitchBaseUtilityClass, classes);
};
const SwitchBaseRoot = styled(ButtonBase, {
  name: "MuiSwitchBase"
})({
  padding: 9,
  borderRadius: "50%",
  variants: [{
    props: {
      edge: "start",
      size: "small"
    },
    style: {
      marginLeft: -3
    }
  }, {
    props: ({
      edge,
      ownerState
    }) => edge === "start" && ownerState.size !== "small",
    style: {
      marginLeft: -12
    }
  }, {
    props: {
      edge: "end",
      size: "small"
    },
    style: {
      marginRight: -3
    }
  }, {
    props: ({
      edge,
      ownerState
    }) => edge === "end" && ownerState.size !== "small",
    style: {
      marginRight: -12
    }
  }]
});
const SwitchBaseInput = styled("input", {
  name: "MuiSwitchBase",
  shouldForwardProp: rootShouldForwardProp
})({
  cursor: "inherit",
  position: "absolute",
  opacity: 0,
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  margin: 0,
  padding: 0,
  zIndex: 1
});
const SwitchBase = /* @__PURE__ */ React.forwardRef(function SwitchBase2(props, ref) {
  const {
    autoFocus,
    checked: checkedProp,
    checkedIcon,
    defaultChecked,
    disabled: disabledProp,
    disableFocusRipple = false,
    edge = false,
    icon,
    id,
    name,
    onBlur,
    onChange,
    onFocus,
    readOnly,
    required = false,
    tabIndex,
    type,
    value,
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const {
    nativeButton,
    ...buttonBaseProps
  } = other;
  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: "SwitchBase",
    state: "checked"
  });
  const muiFormControl = useFormControl();
  const handleFocus = (event) => {
    if (onFocus) {
      onFocus(event);
    }
    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    }
  };
  const handleBlur = (event) => {
    if (onBlur) {
      onBlur(event);
    }
    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    }
  };
  const handleInputChange = (event) => {
    if (event.nativeEvent.defaultPrevented || readOnly) {
      return;
    }
    const newChecked = event.target.checked;
    setCheckedState(newChecked);
    if (onChange) {
      onChange(event, newChecked);
    }
  };
  let disabled = disabledProp;
  if (muiFormControl) {
    if (typeof disabled === "undefined") {
      disabled = muiFormControl.disabled;
    }
  }
  const hasLabelFor = type === "checkbox" || type === "radio";
  const ownerState = {
    ...props,
    checked,
    disabled,
    disableFocusRipple,
    edge
  };
  const classes = useUtilityClasses$B(ownerState);
  const externalForwardedProps = {
    slots,
    slotProps
  };
  const [RootSlot, rootSlotProps] = useSlot("root", {
    ref,
    elementType: SwitchBaseRoot,
    className: classes.root,
    shouldForwardComponentProp: true,
    externalForwardedProps: {
      ...externalForwardedProps,
      component: "span",
      ...buttonBaseProps
    },
    getSlotProps: (handlers) => ({
      ...handlers,
      onFocus: (event) => {
        handlers.onFocus?.(event);
        handleFocus(event);
      },
      onBlur: (event) => {
        handlers.onBlur?.(event);
        handleBlur(event);
      }
    }),
    ownerState,
    additionalProps: {
      centerRipple: true,
      focusRipple: !disableFocusRipple,
      role: void 0,
      tabIndex: null
    }
  });
  const [InputSlot, inputSlotProps] = useSlot("input", {
    elementType: SwitchBaseInput,
    className: classes.input,
    externalForwardedProps,
    getSlotProps: (handlers) => ({
      ...handlers,
      onChange: (event) => {
        handlers.onChange?.(event);
        handleInputChange(event);
      }
    }),
    ownerState,
    additionalProps: {
      autoFocus,
      checked: checkedProp,
      defaultChecked,
      disabled,
      id: hasLabelFor ? id : void 0,
      name,
      readOnly,
      required,
      tabIndex,
      type,
      ...type === "checkbox" && value === void 0 ? {} : {
        value
      }
    }
  });
  return /* @__PURE__ */ jsxs(RootSlot, {
    ...rootSlotProps,
    children: [/* @__PURE__ */ jsx(InputSlot, {
      ...inputSlotProps
    }), checked ? checkedIcon : icon]
  });
});
process.env.NODE_ENV !== "production" ? SwitchBase.propTypes = {
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: PropTypes.bool,
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: PropTypes.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  defaultChecked: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: PropTypes.oneOf(["end", "start", false]),
  /**
   * The icon to display when the component is unchecked.
   */
  icon: PropTypes.node.isRequired,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /*
   * @ignore
   */
  name: PropTypes.string,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: PropTypes.bool,
  /**
   * If `true`, the `input` element is required.
   */
  required: PropTypes.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    input: PropTypes.elementType,
    root: PropTypes.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * @ignore
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The input component prop `type`.
   */
  type: PropTypes.string.isRequired,
  /**
   * The value of the component.
   */
  value: PropTypes.any
} : void 0;
const CheckBoxOutlineBlankIcon = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
}), "CheckBoxOutlineBlank");
const CheckBoxIcon = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
}), "CheckBox");
const IndeterminateCheckBoxIcon = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"
}), "IndeterminateCheckBox");
const useUtilityClasses$A = (ownerState) => {
  const {
    classes,
    indeterminate,
    color,
    size
  } = ownerState;
  const slots = {
    root: ["root", indeterminate && "indeterminate", `color${capitalize(color)}`, `size${capitalize(size)}`]
  };
  const composedClasses = composeClasses(slots, getCheckboxUtilityClass, classes);
  return {
    ...classes,
    // forward the disabled and checked classes to the SwitchBase
    ...composedClasses
  };
};
const CheckboxRoot = styled(SwitchBase, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiCheckbox",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.indeterminate && styles2.indeterminate, styles2[`size${capitalize(ownerState.size)}`], ownerState.color !== "default" && styles2[`color${capitalize(ownerState.color)}`]];
  }
})(memoTheme(({
  theme
}) => ({
  color: (theme.vars || theme).palette.text.secondary,
  variants: [{
    props: {
      color: "default",
      disableRipple: false
    },
    style: {
      "&:hover": {
        backgroundColor: theme.alpha((theme.vars || theme).palette.action.active, (theme.vars || theme).palette.action.hoverOpacity)
      }
    }
  }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
    props: {
      color,
      disableRipple: false
    },
    style: {
      "&:hover": {
        backgroundColor: theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.hoverOpacity)
      }
    }
  })), ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
    props: {
      color
    },
    style: {
      [`&.${checkboxClasses.checked}, &.${checkboxClasses.indeterminate}`]: {
        color: (theme.vars || theme).palette[color].main
      },
      [`&.${checkboxClasses.disabled}`]: {
        color: (theme.vars || theme).palette.action.disabled
      }
    }
  })), {
    // Should be last to override other colors
    props: {
      disableRipple: false
    },
    style: {
      // Reset on touch devices, it doesn't add specificity
      "&:hover": {
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      }
    }
  }]
})));
const defaultCheckedIcon$1 = /* @__PURE__ */ jsx(CheckBoxIcon, {});
const defaultIcon$1 = /* @__PURE__ */ jsx(CheckBoxOutlineBlankIcon, {});
const defaultIndeterminateIcon = /* @__PURE__ */ jsx(IndeterminateCheckBoxIcon, {});
const Checkbox = /* @__PURE__ */ React.forwardRef(function Checkbox2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiCheckbox"
  });
  const {
    checkedIcon = defaultCheckedIcon$1,
    color = "primary",
    icon: iconProp = defaultIcon$1,
    indeterminate = false,
    indeterminateIcon: indeterminateIconProp = defaultIndeterminateIcon,
    size = "medium",
    disableRipple = false,
    className,
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const icon = indeterminate ? indeterminateIconProp : iconProp;
  const indeterminateIcon = indeterminate ? indeterminateIconProp : checkedIcon;
  const ownerState = {
    ...props,
    disableRipple,
    color,
    indeterminate,
    size
  };
  const classes = useUtilityClasses$A(ownerState);
  const externalInputProps = slotProps.input;
  const [RootSlot, rootSlotProps] = useSlot("root", {
    ref,
    elementType: CheckboxRoot,
    className: clsx(classes.root, className),
    shouldForwardComponentProp: true,
    externalForwardedProps: {
      slots,
      slotProps,
      ...other
    },
    ownerState,
    additionalProps: {
      type: "checkbox",
      icon: /* @__PURE__ */ React.cloneElement(icon, {
        fontSize: icon.props.fontSize ?? size
      }),
      checkedIcon: /* @__PURE__ */ React.cloneElement(indeterminateIcon, {
        fontSize: indeterminateIcon.props.fontSize ?? size
      }),
      disableRipple,
      slots,
      slotProps: {
        input: mergeSlotProps(typeof externalInputProps === "function" ? externalInputProps(ownerState) : externalInputProps, {
          "data-indeterminate": indeterminate,
          "aria-checked": indeterminate ? "mixed" : void 0
        })
      }
    }
  });
  return /* @__PURE__ */ jsx(RootSlot, {
    ...rootSlotProps,
    classes
  });
});
process.env.NODE_ENV !== "production" ? Checkbox.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * The icon to display when the component is checked.
   * @default <CheckBoxIcon />
   */
  checkedIcon: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes.oneOfType([PropTypes.oneOf(["default", "primary", "secondary", "error", "info", "success", "warning"]), PropTypes.string]),
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * The icon to display when the component is unchecked.
   * @default <CheckBoxOutlineBlankIcon />
   */
  icon: PropTypes.node,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * If `true`, the component appears indeterminate.
   * This does not set the native input element to indeterminate due
   * to inconsistent behavior across browsers.
   * However, we set a `data-indeterminate` attribute on the `input`.
   * @default false
   */
  indeterminate: PropTypes.bool,
  /**
   * The icon to display when the component is indeterminate.
   * @default <IndeterminateCheckBoxIcon />
   */
  indeterminateIcon: PropTypes.node,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * If `true`, the `input` element is required.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * The size of the component.
   * `small` is equivalent to the dense checkbox styling.
   * @default 'medium'
   */
  size: PropTypes.oneOfType([PropTypes.oneOf(["medium", "small"]), PropTypes.string]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    input: PropTypes.elementType,
    root: PropTypes.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value: PropTypes.any
} : void 0;
const Container = createContainer({
  createStyledComponent: styled("div", {
    name: "MuiContainer",
    slot: "Root",
    overridesResolver: (props, styles2) => {
      const {
        ownerState
      } = props;
      return [styles2.root, styles2[`maxWidth${capitalize(String(ownerState.maxWidth))}`], ownerState.fixed && styles2.fixed, ownerState.disableGutters && styles2.disableGutters];
    }
  }),
  useThemeProps: (inProps) => useDefaultProps({
    props: inProps,
    name: "MuiContainer"
  })
});
process.env.NODE_ENV !== "production" ? Container.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * Set the max-width to match the min-width of the current breakpoint.
   * This is useful if you'd prefer to design for a fixed set of sizes
   * instead of trying to accommodate a fully fluid viewport.
   * It's fluid by default.
   * @default false
   */
  fixed: PropTypes.bool,
  /**
   * Determine the max-width of the container.
   * The container width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   * @default 'lg'
   */
  maxWidth: PropTypes.oneOfType([PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", false]), PropTypes.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
function isOverflowing(container) {
  const doc = ownerDocument(container);
  if (doc.body === container) {
    return ownerWindow(container).innerWidth > doc.documentElement.clientWidth;
  }
  return container.scrollHeight > container.clientHeight;
}
function ariaHidden(element, hide) {
  if (hide) {
    element.setAttribute("aria-hidden", "true");
  } else {
    element.removeAttribute("aria-hidden");
  }
}
function getPaddingRight(element) {
  return parseFloat(ownerWindow(element).getComputedStyle(element).paddingRight) || 0;
}
function isAriaHiddenForbiddenOnElement(element) {
  const forbiddenTagNames = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"];
  const isForbiddenTagName = forbiddenTagNames.includes(element.tagName);
  const isInputHidden = element.tagName === "INPUT" && element.getAttribute("type") === "hidden";
  return isForbiddenTagName || isInputHidden;
}
function ariaHiddenSiblings(container, mountElement, currentElement, elementsToExclude, hide) {
  const blacklist = [mountElement, currentElement, ...elementsToExclude];
  [].forEach.call(container.children, (element) => {
    const isNotExcludedElement = !blacklist.includes(element);
    const isNotForbiddenElement = !isAriaHiddenForbiddenOnElement(element);
    if (isNotExcludedElement && isNotForbiddenElement) {
      ariaHidden(element, hide);
    }
  });
}
function findIndexOf(items2, callback) {
  let idx = -1;
  items2.some((item, index) => {
    if (callback(item)) {
      idx = index;
      return true;
    }
    return false;
  });
  return idx;
}
function handleContainer(containerInfo, props) {
  const restoreStyle = [];
  const container = containerInfo.container;
  if (!props.disableScrollLock) {
    if (isOverflowing(container)) {
      const scrollbarSize = getScrollbarSize(ownerWindow(container));
      restoreStyle.push({
        value: container.style.paddingRight,
        property: "padding-right",
        el: container
      });
      container.style.paddingRight = `${getPaddingRight(container) + scrollbarSize}px`;
      const fixedElements = ownerDocument(container).querySelectorAll(".mui-fixed");
      [].forEach.call(fixedElements, (element) => {
        restoreStyle.push({
          value: element.style.paddingRight,
          property: "padding-right",
          el: element
        });
        element.style.paddingRight = `${getPaddingRight(element) + scrollbarSize}px`;
      });
    }
    let scrollContainer;
    if (container.parentNode instanceof DocumentFragment) {
      scrollContainer = ownerDocument(container).body;
    } else {
      const parent = container.parentElement;
      const containerWindow = ownerWindow(container);
      scrollContainer = parent?.nodeName === "HTML" && containerWindow.getComputedStyle(parent).overflowY === "scroll" ? parent : container;
    }
    restoreStyle.push({
      value: scrollContainer.style.overflow,
      property: "overflow",
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowX,
      property: "overflow-x",
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowY,
      property: "overflow-y",
      el: scrollContainer
    });
    scrollContainer.style.overflow = "hidden";
  }
  const restore = () => {
    restoreStyle.forEach(({
      value,
      el,
      property
    }) => {
      if (value) {
        el.style.setProperty(property, value);
      } else {
        el.style.removeProperty(property);
      }
    });
  };
  return restore;
}
function getHiddenSiblings(container) {
  const hiddenSiblings = [];
  [].forEach.call(container.children, (element) => {
    if (element.getAttribute("aria-hidden") === "true") {
      hiddenSiblings.push(element);
    }
  });
  return hiddenSiblings;
}
class ModalManager {
  constructor() {
    this.modals = [];
    this.containers = [];
  }
  add(modal, container) {
    let modalIndex = this.modals.indexOf(modal);
    if (modalIndex !== -1) {
      return modalIndex;
    }
    modalIndex = this.modals.length;
    this.modals.push(modal);
    if (modal.modalRef) {
      ariaHidden(modal.modalRef, false);
    }
    const hiddenSiblings = getHiddenSiblings(container);
    ariaHiddenSiblings(container, modal.mount, modal.modalRef, hiddenSiblings, true);
    const containerIndex = findIndexOf(this.containers, (item) => item.container === container);
    if (containerIndex !== -1) {
      this.containers[containerIndex].modals.push(modal);
      return modalIndex;
    }
    this.containers.push({
      modals: [modal],
      container,
      restore: null,
      hiddenSiblings
    });
    return modalIndex;
  }
  mount(modal, props) {
    const containerIndex = findIndexOf(this.containers, (item) => item.modals.includes(modal));
    const containerInfo = this.containers[containerIndex];
    if (!containerInfo.restore) {
      containerInfo.restore = handleContainer(containerInfo, props);
    }
  }
  remove(modal, ariaHiddenState = true) {
    const modalIndex = this.modals.indexOf(modal);
    if (modalIndex === -1) {
      return modalIndex;
    }
    const containerIndex = findIndexOf(this.containers, (item) => item.modals.includes(modal));
    const containerInfo = this.containers[containerIndex];
    containerInfo.modals.splice(containerInfo.modals.indexOf(modal), 1);
    this.modals.splice(modalIndex, 1);
    if (containerInfo.modals.length === 0) {
      if (containerInfo.restore) {
        containerInfo.restore();
      }
      if (modal.modalRef) {
        ariaHidden(modal.modalRef, ariaHiddenState);
      }
      ariaHiddenSiblings(containerInfo.container, modal.mount, modal.modalRef, containerInfo.hiddenSiblings, false);
      this.containers.splice(containerIndex, 1);
    } else {
      const nextTop = containerInfo.modals[containerInfo.modals.length - 1];
      if (nextTop.modalRef) {
        ariaHidden(nextTop.modalRef, false);
      }
    }
    return modalIndex;
  }
  isTopModal(modal) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === modal;
  }
}
const FOCUSABLE_ATTRIBUTE = "data-mui-focusable";
function getFocusTarget(rootElement) {
  if (!rootElement) {
    return null;
  }
  return rootElement.hasAttribute(FOCUSABLE_ATTRIBUTE) ? rootElement : rootElement.querySelector(`[${FOCUSABLE_ATTRIBUTE}]`);
}
const candidatesSelector = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function getTabIndex(node) {
  const tabindexAttr = parseInt(node.getAttribute("tabindex") || "", 10);
  if (!Number.isNaN(tabindexAttr)) {
    return tabindexAttr;
  }
  if (node.contentEditable === "true" || (node.nodeName === "AUDIO" || node.nodeName === "VIDEO" || node.nodeName === "DETAILS") && node.getAttribute("tabindex") === null) {
    return 0;
  }
  return node.tabIndex;
}
function isNonTabbableRadio(node) {
  if (node.tagName !== "INPUT" || node.type !== "radio") {
    return false;
  }
  if (!node.name) {
    return false;
  }
  const getRadio = (selector) => node.ownerDocument.querySelector(`input[type="radio"]${selector}`);
  let roving = getRadio(`[name="${node.name}"]:checked`);
  if (!roving) {
    roving = getRadio(`[name="${node.name}"]`);
  }
  return roving !== node;
}
function isNodeMatchingSelectorFocusable(node) {
  if (node.disabled || node.tagName === "INPUT" && node.type === "hidden" || isNonTabbableRadio(node)) {
    return false;
  }
  return true;
}
function defaultGetTabbable(root2) {
  const regularTabNodes = [];
  const orderedTabNodes = [];
  Array.from(root2.querySelectorAll(candidatesSelector)).forEach((node, i) => {
    const nodeTabIndex = getTabIndex(node);
    if (nodeTabIndex === -1 || !isNodeMatchingSelectorFocusable(node)) {
      return;
    }
    if (nodeTabIndex === 0) {
      regularTabNodes.push(node);
    } else {
      orderedTabNodes.push({
        documentOrder: i,
        tabIndex: nodeTabIndex,
        node
      });
    }
  });
  return orderedTabNodes.sort((a, b) => a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex).map((a) => a.node).concat(regularTabNodes);
}
function defaultIsEnabled() {
  return true;
}
function FocusTrap(props) {
  const {
    children,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableRestoreFocus = false,
    getTabbable = defaultGetTabbable,
    isEnabled = defaultIsEnabled,
    open
  } = props;
  const ignoreNextEnforceFocus = React.useRef(false);
  const sentinelStart = React.useRef(null);
  const sentinelEnd = React.useRef(null);
  const nodeToRestore = React.useRef(null);
  const reactFocusEventTarget = React.useRef(null);
  const activated = React.useRef(false);
  const rootRef = React.useRef(null);
  const handleRef = useForkRef(getReactElementRef(children), rootRef);
  const lastKeydown = React.useRef(null);
  React.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    activated.current = !disableAutoFocus;
  }, [disableAutoFocus, open]);
  React.useEffect(() => {
    ignoreNextEnforceFocus.current = false;
    if (!open || !rootRef.current) {
      return;
    }
    const doc = ownerDocument(rootRef.current);
    const activeElement = getActiveElement(doc);
    const focusTarget = getFocusTarget(rootRef.current) ?? rootRef.current;
    if (!contains(rootRef.current, activeElement)) {
      if (!focusTarget.hasAttribute("tabIndex")) {
        if (process.env.NODE_ENV !== "production") {
          console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join("\n"));
        }
        focusTarget.setAttribute("tabIndex", "-1");
      }
      if (activated.current) {
        focusTarget.focus();
      }
    }
    return () => {
      if (!disableRestoreFocus && nodeToRestore.current) {
        ignoreNextEnforceFocus.current = true;
        nodeToRestore.current.focus();
        nodeToRestore.current = null;
      }
    };
  }, [open]);
  React.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    const doc = ownerDocument(rootRef.current);
    const loopFocus = (nativeEvent) => {
      lastKeydown.current = nativeEvent;
      if (disableEnforceFocus || !isEnabled() || nativeEvent.key !== "Tab") {
        return;
      }
      const rootElement = rootRef.current;
      const activeElement = getActiveElement(doc);
      if (rootElement === null) {
        return;
      }
      const focusTarget = getFocusTarget(rootElement);
      const isFocusStart = activeElement === rootElement || activeElement === focusTarget;
      if (isFocusStart) {
        const tabbable = getTabbable(rootElement);
        if (tabbable.length === 0) {
          return;
        }
        nativeEvent.preventDefault();
        if (nativeEvent.shiftKey) {
          tabbable[tabbable.length - 1].focus();
        } else {
          tabbable[0].focus();
        }
        return;
      }
      if (contains(rootElement, activeElement)) {
        const tabbable = getTabbable(rootElement);
        const currentIndex = tabbable.indexOf(activeElement);
        if (currentIndex === -1) {
          return;
        }
        const hasPositiveTabIndex = tabbable.some((node) => getTabIndex(node) > 0);
        if (!hasPositiveTabIndex) {
          return;
        }
        nativeEvent.preventDefault();
        let nextIndex = 0;
        if (nativeEvent.shiftKey) {
          nextIndex = currentIndex <= 0 ? tabbable.length - 1 : currentIndex - 1;
        } else {
          nextIndex = currentIndex === tabbable.length - 1 ? 0 : currentIndex + 1;
        }
        tabbable[nextIndex].focus();
      }
    };
    const contain = () => {
      const rootElement = rootRef.current;
      if (rootElement === null) {
        return;
      }
      const activeEl = getActiveElement(doc);
      if (!doc.hasFocus() || !isEnabled() || ignoreNextEnforceFocus.current) {
        ignoreNextEnforceFocus.current = false;
        return;
      }
      if (contains(rootElement, activeEl)) {
        return;
      }
      if (disableEnforceFocus && activeEl !== sentinelStart.current && activeEl !== sentinelEnd.current) {
        return;
      }
      if (activeEl !== reactFocusEventTarget.current) {
        reactFocusEventTarget.current = null;
      } else if (reactFocusEventTarget.current !== null) {
        return;
      }
      if (!activated.current) {
        return;
      }
      let tabbable = [];
      if (activeEl === sentinelStart.current || activeEl === sentinelEnd.current) {
        tabbable = getTabbable(rootRef.current);
      }
      if (tabbable.length > 0) {
        const isShiftTab = Boolean(lastKeydown.current?.shiftKey && lastKeydown.current?.key === "Tab");
        const focusNext = tabbable[0];
        const focusPrevious = tabbable[tabbable.length - 1];
        if (typeof focusNext !== "string" && typeof focusPrevious !== "string") {
          if (isShiftTab) {
            focusPrevious.focus();
          } else {
            focusNext.focus();
          }
        }
      } else {
        rootElement.focus();
      }
    };
    doc.addEventListener("focusin", contain);
    doc.addEventListener("keydown", loopFocus, true);
    const interval = setInterval(() => {
      const activeEl = getActiveElement(doc);
      if (activeEl && activeEl.tagName === "BODY") {
        contain();
      }
    }, 50);
    return () => {
      clearInterval(interval);
      doc.removeEventListener("focusin", contain);
      doc.removeEventListener("keydown", loopFocus, true);
    };
  }, [disableAutoFocus, disableEnforceFocus, disableRestoreFocus, isEnabled, open, getTabbable]);
  const onFocus = (event) => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }
    activated.current = true;
    reactFocusEventTarget.current = event.target;
    const childrenPropsHandler = children.props.onFocus;
    if (childrenPropsHandler) {
      childrenPropsHandler(event);
    }
  };
  const handleFocusSentinel = (event) => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }
    activated.current = true;
  };
  return /* @__PURE__ */ jsxs(React.Fragment, {
    children: [/* @__PURE__ */ jsx("div", {
      tabIndex: open ? 0 : -1,
      onFocus: handleFocusSentinel,
      ref: sentinelStart,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ React.cloneElement(children, {
      ref: handleRef,
      onFocus
    }), /* @__PURE__ */ jsx("div", {
      tabIndex: open ? 0 : -1,
      onFocus: handleFocusSentinel,
      ref: sentinelEnd,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" ? FocusTrap.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: elementAcceptingRef,
  /**
   * If `true`, the focus trap will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any focus trap children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: PropTypes.bool,
  /**
   * If `true`, the focus trap will not prevent focus from leaving the focus trap while open.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: PropTypes.bool,
  /**
   * If `true`, the focus trap will not restore focus to previously focused element once
   * focus trap is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: PropTypes.bool,
  /**
   * Returns an array of ordered tabbable nodes (i.e. in tab order) within the root.
   * For instance, you can provide the "tabbable" npm dependency.
   * @param {HTMLElement} root
   */
  getTabbable: PropTypes.func,
  /**
   * This prop extends the `open` prop.
   * It allows to toggle the open state without having to wait for a rerender when changing the `open` prop.
   * This prop should be memoized.
   * It can be used to support multiple focus trap mounted at the same time.
   * @default function defaultIsEnabled(): boolean {
   *   return true;
   * }
   */
  isEnabled: PropTypes.func,
  /**
   * If `true`, focus is locked.
   */
  open: PropTypes.bool.isRequired
} : void 0;
if (process.env.NODE_ENV !== "production") {
  FocusTrap["propTypes"] = exactProp(FocusTrap.propTypes);
}
function getContainer(container) {
  return typeof container === "function" ? container() : container;
}
function getHasTransition(children) {
  return children ? children.props.hasOwnProperty("in") : false;
}
const noop = () => {
};
const manager = new ModalManager();
function useModal(parameters) {
  const {
    container,
    disableScrollLock = false,
    closeAfterTransition = false,
    onTransitionEnter,
    onTransitionExited,
    children,
    onClose,
    open,
    rootRef
  } = parameters;
  const modal = React.useRef({});
  const mountNodeRef = React.useRef(null);
  const modalRef = React.useRef(null);
  const handleRef = useForkRef(modalRef, rootRef);
  const [exited, setExited] = React.useState(!open);
  const hasTransition = getHasTransition(children);
  let ariaHiddenProp = true;
  if (parameters["aria-hidden"] === "false" || parameters["aria-hidden"] === false) {
    ariaHiddenProp = false;
  }
  const getDoc = () => ownerDocument(mountNodeRef.current);
  const getModal = () => {
    modal.current.modalRef = modalRef.current;
    modal.current.mount = mountNodeRef.current;
    return modal.current;
  };
  const handleMounted = () => {
    manager.mount(getModal(), {
      disableScrollLock
    });
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  };
  const handleOpen = useEventCallback(() => {
    const resolvedContainer = getContainer(container) || getDoc().body;
    manager.add(getModal(), resolvedContainer);
    if (modalRef.current) {
      handleMounted();
    }
  });
  const isTopModal = () => manager.isTopModal(getModal());
  const handlePortalRef = useEventCallback((node) => {
    mountNodeRef.current = node;
    if (!node) {
      return;
    }
    if (open && isTopModal()) {
      handleMounted();
    } else if (modalRef.current) {
      ariaHidden(modalRef.current, ariaHiddenProp);
    }
  });
  const handleClose = React.useCallback(() => {
    manager.remove(getModal(), ariaHiddenProp);
  }, [ariaHiddenProp]);
  React.useEffect(() => {
    return () => {
      handleClose();
    };
  }, [handleClose]);
  React.useEffect(() => {
    if (open) {
      handleOpen();
    } else if (!hasTransition || !closeAfterTransition) {
      handleClose();
    }
  }, [open, handleClose, hasTransition, closeAfterTransition, handleOpen]);
  const createHandleKeyDown = (otherHandlers) => (event) => {
    otherHandlers.onKeyDown?.(event);
    if (event.key !== "Escape" || event.which === 229 || // Wait until IME is settled.
    !isTopModal()) {
      return;
    }
    event.stopPropagation();
    if (onClose) {
      onClose(event, "escapeKeyDown");
    }
  };
  const createHandleBackdropClick = (otherHandlers) => (event) => {
    otherHandlers.onClick?.(event);
    if (event.target !== event.currentTarget) {
      return;
    }
    if (onClose) {
      onClose(event, "backdropClick");
    }
  };
  const getRootProps = (otherHandlers = {}) => {
    const propsEventHandlers = extractEventHandlers(parameters);
    delete propsEventHandlers.onTransitionEnter;
    delete propsEventHandlers.onTransitionExited;
    const externalEventHandlers = {
      ...propsEventHandlers,
      ...otherHandlers
    };
    return {
      /*
       * Marking an element with the role presentation indicates to assistive technology
       * that this element should be ignored; it exists to support the web application and
       * is not meant for humans to interact with directly.
       * https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
       */
      role: "presentation",
      ...externalEventHandlers,
      onKeyDown: createHandleKeyDown(externalEventHandlers),
      ref: handleRef
    };
  };
  const getBackdropProps = (otherHandlers = {}) => {
    const externalEventHandlers = otherHandlers;
    return {
      "aria-hidden": true,
      ...externalEventHandlers,
      onClick: createHandleBackdropClick(externalEventHandlers),
      open
    };
  };
  const getTransitionProps2 = () => {
    const handleEnter = () => {
      setExited(false);
      if (onTransitionEnter) {
        onTransitionEnter();
      }
    };
    const handleExited = () => {
      setExited(true);
      if (onTransitionExited) {
        onTransitionExited();
      }
      if (closeAfterTransition) {
        handleClose();
      }
    };
    return {
      onEnter: createChainedFunction(handleEnter, children?.props.onEnter ?? noop),
      onExited: createChainedFunction(handleExited, children?.props.onExited ?? noop)
    };
  };
  return {
    getRootProps,
    getBackdropProps,
    getTransitionProps: getTransitionProps2,
    rootRef: handleRef,
    portalRef: handlePortalRef,
    isTopModal,
    exited,
    hasTransition
  };
}
function getModalUtilityClass(slot) {
  return generateUtilityClass("MuiModal", slot);
}
generateUtilityClasses("MuiModal", ["root", "hidden", "backdrop"]);
const useUtilityClasses$z = (ownerState) => {
  const {
    open,
    exited,
    classes
  } = ownerState;
  const slots = {
    root: ["root", !open && exited && "hidden"],
    backdrop: ["backdrop"]
  };
  return composeClasses(slots, getModalUtilityClass, classes);
};
const ModalRoot = styled("div", {
  name: "MuiModal",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, !ownerState.open && ownerState.exited && styles2.hidden];
  }
})(memoTheme(({
  theme
}) => ({
  position: "fixed",
  zIndex: (theme.vars || theme).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  variants: [{
    props: ({
      ownerState
    }) => !ownerState.open && ownerState.exited,
    style: {
      visibility: "hidden"
    }
  }]
})));
const ModalBackdrop = styled(Backdrop, {
  name: "MuiModal",
  slot: "Backdrop"
})({
  zIndex: -1
});
const Modal = /* @__PURE__ */ React.forwardRef(function Modal2(inProps, ref) {
  const props = useDefaultProps({
    name: "MuiModal",
    props: inProps
  });
  const {
    classes: classesProp,
    className,
    closeAfterTransition = false,
    children,
    container,
    component,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disablePortal = false,
    disableRestoreFocus = false,
    disableScrollLock = false,
    hideBackdrop = false,
    keepMounted = false,
    onClose,
    onTransitionEnter,
    onTransitionExited,
    open,
    slotProps = {},
    slots = {},
    // eslint-disable-next-line react/prop-types
    theme,
    ...other
  } = props;
  const propsWithDefaults = {
    ...props,
    closeAfterTransition,
    disableAutoFocus,
    disableEnforceFocus,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    hideBackdrop,
    keepMounted
  };
  const {
    getRootProps,
    getBackdropProps,
    getTransitionProps: getTransitionProps2,
    portalRef,
    isTopModal,
    exited,
    hasTransition
  } = useModal({
    ...propsWithDefaults,
    rootRef: ref
  });
  const ownerState = {
    ...propsWithDefaults,
    exited
  };
  const classes = useUtilityClasses$z(ownerState);
  const childProps = {};
  if (children.props.tabIndex === void 0) {
    childProps.tabIndex = "-1";
  }
  if (hasTransition) {
    const {
      onEnter,
      onExited
    } = getTransitionProps2();
    childProps.onEnter = onEnter;
    childProps.onExited = onExited;
  }
  const externalForwardedProps = {
    slots,
    slotProps
  };
  const [RootSlot, rootProps] = useSlot("root", {
    ref,
    elementType: ModalRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other,
      component
    },
    getSlotProps: getRootProps,
    ownerState,
    className: clsx(className, classes?.root, !ownerState.open && ownerState.exited && classes?.hidden)
  });
  const [BackdropSlot, backdropProps] = useSlot("backdrop", {
    elementType: ModalBackdrop,
    externalForwardedProps,
    shouldForwardComponentProp: true,
    getSlotProps: (otherHandlers) => {
      return getBackdropProps({
        ...otherHandlers,
        onClick: (event) => {
          if (otherHandlers?.onClick) {
            otherHandlers.onClick(event);
          }
        }
      });
    },
    className: classes?.backdrop,
    ownerState
  });
  if (!keepMounted && !open && (!hasTransition || exited)) {
    return null;
  }
  return /* @__PURE__ */ jsx(Portal, {
    ref: portalRef,
    container,
    disablePortal,
    children: /* @__PURE__ */ jsxs(RootSlot, {
      ...rootProps,
      children: [!hideBackdrop ? /* @__PURE__ */ jsx(BackdropSlot, {
        ...backdropProps
      }) : null, /* @__PURE__ */ jsx(FocusTrap, {
        disableEnforceFocus,
        disableAutoFocus,
        disableRestoreFocus,
        isEnabled: isTopModal,
        open,
        children: /* @__PURE__ */ React.cloneElement(children, childProps)
      })]
    })
  });
});
process.env.NODE_ENV !== "production" ? Modal.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: elementAcceptingRef.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */
  closeAfterTransition: PropTypes.bool,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes.oneOfType([HTMLElementType, PropTypes.func]),
  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: PropTypes.bool,
  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: PropTypes.bool,
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: PropTypes.bool,
  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: PropTypes.bool,
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: PropTypes.bool,
  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: PropTypes.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   * @default false
   */
  keepMounted: PropTypes.bool,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: PropTypes.func,
  /**
   * A function called when a transition enters.
   */
  onTransitionEnter: PropTypes.func,
  /**
   * A function called when a transition has exited.
   */
  onTransitionExited: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,
  /**
   * The props used for each slot inside the Modal.
   * @default {}
   */
  slotProps: PropTypes.shape({
    backdrop: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside the Modal.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    backdrop: PropTypes.elementType,
    root: PropTypes.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
function getDialogUtilityClass(slot) {
  return generateUtilityClass("MuiDialog", slot);
}
generateUtilityClasses("MuiDialog", ["root", "backdrop", "scrollPaper", "scrollBody", "container", "paper", "paperWidthFalse", "paperWidthXs", "paperWidthSm", "paperWidthMd", "paperWidthLg", "paperWidthXl", "paperFullWidth", "paperFullScreen"]);
const DialogContext = /* @__PURE__ */ React.createContext({});
if (process.env.NODE_ENV !== "production") {
  DialogContext.displayName = "DialogContext";
}
const DialogBackdrop = styled(Backdrop, {
  name: "MuiDialog",
  slot: "Backdrop"
})({
  // Improve scrollable dialog support.
  zIndex: -1
});
const useUtilityClasses$y = (ownerState) => {
  const {
    classes,
    scroll,
    maxWidth,
    fullWidth,
    fullScreen
  } = ownerState;
  const slots = {
    root: ["root"],
    backdrop: ["backdrop"],
    container: ["container", `scroll${capitalize(scroll)}`],
    paper: ["paper", `paperWidth${capitalize(String(maxWidth))}`, fullWidth && "paperFullWidth", fullScreen && "paperFullScreen"]
  };
  return composeClasses(slots, getDialogUtilityClass, classes);
};
const DialogRoot = styled(Modal, {
  name: "MuiDialog",
  slot: "Root"
})({
  "@media print": {
    // Use !important to override the Modal inline-style.
    position: "absolute !important"
  }
});
const DialogContainer = styled("div", {
  name: "MuiDialog",
  slot: "Container",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.container, styles2[`scroll${capitalize(ownerState.scroll)}`]];
  }
})({
  height: "100%",
  "@media print": {
    height: "auto"
  },
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
  variants: [{
    props: {
      scroll: "paper"
    },
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  }, {
    props: {
      scroll: "body"
    },
    style: {
      overflowY: "auto",
      overflowX: "hidden",
      textAlign: "center",
      "&::after": {
        content: '""',
        display: "inline-block",
        verticalAlign: "middle",
        height: "100%",
        width: "0"
      }
    }
  }]
});
const DialogPaper = styled(Paper, {
  name: "MuiDialog",
  slot: "Paper",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.paper, styles2[`paperWidth${capitalize(String(ownerState.maxWidth))}`], ownerState.fullWidth && styles2.paperFullWidth, ownerState.fullScreen && styles2.paperFullScreen];
  }
})(memoTheme(({
  theme
}) => ({
  margin: 32,
  position: "relative",
  overflowY: "auto",
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
  "@media print": {
    overflowY: "visible",
    boxShadow: "none"
  },
  variants: [{
    props: {
      scroll: "paper"
    },
    style: {
      display: "flex",
      flexDirection: "column",
      maxHeight: "calc(100% - 64px)"
    }
  }, {
    props: {
      scroll: "body"
    },
    style: {
      display: "inline-block",
      verticalAlign: "middle",
      textAlign: "initial"
    }
  }, {
    props: ({
      ownerState
    }) => !ownerState.maxWidth,
    style: {
      maxWidth: "calc(100% - 64px)"
    }
  }, {
    props: {
      maxWidth: "xs"
    },
    style: {
      maxWidth: theme.breakpoints.unit === "px" ? Math.max(theme.breakpoints.values.xs, 444) : `max(${theme.breakpoints.values.xs}${theme.breakpoints.unit}, 444px)`
    }
  }, {
    props: {
      maxWidth: "xs",
      scroll: "body"
    },
    style: {
      [theme.breakpoints.down(Math.max(theme.breakpoints.values.xs, 444) + 32 * 2)]: {
        maxWidth: "calc(100% - 64px)"
      }
    }
  }, ...Object.keys(theme.breakpoints.values).filter((maxWidth) => maxWidth !== "xs").map((maxWidth) => ({
    props: {
      maxWidth
    },
    style: {
      maxWidth: `${theme.breakpoints.values[maxWidth]}${theme.breakpoints.unit}`
    }
  })), ...Object.keys(theme.breakpoints.values).filter((maxWidth) => maxWidth !== "xs").map((maxWidth) => ({
    props: {
      maxWidth,
      scroll: "body"
    },
    style: {
      [theme.breakpoints.down(theme.breakpoints.values[maxWidth] + 32 * 2)]: {
        maxWidth: "calc(100% - 64px)"
      }
    }
  })), {
    props: ({
      ownerState
    }) => ownerState.fullWidth,
    style: {
      width: "calc(100% - 64px)"
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.fullScreen,
    style: {
      margin: 0,
      width: "100%",
      maxWidth: "100%",
      height: "100%",
      maxHeight: "none",
      borderRadius: 0
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.fullScreen && ownerState.scroll === "body",
    style: {
      margin: 0,
      maxWidth: "100%"
    }
  }]
})));
const Dialog = /* @__PURE__ */ React.forwardRef(function Dialog2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiDialog"
  });
  const theme = useTheme();
  const defaultTransitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };
  const {
    "aria-describedby": ariaDescribedby,
    "aria-labelledby": ariaLabelledbyProp,
    "aria-modal": ariaModal = true,
    children,
    className,
    fullScreen = false,
    fullWidth = false,
    maxWidth = "sm",
    onClick,
    onClose,
    open,
    PaperComponent = Paper,
    role = "dialog",
    scroll = "paper",
    slots = {},
    slotProps = {},
    transitionDuration = defaultTransitionDuration,
    ...other
  } = props;
  const ownerState = {
    ...props,
    fullScreen,
    fullWidth,
    maxWidth,
    scroll
  };
  const classes = useUtilityClasses$y(ownerState);
  const backdropClick = React.useRef();
  const handleMouseDown = (event) => {
    backdropClick.current = event.target === event.currentTarget;
  };
  const handleBackdropClick = (event) => {
    if (onClick) {
      onClick(event);
    }
    if (!backdropClick.current) {
      return;
    }
    backdropClick.current = null;
    if (onClose) {
      onClose(event, "backdropClick");
    }
  };
  const ariaLabelledby = useId(ariaLabelledbyProp);
  const dialogContextValue = React.useMemo(() => {
    return {
      titleId: ariaLabelledby
    };
  }, [ariaLabelledby]);
  const externalForwardedProps = {
    slots,
    slotProps
  };
  const [RootSlot, rootSlotProps] = useSlot("root", {
    elementType: DialogRoot,
    shouldForwardComponentProp: true,
    externalForwardedProps,
    ownerState,
    className: clsx(classes.root, className),
    ref
  });
  const [BackdropSlot, backdropSlotProps] = useSlot("backdrop", {
    elementType: DialogBackdrop,
    shouldForwardComponentProp: true,
    externalForwardedProps,
    ownerState,
    className: classes.backdrop
  });
  const [PaperSlot, paperSlotProps] = useSlot("paper", {
    elementType: DialogPaper,
    shouldForwardComponentProp: true,
    externalForwardedProps,
    ownerState,
    className: classes.paper,
    additionalProps: {
      elevation: 24,
      role,
      "aria-describedby": ariaDescribedby,
      "aria-labelledby": ariaLabelledby,
      "aria-modal": ariaModal,
      tabIndex: -1,
      [FOCUSABLE_ATTRIBUTE]: ""
    }
  });
  const [ContainerSlot, containerSlotProps] = useSlot("container", {
    elementType: DialogContainer,
    externalForwardedProps,
    ownerState,
    className: classes.container
  });
  const [TransitionSlot, transitionSlotProps] = useSlot("transition", {
    elementType: Fade,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      appear: true,
      in: open,
      timeout: transitionDuration,
      role: "presentation"
    }
  });
  return /* @__PURE__ */ jsx(RootSlot, {
    closeAfterTransition: true,
    slots: {
      backdrop: BackdropSlot
    },
    slotProps: {
      backdrop: {
        transitionDuration,
        ...backdropSlotProps
      }
    },
    onClose,
    open,
    onClick: handleBackdropClick,
    ...rootSlotProps,
    ...other,
    children: /* @__PURE__ */ jsx(TransitionSlot, {
      ...transitionSlotProps,
      children: /* @__PURE__ */ jsx(ContainerSlot, {
        onMouseDown: handleMouseDown,
        ...containerSlotProps,
        children: /* @__PURE__ */ jsx(PaperSlot, {
          as: PaperComponent,
          ...paperSlotProps,
          children: /* @__PURE__ */ jsx(DialogContext.Provider, {
            value: dialogContextValue,
            children
          })
        })
      })
    })
  });
});
process.env.NODE_ENV !== "production" ? Dialog.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The id(s) of the element(s) that describe the dialog.
   */
  "aria-describedby": PropTypes.string,
  /**
   * The id(s) of the element(s) that label the dialog.
   */
  "aria-labelledby": PropTypes.string,
  /**
   * Informs assistive technologies that the element is modal.
   * It's added on the element with role="dialog".
   * @default true
   */
  "aria-modal": PropTypes.oneOfType([PropTypes.oneOf(["false", "true"]), PropTypes.bool]),
  /**
   * Dialog children, usually the included sub-components.
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
   * If `true`, the dialog is full-screen.
   * @default false
   */
  fullScreen: PropTypes.bool,
  /**
   * If `true`, the dialog stretches to `maxWidth`.
   *
   * Notice that the dialog width grow is limited by the default margin.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * Determine the max-width of the dialog.
   * The dialog width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   * @default 'sm'
   */
  maxWidth: PropTypes.oneOfType([PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", false]), PropTypes.string]),
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,
  /**
   * The component used to render the body of the dialog.
   * @default Paper
   */
  PaperComponent: PropTypes.elementType,
  /**
   * The ARIA role for the dialog element.
   * The main dialog role is `dialog`, but `alertdialog` can be used if the content of the dialog requires immediate attention.
   * See https://www.w3.org/TR/wai-aria-1.2/#dialog and https://www.w3.org/TR/wai-aria-1.2/#alertdialog for more details.
   * @default 'dialog'
   */
  role: PropTypes.oneOf(["alertdialog", "dialog"]),
  /**
   * Determine the container for scrolling the dialog.
   * @default 'paper'
   */
  scroll: PropTypes.oneOf(["body", "paper"]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    backdrop: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    container: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    paper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    transition: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    backdrop: PropTypes.elementType,
    container: PropTypes.elementType,
    paper: PropTypes.elementType,
    root: PropTypes.elementType,
    transition: PropTypes.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  transitionDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    appear: PropTypes.number,
    enter: PropTypes.number,
    exit: PropTypes.number
  })])
} : void 0;
function getDialogActionsUtilityClass(slot) {
  return generateUtilityClass("MuiDialogActions", slot);
}
generateUtilityClasses("MuiDialogActions", ["root", "spacing"]);
const useUtilityClasses$x = (ownerState) => {
  const {
    classes,
    disableSpacing
  } = ownerState;
  const slots = {
    root: ["root", !disableSpacing && "spacing"]
  };
  return composeClasses(slots, getDialogActionsUtilityClass, classes);
};
const DialogActionsRoot = styled("div", {
  name: "MuiDialogActions",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, !ownerState.disableSpacing && styles2.spacing];
  }
})({
  display: "flex",
  alignItems: "center",
  padding: 8,
  justifyContent: "flex-end",
  flex: "0 0 auto",
  variants: [{
    props: ({
      ownerState
    }) => !ownerState.disableSpacing,
    style: {
      "& > :not(style) ~ :not(style)": {
        marginLeft: 8
      }
    }
  }]
});
const DialogActions = /* @__PURE__ */ React.forwardRef(function DialogActions2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiDialogActions"
  });
  const {
    className,
    disableSpacing = false,
    ...other
  } = props;
  const ownerState = {
    ...props,
    disableSpacing
  };
  const classes = useUtilityClasses$x(ownerState);
  return /* @__PURE__ */ jsx(DialogActionsRoot, {
    className: clsx(classes.root, className),
    ownerState,
    ref,
    ...other
  });
});
process.env.NODE_ENV !== "production" ? DialogActions.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * If `true`, the actions do not have additional margin.
   * @default false
   */
  disableSpacing: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
function getDialogContentUtilityClass(slot) {
  return generateUtilityClass("MuiDialogContent", slot);
}
generateUtilityClasses("MuiDialogContent", ["root", "dividers"]);
function getDialogTitleUtilityClass(slot) {
  return generateUtilityClass("MuiDialogTitle", slot);
}
const dialogTitleClasses = generateUtilityClasses("MuiDialogTitle", ["root"]);
const useUtilityClasses$w = (ownerState) => {
  const {
    classes,
    dividers
  } = ownerState;
  const slots = {
    root: ["root", dividers && "dividers"]
  };
  return composeClasses(slots, getDialogContentUtilityClass, classes);
};
const DialogContentRoot = styled("div", {
  name: "MuiDialogContent",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.dividers && styles2.dividers];
  }
})(memoTheme(({
  theme
}) => ({
  flex: "1 1 auto",
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: "touch",
  overflowY: "auto",
  padding: "20px 24px",
  variants: [{
    props: ({
      ownerState
    }) => ownerState.dividers,
    style: {
      padding: "16px 24px",
      borderTop: `1px solid ${(theme.vars || theme).palette.divider}`,
      borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`
    }
  }, {
    props: ({
      ownerState
    }) => !ownerState.dividers,
    style: {
      [`.${dialogTitleClasses.root} + &`]: {
        paddingTop: 0
      }
    }
  }]
})));
const DialogContent = /* @__PURE__ */ React.forwardRef(function DialogContent2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiDialogContent"
  });
  const {
    className,
    dividers = false,
    ...other
  } = props;
  const ownerState = {
    ...props,
    dividers
  };
  const classes = useUtilityClasses$w(ownerState);
  return /* @__PURE__ */ jsx(DialogContentRoot, {
    className: clsx(classes.root, className),
    ownerState,
    ref,
    ...other
  });
});
process.env.NODE_ENV !== "production" ? DialogContent.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * Display the top and bottom dividers.
   * @default false
   */
  dividers: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
const useUtilityClasses$v = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getDialogTitleUtilityClass, classes);
};
const DialogTitleRoot = styled(Typography, {
  name: "MuiDialogTitle",
  slot: "Root"
})({
  padding: "16px 24px",
  flex: "0 0 auto"
});
const DialogTitle = /* @__PURE__ */ React.forwardRef(function DialogTitle2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiDialogTitle"
  });
  const {
    className,
    id: idProp,
    ...other
  } = props;
  const ownerState = props;
  const classes = useUtilityClasses$v(ownerState);
  const {
    titleId = idProp
  } = React.useContext(DialogContext);
  return /* @__PURE__ */ jsx(DialogTitleRoot, {
    component: "h2",
    className: clsx(classes.root, className),
    ownerState,
    ref,
    variant: "h6",
    id: idProp ?? titleId,
    ...other
  });
});
process.env.NODE_ENV !== "production" ? DialogTitle.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * @ignore
   */
  id: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
function getDividerUtilityClass(slot) {
  return generateUtilityClass("MuiDivider", slot);
}
const dividerClasses = generateUtilityClasses("MuiDivider", ["root", "absolute", "fullWidth", "inset", "middle", "flexItem", "vertical", "withChildren", "textAlignRight", "textAlignLeft", "wrapper", "wrapperVertical"]);
const useUtilityClasses$u = (ownerState) => {
  const {
    absolute,
    children,
    classes,
    flexItem,
    orientation,
    textAlign,
    variant
  } = ownerState;
  const slots = {
    root: ["root", absolute && "absolute", variant, orientation === "vertical" && "vertical", flexItem && "flexItem", children && "withChildren", textAlign === "right" && orientation !== "vertical" && "textAlignRight", textAlign === "left" && orientation !== "vertical" && "textAlignLeft"],
    wrapper: ["wrapper", orientation === "vertical" && "wrapperVertical"]
  };
  return composeClasses(slots, getDividerUtilityClass, classes);
};
const DividerRoot = styled("div", {
  name: "MuiDivider",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.absolute && styles2.absolute, styles2[ownerState.variant], ownerState.orientation === "vertical" && styles2.vertical, ownerState.flexItem && styles2.flexItem, ownerState.children && styles2.withChildren, ownerState.textAlign === "right" && ownerState.orientation !== "vertical" && styles2.textAlignRight, ownerState.textAlign === "left" && ownerState.orientation !== "vertical" && styles2.textAlignLeft];
  }
})(memoTheme(({
  theme
}) => ({
  margin: 0,
  // Reset browser default style.
  flexShrink: 0,
  borderWidth: 0,
  borderStyle: "solid",
  borderColor: (theme.vars || theme).palette.divider,
  borderBottomWidth: "thin",
  variants: [{
    props: {
      absolute: true
    },
    style: {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%"
    }
  }, {
    props: {
      variant: "inset"
    },
    style: {
      marginLeft: 72
    }
  }, {
    props: {
      variant: "middle",
      orientation: "horizontal"
    },
    style: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2)
    }
  }, {
    props: {
      variant: "middle",
      orientation: "vertical"
    },
    style: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  }, {
    props: {
      orientation: "vertical"
    },
    style: {
      height: "100%",
      borderBottomWidth: 0,
      borderRightWidth: "thin"
    }
  }, {
    props: {
      flexItem: true
    },
    style: {
      alignSelf: "stretch",
      height: "auto"
    }
  }, {
    props: ({
      ownerState
    }) => !!ownerState.children,
    style: {
      display: "flex",
      textAlign: "center",
      border: 0,
      borderTopStyle: "solid",
      borderLeftStyle: "solid",
      "&::before, &::after": {
        content: '""',
        alignSelf: "center"
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.children && ownerState.orientation !== "vertical",
    style: {
      "&::before, &::after": {
        width: "100%",
        borderTop: `thin solid ${(theme.vars || theme).palette.divider}`,
        borderTopStyle: "inherit"
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.orientation === "vertical" && ownerState.children,
    style: {
      flexDirection: "column",
      "&::before, &::after": {
        height: "100%",
        borderLeft: `thin solid ${(theme.vars || theme).palette.divider}`,
        borderLeftStyle: "inherit"
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.textAlign === "right" && ownerState.orientation !== "vertical",
    style: {
      "&::before": {
        width: "90%"
      },
      "&::after": {
        width: "10%"
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.textAlign === "left" && ownerState.orientation !== "vertical",
    style: {
      "&::before": {
        width: "10%"
      },
      "&::after": {
        width: "90%"
      }
    }
  }]
})));
const DividerWrapper = styled("span", {
  name: "MuiDivider",
  slot: "Wrapper",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.wrapper, ownerState.orientation === "vertical" && styles2.wrapperVertical];
  }
})(memoTheme(({
  theme
}) => ({
  display: "inline-block",
  paddingLeft: `calc(${theme.spacing(1)} * 1.2)`,
  paddingRight: `calc(${theme.spacing(1)} * 1.2)`,
  whiteSpace: "nowrap",
  variants: [{
    props: {
      orientation: "vertical"
    },
    style: {
      paddingTop: `calc(${theme.spacing(1)} * 1.2)`,
      paddingBottom: `calc(${theme.spacing(1)} * 1.2)`
    }
  }]
})));
const Divider = /* @__PURE__ */ React.forwardRef(function Divider2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiDivider"
  });
  const {
    absolute = false,
    children,
    className,
    orientation = "horizontal",
    component = children || orientation === "vertical" ? "div" : "hr",
    flexItem = false,
    role = component !== "hr" ? "separator" : void 0,
    textAlign = "center",
    variant = "fullWidth",
    ...other
  } = props;
  const ownerState = {
    ...props,
    absolute,
    component,
    flexItem,
    orientation,
    role,
    textAlign,
    variant
  };
  const classes = useUtilityClasses$u(ownerState);
  return /* @__PURE__ */ jsx(DividerRoot, {
    as: component,
    className: clsx(classes.root, className),
    role,
    ref,
    ownerState,
    "aria-orientation": role === "separator" && (component !== "hr" || orientation === "vertical") ? orientation : void 0,
    ...other,
    children: children ? /* @__PURE__ */ jsx(DividerWrapper, {
      className: classes.wrapper,
      ownerState,
      children
    }) : null
  });
});
process.env.NODE_ENV !== "production" ? Divider.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Absolutely position the element.
   * @default false
   */
  absolute: PropTypes.bool,
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, a vertical divider will have the correct height when used in flex container.
   * (By default, a vertical divider will have a calculated height of `0px` if it is the child of a flex container.)
   * @default false
   */
  flexItem: PropTypes.bool,
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  /**
   * @ignore
   */
  role: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The text alignment.
   * @default 'center'
   */
  textAlign: PropTypes.oneOf(["center", "left", "right"]),
  /**
   * The variant to use.
   * @default 'fullWidth'
   */
  variant: PropTypes.oneOfType([PropTypes.oneOf(["fullWidth", "inset", "middle"]), PropTypes.string])
} : void 0;
const useUtilityClasses$t = (ownerState) => {
  const {
    classes,
    disableUnderline,
    startAdornment,
    endAdornment,
    size,
    hiddenLabel,
    multiline
  } = ownerState;
  const slots = {
    root: ["root", !disableUnderline && "underline", startAdornment && "adornedStart", endAdornment && "adornedEnd", size === "small" && `size${capitalize(size)}`, hiddenLabel && "hiddenLabel", multiline && "multiline"],
    input: ["input"]
  };
  const composedClasses = composeClasses(slots, getFilledInputUtilityClass, classes);
  return {
    ...classes,
    // forward classes to the InputBase
    ...composedClasses
  };
};
const FilledInputRoot = styled(InputBaseRoot, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiFilledInput",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [...rootOverridesResolver(props, styles2), !ownerState.disableUnderline && styles2.underline];
  }
})(memoTheme(({
  theme
}) => {
  const light2 = theme.palette.mode === "light";
  const bottomLineColor = light2 ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)";
  const backgroundColor = light2 ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.09)";
  const hoverBackground = light2 ? "rgba(0, 0, 0, 0.09)" : "rgba(255, 255, 255, 0.13)";
  const disabledBackground = light2 ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)";
  return {
    position: "relative",
    backgroundColor: theme.vars ? theme.vars.palette.FilledInput.bg : backgroundColor,
    borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
    borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
    ...getTransitionStyles(theme, "background-color", {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeOut
    }),
    "&:hover": {
      backgroundColor: theme.vars ? theme.vars.palette.FilledInput.hoverBg : hoverBackground,
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: theme.vars ? theme.vars.palette.FilledInput.bg : backgroundColor
      }
    },
    [`&.${filledInputClasses.focused}`]: {
      backgroundColor: theme.vars ? theme.vars.palette.FilledInput.bg : backgroundColor
    },
    [`&.${filledInputClasses.disabled}`]: {
      backgroundColor: theme.vars ? theme.vars.palette.FilledInput.disabledBg : disabledBackground
    },
    variants: [{
      props: ({
        ownerState
      }) => !ownerState.disableUnderline,
      style: {
        "&::after": {
          left: 0,
          bottom: 0,
          content: '""',
          position: "absolute",
          right: 0,
          transform: "scaleX(0)",
          ...getTransitionStyles(theme, "transform", {
            duration: theme.transitions.duration.shorter,
            easing: theme.transitions.easing.easeOut
          }),
          pointerEvents: "none"
          // Transparent to the hover style.
        },
        [`&.${filledInputClasses.focused}:after`]: {
          // translateX(0) is a workaround for Safari transform scale bug
          // See https://github.com/mui/material-ui/issues/31766
          transform: "scaleX(1) translateX(0)"
        },
        [`&.${filledInputClasses.error}`]: {
          "&::before, &::after": {
            borderBottomColor: (theme.vars || theme).palette.error.main
          }
        },
        "&::before": {
          borderBottom: `1px solid ${theme.vars ? theme.alpha(theme.vars.palette.common.onBackground, theme.vars.opacity.inputUnderline) : bottomLineColor}`,
          left: 0,
          bottom: 0,
          content: '""',
          position: "absolute",
          right: 0,
          ...getTransitionStyles(theme, "border-bottom-color", {
            duration: theme.transitions.duration.shorter
          }),
          pointerEvents: "none"
          // Transparent to the hover style.
        },
        [`&:hover:not(.${filledInputClasses.disabled}, .${filledInputClasses.error}):before`]: {
          borderBottom: `1px solid ${(theme.vars || theme).palette.text.primary}`
        },
        [`&.${filledInputClasses.disabled}:before`]: {
          borderBottomStyle: "dotted"
        }
      }
    }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
      props: {
        disableUnderline: false,
        color
      },
      style: {
        "&::after": {
          borderBottom: `2px solid ${(theme.vars || theme).palette[color]?.main}`
        }
      }
    })), {
      props: ({
        ownerState
      }) => ownerState.startAdornment,
      style: {
        paddingLeft: 12
      }
    }, {
      props: ({
        ownerState
      }) => ownerState.endAdornment,
      style: {
        paddingRight: 12
      }
    }, {
      props: ({
        ownerState
      }) => ownerState.multiline,
      style: {
        padding: "25px 12px 8px"
      }
    }, {
      props: ({
        ownerState,
        size
      }) => ownerState.multiline && size === "small",
      style: {
        paddingTop: 21,
        paddingBottom: 4
      }
    }, {
      props: ({
        ownerState
      }) => ownerState.multiline && ownerState.hiddenLabel,
      style: {
        paddingTop: 16,
        paddingBottom: 17
      }
    }, {
      props: ({
        ownerState
      }) => ownerState.multiline && ownerState.hiddenLabel && ownerState.size === "small",
      style: {
        paddingTop: 8,
        paddingBottom: 9
      }
    }]
  };
}));
const FilledInputInput = styled(InputBaseInput, {
  name: "MuiFilledInput",
  slot: "Input",
  overridesResolver: inputOverridesResolver
})(memoTheme(({
  theme
}) => ({
  paddingTop: 25,
  paddingRight: 12,
  paddingBottom: 8,
  paddingLeft: 12,
  "&:-webkit-autofill": {
    ...!theme.vars && {
      WebkitBoxShadow: theme.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
      WebkitTextFillColor: theme.palette.mode === "light" ? null : "#fff",
      caretColor: theme.palette.mode === "light" ? null : "#fff"
    },
    borderTopLeftRadius: "inherit",
    borderTopRightRadius: "inherit",
    ...theme.vars && theme.applyStyles("dark", {
      WebkitBoxShadow: "0 0 0 100px #266798 inset",
      WebkitTextFillColor: "#fff",
      caretColor: "#fff"
    })
  },
  variants: [{
    props: {
      size: "small"
    },
    style: {
      paddingTop: 21,
      paddingBottom: 4
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.hiddenLabel,
    style: {
      paddingTop: 16,
      paddingBottom: 17
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.startAdornment,
    style: {
      paddingLeft: 0
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.endAdornment,
    style: {
      paddingRight: 0
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.hiddenLabel && ownerState.size === "small",
    style: {
      paddingTop: 8,
      paddingBottom: 9
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.multiline,
    style: {
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0
    }
  }]
})));
const FilledInput = /* @__PURE__ */ React.forwardRef(function FilledInput2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiFilledInput"
  });
  const {
    disableUnderline = false,
    fullWidth = false,
    hiddenLabel,
    // declare here to prevent spreading to DOM
    inputComponent = "input",
    multiline = false,
    notched,
    // declare here to prevent spreading to DOM
    slotProps,
    slots = {},
    type = "text",
    ...other
  } = props;
  const ownerState = {
    ...props,
    disableUnderline,
    fullWidth,
    inputComponent,
    multiline,
    type
  };
  const classes = useUtilityClasses$t(props);
  const filledInputComponentsProps = {
    root: {
      ownerState
    },
    input: {
      ownerState
    }
  };
  const componentsProps = slotProps ? deepmerge(filledInputComponentsProps, slotProps) : filledInputComponentsProps;
  const RootSlot = slots.root ?? FilledInputRoot;
  const InputSlot = slots.input ?? FilledInputInput;
  return /* @__PURE__ */ jsx(InputBase, {
    slots: {
      root: RootSlot,
      input: InputSlot
    },
    slotProps: componentsProps,
    fullWidth,
    inputComponent,
    multiline,
    ref,
    type,
    ...other,
    classes
  });
});
process.env.NODE_ENV !== "production" ? FilledInput.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: PropTypes.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: PropTypes.oneOfType([PropTypes.oneOf(["primary", "secondary"]), PropTypes.string]),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the input will not have an underline.
   * @default false
   */
  disableUnderline: PropTypes.bool,
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: PropTypes.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * If `true`, the label is hidden.
   * This is used to increase density for a `FilledInput`.
   * Be sure to add `aria-label` to the `input` element.
   * @default false
   */
  hiddenLabel: PropTypes.bool,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   * @default 'input'
   */
  inputComponent: PropTypes.elementType,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#attributes) applied to the `input` element.
   * @default {}
   */
  inputProps: PropTypes.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: PropTypes.oneOf(["dense", "none"]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * If `true`, a [TextareaAutosize](https://mui.com/material-ui/react-textarea-autosize/) element is rendered.
   * @default false
   */
  multiline: PropTypes.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * @internal
   */
  notched: PropTypes.bool,
  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: PropTypes.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: PropTypes.bool,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: PropTypes.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: PropTypes.shape({
    input: PropTypes.object,
    root: PropTypes.object
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: PropTypes.shape({
    input: PropTypes.elementType,
    root: PropTypes.elementType
  }),
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types).
   * @default 'text'
   */
  type: PropTypes.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: PropTypes.any
} : void 0;
FilledInput.muiName = "Input";
function getFormControlUtilityClasses(slot) {
  return generateUtilityClass("MuiFormControl", slot);
}
generateUtilityClasses("MuiFormControl", ["root", "marginNone", "marginNormal", "marginDense", "fullWidth", "disabled"]);
const useUtilityClasses$s = (ownerState) => {
  const {
    classes,
    margin,
    fullWidth
  } = ownerState;
  const slots = {
    root: ["root", margin !== "none" && `margin${capitalize(margin)}`, fullWidth && "fullWidth"]
  };
  return composeClasses(slots, getFormControlUtilityClasses, classes);
};
const FormControlRoot = styled("div", {
  name: "MuiFormControl",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, styles2[`margin${capitalize(ownerState.margin)}`], ownerState.fullWidth && styles2.fullWidth];
  }
})({
  display: "inline-flex",
  flexDirection: "column",
  position: "relative",
  // Reset fieldset default style.
  minWidth: 0,
  padding: 0,
  margin: 0,
  border: 0,
  verticalAlign: "top",
  // Fix alignment issue on Safari.
  variants: [{
    props: {
      margin: "normal"
    },
    style: {
      marginTop: 16,
      marginBottom: 8
    }
  }, {
    props: {
      margin: "dense"
    },
    style: {
      marginTop: 8,
      marginBottom: 4
    }
  }, {
    props: {
      fullWidth: true
    },
    style: {
      width: "100%"
    }
  }]
});
const FormControl = /* @__PURE__ */ React.forwardRef(function FormControl2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiFormControl"
  });
  const {
    children,
    className,
    color = "primary",
    component = "div",
    disabled = false,
    error = false,
    focused: visuallyFocused,
    fullWidth = false,
    hiddenLabel = false,
    margin = "none",
    required = false,
    size = "medium",
    variant = "outlined",
    ...other
  } = props;
  const ownerState = {
    ...props,
    color,
    component,
    disabled,
    error,
    fullWidth,
    hiddenLabel,
    margin,
    required,
    size,
    variant
  };
  const classes = useUtilityClasses$s(ownerState);
  const [adornedStart, setAdornedStart] = React.useState(() => {
    let initialAdornedStart = false;
    if (children) {
      React.Children.forEach(children, (child) => {
        if (!isMuiElement(child, ["Input", "Select"])) {
          return;
        }
        const input = isMuiElement(child, ["Select"]) ? child.props.input : child;
        if (input && isAdornedStart(input.props)) {
          initialAdornedStart = true;
        }
      });
    }
    return initialAdornedStart;
  });
  const [filled, setFilled] = React.useState(() => {
    let initialFilled = false;
    if (children) {
      React.Children.forEach(children, (child) => {
        if (!isMuiElement(child, ["Input", "Select"])) {
          return;
        }
        if (isFilled(child.props, true) || isFilled(child.props.inputProps, true)) {
          initialFilled = true;
        }
      });
    }
    return initialFilled;
  });
  const [focusedState, setFocused] = React.useState(false);
  if (disabled && focusedState) {
    setFocused(false);
  }
  const focused = visuallyFocused !== void 0 && !disabled ? visuallyFocused : focusedState;
  let registerEffect;
  const registeredInput = React.useRef(false);
  if (process.env.NODE_ENV !== "production") {
    registerEffect = () => {
      if (registeredInput.current) {
        console.error(["MUI: There are multiple `InputBase` components inside a FormControl.", "This creates visual inconsistencies, only use one `InputBase`."].join("\n"));
      }
      registeredInput.current = true;
      return () => {
        registeredInput.current = false;
      };
    };
  }
  const onFilled = React.useCallback(() => {
    setFilled(true);
  }, []);
  const onEmpty = React.useCallback(() => {
    setFilled(false);
  }, []);
  const childContext = React.useMemo(() => {
    return {
      adornedStart,
      setAdornedStart,
      color,
      disabled,
      error,
      filled,
      focused,
      fullWidth,
      hiddenLabel,
      size,
      onBlur: () => {
        setFocused(false);
      },
      onFocus: () => {
        setFocused(true);
      },
      onEmpty,
      onFilled,
      registerEffect,
      required,
      variant
    };
  }, [adornedStart, color, disabled, error, filled, focused, fullWidth, hiddenLabel, registerEffect, onEmpty, onFilled, required, size, variant]);
  return /* @__PURE__ */ jsx(FormControlContext.Provider, {
    value: childContext,
    children: /* @__PURE__ */ jsx(FormControlRoot, {
      as: component,
      ownerState,
      className: clsx(classes.root, className),
      ref,
      ...other,
      children
    })
  });
});
process.env.NODE_ENV !== "production" ? FormControl.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes.oneOfType([PropTypes.oneOf(["primary", "secondary", "error", "info", "success", "warning"]), PropTypes.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the label, input and helper text should be displayed in a disabled state.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error: PropTypes.bool,
  /**
   * If `true`, the component is displayed in focused state.
   */
  focused: PropTypes.bool,
  /**
   * If `true`, the component will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * If `true`, the label is hidden.
   * This is used to increase density for a `FilledInput`.
   * Be sure to add `aria-label` to the `input` element.
   * @default false
   */
  hiddenLabel: PropTypes.bool,
  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   * @default 'none'
   */
  margin: PropTypes.oneOf(["dense", "none", "normal"]),
  /**
   * If `true`, the label will indicate that the `input` is required.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes.oneOfType([PropTypes.oneOf(["medium", "small"]), PropTypes.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: PropTypes.oneOf(["filled", "outlined", "standard"])
} : void 0;
const useUtilityClasses$r = (ownerState) => {
  const {
    classes,
    disabled,
    labelPlacement,
    error,
    required
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", `labelPlacement${capitalize(labelPlacement)}`, error && "error", required && "required"],
    label: ["label", disabled && "disabled"],
    asterisk: ["asterisk", error && "error"]
  };
  return composeClasses(slots, getFormControlLabelUtilityClasses, classes);
};
const FormControlLabelRoot = styled("label", {
  name: "MuiFormControlLabel",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${formControlLabelClasses.label}`]: styles2.label
    }, styles2.root, styles2[`labelPlacement${capitalize(ownerState.labelPlacement)}`]];
  }
})(memoTheme(({
  theme
}) => ({
  display: "inline-flex",
  alignItems: "center",
  cursor: "pointer",
  // For correct alignment with the text.
  verticalAlign: "middle",
  WebkitTapHighlightColor: "transparent",
  marginLeft: -11,
  marginRight: 16,
  // used for row presentation of radio/checkbox
  [`&.${formControlLabelClasses.disabled}`]: {
    cursor: "default"
  },
  [`& .${formControlLabelClasses.label}`]: {
    [`&.${formControlLabelClasses.disabled}`]: {
      color: (theme.vars || theme).palette.text.disabled
    }
  },
  variants: [{
    props: {
      labelPlacement: "start"
    },
    style: {
      flexDirection: "row-reverse",
      marginRight: -11
    }
  }, {
    props: {
      labelPlacement: "top"
    },
    style: {
      flexDirection: "column-reverse"
    }
  }, {
    props: {
      labelPlacement: "bottom"
    },
    style: {
      flexDirection: "column"
    }
  }, {
    props: ({
      labelPlacement
    }) => labelPlacement === "start" || labelPlacement === "top" || labelPlacement === "bottom",
    style: {
      marginLeft: 16
      // used for row presentation of radio/checkbox
    }
  }]
})));
const AsteriskComponent$1 = styled("span", {
  name: "MuiFormControlLabel",
  slot: "Asterisk"
})(memoTheme(({
  theme
}) => ({
  [`&.${formControlLabelClasses.error}`]: {
    color: (theme.vars || theme).palette.error.main
  }
})));
const FormControlLabel = /* @__PURE__ */ React.forwardRef(function FormControlLabel2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiFormControlLabel"
  });
  const {
    checked,
    className,
    control,
    disabled: disabledProp,
    disableTypography,
    inputRef,
    label: labelProp,
    labelPlacement = "end",
    name,
    onChange,
    required: requiredProp,
    slots = {},
    slotProps = {},
    value,
    ...other
  } = props;
  const [fcs, muiFormControl] = useFormControlState({
    props,
    states: ["error"]
  });
  const disabled = disabledProp ?? control.props.disabled ?? muiFormControl?.disabled;
  const required = requiredProp ?? control.props.required;
  const controlProps = {
    disabled,
    required
  };
  ["checked", "name", "onChange", "value", "inputRef"].forEach((key) => {
    if (typeof control.props[key] === "undefined" && typeof props[key] !== "undefined") {
      controlProps[key] = props[key];
    }
  });
  const ownerState = {
    ...props,
    disabled,
    labelPlacement,
    required,
    error: fcs.error
  };
  const classes = useUtilityClasses$r(ownerState);
  const externalForwardedProps = {
    slots,
    slotProps
  };
  const [TypographySlot, typographySlotProps] = useSlot("typography", {
    elementType: Typography,
    externalForwardedProps,
    ownerState
  });
  let label = labelProp;
  if (label != null && label.type !== Typography && !disableTypography) {
    label = /* @__PURE__ */ jsx(TypographySlot, {
      component: "span",
      ...typographySlotProps,
      className: clsx(classes.label, typographySlotProps?.className),
      children: label
    });
  }
  return /* @__PURE__ */ jsxs(FormControlLabelRoot, {
    className: clsx(classes.root, className),
    ownerState,
    ref,
    ...other,
    children: [/* @__PURE__ */ React.cloneElement(control, controlProps), required ? /* @__PURE__ */ jsxs("div", {
      children: [label, /* @__PURE__ */ jsxs(AsteriskComponent$1, {
        ownerState,
        "aria-hidden": true,
        className: classes.asterisk,
        children: [" ", "*"]
      })]
    }) : label]
  });
});
process.env.NODE_ENV !== "production" ? FormControlLabel.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the component appears selected.
   */
  checked: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * A control element. For instance, it can be a `Radio`, a `Switch` or a `Checkbox`.
   */
  control: PropTypes.element.isRequired,
  /**
   * If `true`, the control is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label is rendered as it is passed without an additional typography node.
   */
  disableTypography: PropTypes.bool,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,
  /**
   * A text or an element to be used in an enclosing label element.
   */
  label: PropTypes.node,
  /**
   * The position of the label.
   * @default 'end'
   */
  labelPlacement: PropTypes.oneOf(["bottom", "end", "start", "top"]),
  /**
   * @ignore
   */
  name: PropTypes.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * If `true`, the label will indicate that the `input` is required.
   */
  required: PropTypes.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    typography: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    typography: PropTypes.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The value of the component.
   */
  value: PropTypes.any
} : void 0;
function getFormGroupUtilityClass(slot) {
  return generateUtilityClass("MuiFormGroup", slot);
}
generateUtilityClasses("MuiFormGroup", ["root", "row", "error"]);
const useUtilityClasses$q = (ownerState) => {
  const {
    classes,
    row,
    error
  } = ownerState;
  const slots = {
    root: ["root", row && "row", error && "error"]
  };
  return composeClasses(slots, getFormGroupUtilityClass, classes);
};
const FormGroupRoot = styled("div", {
  name: "MuiFormGroup",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.row && styles2.row];
  }
})({
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  variants: [{
    props: {
      row: true
    },
    style: {
      flexDirection: "row"
    }
  }]
});
const FormGroup = /* @__PURE__ */ React.forwardRef(function FormGroup2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiFormGroup"
  });
  const {
    className,
    row = false,
    ...other
  } = props;
  const [fcs] = useFormControlState({
    props,
    states: ["error"]
  });
  const ownerState = {
    ...props,
    row,
    error: fcs.error
  };
  const classes = useUtilityClasses$q(ownerState);
  return /* @__PURE__ */ jsx(FormGroupRoot, {
    className: clsx(classes.root, className),
    ownerState,
    ref,
    ...other
  });
});
process.env.NODE_ENV !== "production" ? FormGroup.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * Display group of elements in a compact row.
   * @default false
   */
  row: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
var _span$2;
const useUtilityClasses$p = (ownerState) => {
  const {
    classes,
    contained,
    size,
    disabled,
    error,
    filled,
    focused,
    required
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", error && "error", size && `size${capitalize(size)}`, contained && "contained", focused && "focused", filled && "filled", required && "required"]
  };
  return composeClasses(slots, getFormHelperTextUtilityClasses, classes);
};
const FormHelperTextRoot = styled("p", {
  name: "MuiFormHelperText",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.size && styles2[`size${capitalize(ownerState.size)}`], ownerState.contained && styles2.contained, ownerState.filled && styles2.filled];
  }
})(memoTheme(({
  theme
}) => ({
  color: (theme.vars || theme).palette.text.secondary,
  ...theme.typography.caption,
  textAlign: "left",
  marginTop: 3,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  [`&.${formHelperTextClasses.disabled}`]: {
    color: (theme.vars || theme).palette.text.disabled
  },
  [`&.${formHelperTextClasses.error}`]: {
    color: (theme.vars || theme).palette.error.main
  },
  variants: [{
    props: {
      size: "small"
    },
    style: {
      marginTop: 4
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.contained,
    style: {
      marginLeft: 14,
      marginRight: 14
    }
  }]
})));
const FormHelperText = /* @__PURE__ */ React.forwardRef(function FormHelperText2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiFormHelperText"
  });
  const {
    children,
    className,
    component = "p",
    disabled,
    error,
    filled,
    focused,
    margin,
    required,
    variant,
    ...other
  } = props;
  const [fcs] = useFormControlState({
    props,
    states: ["variant", "size", "disabled", "error", "filled", "focused", "required"]
  });
  const ownerState = {
    ...props,
    component,
    contained: fcs.variant === "filled" || fcs.variant === "outlined",
    variant: fcs.variant,
    size: fcs.size,
    disabled: fcs.disabled,
    error: fcs.error,
    filled: fcs.filled,
    focused: fcs.focused,
    required: fcs.required
  };
  delete ownerState.ownerState;
  const classes = useUtilityClasses$p(ownerState);
  return /* @__PURE__ */ jsx(FormHelperTextRoot, {
    as: component,
    className: clsx(classes.root, className),
    ref,
    ...other,
    ownerState,
    children: children === " " ? (
      // notranslate needed while Google Translate will not fix zero-width space issue
      _span$2 || (_span$2 = /* @__PURE__ */ jsx("span", {
        className: "notranslate",
        "aria-hidden": true,
        children: "​"
      }))
    ) : children
  });
});
process.env.NODE_ENV !== "production" ? FormHelperText.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   *
   * If `' '` is provided, the component reserves one line height for displaying a future message.
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the helper text should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, helper text should be displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the helper text should use filled classes key.
   */
  filled: PropTypes.bool,
  /**
   * If `true`, the helper text should use focused classes key.
   */
  focused: PropTypes.bool,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: PropTypes.oneOf(["dense"]),
  /**
   * If `true`, the helper text should use required classes key.
   */
  required: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOfType([PropTypes.oneOf(["filled", "outlined", "standard"]), PropTypes.string])
} : void 0;
const useUtilityClasses$o = (ownerState) => {
  const {
    classes,
    color,
    focused,
    disabled,
    error,
    filled,
    required
  } = ownerState;
  const slots = {
    root: ["root", `color${capitalize(color)}`, disabled && "disabled", error && "error", filled && "filled", focused && "focused", required && "required"],
    asterisk: ["asterisk", error && "error"]
  };
  return composeClasses(slots, getFormLabelUtilityClasses, classes);
};
const FormLabelRoot = styled("label", {
  name: "MuiFormLabel",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.color === "secondary" && styles2.colorSecondary, ownerState.filled && styles2.filled];
  }
})(memoTheme(({
  theme
}) => ({
  color: (theme.vars || theme).palette.text.secondary,
  ...theme.typography.body1,
  lineHeight: "1.4375em",
  padding: 0,
  position: "relative",
  variants: [...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
    props: {
      color
    },
    style: {
      [`&.${formLabelClasses.focused}`]: {
        color: (theme.vars || theme).palette[color].main
      }
    }
  })), {
    props: {},
    style: {
      [`&.${formLabelClasses.disabled}`]: {
        color: (theme.vars || theme).palette.text.disabled
      },
      [`&.${formLabelClasses.error}`]: {
        color: (theme.vars || theme).palette.error.main
      }
    }
  }]
})));
const AsteriskComponent = styled("span", {
  name: "MuiFormLabel",
  slot: "Asterisk"
})(memoTheme(({
  theme
}) => ({
  [`&.${formLabelClasses.error}`]: {
    color: (theme.vars || theme).palette.error.main
  }
})));
const FormLabel = /* @__PURE__ */ React.forwardRef(function FormLabel2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiFormLabel"
  });
  const {
    children,
    className,
    color,
    component = "label",
    disabled,
    error,
    filled,
    focused,
    required,
    ...other
  } = props;
  const [fcs] = useFormControlState({
    props,
    states: ["color", "required", "focused", "disabled", "error", "filled"]
  });
  const ownerState = {
    ...props,
    color: fcs.color || "primary",
    component,
    disabled: fcs.disabled,
    error: fcs.error,
    filled: fcs.filled,
    focused: fcs.focused,
    required: fcs.required
  };
  const classes = useUtilityClasses$o(ownerState);
  return /* @__PURE__ */ jsxs(FormLabelRoot, {
    as: component,
    ownerState,
    className: clsx(classes.root, className),
    ref,
    ...other,
    children: [children, fcs.required && /* @__PURE__ */ jsxs(AsteriskComponent, {
      ownerState,
      "aria-hidden": true,
      className: classes.asterisk,
      children: [" ", "*"]
    })]
  });
});
process.env.NODE_ENV !== "production" ? FormLabel.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: PropTypes.oneOfType([PropTypes.oneOf(["error", "info", "primary", "secondary", "success", "warning"]), PropTypes.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the label should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label is displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the label should use filled classes key.
   */
  filled: PropTypes.bool,
  /**
   * If `true`, the input of this label is focused (used by `FormGroup` components).
   */
  focused: PropTypes.bool,
  /**
   * If `true`, the label will indicate that the `input` is required.
   */
  required: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
const Grid = createGrid({
  createStyledComponent: styled("div", {
    name: "MuiGrid",
    slot: "Root",
    overridesResolver: (props, styles2) => {
      const {
        ownerState
      } = props;
      return [styles2.root, ownerState.container && styles2.container];
    }
  }),
  componentName: "MuiGrid",
  useThemeProps: (inProps) => useDefaultProps({
    props: inProps,
    name: "MuiGrid"
  }),
  useTheme
});
process.env.NODE_ENV !== "production" ? Grid.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The number of columns.
   * @default 12
   */
  columns: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number, PropTypes.object]),
  /**
   * Defines the horizontal space between the type `item` components.
   * It overrides the value of the `spacing` prop.
   */
  columnSpacing: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])), PropTypes.number, PropTypes.object, PropTypes.string]),
  /**
   * If `true`, the component will have the flex *container* behavior.
   * You should be wrapping *items* with a *container*.
   * @default false
   */
  container: PropTypes.bool,
  /**
   * Defines the `flex-direction` style property for the container.
   *
   * ⚠️ Only `row` and `row-reverse` are supported. `column` and `column-reverse` are not supported,
   * because the Grid component is designed to subdivide layouts into **columns**, not rows.
   *
   * For vertical layouts, use `Stack` instead.
   *
   * @default 'row'
   */
  direction: PropTypes.oneOfType([PropTypes.oneOf(["row-reverse", "row"]), PropTypes.arrayOf(PropTypes.oneOf(["row-reverse", "row"])), PropTypes.object]),
  /**
   * Defines the offset value for the type `item` components.
   */
  offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])), PropTypes.object]),
  /**
   * Defines the vertical space between the type `item` components.
   * It overrides the value of the `spacing` prop.
   */
  rowSpacing: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])), PropTypes.number, PropTypes.object, PropTypes.string]),
  /**
   * Defines the size of the the type `item` components.
   */
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number])), PropTypes.object]),
  /**
   * Defines the space between the type `item` components.
   * It can only be used on a type `container` component.
   * @default 0
   */
  spacing: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])), PropTypes.number, PropTypes.object, PropTypes.string]),
  /**
   * @ignore
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * @internal
   * The level of the grid starts from `0` and increases when the grid nests
   * inside another grid. Nesting is defined as a container Grid being a direct
   * child of a container Grid.
   *
   * ```js
   * <Grid container> // level 0
   *   <Grid container> // level 1
   *     <Grid container> // level 2
   * ```
   *
   * Only consecutive grid is considered nesting. A grid container will start at
   * `0` if there are non-Grid container element above it.
   *
   * ```js
   * <Grid container> // level 0
   *   <div>
   *     <Grid container> // level 0
   * ```
   *
   * ```js
   * <Grid container> // level 0
   *   <Grid>
   *     <Grid container> // level 0
   * ```
   */
  unstable_level: PropTypes.number,
  /**
   * Defines the `flex-wrap` style property.
   * It's applied for all screen sizes.
   * @default 'wrap'
   */
  wrap: PropTypes.oneOf(["nowrap", "wrap-reverse", "wrap"])
} : void 0;
if (process.env.NODE_ENV !== "production") {
  const Component = Grid;
  const requireProp = requirePropFactory("Grid", Component);
  Component["propTypes"] = {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    ...Component.propTypes,
    direction: requireProp("container"),
    spacing: requireProp("container"),
    wrap: requireProp("container")
  };
}
function getScale(value) {
  return `scale(${value}, ${value ** 2})`;
}
const styles$1 = {
  entering: {
    opacity: 1,
    transform: getScale(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  },
  exiting: {
    opacity: 0,
    transform: getScale(0.75)
  },
  exited: {
    opacity: 0,
    transform: getScale(0.75)
  }
};
const hiddenStyles = {
  opacity: 0,
  transform: getScale(0.75),
  visibility: "hidden"
};
const Grow = /* @__PURE__ */ React.forwardRef(function Grow2(props, ref) {
  const {
    addEndListener,
    appear = true,
    children,
    disablePrefersReducedMotion = false,
    easing: easing2,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    style,
    timeout = "auto",
    ...other
  } = props;
  const autoTimeout = React.useRef(null);
  const theme = useTheme();
  const reducedMotion = useReducedMotion(theme.motion.reducedMotion, disablePrefersReducedMotion);
  const nodeRef = React.useRef(null);
  const handleRef = useForkRef(nodeRef, getReactElementRef(children), ref);
  const handleEntering = normalizedTransitionCallback(nodeRef, onEntering);
  const handleEnter = normalizedTransitionCallback(nodeRef, (node, isAppearing) => {
    if (!reducedMotion.shouldReduceMotion) {
      reflow(node);
    }
    const {
      duration: transitionDuration,
      delay,
      easing: transitionTimingFunction
    } = getTransitionProps({
      style,
      timeout,
      easing: easing2
    }, {
      mode: "enter"
    });
    let duration2;
    if (timeout === "auto" && !reducedMotion.shouldReduceMotion) {
      duration2 = theme.transitions.getAutoHeightDuration(node.clientHeight);
      autoTimeout.current = duration2;
    } else {
      duration2 = transitionDuration;
      autoTimeout.current = null;
    }
    const transitionTiming = reducedMotion.getTransitionTiming({
      duration: duration2,
      delay
    });
    node.style.transition = [theme.transitions.create("opacity", {
      duration: transitionTiming.duration,
      delay: transitionTiming.delay
    }), theme.transitions.create("transform", {
      duration: typeof transitionTiming.duration === "string" ? transitionTiming.duration : transitionTiming.duration * 0.666,
      delay: transitionTiming.delay,
      easing: transitionTimingFunction
    })].join(",");
    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });
  const handleEntered = normalizedTransitionCallback(nodeRef, onEntered);
  const handleExiting = normalizedTransitionCallback(nodeRef, onExiting);
  const handleExit = normalizedTransitionCallback(nodeRef, (node) => {
    const {
      duration: transitionDuration,
      delay,
      easing: transitionTimingFunction
    } = getTransitionProps({
      style,
      timeout,
      easing: easing2
    }, {
      mode: "exit"
    });
    let duration2;
    if (timeout === "auto" && !reducedMotion.shouldReduceMotion) {
      duration2 = theme.transitions.getAutoHeightDuration(node.clientHeight);
      autoTimeout.current = duration2;
    } else {
      duration2 = transitionDuration;
      autoTimeout.current = null;
    }
    const transitionTiming = reducedMotion.getTransitionTiming({
      duration: duration2,
      delay
    });
    node.style.transition = [theme.transitions.create("opacity", {
      duration: transitionTiming.duration,
      delay: transitionTiming.delay
    }), theme.transitions.create("transform", {
      duration: typeof transitionTiming.duration === "string" ? transitionTiming.duration : transitionTiming.duration * 0.666,
      delay: transitionTiming.delay || (typeof transitionTiming.duration === "string" ? transitionTiming.duration : transitionTiming.duration * 0.333),
      easing: transitionTimingFunction
    })].join(",");
    node.style.opacity = 0;
    node.style.transform = getScale(0.75);
    if (onExit) {
      onExit(node);
    }
  });
  const handleExited = normalizedTransitionCallback(nodeRef, (node) => {
    node.style.transition = "";
    if (onExited) {
      onExited(node);
    }
  });
  const handleAddEndListener = addEndListener ? (next) => {
    addEndListener(nodeRef.current, next);
  } : void 0;
  return /* @__PURE__ */ jsx(Transition, {
    appear,
    in: inProp,
    nodeRef,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: handleAddEndListener,
    getAutoTimeout: timeout === "auto" ? () => autoTimeout.current : void 0,
    reduceMotion: reducedMotion.shouldReduceMotion,
    timeout: timeout === "auto" ? null : timeout,
    ...other,
    children: (state, {
      ownerState,
      ...restChildProps
    }) => {
      const childStyle = getTransitionChildStyle(state, inProp, styles$1, hiddenStyles, style, children.props.style);
      return /* @__PURE__ */ React.cloneElement(children, {
        style: childStyle,
        ref: handleRef,
        ...restChildProps
      });
    }
  });
});
process.env.NODE_ENV !== "production" ? Grow.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger.
   * Use it when you need custom logic to decide when the transition has ended.
   * Note: Timeouts are still used as a fallback if provided.
   *
   * @param {HTMLElement} node The transitioning DOM node.
   * @param {Function} done Call this when the transition has finished.
   */
  addEndListener: PropTypes.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: PropTypes.bool,
  /**
   * A single child content element.
   */
  children: elementAcceptingRef.isRequired,
  /**
   * If `true`, the transition ignores `theme.motion.reducedMotion` and keeps its normal timing.
   * @default false
   */
  disablePrefersReducedMotion: PropTypes.bool,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: PropTypes.oneOfType([PropTypes.shape({
    enter: PropTypes.string,
    exit: PropTypes.string
  }), PropTypes.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: PropTypes.bool,
  /**
   * @ignore
   */
  onEnter: PropTypes.func,
  /**
   * @ignore
   */
  onEntered: PropTypes.func,
  /**
   * @ignore
   */
  onEntering: PropTypes.func,
  /**
   * @ignore
   */
  onExit: PropTypes.func,
  /**
   * @ignore
   */
  onExited: PropTypes.func,
  /**
   * @ignore
   */
  onExiting: PropTypes.func,
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  timeout: PropTypes.oneOfType([PropTypes.oneOf(["auto"]), PropTypes.number, PropTypes.shape({
    appear: PropTypes.number,
    enter: PropTypes.number,
    exit: PropTypes.number
  })])
} : void 0;
if (Grow) {
  Grow.muiSupportAuto = true;
}
function getInputLabelUtilityClasses(slot) {
  return generateUtilityClass("MuiInputLabel", slot);
}
const inputLabelClasses = generateUtilityClasses("MuiInputLabel", ["root", "focused", "disabled", "error", "required", "asterisk", "formControl", "sizeSmall", "shrink", "animated", "standard", "filled", "outlined"]);
const useUtilityClasses$n = (ownerState) => {
  const {
    classes,
    disableUnderline
  } = ownerState;
  const slots = {
    root: ["root", !disableUnderline && "underline"],
    input: ["input"]
  };
  const composedClasses = composeClasses(slots, getInputUtilityClass, classes);
  return {
    ...classes,
    // forward classes to the InputBase
    ...composedClasses
  };
};
const InputRoot = styled(InputBaseRoot, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiInput",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [...rootOverridesResolver(props, styles2), !ownerState.disableUnderline && styles2.underline];
  }
})(memoTheme(({
  theme
}) => {
  const light2 = theme.palette.mode === "light";
  let bottomLineColor = light2 ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)";
  if (theme.vars) {
    bottomLineColor = theme.alpha(theme.vars.palette.common.onBackground, theme.vars.opacity.inputUnderline);
  }
  return {
    position: "relative",
    variants: [{
      props: ({
        ownerState
      }) => ownerState.formControl,
      style: {
        [`label + &, .${inputLabelClasses.root} + &`]: {
          marginTop: 16
        }
      }
    }, {
      props: ({
        ownerState
      }) => !ownerState.disableUnderline,
      style: {
        "&::after": {
          left: 0,
          bottom: 0,
          content: '""',
          position: "absolute",
          right: 0,
          transform: "scaleX(0)",
          ...getTransitionStyles(theme, "transform", {
            duration: theme.transitions.duration.shorter,
            easing: theme.transitions.easing.easeOut
          }),
          pointerEvents: "none"
          // Transparent to the hover style.
        },
        [`&.${inputClasses.focused}:after`]: {
          // translateX(0) is a workaround for Safari transform scale bug
          // See https://github.com/mui/material-ui/issues/31766
          transform: "scaleX(1) translateX(0)"
        },
        [`&.${inputClasses.error}`]: {
          "&::before, &::after": {
            borderBottomColor: (theme.vars || theme).palette.error.main
          }
        },
        "&::before": {
          borderBottom: `1px solid ${bottomLineColor}`,
          left: 0,
          bottom: 0,
          content: '""',
          position: "absolute",
          right: 0,
          ...getTransitionStyles(theme, "border-bottom-color", {
            duration: theme.transitions.duration.shorter
          }),
          pointerEvents: "none"
          // Transparent to the hover style.
        },
        [`&:hover:not(.${inputClasses.disabled}, .${inputClasses.error}):before`]: {
          borderBottom: `2px solid ${(theme.vars || theme).palette.text.primary}`,
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            borderBottom: `1px solid ${bottomLineColor}`
          }
        },
        [`&.${inputClasses.disabled}:before`]: {
          borderBottomStyle: "dotted"
        }
      }
    }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
      props: {
        color,
        disableUnderline: false
      },
      style: {
        "&::after": {
          borderBottom: `2px solid ${(theme.vars || theme).palette[color].main}`
        }
      }
    }))]
  };
}));
const InputInput = styled(InputBaseInput, {
  name: "MuiInput",
  slot: "Input",
  overridesResolver: inputOverridesResolver
})({});
const Input = /* @__PURE__ */ React.forwardRef(function Input2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiInput"
  });
  const {
    disableUnderline = false,
    fullWidth = false,
    inputComponent = "input",
    multiline = false,
    notched,
    // declare here to prevent spreading to DOM
    slotProps,
    slots = {},
    type = "text",
    ...other
  } = props;
  const classes = useUtilityClasses$n(props);
  const ownerState = {
    disableUnderline
  };
  const inputComponentsProps = {
    root: {
      ownerState
    }
  };
  const componentsProps = slotProps ? deepmerge(slotProps, inputComponentsProps) : inputComponentsProps;
  const RootSlot = slots.root ?? InputRoot;
  const InputSlot = slots.input ?? InputInput;
  return /* @__PURE__ */ jsx(InputBase, {
    slots: {
      root: RootSlot,
      input: InputSlot
    },
    slotProps: componentsProps,
    fullWidth,
    inputComponent,
    multiline,
    ref,
    type,
    ...other,
    classes
  });
});
process.env.NODE_ENV !== "production" ? Input.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: PropTypes.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: PropTypes.oneOfType([PropTypes.oneOf(["primary", "secondary"]), PropTypes.string]),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the `input` will not have an underline.
   * @default false
   */
  disableUnderline: PropTypes.bool,
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: PropTypes.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   * @default 'input'
   */
  inputComponent: PropTypes.elementType,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#attributes) applied to the `input` element.
   * @default {}
   */
  inputProps: PropTypes.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: PropTypes.oneOf(["dense", "none"]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * If `true`, a [TextareaAutosize](https://mui.com/material-ui/react-textarea-autosize/) element is rendered.
   * @default false
   */
  multiline: PropTypes.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * @internal
   */
  notched: PropTypes.bool,
  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: PropTypes.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: PropTypes.bool,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: PropTypes.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: PropTypes.shape({
    input: PropTypes.object,
    root: PropTypes.object
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: PropTypes.shape({
    input: PropTypes.elementType,
    root: PropTypes.elementType
  }),
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types).
   * @default 'text'
   */
  type: PropTypes.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: PropTypes.any
} : void 0;
Input.muiName = "Input";
const useUtilityClasses$m = (ownerState) => {
  const {
    classes,
    formControl,
    size,
    shrink,
    disableAnimation,
    variant,
    required
  } = ownerState;
  const slots = {
    root: ["root", formControl && "formControl", !disableAnimation && "animated", shrink && "shrink", size && size !== "medium" && `size${capitalize(size)}`, variant],
    asterisk: [required && "asterisk"]
  };
  const composedClasses = composeClasses(slots, getInputLabelUtilityClasses, classes);
  return {
    ...classes,
    // forward the focused, disabled, etc. classes to the FormLabel
    ...composedClasses
  };
};
const InputLabelRoot = styled(FormLabel, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiInputLabel",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${formLabelClasses.asterisk}`]: styles2.asterisk
    }, styles2.root, ownerState.formControl && styles2.formControl, ownerState.size === "small" && styles2.sizeSmall, ownerState.shrink && styles2.shrink, !ownerState.disableAnimation && styles2.animated, ownerState.focused && styles2.focused, styles2[ownerState.variant]];
  }
})(memoTheme(({
  theme
}) => ({
  display: "block",
  transformOrigin: "top left",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100%",
  variants: [{
    props: ({
      ownerState
    }) => ownerState.formControl,
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      // slight alteration to spec spacing to match visual spec result
      transform: "translate(0, 20px) scale(1)"
    }
  }, {
    props: {
      size: "small"
    },
    style: {
      // Compensation for the `Input` small size style.
      transform: "translate(0, 17px) scale(1)"
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.shrink,
    style: {
      transform: "translate(0, -1.5px) scale(0.75)",
      transformOrigin: "top left",
      maxWidth: "133%"
    }
  }, {
    props: ({
      ownerState
    }) => !ownerState.disableAnimation,
    style: {
      ...getTransitionStyles(theme, ["color", "transform", "max-width"], {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut
      })
    }
  }, {
    props: {
      variant: "filled"
    },
    style: {
      // Chrome's autofill feature gives the input field a yellow background.
      // Since the input field is behind the label in the HTML tree,
      // the input field is drawn last and hides the label with an opaque background color.
      // zIndex: 1 will raise the label above opaque background-colors of input.
      zIndex: 1,
      pointerEvents: "none",
      transform: "translate(12px, 16px) scale(1)",
      maxWidth: "calc(100% - 24px)"
    }
  }, {
    props: {
      variant: "filled",
      size: "small"
    },
    style: {
      transform: "translate(12px, 13px) scale(1)"
    }
  }, {
    props: ({
      variant,
      ownerState
    }) => variant === "filled" && ownerState.shrink,
    style: {
      userSelect: "none",
      pointerEvents: "auto",
      transform: "translate(12px, 7px) scale(0.75)",
      maxWidth: "calc(133% - 24px)"
    }
  }, {
    props: ({
      variant,
      ownerState,
      size
    }) => variant === "filled" && ownerState.shrink && size === "small",
    style: {
      transform: "translate(12px, 4px) scale(0.75)"
    }
  }, {
    props: {
      variant: "outlined"
    },
    style: {
      // see comment above on filled.zIndex
      zIndex: 1,
      pointerEvents: "none",
      transform: "translate(14px, 16px) scale(1)",
      maxWidth: "calc(100% - 24px)"
    }
  }, {
    props: {
      variant: "outlined",
      size: "small"
    },
    style: {
      transform: "translate(14px, 9px) scale(1)"
    }
  }, {
    props: ({
      variant,
      ownerState
    }) => variant === "outlined" && ownerState.shrink,
    style: {
      userSelect: "none",
      pointerEvents: "auto",
      // Theoretically, we should have (8+5)*2/0.75 = 34px
      // but it feels a better when it bleeds a bit on the left, so 32px.
      maxWidth: "calc(133% - 32px)",
      transform: "translate(14px, -9px) scale(0.75)"
    }
  }]
})));
const InputLabel = /* @__PURE__ */ React.forwardRef(function InputLabel2(inProps, ref) {
  const props = useDefaultProps({
    name: "MuiInputLabel",
    props: inProps
  });
  const {
    disableAnimation = false,
    margin,
    shrink: shrinkProp,
    variant,
    className,
    ...other
  } = props;
  const [fcs, muiFormControl] = useFormControlState({
    props,
    states: ["size", "variant", "required", "focused"]
  });
  let shrink = shrinkProp;
  if (typeof shrink === "undefined" && muiFormControl) {
    shrink = muiFormControl.filled || muiFormControl.focused || muiFormControl.adornedStart;
  }
  const ownerState = {
    ...props,
    disableAnimation,
    formControl: muiFormControl,
    shrink,
    size: fcs.size,
    variant: fcs.variant,
    required: fcs.required,
    focused: fcs.focused
  };
  const classes = useUtilityClasses$m(ownerState);
  return /* @__PURE__ */ jsx(InputLabelRoot, {
    "data-shrink": shrink,
    ref,
    className: clsx(classes.root, className),
    ...other,
    ownerState,
    classes
  });
});
process.env.NODE_ENV !== "production" ? InputLabel.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: PropTypes.oneOfType([PropTypes.oneOf(["error", "info", "primary", "secondary", "success", "warning"]), PropTypes.string]),
  /**
   * If `true`, the transition animation is disabled.
   * @default false
   */
  disableAnimation: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label is displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the `input` of this label is focused.
   */
  focused: PropTypes.bool,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: PropTypes.oneOf(["dense"]),
  /**
   * if `true`, the label will indicate that the `input` is required.
   */
  required: PropTypes.bool,
  /**
   * If `true`, the label is shrunk.
   */
  shrink: PropTypes.bool,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes.oneOfType([PropTypes.oneOf(["medium", "small"]), PropTypes.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(["filled", "outlined", "standard"])
} : void 0;
const ListContext = /* @__PURE__ */ React.createContext({});
if (process.env.NODE_ENV !== "production") {
  ListContext.displayName = "ListContext";
}
function getListUtilityClass(slot) {
  return generateUtilityClass("MuiList", slot);
}
generateUtilityClasses("MuiList", ["root", "padding", "dense", "subheader"]);
const useUtilityClasses$l = (ownerState) => {
  const {
    classes,
    disablePadding,
    dense,
    subheader
  } = ownerState;
  const slots = {
    root: ["root", !disablePadding && "padding", dense && "dense", subheader && "subheader"]
  };
  return composeClasses(slots, getListUtilityClass, classes);
};
const ListRoot = styled("ul", {
  name: "MuiList",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, !ownerState.disablePadding && styles2.padding, ownerState.dense && styles2.dense, ownerState.subheader && styles2.subheader];
  }
})({
  listStyle: "none",
  margin: 0,
  padding: 0,
  position: "relative",
  variants: [{
    props: ({
      ownerState
    }) => !ownerState.disablePadding,
    style: {
      paddingTop: 8,
      paddingBottom: 8
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.subheader,
    style: {
      paddingTop: 0,
      isolation: "isolate"
      // Prevent overlap with iOS overlay scrollbars.
    }
  }]
});
const List$1 = /* @__PURE__ */ React.forwardRef(function List(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiList"
  });
  const {
    children,
    className,
    component = "ul",
    dense = false,
    disablePadding = false,
    subheader,
    ...other
  } = props;
  const context = React.useMemo(() => ({
    dense
  }), [dense]);
  const ownerState = {
    ...props,
    component,
    dense,
    disablePadding
  };
  const classes = useUtilityClasses$l(ownerState);
  return /* @__PURE__ */ jsx(ListContext.Provider, {
    value: context,
    children: /* @__PURE__ */ jsxs(ListRoot, {
      as: component,
      className: clsx(classes.root, className),
      ref,
      ownerState,
      ...other,
      children: [subheader, children]
    })
  });
});
process.env.NODE_ENV !== "production" ? List$1.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used for
   * the list and list items.
   * The prop is available to descendant components as the `dense` context.
   * @default false
   */
  dense: PropTypes.bool,
  /**
   * If `true`, vertical padding is removed from the list.
   * @default false
   */
  disablePadding: PropTypes.bool,
  /**
   * The content of the subheader, normally `ListSubheader`.
   */
  subheader: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
function getListItemUtilityClass(slot) {
  return generateUtilityClass("MuiListItem", slot);
}
generateUtilityClasses("MuiListItem", ["root", "dense", "alignItemsFlexStart", "divider", "gutters", "padding", "secondaryAction"]);
function getListItemSecondaryActionClassesUtilityClass(slot) {
  return generateUtilityClass("MuiListItemSecondaryAction", slot);
}
generateUtilityClasses("MuiListItemSecondaryAction", ["root", "disableGutters"]);
const useUtilityClasses$k = (ownerState) => {
  const {
    disableGutters,
    classes
  } = ownerState;
  const slots = {
    root: ["root", disableGutters && "disableGutters"]
  };
  return composeClasses(slots, getListItemSecondaryActionClassesUtilityClass, classes);
};
const ListItemSecondaryActionRoot = styled("div", {
  name: "MuiListItemSecondaryAction",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.disableGutters && styles2.disableGutters];
  }
})({
  position: "absolute",
  right: 16,
  top: "50%",
  transform: "translateY(-50%)",
  variants: [{
    props: ({
      ownerState
    }) => ownerState.disableGutters,
    style: {
      right: 0
    }
  }]
});
const ListItemSecondaryAction = /* @__PURE__ */ React.forwardRef(function ListItemSecondaryAction2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiListItemSecondaryAction"
  });
  const {
    className,
    component,
    ...other
  } = props;
  const context = React.useContext(ListContext);
  const ownerState = {
    ...props,
    disableGutters: context.disableGutters
  };
  const classes = useUtilityClasses$k(ownerState);
  return /* @__PURE__ */ jsx(ListItemSecondaryActionRoot, {
    as: component,
    className: clsx(classes.root, className),
    ownerState,
    ref,
    ...other
  });
});
process.env.NODE_ENV !== "production" ? ListItemSecondaryAction.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component, normally an `IconButton` or selection control.
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
ListItemSecondaryAction.muiName = "ListItemSecondaryAction";
const overridesResolver$1 = (props, styles2) => {
  const {
    ownerState
  } = props;
  return [styles2.root, ownerState.dense && styles2.dense, ownerState.alignItems === "flex-start" && styles2.alignItemsFlexStart, ownerState.divider && styles2.divider, !ownerState.disableGutters && styles2.gutters, !ownerState.disablePadding && styles2.padding];
};
const useUtilityClasses$j = (ownerState) => {
  const {
    alignItems,
    classes,
    dense,
    disableGutters,
    disablePadding,
    divider
  } = ownerState;
  const slots = {
    root: ["root", dense && "dense", !disableGutters && "gutters", !disablePadding && "padding", divider && "divider", alignItems === "flex-start" && "alignItemsFlexStart"],
    secondaryAction: ["secondaryAction"]
  };
  return composeClasses(slots, getListItemUtilityClass, classes);
};
const ListItemRoot = styled("div", {
  name: "MuiListItem",
  slot: "Root",
  overridesResolver: overridesResolver$1
})(memoTheme(({
  theme
}) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  position: "relative",
  textDecoration: "none",
  width: "100%",
  boxSizing: "border-box",
  textAlign: "left",
  variants: [{
    props: ({
      ownerState
    }) => !ownerState.disablePadding,
    style: {
      paddingTop: 8,
      paddingBottom: 8
    }
  }, {
    props: ({
      ownerState
    }) => !ownerState.disablePadding && ownerState.dense,
    style: {
      paddingTop: 4,
      paddingBottom: 4
    }
  }, {
    props: ({
      ownerState
    }) => !ownerState.disablePadding && !ownerState.disableGutters,
    style: {
      paddingLeft: 16,
      paddingRight: 16
    }
  }, {
    props: ({
      ownerState
    }) => !ownerState.disablePadding && !!ownerState.secondaryAction,
    style: {
      // Add some space to avoid collision as `ListItemSecondaryAction`
      // is absolutely positioned.
      paddingRight: 48
    }
  }, {
    props: ({
      ownerState
    }) => !!ownerState.secondaryAction,
    style: {
      [`& > .${listItemButtonClasses.root}`]: {
        paddingRight: 48
      }
    }
  }, {
    props: {
      alignItems: "flex-start"
    },
    style: {
      alignItems: "flex-start"
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.divider,
    style: {
      borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
      backgroundClip: "padding-box"
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.button,
    style: {
      ...getTransitionStyles(theme, "background-color", {
        duration: theme.transitions.duration.shortest
      }),
      "&:hover": {
        textDecoration: "none",
        backgroundColor: (theme.vars || theme).palette.action.hover,
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      }
    }
  }]
})));
const StyledListItemSecondaryAction = styled(ListItemSecondaryAction, {
  name: "MuiListItem",
  slot: "secondaryAction"
})({});
const ListItem = /* @__PURE__ */ React.forwardRef(function ListItem2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiListItem"
  });
  const {
    alignItems = "center",
    children: childrenProp,
    className,
    component: componentProp = "li",
    dense = false,
    disableGutters = false,
    disablePadding = false,
    divider = false,
    secondaryAction,
    slotProps = {},
    slots = {},
    ...other
  } = props;
  const context = React.useContext(ListContext);
  const childContext = React.useMemo(() => ({
    dense: dense || context.dense || false,
    alignItems,
    disableGutters
  }), [alignItems, context.dense, dense, disableGutters]);
  const ownerState = {
    ...props,
    alignItems,
    dense: childContext.dense,
    disableGutters,
    disablePadding,
    divider,
    secondaryAction
  };
  const classes = useUtilityClasses$j(ownerState);
  const externalForwardedProps = {
    slots,
    slotProps
  };
  const [RootSlot, rootSlotProps] = useSlot("root", {
    ref,
    elementType: ListItemRoot,
    externalForwardedProps: {
      component: componentProp,
      ...externalForwardedProps,
      ...other
    },
    ownerState,
    className: clsx(classes.root, className)
  });
  const [SecondaryActionSlot, secondaryActionSlotProps] = useSlot("secondaryAction", {
    elementType: StyledListItemSecondaryAction,
    shouldForwardComponentProp: true,
    externalForwardedProps,
    ownerState,
    className: classes.secondaryAction
  });
  return /* @__PURE__ */ jsx(ListContext.Provider, {
    value: childContext,
    children: /* @__PURE__ */ jsxs(RootSlot, {
      ...rootSlotProps,
      children: [childrenProp, secondaryAction && /* @__PURE__ */ jsx(SecondaryActionSlot, {
        ...secondaryActionSlotProps,
        children: secondaryAction
      })]
    })
  });
});
process.env.NODE_ENV !== "production" ? ListItem.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Defines the `align-items` style property.
   * @default 'center'
   */
  alignItems: PropTypes.oneOf(["center", "flex-start"]),
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent List component.
   * @default false
   */
  dense: PropTypes.bool,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * If `true`, all padding is removed.
   * @default false
   */
  disablePadding: PropTypes.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
   * @default false
   */
  divider: PropTypes.bool,
  /**
   * The element to display at the end of ListItem.
   */
  secondaryAction: PropTypes.node,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.object,
    secondaryAction: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
    secondaryAction: PropTypes.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
const listItemIconClasses = generateUtilityClasses("MuiListItemIcon", ["root", "alignItemsFlexStart"]);
function getListItemTextUtilityClass(slot) {
  return generateUtilityClass("MuiListItemText", slot);
}
const listItemTextClasses = generateUtilityClasses("MuiListItemText", ["root", "multiline", "dense", "inset", "primary", "secondary"]);
const useUtilityClasses$i = (ownerState) => {
  const {
    classes,
    inset,
    primary,
    secondary,
    dense
  } = ownerState;
  const slots = {
    root: ["root", inset && "inset", dense && "dense", primary && secondary && "multiline"],
    primary: ["primary"],
    secondary: ["secondary"]
  };
  return composeClasses(slots, getListItemTextUtilityClass, classes);
};
const ListItemTextRoot = styled("div", {
  name: "MuiListItemText",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${listItemTextClasses.primary}`]: styles2.primary
    }, {
      [`& .${listItemTextClasses.secondary}`]: styles2.secondary
    }, styles2.root, ownerState.inset && styles2.inset, ownerState.primary && ownerState.secondary && styles2.multiline, ownerState.dense && styles2.dense];
  }
})({
  flex: "1 1 auto",
  minWidth: 0,
  marginTop: 4,
  marginBottom: 4,
  // Combine this and the below selector once https://github.com/emotion-js/emotion/issues/3366 is solved
  [`.${typographyClasses.root}:where(& .${listItemTextClasses.primary})`]: {
    display: "block"
  },
  [`.${typographyClasses.root}:where(& .${listItemTextClasses.secondary})`]: {
    display: "block"
  },
  variants: [{
    props: ({
      ownerState
    }) => ownerState.primary && ownerState.secondary,
    style: {
      marginTop: 6,
      marginBottom: 6
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.inset,
    style: {
      paddingLeft: 56
    }
  }]
});
const ListItemText = /* @__PURE__ */ React.forwardRef(function ListItemText2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiListItemText"
  });
  const {
    children,
    className,
    disableTypography = false,
    inset = false,
    primary: primaryProp,
    secondary: secondaryProp,
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const {
    dense
  } = React.useContext(ListContext);
  let primary = primaryProp != null ? primaryProp : children;
  let secondary = secondaryProp;
  const ownerState = {
    ...props,
    disableTypography,
    inset,
    primary: !!primary,
    secondary: !!secondary,
    dense
  };
  const classes = useUtilityClasses$i(ownerState);
  const externalForwardedProps = {
    slots,
    slotProps
  };
  const [RootSlot, rootSlotProps] = useSlot("root", {
    className: clsx(classes.root, className),
    elementType: ListItemTextRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other
    },
    ownerState,
    ref
  });
  const [PrimarySlot, primarySlotProps] = useSlot("primary", {
    className: classes.primary,
    elementType: Typography,
    externalForwardedProps,
    ownerState
  });
  const [SecondarySlot, secondarySlotProps] = useSlot("secondary", {
    className: classes.secondary,
    elementType: Typography,
    externalForwardedProps,
    ownerState
  });
  if (primary != null && primary.type !== Typography && !disableTypography) {
    primary = /* @__PURE__ */ jsx(PrimarySlot, {
      variant: dense ? "body2" : "body1",
      component: primarySlotProps?.variant ? void 0 : "span",
      ...primarySlotProps,
      children: primary
    });
  }
  if (secondary != null && secondary.type !== Typography && !disableTypography) {
    secondary = /* @__PURE__ */ jsx(SecondarySlot, {
      variant: "body2",
      color: "textSecondary",
      ...secondarySlotProps,
      children: secondary
    });
  }
  return /* @__PURE__ */ jsxs(RootSlot, {
    ...rootSlotProps,
    children: [primary, secondary]
  });
});
process.env.NODE_ENV !== "production" ? ListItemText.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Alias for the `primary` prop.
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
   * If `true`, the children won't be wrapped by a Typography component.
   * This can be useful to render an alternative Typography variant by wrapping
   * the `children` (or `primary`) text, and optional `secondary` text
   * with the Typography component.
   * @default false
   */
  disableTypography: PropTypes.bool,
  /**
   * If `true`, the children are indented.
   * This should be used if there is no left avatar or left icon.
   * @default false
   */
  inset: PropTypes.bool,
  /**
   * The main content element.
   */
  primary: PropTypes.node,
  /**
   * The secondary content element.
   */
  secondary: PropTypes.node,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    primary: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    secondary: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    primary: PropTypes.elementType,
    root: PropTypes.elementType,
    secondary: PropTypes.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
function focusWithVisible(element, focusSource) {
  if (focusSource == null) {
    element.focus();
    return;
  }
  try {
    element.focus({
      focusVisible: focusSource === "keyboard"
    });
  } catch (error) {
    element.focus();
  }
}
function getOpenInteractionType(event) {
  if (!event) {
    return null;
  }
  if (event.type === "mousedown" || event.type === "pointerdown" || event.type === "touchstart") {
    return "pointer";
  }
  if (event.type === "keydown" || event.type === "click" && event.detail === 0) {
    return "keyboard";
  }
  return null;
}
function isEmpty(display) {
  return display == null || typeof display === "string" && !display.trim();
}
function areEqualValues$1(a, b) {
  if (typeof b === "object" && b !== null) {
    return a === b;
  }
  return String(a) === String(b);
}
const SelectFocusSourceContext = /* @__PURE__ */ React.createContext(null);
if (process.env.NODE_ENV !== "production") {
  SelectFocusSourceContext.displayName = "SelectFocusSourceContext";
}
function useSelectFocusSource() {
  const context = React.useContext(SelectFocusSourceContext);
  return context;
}
const SelectFocusSourceProvider = SelectFocusSourceContext.Provider;
const MenuListContext = /* @__PURE__ */ React.createContext(void 0);
if (process.env.NODE_ENV !== "production") {
  MenuListContext.displayName = "MenuListContext";
}
function useMenuListContext() {
  const context = React.useContext(MenuListContext);
  if (context === void 0) {
    throw new Error("MUI: MenuListContext is missing. MenuItems must be placed within Menu or MenuList.");
  }
  return context;
}
function getItemText(itemOrElement) {
  const element = itemOrElement?.element ?? itemOrElement;
  if (!element) {
    return "";
  }
  if (itemOrElement?.textValue !== void 0) {
    return itemOrElement.textValue;
  }
  let text = element.innerText;
  if (text === void 0) {
    text = element.textContent;
  }
  return text ?? "";
}
function textCriteriaMatches(itemOrElement, textCriteria) {
  if (textCriteria === void 0) {
    return true;
  }
  let text = getItemText(itemOrElement);
  text = text.trim().toLowerCase();
  if (text.length === 0) {
    return false;
  }
  if (textCriteria.repeating) {
    return text[0] === textCriteria.keys[0];
  }
  return text.startsWith(textCriteria.keys.join(""));
}
function isItemFocusableWithTextCriteria(item, criteria) {
  if (!textCriteriaMatches(item, criteria)) {
    return false;
  }
  return isItemFocusable(item);
}
function focusInitialItem(element, focusSource) {
  focusWithVisible(element, focusSource);
}
const MenuList = /* @__PURE__ */ React.forwardRef(function MenuList2(props, ref) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions,
    autoFocus: autoFocusList = false,
    autoFocusItem: autoFocusActiveItem = false,
    children,
    className,
    disabledItemsFocusable = false,
    disableListWrap = false,
    onKeyDown,
    variant = "selectedMenu",
    ...other
  } = props;
  const listRef = React.useRef(null);
  const hasFocusedInitialTargetRef = React.useRef(false);
  const [suppressInitialFocusVisible, setSuppressInitialFocusVisible] = React.useState(false);
  const focusSource = useSelectFocusSource();
  const textCriteriaRef = React.useRef({
    keys: [],
    repeating: true,
    previousKeyMatched: true,
    lastTime: null
  });
  const getDefaultActiveItemId = React.useCallback((items2) => {
    if (variant === "selectedMenu") {
      return items2.find((item) => item.selected && isItemFocusable(item))?.id ?? items2.find((item) => isItemFocusable(item))?.id ?? null;
    }
    return items2.find((item) => isItemFocusable(item))?.id ?? null;
  }, [variant]);
  const rovingContainer = useRovingTabIndexRoot({
    activeItemId: void 0,
    getDefaultActiveItemId,
    orientation: "vertical",
    wrap: !disableListWrap
  });
  const {
    activeItemId,
    focusNext,
    getActiveItem,
    getContainerProps,
    getItemMap
  } = rovingContainer;
  const focusInitialTarget = useEventCallback((force = false) => {
    if (!listRef.current || !force && hasFocusedInitialTargetRef.current) {
      return null;
    }
    if (autoFocusActiveItem) {
      const activeItem = getActiveItem();
      if (activeItem?.element) {
        const hasSelectedItem = Array.from(getItemMap().values()).some((item) => item.selected);
        const shouldSuppressInitialFocusVisible = variant === "menu" && hasSelectedItem && !activeItem.selected && focusSource == null;
        setSuppressInitialFocusVisible(shouldSuppressInitialFocusVisible);
        focusInitialItem(activeItem.element, focusSource);
        hasFocusedInitialTargetRef.current = true;
        return activeItem.element;
      }
      if (!autoFocusList) {
        return null;
      }
      setSuppressInitialFocusVisible(false);
      listRef.current.focus();
      return listRef.current;
    }
    if (!autoFocusList) {
      setSuppressInitialFocusVisible(false);
      return null;
    }
    setSuppressInitialFocusVisible(false);
    listRef.current.focus();
    hasFocusedInitialTargetRef.current = true;
    return listRef.current;
  });
  useEnhancedEffect(() => {
    if (!autoFocusList && !autoFocusActiveItem) {
      hasFocusedInitialTargetRef.current = false;
      setSuppressInitialFocusVisible(false);
      return void 0;
    }
    focusInitialTarget();
    return void 0;
  }, [activeItemId, autoFocusActiveItem, autoFocusList, focusInitialTarget]);
  React.useImperativeHandle(actions, () => ({
    adjustStyleForScrollbar: (containerElement, {
      direction
    }) => {
      const noExplicitWidth = !listRef.current.style.width;
      if (containerElement.clientHeight < listRef.current.clientHeight && noExplicitWidth) {
        const scrollbarSize = `${getScrollbarSize(ownerWindow(containerElement))}px`;
        listRef.current.style[direction === "rtl" ? "paddingLeft" : "paddingRight"] = scrollbarSize;
        listRef.current.style.width = `calc(100% + ${scrollbarSize})`;
      }
      return listRef.current;
    },
    focusInitialTarget: () => {
      if (!listRef.current) {
        return null;
      }
      const currentFocus = getActiveElement(ownerDocument(listRef.current));
      if (currentFocus && contains(listRef.current, currentFocus)) {
        return currentFocus;
      }
      return focusInitialTarget(true);
    }
  }), [focusInitialTarget]);
  const rovingContainerProps = getContainerProps();
  const handleRef = useForkRef(listRef, rovingContainerProps.ref, ref);
  const menuListContextValue = React.useMemo(() => ({
    itemsFocusableWhenDisabled: disabledItemsFocusable,
    suppressInitialFocusVisible,
    variant
  }), [disabledItemsFocusable, suppressInitialFocusVisible, variant]);
  const handleKeyDown = useEventCallback((event) => {
    if (suppressInitialFocusVisible) {
      setSuppressInitialFocusVisible(false);
    }
    const isModifierKeyPressed = event.ctrlKey || event.metaKey || event.altKey;
    if (isModifierKeyPressed && onKeyDown) {
      onKeyDown(event);
      return;
    }
    rovingContainerProps.onKeyDown(event);
    if (event.key.length === 1) {
      const criteria = textCriteriaRef.current;
      const lowerKey = event.key.toLowerCase();
      const currTime = performance.now();
      if (criteria.keys.length > 0) {
        if (currTime - criteria.lastTime > 500) {
          criteria.keys = [];
          criteria.repeating = true;
          criteria.previousKeyMatched = true;
        } else if (criteria.repeating && lowerKey !== criteria.keys[0]) {
          criteria.repeating = false;
        }
      }
      criteria.lastTime = currTime;
      criteria.keys.push(lowerKey);
      const currentFocus = getActiveElement(ownerDocument(listRef.current));
      const keepFocusOnCurrent = currentFocus && !criteria.repeating && textCriteriaMatches(currentFocus, criteria);
      if (criteria.previousKeyMatched && (keepFocusOnCurrent || focusNext((item) => isItemFocusableWithTextCriteria(item, criteria)) != null)) {
        event.preventDefault();
      } else {
        criteria.previousKeyMatched = false;
      }
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  });
  return /* @__PURE__ */ jsx(List$1, {
    role: "menu",
    ref: handleRef,
    className,
    onKeyDown: handleKeyDown,
    onFocus: rovingContainerProps.onFocus,
    tabIndex: -1,
    ...other,
    children: /* @__PURE__ */ jsx(MenuListContext.Provider, {
      value: menuListContextValue,
      children: /* @__PURE__ */ jsx(RovingTabIndexContext.Provider, {
        value: rovingContainer,
        children
      })
    })
  });
});
process.env.NODE_ENV !== "production" ? MenuList.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, will focus the `[role="menu"]` container and move into tab order.
   * @default false
   */
  autoFocus: PropTypes.bool,
  /**
   * If `true`, will focus the first menuitem if `variant="menu"` or selected item
   * if `variant="selectedMenu"`.
   * @default false
   */
  autoFocusItem: PropTypes.bool,
  /**
   * MenuList contents, normally `MenuItem`s.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, will allow focus on disabled items.
   * @default false
   */
  disabledItemsFocusable: PropTypes.bool,
  /**
   * If `true`, the menu items will not wrap focus.
   * @default false
   */
  disableListWrap: PropTypes.bool,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus
   * and the vertical alignment relative to the anchor element.
   * @default 'selectedMenu'
   */
  variant: PropTypes.oneOf(["menu", "selectedMenu"])
} : void 0;
function getPopoverUtilityClass(slot) {
  return generateUtilityClass("MuiPopover", slot);
}
generateUtilityClasses("MuiPopover", ["root", "paper"]);
function getOffsetTop(rect, vertical) {
  let offset = 0;
  if (typeof vertical === "number") {
    offset = vertical;
  } else if (vertical === "center") {
    offset = rect.height / 2;
  } else if (vertical === "bottom") {
    offset = rect.height;
  }
  return offset;
}
function getOffsetLeft(rect, horizontal) {
  let offset = 0;
  if (typeof horizontal === "number") {
    offset = horizontal;
  } else if (horizontal === "center") {
    offset = rect.width / 2;
  } else if (horizontal === "right") {
    offset = rect.width;
  }
  return offset;
}
function getTransformOriginValue(transformOrigin) {
  return [transformOrigin.horizontal, transformOrigin.vertical].map((n) => typeof n === "number" ? `${n}px` : n).join(" ");
}
function resolveAnchorEl(anchorEl) {
  return typeof anchorEl === "function" ? anchorEl() : anchorEl;
}
const useUtilityClasses$h = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    paper: ["paper"]
  };
  return composeClasses(slots, getPopoverUtilityClass, classes);
};
const PopoverRoot = styled(Modal, {
  name: "MuiPopover",
  slot: "Root"
})({});
const PopoverPaper = styled(Paper, {
  name: "MuiPopover",
  slot: "Paper"
})({
  position: "absolute",
  overflowY: "auto",
  overflowX: "hidden",
  // So we see the popover when it's empty.
  // It's most likely on issue on userland.
  minWidth: 16,
  minHeight: 16,
  maxWidth: "calc(100% - 32px)",
  maxHeight: "calc(100% - 32px)",
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
});
const Popover = /* @__PURE__ */ React.forwardRef(function Popover2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiPopover"
  });
  const {
    action,
    anchorEl,
    anchorOrigin = {
      vertical: "top",
      horizontal: "left"
    },
    anchorPosition,
    anchorReference = "anchorEl",
    children,
    className,
    container: containerProp,
    disableAutoFocus = false,
    elevation = 8,
    marginThreshold = 16,
    open,
    slots = {},
    slotProps = {},
    transformOrigin = {
      vertical: "top",
      horizontal: "left"
    },
    transitionDuration: transitionDurationProp = "auto",
    disableScrollLock = false,
    ...other
  } = props;
  const paperRef = React.useRef();
  const ownerState = {
    ...props,
    anchorOrigin,
    anchorReference,
    elevation,
    marginThreshold,
    transformOrigin,
    transitionDuration: transitionDurationProp
  };
  const classes = useUtilityClasses$h(ownerState);
  const getAnchorOffset = React.useCallback(() => {
    if (anchorReference === "anchorPosition") {
      if (process.env.NODE_ENV !== "production") {
        if (!anchorPosition) {
          console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.');
        }
      }
      return anchorPosition;
    }
    const resolvedAnchorEl = resolveAnchorEl(anchorEl);
    const anchorElement = resolvedAnchorEl && resolvedAnchorEl.nodeType === 1 ? resolvedAnchorEl : ownerDocument(paperRef.current).body;
    const anchorRect = anchorElement.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const box = anchorElement.getBoundingClientRect();
      if (isLayoutSupported() && box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) {
        console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join("\n"));
      }
    }
    return {
      top: anchorRect.top + getOffsetTop(anchorRect, anchorOrigin.vertical),
      left: anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal)
    };
  }, [anchorEl, anchorOrigin.horizontal, anchorOrigin.vertical, anchorPosition, anchorReference]);
  const getTransformOrigin = React.useCallback((elemRect) => {
    return {
      vertical: getOffsetTop(elemRect, transformOrigin.vertical),
      horizontal: getOffsetLeft(elemRect, transformOrigin.horizontal)
    };
  }, [transformOrigin.horizontal, transformOrigin.vertical]);
  const getPositioningStyle = React.useCallback((element) => {
    const elemRect = {
      width: element.offsetWidth,
      height: element.offsetHeight
    };
    const elemTransformOrigin = getTransformOrigin(elemRect);
    if (anchorReference === "none") {
      return {
        top: null,
        left: null,
        transformOrigin: getTransformOriginValue(elemTransformOrigin)
      };
    }
    const anchorOffset = getAnchorOffset();
    let top = anchorOffset.top - elemTransformOrigin.vertical;
    let left = anchorOffset.left - elemTransformOrigin.horizontal;
    const bottom = top + elemRect.height;
    const right = left + elemRect.width;
    const containerWindow = ownerWindow(resolveAnchorEl(anchorEl));
    const heightThreshold = containerWindow.innerHeight - marginThreshold;
    const widthThreshold = containerWindow.innerWidth - marginThreshold;
    if (marginThreshold != null && top < marginThreshold) {
      const diff = top - marginThreshold;
      top -= diff;
      elemTransformOrigin.vertical += diff;
    } else if (marginThreshold != null && bottom > heightThreshold) {
      const diff = bottom - heightThreshold;
      top -= diff;
      elemTransformOrigin.vertical += diff;
    }
    if (process.env.NODE_ENV !== "production") {
      if (elemRect.height > heightThreshold && elemRect.height && heightThreshold) {
        console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${elemRect.height - heightThreshold}px).`, "Please consider adding a `max-height` to improve the user-experience."].join("\n"));
      }
    }
    if (marginThreshold != null && left < marginThreshold) {
      const diff = left - marginThreshold;
      left -= diff;
      elemTransformOrigin.horizontal += diff;
    } else if (right > widthThreshold) {
      const diff = right - widthThreshold;
      left -= diff;
      elemTransformOrigin.horizontal += diff;
    }
    return {
      top: `${Math.round(top)}px`,
      left: `${Math.round(left)}px`,
      transformOrigin: getTransformOriginValue(elemTransformOrigin)
    };
  }, [anchorEl, anchorReference, getAnchorOffset, getTransformOrigin, marginThreshold]);
  const [isPositioned, setIsPositioned] = React.useState(open);
  const setPositioningStyles = React.useCallback(() => {
    const element = paperRef.current;
    if (!element) {
      return;
    }
    const positioning = getPositioningStyle(element);
    if (positioning.top != null) {
      element.style.setProperty("top", positioning.top);
    }
    if (positioning.left != null) {
      element.style.left = positioning.left;
    }
    element.style.transformOrigin = positioning.transformOrigin;
    setIsPositioned(true);
  }, [getPositioningStyle]);
  React.useEffect(() => {
    if (disableScrollLock) {
      window.addEventListener("scroll", setPositioningStyles);
    }
    return () => window.removeEventListener("scroll", setPositioningStyles);
  }, [anchorEl, disableScrollLock, setPositioningStyles]);
  const handleEntering = () => {
    setPositioningStyles();
  };
  const handleExited = () => {
    setIsPositioned(false);
  };
  React.useEffect(() => {
    if (open) {
      setPositioningStyles();
    }
  });
  React.useImperativeHandle(action, () => open ? {
    updatePosition: () => {
      setPositioningStyles();
    }
  } : null, [open, setPositioningStyles]);
  React.useEffect(() => {
    if (!open) {
      return void 0;
    }
    const handleResize = debounce(() => {
      setPositioningStyles();
    });
    const containerWindow = ownerWindow(resolveAnchorEl(anchorEl));
    containerWindow.addEventListener("resize", handleResize);
    return () => {
      handleResize.clear();
      containerWindow.removeEventListener("resize", handleResize);
    };
  }, [anchorEl, open, setPositioningStyles]);
  let transitionDuration = transitionDurationProp;
  const externalForwardedProps = {
    slots,
    slotProps
  };
  const [TransitionSlot, transitionSlotProps] = useSlot("transition", {
    elementType: Grow,
    externalForwardedProps,
    ownerState,
    getSlotProps: (handlers) => ({
      ...handlers,
      onEntering: (element, isAppearing) => {
        handlers.onEntering?.(element, isAppearing);
        handleEntering();
      },
      onExited: (element) => {
        handlers.onExited?.(element);
        handleExited();
      }
    }),
    additionalProps: {
      appear: true,
      in: open
    }
  });
  if (transitionDurationProp === "auto" && !TransitionSlot.muiSupportAuto) {
    transitionDuration = void 0;
  }
  const container = containerProp || (anchorEl ? ownerDocument(resolveAnchorEl(anchorEl)).body : void 0);
  const [RootSlot, {
    slots: rootSlotsProp,
    slotProps: rootSlotPropsProp,
    ...rootProps
  }] = useSlot("root", {
    ref,
    elementType: PopoverRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other
    },
    shouldForwardComponentProp: true,
    additionalProps: {
      slots: {
        backdrop: slots.backdrop
      },
      slotProps: {
        backdrop: mergeSlotProps(typeof slotProps.backdrop === "function" ? slotProps.backdrop(ownerState) : slotProps.backdrop, {
          invisible: true
        })
      },
      container,
      open
    },
    ownerState,
    className: clsx(classes.root, className)
  });
  const [PaperSlot, paperProps] = useSlot("paper", {
    ref: paperRef,
    className: classes.paper,
    elementType: PopoverPaper,
    externalForwardedProps,
    shouldForwardComponentProp: true,
    additionalProps: {
      elevation,
      style: isPositioned ? void 0 : {
        opacity: 0
      }
    },
    ownerState
  });
  return /* @__PURE__ */ jsx(RootSlot, {
    ...rootProps,
    ...!isHostComponent(RootSlot) && {
      slots: rootSlotsProp,
      slotProps: rootSlotPropsProp,
      disableAutoFocus,
      disableScrollLock
    },
    children: /* @__PURE__ */ jsx(TransitionSlot, {
      ...transitionSlotProps,
      timeout: transitionDuration,
      children: /* @__PURE__ */ jsx(PaperSlot, {
        ...paperProps,
        children
      })
    })
  });
});
process.env.NODE_ENV !== "production" ? Popover.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: refType,
  /**
   * An HTML element, [PopoverVirtualElement](https://mui.com/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: chainPropTypes(PropTypes.oneOfType([HTMLElementType, PropTypes.func]), (props) => {
    if (props.open && (!props.anchorReference || props.anchorReference === "anchorEl")) {
      const resolvedAnchorEl = resolveAnchorEl(props.anchorEl);
      if (resolvedAnchorEl && resolvedAnchorEl.nodeType === 1) {
        const box = resolvedAnchorEl.getBoundingClientRect();
        if (process.env.NODE_ENV !== "production") {
          if (isLayoutSupported() && box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) {
            return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join("\n"));
          }
        }
      } else {
        return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", `It should be an Element or PopoverVirtualElement instance but it's \`${resolvedAnchorEl}\` instead.`].join("\n"));
      }
    }
    return null;
  }),
  /**
   * This is the point on the anchor where the popover's
   * `anchorEl` will attach to. This is not used when the
   * anchorReference is 'anchorPosition'.
   *
   * Options:
   * vertical: [top, center, bottom];
   * horizontal: [left, center, right].
   * @default {
   *   vertical: 'top',
   *   horizontal: 'left',
   * }
   */
  anchorOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOfType([PropTypes.oneOf(["center", "left", "right"]), PropTypes.number]).isRequired,
    vertical: PropTypes.oneOfType([PropTypes.oneOf(["bottom", "center", "top"]), PropTypes.number]).isRequired
  }),
  /**
   * This is the position that may be used to set the position of the popover.
   * The coordinates are relative to the application's client area.
   */
  anchorPosition: PropTypes.shape({
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired
  }),
  /**
   * This determines which anchor prop to refer to when setting
   * the position of the popover.
   * @default 'anchorEl'
   */
  anchorReference: PropTypes.oneOf(["anchorEl", "anchorPosition", "none"]),
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
   * An HTML element, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   *
   * By default, it uses the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes.oneOfType([HTMLElementType, PropTypes.func]),
  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: PropTypes.bool,
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: PropTypes.bool,
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: integerPropType,
  /**
   * Specifies how close to the edge of the window the popover can appear.
   * If null, the popover will not be constrained by the window.
   * @default 16
   */
  marginThreshold: PropTypes.number,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   */
  onClose: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    backdrop: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    paper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    transition: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    backdrop: PropTypes.elementType,
    paper: PropTypes.elementType,
    root: PropTypes.elementType,
    transition: PropTypes.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * This is the point on the popover which
   * will attach to the anchor's origin.
   *
   * Options:
   * vertical: [top, center, bottom, x(px)];
   * horizontal: [left, center, right, x(px)].
   * @default {
   *   vertical: 'top',
   *   horizontal: 'left',
   * }
   */
  transformOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOfType([PropTypes.oneOf(["center", "left", "right"]), PropTypes.number]).isRequired,
    vertical: PropTypes.oneOfType([PropTypes.oneOf(["bottom", "center", "top"]), PropTypes.number]).isRequired
  }),
  /**
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  transitionDuration: PropTypes.oneOfType([PropTypes.oneOf(["auto"]), PropTypes.number, PropTypes.shape({
    appear: PropTypes.number,
    enter: PropTypes.number,
    exit: PropTypes.number
  })])
} : void 0;
function getMenuUtilityClass(slot) {
  return generateUtilityClass("MuiMenu", slot);
}
generateUtilityClasses("MuiMenu", ["root", "paper", "list"]);
const RTL_ORIGIN = {
  vertical: "top",
  horizontal: "right"
};
const LTR_ORIGIN = {
  vertical: "top",
  horizontal: "left"
};
const useUtilityClasses$g = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  };
  return composeClasses(slots, getMenuUtilityClass, classes);
};
const MenuRoot = styled(Popover, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiMenu",
  slot: "Root"
})({});
const MenuPaper = styled(PopoverPaper, {
  name: "MuiMenu",
  slot: "Paper"
})({
  // specZ: The maximum height of a simple menu should be one or more rows less than the view
  // height. This ensures a tappable area outside of the simple menu with which to dismiss
  // the menu.
  maxHeight: "calc(100% - 96px)",
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: "touch"
});
const MenuMenuList = styled(MenuList, {
  name: "MuiMenu",
  slot: "List"
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
});
const Menu = /* @__PURE__ */ React.forwardRef(function Menu2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiMenu"
  });
  const {
    autoFocus = true,
    children,
    className,
    disableAutoFocusItem = false,
    onClose,
    open,
    PopoverClasses,
    transitionDuration = "auto",
    variant = "selectedMenu",
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const isRtl = useRtl();
  const ownerState = {
    ...props,
    autoFocus,
    disableAutoFocusItem,
    transitionDuration,
    variant
  };
  const classes = useUtilityClasses$g(ownerState);
  const shouldManageInitialFocus = autoFocus && open;
  const shouldAutoFocusActiveItem = shouldManageInitialFocus && !disableAutoFocusItem;
  const menuListActionsRef = React.useRef(null);
  const handleEntering = (element, _isAppearing) => {
    if (menuListActionsRef.current) {
      menuListActionsRef.current.adjustStyleForScrollbar(element, {
        direction: isRtl ? "rtl" : "ltr"
      });
      if (shouldManageInitialFocus) {
        menuListActionsRef.current.focusInitialTarget?.();
      }
    }
  };
  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      if (onClose) {
        onClose(event, "tabKeyDown");
      }
    }
  };
  const externalForwardedProps = {
    slots,
    slotProps
  };
  const rootSlotProps = useSlotProps({
    elementType: slots.root,
    externalSlotProps: slotProps.root,
    ownerState,
    className: [classes.root, className]
  });
  const [PaperSlot, paperSlotProps] = useSlot("paper", {
    className: classes.paper,
    elementType: MenuPaper,
    externalForwardedProps,
    shouldForwardComponentProp: true,
    ownerState
  });
  const [ListSlot, listSlotProps] = useSlot("list", {
    className: classes.list,
    elementType: MenuMenuList,
    shouldForwardComponentProp: true,
    externalForwardedProps,
    getSlotProps: (handlers) => ({
      ...handlers,
      onKeyDown: (event) => {
        handleListKeyDown(event);
        handlers.onKeyDown?.(event);
      }
    }),
    ownerState
  });
  const resolvedTransitionProps = typeof slotProps.transition === "function" ? slotProps.transition(ownerState) : slotProps.transition;
  return /* @__PURE__ */ jsx(
    MenuRoot,
    {
      disableAutoFocus: autoFocus,
      onClose,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: isRtl ? "right" : "left"
      },
      transformOrigin: isRtl ? RTL_ORIGIN : LTR_ORIGIN,
      slots: {
        root: slots.root,
        paper: PaperSlot,
        backdrop: slots.backdrop,
        transition: slots.transition
      },
      slotProps: {
        root: rootSlotProps,
        paper: paperSlotProps,
        backdrop: typeof slotProps.backdrop === "function" ? slotProps.backdrop(ownerState) : slotProps.backdrop,
        transition: {
          ...resolvedTransitionProps,
          onEntering: (...args) => {
            handleEntering(...args);
            resolvedTransitionProps?.onEntering?.(...args);
          }
        }
      },
      open,
      ref,
      transitionDuration,
      ownerState,
      ...other,
      classes: PopoverClasses,
      children: /* @__PURE__ */ jsx(ListSlot, {
        actions: menuListActionsRef,
        autoFocus: shouldManageInitialFocus,
        autoFocusItem: shouldAutoFocusActiveItem,
        variant,
        ...listSlotProps,
        children
      })
    }
  );
});
process.env.NODE_ENV !== "production" ? Menu.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: PropTypes.oneOfType([HTMLElementType, PropTypes.func]),
  /**
   * If `true` (Default) will focus the `[role="menu"]` if no focusable child is found. Disabled
   * children are not focusable. If you set this prop to `false` focus will be placed
   * on the parent modal container. This has severe accessibility implications
   * and should only be considered if you manage focus otherwise.
   * @default true
   */
  autoFocus: PropTypes.bool,
  /**
   * Menu contents, normally `MenuItem`s.
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
   * When opening the menu will not focus the active item but the `[role="menu"]`
   * unless `autoFocus` is also set to `false`. Not using the default means not
   * following WAI-ARIA authoring practices. Please be considerate about possible
   * accessibility implications.
   * @default false
   */
  disableAutoFocusItem: PropTypes.bool,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`, `"tabKeyDown"`.
   */
  onClose: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,
  /**
   * `classes` prop applied to the [`Popover`](https://mui.com/material-ui/api/popover/) element.
   */
  PopoverClasses: PropTypes.object,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    backdrop: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    list: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    paper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    transition: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    backdrop: PropTypes.elementType,
    list: PropTypes.elementType,
    paper: PropTypes.elementType,
    root: PropTypes.elementType,
    transition: PropTypes.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The length of the transition in `ms`, or 'auto'
   * @default 'auto'
   */
  transitionDuration: PropTypes.oneOfType([PropTypes.oneOf(["auto"]), PropTypes.number, PropTypes.shape({
    appear: PropTypes.number,
    enter: PropTypes.number,
    exit: PropTypes.number
  })]),
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus.
   * @default 'selectedMenu'
   */
  variant: PropTypes.oneOf(["menu", "selectedMenu"])
} : void 0;
const overridesResolver = (props, styles2) => {
  const {
    ownerState
  } = props;
  return [styles2.root, ownerState.dense && styles2.dense, ownerState.divider && styles2.divider, !ownerState.disableGutters && styles2.gutters];
};
const useUtilityClasses$f = (ownerState) => {
  const {
    disabled,
    dense,
    divider,
    disableGutters,
    selected,
    classes
  } = ownerState;
  const slots = {
    root: ["root", dense && "dense", disabled && "disabled", !disableGutters && "gutters", divider && "divider", selected && "selected"]
  };
  const composedClasses = composeClasses(slots, getMenuItemUtilityClass, classes);
  return {
    ...classes,
    ...composedClasses
  };
};
const MenuItemRoot = styled(ButtonBase, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiMenuItem",
  slot: "Root",
  overridesResolver
})(memoTheme(({
  theme
}) => ({
  ...theme.typography.body1,
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  position: "relative",
  textDecoration: "none",
  minHeight: 48,
  paddingTop: 6,
  paddingBottom: 6,
  boxSizing: "border-box",
  whiteSpace: "nowrap",
  "&:hover": {
    textDecoration: "none",
    backgroundColor: (theme.vars || theme).palette.action.hover,
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  },
  [`&.${menuItemClasses.selected}`]: {
    backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, (theme.vars || theme).palette.action.selectedOpacity),
    [`&.${menuItemClasses.focusVisible}`]: {
      backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.focusOpacity}`)
    }
  },
  [`&.${menuItemClasses.selected}:hover`]: {
    backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.hoverOpacity}`),
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, (theme.vars || theme).palette.action.selectedOpacity)
    }
  },
  [`&.${menuItemClasses.focusVisible}`]: {
    backgroundColor: (theme.vars || theme).palette.action.focus
  },
  [`&.${menuItemClasses.disabled}`]: {
    opacity: (theme.vars || theme).palette.action.disabledOpacity
  },
  [`& + .${dividerClasses.root}`]: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  [`& + .${dividerClasses.inset}`]: {
    marginLeft: 52
  },
  [`& .${listItemTextClasses.root}`]: {
    marginTop: 0,
    marginBottom: 0
  },
  [`& .${listItemTextClasses.inset}`]: {
    paddingLeft: 36
  },
  [`& .${listItemIconClasses.root}`]: {
    minWidth: 36
  },
  variants: [{
    props: ({
      ownerState
    }) => !ownerState.disableGutters,
    style: {
      paddingLeft: 16,
      paddingRight: 16
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.divider,
    style: {
      borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
      backgroundClip: "padding-box"
    }
  }, {
    props: ({
      ownerState
    }) => !ownerState.dense,
    style: {
      [theme.breakpoints.up("sm")]: {
        minHeight: "auto"
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.dense,
    style: {
      minHeight: 32,
      // https://m2.material.io/components/menus#specs > Dense
      paddingTop: 4,
      paddingBottom: 4,
      ...theme.typography.body2,
      [`& .${listItemIconClasses.root} svg`]: {
        fontSize: "1.25rem"
      }
    }
  }]
})));
const MenuItem = /* @__PURE__ */ React.forwardRef(function MenuItem2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiMenuItem"
  });
  const {
    autoFocus: shouldAutoFocusOnMount = false,
    component = "li",
    dense = false,
    divider = false,
    disableGutters = false,
    focusVisibleClassName,
    role = "menuitem",
    tabIndex: tabIndexProp,
    className,
    ...other
  } = props;
  const focusSource = useSelectFocusSource();
  const context = React.useContext(ListContext);
  const childContext = React.useMemo(() => ({
    dense: dense || context.dense || false,
    disableGutters
  }), [context.dense, dense, disableGutters]);
  const menuListContext = useMenuListContext();
  const rovingItemId = useId();
  const suppressFocusVisible = menuListContext.suppressInitialFocusVisible;
  const itemsFocusableWhenDisabled = menuListContext.itemsFocusableWhenDisabled;
  const menuItemRef = React.useRef(null);
  useEnhancedEffect(() => {
    if (shouldAutoFocusOnMount) {
      if (menuItemRef.current) {
        focusWithVisible(menuItemRef.current, focusSource);
      } else if (process.env.NODE_ENV !== "production") {
        console.error("MUI: Unable to set focus to a MenuItem whose component has not been rendered.");
      }
    }
  }, [shouldAutoFocusOnMount]);
  const ownerState = {
    ...props,
    dense: childContext.dense,
    divider,
    disableGutters
  };
  const classes = useUtilityClasses$f(props);
  const {
    root: root2,
    ...forwardedClasses
  } = classes;
  const rovingItemProps = useRovingTabIndexItem({
    id: rovingItemId,
    ref,
    disabled: props.disabled,
    focusableWhenDisabled: itemsFocusableWhenDisabled,
    selected: props.selected
  });
  const handleRef = useForkRef(menuItemRef, rovingItemProps.ref);
  let tabIndex;
  if (tabIndexProp !== void 0) {
    tabIndex = tabIndexProp;
  } else if (menuListContext.variant === "selectedMenu") {
    tabIndex = rovingItemProps.tabIndex;
  } else if (!props.disabled || itemsFocusableWhenDisabled) {
    tabIndex = -1;
  }
  return /* @__PURE__ */ jsx(ListContext.Provider, {
    value: childContext,
    children: /* @__PURE__ */ jsx(MenuItemRoot, {
      ref: handleRef,
      role,
      tabIndex,
      component,
      internalNativeButton: false,
      focusableWhenDisabled: itemsFocusableWhenDisabled,
      suppressFocusVisible,
      focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
      className: clsx(classes.root, className),
      ...other,
      ownerState,
      classes: forwardedClasses
    })
  });
});
process.env.NODE_ENV !== "production" ? MenuItem.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the list item is focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   */
  autoFocus: PropTypes.bool,
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent Menu component.
   * @default false
   */
  dense: PropTypes.bool,
  /**
   * @ignore
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the menu item.
   * @default false
   */
  divider: PropTypes.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * @ignore
   */
  role: PropTypes.string,
  /**
   * If `true`, the component is selected.
   * @default false
   */
  selected: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * @default 0
   */
  tabIndex: PropTypes.number
} : void 0;
const useUtilityClasses$e = (ownerState) => {
  const {
    classes,
    variant,
    disabled,
    multiple,
    open,
    error
  } = ownerState;
  const slots = {
    select: ["select", variant, disabled && "disabled", multiple && "multiple", error && "error"],
    icon: ["icon", `icon${capitalize(variant)}`, open && "iconOpen", disabled && "disabled"]
  };
  return composeClasses(slots, getNativeSelectUtilityClasses, classes);
};
const StyledSelectSelect = styled("select", {
  name: "MuiNativeSelect"
})(({
  theme
}) => ({
  // Reset
  MozAppearance: "none",
  // Reset
  WebkitAppearance: "none",
  // When interacting quickly, the text can end up selected.
  // Native select can't be selected either.
  userSelect: "none",
  // Reset
  borderRadius: 0,
  cursor: "pointer",
  "&:focus": {
    // Reset Chrome style
    borderRadius: 0
  },
  [`&.${nativeSelectClasses.disabled}`]: {
    cursor: "default"
  },
  "&[multiple]": {
    height: "auto"
  },
  "&:not([multiple]) option, &:not([multiple]) optgroup": {
    backgroundColor: (theme.vars || theme).palette.background.paper
  },
  variants: [{
    props: ({
      ownerState
    }) => ownerState.variant !== "filled" && ownerState.variant !== "outlined",
    style: {
      // Bump specificity to allow extending custom inputs
      "&&&": {
        paddingRight: 24,
        minWidth: 16
        // So it doesn't collapse.
      }
    }
  }, {
    props: {
      variant: "filled"
    },
    style: {
      "&&&": {
        paddingRight: 32
      }
    }
  }, {
    props: {
      variant: "outlined"
    },
    style: {
      borderRadius: (theme.vars || theme).shape.borderRadius,
      "&:focus": {
        borderRadius: (theme.vars || theme).shape.borderRadius
        // Reset the reset for Chrome style
      },
      "&&&": {
        paddingRight: 32
      }
    }
  }]
}));
const NativeSelectSelect = styled(StyledSelectSelect, {
  name: "MuiNativeSelect",
  slot: "Select",
  shouldForwardProp: rootShouldForwardProp,
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.select, styles2[ownerState.variant], ownerState.error && styles2.error, {
      [`&.${nativeSelectClasses.multiple}`]: styles2.multiple
    }];
  }
})({});
const StyledSelectIcon = styled("svg", {
  name: "MuiNativeSelect"
})(({
  theme
}) => ({
  // We use a position absolute over a flexbox in order to forward the pointer events
  // to the input and to support wrapping tags..
  position: "absolute",
  right: 0,
  // Center vertically, height is 1em
  top: "calc(50% - .5em)",
  // Don't block pointer events on the select under the icon.
  pointerEvents: "none",
  color: (theme.vars || theme).palette.action.active,
  [`&.${nativeSelectClasses.disabled}`]: {
    color: (theme.vars || theme).palette.action.disabled
  },
  variants: [{
    props: ({
      ownerState
    }) => ownerState.open,
    style: {
      transform: "rotate(180deg)"
    }
  }, {
    props: {
      variant: "filled"
    },
    style: {
      right: 7
    }
  }, {
    props: {
      variant: "outlined"
    },
    style: {
      right: 7
    }
  }]
}));
const NativeSelectIcon = styled(StyledSelectIcon, {
  name: "MuiNativeSelect",
  slot: "Icon",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.icon, ownerState.variant && styles2[`icon${capitalize(ownerState.variant)}`], ownerState.open && styles2.iconOpen];
  }
})({});
const NativeSelectInput = /* @__PURE__ */ React.forwardRef(function NativeSelectInput2(props, ref) {
  const {
    className,
    disabled,
    error,
    IconComponent,
    inputRef,
    variant = "standard",
    ...other
  } = props;
  const ownerState = {
    ...props,
    disabled,
    variant,
    error
  };
  const classes = useUtilityClasses$e(ownerState);
  return /* @__PURE__ */ jsxs(React.Fragment, {
    children: [/* @__PURE__ */ jsx(NativeSelectSelect, {
      ownerState,
      className: clsx(classes.select, className),
      disabled,
      ref: inputRef || ref,
      ...other
    }), props.multiple ? null : /* @__PURE__ */ jsx(NativeSelectIcon, {
      as: IconComponent,
      ownerState,
      className: classes.icon
    })]
  });
});
process.env.NODE_ENV !== "production" ? NativeSelectInput.propTypes = {
  /**
   * The option elements to populate the select with.
   * Can be some `<option>` elements.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The CSS class name of the select element.
   */
  className: PropTypes.string,
  /**
   * If `true`, the select is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the `select input` will indicate an error.
   */
  error: PropTypes.bool,
  /**
   * The icon that displays the arrow.
   */
  IconComponent: PropTypes.elementType.isRequired,
  /**
   * Use that prop to pass a ref to the native select element.
   * @deprecated
   */
  inputRef: refType,
  /**
   * @ignore
   */
  multiple: PropTypes.bool,
  /**
   * Name attribute of the `select` or hidden `input` element.
   */
  name: PropTypes.string,
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,
  /**
   * The input value.
   */
  value: PropTypes.any,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(["standard", "outlined", "filled"])
} : void 0;
var _span$1;
const NotchedOutlineRoot$1 = styled("fieldset", {
  name: "MuiNotchedOutlined",
  shouldForwardProp: rootShouldForwardProp
})({
  textAlign: "left",
  position: "absolute",
  bottom: 0,
  right: 0,
  top: -5,
  left: 0,
  margin: 0,
  padding: "0 8px",
  pointerEvents: "none",
  borderRadius: "inherit",
  borderStyle: "solid",
  borderWidth: 1,
  overflow: "hidden",
  minWidth: "0%"
});
const NotchedOutlineLegend = styled("legend", {
  name: "MuiNotchedOutlined",
  shouldForwardProp: rootShouldForwardProp
})(memoTheme(({
  theme
}) => ({
  float: "unset",
  // Fix conflict with bootstrap
  width: "auto",
  // Fix conflict with bootstrap
  overflow: "hidden",
  // Fix Horizontal scroll when label too long
  variants: [{
    props: ({
      ownerState
    }) => !ownerState.withLabel,
    style: {
      padding: 0,
      lineHeight: "11px",
      // sync with `height` in `legend` styles
      ...getTransitionStyles(theme, "width", {
        duration: 150,
        easing: theme.transitions.easing.easeOut
      })
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.withLabel,
    style: {
      display: "block",
      // Fix conflict with normalize.css and sanitize.css
      padding: 0,
      height: 11,
      // sync with `lineHeight` in `legend` styles
      fontSize: "0.75em",
      visibility: "hidden",
      maxWidth: 0.01,
      ...getTransitionStyles(theme, "max-width", {
        duration: 50,
        easing: theme.transitions.easing.easeOut
      }),
      whiteSpace: "nowrap",
      "& > span": {
        paddingLeft: 5,
        paddingRight: 5,
        display: "inline-block",
        opacity: 0,
        visibility: "visible"
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.withLabel && ownerState.notched,
    style: {
      maxWidth: "100%",
      ...getTransitionStyles(theme, "max-width", {
        duration: 100,
        easing: theme.transitions.easing.easeOut,
        delay: 50
      })
    }
  }]
})));
function NotchedOutline(props) {
  const {
    children,
    classes,
    className,
    label,
    notched,
    ...other
  } = props;
  const withLabel = label != null && label !== "";
  const ownerState = {
    ...props,
    notched,
    withLabel
  };
  return /* @__PURE__ */ jsx(NotchedOutlineRoot$1, {
    "aria-hidden": true,
    className,
    ownerState,
    ...other,
    children: /* @__PURE__ */ jsx(NotchedOutlineLegend, {
      ownerState,
      children: withLabel ? /* @__PURE__ */ jsx("span", {
        children: label
      }) : (
        // notranslate needed while Google Translate will not fix zero-width space issue
        _span$1 || (_span$1 = /* @__PURE__ */ jsx("span", {
          className: "notranslate",
          "aria-hidden": true,
          children: "​"
        }))
      )
    })
  });
}
process.env.NODE_ENV !== "production" ? NotchedOutline.propTypes = {
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
   * The label.
   */
  label: PropTypes.node,
  /**
   * If `true`, the outline is notched to accommodate the label.
   */
  notched: PropTypes.bool.isRequired,
  /**
   * @ignore
   */
  style: PropTypes.object
} : void 0;
const useUtilityClasses$d = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    notchedOutline: ["notchedOutline"],
    input: ["input"]
  };
  const composedClasses = composeClasses(slots, getOutlinedInputUtilityClass, classes);
  return {
    ...classes,
    // forward classes to the InputBase
    ...composedClasses
  };
};
const OutlinedInputRoot = styled(InputBaseRoot, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiOutlinedInput",
  slot: "Root",
  overridesResolver: rootOverridesResolver
})(memoTheme(({
  theme
}) => {
  const borderColor = theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
  return {
    position: "relative",
    borderRadius: (theme.vars || theme).shape.borderRadius,
    [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: (theme.vars || theme).palette.text.primary
    },
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: theme.vars ? theme.alpha(theme.vars.palette.common.onBackground, 0.23) : borderColor
      }
    },
    [`&.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
      borderWidth: 2
    },
    variants: [...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
      props: {
        color
      },
      style: {
        [`&.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: (theme.vars || theme).palette[color].main
        }
      }
    })), {
      props: {},
      // to override the above style
      style: {
        [`&.${outlinedInputClasses.error} .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: (theme.vars || theme).palette.error.main
        },
        [`&.${outlinedInputClasses.disabled} .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: (theme.vars || theme).palette.action.disabled
        }
      }
    }, {
      props: ({
        ownerState
      }) => ownerState.startAdornment,
      style: {
        paddingLeft: 14
      }
    }, {
      props: ({
        ownerState
      }) => ownerState.endAdornment,
      style: {
        paddingRight: 14
      }
    }, {
      props: ({
        ownerState
      }) => ownerState.multiline,
      style: {
        padding: "16.5px 14px"
      }
    }, {
      props: ({
        ownerState,
        size
      }) => ownerState.multiline && size === "small",
      style: {
        padding: "8.5px 14px"
      }
    }]
  };
}));
const NotchedOutlineRoot = styled(NotchedOutline, {
  name: "MuiOutlinedInput",
  slot: "NotchedOutline"
})(memoTheme(({
  theme
}) => {
  const borderColor = theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
  return {
    borderColor: theme.vars ? theme.alpha(theme.vars.palette.common.onBackground, 0.23) : borderColor
  };
}));
const OutlinedInputInput = styled(InputBaseInput, {
  name: "MuiOutlinedInput",
  slot: "Input",
  overridesResolver: inputOverridesResolver
})(memoTheme(({
  theme
}) => ({
  padding: "16.5px 14px",
  "&:-webkit-autofill": {
    ...!theme.vars && {
      WebkitBoxShadow: theme.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
      WebkitTextFillColor: theme.palette.mode === "light" ? null : "#fff",
      caretColor: theme.palette.mode === "light" ? null : "#fff"
    },
    borderRadius: "inherit",
    ...theme.vars && theme.applyStyles("dark", {
      WebkitBoxShadow: "0 0 0 100px #266798 inset",
      WebkitTextFillColor: "#fff",
      caretColor: "#fff"
    })
  },
  variants: [{
    props: {
      size: "small"
    },
    style: {
      padding: "8.5px 14px"
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.multiline,
    style: {
      padding: 0
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.startAdornment,
    style: {
      paddingLeft: 0
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.endAdornment,
    style: {
      paddingRight: 0
    }
  }]
})));
const OutlinedInput = /* @__PURE__ */ React.forwardRef(function OutlinedInput2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiOutlinedInput"
  });
  const {
    fullWidth = false,
    inputComponent = "input",
    label,
    multiline = false,
    notched,
    slots = {},
    slotProps = {},
    type = "text",
    ...other
  } = props;
  const classes = useUtilityClasses$d(props);
  const [fcs, muiFormControl] = useFormControlState({
    props,
    states: ["color", "disabled", "error", "focused", "hiddenLabel", "size", "required"]
  });
  const ownerState = {
    ...props,
    color: fcs.color || "primary",
    disabled: fcs.disabled,
    error: fcs.error,
    focused: fcs.focused,
    formControl: muiFormControl,
    fullWidth,
    hiddenLabel: fcs.hiddenLabel,
    multiline,
    size: fcs.size,
    type
  };
  const RootSlot = slots.root ?? OutlinedInputRoot;
  const InputSlot = slots.input ?? OutlinedInputInput;
  const [NotchedSlot, notchedProps] = useSlot("notchedOutline", {
    elementType: NotchedOutlineRoot,
    className: classes.notchedOutline,
    shouldForwardComponentProp: true,
    ownerState,
    externalForwardedProps: {
      slots,
      slotProps
    },
    additionalProps: {
      label: label != null && label !== "" && fcs.required ? /* @__PURE__ */ jsxs(React.Fragment, {
        children: [label, " ", "*"]
      }) : label
    }
  });
  return /* @__PURE__ */ jsx(InputBase, {
    slots: {
      root: RootSlot,
      input: InputSlot
    },
    slotProps,
    renderSuffix: (state) => /* @__PURE__ */ jsx(NotchedSlot, {
      ...notchedProps,
      notched: typeof notched !== "undefined" ? notched : Boolean(state.startAdornment || state.filled || state.focused)
    }),
    fullWidth,
    inputComponent,
    multiline,
    ref,
    type,
    ...other,
    classes: {
      ...classes,
      notchedOutline: null
    }
  });
});
process.env.NODE_ENV !== "production" ? OutlinedInput.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: PropTypes.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: PropTypes.oneOfType([PropTypes.oneOf(["primary", "secondary"]), PropTypes.string]),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: PropTypes.bool,
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: PropTypes.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   * @default 'input'
   */
  inputComponent: PropTypes.elementType,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#attributes) applied to the `input` element.
   * @default {}
   */
  inputProps: PropTypes.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,
  /**
   * The label of the `input`. It is only used for layout. The actual labelling
   * is handled by `InputLabel`.
   */
  label: PropTypes.node,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: PropTypes.oneOf(["dense", "none"]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * If `true`, a [TextareaAutosize](https://mui.com/material-ui/react-textarea-autosize/) element is rendered.
   * @default false
   */
  multiline: PropTypes.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * If `true`, the outline is notched to accommodate the label.
   */
  notched: PropTypes.bool,
  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: PropTypes.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: PropTypes.bool,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: PropTypes.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    input: PropTypes.object,
    notchedOutline: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.object
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    input: PropTypes.elementType,
    notchedOutline: PropTypes.elementType,
    root: PropTypes.elementType
  }),
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types).
   * @default 'text'
   */
  type: PropTypes.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: PropTypes.any
} : void 0;
OutlinedInput.muiName = "Input";
const RadioButtonUncheckedIcon = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
}), "RadioButtonUnchecked");
const RadioButtonCheckedIcon = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"
}), "RadioButtonChecked");
const RadioButtonIconRoot = styled("span", {
  name: "MuiRadioButtonIcon",
  shouldForwardProp: rootShouldForwardProp
})({
  position: "relative",
  display: "flex"
});
const RadioButtonIconBackground = styled(RadioButtonUncheckedIcon, {
  name: "MuiRadioButtonIcon"
})({
  // Scale applied to prevent dot misalignment in Safari
  transform: "scale(1)"
});
const RadioButtonIconDot = styled(RadioButtonCheckedIcon, {
  name: "MuiRadioButtonIcon"
})(memoTheme(({
  theme
}) => ({
  left: 0,
  position: "absolute",
  transform: "scale(0)",
  ...getTransitionStyles(theme, "transform", {
    easing: theme.transitions.easing.easeIn,
    duration: theme.transitions.duration.shortest
  }),
  variants: [{
    props: {
      checked: true
    },
    style: {
      transform: "scale(1)",
      ...getTransitionStyles(theme, "transform", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shortest
      })
    }
  }]
})));
function RadioButtonIcon(props) {
  const {
    checked = false,
    classes = {},
    fontSize
  } = props;
  const ownerState = {
    ...props,
    checked
  };
  return /* @__PURE__ */ jsxs(RadioButtonIconRoot, {
    className: classes.root,
    ownerState,
    children: [/* @__PURE__ */ jsx(RadioButtonIconBackground, {
      fontSize,
      className: classes.background,
      ownerState
    }), /* @__PURE__ */ jsx(RadioButtonIconDot, {
      fontSize,
      className: classes.dot,
      ownerState
    })]
  });
}
process.env.NODE_ENV !== "production" ? RadioButtonIcon.propTypes = {
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The size of the component.
   * `small` is equivalent to the dense radio styling.
   */
  fontSize: PropTypes.oneOf(["small", "medium"])
} : void 0;
const RadioGroupContext = /* @__PURE__ */ React.createContext(void 0);
if (process.env.NODE_ENV !== "production") {
  RadioGroupContext.displayName = "RadioGroupContext";
}
function useRadioGroup() {
  return React.useContext(RadioGroupContext);
}
const useUtilityClasses$c = (ownerState) => {
  const {
    classes,
    color,
    size
  } = ownerState;
  const slots = {
    root: ["root", `color${capitalize(color)}`, size !== "medium" && `size${capitalize(size)}`]
  };
  return {
    ...classes,
    ...composeClasses(slots, getRadioUtilityClass, classes)
  };
};
const RadioRoot = styled(SwitchBase, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiRadio",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.size !== "medium" && styles2[`size${capitalize(ownerState.size)}`], styles2[`color${capitalize(ownerState.color)}`]];
  }
})(memoTheme(({
  theme
}) => ({
  color: (theme.vars || theme).palette.text.secondary,
  [`&.${radioClasses.disabled}`]: {
    color: (theme.vars || theme).palette.action.disabled
  },
  variants: [{
    props: {
      color: "default",
      disabled: false,
      disableRipple: false
    },
    style: {
      "&:hover": {
        backgroundColor: theme.alpha((theme.vars || theme).palette.action.active, (theme.vars || theme).palette.action.hoverOpacity)
      }
    }
  }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
    props: {
      color,
      disabled: false,
      disableRipple: false
    },
    style: {
      "&:hover": {
        backgroundColor: theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.hoverOpacity)
      }
    }
  })), ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
    props: {
      color,
      disabled: false
    },
    style: {
      [`&.${radioClasses.checked}`]: {
        color: (theme.vars || theme).palette[color].main
      }
    }
  })), {
    // Should be last to override other colors
    props: {
      disableRipple: false
    },
    style: {
      // Reset on touch devices, it doesn't add specificity
      "&:hover": {
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      }
    }
  }]
})));
function areEqualValues(a, b) {
  if (typeof b === "object" && b !== null) {
    return a === b;
  }
  return String(a) === String(b);
}
const defaultCheckedIcon = /* @__PURE__ */ jsx(RadioButtonIcon, {
  checked: true
});
const defaultIcon = /* @__PURE__ */ jsx(RadioButtonIcon, {});
const Radio = /* @__PURE__ */ React.forwardRef(function Radio2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiRadio"
  });
  const {
    checked: checkedProp,
    checkedIcon = defaultCheckedIcon,
    color = "primary",
    icon = defaultIcon,
    name: nameProp,
    onChange: onChangeProp,
    size = "medium",
    className,
    disabled: disabledProp,
    disableRipple = false,
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const muiFormControl = useFormControl();
  let disabled = disabledProp;
  if (muiFormControl) {
    if (typeof disabled === "undefined") {
      disabled = muiFormControl.disabled;
    }
  }
  disabled ??= false;
  const ownerState = {
    ...props,
    disabled,
    disableRipple,
    color,
    size
  };
  const classes = useUtilityClasses$c(ownerState);
  const radioGroup = useRadioGroup();
  let checked = checkedProp;
  const onChange = createChainedFunction(onChangeProp, radioGroup && radioGroup.onChange);
  let name = nameProp;
  if (radioGroup) {
    if (typeof checked === "undefined") {
      checked = areEqualValues(radioGroup.value, props.value);
    }
    if (typeof name === "undefined") {
      name = radioGroup.name;
    }
  }
  const externalInputProps = slotProps.input;
  const [RootSlot, rootSlotProps] = useSlot("root", {
    ref,
    elementType: RadioRoot,
    className: clsx(classes.root, className),
    shouldForwardComponentProp: true,
    externalForwardedProps: {
      slots,
      slotProps,
      ...other
    },
    getSlotProps: (handlers) => ({
      ...handlers,
      onChange: (event, ...args) => {
        handlers.onChange?.(event, ...args);
        onChange(event, ...args);
      }
    }),
    ownerState,
    additionalProps: {
      type: "radio",
      icon: /* @__PURE__ */ React.cloneElement(icon, {
        fontSize: icon.props.fontSize ?? size
      }),
      checkedIcon: /* @__PURE__ */ React.cloneElement(checkedIcon, {
        fontSize: checkedIcon.props.fontSize ?? size
      }),
      disabled,
      name,
      checked,
      slots,
      slotProps: {
        // Do not forward `slotProps.root` again because it's already handled by the `RootSlot` in this file.
        input: typeof externalInputProps === "function" ? externalInputProps(ownerState) : externalInputProps
      }
    }
  });
  return /* @__PURE__ */ jsx(RootSlot, {
    ...rootSlotProps,
    classes
  });
});
process.env.NODE_ENV !== "production" ? Radio.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * The icon to display when the component is checked.
   * @default <RadioButtonIcon checked />
   */
  checkedIcon: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes.oneOfType([PropTypes.oneOf(["default", "primary", "secondary", "error", "info", "success", "warning"]), PropTypes.string]),
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * The icon to display when the component is unchecked.
   * @default <RadioButtonIcon />
   */
  icon: PropTypes.node,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * If `true`, the `input` element is required.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * The size of the component.
   * `small` is equivalent to the dense radio styling.
   * @default 'medium'
   */
  size: PropTypes.oneOfType([PropTypes.oneOf(["medium", "small"]), PropTypes.string]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    input: PropTypes.elementType,
    root: PropTypes.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The value of the component. The DOM API casts this to a string.
   */
  value: PropTypes.any
} : void 0;
function getRadioGroupUtilityClass(slot) {
  return generateUtilityClass("MuiRadioGroup", slot);
}
generateUtilityClasses("MuiRadioGroup", ["root", "row", "error"]);
const useUtilityClasses$b = (props) => {
  const {
    classes,
    row,
    error
  } = props;
  const slots = {
    root: ["root", row && "row", error && "error"]
  };
  return composeClasses(slots, getRadioGroupUtilityClass, classes);
};
const RadioGroup = /* @__PURE__ */ React.forwardRef(function RadioGroup2(props, ref) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions,
    children,
    className,
    defaultValue,
    name: nameProp,
    onChange,
    value: valueProp,
    ...other
  } = props;
  const rootRef = React.useRef(null);
  const classes = useUtilityClasses$b(props);
  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: "RadioGroup"
  });
  React.useImperativeHandle(actions, () => ({
    focus: () => {
      let input = rootRef.current.querySelector("input:not(:disabled):checked");
      if (!input) {
        input = rootRef.current.querySelector("input:not(:disabled)");
      }
      if (input) {
        input.focus();
      }
    }
  }), []);
  const handleRef = useForkRef(ref, rootRef);
  const name = useId(nameProp);
  const contextValue = React.useMemo(() => ({
    name,
    onChange(event) {
      setValueState(event.target.value);
      if (onChange) {
        onChange(event, event.target.value);
      }
    },
    value
  }), [name, onChange, setValueState, value]);
  return /* @__PURE__ */ jsx(RadioGroupContext.Provider, {
    value: contextValue,
    children: /* @__PURE__ */ jsx(FormGroup, {
      role: "radiogroup",
      ref: handleRef,
      className: clsx(classes.root, className),
      ...other,
      children
    })
  });
});
process.env.NODE_ENV !== "production" ? RadioGroup.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * The name used to reference the value of the control.
   * If you don't provide this prop, it falls back to a randomly generated name.
   */
  name: PropTypes.string,
  /**
   * Callback fired when a radio button is selected.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * @param {string} value The value of the selected radio button.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,
  /**
   * Value of the selected radio button. The DOM API casts this to a string.
   */
  value: PropTypes.any
} : void 0;
function getSelectUtilityClasses(slot) {
  return generateUtilityClass("MuiSelect", slot);
}
const selectClasses = generateUtilityClasses("MuiSelect", ["root", "select", "multiple", "filled", "outlined", "standard", "disabled", "focused", "icon", "iconOpen", "nativeInput", "error"]);
function hasOwnValueProp(child) {
  return Object.prototype.hasOwnProperty.call(child.props, "value");
}
function getTextFromReactNode(node) {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  let text = "";
  React.Children.forEach(node, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      text += String(child);
    } else if (/* @__PURE__ */ React.isValidElement(child)) {
      text += getTextFromReactNode(child.props.children);
    }
  });
  return text;
}
function getMatchingOptionIndex(options, search, startIndex = 0) {
  if (options.length === 0) {
    return -1;
  }
  const normalizedStartIndex = (startIndex % options.length + options.length) % options.length;
  for (let offset = 0; offset < options.length; offset += 1) {
    const index = (normalizedStartIndex + offset) % options.length;
    if (options[index].label.startsWith(search)) {
      return index;
    }
  }
  return -1;
}
function canCycleRepeatedCharacter(options, key) {
  return !options.some((option) => option.label[0] === key && option.label[1] === key);
}
function getTypeaheadOptions(childrenArray, value) {
  const options = [];
  let selectedIndex = -1;
  for (let index = 0; index < childrenArray.length; index += 1) {
    const child = childrenArray[index];
    if (!/* @__PURE__ */ React.isValidElement(child) || !hasOwnValueProp(child) || child.props.disabled) {
      continue;
    }
    const label = getTextFromReactNode(child.props.children).trim().toLowerCase();
    if (label === "") {
      continue;
    }
    if (selectedIndex === -1 && areEqualValues$1(value, child.props.value)) {
      selectedIndex = options.length;
    }
    options.push({
      child,
      label,
      value: child.props.value
    });
  }
  return {
    options,
    selectedIndex
  };
}
var _span;
const OPENING_MOUSE_UP_BOUNDARY_OFFSET = 2;
const SELECTED_MOUSE_UP_DELAY = 400;
const UNSELECTED_MOUSE_UP_DELAY = 200;
const TYPEAHEAD_RESET_MS = 750;
const SPACE = " ";
const ARROW_UP = "ArrowUp";
const ARROW_DOWN = "ArrowDown";
const ENTER = "Enter";
function isMouseEventInsideElement(event, element) {
  if (!element) {
    return false;
  }
  const eventPath = event.composedPath();
  if (eventPath.includes(element)) {
    return true;
  }
  if (event.target?.nodeType && element.contains(event.target)) {
    return true;
  }
  const rect = element.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) {
    return false;
  }
  return event.clientX >= rect.left - OPENING_MOUSE_UP_BOUNDARY_OFFSET && event.clientX <= rect.right + OPENING_MOUSE_UP_BOUNDARY_OFFSET && event.clientY >= rect.top - OPENING_MOUSE_UP_BOUNDARY_OFFSET && event.clientY <= rect.bottom + OPENING_MOUSE_UP_BOUNDARY_OFFSET;
}
const SelectSelect = styled(StyledSelectSelect, {
  name: "MuiSelect",
  slot: "Select",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [
      // Win specificity over the input base
      {
        [`&.${selectClasses.select}`]: styles2.select
      },
      {
        [`&.${selectClasses.select}`]: styles2[ownerState.variant]
      },
      {
        [`&.${selectClasses.error}`]: styles2.error
      },
      {
        [`&.${selectClasses.multiple}`]: styles2.multiple
      }
    ];
  }
})({
  // Win specificity over the input base
  [`&.${selectClasses.select}`]: {
    height: "auto",
    // Resets for multiple select with chips
    minHeight: "1.4375em",
    // Required for select\text-field height consistency
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  }
});
const SelectIcon = styled(StyledSelectIcon, {
  name: "MuiSelect",
  slot: "Icon",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.icon, ownerState.open && styles2.iconOpen];
  }
})({});
const SelectNativeInput = styled("input", {
  shouldForwardProp: (prop) => slotShouldForwardProp(prop) && prop !== "classes",
  name: "MuiSelect",
  slot: "NativeInput"
})({
  bottom: 0,
  left: 0,
  position: "absolute",
  opacity: 0,
  pointerEvents: "none",
  width: "100%",
  boxSizing: "border-box"
});
const useUtilityClasses$a = (ownerState) => {
  const {
    classes,
    variant,
    disabled,
    multiple,
    open,
    error
  } = ownerState;
  const slots = {
    select: ["select", variant, disabled && "disabled", multiple && "multiple", error && "error"],
    icon: ["icon", open && "iconOpen", disabled && "disabled"],
    nativeInput: ["nativeInput"]
  };
  return composeClasses(slots, getSelectUtilityClasses, classes);
};
const SelectInput = /* @__PURE__ */ React.forwardRef(function SelectInput2(props, ref) {
  const {
    "aria-describedby": ariaDescribedby,
    "aria-label": ariaLabel,
    autoFocus,
    autoWidth,
    children,
    className,
    defaultOpen,
    defaultValue,
    disabled,
    displayEmpty,
    error = false,
    IconComponent,
    inputRef: inputRefProp,
    labelId,
    MenuProps = {},
    multiple,
    name,
    onBlur,
    onChange,
    onClose,
    onFocus,
    // eslint-disable-next-line react/prop-types
    onKeyDown,
    // eslint-disable-next-line react/prop-types
    onMouseDown,
    onOpen,
    open: openProp,
    readOnly,
    renderValue,
    required,
    SelectDisplayProps = {},
    tabIndex: tabIndexProp,
    // catching `type` from Input which makes no sense for SelectInput
    type,
    value: valueProp,
    variant = "standard",
    ...other
  } = props;
  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: "Select"
  });
  const [openState, setOpenState] = useControlled({
    controlled: openProp,
    default: defaultOpen,
    name: "Select"
  });
  const inputRef = React.useRef(null);
  const displayRef = React.useRef(null);
  const paperRef = React.useRef(null);
  const openRef = React.useRef(false);
  const hasSelectedItemInListRef = React.useRef(false);
  const openingMouseUpListenerCleanupRef = React.useRef(null);
  const didPointerDownOnItemRef = React.useRef(false);
  const selectionRef = React.useRef({
    allowSelectedMouseUp: false,
    allowUnselectedMouseUp: false
  });
  const closedTypeaheadRef = React.useRef({
    buffer: "",
    previousSearchIndex: null,
    matchedIndex: null
  });
  const selectedMouseUpTimer = useTimeout();
  const unselectedMouseUpTimer = useTimeout();
  const typeaheadResetTimer = useTimeout();
  const [displayNode, setDisplayNode] = React.useState(null);
  const {
    current: isOpenControlled
  } = React.useRef(openProp != null);
  const [menuMinWidthState, setMenuMinWidthState] = React.useState();
  const [openInteractionType, setOpenInteractionType] = React.useState(null);
  const handleRef = useForkRef(ref, inputRefProp);
  const handleDisplayRef = React.useCallback((node) => {
    displayRef.current = node;
    if (node) {
      setDisplayNode(node);
    }
  }, []);
  const anchorElement = displayNode?.parentNode;
  React.useImperativeHandle(handleRef, () => ({
    focus: () => {
      displayRef.current.focus();
    },
    node: inputRef.current,
    value
  }), [value]);
  const open = displayNode !== null && openState;
  const resetClosedTypeahead = React.useCallback(() => {
    typeaheadResetTimer.clear();
    closedTypeaheadRef.current.buffer = "";
    closedTypeaheadRef.current.previousSearchIndex = null;
    closedTypeaheadRef.current.matchedIndex = null;
  }, [typeaheadResetTimer]);
  useEnhancedEffect(() => {
    openRef.current = open;
    if (open) {
      resetClosedTypeahead();
    }
  }, [open, resetClosedTypeahead]);
  const clearSelectionTimers = React.useCallback(() => {
    selectedMouseUpTimer.clear();
    unselectedMouseUpTimer.clear();
  }, [selectedMouseUpTimer, unselectedMouseUpTimer]);
  const resetMouseUpSelection = React.useCallback(() => {
    clearSelectionTimers();
    didPointerDownOnItemRef.current = false;
    selectionRef.current = {
      allowSelectedMouseUp: false,
      allowUnselectedMouseUp: false
    };
  }, [clearSelectionTimers]);
  const clearOpeningMouseUpListener = React.useCallback(() => {
    if (openingMouseUpListenerCleanupRef.current) {
      openingMouseUpListenerCleanupRef.current();
      openingMouseUpListenerCleanupRef.current = null;
    }
  }, []);
  React.useEffect(() => {
    if (!open) {
      resetMouseUpSelection();
      clearOpeningMouseUpListener();
    }
  }, [open, resetMouseUpSelection, clearOpeningMouseUpListener]);
  React.useEffect(() => {
    return () => {
      resetMouseUpSelection();
      clearOpeningMouseUpListener();
      resetClosedTypeahead();
    };
  }, [resetMouseUpSelection, clearOpeningMouseUpListener, resetClosedTypeahead]);
  React.useEffect(() => {
    if (!open || !anchorElement || autoWidth) {
      return void 0;
    }
    if (typeof ResizeObserver === "undefined") {
      return void 0;
    }
    const observer = new ResizeObserver(() => {
      setMenuMinWidthState(anchorElement.clientWidth);
    });
    observer.observe(anchorElement);
    return () => {
      observer.disconnect();
    };
  }, [open, anchorElement, autoWidth]);
  React.useEffect(() => {
    if (defaultOpen && openState && displayNode && !isOpenControlled) {
      setMenuMinWidthState(autoWidth ? null : anchorElement.clientWidth);
      displayRef.current.focus();
    }
  }, [displayNode, autoWidth]);
  React.useEffect(() => {
    if (autoFocus) {
      displayRef.current.focus();
    }
  }, [autoFocus]);
  React.useEffect(() => {
    if (!labelId) {
      return void 0;
    }
    const label = ownerDocument(displayRef.current).getElementById(labelId);
    if (label) {
      const handler = () => {
        if (getSelection().isCollapsed) {
          displayRef.current.focus();
        }
      };
      label.addEventListener("click", handler);
      return () => {
        label.removeEventListener("click", handler);
      };
    }
    return void 0;
  }, [labelId]);
  const update = useEventCallback((openParam, event) => {
    if (!openParam) {
      resetMouseUpSelection();
      clearOpeningMouseUpListener();
    }
    if (openParam) {
      resetClosedTypeahead();
      setOpenInteractionType(getOpenInteractionType(event));
      if (onOpen) {
        onOpen(event);
      }
    } else {
      setOpenInteractionType(null);
      if (onClose) {
        onClose(event);
      }
    }
    if (!isOpenControlled) {
      openRef.current = openParam;
      setMenuMinWidthState(autoWidth ? null : anchorElement.clientWidth);
      setOpenState(openParam);
    }
  });
  const scheduleMouseUpSelection = () => {
    resetMouseUpSelection();
    if (!hasSelectedItemInListRef.current) {
      selectedMouseUpTimer.start(SELECTED_MOUSE_UP_DELAY, () => {
        selectionRef.current.allowSelectedMouseUp = true;
        selectionRef.current.allowUnselectedMouseUp = true;
      });
    } else {
      unselectedMouseUpTimer.start(UNSELECTED_MOUSE_UP_DELAY, () => {
        selectionRef.current.allowUnselectedMouseUp = true;
        selectedMouseUpTimer.start(UNSELECTED_MOUSE_UP_DELAY, () => {
          selectionRef.current.allowSelectedMouseUp = true;
        });
      });
    }
  };
  const handleMouseDown = (event) => {
    onMouseDown?.(event);
    if (event.button !== 0) {
      return;
    }
    event.preventDefault();
    displayRef.current.focus();
    const doc = ownerDocument(event.currentTarget);
    scheduleMouseUpSelection();
    clearOpeningMouseUpListener();
    const handleMouseUp = (mouseEvent) => {
      openingMouseUpListenerCleanupRef.current = null;
      if (!displayRef.current) {
        return;
      }
      if (isMouseEventInsideElement(mouseEvent, displayRef.current) || isMouseEventInsideElement(mouseEvent, paperRef.current)) {
        return;
      }
      if (!openRef.current && isOpenControlled) {
        return;
      }
      update(false, mouseEvent);
    };
    doc.addEventListener("mouseup", handleMouseUp, {
      capture: true,
      once: true
    });
    openingMouseUpListenerCleanupRef.current = () => {
      doc.removeEventListener("mouseup", handleMouseUp, true);
    };
    update(true, event);
  };
  const handleClose = (event) => {
    update(false, event);
  };
  const childrenArray = React.Children.toArray(children);
  const handleChange = (event) => {
    const child = childrenArray.find((childItem) => childItem.props.value === event.target.value);
    if (child === void 0) {
      return;
    }
    setValueState(child.props.value);
    if (onChange) {
      onChange(event, child);
    }
  };
  const handleValueChange = (event, child, newValue) => {
    setValueState(newValue);
    if (onChange) {
      const nativeEvent = event.nativeEvent || event;
      const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);
      Object.defineProperty(clonedEvent, "target", {
        writable: true,
        value: {
          value: newValue,
          name
        }
      });
      onChange(clonedEvent, child);
    }
  };
  const handleItemClick = (child) => (event) => {
    didPointerDownOnItemRef.current = false;
    let newValue;
    if (!event.currentTarget.hasAttribute("tabindex")) {
      return;
    }
    if (multiple) {
      newValue = Array.isArray(value) ? value.slice() : [];
      const itemIndex = value.indexOf(child.props.value);
      if (itemIndex === -1) {
        newValue.push(child.props.value);
      } else {
        newValue.splice(itemIndex, 1);
      }
    } else {
      newValue = child.props.value;
    }
    if (child.props.onClick) {
      child.props.onClick(event);
    }
    if (value !== newValue) {
      handleValueChange(event, child, newValue);
    }
    if (!multiple) {
      update(false, event);
    }
  };
  const handleItemMouseUp = (child, selected) => (event) => {
    child.props.onMouseUp?.(event);
    if (didPointerDownOnItemRef.current) {
      didPointerDownOnItemRef.current = false;
      return;
    }
    const disallowSelectedMouseUp = !selectionRef.current.allowSelectedMouseUp && selected;
    const disallowUnselectedMouseUp = !selectionRef.current.allowUnselectedMouseUp && !selected;
    if (disallowSelectedMouseUp || disallowUnselectedMouseUp) {
      return;
    }
    event.currentTarget.click();
  };
  const handleClosedTypeahead = (event) => {
    const state = closedTypeaheadRef.current;
    const hasActiveBuffer = state.buffer !== "";
    if (open || multiple || disabled || event.defaultPrevented || event.nativeEvent?.isComposing || event.key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey || event.key === SPACE && !hasActiveBuffer) {
      return false;
    }
    if (event.key === SPACE) {
      event.preventDefault();
    }
    const isNewSession = state.buffer === "";
    const {
      options: searchableOptions,
      selectedIndex
    } = getTypeaheadOptions(childrenArray, value);
    if (searchableOptions.length === 0) {
      if (event.key !== SPACE) {
        resetClosedTypeahead();
      }
      return true;
    }
    if (isNewSession) {
      state.previousSearchIndex = selectedIndex;
    }
    const key = event.key.toLowerCase();
    if (state.buffer === key && canCycleRepeatedCharacter(searchableOptions, key)) {
      state.buffer = "";
      state.previousSearchIndex = state.matchedIndex;
    }
    state.buffer += key;
    typeaheadResetTimer.start(TYPEAHEAD_RESET_MS, resetClosedTypeahead);
    const matchingIndex = getMatchingOptionIndex(searchableOptions, state.buffer, (state.previousSearchIndex ?? -1) + 1);
    if (matchingIndex !== -1) {
      const matchedOption = searchableOptions[matchingIndex];
      state.matchedIndex = matchingIndex;
      if (!areEqualValues$1(value, matchedOption.value)) {
        handleValueChange(event, matchedOption.child, matchedOption.value);
      }
      return true;
    }
    if (event.key !== SPACE) {
      resetClosedTypeahead();
    }
    return true;
  };
  const handleKeyDown = (event) => {
    if (!readOnly) {
      const isClosedTypeaheadHandled = handleClosedTypeahead(event);
      const isOpenKey = event.key === SPACE || event.key === ARROW_UP || event.key === ARROW_DOWN || event.key === ENTER;
      if (!isClosedTypeaheadHandled && isOpenKey) {
        event.preventDefault();
        update(true, event);
      }
      onKeyDown?.(event);
    }
  };
  const handleBlur = (event) => {
    resetClosedTypeahead();
    if (!open && onBlur) {
      Object.defineProperty(event, "target", {
        writable: true,
        value: {
          value,
          name
        }
      });
      onBlur(event);
    }
  };
  const handleItemKeyDown = (child) => (event) => {
    child?.props?.onKeyDown?.(event);
    if (event.key === SPACE && event.target === event.currentTarget && !event.defaultPrevented) {
      event.preventDefault();
      if (!event.repeat) {
        event.currentTarget.click();
      }
    }
  };
  delete other["aria-invalid"];
  let display;
  let displaySingle;
  const displayMultiple = [];
  let computeDisplay = false;
  let foundMatch = false;
  if (isFilled({
    value
  }) || displayEmpty) {
    if (renderValue) {
      display = renderValue(value);
    } else {
      computeDisplay = true;
    }
  }
  const items2 = childrenArray.map((child) => {
    if (!/* @__PURE__ */ React.isValidElement(child)) {
      return null;
    }
    if (process.env.NODE_ENV !== "production") {
      if (isFragment(child)) {
        console.error(["MUI: The Select component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join("\n"));
      }
    }
    let selected;
    if (multiple) {
      if (!Array.isArray(value)) {
        throw new Error(process.env.NODE_ENV !== "production" ? "MUI: The `value` prop must be an array when using the `Select` component with `multiple`." : _formatErrorMessage(2));
      }
      selected = value.some((v) => areEqualValues$1(v, child.props.value));
      if (selected && computeDisplay) {
        displayMultiple.push(child.props.children);
      }
    } else {
      selected = areEqualValues$1(value, child.props.value);
      if (selected && computeDisplay) {
        displaySingle = child.props.children;
      }
    }
    if (selected) {
      foundMatch = true;
    }
    return /* @__PURE__ */ React.cloneElement(child, {
      "aria-selected": selected ? "true" : "false",
      onMouseDown: (event) => {
        didPointerDownOnItemRef.current = true;
        child.props.onMouseDown?.(event);
      },
      onPointerDown: (event) => {
        didPointerDownOnItemRef.current = true;
        child.props.onPointerDown?.(event);
      },
      onClick: handleItemClick(child),
      onMouseUp: handleItemMouseUp(child, selected),
      onKeyUp: (event) => {
        if (event.key === SPACE) {
          event.preventDefault();
        }
        if (child.props.onKeyUp) {
          child.props.onKeyUp(event);
        }
      },
      onKeyDown: handleItemKeyDown(child),
      role: "option",
      selected,
      value: void 0,
      // The value is most likely not a valid HTML attribute.
      "data-value": child.props.value
      // Instead, we provide it as a data attribute.
    });
  });
  useEnhancedEffect(() => {
    hasSelectedItemInListRef.current = foundMatch;
    if (!open && !multiple && !foundMatch) {
      resetClosedTypeahead();
    }
  }, [foundMatch, multiple, open, resetClosedTypeahead]);
  if (process.env.NODE_ENV !== "production") {
    React.useEffect(() => {
      if (!foundMatch && !multiple && value !== "") {
        const values = childrenArray.map((child) => child.props.value);
        console.warn([`MUI: You have provided an out-of-range value \`${value}\` for the select ${name ? `(name="${name}") ` : ""}component.`, "Consider providing a value that matches one of the available options or ''.", `The available values are ${values.filter((x) => x != null).map((x) => `\`${x}\``).join(", ") || '""'}.`].join("\n"));
      }
    }, [foundMatch, childrenArray, multiple, name, value]);
  }
  if (computeDisplay) {
    if (multiple) {
      if (displayMultiple.length === 0) {
        display = null;
      } else {
        display = displayMultiple.reduce((output, child, index) => {
          output.push(child);
          if (index < displayMultiple.length - 1) {
            output.push(", ");
          }
          return output;
        }, []);
      }
    } else {
      display = displaySingle;
    }
  }
  let menuMinWidth = menuMinWidthState;
  if (!autoWidth && isOpenControlled && displayNode) {
    menuMinWidth = anchorElement.clientWidth;
  }
  let tabIndex;
  if (typeof tabIndexProp !== "undefined") {
    tabIndex = tabIndexProp;
  } else {
    tabIndex = disabled ? null : 0;
  }
  const buttonId = SelectDisplayProps.id || (name ? `mui-component-select-${name}` : void 0);
  const ownerState = {
    ...props,
    variant,
    value,
    open,
    error
  };
  const classes = useUtilityClasses$a(ownerState);
  const menuPaperSlotProps = typeof MenuProps.slotProps?.paper === "function" ? MenuProps.slotProps.paper(ownerState) : MenuProps.slotProps?.paper;
  const handlePaperRef = useForkRef(menuPaperSlotProps?.ref, paperRef);
  const menuListSlotProps = typeof MenuProps.slotProps?.list === "function" ? MenuProps.slotProps.list(ownerState) : MenuProps.slotProps?.list;
  const listboxId = useId();
  const nativeInputId = useId();
  return /* @__PURE__ */ jsxs(React.Fragment, {
    children: [/* @__PURE__ */ jsx(SelectSelect, {
      as: "div",
      ref: handleDisplayRef,
      tabIndex,
      role: "combobox",
      "aria-controls": open ? listboxId : void 0,
      "aria-disabled": disabled ? "true" : void 0,
      "aria-expanded": open ? "true" : "false",
      "aria-haspopup": "listbox",
      "aria-readonly": readOnly ? "true" : void 0,
      "aria-label": ariaLabel,
      "aria-labelledby": labelId,
      "aria-describedby": ariaDescribedby,
      "aria-required": required ? "true" : void 0,
      "aria-invalid": error ? "true" : void 0,
      onKeyDown: handleKeyDown,
      onMouseDown: disabled || readOnly ? null : handleMouseDown,
      onBlur: handleBlur,
      onFocus,
      ...SelectDisplayProps,
      ownerState,
      className: clsx(SelectDisplayProps.className, classes.select, className),
      id: buttonId,
      children: isEmpty(display) ? (
        // notranslate needed while Google Translate will not fix zero-width space issue
        _span || (_span = /* @__PURE__ */ jsx("span", {
          className: "notranslate",
          "aria-hidden": true,
          children: "​"
        }))
      ) : display
    }), /* @__PURE__ */ jsx(SelectNativeInput, {
      "aria-invalid": error,
      value: Array.isArray(value) ? value.join(",") : value,
      name,
      ref: inputRef,
      "aria-hidden": true,
      onChange: handleChange,
      tabIndex: -1,
      disabled,
      readOnly,
      className: classes.nativeInput,
      autoFocus,
      required,
      ...other,
      id: other.id ?? nativeInputId,
      ownerState
    }), /* @__PURE__ */ jsx(SelectIcon, {
      as: IconComponent,
      className: classes.icon,
      ownerState
    }), /* @__PURE__ */ jsx(SelectFocusSourceProvider, {
      value: openInteractionType,
      children: /* @__PURE__ */ jsx(Menu, {
        id: `menu-${name || ""}`,
        anchorEl: anchorElement,
        open,
        onClose: handleClose,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center"
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "center"
        },
        ...MenuProps,
        slotProps: {
          ...MenuProps.slotProps,
          list: {
            "aria-labelledby": labelId,
            role: "listbox",
            "aria-multiselectable": multiple ? "true" : void 0,
            disableListWrap: true,
            id: listboxId,
            ...menuListSlotProps
          },
          paper: {
            ...menuPaperSlotProps,
            ref: handlePaperRef,
            style: {
              minWidth: menuMinWidth,
              ...menuPaperSlotProps?.style
            }
          }
        },
        children: items2
      })
    })]
  });
});
process.env.NODE_ENV !== "production" ? SelectInput.propTypes = {
  /**
   * @ignore
   */
  "aria-describedby": PropTypes.string,
  /**
   * @ignore
   */
  "aria-label": PropTypes.string,
  /**
   * @ignore
   */
  autoFocus: PropTypes.bool,
  /**
   * If `true`, the width of the popover will automatically be set according to the items inside the
   * menu, otherwise it will be at least the width of the select input.
   */
  autoWidth: PropTypes.bool,
  /**
   * The option elements to populate the select with.
   * Can be some `<MenuItem>` elements.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The CSS class name of the select element.
   */
  className: PropTypes.string,
  /**
   * If `true`, the component is toggled on mount. Use when the component open state is not controlled.
   * You can only use it when the `native` prop is `false` (default).
   */
  defaultOpen: PropTypes.bool,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the select is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the selected item is displayed even if its value is empty.
   */
  displayEmpty: PropTypes.bool,
  /**
   * If `true`, the `select input` will indicate an error.
   */
  error: PropTypes.bool,
  /**
   * The icon that displays the arrow.
   */
  IconComponent: PropTypes.elementType.isRequired,
  /**
   * Imperative handle implementing `{ value: T, node: HTMLElement, focus(): void }`
   * Equivalent to `ref`
   */
  inputRef: refType,
  /**
   * The ID of an element that acts as an additional label. The Select will
   * be labelled by the additional label and the selected value.
   */
  labelId: PropTypes.string,
  /**
   * Props applied to the [`Menu`](/material-ui/api/menu/) element.
   */
  MenuProps: PropTypes.object,
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   */
  multiple: PropTypes.bool,
  /**
   * Name attribute of the `select` or hidden `input` element.
   */
  name: PropTypes.string,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * @param {object} [child] The react element that was selected.
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when the component requests to be closed.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onClose: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool,
  /**
   * @ignore
   */
  readOnly: PropTypes.bool,
  /**
   * Render the selected value.
   *
   * @param {any} value The `value` provided to the component.
   * @returns {ReactNode}
   */
  renderValue: PropTypes.func,
  /**
   * If `true`, the component is required.
   */
  required: PropTypes.bool,
  /**
   * Props applied to the clickable div element.
   */
  SelectDisplayProps: PropTypes.object,
  /**
   * @ignore
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * @ignore
   */
  type: PropTypes.any,
  /**
   * The input value.
   */
  value: PropTypes.any,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(["standard", "outlined", "filled"])
} : void 0;
const useUtilityClasses$9 = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  const composedClasses = composeClasses(slots, getSelectUtilityClasses, classes);
  return {
    ...classes,
    ...composedClasses
  };
};
const styledRootConfig = {
  name: "MuiSelect",
  slot: "Root",
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) && prop !== "variant"
};
const StyledInput = styled(Input, styledRootConfig)("");
const StyledOutlinedInput = styled(OutlinedInput, styledRootConfig)("");
const StyledFilledInput = styled(FilledInput, styledRootConfig)("");
const Select = /* @__PURE__ */ React.forwardRef(function Select2(inProps, ref) {
  const props = useDefaultProps({
    name: "MuiSelect",
    props: inProps
  });
  const {
    autoWidth = false,
    children,
    classes: classesProp = {},
    className,
    defaultOpen = false,
    displayEmpty = false,
    IconComponent = ArrowDropDownIcon,
    id,
    input,
    inputProps,
    label,
    labelId,
    MenuProps,
    multiple = false,
    native = false,
    onClose,
    onOpen,
    open,
    renderValue,
    SelectDisplayProps,
    variant: variantProp = "outlined",
    ...other
  } = props;
  const inputComponent = native ? NativeSelectInput : SelectInput;
  const [fcs] = useFormControlState({
    props,
    states: ["variant", "error"]
  });
  const variant = fcs.variant || variantProp;
  const ownerState = {
    ...props,
    variant,
    classes: classesProp
  };
  const classes = useUtilityClasses$9(ownerState);
  const {
    root: root2,
    ...restOfClasses
  } = classes;
  const InputComponent = input || {
    standard: /* @__PURE__ */ jsx(StyledInput, {
      ownerState
    }),
    outlined: /* @__PURE__ */ jsx(StyledOutlinedInput, {
      label,
      ownerState
    }),
    filled: /* @__PURE__ */ jsx(StyledFilledInput, {
      ownerState
    })
  }[variant];
  const inputComponentRef = useForkRef(ref, getReactElementRef(InputComponent));
  return /* @__PURE__ */ jsx(React.Fragment, {
    children: /* @__PURE__ */ React.cloneElement(InputComponent, {
      // Most of the logic is implemented in `SelectInput`.
      // The `Select` component is a simple API wrapper to expose something better to play with.
      inputComponent,
      inputProps: {
        children,
        error: fcs.error,
        IconComponent,
        variant,
        type: void 0,
        // We render a select. We can ignore the type provided by the `Input`.
        multiple,
        ...native ? {
          id
        } : {
          autoWidth,
          defaultOpen,
          displayEmpty,
          labelId,
          MenuProps,
          onClose,
          onOpen,
          open,
          renderValue,
          SelectDisplayProps: {
            id,
            ...SelectDisplayProps
          }
        },
        ...inputProps,
        classes: inputProps ? deepmerge(restOfClasses, inputProps.classes) : restOfClasses,
        ...input ? input.props.inputProps : {}
      },
      ...(multiple && native || displayEmpty) && variant === "outlined" ? {
        notched: true
      } : {},
      ref: inputComponentRef,
      className: clsx(InputComponent.props.className, className, classes.root),
      // If a custom input is provided via 'input' prop, do not allow 'variant' to be propagated to it's root element. See https://github.com/mui/material-ui/issues/33894.
      ...!input && {
        variant
      },
      ...other
    })
  });
});
process.env.NODE_ENV !== "production" ? Select.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the width of the popover will automatically be set according to the items inside the
   * menu, otherwise it will be at least the width of the select input.
   * @default false
   */
  autoWidth: PropTypes.bool,
  /**
   * The option elements to populate the select with.
   * Can be some `MenuItem` when `native` is false and `option` when `native` is true.
   *
   * ⚠️The `MenuItem` elements **must** be direct descendants when `native` is false.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * @default {}
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the component is initially open. Use when the component open state is not controlled (i.e. the `open` prop is not defined).
   * You can only use it when the `native` prop is `false` (default).
   * @default false
   */
  defaultOpen: PropTypes.bool,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, a value is displayed even if no items are selected.
   *
   * In order to display a meaningful value, a function can be passed to the `renderValue` prop which
   * returns the value to be displayed when no items are selected.
   *
   * ⚠️ When using this prop, make sure the label doesn't overlap with the empty displayed value.
   * The label should either be hidden or forced to a shrunk state.
   * @default false
   */
  displayEmpty: PropTypes.bool,
  /**
   * The icon that displays the arrow.
   * @default ArrowDropDownIcon
   */
  IconComponent: PropTypes.elementType,
  /**
   * The `id` of the wrapper element or the `select` element when `native`.
   */
  id: PropTypes.string,
  /**
   * An `Input` element; does not have to be a material-ui specific `Input`.
   */
  input: PropTypes.element,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#attributes) applied to the `input` element.
   * When `native` is `true`, the attributes are applied on the `select` element.
   */
  inputProps: PropTypes.object,
  /**
   * See [OutlinedInput#label](https://mui.com/material-ui/api/outlined-input/#props)
   */
  label: PropTypes.node,
  /**
   * The ID of an element that acts as an additional label. The Select will
   * be labelled by the additional label and the selected value.
   */
  labelId: PropTypes.string,
  /**
   * Props applied to the [`Menu`](https://mui.com/material-ui/api/menu/) element.
   */
  MenuProps: PropTypes.object,
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   * @default false
   */
  multiple: PropTypes.bool,
  /**
   * If `true`, the component uses a native `select` element.
   * @default false
   */
  native: PropTypes.bool,
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {SelectChangeEvent<Value>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event, not a change event, unless the change event is caused by browser autofill.
   * @param {object} [child] The react element that was selected when `native` is `false` (default).
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when the component requests to be closed.
   * Use it in either controlled (see the `open` prop), or uncontrolled mode (to detect when the Select collapses).
   *
   * @param {object} event The event source of the callback.
   */
  onClose: PropTypes.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use it in either controlled (see the `open` prop), or uncontrolled mode (to detect when the Select expands).
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: PropTypes.func,
  /**
   * If `true`, the component is shown.
   * You can only use it when the `native` prop is `false` (default).
   */
  open: PropTypes.bool,
  /**
   * Render the selected value.
   * You can only use it when the `native` prop is `false` (default).
   *
   * @param {any} value The `value` provided to the component.
   * @returns {ReactNode}
   */
  renderValue: PropTypes.func,
  /**
   * Props applied to the clickable div element.
   */
  SelectDisplayProps: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The `input` value. Providing an empty string will select no options.
   * Set to an empty string `''` if you don't want any of the available options to be selected.
   *
   * If the value is an object it must have reference equality with the option in order to be selected.
   * If the value is not an object, the string representation must match with the string representation of the option in order to be selected.
   */
  value: PropTypes.oneOfType([PropTypes.oneOf([""]), PropTypes.any]),
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: PropTypes.oneOf(["filled", "outlined", "standard"])
} : void 0;
Select.muiName = "Select";
function getTooltipUtilityClass(slot) {
  return generateUtilityClass("MuiTooltip", slot);
}
const tooltipClasses = generateUtilityClasses("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]);
function round(value) {
  return Math.round(value * 1e5) / 1e5;
}
const useUtilityClasses$8 = (ownerState) => {
  const {
    classes,
    disableInteractive,
    arrow,
    touch,
    placement
  } = ownerState;
  const slots = {
    popper: ["popper", !disableInteractive && "popperInteractive", arrow && "popperArrow"],
    tooltip: ["tooltip", arrow && "tooltipArrow", touch && "touch", `tooltipPlacement${capitalize(placement.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return composeClasses(slots, getTooltipUtilityClass, classes);
};
const TooltipPopper = styled(Popper2, {
  name: "MuiTooltip",
  slot: "Popper",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.popper, !ownerState.disableInteractive && styles2.popperInteractive, ownerState.arrow && styles2.popperArrow, !ownerState.open && styles2.popperClose];
  }
})(memoTheme(({
  theme
}) => ({
  zIndex: (theme.vars || theme).zIndex.tooltip,
  pointerEvents: "none",
  variants: [{
    props: ({
      ownerState,
      open
    }) => open && !ownerState.disableInteractive,
    style: {
      pointerEvents: "auto"
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.arrow,
    style: {
      [`&[data-popper-placement*="bottom"] .${tooltipClasses.arrow}`]: {
        top: 0,
        marginTop: "-0.71em",
        "&::before": {
          transformOrigin: "0 100%"
        }
      },
      [`&[data-popper-placement*="top"] .${tooltipClasses.arrow}`]: {
        bottom: 0,
        marginBottom: "-0.71em",
        "&::before": {
          transformOrigin: "100% 0"
        }
      },
      [`&[data-popper-placement*="right"] .${tooltipClasses.arrow}`]: {
        height: "1em",
        width: "0.71em",
        insetInlineStart: 0,
        marginInlineStart: "-0.71em",
        "&::before": {
          transformOrigin: "100% 100%"
        }
      },
      [`&[data-popper-placement*="left"] .${tooltipClasses.arrow}`]: {
        height: "1em",
        width: "0.71em",
        insetInlineEnd: 0,
        marginInlineEnd: "-0.71em",
        "&::before": {
          transformOrigin: "0 0"
        }
      }
    }
  }]
})));
const TooltipTooltip = styled("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.tooltip, ownerState.touch && styles2.touch, ownerState.arrow && styles2.tooltipArrow, styles2[`tooltipPlacement${capitalize(ownerState.placement.split("-")[0])}`]];
  }
})(memoTheme(({
  theme
}) => ({
  backgroundColor: theme.vars ? theme.vars.palette.Tooltip.bg : theme.alpha(theme.palette.grey[700], 0.92),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  color: (theme.vars || theme).palette.common.white,
  fontFamily: theme.typography.fontFamily,
  padding: "4px 8px",
  fontSize: theme.typography.pxToRem(11),
  maxWidth: 300,
  margin: 2,
  wordWrap: "break-word",
  fontWeight: theme.typography.fontWeightMedium,
  [`.${tooltipClasses.popper}[data-popper-placement*="left"] &`]: {
    transformOrigin: "right center",
    marginInlineEnd: "14px"
  },
  [`.${tooltipClasses.popper}[data-popper-placement*="right"] &`]: {
    transformOrigin: "left center",
    marginInlineStart: "14px"
  },
  [`.${tooltipClasses.popper}[data-popper-placement*="top"] &`]: {
    transformOrigin: "center bottom",
    marginBottom: "14px"
  },
  [`.${tooltipClasses.popper}[data-popper-placement*="bottom"] &`]: {
    transformOrigin: "center top",
    marginTop: "14px"
  },
  variants: [{
    props: ({
      ownerState
    }) => ownerState.arrow,
    style: {
      position: "relative",
      marginBlock: 0
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.touch,
    style: {
      padding: "8px 16px",
      fontSize: theme.typography.pxToRem(14),
      lineHeight: `${round(16 / 14)}em`,
      fontWeight: theme.typography.fontWeightRegular
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.touch,
    style: {
      [`.${tooltipClasses.popper}[data-popper-placement*="left"] &`]: {
        marginInlineEnd: "24px"
      },
      [`.${tooltipClasses.popper}[data-popper-placement*="right"] &`]: {
        marginInlineStart: "24px"
      },
      [`.${tooltipClasses.popper}[data-popper-placement*="top"] &`]: {
        marginBottom: "24px"
      },
      [`.${tooltipClasses.popper}[data-popper-placement*="bottom"] &`]: {
        marginTop: "24px"
      }
    }
  }]
})));
const TooltipArrow = styled("span", {
  name: "MuiTooltip",
  slot: "Arrow"
})(memoTheme(({
  theme
}) => ({
  overflow: "hidden",
  position: "absolute",
  width: "1em",
  height: "0.71em",
  boxSizing: "border-box",
  color: theme.vars ? theme.vars.palette.Tooltip.bg : theme.alpha(theme.palette.grey[700], 0.9),
  "&::before": {
    content: '""',
    margin: "auto",
    display: "block",
    width: "100%",
    height: "100%",
    backgroundColor: "currentColor",
    transform: "rotate(45deg)"
  }
})));
let hystersisOpen = false;
const hystersisTimer = new Timeout();
let cursorPosition = {
  x: 0,
  y: 0
};
function composeEventHandler(handler, eventHandler) {
  return (event, ...params) => {
    if (eventHandler) {
      eventHandler(event, ...params);
    }
    handler(event, ...params);
  };
}
const Tooltip = /* @__PURE__ */ React.forwardRef(function Tooltip2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiTooltip"
  });
  const {
    arrow = false,
    children: childrenProp,
    classes: classesProp,
    describeChild = false,
    disableFocusListener = false,
    disableHoverListener = false,
    disableInteractive: disableInteractiveProp = false,
    disableTouchListener = false,
    enterDelay = 100,
    enterNextDelay = 0,
    enterTouchDelay = 700,
    followCursor = false,
    id: idProp,
    leaveDelay = 0,
    leaveTouchDelay = 1500,
    onClose,
    onOpen,
    open: openProp,
    placement = "bottom",
    slotProps = {},
    slots = {},
    title,
    ...other
  } = props;
  const children = /* @__PURE__ */ React.isValidElement(childrenProp) ? childrenProp : /* @__PURE__ */ jsx("span", {
    children: childrenProp
  });
  const theme = useTheme();
  const [childNode, setChildNode] = React.useState();
  const [arrowRef, setArrowRef] = React.useState(null);
  const ignoreNonTouchEvents = React.useRef(false);
  const disableInteractive = disableInteractiveProp || followCursor;
  const closeTimer = useTimeout();
  const enterTimer = useTimeout();
  const leaveTimer = useTimeout();
  const touchTimer = useTimeout();
  const [openState, setOpenState] = useControlled({
    controlled: openProp,
    default: false,
    name: "Tooltip",
    state: "open"
  });
  let open = openState;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: isControlled
    } = React.useRef(openProp !== void 0);
    React.useEffect(() => {
      if (childNode && childNode.disabled && !isControlled && title !== "" && childNode.tagName.toLowerCase() === "button") {
        console.warn(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join("\n"));
      }
    }, [title, childNode, isControlled]);
  }
  const id = useId(idProp);
  const prevUserSelect = React.useRef();
  const stopTouchInteraction = useEventCallback(() => {
    if (prevUserSelect.current !== void 0) {
      document.body.style.WebkitUserSelect = prevUserSelect.current;
      prevUserSelect.current = void 0;
    }
    touchTimer.clear();
  });
  React.useEffect(() => stopTouchInteraction, [stopTouchInteraction]);
  const handleOpen = (event) => {
    hystersisTimer.clear();
    hystersisOpen = true;
    setOpenState(true);
    if (onOpen && !open) {
      onOpen(event);
    }
  };
  const handleClose = useEventCallback(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (event) => {
      hystersisTimer.start(800 + leaveDelay, () => {
        hystersisOpen = false;
      });
      setOpenState(false);
      if (onClose && open) {
        onClose(event);
      }
      closeTimer.start(theme.transitions.duration.shortest, () => {
        ignoreNonTouchEvents.current = false;
      });
    }
  );
  const handleMouseOver = (event) => {
    if (childNode?.disabled) {
      return;
    }
    if (ignoreNonTouchEvents.current && event.type !== "touchstart") {
      return;
    }
    if (childNode) {
      childNode.removeAttribute("title");
    }
    enterTimer.clear();
    leaveTimer.clear();
    if (enterDelay || hystersisOpen && enterNextDelay) {
      enterTimer.start(hystersisOpen ? enterNextDelay : enterDelay, () => {
        handleOpen(event);
      });
    } else {
      handleOpen(event);
    }
  };
  const handleMouseLeave = (event) => {
    enterTimer.clear();
    leaveTimer.start(leaveDelay, () => {
      handleClose(event);
    });
  };
  const [, setChildIsFocusVisible] = React.useState(false);
  const handleBlur = (event) => {
    const target = event?.target ?? childNode;
    if (!target || target.disabled || !isFocusVisible(target)) {
      setChildIsFocusVisible(false);
      const closeEvent = event ?? new Event("blur");
      if (!event && target) {
        Object.defineProperty(closeEvent, "target", {
          value: target
        });
        Object.defineProperty(closeEvent, "currentTarget", {
          value: target
        });
      }
      handleMouseLeave(closeEvent);
    }
  };
  const handleFocus = (event) => {
    if (!childNode) {
      setChildNode(event.currentTarget);
    }
    if (isFocusVisible(event.target)) {
      const handleNativeBlur = (blurEvent) => {
        if (blurEvent.target.disabled) {
          handleBlur(blurEvent);
        }
        blurEvent.target.removeEventListener("blur", handleNativeBlur);
      };
      event.target.addEventListener("blur", handleNativeBlur);
      setChildIsFocusVisible(true);
      handleMouseOver(event);
    }
  };
  const detectTouchStart = (event) => {
    ignoreNonTouchEvents.current = true;
    const childrenProps2 = children.props;
    if (childrenProps2.onTouchStart) {
      childrenProps2.onTouchStart(event);
    }
  };
  const handleTouchStart = (event) => {
    detectTouchStart(event);
    leaveTimer.clear();
    closeTimer.clear();
    stopTouchInteraction();
    prevUserSelect.current = document.body.style.WebkitUserSelect;
    document.body.style.WebkitUserSelect = "none";
    touchTimer.start(enterTouchDelay, () => {
      document.body.style.WebkitUserSelect = prevUserSelect.current;
      handleMouseOver(event);
    });
  };
  const handleTouchEnd = (event) => {
    if (children.props.onTouchEnd) {
      children.props.onTouchEnd(event);
    }
    stopTouchInteraction();
    leaveTimer.start(leaveTouchDelay, () => {
      handleClose(event);
    });
  };
  React.useEffect(() => {
    if (!open) {
      return void 0;
    }
    function handleKeyDown(nativeEvent) {
      if (nativeEvent.key === "Escape") {
        handleClose(nativeEvent);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose, open]);
  const handleRef = useForkRef(getReactElementRef(children), setChildNode, ref);
  if (!title && title !== 0) {
    open = false;
  }
  const popperRef = React.useRef();
  const handleMouseMove = (event) => {
    const childrenProps2 = children.props;
    if (childrenProps2.onMouseMove) {
      childrenProps2.onMouseMove(event);
    }
    cursorPosition = {
      x: event.clientX,
      y: event.clientY
    };
    if (popperRef.current) {
      popperRef.current.update();
    }
  };
  const nameOrDescProps = {};
  const titleIsString = typeof title === "string";
  if (describeChild) {
    nameOrDescProps.title = !open && titleIsString && !disableHoverListener ? title : null;
    nameOrDescProps["aria-describedby"] = open ? id : null;
  } else {
    nameOrDescProps["aria-label"] = titleIsString ? title : null;
    nameOrDescProps["aria-labelledby"] = open && !titleIsString ? id : null;
  }
  const childrenProps = {
    ...nameOrDescProps,
    ...other,
    ...children.props,
    className: clsx(other.className, children.props.className),
    onTouchStart: detectTouchStart,
    ref: handleRef,
    ...followCursor ? {
      onMouseMove: handleMouseMove
    } : {}
  };
  if (process.env.NODE_ENV !== "production") {
    childrenProps["data-mui-internal-clone-element"] = true;
    React.useEffect(() => {
      if (childNode && !childNode.getAttribute("data-mui-internal-clone-element")) {
        console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join("\n"));
      }
    }, [childNode]);
  }
  const interactiveWrapperListeners = {};
  if (!disableTouchListener) {
    childrenProps.onTouchStart = handleTouchStart;
    childrenProps.onTouchEnd = handleTouchEnd;
  }
  if (!disableHoverListener) {
    childrenProps.onMouseOver = composeEventHandler(handleMouseOver, childrenProps.onMouseOver);
    childrenProps.onMouseLeave = composeEventHandler(handleMouseLeave, childrenProps.onMouseLeave);
    if (!disableInteractive) {
      interactiveWrapperListeners.onMouseOver = handleMouseOver;
      interactiveWrapperListeners.onMouseLeave = handleMouseLeave;
    }
  }
  if (!disableFocusListener) {
    childrenProps.onFocus = composeEventHandler(handleFocus, childrenProps.onFocus);
    childrenProps.onBlur = composeEventHandler(handleBlur, childrenProps.onBlur);
    if (!disableInteractive) {
      interactiveWrapperListeners.onFocus = handleFocus;
      interactiveWrapperListeners.onBlur = handleBlur;
    }
  }
  if (process.env.NODE_ENV !== "production") {
    if (children.props.title) {
      console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${children.props.title}\` or the Tooltip component.`].join("\n"));
    }
  }
  const ownerState = {
    ...props,
    arrow,
    disableInteractive,
    placement,
    touch: ignoreNonTouchEvents.current
  };
  const resolvedPopperProps = typeof slotProps.popper === "function" ? slotProps.popper(ownerState) : slotProps.popper;
  const popperOptions = React.useMemo(() => {
    let tooltipModifiers = [{
      name: "arrow",
      enabled: Boolean(arrowRef),
      options: {
        element: arrowRef,
        padding: 4
      }
    }];
    if (resolvedPopperProps?.popperOptions?.modifiers) {
      tooltipModifiers = tooltipModifiers.concat(resolvedPopperProps.popperOptions.modifiers);
    }
    return {
      ...resolvedPopperProps?.popperOptions,
      modifiers: tooltipModifiers
    };
  }, [arrowRef, resolvedPopperProps?.popperOptions]);
  const classes = useUtilityClasses$8(ownerState);
  const externalForwardedProps = {
    slots,
    slotProps: {
      arrow: slotProps.arrow,
      popper: resolvedPopperProps,
      tooltip: slotProps.tooltip,
      transition: slotProps.transition
    }
  };
  const [PopperSlot, popperSlotProps] = useSlot("popper", {
    elementType: TooltipPopper,
    externalForwardedProps,
    ownerState,
    className: classes.popper
  });
  const [TransitionSlot, transitionSlotProps] = useSlot("transition", {
    elementType: Grow,
    externalForwardedProps,
    ownerState
  });
  const [TooltipSlot, tooltipSlotProps] = useSlot("tooltip", {
    elementType: TooltipTooltip,
    className: classes.tooltip,
    externalForwardedProps,
    ownerState
  });
  const [ArrowSlot, arrowSlotProps] = useSlot("arrow", {
    elementType: TooltipArrow,
    className: classes.arrow,
    externalForwardedProps,
    ownerState,
    ref: setArrowRef
  });
  return /* @__PURE__ */ jsxs(React.Fragment, {
    children: [/* @__PURE__ */ React.cloneElement(children, childrenProps), /* @__PURE__ */ jsx(PopperSlot, {
      as: Popper2,
      placement,
      anchorEl: followCursor ? {
        getBoundingClientRect: () => ({
          top: cursorPosition.y,
          left: cursorPosition.x,
          right: cursorPosition.x,
          bottom: cursorPosition.y,
          width: 0,
          height: 0
        })
      } : childNode,
      popperRef,
      open: childNode ? open : false,
      id,
      transition: true,
      ...interactiveWrapperListeners,
      ...popperSlotProps,
      popperOptions,
      children: ({
        TransitionProps: TransitionPropsInner
      }) => /* @__PURE__ */ jsx(TransitionSlot, {
        timeout: theme.transitions.duration.shorter,
        ...TransitionPropsInner,
        ...transitionSlotProps,
        children: /* @__PURE__ */ jsxs(TooltipSlot, {
          ...tooltipSlotProps,
          children: [title, arrow ? /* @__PURE__ */ jsx(ArrowSlot, {
            ...arrowSlotProps
          }) : null]
        })
      })
    })]
  });
});
process.env.NODE_ENV !== "production" ? Tooltip.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow: PropTypes.bool,
  /**
   * Tooltip reference element.
   */
  children: elementAcceptingRef.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild: PropTypes.bool,
  /**
   * Do not respond to focus-visible events.
   * @default false
   */
  disableFocusListener: PropTypes.bool,
  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener: PropTypes.bool,
  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive: PropTypes.bool,
  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener: PropTypes.bool,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay: PropTypes.number,
  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay: PropTypes.number,
  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay: PropTypes.number,
  /**
   * If `true`, the tooltip follow the cursor over the wrapped element.
   * @default false
   */
  followCursor: PropTypes.bool,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: PropTypes.string,
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay: PropTypes.number,
  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay: PropTypes.number,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: PropTypes.func,
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool,
  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement: PropTypes.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    arrow: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    popper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    transition: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    arrow: PropTypes.elementType,
    popper: PropTypes.elementType,
    tooltip: PropTypes.elementType,
    transition: PropTypes.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * Tooltip title. Zero-length titles string, undefined, null and false are never displayed.
   */
  title: PropTypes.node
} : void 0;
const Stack = createStack({
  createStyledComponent: styled("div", {
    name: "MuiStack",
    slot: "Root"
  }),
  useThemeProps: (inProps) => useDefaultProps({
    props: inProps,
    name: "MuiStack"
  })
});
process.env.NODE_ENV !== "production" ? Stack.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'column'
   */
  direction: PropTypes.oneOfType([PropTypes.oneOf(["column-reverse", "column", "row-reverse", "row"]), PropTypes.arrayOf(PropTypes.oneOf(["column-reverse", "column", "row-reverse", "row"])), PropTypes.object]),
  /**
   * Add an element between each child.
   */
  divider: PropTypes.node,
  /**
   * Defines the space between immediate children.
   * @default 0
   */
  spacing: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])), PropTypes.number, PropTypes.object, PropTypes.string]),
  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * If `true`, the CSS flexbox `gap` is used instead of applying `margin` to children.
   *
   * While CSS `gap` removes the [known limitations](https://mui.com/joy-ui/react-stack/#limitations),
   * it is not fully supported in some browsers. We recommend checking https://caniuse.com/?search=flex%20gap before using this flag.
   *
   * To enable this flag globally, follow the [theme's default props](https://mui.com/material-ui/customization/theme-components/#default-props) configuration.
   * @default false
   */
  useFlexGap: PropTypes.bool
} : void 0;
function getSwitchUtilityClass(slot) {
  return generateUtilityClass("MuiSwitch", slot);
}
const switchClasses = generateUtilityClasses("MuiSwitch", ["root", "edgeStart", "edgeEnd", "switchBase", "colorPrimary", "colorSecondary", "sizeSmall", "sizeMedium", "checked", "disabled", "input", "thumb", "track"]);
const useUtilityClasses$7 = (ownerState) => {
  const {
    classes,
    edge,
    size,
    color,
    checked,
    disabled
  } = ownerState;
  const slots = {
    root: ["root", edge && `edge${capitalize(edge)}`, `size${capitalize(size)}`],
    switchBase: ["switchBase", `color${capitalize(color)}`, checked && "checked", disabled && "disabled"],
    thumb: ["thumb"],
    track: ["track"],
    input: ["input"]
  };
  const composedClasses = composeClasses(slots, getSwitchUtilityClass, classes);
  return {
    ...classes,
    // forward the disabled and checked classes to the SwitchBase
    ...composedClasses
  };
};
const SwitchRoot = styled("span", {
  name: "MuiSwitch",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.edge && styles2[`edge${capitalize(ownerState.edge)}`], styles2[`size${capitalize(ownerState.size)}`]];
  }
})({
  display: "inline-flex",
  width: 34 + 12 * 2,
  height: 14 + 12 * 2,
  overflow: "hidden",
  padding: 12,
  boxSizing: "border-box",
  position: "relative",
  flexShrink: 0,
  zIndex: 0,
  // Reset the stacking context.
  verticalAlign: "middle",
  // For correct alignment with the text.
  "@media print": {
    colorAdjust: "exact"
  },
  variants: [{
    props: {
      edge: "start"
    },
    style: {
      marginLeft: -8
    }
  }, {
    props: {
      edge: "end"
    },
    style: {
      marginRight: -8
    }
  }, {
    props: {
      size: "small"
    },
    style: {
      width: 40,
      height: 24,
      padding: 7,
      [`& .${switchClasses.thumb}`]: {
        width: 16,
        height: 16
      },
      [`& .${switchClasses.switchBase}`]: {
        padding: 4,
        [`&.${switchClasses.checked}`]: {
          transform: "translateX(16px)"
        }
      }
    }
  }]
});
const SwitchSwitchBase = styled(SwitchBase, {
  name: "MuiSwitch",
  slot: "SwitchBase",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.switchBase, {
      [`& .${switchClasses.input}`]: styles2.input
    }, ownerState.color !== "default" && styles2[`color${capitalize(ownerState.color)}`]];
  }
})(memoTheme(({
  theme
}) => ({
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 1,
  // Render above the focus ripple.
  color: theme.vars ? theme.vars.palette.Switch.defaultColor : `${theme.palette.mode === "light" ? theme.palette.common.white : theme.palette.grey[300]}`,
  ...getTransitionStyles(theme, ["left", "transform"], {
    duration: theme.transitions.duration.shortest
  }),
  [`&.${switchClasses.checked}`]: {
    transform: "translateX(20px)"
  },
  [`&.${switchClasses.disabled}`]: {
    color: theme.vars ? theme.vars.palette.Switch.defaultDisabledColor : `${theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[600]}`
  },
  [`&.${switchClasses.checked} + .${switchClasses.track}`]: {
    opacity: 0.5
  },
  [`&.${switchClasses.disabled} + .${switchClasses.track}`]: {
    opacity: theme.vars ? theme.vars.opacity.switchTrackDisabled : `${theme.palette.mode === "light" ? 0.12 : 0.2}`
  },
  [`& .${switchClasses.input}`]: {
    left: "-100%",
    width: "300%"
  }
})), memoTheme(({
  theme
}) => ({
  "&:hover": {
    backgroundColor: theme.alpha((theme.vars || theme).palette.action.active, (theme.vars || theme).palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  },
  variants: [...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(["light"])).map(([color]) => ({
    props: {
      color
    },
    style: {
      [`&.${switchClasses.checked}`]: {
        color: (theme.vars || theme).palette[color].main,
        "&:hover": {
          backgroundColor: theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.hoverOpacity),
          "@media (hover: none)": {
            backgroundColor: "transparent"
          }
        },
        [`&.${switchClasses.disabled}`]: {
          color: theme.vars ? theme.vars.palette.Switch[`${color}DisabledColor`] : `${theme.palette.mode === "light" ? theme.lighten(theme.palette[color].main, 0.62) : theme.darken(theme.palette[color].main, 0.55)}`
        }
      },
      [`&.${switchClasses.checked} + .${switchClasses.track}`]: {
        backgroundColor: (theme.vars || theme).palette[color].main
      }
    }
  }))]
})));
const SwitchTrack = styled("span", {
  name: "MuiSwitch",
  slot: "Track"
})(memoTheme(({
  theme
}) => ({
  height: "100%",
  width: "100%",
  borderRadius: 14 / 2,
  zIndex: -1,
  ...getTransitionStyles(theme, ["opacity", "background-color"], {
    duration: theme.transitions.duration.shortest
  }),
  "@media (forced-colors: active)": {
    boxSizing: "border-box",
    border: "1px solid ButtonBorder"
  },
  backgroundColor: theme.vars ? theme.vars.palette.common.onBackground : `${theme.palette.mode === "light" ? theme.palette.common.black : theme.palette.common.white}`,
  opacity: theme.vars ? theme.vars.opacity.switchTrack : `${theme.palette.mode === "light" ? 0.38 : 0.3}`
})));
const SwitchThumb = styled("span", {
  name: "MuiSwitch",
  slot: "Thumb"
})(memoTheme(({
  theme
}) => ({
  boxShadow: (theme.vars || theme).shadows[1],
  backgroundColor: "currentColor",
  boxSizing: "border-box",
  border: "1px solid transparent",
  width: 20,
  height: 20,
  borderRadius: "50%"
})));
const Switch = /* @__PURE__ */ React.forwardRef(function Switch2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiSwitch"
  });
  const {
    className,
    color = "primary",
    edge = false,
    size = "medium",
    sx,
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const ownerState = {
    ...props,
    color,
    edge,
    size
  };
  const classes = useUtilityClasses$7(ownerState);
  const externalInputProps = slotProps.input;
  const externalForwardedProps = {
    slots,
    slotProps
  };
  const [RootSlot, rootSlotProps] = useSlot("root", {
    className: clsx(classes.root, className),
    elementType: SwitchRoot,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      sx
    }
  });
  const [ThumbSlot, thumbSlotProps] = useSlot("thumb", {
    className: classes.thumb,
    elementType: SwitchThumb,
    externalForwardedProps,
    ownerState
  });
  const icon = /* @__PURE__ */ jsx(ThumbSlot, {
    ...thumbSlotProps
  });
  const [TrackSlot, trackSlotProps] = useSlot("track", {
    className: classes.track,
    elementType: SwitchTrack,
    externalForwardedProps,
    ownerState
  });
  return /* @__PURE__ */ jsxs(RootSlot, {
    ...rootSlotProps,
    children: [/* @__PURE__ */ jsx(SwitchSwitchBase, {
      type: "checkbox",
      icon,
      checkedIcon: icon,
      ref,
      ownerState,
      ...other,
      classes: {
        ...classes,
        root: classes.switchBase
      },
      slots: {
        ...slots.switchBase && {
          root: slots.switchBase
        },
        ...slots.input && {
          input: slots.input
        }
      },
      slotProps: {
        ...slotProps.switchBase && {
          root: typeof slotProps.switchBase === "function" ? slotProps.switchBase(ownerState) : slotProps.switchBase
        },
        input: mergeSlotProps(typeof externalInputProps === "function" ? externalInputProps(ownerState) : externalInputProps, {
          role: "switch"
        })
      }
    }), /* @__PURE__ */ jsx(TrackSlot, {
      ...trackSlotProps
    })]
  });
});
process.env.NODE_ENV !== "production" ? Switch.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes.oneOfType([PropTypes.oneOf(["default", "primary", "secondary", "error", "info", "success", "warning"]), PropTypes.string]),
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: PropTypes.oneOf(["end", "start", false]),
  /**
   * The icon to display when the component is unchecked.
   */
  icon: PropTypes.node,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * If `true`, the `input` element is required.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * The size of the component.
   * `small` is equivalent to the dense switch styling.
   * @default 'medium'
   */
  size: PropTypes.oneOfType([PropTypes.oneOf(["medium", "small"]), PropTypes.string]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    switchBase: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    thumb: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    track: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    input: PropTypes.elementType,
    root: PropTypes.elementType,
    switchBase: PropTypes.elementType,
    thumb: PropTypes.elementType,
    track: PropTypes.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value: PropTypes.any
} : void 0;
function getTabUtilityClass(slot) {
  return generateUtilityClass("MuiTab", slot);
}
const tabClasses = generateUtilityClasses("MuiTab", ["root", "labelIcon", "textColorInherit", "textColorPrimary", "textColorSecondary", "selected", "disabled", "fullWidth", "wrapped", "icon"]);
const useUtilityClasses$6 = (ownerState) => {
  const {
    classes,
    textColor,
    fullWidth,
    wrapped,
    icon,
    label,
    selected,
    disabled
  } = ownerState;
  const slots = {
    root: ["root", icon && label && "labelIcon", `textColor${capitalize(textColor)}`, fullWidth && "fullWidth", wrapped && "wrapped", selected && "selected", disabled && "disabled"],
    icon: ["icon"]
  };
  return composeClasses(slots, getTabUtilityClass, classes);
};
const TabRoot = styled(ButtonBase, {
  name: "MuiTab",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.label && ownerState.icon && styles2.labelIcon, styles2[`textColor${capitalize(ownerState.textColor)}`], ownerState.fullWidth && styles2.fullWidth, ownerState.wrapped && styles2.wrapped, {
      [`& .${tabClasses.icon}`]: styles2.icon
    }];
  }
})(memoTheme(({
  theme
}) => ({
  ...theme.typography.button,
  maxWidth: 360,
  minWidth: 90,
  position: "relative",
  minHeight: 48,
  flexShrink: 0,
  padding: "12px 16px",
  overflow: "hidden",
  whiteSpace: "normal",
  textAlign: "center",
  lineHeight: 1.25,
  variants: [{
    props: ({
      ownerState
    }) => ownerState.label && (ownerState.iconPosition === "top" || ownerState.iconPosition === "bottom"),
    style: {
      flexDirection: "column"
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.label && ownerState.iconPosition !== "top" && ownerState.iconPosition !== "bottom",
    style: {
      flexDirection: "row"
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.icon && ownerState.label,
    style: {
      minHeight: 72,
      paddingTop: 9,
      paddingBottom: 9
    }
  }, {
    props: ({
      ownerState,
      iconPosition
    }) => ownerState.icon && ownerState.label && iconPosition === "top",
    style: {
      [`& > .${tabClasses.icon}`]: {
        marginBottom: 6
      }
    }
  }, {
    props: ({
      ownerState,
      iconPosition
    }) => ownerState.icon && ownerState.label && iconPosition === "bottom",
    style: {
      [`& > .${tabClasses.icon}`]: {
        marginTop: 6
      }
    }
  }, {
    props: ({
      ownerState,
      iconPosition
    }) => ownerState.icon && ownerState.label && iconPosition === "start",
    style: {
      [`& > .${tabClasses.icon}`]: {
        marginRight: theme.spacing(1)
      }
    }
  }, {
    props: ({
      ownerState,
      iconPosition
    }) => ownerState.icon && ownerState.label && iconPosition === "end",
    style: {
      [`& > .${tabClasses.icon}`]: {
        marginLeft: theme.spacing(1)
      }
    }
  }, {
    props: {
      textColor: "inherit"
    },
    style: {
      color: "inherit",
      opacity: 0.6,
      // same opacity as theme.palette.text.secondary
      [`&.${tabClasses.selected}`]: {
        opacity: 1
      },
      [`&.${tabClasses.disabled}`]: {
        opacity: (theme.vars || theme).palette.action.disabledOpacity
      }
    }
  }, {
    props: {
      textColor: "primary"
    },
    style: {
      color: (theme.vars || theme).palette.text.secondary,
      [`&.${tabClasses.selected}`]: {
        color: (theme.vars || theme).palette.primary.main
      },
      [`&.${tabClasses.disabled}`]: {
        color: (theme.vars || theme).palette.text.disabled
      }
    }
  }, {
    props: {
      textColor: "secondary"
    },
    style: {
      color: (theme.vars || theme).palette.text.secondary,
      [`&.${tabClasses.selected}`]: {
        color: (theme.vars || theme).palette.secondary.main
      },
      [`&.${tabClasses.disabled}`]: {
        color: (theme.vars || theme).palette.text.disabled
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.fullWidth,
    style: {
      flexShrink: 1,
      flexGrow: 1,
      flexBasis: 0,
      maxWidth: "none"
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.wrapped,
    style: {
      fontSize: theme.typography.pxToRem(12)
    }
  }]
})));
const Tab = /* @__PURE__ */ React.forwardRef(function Tab2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiTab"
  });
  const {
    className,
    disabled = false,
    disableFocusRipple = false,
    // eslint-disable-next-line react/prop-types
    fullWidth,
    icon: iconProp,
    iconPosition = "top",
    // eslint-disable-next-line react/prop-types
    indicator,
    label,
    onChange,
    onClick,
    onFocus,
    // eslint-disable-next-line react/prop-types
    selected,
    // eslint-disable-next-line react/prop-types
    selectionFollowsFocus,
    // eslint-disable-next-line react/prop-types
    textColor = "inherit",
    value,
    wrapped = false,
    ...other
  } = props;
  const rovingContext = useRovingTabIndexContext();
  const rovingItemProps = useRovingTabIndexItem({
    id: value,
    ref,
    disabled,
    selected
  });
  const shouldUseSelectedTabStopFallback = rovingContext.getItemMap().size === 0 && selected;
  const tabIndex = shouldUseSelectedTabStopFallback ? 0 : rovingItemProps.tabIndex;
  const ownerState = {
    ...props,
    disabled,
    disableFocusRipple,
    selected,
    icon: !!iconProp,
    iconPosition,
    label: !!label,
    fullWidth,
    textColor,
    wrapped
  };
  const classes = useUtilityClasses$6(ownerState);
  const icon = iconProp && label && /* @__PURE__ */ React.isValidElement(iconProp) ? /* @__PURE__ */ React.cloneElement(iconProp, {
    className: clsx(classes.icon, iconProp.props.className)
  }) : iconProp;
  const handleClick = (event) => {
    if (!selected && onChange) {
      onChange(event, value);
    }
    if (onClick) {
      onClick(event);
    }
  };
  const handleFocus = (event) => {
    if (selectionFollowsFocus && !selected && onChange) {
      onChange(event, value);
    }
    if (onFocus) {
      onFocus(event);
    }
  };
  return /* @__PURE__ */ jsxs(TabRoot, {
    internalNativeButton: true,
    focusRipple: !disableFocusRipple,
    className: clsx(classes.root, className),
    ref: rovingItemProps.ref,
    role: "tab",
    "aria-selected": selected,
    disabled,
    onClick: handleClick,
    onFocus: handleFocus,
    tabIndex,
    ownerState,
    ...other,
    children: [iconPosition === "top" || iconPosition === "start" ? /* @__PURE__ */ jsxs(React.Fragment, {
      children: [icon, label]
    }) : /* @__PURE__ */ jsxs(React.Fragment, {
      children: [label, icon]
    }), indicator]
  });
});
process.env.NODE_ENV !== "production" ? Tab.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children: unsupportedProp,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * The icon to display.
   */
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  /**
   * The position of the icon relative to the label.
   * @default 'top'
   */
  iconPosition: PropTypes.oneOf(["bottom", "end", "start", "top"]),
  /**
   * The label element.
   */
  label: PropTypes.node,
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value: PropTypes.any,
  /**
   * Tab labels appear in a single row.
   * They can use a second line if needed.
   * @default false
   */
  wrapped: PropTypes.bool
} : void 0;
function getToolbarUtilityClass(slot) {
  return generateUtilityClass("MuiToolbar", slot);
}
generateUtilityClasses("MuiToolbar", ["root", "gutters", "regular", "dense"]);
const useUtilityClasses$5 = (ownerState) => {
  const {
    classes,
    disableGutters,
    variant
  } = ownerState;
  const slots = {
    root: ["root", !disableGutters && "gutters", variant]
  };
  return composeClasses(slots, getToolbarUtilityClass, classes);
};
const ToolbarRoot = styled("div", {
  name: "MuiToolbar",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, !ownerState.disableGutters && styles2.gutters, styles2[ownerState.variant]];
  }
})(memoTheme(({
  theme
}) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  variants: [{
    props: ({
      ownerState
    }) => !ownerState.disableGutters,
    style: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3)
      }
    }
  }, {
    props: {
      variant: "dense"
    },
    style: {
      minHeight: 48
    }
  }, {
    props: {
      variant: "regular"
    },
    style: theme.mixins.toolbar
  }]
})));
const Toolbar = /* @__PURE__ */ React.forwardRef(function Toolbar2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiToolbar"
  });
  const {
    className,
    component = "div",
    disableGutters = false,
    variant = "regular",
    ...other
  } = props;
  const ownerState = {
    ...props,
    component,
    disableGutters,
    variant
  };
  const classes = useUtilityClasses$5(ownerState);
  return /* @__PURE__ */ jsx(ToolbarRoot, {
    as: component,
    className: clsx(classes.root, className),
    ref,
    ownerState,
    ...other
  });
});
process.env.NODE_ENV !== "production" ? Toolbar.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The Toolbar children, usually a mixture of `IconButton`, `Button` and `Typography`.
   * The Toolbar is a flex container, allowing flex item properties to be used to lay out the children.
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, disables gutter padding.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The variant to use.
   * @default 'regular'
   */
  variant: PropTypes.oneOfType([PropTypes.oneOf(["dense", "regular"]), PropTypes.string])
} : void 0;
const KeyboardArrowLeft = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"
}), "KeyboardArrowLeft");
const KeyboardArrowRight = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"
}), "KeyboardArrowRight");
function easeInOutSin(time) {
  return (1 + Math.sin(Math.PI * time - Math.PI / 2)) / 2;
}
function animate(property, element, to, options = {}, cb = () => {
}) {
  const {
    ease = easeInOutSin,
    duration: duration2 = 300
    // standard
  } = options;
  let start = null;
  const from = element[property];
  let cancelled = false;
  const cancel = () => {
    cancelled = true;
  };
  const step = (timestamp) => {
    if (cancelled) {
      cb(new Error("Animation cancelled"));
      return;
    }
    if (start === null) {
      start = timestamp;
    }
    const time = Math.min(1, (timestamp - start) / duration2);
    element[property] = ease(time) * (to - from) + from;
    if (time >= 1) {
      requestAnimationFrame(() => {
        cb(null);
      });
      return;
    }
    requestAnimationFrame(step);
  };
  if (from === to) {
    cb(new Error("Element already at target position"));
    return cancel;
  }
  requestAnimationFrame(step);
  return cancel;
}
const styles = {
  width: 99,
  height: 99,
  position: "absolute",
  top: -9999,
  overflow: "scroll",
  pointerEvents: "none"
};
function ScrollbarSize(props) {
  const {
    onChange,
    ...other
  } = props;
  const scrollbarHeight = React.useRef();
  const nodeRef = React.useRef(null);
  const setMeasurements = () => {
    scrollbarHeight.current = nodeRef.current.offsetHeight - nodeRef.current.clientHeight;
  };
  useEnhancedEffect(() => {
    const handleResize = debounce(() => {
      const prevHeight = scrollbarHeight.current;
      setMeasurements();
      if (prevHeight !== scrollbarHeight.current) {
        onChange(scrollbarHeight.current);
      }
    });
    const containerWindow = ownerWindow(nodeRef.current);
    containerWindow.addEventListener("resize", handleResize);
    return () => {
      handleResize.clear();
      containerWindow.removeEventListener("resize", handleResize);
    };
  }, [onChange]);
  React.useEffect(() => {
    setMeasurements();
    onChange(scrollbarHeight.current);
  }, [onChange]);
  return /* @__PURE__ */ jsx("div", {
    style: styles,
    ...other,
    ref: nodeRef
  });
}
process.env.NODE_ENV !== "production" ? ScrollbarSize.propTypes = {
  onChange: PropTypes.func.isRequired
} : void 0;
function getTabScrollButtonUtilityClass(slot) {
  return generateUtilityClass("MuiTabScrollButton", slot);
}
const tabScrollButtonClasses = generateUtilityClasses("MuiTabScrollButton", ["root", "vertical", "horizontal", "disabled"]);
const useUtilityClasses$4 = (ownerState) => {
  const {
    classes,
    orientation,
    disabled
  } = ownerState;
  const slots = {
    root: ["root", orientation, disabled && "disabled"]
  };
  return composeClasses(slots, getTabScrollButtonUtilityClass, classes);
};
const TabScrollButtonRoot = styled(ButtonBase, {
  name: "MuiTabScrollButton",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.orientation && styles2[ownerState.orientation]];
  }
})({
  width: 40,
  flexShrink: 0,
  opacity: 0.8,
  [`&.${tabScrollButtonClasses.disabled}`]: {
    opacity: 0
  },
  variants: [{
    props: {
      orientation: "vertical"
    },
    style: {
      width: "100%",
      height: 40,
      "& svg": {
        transform: "var(--TabScrollButton-svgRotate)"
      }
    }
  }]
});
const TabScrollButton = /* @__PURE__ */ React.forwardRef(function TabScrollButton2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiTabScrollButton"
  });
  const {
    className,
    slots = {},
    slotProps = {},
    direction,
    orientation,
    disabled,
    ...other
  } = props;
  const {
    nativeButton,
    ...buttonBaseProps
  } = other;
  const isRtl = useRtl();
  const ownerState = {
    isRtl,
    ...props
  };
  const classes = useUtilityClasses$4(ownerState);
  const StartButtonIcon = slots.StartScrollButtonIcon ?? KeyboardArrowLeft;
  const EndButtonIcon = slots.EndScrollButtonIcon ?? KeyboardArrowRight;
  const startButtonIconProps = useSlotProps({
    elementType: StartButtonIcon,
    externalSlotProps: slotProps.startScrollButtonIcon,
    additionalProps: {
      fontSize: "small"
    },
    ownerState
  });
  const endButtonIconProps = useSlotProps({
    elementType: EndButtonIcon,
    externalSlotProps: slotProps.endScrollButtonIcon,
    additionalProps: {
      fontSize: "small"
    },
    ownerState
  });
  return /* @__PURE__ */ jsx(TabScrollButtonRoot, {
    component: "div",
    className: clsx(classes.root, className),
    ref,
    role: null,
    ownerState,
    tabIndex: null,
    ...buttonBaseProps,
    style: {
      ...buttonBaseProps.style,
      ...orientation === "vertical" && {
        "--TabScrollButton-svgRotate": `rotate(${isRtl ? -90 : 90}deg)`
      }
    },
    children: direction === "left" ? /* @__PURE__ */ jsx(StartButtonIcon, {
      ...startButtonIconProps
    }) : /* @__PURE__ */ jsx(EndButtonIcon, {
      ...endButtonIconProps
    })
  });
});
process.env.NODE_ENV !== "production" ? TabScrollButton.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * The direction the button should indicate.
   */
  direction: PropTypes.oneOf(["left", "right"]).isRequired,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * The component orientation (layout flow direction).
   */
  orientation: PropTypes.oneOf(["horizontal", "vertical"]).isRequired,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   * @default {}
   */
  slotProps: PropTypes.shape({
    endScrollButtonIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    startScrollButtonIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    EndScrollButtonIcon: PropTypes.elementType,
    StartScrollButtonIcon: PropTypes.elementType
  }),
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
function getTabsUtilityClass(slot) {
  return generateUtilityClass("MuiTabs", slot);
}
const tabsClasses = generateUtilityClasses("MuiTabs", ["root", "vertical", "list", "centered", "scroller", "fixed", "scrollableX", "scrollableY", "hideScrollbar", "scrollButtons", "scrollButtonsHideMobile", "indicator"]);
const useUtilityClasses$3 = (ownerState) => {
  const {
    vertical,
    fixed,
    hideScrollbar,
    scrollableX,
    scrollableY,
    centered,
    scrollButtonsHideMobile,
    classes
  } = ownerState;
  const slots = {
    root: ["root", vertical && "vertical"],
    scroller: ["scroller", fixed && "fixed", hideScrollbar && "hideScrollbar", scrollableX && "scrollableX", scrollableY && "scrollableY"],
    list: ["list", vertical && "vertical", centered && "centered"],
    indicator: ["indicator"],
    scrollButtons: ["scrollButtons", scrollButtonsHideMobile && "scrollButtonsHideMobile"],
    scrollableX: [scrollableX && "scrollableX"],
    hideScrollbar: [hideScrollbar && "hideScrollbar"]
  };
  return composeClasses(slots, getTabsUtilityClass, classes);
};
const TabsRoot = styled("div", {
  name: "MuiTabs",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${tabsClasses.scrollButtons}`]: styles2.scrollButtons
    }, {
      [`& .${tabsClasses.scrollButtons}`]: ownerState.scrollButtonsHideMobile && styles2.scrollButtonsHideMobile
    }, styles2.root, ownerState.vertical && styles2.vertical];
  }
})(memoTheme(({
  theme
}) => ({
  overflow: "hidden",
  minHeight: 48,
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: "touch",
  display: "flex",
  variants: [{
    props: ({
      ownerState
    }) => ownerState.vertical,
    style: {
      flexDirection: "column"
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.scrollButtonsHideMobile,
    style: {
      [`& .${tabsClasses.scrollButtons}`]: {
        [theme.breakpoints.down("sm")]: {
          display: "none"
        }
      }
    }
  }]
})));
const TabsScroller = styled("div", {
  name: "MuiTabs",
  slot: "Scroller",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.scroller, ownerState.fixed && styles2.fixed, ownerState.hideScrollbar && styles2.hideScrollbar, ownerState.scrollableX && styles2.scrollableX, ownerState.scrollableY && styles2.scrollableY];
  }
})({
  position: "relative",
  display: "inline-block",
  flex: "1 1 auto",
  whiteSpace: "nowrap",
  variants: [{
    props: ({
      ownerState
    }) => ownerState.fixed,
    style: {
      overflowX: "hidden",
      width: "100%"
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.hideScrollbar,
    style: {
      // Hide dimensionless scrollbar on macOS
      scrollbarWidth: "none",
      // Firefox
      "&::-webkit-scrollbar": {
        display: "none"
        // Safari + Chrome
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.scrollableX,
    style: {
      overflowX: "auto",
      overflowY: "hidden"
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.scrollableY,
    style: {
      overflowY: "auto",
      overflowX: "hidden"
    }
  }]
});
const List2 = styled("div", {
  name: "MuiTabs",
  slot: "List",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.list, ownerState.centered && styles2.centered];
  }
})({
  display: "flex",
  variants: [{
    props: ({
      ownerState
    }) => ownerState.vertical,
    style: {
      flexDirection: "column"
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.centered,
    style: {
      justifyContent: "center"
    }
  }]
});
const TabsIndicator = styled("span", {
  name: "MuiTabs",
  slot: "Indicator"
})(memoTheme(({
  theme
}) => ({
  position: "absolute",
  height: 2,
  bottom: 0,
  width: "100%",
  ...getTransitionStyles(theme),
  variants: [{
    props: {
      indicatorColor: "primary"
    },
    style: {
      backgroundColor: (theme.vars || theme).palette.primary.main
    }
  }, {
    props: {
      indicatorColor: "secondary"
    },
    style: {
      backgroundColor: (theme.vars || theme).palette.secondary.main
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.vertical,
    style: {
      height: "100%",
      width: 2,
      right: 0
    }
  }]
})));
const TabsScrollbarSize = styled(ScrollbarSize)({
  overflowX: "auto",
  overflowY: "hidden",
  // Hide dimensionless scrollbar on macOS
  scrollbarWidth: "none",
  // Firefox
  "&::-webkit-scrollbar": {
    display: "none"
    // Safari + Chrome
  }
});
const defaultIndicatorStyle = {};
const warnedTabValueInvalid = /* @__PURE__ */ new WeakMap();
let warnedOnceTabPresent = false;
const Tabs = /* @__PURE__ */ React.forwardRef(function Tabs2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiTabs"
  });
  const theme = useTheme();
  const isRtl = useRtl();
  const reducedMotion = useReducedMotion(theme.motion.reducedMotion, false);
  const {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    action,
    centered = false,
    children: childrenProp,
    className,
    component = "div",
    allowScrollButtonsMobile = false,
    indicatorColor = "primary",
    onChange,
    orientation = "horizontal",
    scrollButtons = "auto",
    selectionFollowsFocus,
    slots = {},
    slotProps = {},
    textColor = "primary",
    value,
    variant = "standard",
    visibleScrollbar = false,
    ...other
  } = props;
  const scrollable = variant === "scrollable";
  const vertical = orientation === "vertical";
  const scrollStart = vertical ? "scrollTop" : "scrollLeft";
  const start = vertical ? "top" : "left";
  const end = vertical ? "bottom" : "right";
  const clientSize = vertical ? "clientHeight" : "clientWidth";
  const size = vertical ? "height" : "width";
  const ownerState = {
    ...props,
    component,
    allowScrollButtonsMobile,
    indicatorColor,
    orientation,
    vertical,
    scrollButtons,
    textColor,
    variant,
    visibleScrollbar,
    fixed: !scrollable,
    hideScrollbar: scrollable && !visibleScrollbar,
    scrollableX: scrollable && !vertical,
    scrollableY: scrollable && vertical,
    centered: centered && !scrollable,
    scrollButtonsHideMobile: !allowScrollButtonsMobile
  };
  const classes = useUtilityClasses$3(ownerState);
  const startScrollButtonIconProps = useSlotProps({
    elementType: slots.startScrollButtonIcon,
    externalSlotProps: slotProps.startScrollButtonIcon,
    ownerState
  });
  const endScrollButtonIconProps = useSlotProps({
    elementType: slots.endScrollButtonIcon,
    externalSlotProps: slotProps.endScrollButtonIcon,
    ownerState
  });
  if (process.env.NODE_ENV !== "production") {
    if (centered && scrollable) {
      console.error('MUI: You can not use the `centered={true}` and `variant="scrollable"` properties at the same time on a `Tabs` component.');
    }
  }
  const [mounted, setMounted] = React.useState(false);
  const [indicatorStyle, setIndicatorStyle] = React.useState(defaultIndicatorStyle);
  const [displayStartScroll, setDisplayStartScroll] = React.useState(false);
  const [displayEndScroll, setDisplayEndScroll] = React.useState(false);
  const [updateScrollObserver, setUpdateScrollObserver] = React.useState(false);
  const selectedValue = value === false ? null : value;
  const [isFocusWithinList, setIsFocusWithinList] = React.useState(false);
  const [scrollerStyle, setScrollerStyle] = React.useState({
    overflow: "hidden",
    scrollbarWidth: 0
  });
  const valueToIndex = /* @__PURE__ */ new Map();
  const tabsRef = React.useRef(null);
  const tabListRef = React.useRef(null);
  const externalForwardedProps = {
    slots,
    slotProps
  };
  const getTabsMeta = () => {
    const tabsNode = tabsRef.current;
    let tabsMeta;
    if (tabsNode) {
      const rect = tabsNode.getBoundingClientRect();
      tabsMeta = {
        clientWidth: tabsNode.clientWidth,
        scrollLeft: tabsNode.scrollLeft,
        scrollTop: tabsNode.scrollTop,
        scrollWidth: tabsNode.scrollWidth,
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right
      };
    }
    let tabMeta;
    if (tabsNode && value !== false) {
      const children2 = tabListRef.current.children;
      if (children2.length > 0) {
        const tab = children2[valueToIndex.get(value)];
        if (process.env.NODE_ENV !== "production") {
          if (!tab && !warnedTabValueInvalid.has(tabsRef)) {
            warnedTabValueInvalid.set(tabsRef, true);
            console.error([`MUI: The \`value\` provided to the Tabs component is invalid.`, `None of the Tabs' children match with "${value}".`, valueToIndex.keys ? `You can provide one of the following values: ${Array.from(valueToIndex.keys()).join(", ")}.` : null].join("\n"));
          }
        }
        tabMeta = tab ? tab.getBoundingClientRect() : null;
        if (process.env.NODE_ENV !== "production") {
          if (isLayoutSupported() && !warnedOnceTabPresent && tabMeta && tabMeta.width === 0 && tabMeta.height === 0 && // if the whole Tabs component is hidden, don't warn
          tabsMeta.clientWidth !== 0) {
            tabsMeta = null;
            console.error(["MUI: The `value` provided to the Tabs component is invalid.", `The Tab with this \`value\` ("${value}") is not part of the document layout.`, "Make sure the tab item is present in the document or that it's not `display: none`."].join("\n"));
            warnedOnceTabPresent = true;
          }
        }
      }
    }
    return {
      tabsMeta,
      tabMeta
    };
  };
  const updateIndicatorState = useEventCallback(() => {
    const {
      tabsMeta,
      tabMeta
    } = getTabsMeta();
    let startValue = 0;
    let startIndicator;
    if (vertical) {
      startIndicator = "top";
      if (tabMeta && tabsMeta) {
        startValue = tabMeta.top - tabsMeta.top + tabsMeta.scrollTop;
      }
    } else {
      startIndicator = isRtl ? "right" : "left";
      if (tabMeta && tabsMeta) {
        startValue = (isRtl ? -1 : 1) * (tabMeta[startIndicator] - tabsMeta[startIndicator] + tabsMeta.scrollLeft);
      }
    }
    const newIndicatorStyle = {
      [startIndicator]: startValue,
      // May be wrong until the font is loaded.
      [size]: tabMeta ? tabMeta[size] : 0
    };
    if (typeof indicatorStyle[startIndicator] !== "number" || typeof indicatorStyle[size] !== "number") {
      setIndicatorStyle(newIndicatorStyle);
    } else {
      const dStart = Math.abs(indicatorStyle[startIndicator] - newIndicatorStyle[startIndicator]);
      const dSize = Math.abs(indicatorStyle[size] - newIndicatorStyle[size]);
      if (dStart >= 1 || dSize >= 1) {
        setIndicatorStyle(newIndicatorStyle);
      }
    }
  });
  const scroll = (scrollValue, {
    animation = true
  } = {}) => {
    if (animation && !reducedMotion.shouldReduceMotion) {
      animate(scrollStart, tabsRef.current, scrollValue, {
        duration: theme.transitions.duration.standard
      });
    } else {
      tabsRef.current[scrollStart] = scrollValue;
    }
  };
  const moveTabsScroll = (delta) => {
    let scrollValue = tabsRef.current[scrollStart];
    if (vertical) {
      scrollValue += delta;
    } else {
      scrollValue += delta * (isRtl ? -1 : 1);
    }
    scroll(scrollValue);
  };
  const getScrollSize = () => {
    const containerSize = tabsRef.current[clientSize];
    let totalSize = 0;
    const children2 = Array.from(tabListRef.current.children);
    for (let i = 0; i < children2.length; i += 1) {
      const tab = children2[i];
      if (totalSize + tab[clientSize] > containerSize) {
        if (i === 0) {
          totalSize = containerSize;
        }
        break;
      }
      totalSize += tab[clientSize];
    }
    return totalSize;
  };
  const handleStartScrollClick = () => {
    moveTabsScroll(-1 * getScrollSize());
  };
  const handleEndScrollClick = () => {
    moveTabsScroll(getScrollSize());
  };
  const [ScrollbarSlot, {
    onChange: scrollbarOnChange,
    ...scrollbarSlotProps
  }] = useSlot("scrollbar", {
    className: clsx(classes.scrollableX, classes.hideScrollbar),
    elementType: TabsScrollbarSize,
    shouldForwardComponentProp: true,
    externalForwardedProps,
    ownerState
  });
  const handleScrollbarSizeChange = React.useCallback((scrollbarWidth) => {
    scrollbarOnChange?.(scrollbarWidth);
    setScrollerStyle({
      overflow: null,
      scrollbarWidth
    });
  }, [scrollbarOnChange]);
  const [ScrollButtonsSlot, scrollButtonSlotProps] = useSlot("scrollButtons", {
    className: classes.scrollButtons,
    elementType: TabScrollButton,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      orientation,
      slots: {
        StartScrollButtonIcon: slots.startScrollButtonIcon,
        EndScrollButtonIcon: slots.endScrollButtonIcon
      },
      slotProps: {
        startScrollButtonIcon: startScrollButtonIconProps,
        endScrollButtonIcon: endScrollButtonIconProps
      }
    }
  });
  const getConditionalElements = () => {
    const conditionalElements2 = {};
    conditionalElements2.scrollbarSizeListener = scrollable ? /* @__PURE__ */ jsx(ScrollbarSlot, {
      ...scrollbarSlotProps,
      onChange: handleScrollbarSizeChange
    }) : null;
    const scrollButtonsActive = displayStartScroll || displayEndScroll;
    const showScrollButtons = scrollable && (scrollButtons === "auto" && scrollButtonsActive || scrollButtons === true);
    conditionalElements2.scrollButtonStart = showScrollButtons ? /* @__PURE__ */ jsx(ScrollButtonsSlot, {
      direction: isRtl ? "right" : "left",
      onClick: handleStartScrollClick,
      disabled: !displayStartScroll,
      ...scrollButtonSlotProps
    }) : null;
    conditionalElements2.scrollButtonEnd = showScrollButtons ? /* @__PURE__ */ jsx(ScrollButtonsSlot, {
      direction: isRtl ? "left" : "right",
      onClick: handleEndScrollClick,
      disabled: !displayEndScroll,
      ...scrollButtonSlotProps
    }) : null;
    return conditionalElements2;
  };
  const scrollSelectedIntoView = useEventCallback((animation) => {
    const {
      tabsMeta,
      tabMeta
    } = getTabsMeta();
    if (!tabMeta || !tabsMeta) {
      return;
    }
    if (tabMeta[start] < tabsMeta[start]) {
      const nextScrollStart = tabsMeta[scrollStart] + (tabMeta[start] - tabsMeta[start]);
      scroll(nextScrollStart, {
        animation
      });
    } else if (tabMeta[end] > tabsMeta[end]) {
      const nextScrollStart = tabsMeta[scrollStart] + (tabMeta[end] - tabsMeta[end]);
      scroll(nextScrollStart, {
        animation
      });
    }
  });
  const updateScrollButtonState = useEventCallback(() => {
    if (scrollable && scrollButtons !== false) {
      setUpdateScrollObserver(!updateScrollObserver);
    }
  });
  React.useEffect(() => {
    const handleResize = debounce(() => {
      if (tabsRef.current) {
        updateIndicatorState();
      }
    });
    let resizeObserver;
    const handleMutation = (records) => {
      records.forEach((record) => {
        record.removedNodes.forEach((item) => {
          resizeObserver?.unobserve(item);
        });
        record.addedNodes.forEach((item) => {
          resizeObserver?.observe(item);
        });
      });
      handleResize();
      updateScrollButtonState();
    };
    const win = ownerWindow(tabsRef.current);
    win.addEventListener("resize", handleResize);
    let mutationObserver;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(handleResize);
      Array.from(tabListRef.current.children).forEach((child) => {
        resizeObserver.observe(child);
      });
    }
    if (typeof MutationObserver !== "undefined") {
      mutationObserver = new MutationObserver(handleMutation);
      mutationObserver.observe(tabListRef.current, {
        childList: true
      });
    }
    return () => {
      handleResize.clear();
      win.removeEventListener("resize", handleResize);
      mutationObserver?.disconnect();
      resizeObserver?.disconnect();
    };
  }, [updateIndicatorState, updateScrollButtonState]);
  React.useEffect(() => {
    const tabListChildren = Array.from(tabListRef.current.children);
    const length = tabListChildren.length;
    if (typeof IntersectionObserver !== "undefined" && length > 0 && scrollable && scrollButtons !== false) {
      const firstTab = tabListChildren[0];
      const lastTab = tabListChildren[length - 1];
      const observerOptions = {
        root: tabsRef.current,
        threshold: 0.99
      };
      const handleScrollButtonStart = (entries) => {
        setDisplayStartScroll(!entries[0].isIntersecting);
      };
      const firstObserver = new IntersectionObserver(handleScrollButtonStart, observerOptions);
      firstObserver.observe(firstTab);
      const handleScrollButtonEnd = (entries) => {
        setDisplayEndScroll(!entries[0].isIntersecting);
      };
      const lastObserver = new IntersectionObserver(handleScrollButtonEnd, observerOptions);
      lastObserver.observe(lastTab);
      return () => {
        firstObserver.disconnect();
        lastObserver.disconnect();
      };
    }
    return void 0;
  }, [scrollable, scrollButtons, updateScrollObserver, childrenProp?.length]);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  React.useEffect(() => {
    updateIndicatorState();
  });
  React.useEffect(() => {
    scrollSelectedIntoView(defaultIndicatorStyle !== indicatorStyle);
  }, [scrollSelectedIntoView, indicatorStyle]);
  React.useImperativeHandle(action, () => ({
    updateIndicator: updateIndicatorState,
    updateScrollButtons: updateScrollButtonState
  }), [updateIndicatorState, updateScrollButtonState]);
  const [IndicatorSlot, indicatorSlotProps] = useSlot("indicator", {
    className: classes.indicator,
    elementType: TabsIndicator,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      style: indicatorStyle
    }
  });
  const indicator = /* @__PURE__ */ jsx(IndicatorSlot, {
    ...indicatorSlotProps
  });
  const rovingContainer = useRovingTabIndexRoot({
    activeItemId: isFocusWithinList ? void 0 : selectedValue,
    orientation,
    isRtl
  });
  const rovingContainerProps = rovingContainer.getContainerProps();
  const validChildren = React.Children.toArray(childrenProp).filter(React.isValidElement).map((child, index) => {
    const childValue = child.props.value === void 0 ? index : child.props.value;
    if (process.env.NODE_ENV !== "production") {
      if (isFragment(child)) {
        console.error(["MUI: The Tabs component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join("\n"));
      }
    }
    valueToIndex.set(childValue, index);
    return {
      child,
      index,
      childValue
    };
  });
  const children = validChildren.map(({
    child,
    childValue
  }) => {
    const selected = childValue === value;
    return /* @__PURE__ */ React.cloneElement(child, {
      fullWidth: variant === "fullWidth",
      indicator: selected && !mounted && indicator,
      selected,
      selectionFollowsFocus,
      onChange,
      textColor,
      value: childValue
    });
  });
  const conditionalElements = getConditionalElements();
  const [RootSlot, rootSlotProps] = useSlot("root", {
    ref,
    className: clsx(classes.root, className),
    elementType: TabsRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other,
      component
    },
    ownerState
  });
  const [ScrollerSlot, scrollerSlotProps] = useSlot("scroller", {
    ref: tabsRef,
    className: classes.scroller,
    elementType: TabsScroller,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      style: {
        overflow: scrollerStyle.overflow,
        [vertical ? `margin${isRtl ? "Left" : "Right"}` : "marginBottom"]: visibleScrollbar ? void 0 : -scrollerStyle.scrollbarWidth
      }
    }
  });
  const mergedRef = useForkRef(rovingContainerProps.ref, tabListRef);
  const handleKeyDown = (event) => {
    const list = tabListRef.current;
    const currentFocus = getActiveElement(ownerDocument(list));
    const role = currentFocus?.getAttribute("role");
    if (role !== "tab") {
      return;
    }
    rovingContainerProps.onKeyDown(event);
  };
  const [ListSlot, listSlotProps] = useSlot("list", {
    ref: mergedRef,
    className: classes.list,
    elementType: List2,
    externalForwardedProps,
    ownerState,
    getSlotProps: (handlers) => ({
      ...handlers,
      onBlur: (event) => {
        if (!contains(event.currentTarget, event.relatedTarget)) {
          setIsFocusWithinList(false);
        }
        handlers.onBlur?.(event);
      },
      onKeyDown: (event) => {
        handleKeyDown(event);
        handlers.onKeyDown?.(event);
      },
      onFocus: (event) => {
        setIsFocusWithinList(true);
        rovingContainerProps.onFocus(event);
        handlers.onFocus?.(event);
      }
    })
  });
  return /* @__PURE__ */ jsxs(RootSlot, {
    ...rootSlotProps,
    children: [conditionalElements.scrollButtonStart, conditionalElements.scrollbarSizeListener, /* @__PURE__ */ jsxs(ScrollerSlot, {
      ...scrollerSlotProps,
      children: [/* @__PURE__ */ jsx(ListSlot, {
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        "aria-orientation": orientation === "vertical" ? "vertical" : null,
        role: "tablist",
        ...listSlotProps,
        children: /* @__PURE__ */ jsx(RovingTabIndexContext.Provider, {
          value: rovingContainer,
          children
        })
      }), mounted && indicator]
    }), conditionalElements.scrollButtonEnd]
  });
});
process.env.NODE_ENV !== "production" ? Tabs.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Callback fired when the component mounts.
   * This is useful when you want to trigger an action programmatically.
   * It supports two actions: `updateIndicator()` and `updateScrollButtons()`
   *
   * @param {object} actions This object contains all possible actions
   * that can be triggered programmatically.
   */
  action: refType,
  /**
   * If `true`, the scroll buttons aren't forced hidden on mobile.
   * By default the scroll buttons are hidden on mobile and takes precedence over `scrollButtons`.
   * @default false
   */
  allowScrollButtonsMobile: PropTypes.bool,
  /**
   * The label for the Tabs as a string.
   */
  "aria-label": PropTypes.string,
  /**
   * An id or list of ids separated by a space that label the Tabs.
   */
  "aria-labelledby": PropTypes.string,
  /**
   * If `true`, the tabs are centered.
   * This prop is intended for large views.
   * @default false
   */
  centered: PropTypes.bool,
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Determines the color of the indicator.
   * @default 'primary'
   */
  indicatorColor: PropTypes.oneOfType([PropTypes.oneOf(["primary", "secondary"]), PropTypes.string]),
  /**
   * Callback fired when the value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {any} value We default to the index of the child (number)
   */
  onChange: PropTypes.func,
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  /**
   * Determine behavior of scroll buttons when tabs are set to scroll:
   *
   * - `auto` will only present them when not all the items are visible.
   * - `true` will always present them.
   * - `false` will never present them.
   *
   * By default the scroll buttons are hidden on mobile.
   * This behavior can be disabled with `allowScrollButtonsMobile`.
   * @default 'auto'
   */
  scrollButtons: PropTypes.oneOf(["auto", false, true]),
  /**
   * If `true` the selected tab changes on focus. Otherwise it only
   * changes on activation.
   */
  selectionFollowsFocus: PropTypes.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    endScrollButtonIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    indicator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    list: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    scrollbar: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    scrollButtons: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    scroller: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    startScrollButtonIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    endScrollButtonIcon: PropTypes.elementType,
    indicator: PropTypes.elementType,
    list: PropTypes.elementType,
    root: PropTypes.elementType,
    scrollbar: PropTypes.elementType,
    scrollButtons: PropTypes.elementType,
    scroller: PropTypes.elementType,
    startScrollButtonIcon: PropTypes.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * Determines the color of the `Tab`.
   * @default 'primary'
   */
  textColor: PropTypes.oneOf(["inherit", "primary", "secondary"]),
  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this prop to `false`.
   */
  value: PropTypes.any,
  /**
   * Determines additional display behavior of the tabs:
   *
   *  - `scrollable` will invoke scrolling properties and allow for horizontally
   *  scrolling (or swiping) of the tab bar.
   *  - `fullWidth` will make the tabs grow to use all the available space,
   *  which should be used for small views, like on mobile.
   *  - `standard` will render the default state.
   * @default 'standard'
   */
  variant: PropTypes.oneOf(["fullWidth", "scrollable", "standard"]),
  /**
   * If `true`, the scrollbar is visible. It can be useful when displaying
   * a long vertical list of tabs.
   * @default false
   */
  visibleScrollbar: PropTypes.bool
} : void 0;
function getTextFieldUtilityClass(slot) {
  return generateUtilityClass("MuiTextField", slot);
}
generateUtilityClasses("MuiTextField", ["root"]);
const variantComponent = {
  standard: Input,
  filled: FilledInput,
  outlined: OutlinedInput
};
const useUtilityClasses$2 = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getTextFieldUtilityClass, classes);
};
const TextFieldRoot = styled(FormControl, {
  name: "MuiTextField",
  slot: "Root"
})({});
const TextField = /* @__PURE__ */ React.forwardRef(function TextField2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiTextField"
  });
  const {
    autoComplete,
    autoFocus = false,
    children,
    className,
    color = "primary",
    defaultValue,
    disabled = false,
    error = false,
    fullWidth = false,
    helperText,
    id: idOverride,
    inputRef,
    label,
    maxRows,
    minRows,
    multiline = false,
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    required = false,
    rows,
    select = false,
    slots = {},
    slotProps = {},
    type,
    value,
    variant = "outlined",
    ...other
  } = props;
  const ownerState = {
    ...props,
    autoFocus,
    color,
    disabled,
    error,
    fullWidth,
    multiline,
    required,
    select,
    variant
  };
  const classes = useUtilityClasses$2(ownerState);
  if (process.env.NODE_ENV !== "production") {
    if (select && !children) {
      console.error("MUI: `children` must be passed when using the `TextField` component with `select`.");
    }
  }
  const id = useId(idOverride);
  const helperTextId = helperText && id ? `${id}-helper-text` : void 0;
  const inputLabelId = label && id ? `${id}-label` : void 0;
  const InputComponent = variantComponent[variant];
  const externalForwardedProps = {
    slots,
    slotProps
  };
  const [SelectSlot, selectProps] = useSlot("select", {
    elementType: Select,
    externalForwardedProps,
    ownerState
  });
  const nativeSelect = select && selectProps.native;
  const inputAdditionalProps = {};
  const inputLabelSlotProps = externalForwardedProps.slotProps.inputLabel;
  if (variant === "outlined") {
    if (inputLabelSlotProps && typeof inputLabelSlotProps.shrink !== "undefined") {
      inputAdditionalProps.notched = inputLabelSlotProps.shrink;
    }
    inputAdditionalProps.label = label;
  }
  if (select) {
    if (!nativeSelect) {
      inputAdditionalProps.id = void 0;
    }
    inputAdditionalProps["aria-describedby"] = void 0;
  }
  const [RootSlot, rootProps] = useSlot("root", {
    elementType: TextFieldRoot,
    shouldForwardComponentProp: true,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other
    },
    ownerState,
    className: clsx(classes.root, className),
    ref,
    additionalProps: {
      disabled,
      error,
      fullWidth,
      required,
      color,
      variant
    }
  });
  const [InputSlot, inputProps] = useSlot("input", {
    elementType: InputComponent,
    externalForwardedProps,
    additionalProps: inputAdditionalProps,
    ownerState
  });
  const [InputLabelSlot, inputLabelProps] = useSlot("inputLabel", {
    elementType: InputLabel,
    externalForwardedProps,
    ownerState
  });
  const [HtmlInputSlot, htmlInputProps] = useSlot("htmlInput", {
    elementType: "input",
    externalForwardedProps,
    ownerState
  });
  const [FormHelperTextSlot, formHelperTextProps] = useSlot("formHelperText", {
    elementType: FormHelperText,
    externalForwardedProps,
    ownerState
  });
  const InputElement = /* @__PURE__ */ jsx(InputSlot, {
    "aria-describedby": helperTextId,
    autoComplete,
    autoFocus,
    defaultValue,
    fullWidth,
    multiline,
    name,
    rows,
    maxRows,
    minRows,
    type,
    value,
    id,
    inputRef,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    inputProps: htmlInputProps,
    slots: {
      input: slots.htmlInput ? HtmlInputSlot : void 0
    },
    ...inputProps
  });
  return /* @__PURE__ */ jsxs(RootSlot, {
    ...rootProps,
    children: [label != null && label !== "" && /* @__PURE__ */ jsx(InputLabelSlot, {
      htmlFor: select && !nativeSelect ? void 0 : id,
      id: inputLabelId,
      ...select && !nativeSelect && {
        component: "div"
      },
      ...inputLabelProps,
      children: label
    }), select ? /* @__PURE__ */ jsx(SelectSlot, {
      "aria-describedby": helperTextId,
      id,
      labelId: inputLabelId,
      value,
      input: InputElement,
      ...selectProps,
      children
    }) : InputElement, helperText && /* @__PURE__ */ jsx(FormHelperTextSlot, {
      id: helperTextId,
      ...formHelperTextProps,
      children: helperText
    })]
  });
});
process.env.NODE_ENV !== "production" ? TextField.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: PropTypes.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   * @default false
   */
  autoFocus: PropTypes.bool,
  /**
   * @ignore
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
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes.oneOfType([PropTypes.oneOf(["primary", "secondary", "error", "info", "success", "warning"]), PropTypes.string]),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error: PropTypes.bool,
  /**
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The helper text content.
   */
  helperText: PropTypes.node,
  /**
   * The id of the `input` element.
   * Use this prop to make `label` and `helperText` accessible for screen readers.
   */
  id: PropTypes.string,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,
  /**
   * The label content.
   */
  label: PropTypes.node,
  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   * @default 'none'
   */
  margin: PropTypes.oneOf(["dense", "none", "normal"]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * If `true`, a `textarea` element is rendered instead of an input.
   * @default false
   */
  multiline: PropTypes.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: PropTypes.string,
  /**
   * If `true`, the label is displayed as required and the `input` element is required.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Render a [`Select`](https://mui.com/material-ui/api/select/) element while passing the Input element to `Select` as `input` parameter.
   * If this option is set you must pass the options of the select as children.
   * @default false
   */
  select: PropTypes.bool,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes.oneOfType([PropTypes.oneOf(["medium", "small"]), PropTypes.string]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    formHelperText: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    htmlInput: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    inputLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    select: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    formHelperText: PropTypes.elementType,
    htmlInput: PropTypes.elementType,
    input: PropTypes.elementType,
    inputLabel: PropTypes.elementType,
    root: PropTypes.elementType,
    select: PropTypes.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types).
   */
  type: PropTypes.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: PropTypes.any,
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: PropTypes.oneOf(["filled", "outlined", "standard"])
} : void 0;
const ToggleButtonGroupContext = /* @__PURE__ */ React.createContext({});
if (process.env.NODE_ENV !== "production") {
  ToggleButtonGroupContext.displayName = "ToggleButtonGroupContext";
}
const ToggleButtonGroupButtonContext = /* @__PURE__ */ React.createContext(void 0);
if (process.env.NODE_ENV !== "production") {
  ToggleButtonGroupButtonContext.displayName = "ToggleButtonGroupButtonContext";
}
function isValueSelected(value, candidate) {
  if (candidate === void 0 || value === void 0) {
    return false;
  }
  if (Array.isArray(candidate)) {
    return candidate.includes(value);
  }
  return value === candidate;
}
const useUtilityClasses$1 = (ownerState) => {
  const {
    classes,
    fullWidth,
    selected,
    disabled,
    size,
    color
  } = ownerState;
  const slots = {
    root: ["root", selected && "selected", disabled && "disabled", fullWidth && "fullWidth", `size${capitalize(size)}`, color]
  };
  return composeClasses(slots, getToggleButtonUtilityClass, classes);
};
const ToggleButtonRoot = styled(ButtonBase, {
  name: "MuiToggleButton",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, styles2[`size${capitalize(ownerState.size)}`]];
  }
})(memoTheme(({
  theme
}) => ({
  ...theme.typography.button,
  borderRadius: (theme.vars || theme).shape.borderRadius,
  padding: 11,
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
  color: (theme.vars || theme).palette.action.active,
  [`&.${toggleButtonClasses.disabled}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    border: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`
  },
  "&:hover": {
    textDecoration: "none",
    // Reset on mouse devices
    backgroundColor: theme.alpha((theme.vars || theme).palette.text.primary, (theme.vars || theme).palette.action.hoverOpacity),
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  },
  variants: [{
    props: {
      color: "standard"
    },
    style: {
      [`&.${toggleButtonClasses.selected}`]: {
        color: (theme.vars || theme).palette.text.primary,
        backgroundColor: theme.alpha((theme.vars || theme).palette.text.primary, (theme.vars || theme).palette.action.selectedOpacity),
        "&:hover": {
          backgroundColor: theme.alpha((theme.vars || theme).palette.text.primary, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.hoverOpacity}`),
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: theme.alpha((theme.vars || theme).palette.text.primary, (theme.vars || theme).palette.action.selectedOpacity)
          }
        }
      }
    }
  }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
    props: {
      color
    },
    style: {
      [`&.${toggleButtonClasses.selected}`]: {
        color: (theme.vars || theme).palette[color].main,
        backgroundColor: theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.selectedOpacity),
        "&:hover": {
          backgroundColor: theme.alpha((theme.vars || theme).palette[color].main, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.hoverOpacity}`),
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.selectedOpacity)
          }
        }
      }
    }
  })), {
    props: {
      fullWidth: true
    },
    style: {
      width: "100%"
    }
  }, {
    props: {
      size: "small"
    },
    style: {
      padding: 7,
      fontSize: theme.typography.pxToRem(13)
    }
  }, {
    props: {
      size: "large"
    },
    style: {
      padding: 15,
      fontSize: theme.typography.pxToRem(15)
    }
  }]
})));
const ToggleButton = /* @__PURE__ */ React.forwardRef(function ToggleButton2(inProps, ref) {
  const {
    value: contextValue,
    ...contextProps
  } = React.useContext(ToggleButtonGroupContext);
  const toggleButtonGroupButtonContextPositionClassName = React.useContext(ToggleButtonGroupButtonContext);
  const resolvedProps = resolveProps({
    ...contextProps,
    selected: isValueSelected(inProps.value, contextValue)
  }, inProps);
  const props = useDefaultProps({
    props: resolvedProps,
    name: "MuiToggleButton"
  });
  const {
    children,
    className,
    color = "standard",
    disabled = false,
    disableFocusRipple = false,
    fullWidth = false,
    onChange,
    onClick,
    selected,
    size = "medium",
    value,
    ...other
  } = props;
  const ownerState = {
    ...props,
    color,
    disabled,
    disableFocusRipple,
    fullWidth,
    size
  };
  const classes = useUtilityClasses$1(ownerState);
  const handleChange = (event) => {
    if (onClick) {
      onClick(event, value);
      if (event.defaultPrevented) {
        return;
      }
    }
    if (onChange) {
      onChange(event, value);
    }
  };
  const positionClassName = toggleButtonGroupButtonContextPositionClassName || "";
  return /* @__PURE__ */ jsx(ToggleButtonRoot, {
    className: clsx(contextProps.className, classes.root, className, positionClassName),
    internalNativeButton: true,
    disabled,
    focusRipple: !disableFocusRipple,
    ref,
    onClick: handleChange,
    onChange,
    value,
    ownerState,
    "aria-pressed": selected,
    ...other,
    children
  });
});
process.env.NODE_ENV !== "production" ? ToggleButton.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * The color of the button when it is in an active state.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'standard'
   */
  color: PropTypes.oneOfType([PropTypes.oneOf(["standard", "primary", "secondary", "error", "info", "success", "warning"]), PropTypes.string]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * Callback fired when the state changes.
   *
   * @param {React.MouseEvent<HTMLElement>} event The event source of the callback.
   * @param {any} value of the selected button.
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when the button is clicked.
   *
   * @param {React.MouseEvent<HTMLElement>} event The event source of the callback.
   * @param {any} value of the selected button.
   */
  onClick: PropTypes.func,
  /**
   * If `true`, the button is rendered in an active state.
   */
  selected: PropTypes.bool,
  /**
   * The size of the component.
   * The prop defaults to the value inherited from the parent ToggleButtonGroup component.
   * @default 'medium'
   */
  size: PropTypes.oneOfType([PropTypes.oneOf(["small", "medium", "large"]), PropTypes.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The value to associate with the button when selected in a
   * ToggleButtonGroup.
   */
  value: PropTypes.any.isRequired
} : void 0;
function getToggleButtonGroupUtilityClass(slot) {
  return generateUtilityClass("MuiToggleButtonGroup", slot);
}
const toggleButtonGroupClasses = generateUtilityClasses("MuiToggleButtonGroup", ["root", "selected", "horizontal", "vertical", "disabled", "grouped", "fullWidth", "firstButton", "lastButton", "middleButton"]);
const useUtilityClasses = (ownerState) => {
  const {
    classes,
    orientation,
    fullWidth,
    disabled
  } = ownerState;
  const slots = {
    root: ["root", orientation, fullWidth && "fullWidth"],
    grouped: ["grouped", disabled && "disabled"],
    firstButton: ["firstButton"],
    lastButton: ["lastButton"],
    middleButton: ["middleButton"]
  };
  return composeClasses(slots, getToggleButtonGroupUtilityClass, classes);
};
const ToggleButtonGroupRoot = styled("div", {
  name: "MuiToggleButtonGroup",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${toggleButtonGroupClasses.grouped}`]: styles2.grouped
    }, {
      [`& .${toggleButtonGroupClasses.firstButton}`]: styles2.firstButton
    }, {
      [`& .${toggleButtonGroupClasses.lastButton}`]: styles2.lastButton
    }, {
      [`& .${toggleButtonGroupClasses.middleButton}`]: styles2.middleButton
    }, styles2.root, ownerState.orientation === "vertical" && styles2.vertical, ownerState.fullWidth && styles2.fullWidth];
  }
})(memoTheme(({
  theme
}) => ({
  display: "inline-flex",
  borderRadius: (theme.vars || theme).shape.borderRadius,
  variants: [{
    props: {
      orientation: "vertical"
    },
    style: {
      flexDirection: "column",
      [`& .${toggleButtonGroupClasses.grouped}`]: {
        [`&.${toggleButtonGroupClasses.selected} + .${toggleButtonGroupClasses.grouped}.${toggleButtonGroupClasses.selected}`]: {
          borderTop: 0,
          marginTop: 0
        }
      },
      [`& .${toggleButtonGroupClasses.firstButton},& .${toggleButtonGroupClasses.middleButton}`]: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
      },
      [`& .${toggleButtonGroupClasses.lastButton},& .${toggleButtonGroupClasses.middleButton}`]: {
        marginTop: -1,
        borderTop: "1px solid transparent",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
      },
      [`& .${toggleButtonGroupClasses.lastButton}.${toggleButtonClasses.disabled},& .${toggleButtonGroupClasses.middleButton}.${toggleButtonClasses.disabled}`]: {
        borderTop: "1px solid transparent"
      }
    }
  }, {
    props: {
      fullWidth: true
    },
    style: {
      width: "100%"
    }
  }, {
    props: {
      orientation: "horizontal"
    },
    style: {
      [`& .${toggleButtonGroupClasses.grouped}`]: {
        [`&.${toggleButtonGroupClasses.selected} + .${toggleButtonGroupClasses.grouped}.${toggleButtonGroupClasses.selected}`]: {
          borderLeft: 0,
          marginLeft: 0
        }
      },
      [`& .${toggleButtonGroupClasses.firstButton},& .${toggleButtonGroupClasses.middleButton}`]: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
      },
      [`& .${toggleButtonGroupClasses.lastButton},& .${toggleButtonGroupClasses.middleButton}`]: {
        marginLeft: -1,
        borderLeft: "1px solid transparent",
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
      },
      [`& .${toggleButtonGroupClasses.lastButton}.${toggleButtonClasses.disabled},& .${toggleButtonGroupClasses.middleButton}.${toggleButtonClasses.disabled}`]: {
        borderLeft: "1px solid transparent"
      }
    }
  }]
})));
const ToggleButtonGroup = /* @__PURE__ */ React.forwardRef(function ToggleButtonGroup2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiToggleButtonGroup"
  });
  const {
    children,
    className,
    color = "standard",
    disabled = false,
    exclusive = false,
    fullWidth = false,
    onChange,
    orientation = "horizontal",
    size = "medium",
    value,
    ...other
  } = props;
  const ownerState = {
    ...props,
    disabled,
    fullWidth,
    orientation,
    size
  };
  const classes = useUtilityClasses(ownerState);
  const handleChange = React.useCallback((event, buttonValue) => {
    if (!onChange) {
      return;
    }
    const index = value && value.indexOf(buttonValue);
    let newValue;
    if (value && index >= 0) {
      newValue = value.slice();
      newValue.splice(index, 1);
    } else {
      newValue = value ? value.concat(buttonValue) : [buttonValue];
    }
    onChange(event, newValue);
  }, [onChange, value]);
  const handleExclusiveChange = React.useCallback((event, buttonValue) => {
    if (!onChange) {
      return;
    }
    onChange(event, value === buttonValue ? null : buttonValue);
  }, [onChange, value]);
  const context = React.useMemo(() => ({
    className: classes.grouped,
    onChange: exclusive ? handleExclusiveChange : handleChange,
    value,
    size,
    fullWidth,
    color,
    disabled
  }), [classes.grouped, exclusive, handleExclusiveChange, handleChange, value, size, fullWidth, color, disabled]);
  const validChildren = getValidReactChildren(children);
  const childrenCount = validChildren.length;
  const getButtonPositionClassName = (index) => {
    const isFirstButton = index === 0;
    const isLastButton = index === childrenCount - 1;
    if (isFirstButton && isLastButton) {
      return "";
    }
    if (isFirstButton) {
      return classes.firstButton;
    }
    if (isLastButton) {
      return classes.lastButton;
    }
    return classes.middleButton;
  };
  return /* @__PURE__ */ jsx(ToggleButtonGroupRoot, {
    role: "group",
    className: clsx(classes.root, className),
    ref,
    ownerState,
    ...other,
    children: /* @__PURE__ */ jsx(ToggleButtonGroupContext.Provider, {
      value: context,
      children: validChildren.map((child, index) => {
        if (process.env.NODE_ENV !== "production") {
          if (isFragment(child)) {
            console.error(["MUI: The ToggleButtonGroup component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join("\n"));
          }
        }
        return /* @__PURE__ */ jsx(ToggleButtonGroupButtonContext.Provider, {
          value: getButtonPositionClassName(index),
          children: child
        }, index);
      })
    })
  });
});
process.env.NODE_ENV !== "production" ? ToggleButtonGroup.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * The color of the button when it is selected.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'standard'
   */
  color: PropTypes.oneOfType([PropTypes.oneOf(["standard", "primary", "secondary", "error", "info", "success", "warning"]), PropTypes.string]),
  /**
   * If `true`, the component is disabled. This implies that all ToggleButton children will be disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, only allow one of the child ToggleButton values to be selected.
   * @default false
   */
  exclusive: PropTypes.bool,
  /**
   * If `true`, the button group will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * Callback fired when the value changes.
   *
   * @param {React.MouseEvent<HTMLElement>} event The event source of the callback.
   * @param {any} value of the selected buttons. When `exclusive` is true
   * this is a single value; when false an array of selected values. If no value
   * is selected and `exclusive` is true the value is null; when false an empty array.
   */
  onChange: PropTypes.func,
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes.oneOfType([PropTypes.oneOf(["small", "medium", "large"]), PropTypes.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The currently selected value within the group or an array of selected
   * values when `exclusive` is false.
   *
   * The value must have reference equality with the option in order to be selected.
   */
  value: PropTypes.any
} : void 0;
const STORAGE_KEY$1 = "nbirds.match.dailyScore";
function localDateKey(d = /* @__PURE__ */ new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function readRecord() {
  if (typeof window === "undefined") {
    return { date: localDateKey(), score: 0 };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY$1);
    if (!raw) return { date: localDateKey(), score: 0 };
    const parsed = JSON.parse(raw);
    if (parsed?.date !== localDateKey()) {
      return { date: localDateKey(), score: 0 };
    }
    return { date: parsed.date, score: Number(parsed.score) || 0 };
  } catch {
    return { date: localDateKey(), score: 0 };
  }
}
function writeRecord(record) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY$1, JSON.stringify(record));
}
function getDailyMatchScore() {
  return readRecord().score;
}
function addDailyMatchScore(points) {
  if (!points) return getDailyMatchScore();
  const next = {
    date: localDateKey(),
    score: getDailyMatchScore() + points
  };
  writeRecord(next);
  return next.score;
}
function DailyMatchScore({ variant = "chip" }) {
  const [score, setScore] = useState(0);
  useEffect(() => {
    setScore(getDailyMatchScore());
    const onStorage = (e) => {
      if (e.key === "nbirds.match.dailyScore") {
        setScore(getDailyMatchScore());
      }
    };
    const onFocus = () => setScore(getDailyMatchScore());
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
    };
  }, []);
  if (score <= 0) return null;
  if (variant === "inline") {
    return /* @__PURE__ */ jsxs(Typography, { variant: "body2", color: "text.secondary", children: [
      "Баллы за сегодня:",
      " ",
      /* @__PURE__ */ jsx("strong", { style: { color: "var(--mq-purple, #9b5de5)" }, children: score })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "match-daily-score", "aria-label": "Баллы за сегодня", children: [
    /* @__PURE__ */ jsx("span", { className: "match-daily-score__label", children: "Баллы за сегодня" }),
    /* @__PURE__ */ jsx("span", { className: "match-daily-score__value", children: score })
  ] });
}
const sections = [
  {
    title: "Справочники",
    items: [
      {
        to: "/names",
        title: "Названия видов",
        description: "Обзор семейств и корней названий."
      }
    ]
  },
  {
    title: "Интерактивные справочники",
    items: [
      {
        to: "/counter",
        title: "Счётчик видов",
        description: "Тренировка подсчёта по отряду."
      },
      {
        to: "/links",
        title: "Связи семейств",
        description: "Найдите общие подстроки в названиях семейств."
      }
    ]
  },
  {
    title: "Игры",
    items: [
      {
        to: "/match",
        title: "Сопоставление",
        description: "Выберите тему и сопоставьте признаки с ключевыми словами."
      },
      {
        to: "/fillword",
        title: "Филворд",
        description: "Сыграйте в поиск слов по теме или создайте свой набор."
      }
    ]
  }
];
function HomePage() {
  return /* @__PURE__ */ jsx("section", { style: { width: "min(720px, 100%)", padding: "24px 16px" }, children: /* @__PURE__ */ jsxs(Stack, { spacing: 3, children: [
    /* @__PURE__ */ jsxs(Stack, { spacing: 1, children: [
      /* @__PURE__ */ jsx(Typography, { variant: "h3", component: "h1", sx: { fontWeight: 700 }, children: "nBirds" }),
      /* @__PURE__ */ jsx(Typography, { color: "text.secondary", children: "Выберите раздел" }),
      /* @__PURE__ */ jsx(DailyMatchScore, {})
    ] }),
    sections.map((section) => /* @__PURE__ */ jsxs(Stack, { spacing: 1.5, children: [
      /* @__PURE__ */ jsx(
        Typography,
        {
          variant: "overline",
          sx: {
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "text.secondary"
          },
          children: section.title
        }
      ),
      /* @__PURE__ */ jsx(Stack, { spacing: 1.5, children: section.items.map((topic) => /* @__PURE__ */ jsx(Card, { variant: "outlined", children: /* @__PURE__ */ jsx(CardActionArea, { component: Link, to: topic.to, children: /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsx(Typography, { variant: "h6", gutterBottom: true, children: topic.title }),
        /* @__PURE__ */ jsx(Typography, { variant: "body2", color: "text.secondary", children: topic.description })
      ] }) }) }, topic.to)) })
    ] }, section.title))
  ] }) });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HomePage,
  default: HomePage
}, Symbol.toStringTag, { value: "Module" }));
const prefixGroup = "radio-group-name";
function RadioGroupName({
  id,
  title,
  actualType,
  onChangeActualType,
  modesName,
  isDisabled,
  DEFAULT_INDEX = 0
}) {
  return /* @__PURE__ */ jsxs(FormControl, { sx: { gap: 1 }, children: [
    /* @__PURE__ */ jsx(FormLabel, { id: `${prefixGroup}-${id}`, children: title }),
    /* @__PURE__ */ jsx(RadioGroup, { name: `${prefixGroup}-${id}`, defaultValue: modesName[DEFAULT_INDEX].value, children: modesName.map((mode, index) => /* @__PURE__ */ jsx(
      FormControlLabel,
      {
        value: mode.value,
        label: mode.label,
        title: mode.hint,
        checked: actualType === mode.value,
        disabled: isDisabled,
        control: /* @__PURE__ */ jsx(Radio, { size: "small", onChange: (e) => onChangeActualType(e.target.value) }),
        slotProps: { typography: { sx: { fontSize: ".8rem" } } }
      },
      `${prefixGroup}-${id}-item-${index}`
    )) })
  ] });
}
const FiltersNaming = ({ filterGroups }) => {
  return /* @__PURE__ */ jsxs("section", { style: { maxWidth: "350px" }, children: [
    /* @__PURE__ */ jsx(Typography, { sx: { marginBottom: 2, fontWeight: 500 }, children: "Режим просмотра" }),
    filterGroups.map((group, ind) => /* @__PURE__ */ jsx(RadioGroupName, { ...group }, `${prefixGroup}-${ind}`))
  ] });
};
const dash = "—";
const nameRootGroups = [
  // 0 _ "запасное" число, на случай отсутствия явного указания
  {
    id: 1,
    title: dash,
    //TODO: перепродумать название
    roots: [
      "птиц"
    ]
  },
  {
    id: 2,
    title: "Пение",
    roots: [
      "ласточк",
      "мухоловк",
      "певун",
      "пищух",
      "свиристел",
      "синиц",
      "сквор",
      "славк",
      "тимел"
    ]
  },
  {
    id: 3,
    title: "Поведение",
    roots: [
      "вьюр",
      "ткач",
      "медосос",
      // + alt_name
      "пополз",
      // + alt_name
      "сорокопут"
    ]
  },
  {
    id: 4,
    title: "Строение",
    roots: [
      "глаз",
      "толстоголовк",
      // род
      "клюв",
      "хвост"
    ]
  }
];
const FourFamilies = [
  // Corvida
  // 4 - Радужные птицы, Гуйи
  {
    name: "Радужные птицы",
    latin_name: "Pardalotidae",
    alternative_names: ["Пардалотидовые"],
    genera: [
      {
        name: "Радужные птицы",
        latin_name: "Pardalotus",
        species_length: 4,
        species: [
          {
            name: "Леопардовая радужная птица",
            latin_name: "Pardalotus punctatus",
            alternative_names: ["Леопардовый радужник", "Пятнистый пардалот"]
          },
          {
            name: "Тасманийская радужная птица",
            latin_name: "Pardalotus quadragintus",
            alternative_names: ["Тасманийский радужник"]
          },
          {
            name: "Краснобровая радужная птица",
            latin_name: "Pardalotus rubricatus"
          },
          {
            name: "Полосатая радужная птица",
            latin_name: "Pardalotus striatus",
            alternative_names: ["Желтопоясничная радужная птица"]
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 4
  },
  {
    name: "Гуйи",
    latin_name: "Callaeidae",
    alternative_names: ["новозеландские скворцы", "серёжковые скворцы"],
    genera: [
      {
        name: "Кокако",
        latin_name: "Callaeas",
        alternative_names: ["новозеландские скворцы"],
        species_length: 2,
        species: [
          {
            name: "Северный кокако",
            latin_name: "Callaeas wilsoni"
          },
          {
            name: "Южный кокако",
            latin_name: "Callaeas cinereus"
          }
        ]
      },
      {
        name: "седлоспинные гуйи",
        latin_name: "Philesturnus",
        alternative_names: ["седлистый гуйи"],
        species_length: 2,
        species: [
          {
            name: "Седлоспинная гуйя",
            latin_name: "Philesturnus carunculatus",
            alternative_names: ["южный седлоспин", "гуйя-седлоспин", "Теке", "Тико"]
          },
          {
            name: "Североостровная седлистая гуйя",
            latin_name: "Philesturnus rufusater"
          }
        ]
      }
    ],
    genera_length: 2,
    species_length: 4
  },
  // Passerida
  // 4 — Шелковистые свиристели, Багамские танагры, Phaenicophilidae, Бесхвостковые, Mitrospingidae, Йоровые, Хилиоты
  {
    name: "Шелковистые свиристели",
    latin_name: "Ptiliogonatidae",
    genera: [
      {
        name: "Чёрные свиристели",
        latin_name: "Phainopepla",
        species_length: 1,
        species: [{
          name: "Чёрный свиристель",
          latin_name: "Phainopepla nitens",
          alternative_names: ["чёрный шелковистый свиристель"]
        }]
      },
      {
        name: "Чёрно-жёлтые шелкохвостки",
        latin_name: "Phainoptila",
        species_length: 1,
        species: [{
          name: "Чёрно-жёлтая шелкохвостка",
          latin_name: "Phainoptila melanoxantha"
        }]
      },
      {
        name: "Шёлковые свиристели",
        latin_name: "Ptiliogonys",
        species_length: 2,
        species: [
          {
            name: "Длиннохвостый шёлковый свиристель",
            latin_name: "Ptiliogonys caudatus"
          },
          {
            name: "Серый шёлковый свиристель",
            latin_name: "Ptiliogonys cinereus"
          }
        ]
      }
    ],
    genera_length: 3,
    species_length: 4
  },
  {
    name: "",
    latin_name: "Spindalidae",
    genera: [
      {
        name: "Багамские танагры",
        latin_name: "Spindalis",
        alternative_names: ["Зены"],
        species_length: 4,
        species: [
          {
            name: "Багамская танагра",
            latin_name: "Spindalis zena",
            alternative_names: ["Кубинская зена", "Полосатоголовая танагра"]
          },
          {
            name: "Ямайская зена",
            latin_name: "Spindalis nigricephala"
          },
          {
            name: "Пуэрториканская зена",
            latin_name: "Spindalis portoricensis"
          },
          {
            name: "Гаитянская зена",
            latin_name: "Spindalis dominicensis"
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 4
  },
  {
    name: "",
    latin_name: "Phaenicophilidae",
    genera: [
      {
        name: "Земляные певуны",
        latin_name: "Microligea",
        species_length: 1,
        species: [
          {
            name: "Земляной певун",
            latin_name: "Microligea palustris"
          }
        ]
      },
      {
        name: "Пальмовые танагры",
        latin_name: "Phaenicophilus",
        species_length: 2,
        species: [
          {
            name: "Черношапочная пальмовая танагра",
            latin_name: "Phaenicophilus palmarum"
          },
          {
            name: "Серошапочная пальмовая танагра",
            latin_name: "Phaenicophilus poliocephalus"
          }
        ]
      },
      {
        name: "Ксенолигии",
        latin_name: "Xenoligea",
        species_length: 1,
        species: [
          {
            name: "Белокрылая ксенолигия",
            latin_name: "Xenoligea montana"
          }
        ]
      }
    ],
    genera_length: 3,
    species_length: 4
  },
  {
    name: "Бесхвостковые",
    latin_name: "Pnoepygidae",
    genera: [
      {
        name: "Бесхвостые тимелии",
        latin_name: "Pnoepyga",
        species_length: 4,
        species: [
          {
            name: "Большая бесхвостая тимелия",
            latin_name: "Pnoepyga albiventer",
            alternative_names: ["чешучатая бесхвостка"]
          },
          {
            name: "Тайваньская бесхвостая тимелия",
            latin_name: "Pnoepyga formosana",
            alternative_names: ["тайваньская бесхвостка"]
          },
          {
            name: "Пятнистая бесхвостая тимелия",
            latin_name: "Pnoepyga immaculata",
            alternative_names: ["бесхвостая тимелия", "гималайская бесхвостка"]
          },
          {
            name: "Малая бесхвостая тимелия",
            latin_name: "Pnoepyga pusilla",
            alternative_names: ["малая бесхвостка"]
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 4
  },
  {
    name: "",
    latin_name: "Mitrospingidae",
    genera: [
      {
        name: "Тростниковые танагры",
        latin_name: "Mitrospingus",
        species_length: 2,
        species: [
          {
            name: "Темнолицая тростниковая танагра",
            latin_name: "Mitrospingus cassinii"
          },
          {
            name: "Оливковоспинная тростниковая танагра",
            latin_name: "Mitrospingus oleagineus"
          }
        ]
      },
      {
        name: "Зелёные ортогонисы",
        latin_name: "Orthogonys",
        species_length: 1,
        species: [{
          name: "Зелёный ортогонис",
          latin_name: "Orthogonys chloricterus"
        }]
      },
      {
        name: "Чёрно-пегие танагры",
        latin_name: "Lamprospiza",
        species_length: 1,
        species: [{
          name: "Чёрно-пегая танагра",
          latin_name: "Lamprospiza melanoleuca"
        }]
      }
    ],
    genera_length: 3,
    species_length: 4
  },
  {
    name: "Йоровые",
    latin_name: "Aegithinidae",
    genera: [
      {
        name: "Йоры",
        latin_name: "Aegithina",
        species_length: 4,
        species: [
          {
            name: "Длинноклювая йора",
            latin_name: "Aegithina lafresnayei",
            alternative_names: ["Большая йора"]
          },
          {
            name: "Черношапочная йора",
            latin_name: "Aegithina nigrolutea"
          },
          {
            name: "Чернокрылая йора",
            latin_name: "Aegithina tiphia",
            alternative_names: ["Пестрокрылая йора"]
          },
          {
            name: "Зелёная йора",
            latin_name: "Aegithina viridissima",
            alternative_names: ["Изумрудная йора"]
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 4
  },
  {
    name: "",
    latin_name: "Hyliotidae",
    genera: [
      {
        name: "Хилиоты",
        latin_name: "Hyliota",
        species_length: 4,
        species: [
          {
            name: "Южная хилиота",
            latin_name: "Hyliota australis"
          },
          {
            name: "Желтобрюхая хилиота",
            latin_name: "Hyliota flavigaster"
          },
          {
            name: "Eзамбарская хилиота",
            latin_name: "Hyliota usambara"
          },
          {
            name: "Фиолетовая хилиота",
            latin_name: "Hyliota violacea"
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 4
  }
];
const TripleFamilies = [
  // Corvida
  // 3 - Чаучиллы, Oreoicidae, Мохуа, Щетинкоклювки, Cnemophilidae, Сителлы (Краснолицые поползни)
  {
    name: "Сителлы",
    latin_name: "Neosittidae",
    alternative_names: ["Краснолицые поползни"],
    genera: [
      {
        name: "Краснолицые поползни",
        latin_name: "Daphoenositta",
        species_length: 1,
        species: [
          {
            name: "Изменчивая сителла",
            latin_name: "Daphoenositta chrysoptera",
            alternative_names: ["Пестроспинный краснолицый поползень"]
          },
          {
            name: "Горная сителла",
            latin_name: "Daphoenositta papuensis",
            alternative_names: ["Папуанский краснолицый поползень"]
          },
          {
            name: "Краснолицый поползень",
            latin_name: "Daphoenositta miranda",
            alternative_names: ["Черный краснолицый поползень"]
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 3
  },
  {
    name: "",
    latin_name: "Cnemophilidae",
    genera: [
      {
        name: "Желтобрюхие райские птицы",
        latin_name: "Loboparadisea",
        species_length: 1,
        species: [
          {
            name: "Желтобрюхая райская птица",
            latin_name: "Loboparadisea sericea"
          }
        ]
      },
      {
        name: "Многохохлые райские птицы",
        latin_name: "Cnemophilus",
        species_length: 2,
        species: [
          {
            name: "Многохохлая райская птица",
            latin_name: "Cnemophilus macgregorii",
            alternative_names: ["Серпохо́хлая райская птица"]
          },
          {
            name: "Райская птица-лория",
            latin_name: "Cnemophilus loriae"
          }
        ]
      }
    ],
    genera_length: 2,
    species_length: 3
  },
  {
    name: "",
    latin_name: "Dasyornithidae",
    genera: [
      {
        name: "Щетинкоклювки",
        latin_name: "Dasyornis",
        species_length: 3,
        species: [
          {
            name: "Буроголовая щетинкоклювка",
            latin_name: "Dasyornis brachypterus"
          },
          {
            name: "Рыжеголовая щетинкоклювка",
            latin_name: "Dasyornis broadbenti"
          },
          {
            name: "Длинноклювая щетинкоклювка",
            latin_name: "Dasyornis longirostris"
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 3
  },
  {
    name: "",
    latin_name: "Mohouidae",
    genera: [
      {
        name: "Мохуа",
        latin_name: "Mohoua",
        species_length: 3,
        species: [
          {
            name: "Белоголовая мохуа",
            latin_name: "Mohoua albicilla",
            alternative_names: ["Белоголовая мого"]
          },
          {
            name: "Буроголовая мохуа",
            latin_name: "Mohoua novaeseelandiae",
            alternative_names: ["Пипипи", "Пипи"]
          },
          {
            name: "Желтоголовая мохуа",
            latin_name: "Mohoua ochrocephala",
            alternative_names: ["Мохуа"]
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 3
  },
  {
    name: "",
    latin_name: "Oreoicidae",
    genera: [
      {
        name: "",
        latin_name: "Aleadryas",
        species_length: 1,
        species: [
          {
            name: "Рыжезатылочный свистун",
            latin_name: "Aleadryas rufinucha"
          }
        ]
      },
      {
        name: "",
        latin_name: "Ornorectes",
        species_length: 1,
        species: [
          {
            name: "Хохлатая дроздовая мухоловка",
            latin_name: "Ornorectes cristatus"
          }
        ]
      },
      {
        name: "Австралийские птицы-колокольчики",
        latin_name: "Oreoica",
        species_length: 1,
        species: [
          {
            name: "Австралийская птица-колокольчик",
            latin_name: "Oreoica gutturalis"
          }
        ]
      }
    ],
    genera_length: 3,
    species_length: 3
  },
  {
    name: "Флейтистовые",
    latin_name: "Orthonychidae",
    alternative_names: ["Чаучилловые"],
    genera: [
      {
        name: "Чаучиллы",
        latin_name: "Orthonyx",
        alternative_names: ["Острохвосты"],
        species_length: 3,
        species: [
          {
            name: "Папуанская чаучилла",
            latin_name: "Orthonyx novaeguineae",
            alternative_names: ["Новогвинейский острохвост"]
          },
          {
            name: "Иглохвостая чаучилла",
            latin_name: "Orthonyx temminckii",
            alternative_names: ["Австралийский острохвост"]
          },
          {
            name: "Черноголовая чаучилла",
            latin_name: "Orthonyx spaldingii",
            alternative_names: ["Чаучилла"]
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 3
  },
  // Passerida
  // 3 — Свиристели, Никаторы, Иреновые, Paramythiidae, Modulatricidae, Краснохохлые мухоловки
  {
    name: "Свиристелевые",
    latin_name: "Bombycillidae",
    genera: [
      {
        name: "Свиристели",
        latin_name: "Bombycilla",
        species_length: 3,
        species: [
          {
            name: "Свиристель",
            latin_name: "Bombycilla garrulus",
            alternative_names: ["Обыкновенный свиристель"]
          },
          {
            name: "Амурский свиристель",
            latin_name: "Bombycilla japonica",
            alternative_names: ["Японский свиристель"]
          },
          {
            name: "Американский свиристель",
            latin_name: "Bombycilla cedrorum",
            alternative_names: ["Кедровый свиристель"]
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 3
  },
  {
    name: "",
    latin_name: "Nicatoridae",
    genera: [
      {
        name: "Никаторы",
        latin_name: "Nicator",
        species_length: 3,
        species: [
          {
            name: "Серогорлый никатор",
            latin_name: "Nicator chloris"
          },
          {
            name: "Буроголовый никатор ",
            latin_name: "Nicator gulari"
          },
          {
            name: "Желтогорлый никатор",
            latin_name: "Nicator vireo"
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 3
  },
  {
    name: "",
    latin_name: "Irenidae",
    alternative_names: ["Иреновые"],
    genera: [
      {
        name: "Ирены",
        latin_name: "Irena",
        species_length: 3,
        species: [
          {
            name: "Голубая ирена",
            latin_name: "Irena puella",
            alternative_names: ["Сине-чёрная ирена"]
          },
          {
            name: "Кобальтовая ирена",
            latin_name: "Irena cyanogastra"
          },
          {
            name: "Палаванская ирена",
            latin_name: "Irena tweeddalii"
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 3
  },
  {
    name: "",
    latin_name: "Paramythiidae",
    genera: [
      {
        name: "Синичьи фруктоеды",
        latin_name: "Oreocharis",
        species_length: 1,
        species: [{
          name: "Синичий фруктоед",
          latin_name: "Oreocharis arfaki"
        }]
      },
      {
        name: "Хохлатые парамитии",
        latin_name: "Paramythia",
        species_length: 2,
        species: [
          {
            name: "Хохлатая парамития",
            latin_name: "Paramythia montium"
          },
          {
            name: "Восточный хохлатый фруктоед",
            latin_name: "Paramythia olivacea"
          }
        ]
      }
    ],
    genera_length: 2,
    species_length: 3
  },
  {
    name: "",
    latin_name: "Modulatricidae",
    genera: [
      {
        name: "",
        latin_name: "Arcanator",
        species_length: 1,
        species: [{
          name: "Горный бурый бюльбюль",
          latin_name: "Arcanator orostruthus"
        }]
      },
      {
        name: "Бюльбюлевые дрозды",
        latin_name: "Modulatrix",
        species_length: 1,
        species: [{
          name: "Бюльбюлевый дрозд",
          latin_name: "Modulatrix stictigula"
        }]
      },
      {
        name: "",
        latin_name: "Kakamega",
        species_length: 1,
        species: [{
          name: "Серобрюхая мышиная тимелия",
          latin_name: "Kakamega poliothorax"
        }]
      }
    ],
    genera_length: 3,
    species_length: 3
  },
  {
    name: "",
    latin_name: "Erythrocercidae",
    genera: [
      {
        name: "Краснохохлые мухоловки",
        latin_name: "Erythrocercus",
        species_length: 3,
        species: [
          {
            name: "Золотоспинная краснохохлая мухоловка",
            latin_name: "Erythrocercus holochlorus"
          },
          {
            name: "Краснохохлая мухоловка Ливингстона",
            latin_name: "Erythrocercus livingstonei"
          },
          {
            name: "Бурошапочная краснохохлая мухоловка",
            latin_name: "Erythrocercus mccallii"
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 3
  }
];
const TwiceFamilies = [
  // Corvida
  // 2 - Сахарные медососы, Лодкоклювые мухоловки, Снегирёвые сойки, Кустарниковые птицы, Лирохвосты
  {
    name: "Сахарные медососы",
    latin_name: "Promeropidae",
    genera: [
      {
        name: "Сахарные медососы",
        latin_name: "Promerops",
        alternative_names: ["Cахарные птицы"],
        species_length: 2,
        species: [
          {
            name: "Родезийский сахарный медосос",
            latin_name: "Promerops gurneyi"
          },
          {
            name: "Капский сахарный медосос",
            latin_name: "Promerops cafer"
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 2
  },
  {
    name: "",
    latin_name: "Machaerirhynchidae",
    genera: [
      {
        name: "Лодкоклювые мухоловки",
        latin_name: "Machaerirhynchus",
        species_length: 2,
        species: [
          {
            name: "Желтогрудая лодкоклювая мухоловка",
            latin_name: "Machaerirhynchus flaviventer"
          },
          {
            name: "Чернопятнистая лодкоклювая мухоловка",
            latin_name: "Machaerirhynchus nigripectus"
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 2
  },
  {
    name: "Снегирёвые сойки",
    latin_name: "Corcoracidae",
    genera: [
      {
        name: "Снегирёвые сойки",
        latin_name: "Struthidea",
        species_length: 1,
        species: [
          {
            name: "Cнегирёвая сойка",
            latin_name: "Struthidea cinerea",
            alternative_names: ["Птица-апостол"]
          }
        ]
      },
      {
        name: "",
        latin_name: "Corcorax",
        species_length: 1,
        species: [
          {
            name: "Белокрылая галка",
            latin_name: "Corcorax melanorhamphos",
            alternative_names: ["Белокрылая клушица", "Белокрылый сорочий жаворонок"]
          }
        ]
      }
    ],
    genera_length: 2,
    species_length: 2
  },
  {
    name: "Кустарниковые птицы",
    latin_name: "Atrichornithidae",
    genera: [
      {
        name: "Кустарниковые птицы",
        latin_name: "Atrichornis",
        alternative_names: ["Атрихии"],
        species_length: 2,
        species: [
          {
            name: "Рыжая кустарниковая птица",
            latin_name: "Atrichornis rufescens",
            alternative_names: ["Рыжая атрихия"]
          },
          {
            name: "Крикливая кустарниковая птица",
            latin_name: "Atrichornis clamosus",
            alternative_names: ["Крикливая атрихия"]
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 2
  },
  {
    name: "Лирохвосты",
    latin_name: "Menuridae",
    genera: [
      {
        name: "Лирохвосты",
        latin_name: "Menura",
        alternative_names: ["Птицы-лиры"],
        species_length: 2,
        species: [
          {
            name: "Большая птица-лира",
            latin_name: "Menura novaehollandiae",
            alternative_names: ["Обыкновенный лирохвост"]
          },
          {
            name: "Малая птица-лира",
            latin_name: "Menura alberti",
            alternative_names: ["Альбертов лирохвост", "Альбертов северный лирохвост"]
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 2
  },
  // Passerida
  // 2 — Скальные прыгуны, Буйволовые скворцы, Лысые вороны, Трясогузковые певуны, Корнихоны, Hyliidae
  {
    name: "",
    latin_name: "Chaetopidae",
    genera: [
      {
        name: "Скальные прыгуны",
        latin_name: "Chaetops",
        species_length: 2,
        species: [
          {
            name: "Рыжебрюхий прыгун",
            latin_name: "Chaetops aurantius",
            alternative_names: ["Драконовый прыгун"]
          },
          {
            name: "Скальный прыгун",
            latin_name: "Chaetops frenatus",
            alternative_names: ["Капский прыгун"]
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 2
  },
  {
    name: "",
    latin_name: "Buphagidae",
    genera: [
      {
        name: "Буйволовые скворцы",
        latin_name: "Buphagus",
        alternative_names: ["Волоклюи"],
        species_length: 2,
        species: [
          {
            name: "Желтоклювый буйволовый скворец",
            latin_name: "Buphagus africanus"
          },
          {
            name: "Красноклювый буйволовый скворец",
            latin_name: "Buphagus erythrorhynchus"
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 2
  },
  {
    name: "",
    latin_name: "Picathartidae",
    genera: [
      {
        name: "Лысые вороны",
        latin_name: "Picathartes",
        alternative_names: ["Лысые сороки"],
        species_length: 2,
        species: [
          {
            name: "Восточная лысая ворона",
            latin_name: "Picathartes oreas",
            alternative_names: ["Серошейная лысая ворона"]
          },
          {
            name: "Западная лысая ворона",
            latin_name: "Picathartes gymnocephalus",
            alternative_names: ["Белошейная лысая ворона"]
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 2
  },
  {
    name: "",
    latin_name: "Teretistridae",
    genera: [
      {
        name: "Трясогузковые певуны",
        latin_name: "Teretistris",
        species_length: 2,
        species: [
          {
            name: "Восточный трясогузковый певун",
            latin_name: "Teretistris fornsi"
          },
          {
            name: "Желтоголовый трясогузковый певун",
            latin_name: "Teretistris fernandinae"
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 2
  },
  {
    name: "",
    latin_name: "Calyptophilidae",
    genera: [
      {
        name: "Корнихоны",
        latin_name: "Calyptophilus",
        species_length: 2,
        species: [
          {
            name: "Корнихон",
            latin_name: "Calyptophilus frugivorus",
            alternative_names: ["Танагровый певун", "Восточный корнихон"]
          },
          {
            name: "Западный корнихон",
            latin_name: "Calyptophilus tertius",
            alternative_names: ["Западный танагровый певун"]
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 2
  },
  {
    name: "",
    latin_name: "Hyliidae",
    genera: [
      {
        name: "",
        latin_name: "Hylia",
        species_length: 1,
        species: [
          {
            name: "Хилия",
            latin_name: "Hylia prasina"
          }
        ]
      },
      {
        name: "Фолидорнисы",
        latin_name: "Pholidornis",
        species_length: 1,
        species: [
          {
            name: "Фолидорнис",
            latin_name: "Pholidornis rushiae"
          }
        ]
      }
    ],
    genera_length: 2,
    species_length: 2
  }
];
const MonoFamilies = [
  // Corvida
  // 1 - Волнистая толстоголовка, Серёжчатая толстоголовка, Хохлатая малайская сойка, Щетинкоголовый сорокопут, Новозеландский медосос (хИхи), Синеголовая ифрита
  {
    name: "",
    latin_name: "Notiomystidae",
    genera: [
      {
        name: "Новозеландские медососы",
        latin_name: "Notiomystis",
        species_length: 1,
        species: [{
          name: "Новозеландский медосос",
          latin_name: "Notiomystis cincta",
          alternative_names: ["Хихи"]
        }]
      }
    ],
    genera_length: 1,
    species_length: 1
  },
  {
    name: "Калимантанские сорокопуты",
    latin_name: "Pityriasidae",
    genera_length: 1,
    genera: [
      {
        name: "Щетинковые сорокопуты",
        latin_name: "Pityriasis",
        species_length: 1,
        species: [{
          name: "Щетинковый сорокопут",
          latin_name: "Pityriasis gymnocephala",
          alternative_names: ["Щетинкоголовый сорокопут"]
        }]
      }
    ],
    species_length: 1
  },
  {
    name: "",
    latin_name: "Platylophidae",
    genera: [
      {
        name: "Хохлатые малайские сойки",
        latin_name: "Platylophus",
        species_length: 1,
        species: [{
          name: "Хохлатая малайская сойка",
          latin_name: "Platylophus galericulatus"
        }]
      }
    ],
    genera_length: 1,
    species_length: 1
  },
  {
    name: "Серёжчатая толстоголовка",
    latin_name: "Eulacestomatidae",
    genera: [
      {
        name: "Серёжчатые толстоголовки",
        latin_name: "Eulacestoma",
        species_length: 1,
        species: [{
          name: "Серёжчатая толстоголовка",
          latin_name: "Eulacestoma nigropectus"
        }]
      }
    ],
    genera_length: 1,
    species_length: 1
  },
  {
    name: "",
    latin_name: "Rhagologidae",
    genera: [
      {
        name: "Волнистые толстоголовки",
        latin_name: "Rhagologus",
        species_length: 1,
        species: [{
          name: "Волнистая толстоголовка",
          latin_name: "Rhagologus leucostigma"
        }]
      }
    ],
    genera_length: 1,
    species_length: 1
  },
  {
    name: "",
    latin_name: "Ifritidae",
    genera: [
      {
        name: "Ифриты",
        latin_name: "Ifrita",
        species_length: 1,
        species: [{
          name: "Синеголовая ифрита",
          latin_name: "Ifrita kowaldi",
          alternative_names: ["Синеша́почная ифрита"]
        }]
      }
    ],
    genera_length: 1,
    species_length: 1
  },
  // Passerida
  // 1 — Иктерия, Стенолаз, Скотоцерка, Усатая_синица, Оливковый_певун, Пальмовый_чекан, Танагра-кео, 
  //      Флейтист-пастушок, Пуэрто-риканская_танагра, Пятнистый_крапивниковый_бабблер, Крапивниковый_дрозд, 
  //      Чечевица_Пржевальского, Сорокопутовый_свиристель, Целебесская_толстоголовка, Черноголовый_пересмешник
  {
    name: "Скотоцерковые",
    latin_name: "Scotocercidae",
    genera: [
      {
        name: "Скотоцерки",
        latin_name: "Scotocerca",
        species_length: 1,
        species: [{
          name: "Скотоцерка",
          latin_name: "Scotocerca inquieta",
          alternative_names: ["Вертлявая славка"]
        }]
      }
    ],
    genera_length: 1,
    species_length: 1
  },
  {
    name: "",
    latin_name: "Tichodromidae",
    genera: [
      {
        name: "Стенолазы",
        latin_name: "Tichodroma",
        species_length: 1,
        species: [{
          name: "Стенола́з",
          latin_name: "Tichodroma muraria",
          alternative_names: ["Краснокры́лый стенола́з"]
        }]
      }
    ],
    genera_length: 1,
    species_length: 1
  },
  {
    name: "",
    latin_name: "Icteriidae",
    genera: [
      {
        name: "Иктерии",
        latin_name: "Icteria",
        species_length: 1,
        species: [{
          name: "Иктерия",
          latin_name: "Icteria virens"
        }]
      }
    ],
    genera_length: 1,
    species_length: 1
  },
  {
    name: "Усатые синицы",
    latin_name: "Panuridae",
    genera: [
      {
        name: "Усатые синицы",
        latin_name: "Panurus",
        species_length: 1,
        species: [{
          name: "Усатая синица",
          latin_name: "Panurus biarmicus",
          alternative_names: ["Бородатка", "Тростниковая синица", "Камышовая синица", "Суторок"]
        }]
      }
    ],
    genera_length: 1,
    species_length: 1
  },
  {
    name: "Оливковые певуны",
    latin_name: "Peucedramidae",
    genera: [
      {
        name: "",
        latin_name: "Peucedramus",
        species_length: 1,
        species: [{
          name: "Оливковый певун",
          latin_name: "Peucedramus taeniatus"
        }]
      }
    ],
    genera_length: 1,
    species_length: 1
  },
  {
    name: "Пальмовые чеканы",
    latin_name: "Dulidae",
    genera: [
      {
        name: "Пальмовые чеканы",
        latin_name: "Dulus",
        species_length: 1,
        species: [{
          name: "Пальмовый чекан",
          latin_name: "Dulus dominicus"
        }]
      }
    ],
    genera_length: 1,
    species_length: 1
  },
  {
    name: "",
    latin_name: "Rhodinocichlidae",
    genera: [
      {
        name: "Танагры-кео",
        latin_name: "Rhodinocichla",
        species_length: 1,
        species: [{
          name: "Танагра-кео",
          latin_name: "Rhodinocichla rosea"
        }]
      }
    ],
    genera_length: 1,
    species_length: 1
  },
  {
    name: "",
    latin_name: "Eupetidae",
    genera: [
      {
        name: "Флейтисты-пастушки",
        latin_name: "Eupetes",
        species_length: 1,
        species: [{
          name: "Флейтист-пастушок",
          latin_name: "Eupetes macrocerus",
          alternative_names: ["Пастушковый бегун"]
        }]
      }
    ],
    genera_length: 1,
    species_length: 1
  },
  {
    name: "",
    latin_name: "Nesospingidae",
    genera: [
      {
        name: "Пуэрто-риканские танагры",
        latin_name: "Nesospingus",
        species_length: 1,
        species: [{
          name: "Пуэрто-риканская танагра",
          latin_name: "Nesospingus speculiferus"
        }]
      }
    ],
    genera_length: 1,
    species_length: 1
  },
  {
    name: "",
    latin_name: "Elachuridae",
    genera: [
      {
        name: "",
        latin_name: "Elachura",
        species_length: 1,
        species: [{
          name: "Пятнистый крапивниковый бабблер",
          latin_name: "Elachura formosa"
        }]
      }
    ],
    genera_length: 1,
    species_length: 1
  },
  {
    name: "",
    latin_name: "Zeledoniidae",
    genera: [
      {
        name: "Крапивниковые дрозды",
        latin_name: "Zeledonia",
        species_length: 1,
        species: [{
          name: "Крапивниковый дрозд",
          latin_name: "Zeledonia coronata"
        }]
      }
    ],
    genera_length: 1,
    species_length: 1
  },
  {
    name: "",
    latin_name: "Urocynchramidae",
    genera: [
      {
        name: "Чечевицы Пржевальского",
        latin_name: "Urocynchramus",
        species_length: 1,
        species: [{
          name: "Чечевица Пржевальского",
          latin_name: "Urocynchramus pylzowi"
        }]
      }
    ],
    genera_length: 1,
    species_length: 1
  },
  {
    name: "Сорокопутовые свиристели",
    latin_name: "Hypocoliidae",
    genera: [
      {
        name: "Сорокопутовые свиристели",
        latin_name: "Hypocolius",
        species_length: 1,
        species: [{
          name: "Сорокопутовый свиристель",
          latin_name: "Hypocolius ampelinus"
        }]
      }
    ],
    genera_length: 1,
    species_length: 1
  },
  {
    name: "",
    latin_name: "Hylocitreidae",
    genera: [
      {
        name: "Целебесские толстоголовки",
        latin_name: "Hylocitrea",
        species_length: 1,
        species: [{
          name: "Целебесская толстоголовка",
          latin_name: "Hylocitrea bonensis"
        }]
      }
    ],
    genera_length: 1,
    species_length: 1
  },
  {
    name: "",
    latin_name: "Donacobiidae",
    genera: [
      {
        name: "Черноголовые пересмешники",
        latin_name: "Donacobius",
        species_length: 1,
        species: [{
          name: "Черноголовый пересмешник",
          latin_name: "Donacobius atricapilla"
        }]
      }
    ],
    genera_length: 1,
    species_length: 1
  }
];
const GroupFamiliesTo5 = {
  max_species_length: 4,
  min_species_length: 1,
  families: [
    ...MonoFamilies,
    ...TwiceFamilies,
    ...TripleFamilies,
    ...FourFamilies
  ]
};
const TwentyToFamily = [
  // 18 - Африканские славки
  {
    name: "Африканские славки",
    latin_name: "Macrosphenidae",
    genera: [
      {
        name: "",
        latin_name: "Achaetops",
        species_length: 1,
        species: [
          {
            name: "Дамарская большехвостая славка",
            latin_name: "Achaetops pycnopygius"
          }
        ]
      },
      {
        name: "",
        latin_name: "Cryptillas",
        species_length: 1,
        species: [
          {
            name: "Рыжегрудая пестрогрудка",
            latin_name: "Cryptillas victorini"
          }
        ]
      },
      {
        name: "Бюльбюлевые славки",
        latin_name: "Macrosphenus",
        species_length: 5,
        species: [
          {
            name: "Оливковая бюльбюлевая славка",
            latin_name: "Macrosphenus concolor"
          },
          {
            name: "Желтобрюхая бюльбюлевая славка",
            latin_name: "Macrosphenus flavicans"
          },
          {
            name: "Рыжебокая бюльбюлевая славка",
            latin_name: "Macrosphenus kempi"
          },
          {
            name: "Суахильская бюльбюлевая славка",
            latin_name: "Macrosphenus kretschmeri"
          },
          {
            name: "Ангольская бюльбюлевая славка",
            latin_name: "Macrosphenus pulitzeri"
          }
        ]
      },
      {
        name: "",
        latin_name: "Melocichla",
        species_length: 1,
        species: [
          {
            name: "Усатая большехвостая славка",
            latin_name: "Melocichla mentalis"
          }
        ]
      },
      {
        name: "Большехвостые славки",
        latin_name: "Sphenoeacus",
        species_length: 1,
        species: [
          {
            name: "Капская большехвостая славка",
            latin_name: "Sphenoeacus afer"
          }
        ]
      },
      {
        name: "Сильвиетты",
        latin_name: "Sylvietta",
        species_length: 9,
        species: [
          {
            name: "Буробрюхая сильвиетта",
            latin_name: "Sylvietta brachyura"
          },
          {
            name: "Лимоннобрюхая сильвиетта",
            latin_name: "Sylvietta denti"
          },
          {
            name: "Сомалийская сильвиетта",
            latin_name: "Sylvietta isabellina"
          },
          {
            name: "Белобровая сильвиетта",
            latin_name: "Sylvietta leucophrys"
          },
          {
            name: "Белобрюхая сильвиетта",
            latin_name: "Sylvietta philippae"
          },
          {
            name: "Длинноклювая сильвиетта",
            latin_name: "Sylvietta rufescens"
          },
          {
            name: "Красноухая сильвиетта",
            latin_name: "Sylvietta ruficapilla"
          },
          {
            name: "Зелёная сильвиетта",
            latin_name: "Sylvietta virens"
          },
          {
            name: "Краснолицая сильвиетта",
            latin_name: "Sylvietta whytii"
          }
        ]
      }
    ],
    genera_length: 6,
    species_length: 18
  },
  // 13 - Длиннохвостые синицы
  {
    name: "Длиннохвостые синицы",
    latin_name: "Aegithalidae",
    alternative_names: ["Ополовники"],
    genera: [
      {
        name: "Длиннохвостые синицы",
        latin_name: "Aegithalos",
        alternative_names: ["Ополовники"],
        species_length: 10,
        species: [
          {
            name: "Чернобровая длиннохвостая синица",
            latin_name: "Aegithalos bonvaloti"
          },
          {
            name: "Длиннохвостая синица",
            latin_name: "Aegithalos caudatus",
            alternative_names: ["ополовник"]
          },
          {
            name: "Рыжеголовая длиннохвостая синица",
            latin_name: "Aegithalos concinnus"
          },
          {
            name: "Псалтрия-карлик",
            latin_name: "Aegithalos exilis"
          },
          {
            name: "Сероголовая длиннохвостая синица",
            latin_name: "Aegithalos fuliginosus"
          },
          {
            name: "",
            latin_name: "Aegithalos glaucogularis"
          },
          {
            name: "Ржавощёкая длиннохвостая синица",
            latin_name: "Aegithalos iouschistos"
          },
          {
            name: "Черногорлая длиннохвостая синица",
            latin_name: "Aegithalos leucogenys"
          },
          {
            name: "Белогорлый ополовник",
            latin_name: "Aegithalos niveogularis"
          },
          {
            name: "",
            latin_name: "Aegithalos sharpei"
          }
        ]
      },
      {
        name: "Кустарниковые синицы",
        latin_name: "Psaltriparus",
        species_length: 1,
        species: [
          {
            name: "Темношапочная кустарниковая синица",
            latin_name: "Psaltriparus minimus"
          }
        ]
      },
      {
        name: "Расписные синички",
        latin_name: "Leptopoecile",
        species_length: 2,
        species: [
          {
            name: "Расписная синичка",
            latin_name: "Leptopoecile sophiae",
            alternative_names: ["обыкновенная расписная синичка"]
          },
          {
            name: "Хохлатая расписная синичка",
            latin_name: "Leptopoecile elegans"
          }
        ]
      }
    ],
    genera_length: 3,
    species_length: 13
  },
  // 12 - Завирушки, Листовки, Melanocharitidae
  {
    name: "Завирушковые",
    latin_name: "Prunellidae",
    genera: [
      {
        name: "Завирушки",
        latin_name: "Prunella",
        species_length: 12,
        species: [
          {
            name: "Черногорлая завирушка",
            latin_name: "Prunella atrogularis"
          },
          {
            name: "Альпийская завирушка",
            latin_name: "Prunella collaris"
          },
          {
            name: "Бледная завирушка",
            latin_name: "Prunella fulvescens"
          },
          {
            name: "Гималайская завирушка",
            latin_name: "Prunella himalayana"
          },
          {
            name: "Шиферная завирушка",
            latin_name: "Prunella immaculata"
          },
          {
            name: "Завирушка Козлова",
            latin_name: "Prunella koslowi"
          },
          {
            name: "Лесная завирушка",
            latin_name: "Prunella modularis"
          },
          {
            name: "Сибирская завирушка",
            latin_name: "Prunella montanella"
          },
          {
            name: "Пёстрая завирушка",
            latin_name: "Prunella ocularis",
            alternative_names: ["персидская завирушка"]
          },
          {
            name: "Рыжегорлая завирушка",
            latin_name: "Prunella rubeculoides"
          },
          {
            name: "Японская завирушка",
            latin_name: "Prunella rubida"
          },
          {
            name: "Рыжегрудая завирушка",
            latin_name: "Prunella strophiata"
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 12
  },
  {
    name: "Листовковые",
    latin_name: "Chloropseidae",
    genera: [
      {
        name: "Листовки",
        latin_name: "Chloropsis",
        species_length: 12,
        species: [
          {
            name: "Золотистолобая листовка",
            latin_name: "Chloropsis aurifrons",
            alternative_names: ["золотоло́бая", "желтоло́бая листо́вка"]
          },
          {
            name: "Синекрылая листовка",
            latin_name: "Chloropsis cochinchinensis",
            alternative_names: ["Голубокрылая листовка"]
          },
          {
            name: "Малая листовка",
            latin_name: "Chloropsis cyanopogon",
            alternative_names: ["малоклювая листовка"]
          },
          {
            name: "Филиппинская листовка",
            latin_name: "Chloropsis flavipennis",
            alternative_names: ["желтокрылая листовка"]
          },
          {
            name: "Оранжевобрюхая листовка",
            latin_name: "Chloropsis hardwickii"
          },
          {
            name: "индийская листовка",
            latin_name: "Chloropsis jerdoni",
            alternative_names: ["листовка Джердона"]
          },
          {
            name: "Борнейская листовка",
            latin_name: "Chloropsis kinabaluensis"
          },
          {
            name: "суматранская листовка",
            latin_name: "Chloropsis media"
          },
          {
            name: "борнейская листовка",
            latin_name: "Chloropsis moluccensis"
          },
          {
            name: "Палаванская листовка",
            latin_name: "Chloropsis palawanensis"
          },
          {
            name: "Большая листовка",
            latin_name: "Chloropsis sonnerati",
            alternative_names: ["Листовка Соннерата"]
          },
          {
            name: "Синелобая листовка",
            latin_name: "Chloropsis venusta",
            alternative_names: ["Синемаскированная листовка"]
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 12
  },
  {
    name: "",
    latin_name: "Melanocharitidae",
    genera: [
      {
        name: "Фруктоеды",
        latin_name: "Melanocharis",
        species_length: 6,
        species: [
          {
            name: "Тёмный фруктоед",
            latin_name: "Melanocharis arfakiana"
          },
          {
            name: "Чёрный фруктоед",
            latin_name: "Melanocharis nigra"
          },
          {
            name: "Длиннохвостый фруктоед",
            latin_name: "Melanocharis longicauda"
          },
          {
            name: "Сорочий фруктоед",
            latin_name: "Melanocharis versteri"
          },
          {
            name: "Пестробрюхий фруктоед",
            latin_name: "Melanocharis striativentris"
          },
          {
            name: "Атласный фруктоед",
            latin_name: "Melanocharis citreola"
          }
        ]
      },
      {
        name: "Эдистомы",
        latin_name: "Oedistoma",
        species_length: 2,
        species: [
          {
            name: "Маленькая эдистома",
            latin_name: "Oedistoma iliolophum"
          },
          {
            name: "Эдистома-крошка",
            latin_name: "Oedistoma pygmaeum"
          }
        ]
      },
      {
        name: "Толстоклювые ягодоеды",
        latin_name: "Rhamphocharis",
        species_length: 2,
        species: [
          {
            name: "Толстоклювый ягодоед",
            latin_name: "Rhamphocharis crassirostris"
          },
          {
            name: "Пятнистая ягодница",
            latin_name: "Rhamphocharis piperata"
          }
        ]
      },
      {
        name: "Длинноклювые медососы",
        latin_name: "Toxorhamphus",
        species_length: 2,
        species: [
          {
            name: "Желтобрюхий длинноклювый медосос",
            latin_name: "Toxorhamphus novaeguineae"
          },
          {
            name: "Серогорлый длинноклювый медосос",
            latin_name: "Toxorhamphus novaeguineae"
          }
        ]
      }
    ],
    genera_length: 4,
    species_length: 12
  },
  // 11 - Ремезовые, Bernieridae
  {
    name: "Ремезовые",
    latin_name: "Remizidae",
    genera: [
      {
        name: "Ремезы",
        latin_name: "Remiz",
        species_length: 4,
        species: [
          {
            name: "Обыкновенный ремез",
            latin_name: "Remiz pendulinus"
          },
          {
            name: "Тростниковый ремез",
            latin_name: "Remiz macronyx",
            alternative_names: ["Толстоклювый ремез"]
          },
          {
            name: "Китайский ремез",
            latin_name: "Remiz consobrinus"
          },
          {
            name: "Венценосный ремез",
            latin_name: "Remiz coronatus",
            alternative_names: ["Черноголовый ремез"]
          }
        ]
      },
      {
        name: "",
        latin_name: "Anthoscopus",
        species_length: 6,
        species: [
          {
            name: "Белолобый ремез",
            latin_name: "Anthoscopus caroli"
          },
          {
            name: "Золотолобый ремез",
            latin_name: "Anthoscopus flavifrons"
          },
          {
            name: "Капский ремез",
            latin_name: "Anthoscopus minutus"
          },
          {
            name: "Мышиный ремез",
            latin_name: "Anthoscopus musculus"
          },
          {
            name: "Сенегальский ремез",
            latin_name: "Anthoscopus parvulus"
          },
          {
            name: "Суданский ремез",
            latin_name: "Anthoscopus punctifrons"
          }
        ]
      },
      {
        name: "Американские ремезы",
        latin_name: "Auriparus",
        species_length: 1,
        species: [
          {
            name: "Американский ремез",
            latin_name: "Auriparus flaviceps"
          }
        ]
      }
    ],
    genera_length: 3,
    species_length: 11
  },
  {
    name: "Мадагаскарские славки",
    latin_name: "Bernieridae",
    genera: [
      {
        name: "Фодитани",
        latin_name: "Oxylabes",
        species_length: 1,
        species: [
          {
            name: "Фодитани",
            latin_name: "Oxylabes madagascariensis"
          }
        ]
      },
      {
        name: "",
        latin_name: "Hartertula",
        species_length: 1,
        species: [
          {
            name: "Клинохвостая эресса",
            latin_name: "Hartertula flavoviridis",
            alternative_names: ["Клинохвостая тетрака"]
          }
        ]
      },
      {
        name: "",
        latin_name: "Crossleyia",
        species_length: 1,
        species: [
          {
            name: "Желтобровая тетрака",
            latin_name: "Crossleyia xanthophrys",
            alternative_names: ["Мрачный бурый бюльбюль"]
          }
        ]
      },
      {
        name: "Киритики",
        latin_name: "Thamnornis",
        species_length: 1,
        species: [
          {
            name: "Киритика",
            latin_name: "Thamnornis chloropetoides"
          }
        ]
      },
      {
        name: "Рандии",
        latin_name: "Randia",
        species_length: 1,
        species: [
          {
            name: "Рандия",
            latin_name: "Randia pseudozosterops"
          }
        ]
      },
      {
        name: "",
        latin_name: "Cryptosylvicola",
        species_length: 1,
        species: [
          {
            name: "Симитси",
            latin_name: "Cryptosylvicola randrianasoloi",
            alternative_names: ["мадагаскарская скрытная камышевка"]
          }
        ]
      },
      {
        name: "",
        latin_name: "Xanthomixis",
        species_length: 4,
        species: [
          {
            name: "Бурый бюльбюль Апперта",
            latin_name: "Xanthomixis apperti"
          },
          {
            name: "Серошапочный бурый бюльбюль",
            latin_name: "Xanthomixis cinereiceps"
          },
          {
            name: "Короткоклювый бурый бюльбюль",
            latin_name: "Xanthomixis zosterops"
          },
          {
            name: "Мрачный бурый бюльбюль",
            latin_name: "Crossleyia tenebrosa"
          }
        ]
      },
      {
        name: "",
        latin_name: "Bernieria",
        species_length: 1,
        species: [
          {
            name: "Длинноклювая тетрака",
            latin_name: "Bernieria madagascariensis",
            alternative_names: ["тетрака", "Мадагаскарский бурый бюльбюль"]
          }
        ]
      }
    ],
    genera_length: 8,
    species_length: 11
  },
  // 10 - Альциппы
  {
    name: "",
    latin_name: "Alcippeidae",
    genera: [
      {
        name: "Альциппы",
        latin_name: "Alcippe",
        species_length: 10,
        species: [
          {
            name: "Бурохвостая альциппа",
            latin_name: "Alcippe brunneicauda",
            alternative_names: ["Бурая альциппа"]
          },
          {
            name: "Cычуаньская альциппа",
            latin_name: "Alcippe davidi"
          },
          {
            name: "Юннаньская альциппа",
            latin_name: "Alcippe fratercula",
            alternative_names: ["Юньнаньская фульветта"]
          },
          {
            name: "Чернобровая альциппа",
            latin_name: "Alcippe grotei",
            alternative_names: ["Чернобровая фульветта"]
          },
          {
            name: "Китайская альциппа",
            latin_name: "Alcippe hueti"
          },
          {
            name: "Серощёкая альциппа",
            latin_name: "Alcippe morrisonia"
          },
          {
            name: "Непальская альциппа",
            latin_name: "Alcippe nipalensis",
            alternative_names: ["Белоглазая альциппа"]
          },
          {
            name: "Малайская альциппа",
            latin_name: "Alcippe peracensis",
            alternative_names: ["Горная альциппа"]
          },
          {
            name: "Серошапочная альциппа",
            latin_name: "Alcippe poioicephala",
            alternative_names: ["Сероголовая альциппа"]
          },
          {
            name: "Красноспинная альциппа",
            latin_name: "Alcippe pyrrhoptera",
            alternative_names: ["Яванская альциппа"]
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 10
  }
];
const TenToFamily = [
  // 9 - Пищуховые, Стеностировые (мухоловки-феи)
  {
    name: "Пищуховые",
    latin_name: "Certhiidae",
    genera: [
      {
        name: "Пищу́хи",
        latin_name: "Certhia",
        species_length: 9,
        species: [
          {
            name: "Обыкновенная пищуха",
            latin_name: "Certhia familiaris",
            alternative_names: ["пищуха", "европейская пищуха", "лесная пищуха"]
          },
          {
            name: "Кашмирская пищуха",
            latin_name: "Certhia hodgsoni"
          },
          {
            name: "Американская пищуха",
            latin_name: "Certhia americana",
            alternative_names: ["Североамериканская коричневая пищуха"]
          },
          {
            name: "Короткопалая пищуха",
            latin_name: "Certhia brachydactyla",
            alternative_names: ["садовая пищуха"]
          },
          {
            name: "Гималайская пищуха",
            latin_name: "Certhia himalayana",
            alternative_names: ["кашмирская пищуха"]
          },
          {
            name: "Непальская пищуха",
            latin_name: "Certhia nipalensis"
          },
          {
            name: "Бурогорлая пищуха",
            latin_name: "Certhia discolor",
            alternative_names: ["Двуцветная пищуха", "Сиккимская пищуха"]
          },
          {
            name: "Манипурская пищуха",
            latin_name: "Certhia manipurensis",
            alternative_names: ["Пищуха Юма"]
          },
          {
            name: "Сычуаньская пищуха",
            latin_name: "Certhia tianquanensis"
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 9
  },
  {
    name: "Стеностировые",
    latin_name: "Stenostiridae",
    alternative_names: ["мухоловки-феи"],
    genera: [
      {
        name: "",
        latin_name: "Chelidorhynx",
        species_length: 1,
        species: [
          {
            name: "Золотобрюхая веерохвостка",
            latin_name: "Chelidorhynx hypoxanthus"
          }
        ]
      },
      {
        name: "Канареечные мухоловки",
        latin_name: "Culicicapa",
        species_length: 2,
        species: [
          {
            name: "Сероголовая канареечная мухоловка",
            latin_name: "Culicicapa ceylonensis"
          },
          {
            name: "Зеленоголовая канареечная мухоловка",
            latin_name: "Culicicapa helianthea"
          }
        ]
      },
      {
        name: "",
        latin_name: "Elminia",
        species_length: 5,
        species: [
          {
            name: "Белохвостая хохлатая мухоловка",
            latin_name: "Elminia albicauda"
          },
          {
            name: "Белобрюхая хохлатая мухоловка",
            latin_name: "Elminia albiventris"
          },
          {
            name: "Горная хохлатая мухоловка",
            latin_name: "Elminia albonotata"
          },
          {
            name: "Бирюзовая хохлатая мухоловка",
            latin_name: "Elminia ongicauda"
          },
          {
            name: "Черноголовая хохлатая мухоловка",
            latin_name: "Elminia nigromitrata"
          }
        ]
      },
      {
        name: "Стеностиры",
        latin_name: "Stenostira",
        species_length: 1,
        species: [
          {
            name: "Стеностира",
            latin_name: "Stenostira scita"
          }
        ]
      }
    ],
    genera_length: 4,
    species_length: 9
  },
  // 7 - Ложнопищуховые
  {
    name: "Ложнопищуховые",
    latin_name: "Climacteridae",
    genera: [
      {
        name: "",
        latin_name: "Cormobates",
        species_length: 2,
        species: [
          {
            name: "Папуанская ложнопищуха",
            latin_name: "Cormobates placens"
          },
          {
            name: "Белогорлая ложнопищуха",
            latin_name: "Cormobates leucophaea"
          }
        ]
      },
      {
        name: "Ложнопищухи",
        latin_name: "Climacteris",
        species_length: 5,
        species: [
          {
            name: "Белобровая ложнопищуха",
            latin_name: "Climacteris affinis"
          },
          {
            name: "Краснобровая ложнопищуха",
            latin_name: "Climacteris erythrops"
          },
          {
            name: "Полевая ложнопищуха",
            latin_name: "Climacteris picumnus"
          },
          {
            name: "Чернохвостая ложнопищуха",
            latin_name: "Climacteris melanurus"
          },
          {
            name: "Рыжебрюхая ложнопищуха",
            latin_name: "Climacteris rufus"
          }
        ]
      }
    ],
    genera_length: 2,
    species_length: 7
  },
  // 6 - Подорожниковые, Корольковые, Psophodidae
  {
    name: "Подорожниковые",
    latin_name: "Calcariidae",
    genera: [
      {
        name: "Подорожники",
        latin_name: "Calcarius",
        species_length: 3,
        species: [
          {
            name: "Лапландский подорожник",
            latin_name: "Calcarius lapponicus"
          },
          {
            name: "Украшенный подорожник",
            latin_name: "Calcarius ornatus"
          },
          {
            name: "Расписной подорожник",
            latin_name: "Calcarius pictus"
          }
        ]
      },
      {
        name: "Пуночки",
        latin_name: "Plectrophenax",
        species_length: 2,
        species: [
          {
            name: "Полярная пуночка",
            latin_name: "Plectrophenax hyperboreus"
          },
          {
            name: "Пуночка",
            latin_name: "Plectrophenax nivalis",
            alternative_names: ["сне́жный подоро́жник", "аркти́ческий воробе́й"]
          }
        ]
      },
      {
        name: "",
        latin_name: "Rhynchophanes",
        species_length: 1,
        species: [
          {
            name: "Бурогрудый подорожник",
            latin_name: "Rhynchophanes mccownii"
          }
        ]
      }
    ],
    genera_length: 3,
    species_length: 6
  },
  {
    name: "Корольковые",
    latin_name: "Regulidae",
    genera: [
      {
        name: "",
        latin_name: "Corthylio",
        species_length: 1,
        species: [{
          name: "Рубиновоголовый королёк",
          latin_name: "Corthylio calendula"
        }]
      },
      {
        name: "Корольки",
        latin_name: "Regulus",
        species_length: 5,
        species: [
          {
            name: "Красноголовый королёк",
            latin_name: "Regulus ignicapilla"
          },
          {
            name: "Мадейрский королёк",
            latin_name: "Regulus madeirensis"
          },
          {
            name: "Золотоголовый королёк",
            latin_name: "Regulus satrapa"
          },
          {
            name: "Тайваньский королёк",
            latin_name: "Regulus goodfellowi"
          },
          {
            name: "Желтоголовый королёк",
            latin_name: "Regulus regulus"
          }
        ]
      }
    ],
    genera_length: 2,
    species_length: 6
  },
  {
    name: "",
    latin_name: "Psophodidae",
    genera: [
      {
        name: "Зелёные флейтисты",
        latin_name: "Androphobus",
        species_length: 1,
        species: [{
          name: "Зелёный флейтист",
          latin_name: "Androphobus viridis",
          alternative_names: ["Новогвинейская птица-бич"]
        }]
      },
      {
        name: "Птицы-бичи",
        latin_name: "Psophodes",
        species_length: 5,
        species: [
          {
            name: "Кустарниковый флейтист",
            latin_name: "Psophodes cristatus",
            alternative_names: ["Хохлатая птица-бич"]
          },
          {
            name: "Светлобрюхая птица-бич",
            latin_name: "Psophodes leucogaster",
            alternative_names: ["Белобрюхая птица-бич"]
          },
          {
            name: "Западная птица-бич",
            latin_name: "Psophodes nigrogularis",
            alternative_names: ["Черногорлая птица-бич"]
          },
          {
            name: "Звонкая птица-бич",
            latin_name: "Psophodes occidentalis"
          },
          {
            name: "Восточная птица-бич",
            latin_name: "Psophodes olivaceus",
            alternative_names: ["Белогорлая птица-бич"]
          }
        ]
      }
    ],
    genera_length: 2,
    species_length: 6
  }
];
const FiveToFamily = [
  // Passerida
  // 5 - Оляпки
  {
    name: "Оляпковые",
    latin_name: "Cinclidae",
    genera: [
      {
        name: "Оляпки",
        latin_name: "Cinclus",
        species_length: 5,
        species: [
          {
            name: "Оляпка",
            latin_name: "Cinclus cinclus",
            alternative_names: ["обыкновенная оляпка", "водяной дрозд", "водяной воробей"]
          },
          {
            name: "Бурая оляпка",
            latin_name: "Cinclus pallasii"
          },
          {
            name: "Американская оляпка",
            latin_name: "Cinclus mexicanus"
          },
          {
            name: "Белоголовая оляпка",
            latin_name: "Cinclus leucocephalus"
          },
          {
            name: "Рыжегорлая оляпка",
            latin_name: "Cinclus schulzii"
          }
        ]
      }
    ],
    genera_length: 1,
    species_length: 5
  },
  // Corvida
  // 5 - Шилоклювые тимелии
  {
    name: "Шилоклювые тимелии",
    latin_name: "Pomatostomidae",
    genera: [
      {
        name: "",
        latin_name: "Garritornis",
        species_length: 1,
        species: [{
          name: "",
          latin_name: "Garritornis isidorei"
        }]
      },
      {
        name: "",
        latin_name: "Pomatostomus",
        species_length: 4,
        species: [
          {
            name: "Сероголовая шилоклювая тимелия",
            latin_name: "Pomatostomus temporalis"
          },
          {
            name: "Белогорлая шилоклювая тимелия",
            latin_name: "Pomatostomus halli"
          },
          {
            name: "Белобровая шилоклювая тимелия",
            latin_name: "Pomatostomus superciliosus"
          },
          {
            name: "Красноголовая шилоклювая тимелия",
            latin_name: "Pomatostomus ruficeps"
          }
        ]
      }
    ],
    genera_length: 2,
    species_length: 5
  }
];
const GroupFamiliesTo20 = {
  max_species_length: 19,
  min_species_length: 5,
  families: [
    ...FiveToFamily,
    ...TenToFamily,
    ...TwentyToFamily
  ]
};
const FamiliesGroups = [
  GroupFamiliesTo5,
  // to 5   [1, 5)
  GroupFamiliesTo20,
  // to 20  [5, 20)
  // [20, 49)
  {
    families: [
      {
        name: "Вдовушковые",
        latin_name: "Viduidae",
        species_length: 20
      },
      {
        name: "Ласточковые сорокопуты",
        latin_name: "Artamidae",
        alternative_names: ["Артамовые"],
        species_length: 24
      },
      {
        name: "Дронговые",
        latin_name: "Dicruridae",
        species_length: 28
      },
      {
        name: "Шалашниковые",
        latin_name: "Ptilonorhynchidae",
        alternative_names: ["Беседковые птицы", "Птицы-шалашники", "Беседковые", "Шалашники"],
        species_length: 28
      },
      {
        name: "Поползневые",
        latin_name: "Sittidae",
        species_length: 29
      },
      {
        name: "Сережкоглазки",
        latin_name: "Platysteiridae",
        species_length: 31
      },
      {
        name: "Ширококрылые камы́шевки",
        latin_name: "Cettiidae",
        species_length: 31
      },
      {
        name: "Славковые",
        latin_name: "Sylviidae",
        species_length: 32
      },
      {
        name: "Иволговые",
        latin_name: "Oriolidae",
        species_length: 32
      },
      {
        name: "Малюровые",
        latin_name: "Maluridae",
        alternative_names: ["Малюры", "Австралийские славки", "Австралийские крапивники"],
        species_length: 33
      },
      {
        name: "Сорокопутовые",
        latin_name: "Laniidae",
        species_length: 34
      },
      {
        name: "Суторовые",
        latin_name: "Paradoxornithidae",
        alternative_names: ["Толстоклювые синицы"],
        species_length: 38
      },
      {
        name: "Ванговые",
        latin_name: "Vangidae",
        species_length: 40
      },
      {
        name: "Воробьиные",
        latin_name: "Passeridae",
        species_length: 43
      },
      {
        name: "Овсянковые",
        latin_name: "Emberizidae",
        species_length: 44
      },
      {
        name: "Райские птицы",
        latin_name: "Paradisaeidae",
        species_length: 45
      }
    ],
    min_species_length: 20,
    max_species_length: 49
  },
  // [50, 99)
  {
    families: [
      {
        name: "Австралийские зарянки",
        latin_name: "Petroicidae",
        species_length: 51
      },
      {
        name: "Цветоедовые",
        latin_name: "Dicaeidae",
        alternative_names: ["Цветососовые"],
        species_length: 57
      },
      {
        name: "Тимелиевые",
        latin_name: "Timaliidae",
        alternative_names: ["Кустарницы"],
        species_length: 58
      },
      {
        name: "Камышовковые",
        latin_name: "Acrocephalidae",
        alternative_names: ["Камышевковые"],
        species_length: 61
      },
      {
        name: "Виреоновые",
        latin_name: "Vireonidae",
        species_length: 62
      },
      {
        name: "Синицевые",
        latin_name: "Paridae",
        species_length: 63
      },
      {
        name: "Веерохвостковые",
        latin_name: "Rhipiduridae",
        alternative_names: ["Веерохвостки", "Веерохвостые мухоловки"],
        species_length: 65
      },
      {
        name: "Шипоклювковые",
        latin_name: "Acanthizidae",
        species_length: 65
      },
      {
        name: "Сверчковые",
        latin_name: "Locustellidae",
        species_length: 67
      },
      {
        name: "Свистуновые",
        latin_name: "Pachycephalidae",
        species_length: 69
      },
      {
        name: "Земляные тимелии",
        latin_name: "Pellorneidae",
        species_length: 70
      },
      {
        name: "Трясогузковые",
        latin_name: "Motacillidae",
        species_length: 70
      },
      {
        name: "Пеночки",
        latin_name: "Phylloscopus",
        alternative_names: ["Настоящие пеночки"],
        species_length: 81
      },
      {
        name: "Ласточки",
        latin_name: "Hirundo",
        alternative_names: ["Настоящие ласточки"],
        species_length: 92
      }
    ],
    min_species_length: 50,
    max_species_length: 99
  },
  // [100, 199)
  {
    families: [
      {
        name: "Жаворонковые",
        latin_name: "Alaudidae",
        species_length: 102
      },
      {
        name: "Монарховые",
        latin_name: "Monarchidae",
        alternative_names: ["Монархи"],
        species_length: 106
      },
      {
        name: "Трупиаловые",
        latin_name: "Icteridae",
        alternative_names: ["Американские иволги", "Кассики", "Желтушники"],
        species_length: 108
      },
      {
        name: "Личинкоедовые",
        latin_name: "Campephagidae",
        species_length: 109
      },
      {
        name: "Ткачиковые",
        latin_name: "Ploceidae",
        species_length: 122
      },
      {
        name: "Скворцовые",
        latin_name: "Sturnidae",
        species_length: 128
      },
      {
        name: "Кустарницевые",
        latin_name: "Leiothrichidae",
        alternative_names: ["Комичные тимелии"],
        species_length: 133
      },
      {
        name: "Врановые",
        latin_name: "Corvidae",
        alternative_names: ["Вороновые"],
        species_length: 139
      },
      {
        name: "Вьюрковые ткачики",
        latin_name: "Estrildidae",
        alternative_names: ["Астрильдовые"],
        species_length: 140
      },
      {
        name: "Белоглазковые",
        latin_name: "Zosteropidae",
        species_length: 152
      },
      {
        name: "Нектарницевые",
        latin_name: "Nectariniidae",
        species_length: 152
      },
      {
        name: "Бюльбюлевые",
        latin_name: "Pycnonotidae",
        alternative_names: ["Короткопалые дрозды"],
        species_length: 167
      },
      {
        name: "Цистиколовые",
        latin_name: "Cisticolidae",
        species_length: 168
      },
      {
        name: "Дроздовые",
        latin_name: "Turdidae",
        species_length: 191
      },
      {
        name: "Медососовые",
        latin_name: "Meliphagidae",
        species_length: 196
      }
    ],
    min_species_length: 100,
    max_species_length: 199
  },
  // [200, 299)
  {
    families: [
      {
        name: "Вьюрковые",
        latin_name: "Fringillidae",
        alternative_names: ["Настоящие вьюрковые"],
        species_length: 239
      }
    ],
    min_species_length: 200,
    max_species_length: 299
  },
  // 300+
  {
    families: [
      {
        name: "Танагровые",
        latin_name: "Thraupidae",
        species_length: 386
      },
      {
        name: "Мухоловковые",
        latin_name: "Muscicapidae",
        species_length: 357
      }
    ],
    min_species_length: 300
  }
];
var ItemType = /* @__PURE__ */ ((ItemType2) => {
  ItemType2[ItemType2["MenuItem"] = 0] = "MenuItem";
  ItemType2[ItemType2["ListSubheader"] = 1] = "ListSubheader";
  return ItemType2;
})(ItemType || {});
const colors = [
  red,
  orange,
  teal,
  green,
  lime,
  cyan,
  blue,
  indigo,
  grey,
  brown,
  purple,
  pink,
  yellow,
  blueGrey
];
const NamePartLabel = "Корни названий";
const NamePartPrefix = "root-name";
const items = nameRootGroups.map((group) => [
  {
    groupId: group.id,
    type: ItemType.ListSubheader,
    label: group.title
  },
  ...group.roots.map((root2) => ({
    groupId: group.id,
    type: ItemType.MenuItem,
    label: root2
  }))
]).reduce((acc, group) => [...acc, ...group], []);
const setStyleSelectItem = (groupId) => ({
  "&.Mui-selected": {
    backgroundColor: getOptionColor(groupId),
    "&:hover": {
      backgroundColor: getOptionColor(groupId, true)
    }
  }
});
function getOptionColorFromValue(value, isLight) {
  const groupId = nameRootGroups.find(({ roots }) => roots.includes(value))?.id;
  return getOptionColor(groupId ?? 0, isLight);
}
function getOptionColor(groupId = 0, isLight) {
  return colors[groupId % colors.length][isLight ? 100 : 200];
}
const SelectNamePart = ({
  curValue = [],
  onChange
}) => {
  const NONE = "None";
  const nameRootsSequence = useMemo(
    () => nameRootGroups.reduce((acc, { roots }) => [...acc, ...roots], []),
    []
  );
  return /* @__PURE__ */ jsxs(FormControl, { fullWidth: true, sx: { marginTop: 1 }, children: [
    /* @__PURE__ */ jsx(InputLabel, { htmlFor: `${NamePartPrefix}-select`, id: `${NamePartPrefix}-select-label`, shrink: true, children: NamePartLabel }),
    /* @__PURE__ */ jsxs(
      Select,
      {
        multiple: true,
        fullWidth: true,
        displayEmpty: true,
        labelId: `${NamePartPrefix}-select-label`,
        id: `${NamePartPrefix}-select`,
        value: curValue,
        label: NamePartLabel,
        onChange: ({ target: { value } }) => value.includes(NONE) ? onChange([]) : onChange(
          typeof value === "string" ? value.split(",") : value
        ),
        renderValue: (selected) => {
          return /* @__PURE__ */ jsx(Box, { sx: { display: "flex", flexWrap: "wrap", gap: 0.5 }, children: selected.length === 0 ? /* @__PURE__ */ jsx("em", { children: NONE }) : nameRootsSequence.map((root2) => selected.includes(root2) && /* @__PURE__ */ jsx(Chip, { label: root2, sx: { bgcolor: getOptionColorFromValue(root2) } }, root2)) });
        },
        children: [
          /* @__PURE__ */ jsx(MenuItem, { value: NONE, disabled: !curValue.length, defaultChecked: true, children: /* @__PURE__ */ jsx("em", { children: NONE }) }, `${NamePartPrefix}-group-null`),
          items.map(({ label: label2, type, groupId }, index) => type ? /* @__PURE__ */ jsx(ListSubheader, { children: label2 }, `${NamePartPrefix}-subheader-${index}`) : /* @__PURE__ */ jsx(MenuItem, { value: label2, sx: setStyleSelectItem(groupId), children: label2 }, `${NamePartPrefix}-item-${index}`))
        ]
      }
    )
  ] });
};
function getExistName(family, isLatin = false) {
  return isLatin ? family.latin_name : family.name || family?.alternative_names?.[0] || family.latin_name;
}
function ucFirst(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
const ItemInfoAddition = ({
  name,
  family: {
    latin_name: nameLatin,
    alternative_names: nameAlternatives
  },
  selectedNames,
  typeNameLatin,
  typeNameAlt
}) => {
  const isLatinEvery = typeNameLatin === "latin_names_with_every";
  const isAltEvery = typeNameAlt === "alt_names_with_every";
  return /* @__PURE__ */ jsxs("span", { children: [
    isLatinEvery && (name !== nameLatin && `лат. ${nameLatin || "???"}`),
    isAltEvery && /* @__PURE__ */ jsx(Fragment, { children: nameAlternatives?.map((name2, id) => /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(
      Highlighter,
      {
        searchWords: selectedNames.map((root2) => root2.root),
        textToHighlight: ucFirst(name2.toLowerCase()),
        highlightTag: ({ children, searchIndex }) => /* @__PURE__ */ jsx("mark", { style: { backgroundColor: getOptionColor(selectedNames[searchIndex].groupId), opacity: 0.6, padding: "0 2px" }, children })
      }
    ) }, `alternative-name-${id}`)) })
  ] });
};
const ItemInfoMain = ({
  name,
  family: {
    species_length: length
  },
  isSpecificValue,
  selectedNames
}) => /* @__PURE__ */ jsxs("p", { style: { display: "flex", justifyContent: "space-between" }, children: [
  /* @__PURE__ */ jsx(
    Highlighter,
    {
      searchWords: selectedNames.map((root2) => root2.root),
      textToHighlight: ucFirst(name.toLowerCase()),
      highlightTag: ({ children, searchIndex }) => /* @__PURE__ */ jsx("mark", { style: { backgroundColor: getOptionColor(selectedNames[searchIndex].groupId), padding: "0 2px" }, children })
    }
  ),
  length >= 10 && !isSpecificValue && /* @__PURE__ */ jsxs("span", { style: { color: "GrayText" }, children: [
    " ",
    " — " + length
  ] })
] });
const ListItemInfo = ({
  name,
  family,
  familyId,
  selectedNames,
  specPrimary,
  specSecondary
}) => {
  return /* @__PURE__ */ jsxs(ListItem, { children: [
    familyId > 0 && /* @__PURE__ */ jsx(Divider, {}),
    /* @__PURE__ */ jsx(
      ListItemText,
      {
        sx: {
          width: "100%",
          cursor: "pointer",
          px: 0.8,
          borderRadius: 2,
          ":hover": { bgcolor: "antiquewhite" }
        },
        primary: /* @__PURE__ */ jsx(
          ItemInfoMain,
          {
            name,
            family,
            selectedNames,
            ...specPrimary
          }
        ),
        secondary: /* @__PURE__ */ jsx(
          ItemInfoAddition,
          {
            name,
            family,
            selectedNames,
            ...specSecondary
          }
        )
      }
    )
  ] });
};
function getPartsByNum(groups) {
  return groups.map(({ families: families2, ...other }) => ({
    ...other,
    familiesParts: getGroupPartsByNum(families2)
  }));
}
function getGroupPartsByNum(families2) {
  const parts = /* @__PURE__ */ new Map();
  families2.map((family) => {
    const tempFamily = structuredClone(family);
    const N = family.species_length;
    const key = N < 10 ? N : Math.floor(N / 10) * 10;
    if (parts.has(key))
      parts.set(key, [...parts.get(key), tempFamily]);
    else
      parts.set(key, [tempFamily]);
  });
  parts.forEach((part, key) => {
    const partSorted = part.sort((a, b) => a.species_length - b.species_length);
    parts.set(key, partSorted);
  });
  const partsSorted = Array.from(parts.entries()).sort((a, b) => a[0] - b[0]);
  return partsSorted;
}
function filterSelectedFamiliesParts(familiesParts, isVisibleAlt) {
  return familiesParts.filter((part) => filterSelectedFamilies(part[1], isVisibleAlt).length);
}
function filterSelectedFamilies(families2, isVisibleAlt = true) {
  if (!isVisibleAlt) {
    return families2.filter((family) => family.SelectedGroups?.filter(({ root: root2 }) => (family.name || family.alternative_names?.[0])?.toLowerCase().includes(root2))?.length);
  }
  return families2.filter((family) => family.SelectedGroups?.length);
}
const getGroups_noApi = () => getPartsByNum(FamiliesGroups);
const getGroupsSelected_noApi = () => {
  const GroupsPartsFamilies = getGroups_noApi();
  return GroupsPartsFamilies.map(({ familiesParts, ...otherTabInfo }) => ({
    ...otherTabInfo,
    familiesParts: (
      // оставить информатичные "parts"
      filterSelectedFamiliesParts(familiesParts).map(([partId, part]) => [
        partId,
        // оставить информативные "families"
        filterSelectedFamilies(part)
      ])
    )
  }));
};
const getGroupById_noApi = ({
  groupId
}) => {
  const GroupsPartsFamilies = getGroups_noApi();
  return GroupsPartsFamilies[groupId];
};
const getGroupPartById_noApi = ({
  groupId,
  partId
}) => {
  const group = getGroupById_noApi({ groupId });
  return group.familiesParts[partId];
};
const getFamiliesById_noApi = ({
  groupId,
  partId,
  familyId
}) => {
  const [, part] = getGroupPartById_noApi({ groupId, partId });
  return part[familyId];
};
const updateGroupSelectedParts_noApi = ({
  selectedRoots
}) => {
  FamiliesGroups.forEach((group) => {
    group.families.forEach((family) => {
      const name = (family.name || family.alternative_names?.[0])?.toLowerCase();
      if (!name)
        return;
      const curSelectedGroups = selectedRoots.filter(
        ({ root: root2 }) => name.includes(root2) || family.alternative_names?.find((name2) => name2.toLowerCase().includes(root2))
      );
      family.SelectedGroups = [...curSelectedGroups];
    });
  });
};
const LabelDirSwitch = ({
  type = "primary",
  isDisabled,
  isChecked,
  handleChangeDirection
}) => {
  return /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 1, sx: { alignItems: "center" }, children: [
    /* @__PURE__ */ jsx(Button, { variant: "text", color: "inherit", size: "small", onClick: () => handleChangeDirection(Direction.ASC), sx: { minWidth: 0 }, children: /* @__PURE__ */ jsx(Typography, { children: "ASC" }) }),
    /* @__PURE__ */ jsx(
      DirectionSwitch,
      {
        checked: !!isChecked,
        disabled: isDisabled,
        size: "medium",
        onChange: () => handleChangeDirection(Number(!isChecked)),
        icon: /* @__PURE__ */ jsx(Download, { color: isDisabled ? "disabled" : "action", sx: { borderRadius: "100%", padding: "2px", bgcolor: isDisabled ? "lightgray" : type === "primary" ? "chocolate" : "lightseagreen", color: "beige" } }),
        checkedIcon: /* @__PURE__ */ jsx(Upload, { color: isDisabled ? "disabled" : "action", sx: { borderRadius: "100%", padding: "2px", bgcolor: isDisabled ? "lightgray" : type === "primary" ? "crimson" : "darkcyan", color: "beige" } })
      }
    ),
    /* @__PURE__ */ jsx(Button, { variant: "text", color: "inherit", size: "small", onClick: () => handleChangeDirection(Direction.DESC), sx: { minWidth: 0 }, children: /* @__PURE__ */ jsx(Typography, { children: "DESC" }) })
  ] });
};
const DirectionSwitch = styled(Switch)(({ theme }) => ({
  width: 56,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#e2e2e2",
        ...theme.applyStyles("dark", {
          backgroundColor: "#acacac"
        })
      },
      // '& .MuiSwitch-thumb': {
      //   // backgroundColor: '#003892', // Темно-синий для включенного
      // },
      "& .Mui-disabled": {
        backgroundColor: "#000"
      }
    }
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#001e3c",
    width: 32,
    height: 32,
    display: "flex",
    // Добавляем flex для центрирования иконки
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    // Стили для самой иконки
    "& svg": {
      fontSize: 22,
      // Подберите нужный размер
      color: "#fff"
      // Цвет иконки
    }
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#e2e2e2",
    borderRadius: 20 / 2,
    ...theme.applyStyles("dark", {
      backgroundColor: "#acacac"
    }),
    "& .Mui-disabled": {
      backgroundColor: "#000"
    }
  }
}));
var Direction = /* @__PURE__ */ ((Direction2) => {
  Direction2[Direction2["ASC"] = 0] = "ASC";
  Direction2[Direction2["DESC"] = 1] = "DESC";
  return Direction2;
})(Direction || {});
const SortNaming = ({
  isDisabledSortLatin = false,
  isDisabledSortSpecies = false,
  typeNameLatin,
  // TODO: -> isFixedPlacementLatin
  isSortSpecies,
  setIsSortSpecies,
  dir,
  handleNameSorted,
  isLatinSeparately,
  handleSeparatelyChanged
}) => {
  return /* @__PURE__ */ jsxs(Stack, { direction: "column", spacing: 3, children: [
    /* @__PURE__ */ jsx(Typography, { sx: { marginBottom: 2, fontWeight: 500 }, children: "Сортировка" }),
    /* @__PURE__ */ jsxs(Stack, { component: "fieldset", direction: "column", spacing: 0.8, sx: { border: 0, m: 0, p: 0 }, children: [
      /* @__PURE__ */ jsx(FormLabel, { component: "legend", children: "По алфавиту" }),
      /* @__PURE__ */ jsx(
        LabelDirSwitch,
        {
          isChecked: !!dir,
          isDisabled: isDisabledSortLatin,
          handleChangeDirection: handleNameSorted
        }
      ),
      /* @__PURE__ */ jsx(
        FormControlLabel,
        {
          control: /* @__PURE__ */ jsx(
            Checkbox,
            {
              disabled: ["latin_names_only", "latin_names_without"].includes(typeNameLatin) || isDisabledSortLatin || dir === 0,
              checked: isLatinSeparately,
              onChange: ({ target: { checked } }) => handleSeparatelyChanged(checked),
              sx: { paddingLeft: 0 }
            }
          ),
          label: "Латынь в конце"
        }
      )
    ] }),
    !isDisabledSortSpecies && /* @__PURE__ */ jsxs(Stack, { component: "fieldset", direction: "column", spacing: 0.8, sx: { border: 0, m: 0, p: 0 }, children: [
      /* @__PURE__ */ jsx(FormLabel, { component: "legend", children: "По числу видов" }),
      /* @__PURE__ */ jsx(
        FormControlLabel,
        {
          control: /* @__PURE__ */ jsx(
            Checkbox,
            {
              checked: isSortSpecies !== null,
              onChange: ({ target: { checked } }) => setIsSortSpecies(checked ? 0 : null),
              sx: { paddingLeft: 0 }
            }
          ),
          label: "Закрепить число видов",
          sx: { margin: 0 }
        }
      ),
      isSortSpecies !== null && /* @__PURE__ */ jsx(
        LabelDirSwitch,
        {
          type: "secondary",
          isChecked: !!isSortSpecies,
          handleChangeDirection: setIsSortSpecies
        }
      )
    ] })
  ] });
};
function getIsLatinName(elem) {
  return !!getExistName(elem).match(/[a-zA-Z]/g);
}
function calcNameSortingValue(a, b, isLatin, dir) {
  const nameA = getExistName(a, isLatin);
  const nameB = getExistName(b, isLatin);
  const compareResult = nameA.localeCompare(nameB, isLatin ? "en" : "ru", { sensitivity: "base" });
  return dir ? -compareResult : compareResult;
}
function calcSpeciesSorting(a, b, isSortSpecies) {
  if (a.species_length === b.species_length) return 0;
  const aBeforeB = a.species_length < b.species_length;
  if (isSortSpecies === Direction.ASC) {
    return aBeforeB ? -1 : 1;
  }
  return aBeforeB ? 1 : -1;
}
const RangeGroupPartItem = ({
  groupId,
  partId,
  familyId,
  isSpecificValue,
  typeNameLatin,
  typeNameAlt,
  selectedNames
}) => {
  const family = getFamiliesById_noApi({ groupId, partId, familyId });
  const name = (typeNameLatin === "latin_names_only" ? family.latin_name || "???" : family.name || (typeNameAlt === "alt_names_without" ? typeNameLatin === "latin_names_with_every" ? dash : family.latin_name : typeNameAlt === "alt_names_with_only" && family?.alternative_names?.length ? family.alternative_names[0] : typeNameLatin === "latin_names_with_only" ? family.latin_name : dash)).toLowerCase();
  return /* @__PURE__ */ jsx(
    ListItemInfo,
    {
      familyId,
      family,
      name,
      selectedNames,
      specPrimary: {
        isSpecificValue
      },
      specSecondary: {
        typeNameAlt,
        typeNameLatin
      }
    }
  );
};
const RangeGroupPart = ({
  groupId,
  partId,
  isSingularPart,
  typeNameLatin,
  typeNameAlt,
  selectedNames,
  dir,
  isSortSpecies,
  isLatin,
  isLatinSeparately
}) => {
  const [species_num, part] = getGroupPartById_noApi({ groupId, partId });
  const partNamesOrdered = part.map(({ name, latin_name, alternative_names, species_length }) => ({
    name,
    latin_name,
    alternative_names: alternative_names ? [...alternative_names] : [],
    species_length
  }));
  sortPartFamilies({
    part: partNamesOrdered,
    dir,
    isSortSpecies,
    isLatin,
    isLatinSeparately
  });
  const isSingleOnly = new Set(
    part.map(({ species_length }) => species_length)
  ).size === 1;
  const isLonely = part.length === 1;
  const isSpecificValue = isLonely || isSingleOnly || species_num < 10;
  return /* @__PURE__ */ jsxs(Grid, { children: [
    /* @__PURE__ */ jsx(Typography, { variant: "h5", sx: isSingularPart ? { textAlign: "center" } : null, children: isSpecificValue ? part[0].species_length : `${species_num}+` }),
    /* @__PURE__ */ jsx(List$1, { dense: true, children: partNamesOrdered.map((family) => {
      if (typeNameLatin === "latin_names_without" && typeNameAlt === "alt_names_without" && !family.name) {
        return;
      }
      if (typeNameLatin === "latin_names_without" && !family.name && !family?.alternative_names?.length) {
        return;
      }
      const familyId = part.findIndex(
        ({ latin_name, name }) => family.latin_name ? latin_name === family.latin_name : name === family.name
      );
      return /* @__PURE__ */ jsx(
        RangeGroupPartItem,
        {
          groupId,
          partId,
          familyId,
          isSpecificValue,
          typeNameAlt,
          typeNameLatin,
          selectedNames
        },
        `group-${groupId}-part-${partId}-family-${familyId}`
      );
    }) })
  ] }, `group-${groupId}-part-${partId}`);
};
function sortPartFamilies({
  part,
  dir,
  isSortSpecies,
  isLatin = false,
  isLatinSeparately
}) {
  part.sort((a, b) => {
    if (isSortSpecies !== null) {
      const bySpecies = calcSpeciesSorting(a, b, isSortSpecies);
      if (bySpecies !== 0) return bySpecies;
    }
    if (isLatinSeparately) {
      const isALatin = getIsLatinName(a);
      const isBLatin = getIsLatinName(b);
      if (isALatin !== isBLatin) {
        return isALatin ? 1 : -1;
      }
    }
    return calcNameSortingValue(a, b, isLatin, Boolean(dir));
  });
}
const CardRange = ({
  groupId,
  typeNameLatin,
  typeNameAlt,
  selectedNames,
  dir,
  isSortSpecies,
  isLatin,
  isLatinSeparately
}) => {
  const group = getGroupById_noApi({ groupId });
  return /* @__PURE__ */ jsxs(Card, { sx: { width: "fit-content", height: "fit-content" }, children: [
    /* @__PURE__ */ jsx(
      CardHeader,
      {
        component: "center",
        title: `${group.min_species_length}` + (group.max_species_length ? ` - ${group.max_species_length}` : "+")
      }
    ),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(Grid, { spacing: 3, container: true, children: group.familiesParts.map(
      (_, partId, arr) => /* @__PURE__ */ jsx(
        RangeGroupPart,
        {
          groupId,
          partId,
          isSingularPart: arr.length === 1,
          typeNameAlt,
          typeNameLatin,
          selectedNames,
          dir,
          isSortSpecies,
          isLatin,
          isLatinSeparately
        },
        `group-${groupId}-part-${partId}`
      )
    ) }) })
  ] }, `group-${groupId}`);
};
function BackHomeLink({ tone = "default", sx }) {
  return /* @__PURE__ */ jsx(
    Button,
    {
      component: Link,
      to: "/",
      size: "small",
      startIcon: /* @__PURE__ */ jsx(HomeOutlinedIcon, { sx: { fontSize: 18 } }),
      "aria-label": "На главную",
      sx: {
        alignSelf: "flex-start",
        textTransform: "none",
        fontWeight: 500,
        px: 0.75,
        minWidth: 0,
        color: tone === "inverse" ? "inherit" : "text.secondary",
        opacity: tone === "inverse" ? 0.9 : 1,
        "&:hover": {
          backgroundColor: tone === "inverse" ? "rgba(255,255,255,0.12)" : "action.hover"
        },
        ...sx
      },
      children: "На главную"
    }
  );
}
const ListNamePart = ({
  isVisibleAlt,
  tabActual,
  handleTabClicked
}) => {
  const GroupsPartsFamiliesSelected = getGroupsSelected_noApi();
  const GroupsPartsFamiliesSelectedActual = [
    GroupsPartsFamiliesSelected[tabActual],
    ...GroupsPartsFamiliesSelected.map((prev, i) => ({ ...prev, tabIndex: i })).filter((_, curIndex) => tabActual !== curIndex)
  ];
  return /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx(List$1, { children: GroupsPartsFamiliesSelectedActual?.map(({ familiesParts, tabIndex = tabActual, ...others }, index) => {
    const PartsCountTypesSelected = familiesParts.reduce((acc, part) => [
      ...acc,
      ...filterSelectedFamilies(part[1], isVisibleAlt).reduce((acc2, family) => {
        return family.SelectedGroups ? [...acc2, ...family.SelectedGroups] : acc2;
      }, [])
    ], []);
    const TypesSelected = /* @__PURE__ */ new Map();
    PartsCountTypesSelected.forEach(
      ({ groupId }) => TypesSelected.set(
        groupId,
        1 + (TypesSelected.get(groupId) ?? 0)
      )
    );
    return !!filterSelectedFamiliesParts(familiesParts, isVisibleAlt).length && /* @__PURE__ */ jsx(ListItem, { sx: { px: 0 }, children: /* @__PURE__ */ jsxs(ListItem, { sx: { display: "flex", flexDirection: "column", alignItems: "stretch", px: 0 }, children: [
      /* @__PURE__ */ jsxs(
        ListSubheader,
        {
          onClick: () => tabIndex === tabActual || handleTabClicked(tabIndex),
          sx: {
            bgcolor: index === 0 ? "Background" : "ThreeDFace",
            cursor: index === 0 ? "auto" : "pointer",
            textAlign: "center",
            lineHeight: "normal"
          },
          children: [
            /* @__PURE__ */ jsxs("span", { style: { display: "inline-flex", gap: 4, paddingInline: 0 }, children: [
              /* @__PURE__ */ jsxs(Typography, { variant: "subtitle2", sx: { visibility: "hidden" }, children: [
                "(",
                familiesParts.length,
                ")"
              ] }),
              "  ",
              /* @__PURE__ */ jsx(Typography, { variant: "subtitle1", children: getTabLabel(others) }),
              /* @__PURE__ */ jsxs(Typography, { variant: "subtitle2", color: "textDisabled", children: [
                "(",
                familiesParts.length,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { style: { display: "flex", justifyContent: "center", gap: 4 }, children: Array.from(TypesSelected).map(([typeId, typeCount]) => /* @__PURE__ */ jsx(Badge, { variant: "dot", sx: { color: getOptionColor(typeId) }, children: typeCount }, typeId)) })
          ]
        }
      ),
      /* @__PURE__ */ jsx(List$1, { children: filterSelectedFamiliesParts(familiesParts, isVisibleAlt).map((part, pardInd) => filterSelectedFamilies(part[1], isVisibleAlt).map((family, familyInd) => {
        const actualNames = [family.name, ...family.alternative_names || ""].filter((name) => family.SelectedGroups?.filter(({ root: root2 }) => name.toLowerCase().includes(root2))[0]);
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          (familyInd > 0 || pardInd > 0) && /* @__PURE__ */ jsx(Divider, { orientation: "horizontal", variant: "fullWidth", flexItem: true, sx: { borderColor: "plum" } }),
          /* @__PURE__ */ jsx(Stack, { direction: "column", children: actualNames.map((actualName, nameInd) => /* @__PURE__ */ jsx(ListItem, { sx: actualNames.length > 1 ? { paddingY: 0.5 } : { paddingY: 1.2 }, children: /* @__PURE__ */ jsx(Typography, { variant: "body2", children: /* @__PURE__ */ jsx(
            Highlighter,
            {
              searchWords: family.SelectedGroups?.map(({ root: root2 }) => root2) || [],
              textToHighlight: ucFirst(actualName),
              highlightTag: ({ children, searchIndex }) => /* @__PURE__ */ jsx("mark", { style: { backgroundColor: getOptionColor(family.SelectedGroups?.[searchIndex].groupId), padding: "0 2px" }, children })
            }
          ) }) }, `part-${pardInd}-name-${nameInd}`)) }, `part-${pardInd}`)
        ] });
      })) })
    ] }) }, index);
  }) }) });
};
function getTabLabel(groupRange) {
  const {
    max_species_length: max,
    min_species_length: min
  } = groupRange;
  return `${min}` + (max ? ` - ${max}` : "+");
}
const TabLabel = forwardRef(
  ({
    tabIndex,
    tabActual,
    group: {
      max_species_length: max,
      min_species_length: min,
      families_length,
      familiesParts
    },
    isModeActive,
    stateCountType: {
      "0": curCountType,
      "1": setCurCountType
    },
    ...props
  }, ref) => {
    const lengthSubGroups = familiesParts.length;
    const lengthFamilies = useMemo(() => families_length || familiesParts.reduce((acc, subgroup) => acc + subgroup[1].length, 0), [families_length, familiesParts]);
    const lengthSpecies = useMemo(() => familiesParts.reduce((acc, subgroup) => acc + subgroup[1].reduce((acc2, family) => acc2 + family.species_length, 0), 0), [familiesParts]);
    const isBadgeOverflow = curCountType === "S" && lengthSpecies > 99;
    function getTypeCount(type) {
      switch (type) {
        case "G":
          return lengthSubGroups;
        case "F":
          return lengthFamilies;
        case "S":
          return lengthSpecies;
      }
    }
    function getTypeColor(type, isActive = isModeActive) {
      switch (type) {
        case "G":
          return isActive ? "primary" : "default";
        case "F":
          return isActive ? "secondary" : "default";
        case "S":
          return isActive ? "success" : "default";
      }
    }
    function getTypeVariant(type, isActive = isModeActive) {
      return type === curCountType && isActive ? "subtitle1" : "body2";
    }
    const TooltipItem = ({ type }) => {
      const title = type === "G" ? "Подгрупп" : type === "F" ? "Семейств" : "Видов";
      const count = getTypeCount(type);
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs(
          Typography,
          {
            variant: getTypeVariant(type),
            onClick: () => setCurCountType(type),
            sx: { cursor: "pointer" },
            children: [
              type,
              ": ",
              title,
              " — ",
              count
            ]
          }
        ),
        type === curCountType && /* @__PURE__ */ jsx(Divider, { orientation: "horizontal", variant: "fullWidth", flexItem: true, sx: { borderColor: "aquamarine" } })
      ] });
    };
    return /* @__PURE__ */ jsx(
      Tab,
      {
        ref,
        ...props,
        label: `${min}` + (max ? ` - ${max}` : "+"),
        icon: /* @__PURE__ */ jsx(
          Tooltip,
          {
            title: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(TooltipItem, { type: "G" }),
              /* @__PURE__ */ jsx(TooltipItem, { type: "F" }),
              /* @__PURE__ */ jsx(TooltipItem, { type: "S" })
            ] }),
            children: /* @__PURE__ */ jsx(
              Badge,
              {
                badgeContent: getTypeCount(curCountType),
                max: 1e3,
                color: getTypeColor(curCountType),
                overlap: "rectangular",
                sx: { marginBottom: isBadgeOverflow ? 1 : null },
                slotProps: {
                  badge: {
                    sx: isModeActive ? null : { color: "initial" }
                  }
                },
                children: /* @__PURE__ */ jsx(Chip, { label: curCountType, color: getTypeColor(curCountType), variant: "outlined", size: "medium" })
              }
            )
          }
        ),
        iconPosition: isBadgeOverflow ? "start" : "end",
        ...a11yProps(tabIndex),
        sx: { bgcolor: tabIndex === tabActual ? "Background" : "ThreeDFace" }
      }
    );
  }
);
TabLabel.displayName = "TabLabel";
function a11yProps(index) {
  return {
    id: `tab-range-${index}`,
    "aria-controls": `tabpanel-range-${index}`
  };
}
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return /* @__PURE__ */ jsx(
    "div",
    {
      id: `tabpanel-range-${index}`,
      "aria-labelledby": `tab-range-${index}`,
      role: "tabpanel",
      hidden: value !== index,
      ...other,
      children: value === index && /* @__PURE__ */ jsx(Box, { sx: { p: 3 }, children })
    }
  );
}
const StyleCenteredWrapper = {
  display: "flex",
  width: "100%",
  justifyContent: "center"
};
const StylePageSection = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  gap: 48,
  width: "80%"
};
const StyleHeaderTabsBox = {
  borderBottom: 1,
  display: "flex",
  justifyContent: "center",
  borderColor: "divider",
  bgcolor: "rgb(143, 143, 157)"
};
const StyleMainContainer = {
  width: "fit-content",
  maxWidth: "300px",
  display: "flex",
  flexDirection: "column",
  gap: 4
};
const StyleMainGrid = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center"
};
const modesNameAlt = [
  { value: "alt_names_with_only", label: "Показывать при отсутствии локализации", hint: "Когда на русском отсутствует\nглавное название" },
  // названия отображаются отдельным списком ниже главной части (главное название остаётся)
  { value: "alt_names_with_every", label: "Показывать для каждого" },
  // Fully Optional
  // не отображается список альтернативных названий
  // при отсутствии "главного названия" показывается только латинское, даже при наличии альтернатив на рус.
  // при отсутствии "главного названия" И включённой опции "latin_names_without" не показывать семейства без "главного названия"
  { value: "alt_names_without", label: "Не показывать совсем" }
  // TODO: показ альтернативных названий отдельным списком - И при отсутствии "главного названия" в "главной части" латинское
];
const modesNameLatin = [
  { value: "latin_names_with_only", label: "Показывать при отсутствии локализации", hint: "Когда на русском отсутствует\nлюбое название" },
  { value: "latin_names_with_every", label: "Показывать для каждого" },
  // Fully Optional
  // при отсутствии "главного названия" И включённой опции "alt_names_without" не показывать семейство
  { value: "latin_names_without", label: "Не показывать совсем" },
  /**
   * При выборе опции значение в modesNameAlt...
   * - устанавливается в "alt_names_without"
   * - кнопки блокируются
   */
  { value: "latin_names_only", label: "Только латынь" }
];
const defaultValueAlt = modesNameAlt[0].value;
const defaultValueLatin = modesNameLatin[0].value;
const SpeciesNamesPage = () => {
  const [tab, setTab] = useState(0);
  const stateCountType = useState("G");
  const [isModeActive, setIsModeActive] = useState(true);
  const [dir, setDir] = useState(Direction.ASC);
  const [isLatinSeparately, setIsLatinSeparately] = useState(true);
  const [isSortSpecies, setIsSortSpecies] = useState(null);
  const [selectedNames, setSelectedNames] = useState([]);
  const [typeNameAlt, setTypeNameAlt] = useState(defaultValueAlt);
  const [typeNameLatin, setTypeNameLatin] = useState(defaultValueLatin);
  const GroupsPartsFamilies = getGroups_noApi();
  const filterGroups = [
    {
      id: "alt",
      title: "Альтернативные имена",
      actualType: typeNameAlt,
      onChangeActualType: setTypeNameAlt,
      isDisabled: typeNameLatin === "latin_names_only",
      modesName: modesNameAlt
    },
    {
      id: "latin",
      title: "Латинские имена",
      actualType: typeNameLatin,
      onChangeActualType: (newType) => {
        setTypeNameLatin(newType);
        if (newType === "latin_names_only")
          setTypeNameAlt("alt_names_without");
      },
      modesName: modesNameLatin
    }
  ];
  const isDisabledSortSpecies = !GroupsPartsFamilies[tab].familiesParts.find(([, partFamilies]) => new Set(partFamilies.map((family) => family.species_length)).size > 1);
  const isDisabledSortLatin = !GroupsPartsFamilies[tab].familiesParts.filter(([, partFamilies]) => partFamilies.length > new Set(partFamilies.map((family) => family.species_length)).size).length;
  const handleNameSorted = (newDir) => setDir(newDir);
  const handleSeparatelyChanged = (isSeparately) => setIsLatinSeparately(isSeparately);
  const handleNameRootsSelected = (selected) => {
    const rootGroups = selected.map((root2) => ({
      root: root2,
      groupId: nameRootGroups.find(({ roots }) => roots.includes(root2))?.id ?? 0
    }));
    setSelectedNames(rootGroups);
    updateGroupSelectedParts_noApi({ selectedRoots: rootGroups });
  };
  function handleTabClicked(tab2) {
    setTab(tab2);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  return /* @__PURE__ */ jsxs("section", { style: StylePageSection, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx(Box, { sx: { px: 2, pt: 1.5, pb: 0.5 }, children: /* @__PURE__ */ jsx(BackHomeLink, {}) }),
      /* @__PURE__ */ jsx(Box, { sx: StyleHeaderTabsBox, children: /* @__PURE__ */ jsx(Tabs, { centered: true, value: tab, onChange: (_, newValue) => setTab(newValue), children: GroupsPartsFamilies.map((group, index) => /* @__PURE__ */ jsx(
        TabLabel,
        {
          tabIndex: index,
          tabActual: tab,
          group,
          isModeActive,
          stateCountType: [
            stateCountType[0],
            (value) => {
              setIsModeActive((prev) => value !== stateCountType[0] || !prev);
              stateCountType[1](value);
            }
          ]
        },
        `tab-${index}`
      )) }) })
    ] }),
    /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 1, divider: /* @__PURE__ */ jsx(Divider, { orientation: "vertical", flexItem: true }), sx: { justifyContent: "flex-end" }, children: [
      /* @__PURE__ */ jsx(Container, { sx: StyleMainContainer, children: /* @__PURE__ */ jsxs("section", { style: { maxWidth: "350px" }, children: [
        /* @__PURE__ */ jsx(Typography, { sx: { marginBottom: 2, fontWeight: 500 }, children: "Поиск" }),
        /* @__PURE__ */ jsx(
          SelectNamePart,
          {
            curValue: selectedNames.map((root2) => root2.root),
            onChange: handleNameRootsSelected
          }
        ),
        /* @__PURE__ */ jsx(
          ListNamePart,
          {
            tabActual: tab,
            handleTabClicked,
            isVisibleAlt: typeNameAlt === "alt_names_with_every"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx("section", { style: StyleCenteredWrapper, children: /* @__PURE__ */ jsx(Grid, { container: true, spacing: 1, sx: StyleMainGrid, children: GroupsPartsFamilies.map((_, index) => /* @__PURE__ */ jsx(CustomTabPanel, { index, value: tab, children: /* @__PURE__ */ jsx(
        CardRange,
        {
          groupId: index,
          typeNameAlt,
          typeNameLatin,
          selectedNames,
          dir,
          isSortSpecies: isDisabledSortSpecies ? null : isSortSpecies,
          isLatin: typeNameLatin === "latin_names_only",
          isLatinSeparately
        }
      ) }, `tab-group-${index}`)) }) }),
      /* @__PURE__ */ jsxs(Container, { sx: StyleMainContainer, children: [
        /* @__PURE__ */ jsx(
          SortNaming,
          {
            dir,
            isLatinSeparately,
            isDisabledSortLatin,
            isDisabledSortSpecies,
            isSortSpecies,
            setIsSortSpecies,
            typeNameLatin,
            handleNameSorted,
            handleSeparatelyChanged
          }
        ),
        /* @__PURE__ */ jsx(FiltersNaming, { filterGroups })
      ] })
    ] }) })
  ] });
};
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SpeciesNamesPage,
  default: SpeciesNamesPage
}, Symbol.toStringTag, { value: "Module" }));
const MIN_LEN = 3;
function findCommonSubstrings(a, b) {
  const aN = a.toLocaleLowerCase("ru-RU");
  const bN = b.toLocaleLowerCase("ru-RU");
  if (aN.length < MIN_LEN || bN.length < MIN_LEN) return [];
  const found = /* @__PURE__ */ new Set();
  for (let len = aN.length; len >= MIN_LEN; len--) {
    for (let i = 0; i <= aN.length - len; i++) {
      const sub = aN.slice(i, i + len);
      if (bN.includes(sub)) found.add(sub);
    }
  }
  const all = [...found];
  return all.filter((s) => !all.some((other) => other !== s && other.includes(s))).sort((x, y) => y.length - x.length || x.localeCompare(y, "ru"));
}
const PALETTE = [
  "#9b5de5",
  "#f15bb5",
  "#00bbf9",
  "#00f5d4",
  "#fee440",
  "#ef476f",
  "#118ab2",
  "#06d6a0",
  "#ff9f1c",
  "#7b2cbf"
];
function nextBlockColor(used) {
  const free = PALETTE.find((c) => !used.includes(c));
  return free ?? PALETTE[used.length % PALETTE.length];
}
function resolveLabel(family) {
  const primary = family.name?.trim();
  if (primary) return primary;
  const alt = family.alternative_names?.[0]?.trim();
  if (alt) return alt;
  return null;
}
function letterOf(label) {
  const ch = label.trim().charAt(0);
  return ch ? ch.toLocaleUpperCase("ru-RU") : "#";
}
function buildFamilyEntries() {
  const byId = /* @__PURE__ */ new Map();
  for (const group of FamiliesGroups) {
    for (const family of group.families) {
      const label = resolveLabel(family);
      if (!label) continue;
      const id = family.latin_name?.trim() || label;
      if (byId.has(id)) continue;
      byId.set(id, {
        id,
        label,
        letter: letterOf(label)
      });
    }
  }
  return [...byId.values()].sort(
    (a, b) => a.label.localeCompare(b.label, "ru", { sensitivity: "base" })
  );
}
function groupEntriesByLetter(entries) {
  const map = /* @__PURE__ */ new Map();
  for (const entry2 of entries) {
    const list = map.get(entry2.letter) ?? [];
    list.push(entry2);
    map.set(entry2.letter, list);
  }
  return [...map.entries()].sort(([a], [b]) => a.localeCompare(b, "ru", { sensitivity: "base" })).map(([letter, group]) => ({ letter, entries: group }));
}
function blockIdFor(substring) {
  return `sub:${substring}`;
}
function useFamilyLinks() {
  const entries = useMemo(() => buildFamilyEntries(), []);
  const entriesById = useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    entries.forEach((e) => map.set(e.id, e));
    return map;
  }, [entries]);
  const [blocks, setBlocks] = useState([]);
  const [heightCapped, setHeightCapped] = useState(true);
  const [listColumns, setListColumns] = useState(1);
  const matchFamilies = useCallback(
    (sourceId, targetId) => {
      if (sourceId === targetId) return;
      const source = entriesById.get(sourceId);
      const target = entriesById.get(targetId);
      if (!source || !target) return;
      const commons = findCommonSubstrings(source.label, target.label);
      if (!commons.length) return;
      setBlocks((prev) => {
        const next = prev.map((b) => ({
          ...b,
          familyIds: [...b.familyIds]
        }));
        for (const sub of commons) {
          const id = blockIdFor(sub);
          let block = next.find((b) => b.id === id);
          if (!block) {
            block = {
              id,
              substring: sub,
              color: nextBlockColor(next.map((b) => b.color)),
              familyIds: [],
              column: "left"
            };
            next.push(block);
          }
          for (const fid of [sourceId, targetId]) {
            if (!block.familyIds.includes(fid)) block.familyIds.push(fid);
          }
        }
        return next;
      });
    },
    [entriesById]
  );
  const moveBlock = useCallback((blockId, column) => {
    setBlocks(
      (prev) => prev.map((b) => b.id === blockId ? { ...b, column } : b)
    );
  }, []);
  const setBlockColor = useCallback((blockId, color) => {
    setBlocks(
      (prev) => prev.map((b) => b.id === blockId ? { ...b, color } : b)
    );
  }, []);
  const highlightsForFamily = useCallback(
    (familyId) => {
      return blocks.filter((b) => b.familyIds.includes(familyId)).map((b) => ({ substring: b.substring, color: b.color }));
    },
    [blocks]
  );
  const blocksLeft = useMemo(
    () => blocks.filter((b) => b.column === "left"),
    [blocks]
  );
  const blocksRight = useMemo(
    () => blocks.filter((b) => b.column === "right"),
    [blocks]
  );
  return {
    entries,
    entriesById,
    blocks,
    blocksLeft,
    blocksRight,
    heightCapped,
    setHeightCapped,
    listColumns,
    setListColumns,
    matchFamilies,
    moveBlock,
    setBlockColor,
    highlightsForFamily
  };
}
function FamilyLinksPage() {
  const {
    entries,
    entriesById,
    blocksLeft,
    blocksRight,
    heightCapped,
    setHeightCapped,
    listColumns,
    setListColumns,
    matchFamilies,
    moveBlock,
    setBlockColor,
    highlightsForFamily
  } = useFamilyLinks();
  const [Board, setBoard] = useState(
    null
  );
  useEffect(() => {
    let cancelled = false;
    void import("./FamilyLinksBoard-BC0-Uvm9.js").then((mod) => {
      if (!cancelled) setBoard(() => mod.FamilyLinksBoard);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return /* @__PURE__ */ jsxs("section", { className: "family-links-page", children: [
    /* @__PURE__ */ jsx(BackHomeLink, { sx: { mb: 1 } }),
    /* @__PURE__ */ jsxs(
      Stack,
      {
        direction: { xs: "column", sm: "row" },
        spacing: 1,
        sx: {
          mb: 2,
          alignItems: { xs: "flex-start", sm: "flex-end" },
          justifyContent: "space-between"
        },
        children: [
          /* @__PURE__ */ jsxs(Stack, { spacing: 1, children: [
            /* @__PURE__ */ jsx(Typography, { variant: "h4", component: "h1", sx: { fontWeight: 700 }, children: "Связи семейств" }),
            /* @__PURE__ */ jsx(Typography, { color: "text.secondary", children: "Перетащите одно название на другое, чтобы найти общие подстроки." })
          ] }),
          /* @__PURE__ */ jsxs(
            ToggleButtonGroup,
            {
              size: "small",
              exclusive: true,
              value: listColumns,
              onChange: (_, value) => {
                if (value === 1 || value === 2) setListColumns(value);
              },
              "aria-label": "Число колонок списка",
              children: [
                /* @__PURE__ */ jsx(ToggleButton, { value: 1, "aria-label": "Одна колонка", children: "1" }),
                /* @__PURE__ */ jsx(ToggleButton, { value: 2, "aria-label": "Две колонки", children: "2" })
              ]
            }
          )
        ]
      }
    ),
    Board ? /* @__PURE__ */ jsx(
      Board,
      {
        entries,
        entriesById,
        blocksLeft,
        blocksRight,
        heightCapped,
        onHeightCappedChange: setHeightCapped,
        listColumns,
        onMatchFamilies: matchFamilies,
        onMoveBlock: moveBlock,
        onColorChange: setBlockColor,
        highlightsForFamily
      }
    ) : /* @__PURE__ */ jsx(Stack, { sx: { alignItems: "center", py: 8 }, children: /* @__PURE__ */ jsx(CircularProgress, { size: 28 }) })
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FamilyLinksPage,
  default: FamilyLinksPage
}, Symbol.toStringTag, { value: "Module" }));
function FillwordLayout() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FillwordLayout,
  default: FillwordLayout
}, Symbol.toStringTag, { value: "Module" }));
const DEFAULT_GRID_CONFIG = {
  rows: 12,
  cols: 12,
  allowReverse: true,
  allowDiagonal: true,
  allowOverlap: false,
  fillBlanks: false,
  allowTurns: false
};
const builtinFillwordTopics = [
  {
    id: "passerine-families",
    title: "Семейства воробьиных",
    description: "Названия семейств Passeriformes без пробелов.",
    words: [
      "ДРОЗДОВЫЕ",
      "СИНИЦЕВЫЕ",
      "ВРАНОВЫЕ",
      "СЛАВКОВЫЕ",
      "МУХОЛОВКОВЫЕ",
      "ВЬЮРКОВЫЕ",
      "ОВСЯНКОВЫЕ",
      "ТРЯСОГУЗКОВЫЕ",
      "ЖАВОРОНКОВЫЕ",
      "СКВОРЦОВЫЕ",
      "ЛАСТОЧКИ",
      "ИВОЛГОВЫЕ"
    ],
    config: { ...DEFAULT_GRID_CONFIG, rows: 14, cols: 14 }
  },
  {
    id: "latin-families",
    title: "Латинские семейства",
    description: "Латинские названия семейств птиц.",
    words: [
      "TURDIDAE",
      "PARIDAE",
      "CORVIDAE",
      "SYLVIIDAE",
      "MUSCICAPIDAE",
      "FRINGILLIDAE",
      "EMBERIZIDAE",
      "MOTACILLIDAE",
      "ALAUDIDAE",
      "STURNIDAE",
      "HIRUNDINIDAE",
      "ORIOLIDAE"
    ],
    config: { ...DEFAULT_GRID_CONFIG, rows: 14, cols: 14 }
  },
  {
    id: "bird-parts",
    title: "Части птицы",
    description: "Анатомия и внешние признаки.",
    words: [
      "КЛЮВ",
      "КРЫЛО",
      "ХВОСТ",
      "ОЧИ",
      "ПЕРО",
      "КОГОТЬ",
      "ГРЕБЕНЬ",
      "ШПОРА",
      "ЗОБ",
      "ЛАПА"
    ],
    config: { ...DEFAULT_GRID_CONFIG, rows: 10, cols: 10 }
  },
  // Воробьинообразные: систематика
  {
    "id": "надсемейство-muscicapoidea",
    "title": "Надсемейство Muscicapoidea (2019 г.)",
    "description": "Уникальные названия типовых видов семейств надсемейства (6 / 7)",
    "words": [
      "ВОЛОКЛЮЙ",
      "ДРОЗД",
      "МУХОЛОВКА",
      "ОЛЯПКА",
      "ПЕРЕСМЕШНИК",
      "СКВОРЕЦ"
    ],
    "config": {
      "rows": 11,
      "cols": 11,
      "allowReverse": true,
      "allowDiagonal": true,
      "allowOverlap": false,
      "fillBlanks": false,
      "allowTurns": false
    }
  },
  // Сопоставления названий семейств с «типом»
  {
    "id": "блок-питание",
    "title": "Блок «Питание»",
    "description": "Названия семейств, сопоставимые с типом питания",
    "words": [
      "МУХОЛОВКОВЫЕ",
      "НЕКТАРНИЦЕВЫЕ",
      "КОМАРОЛОВЫ",
      "МЕДОСОСОВЫЕ",
      "ЛИЧИНКОЕДОВЫЕ"
    ],
    "config": {
      "rows": 13,
      "cols": 13,
      "allowReverse": true,
      "allowDiagonal": true,
      "allowOverlap": false,
      "fillBlanks": false,
      "allowTurns": false
    }
  },
  {
    "id": "блок-растение",
    "title": "Блок: «Растение»",
    "description": "Названия семейств, сопоставимые с типом растений",
    "words": [
      "ДРЕВЕСНИЦЕВЫЕ",
      "КАМЫШОВКОВЫЕ",
      "КРАПИВНИКОВЫЕ",
      "КУСТАРНИЦЕВЫЕ",
      "ЛИСТОВКОВЫЕ",
      "ОВСЯНКОВЫЕ",
      "ПОДОРОЖНИКОВЫЕ",
      "ЦВЕТОЧНИЦЕВЫЕ"
    ],
    "config": {
      "rows": 15,
      "cols": 15,
      "allowReverse": true,
      "allowDiagonal": true,
      "allowOverlap": false,
      "fillBlanks": false,
      "allowTurns": false
    }
  },
  {
    "id": "блок-строение",
    "title": "Блок: «Строение»",
    "description": "Односоставные названия семейств, сопоставимые со строением",
    "words": [
      "ШИПОКЛЮВКОВЫЕ",
      "ЩЕТИНКОКЛЮВКИ",
      "БЕЛОГЛАЗКОВЫЕ",
      "СЕРЕЖКОГЛАЗКИ",
      "ЛИРОХВОСТЫ",
      "ВЕЕРОХВОСТКОВЫЕ"
    ],
    "config": {
      "rows": 12,
      "cols": 12,
      "allowReverse": false,
      "allowDiagonal": true,
      "allowOverlap": false,
      "fillBlanks": false,
      "allowTurns": true
    }
  },
  {
    "id": "блок-сорокопуты",
    "title": "Блок: «... сорокопуты»",
    "description": "Блок слов, упоминаемые в составе названий семейств, включающие слово «сорокопуты»",
    "words": [
      "ЛАСТОЧКОВЫЕ",
      "СВИРИСТЕЛЕВЫЕ",
      "ОЧКОВЫЕ",
      "ЛЕСНЫЕ",
      "ЩЕТИНКОВЫЕ",
      "ЩЕТИНКОГОЛОВЫЕ"
    ],
    "config": {
      "rows": 14,
      "cols": 14,
      "allowReverse": true,
      "allowDiagonal": true,
      "allowOverlap": true,
      "fillBlanks": false,
      "allowTurns": false
    }
  },
  {
    "id": "блок-географические",
    "title": "Блок «Географические»",
    "description": "«Американские ...», «Австралийские ...», «Новозеландские ...», «Багамские ...»",
    "words": [
      "ИВОЛГИ",
      "СЛАВКИ",
      "КОНЬКИ",
      "ЗАРЯНКИ",
      "КРАПИВНИКИ",
      "СКВОРЦЫ",
      "МЕДОСОСЫ",
      "ТАНАГРЫ"
    ],
    "config": {
      "rows": 10,
      "cols": 10,
      "allowReverse": true,
      "allowDiagonal": true,
      "allowOverlap": false,
      "fillBlanks": false,
      "allowTurns": false
    }
  }
];
function getBuiltinTopic(id) {
  return builtinFillwordTopics.find((t) => t.id === id);
}
function getFillwordTopic(id) {
  const builtin = getBuiltinTopic(id);
  if (builtin) return builtin;
  if (typeof window === "undefined") return void 0;
  try {
    const raw = window.localStorage.getItem("nbirds.fillword.customTopics");
    if (!raw) return void 0;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return void 0;
    return parsed.find((t) => t?.id === id);
  } catch {
    return void 0;
  }
}
const STORAGE_KEY = "nbirds.fillword.customTopics";
function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}
function loadCustomTopics() {
  if (!canUseStorage()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (t) => t && typeof t.id === "string" && typeof t.title === "string" && Array.isArray(t.words) && t.config
    );
  } catch {
    return [];
  }
}
function saveCustomTopic(topic) {
  const prev = loadCustomTopics().filter((t) => t.id !== topic.id);
  const next = [topic, ...prev];
  if (canUseStorage()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  return next;
}
function removeCustomTopic(id) {
  const next = loadCustomTopics().filter((t) => t.id !== id);
  if (canUseStorage()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  return next;
}
function topicToJson(topic) {
  return JSON.stringify(topic, null, 2);
}
function FillwordPage() {
  const [mode, setMode] = useState("topics");
  const [customTopics, setCustomTopics] = useState(() => loadCustomTopics());
  const [Create, setCreate] = useState(
    null
  );
  const [addedNotice, setAddedNotice] = useState(null);
  useEffect(() => {
    setCustomTopics(loadCustomTopics());
  }, []);
  useEffect(() => {
    let cancelled = false;
    void import("./CreatePuzzle-BpC3gO90.js").then((mod) => {
      if (!cancelled) setCreate(() => mod.CreatePuzzle);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  const allTopics = useMemo(
    () => [...customTopics, ...builtinFillwordTopics],
    [customTopics]
  );
  const handleAddTopic = (topic) => {
    const next = saveCustomTopic(topic);
    setCustomTopics(next);
    setAddedNotice(`Тема «${topic.title}» добавлена в список.`);
    setMode("topics");
  };
  const handleRemoveCustom = (id) => {
    setCustomTopics(removeCustomTopic(id));
  };
  return /* @__PURE__ */ jsxs("section", { className: "fillword-page", children: [
    /* @__PURE__ */ jsx(BackHomeLink, { sx: { mb: 1 } }),
    /* @__PURE__ */ jsxs(Stack, { spacing: 1, sx: { mb: 2 }, children: [
      /* @__PURE__ */ jsx(Typography, { variant: "h4", component: "h1", sx: { fontWeight: 700 }, children: "Филворд" }),
      /* @__PURE__ */ jsx(Typography, { color: "text.secondary", children: "Выберите тему или создайте свой набор слов." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "fillword-tabs", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: mode === "topics" ? "contained" : "outlined",
          onClick: () => setMode("topics"),
          children: "Играть"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: mode === "create" ? "contained" : "outlined",
          onClick: () => setMode("create"),
          children: "Создать"
        }
      )
    ] }),
    addedNotice && mode === "topics" && /* @__PURE__ */ jsx(Typography, { color: "success.main", sx: { mb: 2 }, children: addedNotice }),
    mode === "topics" && /* @__PURE__ */ jsx("div", { className: "fillword-topic-list", children: allTopics.map((topic) => {
      const isCustom = customTopics.some((t) => t.id === topic.id);
      return /* @__PURE__ */ jsx(
        "div",
        {
          className: "fillword-topic-card",
          children: /* @__PURE__ */ jsxs(
            Stack,
            {
              direction: { xs: "column", sm: "row" },
              spacing: 1,
              sx: {
                alignItems: { sm: "center" },
                justifyContent: "space-between"
              },
              children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs(
                    Stack,
                    {
                      direction: "row",
                      spacing: 1,
                      sx: { alignItems: "center", mb: 0.5 },
                      children: [
                        /* @__PURE__ */ jsx(Typography, { variant: "h6", sx: { fontWeight: 600 }, children: topic.title }),
                        isCustom && /* @__PURE__ */ jsx(Chip, { size: "small", label: "своя", color: "success" })
                      ]
                    }
                  ),
                  topic.description && /* @__PURE__ */ jsx(Typography, { variant: "body2", color: "text.secondary", children: topic.description }),
                  /* @__PURE__ */ jsxs(Typography, { variant: "caption", color: "text.secondary", children: [
                    "Слов: ",
                    topic.words.length,
                    " · сетка ",
                    topic.config.rows,
                    "×",
                    topic.config.cols
                  ] })
                ] }),
                /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 1, children: [
                  isCustom && /* @__PURE__ */ jsx(
                    Button,
                    {
                      size: "small",
                      color: "inherit",
                      onClick: () => handleRemoveCustom(topic.id),
                      children: "Удалить"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      component: Link,
                      to: `/fillword/${topic.id}`,
                      variant: "contained",
                      children: "Играть"
                    }
                  )
                ] })
              ]
            }
          )
        },
        `${isCustom ? "c" : "b"}-${topic.id}`
      );
    }) }),
    mode === "create" && (Create ? /* @__PURE__ */ jsx(Create, { onAddTopic: handleAddTopic }) : /* @__PURE__ */ jsx(Stack, { sx: { alignItems: "center", py: 6 }, children: /* @__PURE__ */ jsx(CircularProgress, { size: 28 }) }))
  ] });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FillwordPage,
  default: FillwordPage
}, Symbol.toStringTag, { value: "Module" }));
function FillwordPlayPage() {
  const { topicId } = useParams();
  const [topic, setTopic] = useState(
    void 0
  );
  const [Play, setPlay] = useState(null);
  useEffect(() => {
    setTopic(topicId ? getFillwordTopic(topicId) ?? null : null);
  }, [topicId]);
  useEffect(() => {
    let cancelled = false;
    void import("./PlayPuzzle-D0MoIVqM.js").then((mod) => {
      if (!cancelled) setPlay(() => mod.PlayPuzzle);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  if (topic === void 0 || !Play) {
    return /* @__PURE__ */ jsx("section", { className: "fillword-page", children: /* @__PURE__ */ jsx(Stack, { sx: { alignItems: "center", py: 8 }, children: /* @__PURE__ */ jsx(CircularProgress, { size: 28 }) }) });
  }
  if (!topic) {
    return /* @__PURE__ */ jsx("section", { className: "fillword-page", children: /* @__PURE__ */ jsxs(Stack, { spacing: 2, sx: { alignItems: "flex-start" }, children: [
      /* @__PURE__ */ jsx(Typography, { variant: "h5", component: "h1", sx: { fontWeight: 700 }, children: "Тема не найдена" }),
      /* @__PURE__ */ jsx(Typography, { color: "text.secondary", children: "Выберите тему из списка филвордов." }),
      /* @__PURE__ */ jsx(Button, { component: Link, to: "/fillword", variant: "contained", children: "К темам" })
    ] }) });
  }
  return /* @__PURE__ */ jsx("section", { className: "fillword-page", children: /* @__PURE__ */ jsx(Play, { topic, topicsHref: "/fillword" }) });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FillwordPlayPage,
  default: FillwordPlayPage
}, Symbol.toStringTag, { value: "Module" }));
function MatchLayout() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MatchLayout,
  default: MatchLayout
}, Symbol.toStringTag, { value: "Module" }));
const passeriformesLevel = {
  id: "passeriformes",
  title: "Воробьинообразные",
  description: "Гнёзда, пение и питание — сопоставьте признаки с ключевыми словами отряда.",
  questions: [
    {
      id: "q-nests",
      prompt: "Сопоставьте признаки с типом гнезда",
      blocks: [
        { id: "cup", keyword: "Чашевидное", capacity: 3 },
        { id: "cavity", keyword: "Дупло", capacity: 2 },
        { id: "dome", keyword: "Куполообразное", capacity: 2 }
      ],
      options: [
        { id: "opt-soft-lining", label: "Мягкая выстилка", blockId: "cup" },
        { id: "opt-open-rim", label: "Открытый край", blockId: "cup" },
        { id: "opt-twigs", label: "Веточки снаружи", blockId: "cup" },
        { id: "opt-tree-hole", label: "Древесная ниша", blockId: "cavity" },
        { id: "opt-narrow-entry", label: "Узкий вход", blockId: "cavity" },
        { id: "opt-side-door", label: "Боковой лаз", blockId: "dome" },
        { id: "opt-woven-roof", label: "Плетёный свод", blockId: "dome" }
      ]
    },
    {
      id: "q-songs",
      prompt: "Сопоставьте описание с характером пения",
      blocks: [
        { id: "trill", keyword: "Трель", capacity: 2 },
        { id: "whistle", keyword: "Свист", capacity: 2 },
        { id: "warble", keyword: "Щебет", capacity: 3 }
      ],
      options: [
        { id: "opt-rapid-notes", label: "Частые ноты", blockId: "trill" },
        { id: "opt-vibrato", label: "Вибрато", blockId: "trill" },
        { id: "opt-clear-tone", label: "Чистый тон", blockId: "whistle" },
        { id: "opt-long-phrase", label: "Длинная фраза", blockId: "whistle" },
        { id: "opt-varied", label: "Пестрая смена", blockId: "warble" },
        { id: "opt-soft-chatter", label: "Мягкий говор", blockId: "warble" },
        { id: "opt-short-bursts", label: "Короткие вспышки", blockId: "warble" }
      ]
    },
    {
      id: "q-diet",
      prompt: "Сопоставьте пищу с типом питания",
      blocks: [
        { id: "insect", keyword: "Насекомоядные", capacity: 3 },
        { id: "seed", keyword: "Зерноядные", capacity: 2 },
        { id: "mixed", keyword: "Всеядные", capacity: 2 }
      ],
      options: [
        { id: "opt-larvae", label: "Личинки", blockId: "insect" },
        { id: "opt-aphids", label: "Тля", blockId: "insect" },
        { id: "opt-beetles", label: "Жуки", blockId: "insect" },
        { id: "opt-grain", label: "Зерно", blockId: "seed" },
        { id: "opt-seeds", label: "Семена трав", blockId: "seed" },
        { id: "opt-berries", label: "Ягоды", blockId: "mixed" },
        { id: "opt-scraps", label: "Крошки", blockId: "mixed" }
      ]
    }
  ]
};
const raptorsLevel = {
  id: "raptors",
  title: "Хищные птицы",
  description: "Охота, клюв и крыло — признаки дневных и ночных хищников.",
  questions: [
    {
      id: "q-hunt",
      prompt: "Сопоставьте приём охоты с группой",
      blocks: [
        { id: "falcon", keyword: "Соколиные", capacity: 2 },
        { id: "eagle", keyword: "Орлиные", capacity: 2 },
        { id: "owl", keyword: "Совы", capacity: 2 }
      ],
      options: [
        { id: "opt-stoop", label: "Пикирование", blockId: "falcon" },
        { id: "opt-aerial", label: "Воздушная схватка", blockId: "falcon" },
        { id: "opt-soar", label: "Парение", blockId: "eagle" },
        { id: "opt-seize", label: "Хват с высоты", blockId: "eagle" },
        { id: "opt-silent", label: "Бесшумный полёт", blockId: "owl" },
        { id: "opt-ambush", label: "Засада ночью", blockId: "owl" }
      ]
    },
    {
      id: "q-traits",
      prompt: "Сопоставьте признак с типом хищника",
      blocks: [
        { id: "diurnal", keyword: "Дневные", capacity: 3 },
        { id: "nocturnal", keyword: "Ночные", capacity: 2 }
      ],
      options: [
        { id: "opt-keen-sight", label: "Острое зрение", blockId: "diurnal" },
        { id: "opt-hooked", label: "Крючковатый клюв", blockId: "diurnal" },
        { id: "opt-talons", label: "Сильные когти", blockId: "diurnal" },
        { id: "opt-facial-disk", label: "Лицевой диск", blockId: "nocturnal" },
        { id: "opt-soft-plumage", label: "Мягкое оперение", blockId: "nocturnal" }
      ]
    }
  ]
};
const matchLevels = [passeriformesLevel, raptorsLevel];
function getMatchLevel(id) {
  return matchLevels.find((level) => level.id === id);
}
function MatchTopicsPage() {
  return /* @__PURE__ */ jsxs("section", { className: "match-quiz-page match-topics-page", children: [
    /* @__PURE__ */ jsx(BackHomeLink, { sx: { mb: 1 } }),
    /* @__PURE__ */ jsxs(Stack, { spacing: 3, children: [
      /* @__PURE__ */ jsxs(Stack, { spacing: 1, className: "match-quiz-meta", sx: { alignItems: "flex-start" }, children: [
        /* @__PURE__ */ jsx(Typography, { variant: "h4", component: "h1", sx: { fontWeight: 700 }, children: "Сопоставление" }),
        /* @__PURE__ */ jsx(Typography, { color: "text.secondary", children: "Выберите тему вопросов" }),
        /* @__PURE__ */ jsx(DailyMatchScore, {})
      ] }),
      /* @__PURE__ */ jsx(Stack, { spacing: 2, children: matchLevels.map((level) => /* @__PURE__ */ jsx(
        Card,
        {
          variant: "outlined",
          sx: {
            borderColor: "var(--mq-meta-border)",
            bgcolor: "var(--mq-options-body)"
          },
          children: /* @__PURE__ */ jsx(CardActionArea, { component: Link, to: `/match/${level.id}`, children: /* @__PURE__ */ jsxs(CardContent, { children: [
            /* @__PURE__ */ jsx(Typography, { variant: "h6", gutterBottom: true, sx: { fontWeight: 600 }, children: level.title }),
            /* @__PURE__ */ jsx(Typography, { variant: "body2", color: "text.secondary", children: level.description }),
            /* @__PURE__ */ jsxs(
              Typography,
              {
                variant: "caption",
                sx: { display: "block", mt: 1.25, color: "var(--mq-purple-deep)" },
                children: [
                  "Вопросов: ",
                  level.questions.length
                ]
              }
            )
          ] }) })
        },
        level.id
      )) })
    ] })
  ] });
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MatchTopicsPage,
  default: MatchTopicsPage
}, Symbol.toStringTag, { value: "Module" }));
function isOptionMatchForBlock(option, blockId) {
  return option.blockId === blockId;
}
function sortOptionsAlphabetically(options) {
  return [...options].sort((a, b) => {
    if (a.imageSortKey || b.imageSortKey) {
      return (a.imageSortKey ?? a.label).localeCompare(b.imageSortKey ?? b.label, "ru", {
        sensitivity: "base"
      });
    }
    return a.label.localeCompare(b.label, "ru", { sensitivity: "base" });
  });
}
function emptyPlaced(level, questionIndex) {
  const blocks = level.questions[questionIndex]?.blocks ?? [];
  return Object.fromEntries(blocks.map((b) => [b.id, []]));
}
function useMatchQuiz(level) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [placedByBlock, setPlacedByBlock] = useState(
    () => emptyPlaced(level, 0)
  );
  const [score, setScore] = useState(0);
  const [rejectFlashId, setRejectFlashId] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const question = level.questions[questionIndex];
  const totalQuestions = level.questions.length;
  const placedIds = useMemo(
    () => new Set(Object.values(placedByBlock).flat()),
    [placedByBlock]
  );
  const poolOptions = useMemo(() => {
    if (!question) return [];
    return question.options.filter((o) => !placedIds.has(o.id));
  }, [question, placedIds]);
  const optionsById = useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    question?.options.forEach((o) => map.set(o.id, o));
    return map;
  }, [question]);
  const isQuestionDone = useMemo(() => {
    if (!question) return false;
    return question.blocks.every(
      (block) => (placedByBlock[block.id]?.length ?? 0) >= block.capacity
    );
  }, [question, placedByBlock]);
  const tryPlace = useCallback(
    (optionId, blockId) => {
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
        [...current, optionId].map((id) => optionsById.get(id)).filter((o) => Boolean(o))
      ).map((o) => o.id);
      setPlacedByBlock((prev) => ({ ...prev, [blockId]: nextIds }));
      setScore((s) => s + 1);
      return true;
    },
    [optionsById, question, placedByBlock, placedIds]
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
    restart
  };
}
function QuizMenuModal({ open, onClose, onRestart }) {
  return /* @__PURE__ */ jsxs(Dialog, { open, onClose, fullWidth: true, maxWidth: "xs", children: [
    /* @__PURE__ */ jsx(DialogTitle, { children: "Меню уровня" }),
    /* @__PURE__ */ jsx(DialogContent, { children: /* @__PURE__ */ jsxs(Stack, { spacing: 1.5, sx: { pt: 1 }, children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          component: Link,
          to: "/match",
          variant: "outlined",
          color: "inherit",
          fullWidth: true,
          children: "К темам"
        }
      ),
      /* @__PURE__ */ jsx(Button, { variant: "contained", color: "primary", fullWidth: true, onClick: onClose, children: "Продолжить" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outlined",
          color: "secondary",
          fullWidth: true,
          onClick: () => {
            onRestart();
            onClose();
          },
          children: "Начать заново"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(DialogActions, { children: /* @__PURE__ */ jsx(Button, { onClick: onClose, children: "Закрыть" }) })
  ] });
}
function SuccessModal({ open, score }) {
  return /* @__PURE__ */ jsxs(Dialog, { open, fullWidth: true, maxWidth: "xs", children: [
    /* @__PURE__ */ jsx(DialogTitle, { children: "Уровень пройден!" }),
    /* @__PURE__ */ jsx(DialogContent, { children: /* @__PURE__ */ jsxs(Typography, { children: [
      "Все вопросы сопоставлены. Набрано очков: ",
      /* @__PURE__ */ jsx("strong", { children: score }),
      "."
    ] }) }),
    /* @__PURE__ */ jsx(DialogActions, { children: /* @__PURE__ */ jsx(Button, { component: Link, to: "/match", variant: "contained", color: "primary", children: "К темам" }) })
  ] });
}
function MatchQuizSession({ level }) {
  const {
    question,
    totalQuestions,
    progressDone,
    score,
    poolOptions,
    placedByBlock,
    optionsById,
    isQuestionDone,
    isComplete,
    rejectFlashId,
    tryPlace,
    goNextQuestion,
    restart
  } = useMatchQuiz(level);
  const [menuOpen, setMenuOpen] = useState(false);
  const [celebrated, setCelebrated] = useState(false);
  const [Board, setBoard] = useState(
    null
  );
  useEffect(() => {
    let cancelled = false;
    void import("./MatchQuizBoard-DLc5UFHx.js").then((mod) => {
      if (!cancelled) setBoard(() => mod.MatchQuizBoard);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  useEffect(() => {
    if (!isQuestionDone || isComplete) return;
    const timer = window.setTimeout(() => goNextQuestion(), 450);
    return () => window.clearTimeout(timer);
  }, [isQuestionDone, isComplete, goNextQuestion]);
  useEffect(() => {
    if (!isComplete || celebrated) return;
    setCelebrated(true);
    addDailyMatchScore(score);
    confetti({
      particleCount: 140,
      spread: 70,
      origin: { y: 0.65 }
    });
    window.setTimeout(() => {
      confetti({ particleCount: 80, angle: 60, spread: 100, origin: { x: 0 } });
      confetti({ particleCount: 80, angle: 120, spread: 100, origin: { x: 1 } });
    }, 250);
  }, [isComplete, celebrated, score]);
  const handleRestart = () => {
    setCelebrated(false);
    restart();
  };
  if (!question) {
    return null;
  }
  const progressPct = totalQuestions > 0 ? Math.round(progressDone / totalQuestions * 100) : 0;
  return /* @__PURE__ */ jsxs("section", { className: "match-quiz-page", children: [
    /* @__PURE__ */ jsx(
      AppBar,
      {
        position: "static",
        elevation: 0,
        className: "match-quiz-header",
        sx: {
          background: "var(--mq-header-bg)",
          color: "var(--mq-header-fg)",
          borderRadius: "12px",
          boxShadow: "0 6px 18px rgba(40, 28, 58, 0.22)"
        },
        children: /* @__PURE__ */ jsxs(Toolbar, { sx: { gap: 1, px: { xs: 1.5, sm: 2 } }, children: [
          /* @__PURE__ */ jsx(
            Typography,
            {
              variant: "h6",
              sx: { flex: 1, fontWeight: 600, color: "var(--mq-header-fg)" },
              children: level.title
            }
          ),
          /* @__PURE__ */ jsx(
            IconButton,
            {
              edge: "end",
              "aria-label": "Открыть меню",
              onClick: () => setMenuOpen(true),
              sx: { color: "var(--mq-header-fg-muted)" },
              children: /* @__PURE__ */ jsx(MenuIcon, {})
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "match-quiz-meta", children: [
      /* @__PURE__ */ jsx(Typography, { variant: "h5", component: "h1", className: "match-quiz-prompt", children: question.prompt }),
      /* @__PURE__ */ jsxs(Stack, { sx: { alignItems: "center", gap: 0.25 }, children: [
        /* @__PURE__ */ jsx("span", { className: "match-quiz-score-label", children: "Счёт" }),
        /* @__PURE__ */ jsx("span", { className: "match-quiz-score", children: score })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "match-quiz-progress-row", "aria-label": "Прогресс квиза", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "match-quiz-progress-bar",
            role: "progressbar",
            "aria-valuemin": 0,
            "aria-valuemax": totalQuestions,
            "aria-valuenow": progressDone,
            children: /* @__PURE__ */ jsx("span", { style: { width: `${progressPct}%` } })
          }
        ),
        /* @__PURE__ */ jsxs("span", { className: "match-quiz-progress-count", children: [
          progressDone,
          " / ",
          totalQuestions
        ] })
      ] })
    ] }),
    Board ? /* @__PURE__ */ jsx(
      Board,
      {
        poolOptions,
        blocks: question.blocks,
        placedByBlock,
        optionsById,
        rejectFlashId,
        isQuestionDone,
        isComplete,
        onGoNext: goNextQuestion,
        onTryPlace: tryPlace
      }
    ) : /* @__PURE__ */ jsx(Stack, { sx: { alignItems: "center", py: 8 }, children: /* @__PURE__ */ jsx(CircularProgress, { size: 28 }) }),
    /* @__PURE__ */ jsx(
      QuizMenuModal,
      {
        open: menuOpen,
        onClose: () => setMenuOpen(false),
        onRestart: handleRestart
      }
    ),
    /* @__PURE__ */ jsx(SuccessModal, { open: isComplete, score })
  ] });
}
function MatchQuizPage() {
  const { levelId } = useParams();
  const level = levelId ? getMatchLevel(levelId) : void 0;
  if (!level) {
    return /* @__PURE__ */ jsx("section", { className: "match-quiz-page", children: /* @__PURE__ */ jsxs(Stack, { spacing: 2, className: "match-quiz-meta", sx: { alignItems: "flex-start" }, children: [
      /* @__PURE__ */ jsx(Typography, { variant: "h5", component: "h1", children: "Тема не найдена" }),
      /* @__PURE__ */ jsx(Typography, { color: "text.secondary", children: "Выберите тему из списка сопоставлений." }),
      /* @__PURE__ */ jsx(Button, { component: Link, to: "/match", variant: "contained", children: "К темам" })
    ] }) });
  }
  return /* @__PURE__ */ jsx(MatchQuizSession, { level }, level.id);
}
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MatchQuizPage,
  default: MatchQuizPage
}, Symbol.toStringTag, { value: "Module" }));
const NumCard = ({
  curCount,
  families: families2,
  isTabActive,
  speciesNum,
  onClick,
  toggleTabActive
}) => {
  return /* @__PURE__ */ jsxs(
    Card,
    {
      raised: speciesNum === curCount,
      sx: {
        bgcolor: speciesNum === curCount ? "lightsalmon" : "lightcyan",
        height: "fit-content"
      },
      children: [
        /* @__PURE__ */ jsx(
          CardHeader,
          {
            title: speciesNum,
            subheader: isTabActive ? "видов" : null,
            sx: { cursor: "pointer" },
            slotProps: {
              content: { sx: { display: "flex", direction: "rtl", justifyContent: "left" } },
              subheader: {
                sx: {
                  content: '"видов"',
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                  fontSize: ".5em"
                }
              }
            },
            onClick
          }
        ),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsx(Typography, { variant: "h3", component: "center", children: families2.length }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Accordion, { expanded: isTabActive, onChange: toggleTabActive, children: [
            /* @__PURE__ */ jsx(
              AccordionSummary,
              {
                expandIcon: /* @__PURE__ */ jsx(ExpandMore, {}),
                id: `${curCount}-panel-header`,
                children: /* @__PURE__ */ jsx(Typography, { variant: "caption", component: "span", children: "Семейств содержат" })
              }
            ),
            /* @__PURE__ */ jsx(AccordionDetails, { sx: { px: 0.5 }, children: families2.map((family, id) => /* @__PURE__ */ jsx(
              Typography,
              {
                variant: "body2",
                component: "p",
                sx: { py: 0.5, px: 2, ":hover": { bgcolor: "aliceblue" } },
                children: family.name || family.latin_name
              },
              id
            )) })
          ] }) })
        ] })
      ]
    }
  );
};
const NumCardList = ({ curCount, list, changeCountHandler }) => {
  const [activeTabs, setActiveTabs] = useState([]);
  const onExpandAll = () => setActiveTabs([...list.map((_, index) => index)]);
  const onCollapseAll = () => setActiveTabs([]);
  const toggleTabActive = (index) => setActiveTabs(
    (prev) => prev.includes(index) ? prev.filter((ind) => ind !== index) : [...prev, index]
  );
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          display: list.length ? "flex" : "none",
          justifyContent: list.at(-1)?.speciesNum === 1 ? "right" : "left"
        },
        children: [
          /* @__PURE__ */ jsx(Button, { size: "small", onClick: onCollapseAll, disabled: !activeTabs.length, children: "Collapse All" }),
          /* @__PURE__ */ jsx(Button, { size: "small", onClick: onExpandAll, disabled: activeTabs.length === list.length, children: "Expand All" })
        ]
      }
    ),
    /* @__PURE__ */ jsx(Grid, { container: true, columns: 2, spacing: 1, sx: { alignContent: "flex-start", width: (180 + 8) * 2 }, children: list.map(({ speciesNum, families: families2 }, index) => /* @__PURE__ */ jsx(Grid, { size: 1, children: /* @__PURE__ */ jsx(
      NumCard,
      {
        curCount,
        families: families2,
        isTabActive: activeTabs.includes(index),
        speciesNum,
        onClick: () => changeCountHandler(speciesNum),
        toggleTabActive: () => toggleTabActive(index)
      }
    ) }, `families-card-${index}`)) })
  ] });
};
const order_name = "Воробьинообразных";
const prefix = {
  MAX: "MAX",
  COMPLETED: "COMPLETED",
  HALF: "HALF",
  WITH: "WITH"
};
const achievements = {
  [prefix.HALF + `_FAMILIES`]: `Пройдена половина от количества всех семейств ${order_name}!`,
  [prefix.HALF + `_SPECIES`]: `Пройдена половина от количества всех видов ${order_name}!`,
  [prefix.HALF + `_SPECIES_LENGTH`]: `Пройдены семейства, что содержали видов меньше, чем вдвое относительно самого многочисленного!`,
  [prefix.COMPLETED + `_FIRST_TEN`]: `Пройдены все семейства отряда ${order_name}, содержащие меньше 10 видов!`,
  [prefix.COMPLETED + `_FIRST_FIFTY`]: `Пройдены все семейства отряда ${order_name}, содержащие меньше 50 видов!`,
  [prefix.COMPLETED + `_FIRST_HUNDRED`]: `Пройдены все семейства отряда ${order_name}, содержащие меньше 100 видов!`,
  [prefix.WITH + `_FIRST_TEN`]: `Достигнуто число, равное количеству групп, семейства в которых содержат до 10 видов!`,
  [prefix.WITH + `_FIRST_FIFTY`]: `Достигнуто число, равное количеству групп, семейства в которых содержат до 50 видов!`,
  [prefix.WITH + `_FIRST_HUNDRED`]: `Достигнуто число, равное количеству групп, семейства в которых содержат до 100 видов!`,
  [prefix.MAX + `_GROUPS`]: `Достигнуто число, равное количеству групп семейств в отряде ${order_name} по соответствию с количеством видов!`,
  [prefix.MAX + `_FAMILIES`]: `Достигнуто число, равное количеству семейств в отряде ${order_name}!`,
  [prefix.MAX + `_SPECIES`]: `Достигнуто число, равное количеству видов в самом крупном семействе отряда ${order_name}!`
};
const achievementsTitle = {
  [prefix.HALF + `_FAMILIES`]: `Половина "семейств" отряда!`,
  [prefix.HALF + `_SPECIES`]: `Половина "видов" отряда!`,
  [prefix.HALF + `_SPECIES_LENGTH`]: `Расцвет многообразия`,
  [prefix.COMPLETED + `_FIRST_TEN`]: `Первая десятка!`,
  [prefix.COMPLETED + `_FIRST_FIFTY`]: `Первый полтинник!`,
  [prefix.COMPLETED + `_FIRST_HUNDRED`]: `Первая сотня!`,
  [prefix.WITH + `_FIRST_TEN`]: "Группы первой десятки!",
  [prefix.WITH + `_FIRST_FIFTY`]: "Группы первого полтинника!",
  [prefix.WITH + `_FIRST_HUNDRED`]: "Группы первой сотни!",
  [prefix.MAX + `_GROUPS`]: `Итого групп`,
  [prefix.MAX + `_FAMILIES`]: `Итого семейств`,
  [prefix.MAX + `_SPECIES`]: `Максимум видового разнообразия!`
};
const achievementsSign = {
  [prefix.HALF + `_FAMILIES`]: "½F",
  [prefix.HALF + `_SPECIES`]: "½S",
  [prefix.HALF + `_SPECIES_LENGTH`]: "len",
  [prefix.COMPLETED + `_FIRST_TEN`]: "10",
  [prefix.COMPLETED + `_FIRST_FIFTY`]: "50",
  [prefix.COMPLETED + `_FIRST_HUNDRED`]: "100",
  [prefix.WITH + `_FIRST_TEN`]: null,
  [prefix.WITH + `_FIRST_FIFTY`]: null,
  [prefix.WITH + `_FIRST_HUNDRED`]: null,
  [prefix.MAX + `_GROUPS`]: "G",
  [prefix.MAX + `_FAMILIES`]: "F",
  [prefix.MAX + `_SPECIES`]: "S"
};
const getSpeciesAllNum = (order2) => order2.families[order2.families.length - 1].species_length;
function getHalfSpeciesFamilyNum(order2) {
  const HALF_SPECIES_NUM = Math.floor(order2.species_length / 2);
  let index = 0;
  for (let count = 0, i = 0; i < order2.families.length; i++, index++) {
    count += order2.families[i].species_length;
    if (count > HALF_SPECIES_NUM) break;
  }
  return order2.families[index].species_length;
}
function getCompletedFirstValues(order2) {
  const groups = new Set(
    order2.families.reduce((acc, value) => [...acc, value.species_length], [])
  );
  return {
    MAX_GROUPS: groups.size,
    MAX_FAMILIES: order2.families.length,
    MAX_SPECIES: getSpeciesAllNum(order2),
    WITH_FIRST_TEN: Array.from(groups).filter((value) => value <= 10).length,
    WITH_FIRST_FIFTY: Array.from(groups).filter((value) => value <= 50).length,
    WITH_FIRST_HUNDRED: Array.from(groups).filter((value) => value <= 100).length,
    COMPLETED_FIRST_TEN: 10,
    COMPLETED_FIRST_FIFTY: 50,
    COMPLETED_FIRST_HUNDRED: 100
  };
}
function getAchievementIndexes(order2) {
  const LEN = order2.families.length;
  const HALF_SPECIES = Math.ceil(getSpeciesAllNum(order2) / 2);
  const HALF_FAMILIES = Math.ceil(LEN / 2);
  return {
    ...getCompletedFirstValues(order2),
    HALF_SPECIES_INDEX: getHalfSpeciesFamilyNum(order2),
    HALF_FAMILIES_INDEX: HALF_FAMILIES,
    HALF_SPECIES_LENGTH: HALF_SPECIES
  };
}
const signColors = {
  [prefix.MAX]: [red, orange, amber],
  [prefix.COMPLETED]: [teal, green, lime],
  [prefix.HALF]: [cyan, blue, indigo],
  [prefix.WITH]: [grey, brown, purple]
};
function checkAchievements(curCount, order2) {
  const {
    MAX_GROUPS,
    MAX_FAMILIES,
    MAX_SPECIES,
    COMPLETED_FIRST_TEN,
    COMPLETED_FIRST_FIFTY,
    COMPLETED_FIRST_HUNDRED,
    HALF_FAMILIES_INDEX,
    HALF_SPECIES_INDEX,
    HALF_SPECIES_LENGTH,
    WITH_FIRST_TEN,
    WITH_FIRST_FIFTY,
    WITH_FIRST_HUNDRED
  } = getAchievementIndexes(order2);
  switch (curCount) {
    case COMPLETED_FIRST_TEN:
      return createAchievement(prefix.COMPLETED + "_FIRST_TEN", signColors[prefix.COMPLETED][0]);
    case COMPLETED_FIRST_FIFTY:
      return createAchievement(prefix.COMPLETED + "_FIRST_FIFTY", signColors[prefix.COMPLETED][1]);
    case COMPLETED_FIRST_HUNDRED:
      return createAchievement(prefix.COMPLETED + "_FIRST_HUNDRED", signColors[prefix.COMPLETED][2]);
    case WITH_FIRST_TEN:
      return createAchievement(prefix.WITH + "_FIRST_TEN", signColors[prefix.WITH][0], curCount.toString());
    case WITH_FIRST_FIFTY:
      return createAchievement(prefix.WITH + "_FIRST_FIFTY", signColors[prefix.WITH][1], curCount.toString());
    case WITH_FIRST_HUNDRED:
      return createAchievement(prefix.WITH + "_FIRST_HUNDRED", signColors[prefix.WITH][2], curCount.toString());
    case MAX_GROUPS:
      return createAchievement(prefix.MAX + "_GROUPS", signColors[prefix.MAX][0]);
    case MAX_FAMILIES:
      return createAchievement(prefix.MAX + "_FAMILIES", signColors[prefix.MAX][1]);
    case MAX_SPECIES:
      return createAchievement(prefix.MAX + "_SPECIES", signColors[prefix.MAX][2]);
    case HALF_FAMILIES_INDEX:
      return createAchievement(prefix.HALF + "_FAMILIES", signColors[prefix.HALF][0]);
    case HALF_SPECIES_INDEX:
      return createAchievement(prefix.HALF + "_SPECIES", signColors[prefix.HALF][1]);
    case HALF_SPECIES_LENGTH:
      return createAchievement(prefix.HALF + "_SPECIES_LENGTH", signColors[prefix.HALF][2]);
  }
}
function createAchievement(CODE, color, symbol) {
  return {
    signSymbol: symbol ?? achievementsSign[CODE],
    title: achievementsTitle[CODE],
    message: achievements[CODE],
    signBg: color[500],
    accentBg: color[100]
  };
}
function calcHighestDigitPlace(curCount, goal, order2) {
  if (curCount > goal || goal <= 0 || curCount < 0) {
    throw new Error("Некорректное значение счётчика или искомого числа!");
  }
  const digitNum = new String(goal - curCount).length;
  const stepPos = 10 ** (digitNum - 1);
  return {
    stepPos,
    isAchieveInRange: isAchieveInRange(curCount, curCount + stepPos, order2)
  };
}
function isAchieveInRange(startNum, endNum, order2) {
  const points = Object.values(getAchievementIndexes(order2));
  return points.findIndex((value) => startNum < value && value < endNum) > -1;
}
const CounterPaper = ({
  count,
  isAchieve,
  listLength,
  order: order2,
  addListItem,
  changeCountHandler
}) => {
  const achievedCountRef = useRef(0);
  const speciesMAX = useMemo(() => order2.families[order2.families.length - 1].species_length, [order2]);
  const edgePartNum = useMemo(() => order2.families_length / 2, [order2]);
  const groups = useMemo(
    () => new Set(
      order2.families.reduce((acc, value) => [...acc, value.species_length], [])
    ),
    [order2]
  );
  const goneFamiliesCalc = order2.families.filter(({ species_length }) => species_length <= count).length;
  const goneSpeciesCalc = order2.families.filter(({ species_length }) => species_length <= count).reduce((acc, { species_length }) => acc + species_length, 0);
  const {
    stepPos,
    isAchieveInRange: isAchieveInRange2
  } = calcHighestDigitPlace(
    count,
    Array.from(groups).find((species) => species > count) || speciesMAX,
    order2
  );
  const minusCountHandler = () => changeCountHandler(count - 1);
  const plusCountHandler = () => handleAddToList(count + 1);
  const addStepCountHandler = () => handleAddToList(count + stepPos);
  function handleAddToList(newCount) {
    changeCountHandler(newCount);
    const familiesCalculated = order2.families.filter(({ species_length }) => species_length === newCount);
    if (newCount > achievedCountRef.current) {
      achievedCountRef.current = newCount;
      if (familiesCalculated.length) {
        const isBilateral = +(achievedCountRef.current > edgePartNum);
        const setList = addListItem(isBilateral);
        setList(
          (prev) => [{ speciesNum: newCount, families: familiesCalculated }, ...prev]
        );
      }
    }
  }
  return /* @__PURE__ */ jsxs(Paper, { elevation: 5, sx: { width: 200, p: 2, mx: 1.5, height: "fit-content" }, children: [
    /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsxs(Typography, { variant: "body2", color: "textSecondary", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Групп: ",
        listLength
      ] }),
      /* @__PURE__ */ jsxs(Typography, { variant: "body2", color: "textPrimary", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "Семейств: ",
          goneFamiliesCalc
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Видов: ",
          goneSpeciesCalc
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(
        Typography,
        {
          variant: "h1",
          component: "center",
          color: count <= 0 ? "textDisabled" : count === speciesMAX ? "success" : isAchieve ? "secondary" : "textPrimary",
          children: count
        }
      ),
      /* @__PURE__ */ jsxs(Stack, { children: [
        /* @__PURE__ */ jsxs(ButtonGroup, { fullWidth: true, size: "large", color: "primary", children: [
          /* @__PURE__ */ jsx(Button, { onClick: minusCountHandler, disabled: count === 0, children: "-1" }),
          /* @__PURE__ */ jsx(Button, { onClick: plusCountHandler, disabled: count === speciesMAX, children: "+1" })
        ] }),
        stepPos > 1 && /* @__PURE__ */ jsx(Button, { fullWidth: true, size: "large", color: isAchieveInRange2 ? "secondary" : "primary", variant: "outlined", onClick: addStepCountHandler, children: stepPos })
      ] })
    ] }),
    /* @__PURE__ */ jsx("footer", { children: /* @__PURE__ */ jsx("fieldset", { children: /* @__PURE__ */ jsxs(Typography, { variant: "caption", color: "textSecondary", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "MAX видов: ",
        speciesMAX
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Всего «семейств»: ",
        order2.families_length
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Всего «видов»: ",
        order2.species_length
      ] })
    ] }) }) })
  ] });
};
const families_high = [
  {
    name: "Танагровые",
    latin_name: "Thraupidae",
    species_length: 386,
    genera: [],
    genera_length: 0
  },
  {
    name: "Мухоловковые",
    latin_name: "Muscicapidae",
    species_length: 357,
    genera: [],
    genera_length: 0
  },
  // 300+
  {
    name: "Вьюрковые",
    latin_name: "Fringillidae",
    species_length: 239,
    genera: [],
    genera_length: 0
  },
  // 200+
  {
    name: "Дроздовые",
    latin_name: "Turdidae",
    species_length: 191,
    genera: [],
    genera_length: 0
  },
  {
    name: "Цистиколовые",
    latin_name: "Cisticolidae",
    species_length: 168,
    genera: [],
    genera_length: 0
  },
  {
    name: "Бюльбюлевые",
    latin_name: "Pycnonotidae",
    species_length: 167,
    genera: [],
    genera_length: 0
  },
  {
    name: "Нектарницевые",
    latin_name: "Nectariniidae",
    species_length: 152,
    genera: [],
    genera_length: 0
  },
  {
    name: "Белоглазковые",
    latin_name: "Zosteropidae",
    species_length: 152,
    genera: [],
    genera_length: 0
  },
  // 150+ (5)
  {
    name: "Вьюрковые_ткачики",
    latin_name: "Estrildidae",
    species_length: 140,
    genera: [],
    genera_length: 0
  },
  {
    name: "Кустарницевые",
    latin_name: "Leiothrichidae",
    species_length: 133,
    genera: [],
    genera_length: 0
  },
  {
    name: "Скворцовые",
    latin_name: "Sturnidae",
    species_length: 128,
    genera: [],
    genera_length: 0
  },
  {
    name: "Ткачиковые",
    latin_name: "Ploceidae",
    species_length: 122,
    genera: [],
    genera_length: 0
  },
  {
    name: "Жаворонковые",
    latin_name: "Alaudidae",
    species_length: 102,
    genera: [],
    genera_length: 0
  }
  // 100+ (5)
];
const families_middle_high = [
  {
    name: "Трясогузковые",
    latin_name: "",
    species_length: 70,
    genera: [],
    genera_length: 0
  },
  {
    name: "Земляные тимелии",
    latin_name: "",
    species_length: 70,
    genera: [],
    genera_length: 0
  }
];
const families_middle_low = [
  {
    name: "Ванговые",
    latin_name: "",
    species_length: 40,
    genera: [],
    genera_length: 0
  },
  {
    name: "Сорокопутовые",
    latin_name: "",
    species_length: 34,
    genera: [],
    genera_length: 0
  },
  {
    name: "Малюровые",
    latin_name: "",
    species_length: 33,
    genera: [],
    genera_length: 0
  },
  {
    name: "Иволговые",
    latin_name: "",
    species_length: 32,
    genera: [],
    genera_length: 0
  },
  {
    name: "Сережкоглазки",
    latin_name: "",
    species_length: 31,
    genera: [],
    genera_length: 0
  },
  {
    name: "Вдовушковые",
    latin_name: "",
    species_length: 20,
    genera: [],
    genera_length: 0
  }
];
const families_low = [
  {
    name: "Африканские славки",
    latin_name: "Macrosphenidae",
    species_length: 18,
    genera: [],
    genera_length: 0
  },
  {
    name: "Длиннохвостые синицы",
    latin_name: "Aegithalidae",
    species_length: 13,
    genera: [],
    genera_length: 0,
    alternative_names: ["Ополо́вники"]
  },
  {
    name: "Завирушковые",
    latin_name: "Prunellidae",
    species_length: 12,
    genera: [],
    genera_length: 0,
    alternative_names: ["Завирушки"]
  },
  {
    name: "Пеночковые",
    latin_name: "Phylloscopidae",
    species_length: 12,
    genera: [],
    genera_length: 0,
    alternative_names: ["Пеночки", "Настоящие пеночки"]
  },
  {
    name: "",
    latin_name: "Melanocharitidae",
    species_length: 12,
    genera: [],
    genera_length: 0,
    alternative_names: ["Ягодница"]
  },
  {
    name: "Флейтистовые",
    latin_name: "Cinclosomatidae",
    species_length: 12,
    genera: [],
    genera_length: 0
  },
  {
    name: "Ремезовые",
    latin_name: "Remizidae",
    species_length: 11,
    genera: [],
    genera_length: 0
  },
  {
    name: "",
    latin_name: "Bernieridae",
    species_length: 11,
    genera: [],
    genera_length: 0,
    alternative_names: ["Берньеровые", "Малагасийские тимелии"]
  },
  {
    name: "Альципповые",
    latin_name: "Alcippeidae",
    species_length: 10,
    genera: [],
    genera_length: 0,
    alternative_names: ["Альциппы"]
  },
  {
    name: "Пищуховые",
    latin_name: "Certhiidae",
    species_length: 9,
    genera: [],
    genera_length: 0
  },
  {
    name: "Стеностировые",
    latin_name: "Stenostiridae",
    species_length: 9,
    genera: [],
    genera_length: 0,
    alternative_names: ["мухоловки-феи"]
  },
  {
    name: "Ложнопищуховые",
    latin_name: "Climacteridae",
    species_length: 7,
    genera: [],
    genera_length: 0
  },
  {
    name: "",
    latin_name: "Psophodidae",
    species_length: 6,
    genera: [],
    genera_length: 0,
    transcription_hint: "Псофодовые"
  },
  {
    name: "Подорожниковые",
    latin_name: "Calcariidae",
    species_length: 6,
    genera: [],
    genera_length: 0,
    alternative_names: ["Пуночковые"]
  },
  {
    name: "Корольковые",
    latin_name: "Regulidae",
    species_length: 6,
    genera: [],
    genera_length: 0
  },
  {
    name: "Оляпки",
    latin_name: "Cinclidae",
    species_length: 5,
    genera: [],
    genera_length: 0
  },
  {
    name: "Шилоклювые тимелии",
    latin_name: "Pomatostomidae",
    species_length: 5,
    genera: [],
    genera_length: 0
  },
  {
    name: "Радужные птицы",
    latin_name: "Pardalotus",
    species_length: 4,
    genera: [],
    genera_length: 0,
    alternative_names: ["Радужники"]
  },
  {
    name: "Гуйи",
    latin_name: "Callaeidae",
    species_length: 4,
    genera: [],
    genera_length: 0,
    alternative_names: ["Новозеландские скворцы", "Серёжковые скворцы"]
  },
  {
    name: "Шелковистые свиристели",
    latin_name: "Ptiliogonatidae",
    species_length: 4,
    genera: [],
    genera_length: 0,
    alternative_names: ["Шелковистые мухоловки"],
    alternative_latin_names: ["Ptilogonatinae", "Ptilogonatidae"]
  },
  {
    name: "Багамские танагры",
    latin_name: "Spindalidae",
    species_length: 4,
    genera: [],
    genera_length: 0,
    alternative_names: ["Спиналисовые", "Кубинские танары"]
  },
  {
    name: "",
    latin_name: "Phaenicophilidae",
    species_length: 4,
    genera: [],
    genera_length: 0,
    alternative_names: ["Гаитянские танагры"]
  },
  {
    name: "Бесхвостковые",
    latin_name: "Pnoepygidae",
    species_length: 4,
    genera: [],
    genera_length: 0,
    alternative_names: ["Бесхвостые тимелии", "Короткохвостковые"]
  },
  {
    name: "",
    latin_name: "Mitrospingidae",
    species_length: 4,
    genera: [],
    genera_length: 0,
    alternative_names: ["Митроспинговые"]
  },
  {
    name: "Йоровые",
    latin_name: "Aegithinidae",
    species_length: 4,
    genera: [],
    genera_length: 0,
    alternative_names: ["Иоры", "Аегитиновые"]
  },
  {
    name: "Хилиоты",
    latin_name: "Hyliotidae",
    species_length: 4,
    genera: [],
    genera_length: 0,
    alternative_names: ["Гиблиотовые"]
  },
  {
    name: "Свиристелевые",
    latin_name: "Bombycillidae",
    species_length: 3,
    genera: [],
    genera_length: 0,
    alternative_names: ["Свиристели"]
  },
  {
    name: "Никаторы",
    latin_name: "Nicatoridae",
    species_length: 3,
    genera: [],
    genera_length: 0
  },
  {
    name: "",
    latin_name: "Irenidae",
    species_length: 3,
    genera: [],
    genera_length: 0,
    alternative_names: ["Иреновые"]
  },
  {
    name: "",
    latin_name: "Paramythiidae",
    species_length: 3,
    genera: [],
    genera_length: 0,
    alternative_names: ["Парамитиевые", "Пушистоголовые танагры"]
  },
  {
    name: "",
    latin_name: "Modulatricidae",
    species_length: 3,
    genera: [],
    genera_length: 0,
    alternative_names: ["Модулатриковые", "Пятнистые тимелии"]
  },
  {
    name: "Краснохохлые мухоловки",
    latin_name: "Erythrocercidae",
    species_length: 3,
    genera: [],
    genera_length: 0,
    alternative_names: ["Краснохвостковые мухоловки", "Эритроцерковые"]
  },
  {
    name: "",
    latin_name: "Oreoicidae",
    species_length: 3,
    genera: [],
    genera_length: 0,
    transcription_hint: "Ореиковые"
  },
  {
    name: "Мохуа",
    latin_name: "Mohouidae",
    species_length: 3,
    genera: [],
    genera_length: 0
  },
  {
    name: "Щетинкоклювки",
    latin_name: "Dasyornithidae",
    species_length: 3,
    genera: [],
    genera_length: 0
  },
  {
    name: "",
    latin_name: "Cnemophilidae",
    species_length: 3,
    genera: [],
    genera_length: 0,
    alternative_names: ["Атласные шалашники"]
  },
  {
    name: "Чаучиллы",
    latin_name: "Orthonychidae",
    species_length: 3,
    genera: [],
    genera_length: 0
  },
  {
    name: "Сителлы",
    latin_name: "Neosittidae",
    species_length: 3,
    genera: [],
    genera_length: 0,
    alternative_names: ["Краснолицые поползни"]
  },
  {
    name: "Ирены",
    latin_name: "Irenidae",
    species_length: 3,
    genera: [],
    genera_length: 0
  },
  {
    name: "Скальные прыгуны",
    latin_name: "Chaetopidae",
    species_length: 2,
    genera: [],
    genera_length: 0,
    alternative_names: ["Скакушковые"]
  },
  {
    name: "Буйволовые скворцы",
    latin_name: "Buphagidae",
    species_length: 2,
    genera: [],
    genera_length: 0,
    alternative_names: ["Волоклю́и", "Бупаговые"]
  },
  {
    name: "Лысые вороны",
    latin_name: "Picathartidae",
    species_length: 2,
    genera: [],
    genera_length: 0,
    alternative_names: ["Лысовороновые", "Пикатартесовые", "Восточные лысые сороки"]
  },
  {
    name: "Трясогузковые певуны",
    latin_name: "Teretistridae",
    species_length: 2,
    genera: [],
    genera_length: 0,
    alternative_names: ["Кубинские певуны", "Теретистровые"]
  },
  {
    name: "Корнихоны",
    latin_name: "Calyptophilus",
    species_length: 2,
    genera: [],
    genera_length: 0
  },
  {
    name: "",
    latin_name: "Hyliidae",
    species_length: 2,
    genera: [],
    genera_length: 0,
    alternative_names: ["Гилиевые"]
  },
  {
    name: "Лирохвосты",
    latin_name: "Menuridae",
    species_length: 2,
    genera: [],
    genera_length: 0,
    alternative_names: ["Птицы-лиры"]
  },
  {
    name: "Кустарниковые птицы",
    latin_name: "Atrichornithidae",
    species_length: 2,
    genera: [],
    genera_length: 0,
    alternative_names: ["Атрихии"]
  },
  {
    name: "Снегирёвые сойки",
    latin_name: "Corcoracidae",
    species_length: 2,
    genera: [],
    genera_length: 0
  },
  {
    name: "Лодкоклювые мухоловки",
    latin_name: "Machaerirhynchidae",
    species_length: 2,
    genera: [],
    genera_length: 0
  },
  {
    name: "Сахарные медососы",
    latin_name: "Promeropidae",
    species_length: 2,
    genera: [],
    genera_length: 0,
    alternative_names: ["Сахарные птицы"]
  },
  {
    name: "Новозеландский медосос",
    latin_name: "Notiomystidae",
    species_length: 1,
    genera: [],
    genera_length: 0,
    alternative_names: ["Хихи"]
  },
  {
    name: "Калимантанские сорокопуты",
    latin_name: "Pityriasidae",
    species_length: 1,
    genera: [],
    genera_length: 0,
    alternative_names: ["Щетинковый сорокопут", "Щетинкоголовый сорокопут"]
  },
  {
    name: "Хохлатая малайская сойка",
    latin_name: "Platylophidae",
    species_length: 1,
    genera: [],
    genera_length: 0
  },
  {
    name: "Серёжчатая толстоголовка",
    latin_name: "Eulacestomatidae",
    species_length: 1,
    genera: [],
    genera_length: 0
  },
  {
    name: "Волнистая толстоголовка",
    latin_name: "Rhagologidae",
    species_length: 1,
    genera: [],
    genera_length: 0
  },
  {
    name: "Синеголовая ифри́та",
    latin_name: "Ifritidae",
    species_length: 1,
    genera: [],
    genera_length: 0,
    alternative_names: ["Синеша́почная ифрита", "Ифриты"]
  }
];
const families = [
  ...families_high,
  ...families_middle_high,
  ...families_middle_low,
  ...families_low
];
families.sort((a, b) => a.species_length - b.species_length);
const order = {
  name: "Воробьинообразные",
  latin_name: "Passeriformes",
  species_length: families.reduce((acc, { species_length }) => acc + species_length, 0),
  // 3042
  genera_length: 0,
  // TODO
  families_length: families.length,
  families: [...families]
};
const AchieveCard = ({
  achieve,
  isActive,
  onClick
}) => {
  return /* @__PURE__ */ jsx(
    Card,
    {
      variant: "outlined",
      sx: {
        border: `2px solid ${achieve.signBg}`,
        bgcolor: isActive ? achieve.accentBg : "transparent",
        maxWidth: "380px",
        cursor: "pointer"
      },
      onClick,
      children: /* @__PURE__ */ jsx(
        CardHeader,
        {
          avatar: /* @__PURE__ */ jsx(Avatar, { sx: { bgcolor: achieve.signBg }, children: achieve.signSymbol }),
          title: achieve.title,
          subheader: achieve.message,
          slotProps: {
            title: { sx: { mb: 1, color: "WindowText", fontWeight: "bold" } }
          }
        }
      )
    }
  );
};
const AchieveCardList = ({
  achieves,
  count,
  changeCountHandler
}) => {
  return /* @__PURE__ */ jsx(Stack, { spacing: 0.5, direction: "column-reverse", children: achieves.map((achieve, index, array) => /* @__PURE__ */ jsx(
    AchieveCard,
    {
      achieve,
      isActive: array.find(({ title }) => title === achieve.title)?.count === count,
      onClick: () => changeCountHandler(achieve.count)
    },
    `achieve-card-${index}`
  )) });
};
const CounterSpecies = () => {
  const [count, setCount] = useState(0);
  const [listLeft, setListLeft] = useState([]);
  const [listRight, setListRight] = useState([]);
  const [achieves, setAchieves] = useState([]);
  const changeCountHandler = (newCount) => {
    setCount(newCount);
    const achieve = checkAchievements(count, order);
    if (achieve && !achieves.some(({ title }) => title === achieve.title)) {
      setAchieves((prev) => [...prev, { ...achieve, count }]);
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "counter-page", children: [
    /* @__PURE__ */ jsxs("header", { className: "counter-page__header", children: [
      /* @__PURE__ */ jsx(BackHomeLink, { tone: "inverse" }),
      /* @__PURE__ */ jsxs(Typography, { variant: "h5", component: "h1", sx: { flex: 1, textAlign: "center" }, children: [
        "Отряд: ",
        order.name || order.latin_name
      ] }),
      /* @__PURE__ */ jsx("span", { className: "counter-page__header-spacer", "aria-hidden": true })
    ] }),
    /* @__PURE__ */ jsx("main", { className: "counter-page__main", children: /* @__PURE__ */ jsxs("div", { className: "counter-page__board", children: [
      /* @__PURE__ */ jsx(
        NumCardList,
        {
          list: listLeft,
          curCount: count,
          changeCountHandler: setCount
        }
      ),
      /* @__PURE__ */ jsxs(Stack, { spacing: 1, sx: { alignItems: "center", mx: 1, zIndex: 1, gap: 2 }, children: [
        /* @__PURE__ */ jsx(
          CounterPaper,
          {
            count,
            isAchieve: achieves.some((achieve) => achieve.count === count),
            listLength: listLeft.length + listRight.length,
            order,
            addListItem: (isBilateral) => !isBilateral ? setListLeft : setListRight,
            changeCountHandler
          }
        ),
        !!achieves.length && /* @__PURE__ */ jsxs(Paper, { elevation: 5, sx: { p: 2, mx: 1.5 }, children: [
          /* @__PURE__ */ jsxs(Typography, { variant: "caption", children: [
            achieves.length,
            "/",
            Object.keys(achievements).length
          ] }),
          /* @__PURE__ */ jsx(
            AchieveCardList,
            {
              achieves,
              count,
              changeCountHandler
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        NumCardList,
        {
          list: listRight,
          curCount: count,
          changeCountHandler: setCount
        }
      )
    ] }) })
  ] });
};
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CounterSpeciesPage: CounterSpecies,
  default: CounterSpecies
}, Symbol.toStringTag, { value: "Module" }));
const specInputStaticProps = {
  photoUrls: { type: "url" },
  photoFiles: { type: "file", multiple: true },
  nameLatin: { lang: "la", pattern: "[a-z A-Z]+", required: true }
};
const textFieldBaseStyles = {
  fullWidth: true,
  color: "secondary",
  variant: "outlined"
};
function FormikTextField({ name, label, ...props }) {
  const [field, meta] = useField(name || "");
  return /* @__PURE__ */ jsx(
    TextField,
    {
      ...field,
      label,
      error: meta.touched && Boolean(meta.error),
      helperText: meta.touched && meta.error,
      ...textFieldBaseStyles,
      ...props
    }
  );
}
const ControlsTextField = ({
  id,
  label,
  value,
  specInputDynamicProps,
  // зависит от других полей
  isAdditionList,
  isMultilines,
  onChange,
  addItemHandler
}) => {
  const [field] = useField({ name: id });
  const specInputProps = { ...specInputStaticProps, ...specInputDynamicProps };
  const [isFocused, setIsFocused] = useState(false);
  const changeHandler = (e) => {
    const text = e.target.value;
    if (text[0]?.match(/\s/g)) {
      return;
    } else {
      onChange(text);
    }
  };
  const clearHandler = () => onChange("");
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    TextField,
    {
      id: `${id}-textfield`,
      label,
      value,
      onChange: changeHandler,
      onKeyDown: (e) => {
        if (!isAdditionList) return;
        if (e.key === "Enter" && !e.shiftKey) {
          addItemHandler();
          e.preventDefault();
        }
      },
      onFocus: () => setIsFocused(true),
      onBlur: (e) => (field.onBlur(e), setIsFocused(false)),
      margin: "dense",
      slotProps: {
        htmlInput: { multiple: true },
        inputLabel: { shrink: true },
        input: {
          endAdornment: /* @__PURE__ */ jsx(IconButton, { name: "action", value: "edit", size: "small", onClick: clearHandler, children: /* @__PURE__ */ jsx(
            Close,
            {
              color: isFocused ? "secondary" : value ? "action" : "disabled",
              fontSize: "small"
            }
          ) })
        }
      },
      ...textFieldBaseStyles,
      ...specInputProps[id],
      ...{
        minRows: isMultilines ? 3 : void 0,
        multiline: isMultilines,
        size: isMultilines ? "medium" : "small"
      }
    }
  );
};
const blockImages = { "name": "Загрузить фото (или ссылку)", "blocks": [{ "id": "photoUrls", "label": "URL фото", "isMultilines": false, "isAdditionList": true }] };
const blockNames = { "name": "Названия птицы", "blocks": [{ "id": "nameMain", "label": "Название (основное)", "isMultilines": false, "isAdditionList": false }, { "id": "nameLatin", "label": "Название (лат.)", "isMultilines": false, "isAdditionList": false }, { "id": "nameAlternatives", "label": "Альтернативные названия", "isMultilines": false, "isAdditionList": true }, { "id": "nameEtymologies", "label": "Этимология названий", "isMultilines": true, "isAdditionList": true }] };
const blockFacts = { "name": "Факты", "blocks": [{ "id": "interestFacts", "label": "Интресные факты", "isMultilines": true, "isAdditionList": true }, { "id": "statisticFacts", "label": "Статистические факты", "isMultilines": true, "isAdditionList": true }, { "id": "similarSpecies", "label": "Схожести видов", "isMultilines": true, "isAdditionList": true }] };
const fieldsDescription = {
  blockImages,
  blockNames,
  blockFacts
};
const FieldBlockControls = ({
  id,
  label,
  isMultilines,
  isAdditionList,
  defaultValue = "",
  specInputDynamicProps,
  // зависит от других полей
  addList
}) => {
  const [text, setText] = useState(defaultValue);
  const addItemHandler = () => {
    if (!text.trim()) return;
    addList?.(text);
    setText("");
  };
  return (
    // TODO: ограничить ширину контейнеру
    /* @__PURE__ */ jsx("div", { className: "addition-list-controls", children: /* @__PURE__ */ jsxs(Grid, { container: true, spacing: isAdditionList ? 0.5 : 0, children: [
      /* @__PURE__ */ jsx(Grid, { size: "grow", children: /* @__PURE__ */ jsx(
        ControlsTextField,
        {
          id,
          label,
          value: text,
          isAdditionList,
          isMultilines,
          specInputDynamicProps,
          onChange: setText,
          addItemHandler
        }
      ) }),
      isAdditionList && /* @__PURE__ */ jsx(Grid, { size: "auto", direction: "row", sx: { display: "flex", alignItems: "center", pt: 1, pb: 0.5 }, children: /* @__PURE__ */ jsx(
        Button,
        {
          id: `${id}Btn`,
          name: "action",
          value: "delete",
          size: "small",
          variant: "outlined",
          color: "secondary",
          onClick: addItemHandler,
          sx: { height: "100%", minWidth: "fit-content" },
          children: /* @__PURE__ */ jsx(Add, { color: "secondary", fontSize: "medium" })
        }
      ) })
    ] }) })
  );
};
const btnBaseStyles = {
  px: 0.75,
  minWidth: "min-content !important"
};
const FieldListItem = ({
  id,
  isMultilines,
  printedText,
  onDelete,
  onEdit
}) => {
  const editFieldRef = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [text, setText] = useState(printedText);
  const handleEvent = "blur";
  const showIsNotValid = () => {
    if (!editFieldRef.current?.checkValidity()) {
      editFieldRef.current?.reportValidity();
    }
  };
  const toEditHandler = () => {
    editFieldRef.current?.addEventListener(handleEvent, showIsNotValid);
    setIsEditMode(true);
  };
  const saveEditedHandler = () => {
    editFieldRef.current?.removeEventListener(handleEvent, showIsNotValid);
    if (editFieldRef.current?.value) {
      setText(editFieldRef.current?.value);
      onEdit(editFieldRef.current?.value);
    } else console.log("Ошибка получения текста поля ввода", editFieldRef.current);
    editFieldRef.current?.setCustomValidity("");
    setIsEditMode(false);
  };
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(ListItem, { alignItems: "flex-start", dense: true, disableGutters: true, children: [
    isEditMode ? (
      // TODO:  вот вроде форма значение отсюда не берет, 
      //        но ошибку если такое поле открыто выдаёт
      /* @__PURE__ */ jsx(
        TextField,
        {
          inputRef: editFieldRef,
          defaultValue: text,
          size: "small",
          ...{
            multiline: isMultilines,
            minRows: isMultilines ? 5 : 1
          }
        }
      )
    ) : /* @__PURE__ */ jsx(ListItemText, { sx: { wordBreak: "break-word" }, children: text }),
    /* @__PURE__ */ jsxs(ButtonGroup, { variant: "outlined", color: "secondary", size: "small", orientation: "horizontal", sx: { ml: 1 }, children: [
      isEditMode ? (
        // TODO: add Icon, Loadre on saveClk
        /* @__PURE__ */ jsx(Button, { name: "action", value: "save", onClick: saveEditedHandler, sx: btnBaseStyles, children: /* @__PURE__ */ jsx(Save, { fontSize: "small" }) })
      ) : /* @__PURE__ */ jsx(Button, { name: "action", value: "edit", onClick: toEditHandler, sx: btnBaseStyles, children: /* @__PURE__ */ jsx(Edit, { fontSize: "small" }) }),
      /* @__PURE__ */ jsx(Button, { name: "action", value: "delete", onClick: onDelete, sx: btnBaseStyles, children: /* @__PURE__ */ jsx(Delete, { fontSize: "small" }) })
    ] })
  ] }) }, id);
};
const FieldBlock = ({
  blockId,
  // TODO: почему запись «{ block: {...} }» не то же что запись { {...} } ?
  block
}) => {
  const { id, isAdditionList, isMultilines } = block;
  const [field] = useField(id);
  if (!isAdditionList) {
    return (
      // TODO: сравненить практики spread или явное указание полей
      /* @__PURE__ */ jsx(FieldBlockControls, { ...block })
    );
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(FieldArray, { name: id, children: ({ remove, replace, push }) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { children: [
      blockId === "blockImages" && /* @__PURE__ */ jsx(
        FormikTextField,
        {
          name: "photoFiles",
          type: "file",
          size: "small",
          margin: "dense",
          slotProps: { htmlInput: { multiple: true } }
        }
      ),
      /* @__PURE__ */ jsx(
        FieldBlockControls,
        {
          ...block,
          addList: push
        }
      )
    ] }),
    Array.isArray(field.value) && !!field.value.length && /* @__PURE__ */ jsx(List$1, { dense: true, sx: { pl: 1.5 }, children: field.value.map((text, index) => (
      // TODO: проверить как правильно задавать key компоненту
      /* @__PURE__ */ jsx(
        FieldListItem,
        {
          id: `${id}.${index}`,
          printedText: text,
          isMultilines,
          onDelete: () => remove(index),
          onEdit: (value) => replace(index, value)
        },
        `${id}.${index}`
      )
    )) })
  ] }) }) });
};
const FieldBlockWrapper = ({ title, children }) => /* @__PURE__ */ jsx(
  Paper,
  {
    elevation: 3,
    square: false,
    variant: "elevation",
    sx: { py: 2, px: 3, backgroundColor: "#fff0d9" },
    children: /* @__PURE__ */ jsxs(
      Stack,
      {
        component: "fieldset",
        spacing: 1,
        children: [
          /* @__PURE__ */ jsx(Typography, { variant: "h6", component: "legend", children: title }),
          children
        ]
      }
    )
  }
);
const defaultBirdData = {
  photoUrls: ["https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Lophophanes_cristatus_-_01.jpg/500px-Lophophanes_cristatus_-_01.jpg"],
  photoFiles: void 0,
  nameLatin: "Lophophanes cristatus",
  nameMain: "Хохлатая синица",
  nameAlternatives: ["Гренадерка", "Гренадёр"],
  nameEtymologies: ["Своё название — гренадер — получила благодаря хорошо заметному коническому хохолку, похожему на шапки гренадеров — элитных пехотинцев XVII—XVIII веков."],
  interestFacts: [],
  statisticFacts: ["В полевых условиях самцы и самки практически не отличимы."],
  similarSpecies: ["Более других видов синиц склонна к оседлому образу жизни."]
};
const emptyBirdData = {
  photoUrls: [],
  photoFiles: void 0,
  nameMain: "",
  nameLatin: "",
  // TODO: для default подволить undefined, но не для отправки
  nameAlternatives: [],
  nameEtymologies: [],
  interestFacts: [],
  statisticFacts: [],
  similarSpecies: []
};
const FormBirdAdd = () => {
  return (
    // TODO: цветовое оформление деталей формы полей — может задать юзер по палитре с картинки
    /* @__PURE__ */ jsx(
      Formik,
      {
        initialValues: defaultBirdData,
        onSubmit: (values, { resetForm }) => {
          console.log(values);
          resetForm({ values: emptyBirdData });
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
        children: ({ submitForm }) => /* @__PURE__ */ jsxs(Form, { style: { width: 400, display: "flex", flexDirection: "column", gap: 24 }, children: [
          /* @__PURE__ */ jsx(Typography, { variant: "h5", align: "center", children: "Внесите данные о птице" }),
          /* @__PURE__ */ jsx(Stack, { direction: "column", spacing: 2, children: Object.entries(fieldsDescription).map(([blockId, value]) => /* @__PURE__ */ jsx(FieldBlockWrapper, { title: value.name, children: value.blocks.map(
            ({ id, ...block }) => (
              // TODO: обдумать совместимость key и id
              /* @__PURE__ */ jsx("div", { className: "field-block", id, children: /* @__PURE__ */ jsx(
                FieldBlock,
                {
                  blockId,
                  block: { ...block, id }
                }
              ) }, `field-block-${id}`)
            )
          ) }, blockId)) }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "contained",
              color: "secondary",
              size: "large",
              onClick: submitForm,
              children: "Submit"
            }
          )
        ] })
      }
    )
  );
};
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FormBirdAddPage: FormBirdAdd,
  default: FormBirdAdd
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-D5_KRo1n.js", "imports": ["/assets/index-SsZjtT7H.js", "/assets/index-GVKTJkF0.js", "/assets/chunk-UVKPFVEO-D_FFbU77.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": true, "module": "/assets/root-BkmFP2Os.js", "imports": ["/assets/index-SsZjtT7H.js", "/assets/index-GVKTJkF0.js", "/assets/chunk-UVKPFVEO-D_FFbU77.js"], "css": ["/assets/root-BtOyvCY7.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "../features/home/index": { "id": "../features/home/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/index-CzsKaR4f.js", "imports": ["/assets/index-SsZjtT7H.js", "/assets/chunk-UVKPFVEO-D_FFbU77.js", "/assets/DailyMatchScore-DQCE-EbU.js", "/assets/Stack-6_BO95Pv.js", "/assets/CardContent-CK947RBv.js", "/assets/useSlot-D6pTEqf9.js", "/assets/dailyScore-WQ5MdRjC.js", "/assets/Paper-C8Yr1ujP.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "../features/species-names/index": { "id": "../features/species-names/index", "parentId": "root", "path": "names", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/index-i_LmBKtR.js", "imports": ["/assets/index-SsZjtT7H.js", "/assets/Select-DgXTKUEN.js", "/assets/Stack-6_BO95Pv.js", "/assets/useControlled-CwecQBP9.js", "/assets/Button-CcWrjX9Q.js", "/assets/FormControlLabel-BDI4qWV8.js", "/assets/createSvgIcon-D4dY6xu5.js", "/assets/useSlot-D6pTEqf9.js", "/assets/Modal-D7aPzs_h.js", "/assets/CardHeader-BiqHs-du.js", "/assets/ListItemText-BtRox8jz.js", "/assets/Tooltip-BlOIqGQ8.js", "/assets/Chip-DgiltOLT.js", "/assets/react-highlight-words-CMlTk2gB.js", "/assets/index-Co4cihWN.js", "/assets/Grid-Dofdvh-D.js", "/assets/CardContent-CK947RBv.js", "/assets/BackHomeLink-Bb2zv_i8.js", "/assets/Grow-D3f1y7-E.js", "/assets/isMuiElement-DGGcJ9HQ.js", "/assets/Paper-C8Yr1ujP.js", "/assets/index-GVKTJkF0.js", "/assets/Transition-DPy5W-xV.js", "/assets/chunk-UVKPFVEO-D_FFbU77.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "../features/family-links/index": { "id": "../features/family-links/index", "parentId": "root", "path": "links", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/index-BNK4T4e2.js", "imports": ["/assets/index-D4MQgpyw.js", "/assets/preload-helper-BXl3LOEh.js", "/assets/index-SsZjtT7H.js", "/assets/BackHomeLink-Bb2zv_i8.js", "/assets/createSvgIcon-D4dY6xu5.js", "/assets/Stack-6_BO95Pv.js", "/assets/chunk-UVKPFVEO-D_FFbU77.js", "/assets/Button-CcWrjX9Q.js", "/assets/index-Co4cihWN.js", "/assets/getValidReactChildren-DtrEFMSm.js"], "css": ["/assets/index-g-b2zoIQ.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "../features/fillword/layout": { "id": "../features/fillword/layout", "parentId": "root", "path": "fillword", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/layout-DjzdDBvr.js", "imports": ["/assets/index-SsZjtT7H.js", "/assets/chunk-UVKPFVEO-D_FFbU77.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "../features/fillword/index": { "id": "../features/fillword/index", "parentId": "../features/fillword/layout", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/index-H7QItkZS.js", "imports": ["/assets/index-O6Ldhf_w.js", "/assets/preload-helper-BXl3LOEh.js", "/assets/index-SsZjtT7H.js", "/assets/chunk-UVKPFVEO-D_FFbU77.js", "/assets/BackHomeLink-Bb2zv_i8.js", "/assets/createSvgIcon-D4dY6xu5.js", "/assets/Stack-6_BO95Pv.js", "/assets/Button-CcWrjX9Q.js", "/assets/fillword-1Q_lSp0u.js", "/assets/Chip-DgiltOLT.js", "/assets/useSlot-D6pTEqf9.js"], "css": ["/assets/fillword-B4tOLlre.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "../features/fillword/play": { "id": "../features/fillword/play", "parentId": "../features/fillword/layout", "path": ":topicId", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/play-0bEeWEgS.js", "imports": ["/assets/preload-helper-BXl3LOEh.js", "/assets/index-SsZjtT7H.js", "/assets/chunk-UVKPFVEO-D_FFbU77.js", "/assets/fillword-1Q_lSp0u.js", "/assets/Stack-6_BO95Pv.js", "/assets/Button-CcWrjX9Q.js"], "css": ["/assets/fillword-B4tOLlre.css#"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "../features/match-quiz/layout": { "id": "../features/match-quiz/layout", "parentId": "root", "path": "match", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/layout-Cs0uPOa2.js", "imports": ["/assets/index-SsZjtT7H.js", "/assets/chunk-UVKPFVEO-D_FFbU77.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "../features/match-quiz/topics": { "id": "../features/match-quiz/topics", "parentId": "../features/match-quiz/layout", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/topics-DAd851qP.js", "imports": ["/assets/index-SsZjtT7H.js", "/assets/chunk-UVKPFVEO-D_FFbU77.js", "/assets/BackHomeLink-Bb2zv_i8.js", "/assets/matchQuiz-wjaIkMLf.js", "/assets/DailyMatchScore-DQCE-EbU.js", "/assets/Stack-6_BO95Pv.js", "/assets/CardContent-CK947RBv.js", "/assets/createSvgIcon-D4dY6xu5.js", "/assets/Button-CcWrjX9Q.js", "/assets/useSlot-D6pTEqf9.js", "/assets/dailyScore-WQ5MdRjC.js", "/assets/Paper-C8Yr1ujP.js"], "css": ["/assets/matchQuiz-CjLKzbKL.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "../features/match-quiz/index": { "id": "../features/match-quiz/index", "parentId": "../features/match-quiz/layout", "path": ":levelId", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/index-Bdi5Gewt.js", "imports": ["/assets/preload-helper-BXl3LOEh.js", "/assets/index-SsZjtT7H.js", "/assets/createSvgIcon-D4dY6xu5.js", "/assets/chunk-UVKPFVEO-D_FFbU77.js", "/assets/matchQuiz-wjaIkMLf.js", "/assets/dailyScore-WQ5MdRjC.js", "/assets/Stack-6_BO95Pv.js", "/assets/useSlot-D6pTEqf9.js", "/assets/Modal-D7aPzs_h.js", "/assets/Paper-C8Yr1ujP.js", "/assets/Button-CcWrjX9Q.js", "/assets/IconButton-MzkK90QX.js", "/assets/index-GVKTJkF0.js", "/assets/Transition-DPy5W-xV.js"], "css": ["/assets/matchQuiz-CjLKzbKL.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "../features/counter/index": { "id": "../features/counter/index", "parentId": "root", "path": "counter", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/index-AQaLMfQa.js", "imports": ["/assets/index-SsZjtT7H.js", "/assets/BackHomeLink-Bb2zv_i8.js", "/assets/CardContent-CK947RBv.js", "/assets/CardHeader-BiqHs-du.js", "/assets/Stack-6_BO95Pv.js", "/assets/useSlot-D6pTEqf9.js", "/assets/useControlled-CwecQBP9.js", "/assets/Transition-DPy5W-xV.js", "/assets/Paper-C8Yr1ujP.js", "/assets/createSvgIcon-D4dY6xu5.js", "/assets/Button-CcWrjX9Q.js", "/assets/Grid-Dofdvh-D.js", "/assets/ButtonGroup-DGXb4DjK.js", "/assets/chunk-UVKPFVEO-D_FFbU77.js", "/assets/isMuiElement-DGGcJ9HQ.js", "/assets/getValidReactChildren-DtrEFMSm.js"], "css": ["/assets/index-DuWe8i1V.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "../features/add-bird/index": { "id": "../features/add-bird/index", "parentId": "root", "path": "add-bird", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/index-CWdKaEc3.js", "imports": ["/assets/index-SsZjtT7H.js", "/assets/Stack-6_BO95Pv.js", "/assets/TextField-5-cW6TJv.js", "/assets/IconButton-MzkK90QX.js", "/assets/createSvgIcon-D4dY6xu5.js", "/assets/Grid-Dofdvh-D.js", "/assets/Button-CcWrjX9Q.js", "/assets/ListItemText-BtRox8jz.js", "/assets/ButtonGroup-DGXb4DjK.js", "/assets/Select-DgXTKUEN.js", "/assets/Paper-C8Yr1ujP.js", "/assets/useSlot-D6pTEqf9.js", "/assets/isMuiElement-DGGcJ9HQ.js", "/assets/getValidReactChildren-DtrEFMSm.js", "/assets/Grow-D3f1y7-E.js", "/assets/Transition-DPy5W-xV.js", "/assets/Modal-D7aPzs_h.js", "/assets/index-GVKTJkF0.js", "/assets/useControlled-CwecQBP9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-576f6b93.js", "version": "576f6b93", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_passThroughRequests": false, "unstable_subResourceIntegrity": false, "unstable_trailingSlashAwareDataRequests": false, "unstable_previewServerPrerendering": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "../features/home/index": {
    id: "../features/home/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "../features/species-names/index": {
    id: "../features/species-names/index",
    parentId: "root",
    path: "names",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "../features/family-links/index": {
    id: "../features/family-links/index",
    parentId: "root",
    path: "links",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "../features/fillword/layout": {
    id: "../features/fillword/layout",
    parentId: "root",
    path: "fillword",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "../features/fillword/index": {
    id: "../features/fillword/index",
    parentId: "../features/fillword/layout",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route5
  },
  "../features/fillword/play": {
    id: "../features/fillword/play",
    parentId: "../features/fillword/layout",
    path: ":topicId",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "../features/match-quiz/layout": {
    id: "../features/match-quiz/layout",
    parentId: "root",
    path: "match",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "../features/match-quiz/topics": {
    id: "../features/match-quiz/topics",
    parentId: "../features/match-quiz/layout",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route8
  },
  "../features/match-quiz/index": {
    id: "../features/match-quiz/index",
    parentId: "../features/match-quiz/layout",
    path: ":levelId",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "../features/counter/index": {
    id: "../features/counter/index",
    parentId: "root",
    path: "counter",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "../features/add-bird/index": {
    id: "../features/add-bird/index",
    parentId: "root",
    path: "add-bird",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  }
};
const allowedActionOrigins = false;
export {
  Button as B,
  Checkbox as C,
  DEFAULT_GRID_CONFIG as D,
  FormControlLabel as F,
  IconButton as I,
  Paper as P,
  Stack as S,
  ToggleButtonGroup as T,
  ToggleButton as a,
  useSlot as b,
  createSvgIcon as c,
  createSimplePaletteValueFilter as d,
  Typography as e,
  TextField as f,
  groupEntriesByLetter as g,
  Tooltip as h,
  Box as i,
  allowedActionOrigins as j,
  serverManifest as k,
  assetsBuildDirectory as l,
  memoTheme as m,
  basename as n,
  entry as o,
  future as p,
  isSpaMode as q,
  prerender as r,
  styled as s,
  topicToJson as t,
  useDefaultProps as u,
  publicPath as v,
  routeDiscovery as w,
  routes as x,
  ssr as y
};
