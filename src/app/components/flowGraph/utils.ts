import { FormattedFilms } from "@/app/interfaces/IFilms";
import { Edge, Node, Position } from "reactflow";
import dagre from "dagre";
import { EDGE_TYPE, NODE_HEIGHT, NODE_WIDTH, POSITION } from "./consts";
import { DirectionEnum } from "@/app/enums/DirectionEnum";

// Function to generate nodes for the graph
export const generateNodes = (
  heroeName: string,
  heroeInfo: FormattedFilms[]
) => {
  const nodes: Node[] = [
    {
      id: heroeName,
      data: { label: heroeName },
      style: { background: "#ff8c94", color: "#fff", borderColor: "#fff" },
      position: POSITION,
    }, // First node with the hero's name
  ];

  // Add nodes for each film in which the heroe appeared
  heroeInfo.forEach((film) => {
    const { title, starships } = film;

    nodes.push({
      id: title,
      data: { label: title },
      style: { background: "#3b5a9d", color: "#fff", borderColor: "#fff" },
      position: POSITION,
    });

    // Add nodes for each starship from the films
    starships &&
      starships.forEach((starship) => {
        const { name } = starship;
        nodes.push({
          id: name,
          data: { label: name },
          style: { background: "#35375a", color: "#fff", borderColor: "#fff" },
          position: POSITION,
        });
      });
  });

  return nodes;
};

// Function to generate edges for the graph
export const generateEdges = (
  heroeName: string,
  heroeInfo: FormattedFilms[]
) => {
  const edges: Edge[] = [];

  // Add connections from hero to each film
  heroeInfo.forEach((film, filmIndex) => {
    const { title, starships } = film;

    edges.push({
      id: `e${filmIndex + 1}-${heroeName}`,
      source: heroeName,
      target: title,
      type: EDGE_TYPE,
      animated: true,
    });

    // Add connections from each film to each starship
    starships &&
      starships.forEach((starship, starshipIndex) => {
        const { name } = starship;

        edges.push({
          id: `e${filmIndex + 1}-${starshipIndex + 1}-${title}`,
          source: title,
          target: name,
          type: EDGE_TYPE,
          animated: true,
        });
      });
  });

  return edges;
};

// Function to layout the elements using dagre (from right to left or from top to bottom)
export const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction = DirectionEnum.TopToBottom
) => {
  // Create a new dagre graph in order to set the direction for the layout of nodes in the graph.
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const isHorizontal = direction === DirectionEnum.LeftToRight;
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);

    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - NODE_WIDTH / 2,
      y: nodeWithPosition.y - NODE_HEIGHT / 2,
    };

    return node;
  });

  return { nodes, edges };
};
