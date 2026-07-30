import { forwardRef } from "react";
import { Tab, type TabProps } from "@mui/material"
import type { FamiliesGroup } from "~/pages/views/SpeciesNamesPage/data/types";

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
  groupRange: {
    max?: number;
    min: number;
  }
}
// forwardRef для переключения
export const TabLabel = forwardRef<HTMLDivElement, TabLabelProps>(
  ({
    tabIndex,
    tabActual,
    groupRange: { max, min },
    ...props
  }, ref) => {
    return (
      <Tab
        ref={ref}
        {...props}
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


// TODO: где лучше располагать если в 1 файле? верх? низ?
function a11yProps(index: number) {
  return {
    id: `tab-range-${index}`,
    'aria-controls': `tabpanel-range-${index}`
  };
}