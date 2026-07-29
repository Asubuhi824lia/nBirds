/**
 * Визуализация отношения «отряд: семейство —> виды»
 * 
 * Доп.:
 * «класс: отряд —> семейства»
 * «отряд: семейство —> рода»
 * «отряд: род —> виды»
 */

import { Box, Container, Divider, Grid, Stack, Tabs } from "@mui/material"
// TODO: variable — fromLowerCase
import { FamiliesGroups } from "./data/FamiliesGroups"
import { useState } from "react"
import { FiltersNaming, type RadioGroupNameProps } from "./components/Filters/FiltersNaming";
import { StyleMainContainer, StylePageSection, StyleHeaderTabsBox, StyleMainGrid, StyleCenteredWrapper } from "./styles";
import SelectNamePart from "./components/SelectNamePart";
import { CardRange } from "./components/CardRange/CardRange";
import { defaultValueAlt, defaultValueLatin, modesNameAlt, modesNameLatin } from "./data";
import { CustomTabPanel, TabLabel } from "./components/Filters/FiltersClassifications";


export const SpeciesNamesPage = () => {
  const [tab, setTab] = useState<number>(0);

  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const [typeNameAlt, setTypeNameAlt] = useState(defaultValueAlt);
  const [typeNameLatin, setTypeNameLatin] = useState(defaultValueLatin);

  const filterGroups: RadioGroupNameProps[] = [
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
    <section style={StylePageSection}>
      {/* TODO: может ли header быть частью, напрямую влияющей на содержание main? до какой степени?*/}
      <header>
        <Box sx={StyleHeaderTabsBox}>
          <Tabs centered value={tab} onChange={(_, setValue) => setTab(setValue)}>
            {FamiliesGroups.map((group, index) => (
              <TabLabel key={`tab-${index}`} tabIndex={index} tabActual={tab} group={group} />
            ))}
          </Tabs>
        </Box>
      </header>

      <main>
        <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />} sx={{ justifyContent: "flex-end" }}>
          <div style={StyleCenteredWrapper}>
            <Grid container spacing={1} sx={StyleMainGrid}>
              {FamiliesGroups.map((group, index) => (
                <CustomTabPanel key={`tab-group-${index}`} index={index} value={tab}>
                  <CardRange
                    groupId={index}
                    group={group}
                    typeNameAlt={typeNameAlt}
                    typeNameLatin={typeNameLatin}
                    selectedNames={selectedNames}
                  />
                </CustomTabPanel>
              ))}
            </Grid>
          </div>

          <Container sx={StyleMainContainer}>
            <FiltersNaming filterGroups={filterGroups} />

            <SelectNamePart curValue={selectedNames} onChange={setSelectedNames} />
          </Container>
        </Stack>
      </main>
    </section >
  )
}