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
      {/* TODO: уровни показа инфы о Selected Names
        управляющий компонент: <input type="range">
        1. Показ "цвета" присутствующих в "группе" "типов" имён
        2. + показ в кружочках "цвета" кол-ва соответствующих имён + показ общего кол-ва пересекающихся "групп"
        3. + показ в кружочках "цвета" кол-ва имён из данной "группы", пересекающихся с другими "группами"
      */}
      <header>
        <Box sx={StyleHeaderTabsBox}>
          <Tabs centered value={tab} onChange={(_, setValue) => setTab(setValue)}>
            {FamiliesGroups.map((group, index) => (
              <TabLabel key={`tab-${index}`} tabIndex={index} tabActual={tab} group={group} />
            ))}
          </Tabs>
        </Box>
      </header>

      <section>
        {/* Widget CommonInfoGroup — Показ общей инфы по "группе"
          
          Бегунок фильтра "уровней" инфы — (по вычисляемости)
          управляющий компонент: <input type="range">
          1. статистическое
            - для скольких видов указаны альтернативные имена
            - для скольких видов указаны имена только на латыни
            - для скольких видов русские имена указаны ТОЛЬКО для монорода/моновида (НЕ семейству)
            - Наибольшее кол-во альтернативных названий
            - Наименьшее кол-во альтернативных названий
          2. общие совпадения с PartNames
            - Перечень "без пересечений PartNames" с альтернативными именами 
              —* с приведением групп/семейств, общим числом родов/видов
            - Перечень "без пересечений PartNames" с главными именами 
              —* с приведением групп/семейств, общим числом родов/видов
            -* статистика по соотношениям главных имен к группам PartNames?
            -* статистика по соотношениям альтернативных к группам PartNames?
          3. пересечения PartNames
            -* главные имена пересекающиеся с названиями других семейств (по тэгам - частям названий - PartNames)
            -* альтернативные имена пересекающихся с названиями других семейств (по тэгам - частям названий - PartNames)
            -* Наибольшее по кол-ву пересечений групп PartNames?
        */}
      </section>

      <main>
        <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />} sx={{ justifyContent: "flex-end" }}>
          <section style={StyleCenteredWrapper}>
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
          </section>

          <Container sx={StyleMainContainer}>
            <FiltersNaming filterGroups={filterGroups} />

            <SelectNamePart curValue={selectedNames} onChange={setSelectedNames} />
          </Container>
        </Stack>
      </main>

      {/* На перспективу
          TODO: Footer
          1. указание используемой классификации + год создания классификации (+обновляемость?..)
          2. Select для переключения между доступными классификациями систематики
          3. домены/разделы сайтов-источников
      */}
    </section >
  )
}