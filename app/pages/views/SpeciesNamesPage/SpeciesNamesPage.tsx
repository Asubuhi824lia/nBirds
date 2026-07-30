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
import { getPartsByNum } from "./utils";


// struct from API
const GroupsPartsFamilies = getPartsByNum(FamiliesGroups);


export const SpeciesNamesPage = () => {
  const [tab, setTab] = useState<number>(0);

  // TODO: +опция "оставить только совпадающие с тэгами"
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const [typeNameAlt, setTypeNameAlt] = useState(defaultValueAlt);
  const [typeNameLatin, setTypeNameLatin] = useState(defaultValueLatin);

  const filterGroups: RadioGroupNameProps[] = [
    {
      id: "alt",
      title: "Альтернативные имена",
      actualType: typeNameAlt,
      onChangeActualType: setTypeNameAlt,
      isDisabled: typeNameLatin === "latin_names_only",
      modesName: modesNameAlt
    },
    {
      id: "latin",
      title: "Латинские имена",
      actualType: typeNameLatin,
      onChangeActualType: (newType: string) => {
        setTypeNameLatin(newType);
        if (newType === "latin_names_only")
          setTypeNameAlt("alt_names_without");
      },
      modesName: modesNameLatin
    }
  ]

  const handleTabChange = (_: React.SyntheticEvent<Element, Event>, newValue: number) => {
    setTab(newValue);
  }

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
          <Tabs centered value={tab} onChange={handleTabChange}>
            {GroupsPartsFamilies.map((group, index) => (
              <TabLabel
                key={`tab-${index}`}
                tabIndex={index}
                tabActual={tab}
                groupRange={{
                  max: group.max_species_length,
                  min: group.min_species_length
                }}
              />
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

          4. Группы (по Species Range)
            .0 ВИДЫ ГРАФИКОВ
              - горизонтальные столбики — "тупые" статистики (буквы, цифры, сравнение диапазонов и т.п,)
              - круговая диаграмма - показать разброс точек/диапазонов по многообразию видов спектра (1—386)
              - линейный график — основной график "N видов / M семейств"
              - ползунки — переключение "уровня"
            .1 УРОВНИ. Диапазоны на графике (ГОРИЗОНТАЛЬ)
            ГРАФИК
              1) общие наддиапазоны — по идущим подряд диапазоны (ACTUAL: 1-10X, 120-16X, 19X, 23X, 35X, 38X)
              2) более точные диапазоны, по видам подряд — (ACTUAL: 1-7,9-13, 18, 20,24,28-29, 31-34,38, 40, 43-45, ...)
              +опция "показ поверх наддиапазонов"
              3) точечный график (1 точка = 1 вид в семействе)
              +опция "показ только одиночных точек" (всё, кроме точек - бледным)
              .2 для КАЖДОЙ ТОЧКИ (и мб диапазонам) — возм-ть вывести список семейств (лат/рус)
            НАДПИСИ
              1) число семейств в наддиапазонах (одиночки — точки) (А ось Y? прямой линией? опция "1D/2D"?)
              2) число семейств в диапазонах (одиночки — точки)
              3) число семейств точечно (одиночки — точки)
            СТАТИСТИКИ:
              1) самый длительный диапазон (ур. 1/2)
              2) общее кол-во одиночных (ур 1/2)
              3) общее кол-во одиночных ур.2, включаемых в наддиапазоны ур.1
                  градуировка диапазонов цветом по частоте последовательности? (ур. 1/2)
            .2 Общая статистика
              - встречаемые буквы алфавита как 1 буква названия
                отсутствующие?...
                .1) отдельно для кажд диапазона/наддиапазона (ур. 1/2)
              - встречаемые буквы алфавита в названиях в принципе (MAIN/ALT/LATIN)
                отсутствующие?...
                .1) отдельно для кажд диапазона/наддиапазона (ур. 1/2)
              - статистика кол-ва повторений (семеств с одинаковым числом видов) - на общий график
        */}
      </section>

      <main>
        <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />} sx={{ justifyContent: "flex-end" }}>
          <section style={StyleCenteredWrapper}>
            <Grid container spacing={1} sx={StyleMainGrid}>
              {GroupsPartsFamilies.map((group, index) => (
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