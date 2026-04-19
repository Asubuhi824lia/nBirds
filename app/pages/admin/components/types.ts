import type { FieldsDataBlocksIdsKeys } from "../utils";
import fieldsData from "../utils/fieldsData.json";
// вынести в useContext()

export type FieldBlocksKeys = keyof typeof fieldsData;
export type FieldBlocksType = {
  name: string;
  blocks: Array<FieldDataType>;
};
type FieldCommonType = typeof fieldsData.blockFacts.blocks[0];
export type FieldDataType = Omit<FieldCommonType, "id"> & { id: FieldsDataBlocksIdsKeys };
