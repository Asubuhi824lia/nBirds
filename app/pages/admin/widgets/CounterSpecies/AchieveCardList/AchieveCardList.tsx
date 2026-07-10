import { Stack } from "@mui/material"
import { AchieveCard } from "./AchieveCard"
import type { AchieveCardType } from "../utils/data/achievements/checkAchievements"

export type AchievesType = AchieveCardType & { count: number };

interface AchieveCardList {
  achieves: AchievesType[],
  count: number,
  changeCountHandler: (count: number) => void
}

export const AchieveCardList = ({
  achieves,
  count,
  changeCountHandler
}: AchieveCardList) => {

  return (
    <Stack spacing={.5} direction="column-reverse">
      {achieves.map((achieve, index, array) => (
        <AchieveCard
          key={`achieve-card-${index}`}
          achieve={achieve}
          isActive={array.find(({ title }) => title === achieve.title)?.count === count}
          onClick={() => changeCountHandler(achieve.count)}
        />
      ))}
    </Stack>
  )
}