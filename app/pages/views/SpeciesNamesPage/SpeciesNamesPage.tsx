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

import { List, ListItem } from "@mui/material"
// TODO: variable — fromLowerCase
import { FamiliesGroups } from "./data/FamiliesGroups"



/**main List
 * 
 * ListUnions
 * CardUnion
 */


export const SpeciesNamesPage = () => {
  return (
    <section>
      {/* TODO: header */}

      <List>
        {FamiliesGroups.map((group, index) =>
          group.families.map((family, ind) => (
            <ListItem key={`group-${index}-family-${ind}`}>
              {family.name || family.latin_name} — {family.species_length}
            </ListItem>
          ))
        )}
      </List>
    </section>
  )
}
