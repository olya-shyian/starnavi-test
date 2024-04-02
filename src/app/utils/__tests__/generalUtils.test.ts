import { getIdFromUrl } from "../generalUtils";

describe("getIdFromUrl function", () => {
  it("should return ID from URL", () => {
    const url = "https://example.com/api/123";
    const id = getIdFromUrl(url);
    expect(id).toEqual("123");
  });

  it("should return null it there is no number in the end of the url", () => {
    const url = "https://example.com/api/";
    const id = getIdFromUrl(url);
    expect(id).toBeNull();
  });

  it("should return null for non-matching URL", () => {
    const url = "https://example.com/56/api/some-text";
    const id = getIdFromUrl(url);
    expect(id).toBeNull();
  });
});
