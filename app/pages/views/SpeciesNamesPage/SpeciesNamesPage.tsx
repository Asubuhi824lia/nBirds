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

import { Box, Card, CardContent, CardHeader, Container, Divider, Grid, List, ListItemText, Stack, Tab, Tabs, Typography } from "@mui/material"
// TODO: variable — fromLowerCase
import { FamiliesGroups } from "./data/FamiliesGroups"
import { useState } from "react"
import type { FamilyGroupStruct } from "./data/types";
import { FiltersNaming, type RadioGroupNameProps } from "./components/Filters/FiltersNaming";



const modesNameAlt = [
  { value: "alt_names_without", label: "Не показывать" },
  { value: "alt_names_with", label: "Добавить" },
]
const modesNameLatin = [
  { value: "latin_names_with_only", label: "Показывать при отсутствии локализации" },
  { value: "latin_names_with_every", label: "Показывать для каждого" },
  { value: "latin_names_without", label: "Без латыни" },
  { value: "latin_names_only", label: "Только латынь" }
]

const defaultValueAlt = modesNameAlt[0].value;
const defaultValueLatin = modesNameLatin[0].value;

const prefixGroup = "radio-group-name";


/**main List
 * 
 * ListUnions
 * CardUnion
 */


export const SpeciesNamesPage = () => {
  const [tab, setTab] = useState<number>(0);

  const [typeNameAlt, setTypeNameAlt] = useState(defaultValueAlt);
  const [typeNameLatin, setTypeNameLatin] = useState(defaultValueLatin);

  const groups: RadioGroupNameProps[] = [
    {
      id: "alt",
      title: "Альтернативные имена",
      actualType: typeNameAlt,
      onChangeActualType: setTypeNameAlt,
      modesName: modesNameAlt
    },
    {
      id: "latin",
      title: "Латинские имена",
      actualType: typeNameLatin,
      onChangeActualType: setTypeNameLatin,
      modesName: modesNameLatin
    }
  ]

  return (
    <section
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: "column",
        gap: 64,
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

      <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
        <Grid container spacing={1} sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {FamiliesGroups.map((group, index) => {
            const parts = new Map<number, FamilyGroupStruct[]>();

            // get groups
            group.families.map((family) => {
              const tempFamily = structuredClone(family);
              // ADD FILTER BY NAME TYPES
              switch (typeNameLatin) {
                case "latin_names_without":
                  if (!family.name && !family.alternative_names?.length) return; // не добавлять в Map
                  else break;
                case "latin_names_only":
                  tempFamily.name = "";
                  tempFamily.alternative_names = [];
                  break;
              }
              // divide to subgroups by N
              const N = family.species_length; //результат поля в temp не меняется
              const key = N < 10 ? N : (Math.floor(N / 10) * 10);
              if (parts.has(key))
                parts.set(key, [...parts.get(key) as FamilyGroupStruct[], tempFamily])
              else
                parts.set(key, [tempFamily])
            })
            // sort groups
            parts.forEach((part, key) => {
              const partSorted = part.sort((a, b) => a.species_length - b.species_length);
              parts.set(key, partSorted);
            })

            const partsSorted: [number, FamilyGroupStruct[]][]
              = (Array.from(parts.entries())).sort((a, b) => a[0] - b[0]);

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
                      {partsSorted.map(([species_num, families], ind, arr) => {
                        const isSingleOnly = new Set(
                          families.map(({ species_length }) => species_length)
                        ).size === 1;
                        const isLonely =
                          families.length === 1;

                        const isSpecificValue = isLonely || isSingleOnly || species_num < 10;

                        return (
                          <Grid key={`group-${index}-part-${ind}`}>
                            <Typography variant="h5" sx={(arr.length === 1) ? { textAlign: "center" } : null}>
                              {(isSpecificValue ? families[0].species_length : `${species_num}+`)}
                            </Typography>
                            <List dense>
                              {families.map((family, i) => {
                                const name =
                                  family.name
                                  || family.alternative_names?.[0]
                                  || family.latin_name
                                  || "???";
                                return (
                                  <ListItemText
                                    key={`group-${index}-part-${ind}-family-${i}`}
                                    sx={{ width: "100%", cursor: "pointer" }}
                                    slotProps={{ primary: { sx: { display: "flex", justifyContent: "space-between" } } }}
                                  >
                                    <span>{name}</span>
                                    {(family.species_length >= 10 && !isSpecificValue) && (
                                      <span style={{ color: "GrayText" }}>&nbsp;{' — ' + family.species_length}</span>
                                    )}
                                  </ListItemText>
                                )
                              })}
                            </List>
                          </Grid>
                        )
                      })}
                    </Grid>
                  </CardContent>
                </Card>
              </CustomTabPanel>
            )
          })}
        </Grid>
        <Container sx={{ width: "fit-content" }}>
          <FiltersNaming filterGroups={groups} />
        </Container>
      </Stack>
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