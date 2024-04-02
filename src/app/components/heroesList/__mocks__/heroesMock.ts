import { IHeroe } from "@/app/interfaces/IHeroe";

export const HeroesMock: IHeroe[] = [
  {
    birth_year: "19BBY",
    eye_color: "Blue",
    films: [1, 2, 3, 4, 5, 6],
    gender: "Male",
    hair_color: "Blond",
    height: "172",
    homeworld: 1,
    mass: "77",
    name: "Luke Skywalker",
    skin_color: "Fair",
    created: "2022-01-01T00:00:00.000Z",
    edited: "2022-01-01T00:00:00.000Z",
    species: [1],
    starships: [1, 2, 3],
    url: "https://swapi.dev/api/people/1/",
    vehicles: [1, 2],
  },
  {
    birth_year: "112BBY",
    eye_color: "Yellow",
    films: [1, 2, 3],
    gender: "Female",
    hair_color: "Brown",
    height: "150",
    homeworld: 2,
    mass: "49",
    name: "Leia Organa",
    skin_color: "Light",
    created: "2022-01-01T00:00:00.000Z",
    edited: "2022-01-01T00:00:00.000Z",
    species: [1],
    starships: [3, 4],
    url: "https://swapi.dev/api/people/2/",
    vehicles: [3, 4],
  },
];