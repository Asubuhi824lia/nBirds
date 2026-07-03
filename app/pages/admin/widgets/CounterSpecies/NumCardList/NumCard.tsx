import { Card, CardContent, CardHeader, Typography } from "@mui/material"
import type { FamilyStruct } from "../utils/data/types";

interface NumCardProps {
  curCount: number;
  speciesNum: number;
  families: Array<FamilyStruct>;
}

export const NumCard = ({ curCount, speciesNum, families }: NumCardProps) => {

  console.log(speciesNum, curCount)

  return (
    <Card
      raised={speciesNum === curCount}
      sx={{
        ':first-child': {
          bgcolor: speciesNum === curCount ? "cyan" : "lightcyan"
        },
        bgcolor: speciesNum === curCount ? "lightsalmon" : "Background"
      }}
    >
      {/* TODO: "вида" — вертикальной строкой */}
      <CardHeader title={speciesNum} />
      <CardContent>
        <Typography variant="h3" component="center">{families.length}</Typography>
        <Typography variant="caption" component="span">Семейств содержат</Typography>
      </CardContent>
    </Card>
  )
}