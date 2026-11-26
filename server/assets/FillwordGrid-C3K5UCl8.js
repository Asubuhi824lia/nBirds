import { jsx } from "react/jsx-runtime";
import { useState, useRef, useCallback, useEffect } from "react";
import { D as DEFAULT_GRID_CONFIG } from "./server-build-CgFVFTsc.js";
var Direction;
(function(Direction2) {
  Direction2["Horizontal"] = "Horizontal";
  Direction2["Vertical"] = "Vertical";
  Direction2["Diagonal"] = "Diagonal";
  Direction2["HorizontalReverse"] = "HorizontalReverse";
  Direction2["VerticalReverse"] = "VerticalReverse";
  Direction2["DiagonalReverse"] = "DiagonalReverse";
})(Direction || (Direction = {}));
var __assign$1 = function() {
  __assign$1 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign$1.apply(this, arguments);
};
var __spreadArray = function(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var getRandomLetter = function() {
  return ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
};
var getDirections = function(config) {
  var horizontal = [
    { type: Direction.Horizontal, delta: [0, 1] }
  ];
  var vertical = [
    { type: Direction.Vertical, delta: [1, 0] }
  ];
  var diagonal = [
    { type: Direction.Diagonal, delta: [1, 1] },
    { type: Direction.Diagonal, delta: [1, -1] }
    // Down-Left
  ];
  if (config.allowReverse) {
    horizontal.push({ type: Direction.HorizontalReverse, delta: [0, -1] });
    vertical.push({ type: Direction.VerticalReverse, delta: [-1, 0] });
    diagonal.push({ type: Direction.DiagonalReverse, delta: [-1, -1] });
    diagonal.push({ type: Direction.DiagonalReverse, delta: [-1, 1] });
  }
  var allDirections = __spreadArray(__spreadArray([], horizontal, true), vertical, true);
  if (config.allowDiagonal) {
    allDirections.push.apply(allDirections, diagonal);
  }
  return allDirections;
};
var selectDirection = function(directions, config) {
  if (!config.allowDiagonal) {
    return directions[Math.floor(Math.random() * directions.length)];
  }
  var horizontal = directions.filter(function(d) {
    return d.delta[0] === 0;
  });
  var vertical = directions.filter(function(d) {
    return d.delta[1] === 0;
  });
  var diagonal = directions.filter(function(d) {
    return d.delta[0] !== 0 && d.delta[1] !== 0;
  });
  var orientations = [horizontal, vertical, diagonal].filter(function(g) {
    return g.length > 0;
  });
  var selectedOrientation = orientations[Math.floor(Math.random() * orientations.length)];
  return selectedOrientation[Math.floor(Math.random() * selectedOrientation.length)];
};
var generateGrid = function(words, config) {
  var rows = config.rows, cols = config.cols;
  var grid = Array(rows).fill(null).map(function() {
    return Array(cols).fill("");
  });
  var placedWords = [];
  var sortedWords = __spreadArray([], words, true).sort(function(a, b) {
    return b.length - a.length;
  }).map(function(w) {
    return w.toUpperCase();
  });
  var _loop_1 = function(word2) {
    var placed = false;
    var attempts = 0;
    var maxAttempts = 100;
    var directions = getDirections(config);
    while (!placed && attempts < maxAttempts) {
      attempts++;
      var dir = selectDirection(directions, config);
      var _a = dir.delta, dRow = _a[0], dCol = _a[1];
      var startRow = Math.floor(Math.random() * rows);
      var startCol = Math.floor(Math.random() * cols);
      var endRow = startRow + dRow * (word2.length - 1);
      var endCol = startCol + dCol * (word2.length - 1);
      if (endRow < 0 || endRow >= rows || endCol < 0 || endCol >= cols) {
        continue;
      }
      var collision = false;
      var path = [];
      for (var i = 0; i < word2.length; i++) {
        var r2 = startRow + dRow * i;
        var c2 = startCol + dCol * i;
        var existingChar = grid[r2][c2];
        if (existingChar !== "" && existingChar !== word2[i]) {
          collision = true;
          break;
        }
        path.push({ row: r2, col: c2 });
      }
      if (!collision) {
        path.forEach(function(coord, index) {
          grid[coord.row][coord.col] = word2[index];
        });
        placedWords.push({
          word: word2,
          path,
          found: false
        });
        placed = true;
      }
    }
  };
  for (var _i = 0, sortedWords_1 = sortedWords; _i < sortedWords_1.length; _i++) {
    var word = sortedWords_1[_i];
    _loop_1(word);
  }
  if (config.fillBlanks) {
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        if (grid[r][c] === "") {
          grid[r][c] = getRandomLetter();
        }
      }
    }
  }
  return { grid, placedWords };
};
var getPath = function(start, end) {
  var path = [];
  var dRow = end.row - start.row;
  var dCol = end.col - start.col;
  var steps = Math.max(Math.abs(dRow), Math.abs(dCol));
  if (steps === 0)
    return [__assign$1({}, start)];
  var isHorizontal = dRow === 0;
  var isVertical = dCol === 0;
  var isDiagonal = Math.abs(dRow) === Math.abs(dCol);
  if (!isHorizontal && !isVertical && !isDiagonal) {
    return [];
  }
  var rStep = dRow / steps;
  var cStep = dCol / steps;
  for (var i = 0; i <= steps; i++) {
    path.push({
      row: start.row + rStep * i,
      col: start.col + cStep * i
    });
  }
  return path;
};
var WordSearchGrid = function(_a) {
  var _b;
  var grid = _a.grid, placedWords = _a.placedWords, onWordFound = _a.onWordFound, _c = _a.classNames, classNames = _c === void 0 ? {} : _c;
  var _d = useState(null), selectionStart = _d[0], setSelectionStart = _d[1];
  var _e = useState(null), selectionEnd = _e[0], setSelectionEnd = _e[1];
  var _f = useState([]), validPath = _f[0], setValidPath = _f[1];
  var gridRef = useRef(null);
  var isCoordInPath = function(r, c, path) {
    return path.some(function(p) {
      return p.row === r && p.col === c;
    });
  };
  var getCellClass = function(r, c, letter) {
    var baseClass = classNames.cell || "";
    if (letter === "")
      return baseClass;
    if (isCoordInPath(r, c, validPath)) {
      return "".concat(baseClass, " ").concat(classNames.cellSelected || "");
    }
    var foundWordsContainingCell = placedWords.filter(function(pw) {
      return pw.found && isCoordInPath(r, c, pw.path);
    });
    if (foundWordsContainingCell.length > 0) {
      return "".concat(baseClass, " ").concat(classNames.cellFound || "");
    }
    return baseClass;
  };
  var handleStart = function(r, c) {
    if (grid[r][c] === "")
      return;
    setSelectionStart({ row: r, col: c });
    setSelectionEnd({ row: r, col: c });
    setValidPath([{ row: r, col: c }]);
  };
  var handleMove = useCallback(function(r, c) {
    if (!selectionStart)
      return;
    if (grid[r][c] === "")
      return;
    if (selectionEnd && selectionEnd.row === r && selectionEnd.col === c)
      return;
    var newEnd = { row: r, col: c };
    setSelectionEnd(newEnd);
    var path = getPath(selectionStart, newEnd);
    setValidPath(path);
  }, [selectionStart, selectionEnd, grid]);
  var handleEnd = useCallback(function() {
    if (selectionStart && validPath.length > 0) {
      placedWords.forEach(function(pw) {
        if (pw.found)
          return;
        if (pw.path.length !== validPath.length)
          return;
        var forwardMatch = pw.path.every(function(coord, idx) {
          return coord.row === validPath[idx].row && coord.col === validPath[idx].col;
        });
        var reverseMatch = pw.path.every(function(coord, idx) {
          return coord.row === validPath[validPath.length - 1 - idx].row && coord.col === validPath[validPath.length - 1 - idx].col;
        });
        if (forwardMatch || reverseMatch) {
          onWordFound(pw.word);
        }
      });
    }
    setSelectionStart(null);
    setSelectionEnd(null);
    setValidPath([]);
  }, [selectionStart, validPath, placedWords, onWordFound]);
  useEffect(function() {
    var handleGlobalMouseUp = function() {
      if (selectionStart)
        handleEnd();
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return function() {
      return window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [selectionStart, handleEnd]);
  var handleTouchMove = function(e) {
    if (selectionStart)
      e.preventDefault();
    var touch = e.touches[0];
    var element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element) {
      var row = element.getAttribute("data-row");
      var col = element.getAttribute("data-col");
      if (row !== null && col !== null) {
        handleMove(parseInt(row), parseInt(col));
      }
    }
  };
  var numCols = ((_b = grid[0]) === null || _b === void 0 ? void 0 : _b.length) || 0;
  return jsx("div", { className: classNames.container, ref: gridRef, onTouchMove: handleTouchMove, onTouchEnd: handleEnd, style: { touchAction: "none" }, children: jsx("div", { className: classNames.grid, style: {
    display: "grid",
    gridTemplateColumns: "repeat(".concat(numCols, ", min-content)")
  }, role: "grid", children: grid.map(function(row, rIndex) {
    return jsx("div", { role: "row", style: { display: "contents" }, className: classNames.row, children: row.map(function(letter, cIndex) {
      return jsx("div", { "data-row": rIndex, "data-col": cIndex, onMouseDown: function() {
        return handleStart(rIndex, cIndex);
      }, onMouseEnter: function() {
        return handleMove(rIndex, cIndex);
      }, onTouchStart: function() {
        return handleStart(rIndex, cIndex);
      }, role: "gridcell", className: getCellClass(rIndex, cIndex, letter), style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        userSelect: "none"
      }, children: letter }, "".concat(rIndex, "-").concat(cIndex));
    }) }, "row-".concat(rIndex));
  }) }) });
};
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
const ORTHO = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0]
];
const DIAG = [
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1]
];
function shuffle(items) {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}
function deltasFor(config) {
  return config.allowDiagonal ? [...ORTHO, ...DIAG] : [...ORTHO];
}
function neighbors(row, col, rows, cols, config) {
  return deltasFor(config).map(([dr, dc]) => ({ row: row + dr, col: col + dc })).filter((p) => p.row >= 0 && p.row < rows && p.col >= 0 && p.col < cols);
}
function pathHasTurn(path) {
  if (path.length < 3) return false;
  for (let i = 2; i < path.length; i++) {
    const dRow1 = path[i - 1].row - path[i - 2].row;
    const dCol1 = path[i - 1].col - path[i - 2].col;
    const dRow2 = path[i].row - path[i - 1].row;
    const dCol2 = path[i].col - path[i - 1].col;
    if (dRow1 !== dRow2 || dCol1 !== dCol2) return true;
  }
  return false;
}
function canUseCell(grid, row, col, letter) {
  const existing = grid[row][col];
  return existing === "" || existing === letter;
}
function placeBentWord(grid, word, config, preferTurn) {
  const { rows, cols } = config;
  const starts = shuffle(
    Array.from({ length: rows * cols }, (_, i) => ({
      row: Math.floor(i / cols),
      col: i % cols
    }))
  );
  for (const start of starts) {
    if (!canUseCell(grid, start.row, start.col, word[0])) {
      continue;
    }
    const path = [];
    const used = /* @__PURE__ */ new Set();
    const key = (p) => `${p.row},${p.col}`;
    const dfs = (index, cell) => {
      path.push(cell);
      used.add(key(cell));
      if (index === word.length - 1) {
        const ok = !preferTurn || pathHasTurn(path) || word.length < 3;
        if (!ok) {
          path.pop();
          used.delete(key(cell));
          return false;
        }
        return true;
      }
      const nextLetter = word[index + 1];
      const options = shuffle(
        neighbors(cell.row, cell.col, rows, cols, config).filter((n) => {
          if (used.has(key(n))) return false;
          return canUseCell(grid, n.row, n.col, nextLetter);
        })
      );
      for (const next of options) {
        if (dfs(index + 1, next)) return true;
      }
      path.pop();
      used.delete(key(cell));
      return false;
    };
    if (dfs(0, start)) {
      return path.map((p) => ({ ...p }));
    }
  }
  return null;
}
function generateBentGrid(words, config) {
  const { rows, cols } = config;
  const grid = Array.from(
    { length: rows },
    () => Array.from({ length: cols }, () => "")
  );
  const placedWords = [];
  const sorted = [...words].sort((a, b) => b.length - a.length);
  for (const raw of sorted) {
    const word = raw.toLocaleUpperCase("ru-RU");
    let path = word.length >= 3 ? placeBentWord(grid, word, config, true) : null;
    if (!path) path = placeBentWord(grid, word, config, false);
    if (!path) continue;
    path.forEach((coord, i) => {
      grid[coord.row][coord.col] = word[i];
    });
    placedWords.push({ word, path, found: false });
  }
  return { grid, placedWords };
}
function normalizeWord(raw) {
  return raw.trim().replace(/[\s\-–—_.,;:!?'"«»()[\]{}]/g, "").replace(/ё/gi, "е").toLocaleUpperCase("ru-RU");
}
function parseWordsInput(text) {
  const seen = /* @__PURE__ */ new Set();
  const result = [];
  for (const part of text.split(/[\n,;]+/)) {
    const word = normalizeWord(part);
    if (word.length < 2) continue;
    if (seen.has(word)) continue;
    seen.add(word);
    result.push(word);
  }
  return result;
}
const CYRILLIC = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
const LATIN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function isCyrillicWord(word) {
  return /[А-ЯЁа-яё]/.test(word);
}
function fillBlankLetters(grid, words) {
  const useCyrillic = words.some(isCyrillicWord);
  const alphabet = useCyrillic ? CYRILLIC : LATIN;
  return grid.map(
    (row) => row.map((cell) => {
      if (cell) return cell;
      return alphabet[Math.floor(Math.random() * alphabet.length)];
    })
  );
}
function slugifyTopicId(title) {
  const base = title.trim().toLocaleLowerCase("ru-RU").replace(/[^a-zа-яё0-9]+/gi, "-").replace(/^-+|-+$/g, "").slice(0, 48);
  return base || `topic-${Date.now()}`;
}
const MIN_GRID_SIDE = 5;
const MAX_GRID_SIDE = 25;
function longestWordLength(words) {
  const normalized = words.map(normalizeWord).filter((w) => w.length >= 2);
  return Math.max(...normalized.map((w) => w.length), 1);
}
function minGridSideForWords(words, allowTurns = false) {
  if (allowTurns) return MIN_GRID_SIDE;
  return Math.max(MIN_GRID_SIDE, longestWordLength(words));
}
function clampGridSide(value) {
  return Math.min(MAX_GRID_SIDE, Math.max(MIN_GRID_SIDE, value || MIN_GRID_SIDE));
}
function resolveGridConfig(words, config) {
  const minSide = minGridSideForWords(words, Boolean(config.allowTurns));
  return {
    ...config,
    rows: Math.max(clampGridSide(config.rows), minSide),
    cols: Math.max(clampGridSide(config.cols), minSide),
    fillBlanks: false
  };
}
function createFillwordPuzzle(words, config = DEFAULT_GRID_CONFIG) {
  const normalized = words.map(normalizeWord).filter((w) => w.length >= 2);
  const safeConfig = resolveGridConfig(normalized, config);
  const { grid, placedWords } = safeConfig.allowTurns ? generateBentGrid(normalized, safeConfig) : generateGrid(normalized, safeConfig);
  return {
    grid: fillBlankLetters(grid, normalized),
    placedWords,
    words: placedWords.map((p) => p.word),
    config: safeConfig
  };
}
function isAdjacent(a, b, allowDiagonal) {
  const dr = Math.abs(a.row - b.row);
  const dc = Math.abs(a.col - b.col);
  if (dr === 0 && dc === 0) return false;
  if (allowDiagonal) return dr <= 1 && dc <= 1;
  return dr + dc === 1;
}
function pathsEqual(a, b) {
  if (a.length !== b.length) return false;
  return a.every(
    (c, i) => c.row === b[i].row && c.col === b[i].col
  );
}
function PathWordSearchGrid({
  grid,
  placedWords,
  onWordFound,
  allowDiagonal = false,
  classNames = {}
}) {
  const [selecting, setSelecting] = useState(false);
  const [path, setPath] = useState([]);
  const isInPath = (r, c, list) => list.some((p) => p.row === r && p.col === c);
  const cellClass = (r, c) => {
    const base = classNames.cell ?? "";
    if (isInPath(r, c, path)) {
      return `${base} ${classNames.cellSelected ?? ""}`.trim();
    }
    const found = placedWords.some(
      (pw) => pw.found && isInPath(r, c, pw.path)
    );
    if (found) return `${base} ${classNames.cellFound ?? ""}`.trim();
    return base;
  };
  const finish = useCallback(() => {
    if (path.length > 1) {
      for (const pw of placedWords) {
        if (pw.found) continue;
        const reversed = [...pw.path].reverse();
        if (pathsEqual(path, pw.path) || pathsEqual(path, reversed)) {
          onWordFound(pw.word);
          break;
        }
      }
    }
    setSelecting(false);
    setPath([]);
  }, [path, placedWords, onWordFound]);
  useEffect(() => {
    const onUp = () => {
      if (selecting) finish();
    };
    window.addEventListener("mouseup", onUp);
    return () => window.removeEventListener("mouseup", onUp);
  }, [selecting, finish]);
  const startAt = (row, col) => {
    if (!grid[row]?.[col]) return;
    setSelecting(true);
    setPath([{ row, col }]);
  };
  const moveTo = (row, col) => {
    if (!selecting) return;
    if (!grid[row]?.[col]) return;
    setPath((prev) => {
      if (!prev.length) return [{ row, col }];
      const last = prev[prev.length - 1];
      if (last.row === row && last.col === col) return prev;
      if (prev.length >= 2 && prev[prev.length - 2].row === row && prev[prev.length - 2].col === col) {
        return prev.slice(0, -1);
      }
      if (prev.some((p) => p.row === row && p.col === col)) return prev;
      if (!isAdjacent(last, { row, col }, allowDiagonal)) return prev;
      return [...prev, { row, col }];
    });
  };
  const numCols = grid[0]?.length ?? 0;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: classNames.container,
      onTouchEnd: finish,
      style: { touchAction: "none" },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: classNames.grid,
          style: {
            display: "grid",
            gridTemplateColumns: `repeat(${numCols}, min-content)`
          },
          role: "grid",
          children: grid.map((row, rIndex) => /* @__PURE__ */ jsx(
            "div",
            {
              role: "row",
              style: { display: "contents" },
              className: classNames.row,
              children: row.map((letter, cIndex) => /* @__PURE__ */ jsx(
                "div",
                {
                  "data-row": rIndex,
                  "data-col": cIndex,
                  role: "gridcell",
                  className: cellClass(rIndex, cIndex),
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    userSelect: "none"
                  },
                  onMouseDown: () => startAt(rIndex, cIndex),
                  onMouseEnter: () => moveTo(rIndex, cIndex),
                  onTouchStart: () => startAt(rIndex, cIndex),
                  onTouchMove: (e) => {
                    const touch = e.touches[0];
                    const el = document.elementFromPoint(
                      touch.clientX,
                      touch.clientY
                    );
                    const rowAttr = el?.getAttribute("data-row");
                    const colAttr = el?.getAttribute("data-col");
                    if (rowAttr != null && colAttr != null) {
                      moveTo(Number(rowAttr), Number(colAttr));
                    }
                  },
                  children: letter
                },
                `${rIndex}-${cIndex}`
              ))
            },
            `row-${rIndex}`
          ))
        }
      )
    }
  );
}
const GRID_CLASS_NAMES = {
  container: "fillword-grid",
  grid: "fillword-grid",
  row: "fillword-row",
  cell: "fillword-cell",
  cellSelected: "fillword-cell-selected",
  cellFound: "fillword-cell-found"
};
function FillwordGrid({
  grid,
  placedWords,
  onWordFound,
  allowTurns = false,
  allowDiagonal = false,
  remountKey
}) {
  if (allowTurns) {
    return /* @__PURE__ */ jsx(
      PathWordSearchGrid,
      {
        grid,
        placedWords,
        onWordFound,
        allowDiagonal,
        classNames: GRID_CLASS_NAMES
      },
      remountKey
    );
  }
  return /* @__PURE__ */ jsx(
    WordSearchGrid,
    {
      grid,
      placedWords,
      onWordFound,
      classNames: GRID_CLASS_NAMES
    },
    remountKey
  );
}
export {
  FillwordGrid as F,
  MAX_GRID_SIDE as M,
  MIN_GRID_SIDE as a,
  createFillwordPuzzle as b,
  clampGridSide as c,
  longestWordLength as l,
  minGridSideForWords as m,
  parseWordsInput as p,
  resolveGridConfig as r,
  slugifyTopicId as s
};
