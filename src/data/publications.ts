export interface Publication {
  title: string;
  year: number;
  venue: string;
  doi: string | null;
  citedBy: number;
  openAccessUrl: string | null;
  type: string | null;
}

export { publications, publicationsFetchedAt } from "./publications.generated";
