import { vi } from "vitest";
import type { H3Event, EventHandlerRequest } from "h3";
import {
  mockWPCategory,
  mockWPGallery,
  mockWPImage,
  mockWPPostList,
  mockWPProduct,
  mockWPProductList,
} from "./mocks";

export function createMockH3Event(
  partialEvent: Partial<H3Event> & {
    body?: Record<string, any>;
    params?: Record<string, any>;
    method?: "GET" | "POST";
  },
): H3Event {
  const event = {
    node: {
      req: {
        headers: { "content-type": "application/json" },
        method: partialEvent.method || "POST",
      },
    },
    context: {
      params: partialEvent.params || {},
    },
    // Our mock readBody function will look for this property
    _requestBody: partialEvent.body,
    ...partialEvent,
  } as unknown as H3Event;

  return event as H3Event;
}

type Handler = (event: H3Event<EventHandlerRequest>) => Promise<unknown>;

export function useH3TestUtils() {
  const h3 = vi.hoisted(() => ({
    defineEventHandler: vi.fn((handler: Handler) => handler),
    readBody: vi.fn(async (event: H3Event) => {
      if (event._requestBody && typeof event._requestBody === "string") {
        return JSON.parse(event._requestBody);
      }
      return event._requestBody || {};
    }),
    getRouterParam: vi.fn(
      (event: H3Event, key: string) => event.context?.params?.[key] || {},
    ),
  }));

  // Stubbing global auto-imported functions
  vi.stubGlobal("defineEventHandler", h3.defineEventHandler);
  vi.stubGlobal("readBody", h3.readBody);
  vi.stubGlobal("getRouterParam", h3.getRouterParam);

  return h3;
}

export const mockFetchData = {
  fetchImages: vi.fn(() => Promise.resolve([mockWPImage])),
  fetchImage: vi.fn(() => Promise.resolve(mockWPImage)),
  fetchGallery: vi.fn(() => Promise.resolve([mockWPGallery])),
  fetchProducts: vi.fn(() => Promise.resolve(mockWPProductList)),
  fetchProduct: vi.fn(() => Promise.resolve(mockWPProduct)),
  fetchCategories: vi.fn(() => Promise.resolve([mockWPCategory])),
  fetchCategory: vi.fn(() => Promise.resolve(mockWPCategory)),
  fetchCategoryBySlug: vi.fn(() => Promise.resolve(mockWPCategory)),
  fetchPosts: vi.fn(() => Promise.resolve(mockWPPostList)),
};
