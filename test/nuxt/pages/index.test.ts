import { ref } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import Home from "@app/pages/index.vue";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";

describe("Home Page", async () => {
  let component: VueWrapper;

  const { useLazyFetchStub, mockFeatured, mockGallery, mockArticles } =
    await vi.hoisted(async () => {
      const {
        mockCategory,
        mockFeaturedProduct,
        mockWPImage,
        mockArticleList,
      } = await import("@test/mocks");
      const mockCategories = [mockCategory];
      const mockFeatured = [mockFeaturedProduct];
      const mockGallery = [mockWPImage.source_url];
      const mockArticles = mockArticleList.map((article) => ({
        ...article,
        uploadDate: "1970-01-01",
      }));
      return {
        useLazyFetchStub: vi.fn((params) => {
          let data: any[];
          if (params === "/api/categories") data = mockCategories;
          if (params === "/api/products/featured") data = mockFeatured;
          if (params === "/api/gallery") data = mockGallery;
          if (params === "/api/articles") data = mockArticles;

          return Promise.resolve({
            status: ref("success"),
            data: ref(data),
            error: ref(undefined),
          });
        }),
        mockFeatured,
        mockGallery,
        mockArticles,
      };
    });

  mockNuxtImport("useLazyFetch", () => useLazyFetchStub);
  mockNuxtImport("useSeoMeta", () => vi.fn());

  async function mountComponent() {
    component = await mountSuspended(Home);
  }

  it("should create", async () => {
    await mountComponent();

    expect(component.exists()).toBe(true);
  });

  it("should display 5 section elements for hero, featured, about, gallery and articles", async () => {
    await mountComponent();

    expect(component.findAll("section").length).toBe(5);
    expect(component.find("section#hero").exists()).toBe(true);
    expect(component.find("section#featured").exists()).toBe(true);
    expect(component.find("section#about").exists()).toBe(true);
    expect(component.find("section#gallery").exists()).toBe(true);
    expect(component.find("section#articles").exists()).toBe(true);
    expect(
      component
        .get("section#featured")
        .findAllComponents({ name: "ProductModal" }).length,
    ).toBe(mockFeatured.length);
    expect(
      component
        .get("section#gallery")
        .findAllComponents({ name: "GalleryModal" }).length,
    ).toBe(mockGallery.length);
    expect(
      component
        .get("section#articles")
        .findAllComponents({ name: "ArticleCard" }).length,
    ).toBe(mockArticles.length);
  });

  afterEach(() => {
    component?.unmount();
  });
});
