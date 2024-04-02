import { FormattedFilms } from "@/app/interfaces/IFilms";
import { IStarships } from "@/app/interfaces/IStarships";
import { getIdFromUrl } from "@/app/utils/generalUtils";

// Combines starship data with film data to create a new array
// with film details and corresponding starship information.
export const addStarshipsToFilms = (
  data: IStarships[],
  formattedFilms: FormattedFilms[]
) => {
  return formattedFilms.map((film) => {
    const { id } = film;

    const starships = data.reduce(
      (acc: { id: string; name: string }[], { films, url, name }) => {
        if (films && films.includes(Number(id))) {
          const idFromUrl = getIdFromUrl(url);

          if (idFromUrl) {
            acc.push({ id: idFromUrl, name });
          }
        }

        return acc;
      },
      []
    );

    return { ...film, starships };
  });
};

// Get comma-separated ids from array of objects
export const getIdsAsString = (array: { id: string }[]): string => {
  const ids = array.map(({ id }: { id: string }) => id).join(",");

  return ids;
};
