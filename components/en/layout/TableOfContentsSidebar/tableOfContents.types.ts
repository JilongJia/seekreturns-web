export type TableOfContentsData = {
  id: string;
  label: string;
  subHeadingsData?: SubHeadingsData;
}[];

type SubHeadingsData = { id: string; label: string }[];
