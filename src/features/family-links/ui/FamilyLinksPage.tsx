import { useEffect, useState, type ComponentType } from "react";
import {
  CircularProgress,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useFamilyLinks } from "../model/useFamilyLinks";
import type {
  ColumnSide,
  FamilyEntry,
  FamilyHighlight,
  SubstringBlock,
} from "../model/types";
import "./familyLinks.css";

type FamilyLinksBoardProps = {
  entries: FamilyEntry[];
  entriesById: Map<string, FamilyEntry>;
  blocksLeft: SubstringBlock[];
  blocksRight: SubstringBlock[];
  heightCapped: boolean;
  onHeightCappedChange: (capped: boolean) => void;
  listColumns: 1 | 2;
  onMatchFamilies: (sourceId: string, targetId: string) => void;
  onMoveBlock: (blockId: string, column: ColumnSide) => void;
  onColorChange: (blockId: string, color: string) => void;
  highlightsForFamily: (familyId: string) => FamilyHighlight[];
};

export function FamilyLinksPage() {
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
    highlightsForFamily,
  } = useFamilyLinks();

  const [Board, setBoard] = useState<ComponentType<FamilyLinksBoardProps> | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;
    void import("./FamilyLinksBoard").then((mod) => {
      if (!cancelled) setBoard(() => mod.FamilyLinksBoard);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="family-links-page">
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        sx={{
          mb: 2,
          alignItems: { xs: "flex-start", sm: "flex-end" },
          justifyContent: "space-between",
        }}
      >
        <Stack spacing={1}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            Связи семейств
          </Typography>
          <Typography color="text.secondary">
            Перетащите одно название на другое, чтобы найти общие подстроки.
          </Typography>
        </Stack>

        <ToggleButtonGroup
          size="small"
          exclusive
          value={listColumns}
          onChange={(_, value: 1 | 2 | null) => {
            if (value === 1 || value === 2) setListColumns(value);
          }}
          aria-label="Число колонок списка"
        >
          <ToggleButton value={1} aria-label="Одна колонка">
            1
          </ToggleButton>
          <ToggleButton value={2} aria-label="Две колонки">
            2
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {Board ? (
        <Board
          entries={entries}
          entriesById={entriesById}
          blocksLeft={blocksLeft}
          blocksRight={blocksRight}
          heightCapped={heightCapped}
          onHeightCappedChange={setHeightCapped}
          listColumns={listColumns}
          onMatchFamilies={matchFamilies}
          onMoveBlock={moveBlock}
          onColorChange={setBlockColor}
          highlightsForFamily={highlightsForFamily}
        />
      ) : (
        <Stack sx={{ alignItems: "center", py: 8 }}>
          <CircularProgress size={28} />
        </Stack>
      )}
    </section>
  );
}

export default FamilyLinksPage;
