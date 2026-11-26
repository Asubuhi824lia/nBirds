import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import React__default, { useState, useRef, useMemo } from "react";
import { ExpandMore } from "@mui/icons-material";
import PropTypes from "prop-types";
import clsx from "clsx";
import chainPropTypes from "@mui/utils/chainPropTypes";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClasses from "@mui/utils/generateUtilityClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { useDefaultProps as useDefaultProps$1 } from "@mui/system/DefaultPropsProvider";
import createStyled from "@mui/system/createStyled";
import _formatErrorMessage from "@mui/utils/formatMuiErrorMessage";
import deepmerge, { isPlainObject } from "@mui/utils/deepmerge";
import { getContrastRatio, lighten, darken, alpha, private_safeDarken, private_safeLighten, private_safeAlpha, private_safeEmphasize, private_safeColorChannel, hslToRgb } from "@mui/system/colorManipulator";
import { createSpacing, unstable_createGetCssVar, useTheme as useTheme$1, unstable_memoTheme, css, keyframes, createStack } from "@mui/system";
import { createUnarySpacing } from "@mui/system/spacing";
import { prepareTypographyVars, prepareCssVars, createGetColorSchemeSelector } from "@mui/system/cssVars";
import styleFunctionSx, { unstable_defaultSxConfig } from "@mui/system/styleFunctionSx";
import systemCreateTheme from "@mui/system/createTheme";
import integerPropType from "@mui/utils/integerPropType";
import useForkRef from "@mui/utils/useForkRef";
import appendOwnerState from "@mui/utils/appendOwnerState";
import resolveComponentProps from "@mui/utils/resolveComponentProps";
import mergeSlotProps from "@mui/utils/mergeSlotProps";
import capitalize from "@mui/utils/capitalize";
import { isFragment } from "react-is";
import useControlled from "@mui/utils/useControlled";
import elementTypeAcceptingRef from "@mui/utils/elementTypeAcceptingRef";
import useEnhancedEffect from "@mui/utils/useEnhancedEffect";
import useValueAsRef from "@mui/utils/useValueAsRef";
import refType from "@mui/utils/refType";
import isFocusVisible from "@mui/utils/isFocusVisible";
import useEventCallback from "@mui/utils/useEventCallback";
import useOnMount from "@mui/utils/useOnMount";
import useTimeout from "@mui/utils/useTimeout";
import useLazyRef from "@mui/utils/useLazyRef";
import resolveProps from "@mui/utils/resolveProps";
import useId from "@mui/utils/useId";
import { createGrid } from "@mui/system/Grid";
import requirePropFactory from "@mui/utils/requirePropFactory";
import getValidReactChildren from "@mui/utils/getValidReactChildren";
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
  return /* @__PURE__ */ jsx(Outlet, {});
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
function round(value) {
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
      letterSpacing: `${round(letterSpacing / size)}em`
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
      const colors = palette[color];
      if (color !== "tonalOffset" && !nativeColor && colors && typeof colors === "object") {
        if (colors.main) {
          setColor(palette[color], "mainChannel", private_safeColorChannel(toRgb(colors.main)));
        }
        if (colors.light) {
          setColor(palette[color], "lightChannel", private_safeColorChannel(toRgb(colors.light)));
        }
        if (colors.dark) {
          setColor(palette[color], "darkChannel", private_safeColorChannel(toRgb(colors.dark)));
        }
        if (colors.contrastText) {
          setColor(palette[color], "contrastTextChannel", private_safeColorChannel(toRgb(colors.contrastText)));
        }
        if (color === "text") {
          setColorChannel(palette[color], "primary");
          setColorChannel(palette[color], "secondary");
        }
        if (color === "action") {
          if (colors.active) {
            setColorChannel(palette[color], "active");
          }
          if (colors.selected) {
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
const defaultTheme = createTheme();
function useTheme() {
  const theme = useTheme$1(defaultTheme);
  if (process.env.NODE_ENV !== "production") {
    React.useDebugValue(theme);
  }
  return theme[THEME_ID] || theme;
}
function slotShouldForwardProp(prop) {
  return prop !== "ownerState" && prop !== "theme" && prop !== "sx" && prop !== "as";
}
const rootShouldForwardProp = (prop) => slotShouldForwardProp(prop) && prop !== "classes";
const styled = createStyled({
  themeId: THEME_ID,
  defaultTheme,
  rootShouldForwardProp
});
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
const defaultStyles = {
  transition: "none"
};
function resolveReducedMotionStyles(reducedMotion, styles) {
  if (reducedMotion === "always") {
    return styles;
  }
  if (reducedMotion === "system") {
    return {
      "@media (prefers-reduced-motion: reduce)": styles
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
function getReducedMotionStyles(theme, styles) {
  const resolvedStyles = styles ?? defaultStyles;
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
function getSvgIconUtilityClass(slot) {
  return generateUtilityClass("MuiSvgIcon", slot);
}
generateUtilityClasses("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const useUtilityClasses$e = (ownerState) => {
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
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.color !== "inherit" && styles[`color${capitalize(ownerState.color)}`], styles[`fontSize${capitalize(ownerState.fontSize)}`]];
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
  const classes = useUtilityClasses$e(ownerState);
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
  } = mergeSlotProps({
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
const useUtilityClasses$d = (ownerState) => {
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
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.orientation], ownerState.state === "entered" && styles.entered, ownerState.state === "exited" && !ownerState.in && ownerState.collapsedSize === "0px" && styles.hidden];
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
  const classes = useUtilityClasses$d(ownerState);
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
const useUtilityClasses$c = (ownerState) => {
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
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant], !ownerState.square && styles.rounded, ownerState.variant === "elevation" && styles[`elevation${ownerState.elevation}`]];
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
  const classes = useUtilityClasses$c(ownerState);
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
const useUtilityClasses$b = (ownerState) => {
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
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${accordionClasses.region}`]: styles.region
    }, styles.root, !ownerState.square && styles.rounded, !ownerState.disableGutters && styles.gutters];
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
  const classes = useUtilityClasses$b(ownerState);
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
const useUtilityClasses$a = (ownerState) => {
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
  const classes = useUtilityClasses$a(ownerState);
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
  const styles = css`
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
        ${styles}
      }
    `;
  }
  return styles;
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
const useUtilityClasses$9 = (ownerState) => {
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
  const classes = useUtilityClasses$9(ownerState);
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
const useUtilityClasses$8 = (ownerState) => {
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
  const classes = useUtilityClasses$8(ownerState);
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
const useUtilityClasses$7 = (ownerState) => {
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
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant], styles[`color${capitalize(ownerState.color)}`]];
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
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.circle, ownerState.disableShrink && styles.circleDisableShrink];
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
  const classes = useUtilityClasses$7(ownerState);
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
function getTypographyUtilityClass(slot) {
  return generateUtilityClass("MuiTypography", slot);
}
const typographyClasses = generateUtilityClasses("MuiTypography", ["root", "h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "inherit", "button", "caption", "overline", "alignLeft", "alignRight", "alignCenter", "alignJustify", "noWrap", "gutterBottom"]);
const useUtilityClasses$6 = (ownerState) => {
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
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.variant && styles[ownerState.variant], ownerState.align !== "inherit" && styles[`align${capitalize(ownerState.align)}`], ownerState.noWrap && styles.noWrap, ownerState.gutterBottom && styles.gutterBottom];
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
  const classes = useUtilityClasses$6(ownerState);
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
const Person = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
}), "Person");
function getAvatarUtilityClass(slot) {
  return generateUtilityClass("MuiAvatar", slot);
}
generateUtilityClasses("MuiAvatar", ["root", "colorDefault", "circular", "rounded", "square", "img", "fallback"]);
const useUtilityClasses$5 = (ownerState) => {
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
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant], ownerState.colorDefault && styles.colorDefault];
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
  const classes = useUtilityClasses$5(ownerState);
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
const useUtilityClasses$4 = (ownerState) => {
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
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant], styles[`size${capitalize(ownerState.size)}`], ownerState.color === "inherit" && styles.colorInherit, ownerState.disableElevation && styles.disableElevation, ownerState.fullWidth && styles.fullWidth, ownerState.loading && styles.loading];
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
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.startIcon, ownerState.loading && styles.startIconLoadingStart];
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
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.endIcon, ownerState.loading && styles.endIconLoadingEnd];
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
  const classes = useUtilityClasses$4(ownerState);
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
const overridesResolver = (props, styles) => {
  const {
    ownerState
  } = props;
  return [{
    [`& .${buttonGroupClasses.grouped}`]: styles.grouped
  }, {
    [`& .${buttonGroupClasses.firstButton}`]: styles.firstButton
  }, {
    [`& .${buttonGroupClasses.lastButton}`]: styles.lastButton
  }, {
    [`& .${buttonGroupClasses.middleButton}`]: styles.middleButton
  }, styles.root, styles[ownerState.variant], ownerState.disableElevation === true && styles.disableElevation, ownerState.fullWidth && styles.fullWidth, ownerState.orientation === "vertical" && styles.vertical];
};
const useUtilityClasses$3 = (ownerState) => {
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
  overridesResolver
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
  const classes = useUtilityClasses$3(ownerState);
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
const useUtilityClasses$2 = (ownerState) => {
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
  const classes = useUtilityClasses$2(ownerState);
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
function getCardContentUtilityClass(slot) {
  return generateUtilityClass("MuiCardContent", slot);
}
generateUtilityClasses("MuiCardContent", ["root"]);
const useUtilityClasses$1 = (ownerState) => {
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
  const classes = useUtilityClasses$1(ownerState);
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
const useUtilityClasses = (ownerState) => {
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
  overridesResolver: (props, styles) => {
    return [{
      [`& .${cardHeaderClasses.title}`]: styles.title
    }, {
      [`& .${cardHeaderClasses.subheader}`]: styles.subheader
    }, styles.root];
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
  const classes = useUtilityClasses(ownerState);
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
const Grid = createGrid({
  createStyledComponent: styled("div", {
    name: "MuiGrid",
    slot: "Root",
    overridesResolver: (props, styles) => {
      const {
        ownerState
      } = props;
      return [styles.root, ownerState.container && styles.container];
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
    name: "Иреновые",
    latin_name: "Irenidae",
    species_length: 3,
    genera: [],
    genera_length: 0
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
  return /* @__PURE__ */ jsxs("section", { style: { display: "flex", gap: 24, justifyContent: "center", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsx("header", { style: { display: "flex", justifyContent: "center", padding: 16, backgroundColor: "lightseagreen" }, children: /* @__PURE__ */ jsxs(Typography, { variant: "h5", component: "h1", children: [
      "Отряд: ",
      order.name || order.latin_name
    ] }) }),
    /* @__PURE__ */ jsxs("main", { style: { display: "flex", justifyContent: "center" }, children: [
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
    ] })
  ] });
};
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsx("section", {
    style: {
      display: "flex",
      justifyContent: "center"
    },
    children: /* @__PURE__ */ jsx(CounterSpecies, {})
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BQ9HIpUr.js", "imports": ["/assets/chunk-UVKPFVEO--JkDpA4u.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": true, "module": "/assets/root-HZFNrsS8.js", "imports": ["/assets/chunk-UVKPFVEO--JkDpA4u.js"], "css": ["/assets/root-B5hXl-t3.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasDefaultExport": true, "hasErrorBoundary": false, "module": "/assets/home-BT6i8_KN.js", "imports": ["/assets/chunk-UVKPFVEO--JkDpA4u.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-1b2339cf.js", "version": "1b2339cf", "sri": void 0 };
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
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
const allowedActionOrigins = false;
export {
  allowedActionOrigins,
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
