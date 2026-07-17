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

import { Card, CardContent, CardHeader, Grid, List, ListItem } from "@mui/material"
// TODO: variable — fromLowerCase
import { FamiliesGroups } from "./data/FamiliesGroups"



/**main List
 * 
 * ListUnions
 * CardUnion
 */


export const SpeciesNamesPage = () => {
  return (
    <section
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: "column",
        width: '80%'
      }}
    >
      {/* TODO: header */}

      <Grid container spacing={1} sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
        {FamiliesGroups.map((group, index) => (
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
        ))}
      </Grid>
    </section>
  )
}
