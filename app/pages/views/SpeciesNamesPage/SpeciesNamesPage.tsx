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
import { FiltersNaming, type RadioGroupNameProps } from "./components/Filters/FiltersNaming/FiltersNaming";
import { TabLabel } from "./components/TabLabel";
import { StyleMainContainer, StylePageSection, StyleHeaderTabsBox, StyleMainGrid, StyleCenteredWrapper } from "./styles";
import SelectNamePart from "./components/SelectNamePart";
import { CardRange } from "./components/CardRange/CardRange";


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      id={`tabpanel-range-${index}`}
      aria-labelledby={`tab-range-${index}`}
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}


const modesNameAlt = [
  { value: "alt_names_with_only", label: "Показывать при отсутствии локализации", hint: "Когда на русском отсутствует\nглавное название" },
  { value: "alt_names_with_every", label: "Показывать для каждого" },
  { value: "alt_names_without", label: "Не показывать совсем" },
]
const modesNameLatin = [
  { value: "latin_names_with_only", label: "Показывать при отсутствии локализации", hint: "Когда на русском отсутствует\nлюбое название" },
  { value: "latin_names_with_every", label: "Показывать для каждого" },
  { value: "latin_names_without", label: "Не показывать совсем" },
  { value: "latin_names_only", label: "Только латынь" }
]

const defaultValueAlt = modesNameAlt[0].value;
const defaultValueLatin = modesNameLatin[0].value;


/**main List
 * 
 * ListUnions
 * CardUnion
 */


export const SpeciesNamesPage = () => {
  const [tab, setTab] = useState<number>(0);

  const [selectedNames, setSelectedNames] = useState<string[]>([]);

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
    <section style={StylePageSection}>
      {/* TODO: может ли header быть частью, напрямую влияющей на содержание main? до какой степени?*/}
      <header>
        <Box sx={StyleHeaderTabsBox}>
          <Tabs centered value={tab} onChange={(_, setValue) => setTab(setValue)}>
            {FamiliesGroups.map((group, index) => (
              <TabLabel key={index} tabIndex={index} tabActual={tab} group={group} />
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
            <FiltersNaming filterGroups={groups} />

            <SelectNamePart curValue={selectedNames} onChange={setSelectedNames} />
          </Container>
        </Stack>
      </main>
    </section >
  )
}