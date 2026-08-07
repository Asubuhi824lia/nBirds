// TODO: пересмотреть как должны выглядеть файлы стилизации
import type { SxProps, Theme } from "@mui/material"


// style (React)

export const StyleCenteredWrapper = {
  display: "flex",
  width: "100%",
  justifyContent: "center"
}

export const StylePageSection: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: 48,
  width: '80%'
}

// sx (MUI)

export const StyleHeaderTabsBox: SxProps<Theme> = {
  borderBottom: 1,
  display: 'flex',
  justifyContent: "center",
  borderColor: 'divider',
  bgcolor: 'ThreeDLightShadow'
}

export const StyleMainContainer: SxProps<Theme> = {
  width: "fit-content",
  maxWidth: "300px",
  display: "flex",
  flexDirection: "column",
  gap: 4
}

export const StyleMainGrid: SxProps<Theme> = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center"
}