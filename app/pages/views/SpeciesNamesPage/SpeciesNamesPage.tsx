/**
 * Визуализация отношения «отряд: семейство —> виды»
 * 
 * Доп.:
 * «класс: отряд —> семейства»
 * «отряд: семейство —> рода»
 * «отряд: род —> виды»
 */

import { Box, Container, Divider, Grid, Stack, Tabs, Typography } from "@mui/material"
// TODO: variable — fromLowerCase
import { useState } from "react"
import { FiltersNaming, type RadioGroupNameProps } from "./components/Filters/FiltersNaming";
import { StyleMainContainer, StylePageSection, StyleHeaderTabsBox, StyleMainGrid, StyleCenteredWrapper } from "./styles";
import SelectNamePart from "./components/SelectNamePart";
import { CardRange } from "./components/CardRange/CardRange";
import { defaultValueAlt, defaultValueLatin, modesNameAlt, modesNameLatin } from "./data";
import { CustomTabPanel, TabLabel } from "./components/Filters/FiltersClassifications";
import { GroupsPartsFamilies, type RootGroupType } from "./utils";
import { nameRootGroups } from "./components/SelectNamePart/data";
import { ListNamePart } from "./ListNamePart";


export type CountType = "G" | "F" | "S";

export const SpeciesNamesPage = () => {
  // TABs states
  const [tab, setTab] = useState<number>(0);
  const stateCountType = useState<CountType>("G");
  const [isModeActive, setIsModeActive] = useState<boolean>(true); // TODO: rename

  // TODO: +опция "оставить только совпадающие с тэгами"
  const [selectedNames, setSelectedNames] = useState<RootGroupType[]>([]);

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

  const handleNameRootsSelected = (selected: string[]) => {
    // преобразовать, присвоив группу заранее | для всех
    const rootGroups: RootGroupType[] = selected.map((root) => ({
      root,
      groupId: nameRootGroups.find(({ roots }) => roots.includes(root))?.id ?? 0
    }))
    setSelectedNames(rootGroups);

    // поиск и мутирвоание (дополнение) данных
    GroupsPartsFamilies.forEach((group) => {
      group.families.forEach((part) => {
        part[1].forEach((family) => {
          const name = (family.name || family.alternative_names?.[0])?.toLowerCase();
          if (!name)
            return;

          const curSelectedGroups = rootGroups.filter((root) => name.includes(root.root.toLowerCase()));

          // TODO: вроде работает, но переделать на покорректнее
          // GroupsPartsFamilies[groupId].families[partId][1][familyId].SelectedGroups = [...curSelectedGroups];
          family.SelectedGroups = [...curSelectedGroups];
        })
      })
    })
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
          <Tabs centered value={tab} onChange={(_, newValue) => setTab(newValue)}>
            {GroupsPartsFamilies.map((group, index) => (
              <TabLabel
                key={`tab-${index}`}
                tabIndex={index}
                tabActual={tab}
                group={group}
                isModeActive={isModeActive}
                stateCountType={[
                  stateCountType[0],
                  (value: React.SetStateAction<CountType>) => {
                    setIsModeActive((prev) => value !== stateCountType[0] || !prev)

                    stateCountType[1](value);
                  }
                ]}
              />
              // stateModeActive
            ))}
          </Tabs>
        </Box>
      </header>

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

            <section style={{ maxWidth: "350px" }}>
              <Typography sx={{ marginBottom: 2, fontWeight: 500 }}>Поиск</Typography>
              <SelectNamePart curValue={selectedNames.map(root => root.root)} onChange={handleNameRootsSelected} />
              <ListNamePart
                GroupsPartsFamiliesSelected={
                  GroupsPartsFamilies
                    .map(({ families, ...others }) => ({
                      ...others,
                      families:
                        families
                          .filter((group) => group[1].filter(({ SelectedGroups }) => SelectedGroups?.length).length)
                          .map((group) => ([
                            group[0],
                            group[1]
                              .filter((group) =>
                                group.SelectedGroups
                              )
                            // TODO
                          ]))
                    }))
                }
              />
            </section>
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


{/* <section> */ }
// TODO: add new Widget later
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
{/* </section> */ }