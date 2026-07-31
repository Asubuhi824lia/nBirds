import { forwardRef, useMemo } from "react";
import { Badge, Chip, Divider, Tab, Tooltip, Typography, type TabProps } from "@mui/material";
import type { FamilyGroupPartsStruct } from "~/pages/views/SpeciesNamesPage/utils";

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
    ...props
  }, ref) => {
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
              <Typography variant="subtitle2">G: Подгрупп: {lengthSubGroups}</Typography>
              <Divider orientation="horizontal" variant="fullWidth" flexItem sx={{ borderColor: "aquamarine" }} />
              <Typography variant="body2">F: Семейств: {lengthFamilies}</Typography>
              <Typography variant="body2">S: Видов: {lengthSpecies}</Typography>
            </div>
          )}>
            <Badge badgeContent={lengthFamilies} color="primary" overlap="rectangular">
              <Chip label="F" color="primary" variant="outlined" size="medium" />
            </Badge>
          </Tooltip>
        )}
        iconPosition="end"
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