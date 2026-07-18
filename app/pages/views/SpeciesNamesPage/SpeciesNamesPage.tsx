/**
 * Визуализация отношения «отряд: семейство —> виды»
 * 
 * 
 * 
 * Доп.:
 * «класс: отряд —> семейства»
 * «отряд: семейство —> рода»
 * «отряд: род —> виды»
 */

import { Box, Card, CardContent, CardHeader, Grid, List, ListItem, Tab, Tabs } from "@mui/material"
// TODO: variable — fromLowerCase
import { FamiliesGroups } from "./data/FamiliesGroups"
import { useState } from "react"



/**main List
 * 
 * ListUnions
 * CardUnion
 */


export const SpeciesNamesPage = () => {
  const [tab, setTab] = useState<number>(0);

  return (
    <section
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: "column",
        width: '80%'
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          display: 'flex',
          justifyContent: "center",
          borderColor: 'divider',
          bgcolor: 'ThreeDLightShadow'
        }}
      >
        <Tabs centered value={tab} onChange={(_, setValue) => setTab(setValue)} aria-label="basic tabs example">
          {FamiliesGroups.map(({ min_species_length: min, max_species_length: max }, index) => (
            <Tab
              key={`tab-${index}`}
              {...a11yProps(index)}
              sx={{ bgcolor: tab !== index ? "ThreeDFace" : "Background" }}
              label={
                `${min}`
                + (max ? ` - ${max}` : '+')
              }
            />
          ))}
        </Tabs>
      </Box>

      <Grid container spacing={1} sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
        {FamiliesGroups.map((group, index) => (
          <CustomTabPanel key={`tab-group-${index}`} value={tab} index={index}>
            <Card key={`group-${index}`} sx={{ width: 'fit-content', height: "fit-content" }}>
              <CardHeader
                component="center"
                title={
                  `${group.min_species_length}`
                  + (group.max_species_length ? ` - ${group.max_species_length}` : '+')
                }
              />
              <CardContent>
                <List>
                  {group.families.map((family, ind) => (
                    <ListItem key={`group-${index}-family-${ind}`}>
                      {family.name || family.latin_name} — {family.species_length}
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </CustomTabPanel>
        ))}
      </Grid>
    </section>
  )
}


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}