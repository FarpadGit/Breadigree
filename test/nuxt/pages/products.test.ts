import { ref } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import Products from "@app/pages/products/index.vue";
import {
  mockComponent,
  mockNuxtImport,
  mountSuspended,
} from "@nuxt/test-utils/runtime";

describe("Products Page", async () => {
  let component: VueWrapper;

  const { useLazyFetchStub, mockGroupedResponse } = await vi.hoisted(
    async () => {
      const { mockProductList, mockCategory } = await import("@test/mocks");
      const mockGroupedResponse = {
        [mockCategory.name]: mockProductList,
        [mockCategory.name + "2"]: mockProductList,
      };
      return {
        useLazyFetchStub: vi.fn(() =>
          Promise.resolve({
            status: ref("success"),
            data: ref(mockGroupedResponse),
            error: ref(undefined),
          }),
        ),
        mockGroupedResponse,
      };
    },
  );

  mockComponent("NuxtLayout", { template: "<div><slot/></div>" });
  mockNuxtImport("useSeoMeta", () => vi.fn());
  mockNuxtImport("useLazyFetch", () => useLazyFetchStub);

  async function mountComponent() {
    component = await mountSuspended(Products);
  }

  it("should create", async () => {
    await mountComponent();

    expect(component.exists()).toBe(true);
  });

  it("should display 2 subsections of a category header followed by 3 product cards if loading status is 'success'", async () => {
    const categories = Object.keys(mockGroupedResponse);
    const productLists = categories.map((cat) => mockGroupedResponse[cat]);
    await mountComponent();

    const h2 = component.findAll("h2");
    const productGrids = component.findAll("[data-testid='product-grid']");
    expect(h2.length).toBe(2);
    expect(h2[0].text()).toBe(categories[0]);
    expect(h2[1].text()).toBe(categories[1]);
    expect(productGrids.length).toBe(2);
    expect(
      productGrids[0].findAllComponents({ name: "ProductModal" }).length,
    ).toBe(productLists[0].length);
    expect(
      productGrids[1].findAllComponents({ name: "ProductModal" }).length,
    ).toBe(productLists[1].length);
  });

  it("should display some loading skeletons and a loading text if loading status is 'pending'", async () => {
    const stubValue = await useLazyFetchStub();
    useLazyFetchStub.mockResolvedValueOnce({
      ...stubValue,
      status: ref("pending"),
    });
    await mountComponent();

    expect(component.findAllComponents({ name: "SkeletonCard" }).length).toBe(
      6,
    );
    expect(component.findAllComponents({ name: "ProductModal" }).length).toBe(
      0,
    );
  });

  afterEach(() => {
    component?.unmount();
  });
});
