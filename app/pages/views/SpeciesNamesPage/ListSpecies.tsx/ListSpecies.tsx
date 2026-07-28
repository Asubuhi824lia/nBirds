



export const ListSpecies = () => {

}


// ???
const calcName = (nameParts: string[], selectedNames: string[], name: string[]) =>
  nameParts && nameParts.length > 1
    ? (nameParts.map((value, i) => (
      <span
        key={`name=part-${i}`}
        style={selectedNames.includes(value.toLocaleLowerCase())
          ? { backgroundColor: "pink" }
          : {}
        }
      >{i === 0 ? ucFirst(value) : value}</span>
    )))
    // TODO: а если "nameRoot" и "name" пересекаются?
    : name

function ucFirst(str: string) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}