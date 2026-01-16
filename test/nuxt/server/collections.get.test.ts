import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import {
  useH3TestUtils,
  createMockH3Event,
  mockFetchData,
} from "@test/nuxtMocks";
import { mockCategory, mockProductList } from "@test/mocks";

const { defineEventHandler } = useH3TestUtils();

describe("GET /api/collections/[category]", async () => {
  vi.mock("~~/server/utils/fetchData", () => mockFetchData);

  // Dynamically import the handler *after* mocks are set up
  const handler = (
    await import("@app/../server/api/collections/[category].get")
  ).default;

  it("should register as an event handler", () => {
    expect(defineEventHandler).toHaveBeenCalled();
  });

  it("should return the client side representations of the Wordpress category and its products fetched from the Wordpress backend", async () => {
    const expectedValue = {
      category: mockCategory,
      products: mockProductList,
    };
    const event = createMockH3Event({
      params: { category: "mockID" },
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
