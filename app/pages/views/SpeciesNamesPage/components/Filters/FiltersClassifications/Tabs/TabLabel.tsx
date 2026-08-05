import { forwardRef, useMemo } from "react";
import { Badge, Chip, Divider, Tab, Tooltip, Typography, type BadgeProps, type TabProps, type TypographyProps } from "@mui/material";
import type { FamilyGroupPartsStruct } from "~/pages/views/SpeciesNamesPage/utils";
import type { CountType } from "~/pages/views/SpeciesNamesPage/SpeciesNamesPage";

/**
 * Format Changes!
 * 
 * curTab ——> tabActual
 * 
 * curTab = "нынешний таб" — ! — компонент и есть про обработку конкретного таба...
 * TabActual = "АКТУАЛЬНЫЙ таб" — про проверку нынешнего таба на актуальность.
 * 
 * actualTab | indexTab — ! — приходится искать часть "Tab" для понимания, долго
 * tabIndex | tabActual — часть "tab" в одном месте, считывается легче => быстрее
 */

interface TabLabelProps extends TabProps {
  tabIndex: number;
  tabActual: number;
  group: FamilyGroupPartsStruct;
  isModeActive: boolean;
  stateCountType: [CountType, React.Dispatch<React.SetStateAction<CountType>>]
}
// forwardRef для переключения
export const TabLabel = forwardRef<HTMLDivElement, TabLabelProps>(
  ({
    tabIndex,
    tabActual,
    group: {
      max_species_length: max,
      min_species_length: min,
      families_length,
      families
    },
    isModeActive,
    stateCountType: {
      "0": curCountType,
      "1": setCurCountType
    },
    ...props
  }, ref) => {
    // TODO: refactor this
    const lengthSubGroups = families.length;
    const lengthFamilies = useMemo(() => (
      families_length ||
      families.reduce((acc, subgroup) => acc + subgroup[1].length, 0)
    ), [families_length, families])
    const lengthSpecies = useMemo(() => (
      families.reduce((acc, subgroup) => (
        acc + subgroup[1].reduce((acc, family) => acc + family.species_length, 0)
      ), 0)
    ), [families])

    const isBadgeOverflow = curCountType === "S" && lengthSpecies > 99;

    function getTypeCount(type: CountType) {
      switch (type) {
        case "G": return lengthSubGroups;
        case "F": return lengthFamilies;
        case "S": return lengthSpecies;
      }
    }
    function getTypeColor(type: CountType, isActive: boolean = isModeActive): BadgeProps["color"] {
      switch (type) {
        case "G": return isActive ? "primary" : "default";
        case "F": return isActive ? "secondary" : "default";
        case "S": return isActive ? "success" : "default";
      }
    }
    function getTypeVariant(type: CountType, isActive: boolean = isModeActive): TypographyProps["variant"] {
      return ((type === curCountType) && isActive) ? "subtitle1" : "body2";
    }

    interface TooltipItemProps {
      type: CountType;
    }
    const TooltipItem = ({ type }: TooltipItemProps) => {
      const title = type === "G"
        ? "Подгрупп"
        : (type === "F"
          ? "Семейств"
          : "Видов"
        );
      const count = getTypeCount(type);
      return (
        <>
          <Typography
            variant={getTypeVariant(type)}
            onClick={() => setCurCountType(type)}
            sx={{ cursor: "pointer" }}
          >
            {type}: {title} — {count}
          </Typography>
          {type === curCountType && (
            <Divider orientation="horizontal" variant="fullWidth" flexItem sx={{ borderColor: "aquamarine" }} />
          )}
        </>
      )
    }

    return (
      <Tab
        ref={ref}
        {...props}
        label={
          `${min}`
          + (max ? ` - ${max}` : '+')
        }
        icon={(
          <Tooltip title={(
            <div>
              <TooltipItem type="G" />
              <TooltipItem type="F" />
              <TooltipItem type="S" />
            </div>
          )}
          >
            <Badge
              badgeContent={getTypeCount(curCountType)}
              max={1000}
              color={getTypeColor(curCountType)}
              overlap="rectangular"
              sx={{ marginBottom: isBadgeOverflow ? 1 : null }}
              slotProps={{
                badge: {
                  sx: isModeActive ? null : { color: "initial" }
                }
              }}
            >
              <Chip label={curCountType} color={getTypeColor(curCountType)} variant="outlined" size="medium" />
            </Badge>
          </Tooltip>
        )}
        iconPosition={isBadgeOverflow ? "start" : "end"}
        {...a11yProps(tabIndex)}
        sx={{ bgcolor: tabIndex === tabActual ? "Background" : "ThreeDFace" }}
      />
    )
  }
)
TabLabel.displayName = "TabLabel";


// TODO: где лучше располагать если в 1 файле? верх? низ?
function a11yProps(index: number) {
  return {
    id: `tab-range-${index}`,
    'aria-controls': `tabpanel-range-${index}`
  };
}