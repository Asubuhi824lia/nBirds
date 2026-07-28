import { forwardRef } from "react";
import { Tab, type TabProps } from "@mui/material"
import type { FamiliesGroup } from "../data/types";

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
  group: FamiliesGroup;
}
export const TabLabel = forwardRef<HTMLDivElement, TabLabelProps>(
  ({
    tabIndex,
    tabActual,
    group,
    ...props
  }, ref) => {
    // TODO: with useMemo()?
    const max = group.max_species_length;
    const min = group.min_species_length;
    return (
      <Tab
        ref={ref}
        {...props}
        key={`tab-${tabIndex}`}
        label={
          `${min}`
          + (max ? ` - ${max}` : '+')
        }
        {...a11yProps(tabIndex)}
        sx={{ bgcolor: tabIndex === tabActual ? "Background" : "ThreeDFace" }}
      />
    )
  }
)
TabLabel.displayName = "TabLabel";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}