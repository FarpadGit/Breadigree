import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import {
  useH3TestUtils,
  createMockH3Event,
  mockFetchData,
} from "@test/nuxtMocks";
import { mockCategory, mockProductList } from "@test/mocks";

const { defineEventHandler } = useH3TestUtils();

describe("GET /api/products", async () => {
  vi.mock("~~/server/utils/fetchData", () => mockFetchData);

  // Dynamically import the handler *after* mocks are set up
  const handler = (await import("@app/../server/api/products.get")).default;

  it("should register as an event handler", () => {
    expect(defineEventHandler).toHaveBeenCalled();
  });

  it("should return a grouped list of the client side representations of every Wordpress category and every Wordpress product that belongs under it from the Wordpress backend", async () => {
    const expectedValue = { [mockCategory.name]: mockProductList };
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
