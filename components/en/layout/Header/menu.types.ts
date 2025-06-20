export type PrimaryMenuData = {
  id: string;
  label: string;
  pathname?: string;
  secondaryMenu?: SecondaryMenuData;
}[];

export type SecondaryMenuData = {
  id: string;
  label: string;
  pathname: string;
}[];
