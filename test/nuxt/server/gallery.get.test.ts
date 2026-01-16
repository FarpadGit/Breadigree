import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import {
  useH3TestUtils,
  createMockH3Event,
  mockFetchData,
} from "@test/nuxtMocks";
import { mockWPImage } from "@test/mocks";

const { defineEventHandler } = useH3TestUtils();

describe("GET /api/gallery", async () => {
  vi.mock("~~/server/utils/fetchData", () => mockFetchData);

  // Dynamically import the handler *after* mocks are set up
  const handler = (await import("@app/../server/api/gallery.get")).default;

  it("should register as an event handler", () => {
    expect(defineEventHandler).toHaveBeenCalled();
  });

  it("should return the source URLs of the Wordpress gallery collection from the Wordpress backend", async () => {
    const expectedValue = [mockWPImage.source_url];
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
