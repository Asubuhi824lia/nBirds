import { Avatar, Card, CardHeader } from "@mui/material";
import type { AchieveCardType } from "../utils/data/achievements/checkAchivements";



export const AchieveCard = ({ achive, id }: { achive: AchieveCardType, id: number }) => {

  return (
    // TODO: different bgcolor & red[]
    <Card variant="outlined" sx={{ border: `2px solid ${achive.signBg(id)}` }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: achive.signBg(id) }}>
            {achive.signSymbol}
          </Avatar>
        }
        title={achive.title}
        subheader={achive.message}
        slotProps={{
          title: { sx: { mb: 1, color: "WindowText", fontWeight: "bold" } }
        }}
      />
    </Card>
  )
}