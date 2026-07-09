import { Avatar, Card, CardHeader } from "@mui/material";
import type { AchieveCardType } from "../utils/data/achievements/checkAchievements";



export const AchieveCard = ({
  achieve,
  isActive,
  onClick
}: {
  achieve: AchieveCardType,
  isActive: boolean,
  onClick: () => void
}) => {

  return (
    // TODO: different bgcolor & red[]
    <Card
      variant="outlined"
      sx={{
        border: `2px solid ${achieve.signBg}`,
        bgcolor: isActive ? achieve.accentBg : "transparent",
        maxWidth: "380px",
        cursor: "pointer"
      }}
      onClick={onClick}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: achieve.signBg }}>
            {achieve.signSymbol}
          </Avatar>
        }
        title={achieve.title}
        subheader={achieve.message}
        slotProps={{
          title: { sx: { mb: 1, color: "WindowText", fontWeight: "bold" } }
        }}
      />
    </Card>
  )
}