export enum ItemType { MenuItem = 0, ListSubheader = 1 };

export interface NameRootGroup {
  groupId: number;
  label: string;
  type: ItemType;
}