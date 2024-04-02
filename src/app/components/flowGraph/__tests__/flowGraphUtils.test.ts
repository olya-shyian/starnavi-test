import { FormattedFilms } from "@/app/interfaces/IFilms";
import { generateEdges, generateNodes } from "../utils";
import { EDGE_TYPE } from "../consts";
import {
  heroeInfoMock,
  heroeInfoWithNoStarshipsMock,
} from "../__mocks__/flowGraphMock";

describe("generateNodes function", () => {
  it("should generate nodes for a hero with films and starships", () => {
    const heroeName = "Luke Skywalker";
    const nodes = generateNodes(heroeName, heroeInfoMock);

    expect(nodes.length).toBe(6);

    // Check the first node
    expect(nodes[0].id).toBe(heroeName);
    expect(nodes[0].data.label).toBe(heroeName);

    // Check the second node
    expect(nodes[1].id).toBe("A New Hope");
    expect(nodes[1].data.label).toBe("A New Hope");

    // Check the third node
    expect(nodes[2].id).toBe("X-Wing Starfighter");
    expect(nodes[2].data.label).toBe("X-Wing Starfighter");

    // Check the fourth node
    expect(nodes[3].id).toBe("Millennium Falcon");
    expect(nodes[3].data.label).toBe("Millennium Falcon");

    // Check the fifth node
    expect(nodes[4].id).toBe("The Empire Strikes Back");
    expect(nodes[4].data.label).toBe("The Empire Strikes Back");
  });

  it("should generate nodes for a hero with films but no starships", () => {
    const heroeName = "Darth Vader";
    const nodes = generateNodes(heroeName, heroeInfoWithNoStarshipsMock);

    expect(nodes.length).toBe(3);

    // Check the first node
    expect(nodes[0].id).toBe(heroeName);
    expect(nodes[0].data.label).toBe(heroeName);

    // Check the second node
    expect(nodes[1].id).toBe("A New Hope");
    expect(nodes[1].data.label).toBe("A New Hope");

    // Check the third node
    expect(nodes[2].id).toBe("The Empire Strikes Back");
    expect(nodes[2].data.label).toBe("The Empire Strikes Back");
  });

  it("should generate nodes for a hero with no films", () => {
    const heroeName = "Obi-Wan Kenobi";
    const heroeInfo: FormattedFilms[] = [];

    const nodes = generateNodes(heroeName, heroeInfo);

    expect(nodes.length).toBe(1);

    // Check the first node
    expect(nodes[0].id).toBe(heroeName);
    expect(nodes[0].data.label).toBe(heroeName);
  });
});

describe("generateEdges function", () => {
  it("should generate edges for a hero with films and starships", () => {
    const heroeName = "Luke Skywalker";
    const edges = generateEdges(heroeName, heroeInfoMock);

    expect(edges.length).toBe(5);

    // Check the first edge from hero to first film
    expect(edges[0].id).toBe(`e1-${heroeName}`);
    expect(edges[0].source).toBe(heroeName);
    expect(edges[0].target).toBe("A New Hope");
    expect(edges[0].type).toBe(EDGE_TYPE);
    expect(edges[0].animated).toBe(true);

    // Check the second edge from first film to first starship
    expect(edges[1].id).toBe(`e1-1-A New Hope`);
    expect(edges[1].source).toBe("A New Hope");
    expect(edges[1].target).toBe("X-Wing Starfighter");
    expect(edges[1].animated).toBe(true);

    // Check the third edge from first film to second starship
    expect(edges[2].id).toBe(`e1-2-A New Hope`);
    expect(edges[2].source).toBe("A New Hope");
    expect(edges[2].target).toBe("Millennium Falcon");

    // Check the fourth edge from hero to second film
    expect(edges[3].id).toBe(`e2-${heroeName}`);
    expect(edges[3].source).toBe(heroeName);
    expect(edges[3].target).toBe("The Empire Strikes Back");
    expect(edges[3].type).toBe(EDGE_TYPE);
    expect(edges[3].animated).toBe(true);

    // Check the fifth edge from second film to first starship
    expect(edges[4].id).toBe(`e2-1-The Empire Strikes Back`);
    expect(edges[4].source).toBe("The Empire Strikes Back");
    expect(edges[4].target).toBe("Snowspeeder");
  });

  it("should generate edges for a hero with films but no starships", () => {
    const heroeName = "Darth Vader";
    const edges = generateEdges(heroeName, heroeInfoWithNoStarshipsMock);

    expect(edges.length).toBe(2);

    // Check the first edge from hero to first film
    expect(edges[0].id).toBe(`e1-${heroeName}`);
    expect(edges[0].source).toBe(heroeName);
    expect(edges[0].target).toBe("A New Hope");
    expect(edges[0].animated).toBe(true);

    // Check the second edge from hero to second film
    expect(edges[1].id).toBe(`e2-${heroeName}`);
    expect(edges[1].source).toBe(heroeName);
    expect(edges[1].target).toBe("The Empire Strikes Back");
    expect(edges[1].type).toBe(EDGE_TYPE);
  });

  it("should generate edges for a hero with no films", () => {
    const heroeName = "Obi-Wan Kenobi";
    const heroeInfo: FormattedFilms[] = [];

    const edges = generateEdges(heroeName, heroeInfo);

    expect(edges.length).toBe(0);
  });
});
