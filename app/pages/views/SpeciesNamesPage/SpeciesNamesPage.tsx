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

import { Box, Card, CardContent, CardHeader, Grid, List, ListItemText, Tab, Tabs, Typography } from "@mui/material"
// TODO: variable — fromLowerCase
import { FamiliesGroups } from "./data/FamiliesGroups"
import { useState } from "react"
import type { FamilyGroupStruct } from "./data/types";



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

      <Grid container spacing={1} sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {FamiliesGroups.map((group, index) => {
          const parts = new Map<number, FamilyGroupStruct[]>();

          group.families.map((family) => {
            const N = family.species_length;
            const key = N < 10 ? N : (Math.floor(N / 10) * 10);

            // divide to subgroups by N
            if (parts.has(key))
              parts.set(key, [...parts.get(key) as FamilyGroupStruct[], family])
            else
              parts.set(key, [family])
          })

          const partsSorted = (Array.from(parts.entries())).sort((a, b) => a[0] - b[0]);

          return (
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
                  <Grid spacing={3} container sx={{ display: "flex", justifyContent: "center" }}>
                    {partsSorted.map(([species_num, families], ind) => (
                      <Grid key={`group-${index}-part-${ind}`}>
                        <Typography variant="h5">
                          {species_num + (species_num < 10 ? '' : "+")}
                        </Typography>
                        <List dense>
                          {families.map((family, i) => (
                            <ListItemText key={`group-${index}-part-${ind}-family-${i}`}>
                              {family.species_length < 10
                                ? (family.name || family.latin_name)
                                : (family.name || family.latin_name) + ' — ' + family.species_length
                              }
                            </ListItemText>
                          ))}
                        </List>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </CustomTabPanel>
          )
        })}
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