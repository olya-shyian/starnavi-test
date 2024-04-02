import { ReadonlyURLSearchParams } from "next/navigation";

// Extracts the ID from a given URL string
export const getIdFromUrl = (url: string): string | null => {
  const match = url.match(/(\d+)\/?$/);

  return match ? match[1] : null;
};

// Get a new searchParams string by merging the current
// searchParams with a provided key/value pair
export const createQueryString = (
  searchParams: ReadonlyURLSearchParams,
  name: string,
  value: string
) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set(name, value);

  return params.toString();
};
