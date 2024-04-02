export interface FormattedFilms {
  title: string;
  id: string;
  starships?: {
    id: string;
    name: string;
  }[];
}
