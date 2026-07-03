import { Card, CardContent, CardHeader, Typography } from "@mui/material"
import type { FamilyStruct } from "./utils/data/types";

interface NumCardProps {
  speciesNum: number;
  families: Array<FamilyStruct>;
}

export const NumCard = ({ speciesNum, families }: NumCardProps) => {

  return (
    <Card>
      {/* TODO: "вида" — вертикальной строкой */}
      <CardHeader title={speciesNum} />
      <CardContent>
        <Typography variant="h3" component="center">{families.length}</Typography>
        <Typography variant="caption" component="span">Семейств содержат</Typography>
      </CardContent>
    </Card>
  )
}