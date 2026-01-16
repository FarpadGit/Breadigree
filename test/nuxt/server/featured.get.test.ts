import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import {
  useH3TestUtils,
  createMockH3Event,
  mockFetchData,
} from "@test/nuxtMocks";
import {
  mockFeaturedProduct,
  mockFeaturedWPProduct,
  mockWPProduct,
} from "@test/mocks";

const { defineEventHandler } = useH3TestUtils();

describe("GET /api/products/featured", async () => {
  vi.mock("~~/server/utils/fetchData", () => mockFetchData);

  // Dynamically import the handler *after* mocks are set up
  const handler = (await import("@app/../server/api/products/featured.get"))
    .default;

  it("should register as an event handler", () => {
    expect(defineEventHandler).toHaveBeenCalled();
  });

  it("should return the client side representations of featured Wordpress products from the Wordpress backend", async () => {
    mockFetchData.fetchProducts.mockResolvedValueOnce([
      mockWPProduct,
      mockFeaturedWPProduct,
    ]);
    const expectedValue = [mockFeaturedProduct];
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
