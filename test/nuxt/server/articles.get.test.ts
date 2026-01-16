import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import {
  useH3TestUtils,
  createMockH3Event,
  mockFetchData,
} from "@test/nuxtMocks";
import { mockArticleList } from "@test/mocks";

const { defineEventHandler } = useH3TestUtils();

describe("GET /api/articles", async () => {
  vi.mock("~~/server/utils/fetchData", () => mockFetchData);

  // Dynamically import the handler *after* mocks are set up
  const handler = (await import("@app/../server/api/articles.get")).default;

  it("should register as an event handler", () => {
    expect(defineEventHandler).toHaveBeenCalled();
  });

  it("should return the client side representations of article posts from the Wordpress backend", async () => {
    const expectedValue = mockArticleList.map((article) => ({
      ...article,
      uploadDate: "1970-01-01",
    }));
    const event = createMockH3Event({
      method: "GET",
    });

    const response = await handler(event);

    expect(response).toEqual(expectedValue);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });
});
