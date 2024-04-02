"use client";

import axios from "axios";
import FlowGraph from "@/app/components/flowGraph/FlowGraph";
import { getIdFromUrl } from "@/app/utils/generalUtils";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  addStarshipsToFilms,
  fetchStarshipsRecursively,
  getIdsAsString,
} from "./utils";
import { FormattedFilms } from "@/app/interfaces/IFilms";
import useErrorHandler from "@/app/hooks/useErrorHandler";
import { ErrorsEnum } from "@/app/enums/ErrorsEnum";

const HeroeGraph = ({ params }: { params: { slug: string } }) => {
  const searchParams = useSearchParams();
  const selectedHeroe = searchParams.get("name") as string;

  const [heroeInfo, setHeroeInfo] = useState<FormattedFilms[]>([]);
  const { setError, renderError } = useErrorHandler();

  useEffect(() => {
    const fetchStarships = async () => {
      try {
        // First API request to get films related to the hero
        const filmsFromServer = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/films/?characters__in=${params.slug}`
        );

        // Formatting the film data with title and id
        const formattedFilms = filmsFromServer.data.results.map(
          ({ title, url }: any) => ({ title, id: getIdFromUrl(url) })
        );

        // Get comma-separated ids of films
        const ids = getIdsAsString(formattedFilms);

        const allStarships = await fetchStarshipsRecursively(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/starships/?films__in=${ids}`,
          setError
        );

        // Adding starship information to each film
        const heroeData = addStarshipsToFilms(allStarships, formattedFilms);

        setHeroeInfo(heroeData);
      } catch (error) {
        setError({
          name: ErrorsEnum.LoadName,
          message: ErrorsEnum.LoadMessage,
        });
      }
    };

    fetchStarships();
  }, [params.slug, setError]);

  return (
    <>
      {renderError()}

      {!!heroeInfo.length && (
        <FlowGraph heroeName={selectedHeroe} heroeInfo={heroeInfo} />
      )}
    </>
  );
};

export default HeroeGraph;
