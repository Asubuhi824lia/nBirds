import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, CardHeader, Typography } from "@mui/material"
import type { FamilyStruct } from "../utils/data/types";
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

interface NumCardProps {
  isTabActive: boolean;
  toggleTabActive: () => void;
  curCount: number;
  speciesNum: number;
  families: Array<FamilyStruct>;
}

export const NumCard = ({ curCount, speciesNum, families, isTabActive, toggleTabActive }: NumCardProps) => {

  return (
    <Card
      raised={speciesNum === curCount}
      sx={{
        // ':first-child': {
        //   bgcolor: speciesNum === curCount ? "cyan" : "lightcyan"
        // },
        bgcolor: speciesNum === curCount ? "lightsalmon" : "lightcyan",
        height: "fit-content",
      }}
    >
      {/* TODO: "вида" — вертикальной строкой */}
      <CardHeader title={speciesNum} />
      <CardContent>
        <Typography variant="h3" component="center">{families.length}</Typography>
        <div>
          <Accordion expanded={isTabActive} onChange={toggleTabActive}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id={`${curCount}-panel-header`}
            >
              <Typography variant="caption" component="span">Семейств содержат</Typography>
            </AccordionSummary>
            {/* TODO: свернуть всё */}
            <AccordionDetails sx={{ px: .5 }}>
              {families.map((family, id) => (
                <Typography
                  key={id}
                  variant="body2"
                  component="p"
                  sx={{ py: .5, px: 2, ":hover": { bgcolor: "aliceblue" } }}
                >
                  {family.name || family.latin_name}
                </Typography>
              ))}
            </AccordionDetails>
          </Accordion>

        </div>
      </CardContent>
    </Card>
  )
}