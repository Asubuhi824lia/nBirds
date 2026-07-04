import { Avatar, Card, CardHeader } from "@mui/material";
import type { AchieveCardType } from "../utils/data/achievements/checkAchievements";



export const AchieveCard = ({ achieve, id, isActive }: { achieve: AchieveCardType, id: number, isActive: boolean }) => {

  return (
    // TODO: different bgcolor & red[]
    <Card
      variant="outlined"
      sx={{
        border: `2px solid ${achieve.signBg(id)}`,
        bgcolor: isActive ? achieve.accentBg(id) : "transparent"
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: achieve.signBg(id) }}>
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