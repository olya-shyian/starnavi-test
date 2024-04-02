import { ErrorsEnum } from "@/app/enums/ErrorsEnum";
import { FormattedFilms } from "@/app/interfaces/IFilms";
import { IStarships } from "@/app/interfaces/IStarships";
import { getIdFromUrl } from "@/app/utils/generalUtils";
import axios from "axios";

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

// Recursively fetches starships from the API because according to the backend logic,
// we cannot get all the data in a single request
export const fetchStarshipsRecursively = async (
  url: string,
  setError: Function
) => {
  try {
    const starshipsFromServer = await axios.get(url);

    let allStarships = starshipsFromServer.data.results;

    // If there is a link to the next page, recursively call the function
    if (starshipsFromServer.data.next) {
      const additionalStarships = await fetchStarshipsRecursively(
        starshipsFromServer.data.next,
        setError
      );
      allStarships = [...allStarships, ...additionalStarships];
    }

    // Return the list of all starships
    return allStarships;
  } catch (error) {
    setError({
      name: ErrorsEnum.LoadName,
      message: ErrorsEnum.LoadMessage,
    });

    return []; // Return an empty array in case of an error
  }
};
