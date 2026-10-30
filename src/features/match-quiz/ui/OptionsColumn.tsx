import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { IconButton, Tooltip, Typography } from "@mui/material";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import { useDragOperation } from "@dnd-kit/react";
import type { MatchOption } from "../model/types";
import { OptionCard } from "./OptionCard";

type OptionsColumnProps = {
  options: MatchOption[];
};

const MARQUEE_MAX_HEIGHT = 460;
const SCROLL_SPEED = 0.55;

function OptionsList({
  options,
  instanceSuffix = "",
}: {
  options: MatchOption[];
  instanceSuffix?: string;
}) {
  return (
    <>
      {options.map((option) => (
        <OptionCard
          key={`${option.id}${instanceSuffix}`}
          option={option}
          instanceId={instanceSuffix ? `${option.id}${instanceSuffix}` : option.id}
        />
      ))}
    </>
  );
}

/**
 * Infinite marquee with exactly two parties of unique options:
 * viewport height = one party (shrinks as cards are placed).
 * The second party is only for seamless wrap (top → bottom).
 */
export function OptionsColumn({ options }: OptionsColumnProps) {
  const [marqueeMode, setMarqueeMode] = useState(false);
  const [partyHeight, setPartyHeight] = useState<number | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const { source } = useDragOperation();
  const isDragging = Boolean(source);

  const optionKey = useMemo(
    () => options.map((o) => o.id).join("|"),
    [options],
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

      // Content area shows exactly one unique party (capped for layout safety).
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

  return (
    <div className="match-options-panel match-quiz-options">
      <div className="match-options-panel__header">
        <Typography variant="subtitle2" sx={{ color: "inherit", fontWeight: 600 }}>
          Варианты
        </Typography>
        <Tooltip title={marqueeMode ? "Обычный список" : "Бегущая строка"}>
          <IconButton
            size="small"
            aria-label="Переключить бегущую строку"
            onClick={() => setMarqueeMode((v) => !v)}
          >
            {marqueeMode ? (
              <ViewAgendaIcon fontSize="small" />
            ) : (
              <ViewStreamIcon fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
      </div>

      {marqueeMode && options.length > 0 ? (
        <div
          className="match-options-marquee"
          ref={viewportRef}
          style={partyHeight != null ? { height: partyHeight } : undefined}
          aria-label="Бегущая строка вариантов"
        >
          <div className="match-options-marquee__inner">
            <div className="match-options-marquee__group" ref={groupRef}>
              <OptionsList options={options} />
            </div>
            {/* Single loop copy — enough when viewport height === one party */}
            <div
              className="match-options-marquee__group match-options-marquee__group--ghost"
              aria-hidden
            >
              <OptionsList options={options} instanceSuffix="::loop" />
            </div>
          </div>
        </div>
      ) : (
        <div className="match-options-scroll">
          <OptionsList options={options} />
          {!options.length && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ p: 1, textAlign: "center" }}
            >
              Все варианты размещены
            </Typography>
          )}
        </div>
      )}
    </div>
  );
}
