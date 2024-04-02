import { FormattedFilms } from "@/app/interfaces/IFilms";

export const heroeInfoMock: FormattedFilms[] = [
  {
    title: "A New Hope",
    id: "1",
    starships: [
      { id: "1", name: "X-Wing Starfighter" },
      { id: "2", name: "Millennium Falcon" },
    ],
  },
  {
    title: "The Empire Strikes Back",
    id: "2",
    starships: [{ id: "3", name: "Snowspeeder" }],
  },
];

export const heroeInfoWithNoStarshipsMock: FormattedFilms[] = [
  {
    title: "A New Hope",
    id: "1",
  },
  {
    title: "The Empire Strikes Back",
    id: "2",
  },
];

export const starshipsMock = [
  {
    MGLT: "75",
    cargo_capacity: "100000",
    consumables: "2 months",
    cost_in_credits: "3500000",
    created: "2014-12-12T11:05:37.420000Z",
    crew: "4",
    edited: "2014-12-22T17:35:44.431407Z",
    hyperdrive_rating: "1.0",
    length: "34.37",
    manufacturer: "Kuat Drive Yards",
    max_atmosphering_speed: "950",
    model: "Sentinel-class landing craft",
    name: "Sentinel-class landing craft",
    passengers: "75",
    films: [1, 2], // Example film IDs
    pilots: [],
    starship_class: "landing craft",
    url: "https://swapi.dev/api/starships/5/",
  },
  {
    MGLT: "10",
    cargo_capacity: "110",
    consumables: "1 week",
    cost_in_credits: "8000",
    created: "2014-12-15T12:31:42.547000Z",
    crew: "2",
    edited: "2014-12-20T21:23:49.897000Z",
    hyperdrive_rating: "1.0",
    length: "20",
    manufacturer: "Sienar Fleet Systems",
    max_atmosphering_speed: "1050",
    model: "TIE/LN starfighter",
    name: "TIE/LN starfighter",
    passengers: "0",
    films: [1], // Example film IDs
    pilots: [],
    starship_class: "Starfighter",
    url: "https://swapi.dev/api/starships/6/",
  },
];
