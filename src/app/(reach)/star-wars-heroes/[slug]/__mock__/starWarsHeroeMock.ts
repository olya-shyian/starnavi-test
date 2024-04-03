export const starshipsFromServerPage1Mock = {
  data: {
    results: [{ name: "Starship 1" }],
    next: "http://example.com/api/starships/?page=2",
  },
};

export const starshipsFromServerPage2Mock = {
  data: {
    results: [{ name: "Starship 2" }],
    next: null,
  },
};
