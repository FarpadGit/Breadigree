import { ref } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import Collection from "@app/pages/collections/[slug].vue";
import {
  mockComponent,
  mockNuxtImport,
  mountSuspended,
} from "@nuxt/test-utils/runtime";
import { mockCategory } from "@test/mocks";

describe("Collection Page", async () => {
  let component: VueWrapper;

  const { useLazyFetchStub, navigateToStub, mockProductList } =
    await vi.hoisted(async () => {
      const mockProductList = (await import("@test/mocks")).mockProductList;
      return {
        useLazyFetchStub: vi.fn(() =>
          Promise.resolve({
            status: ref("success"),
            data: ref({ category: mockCategory, products: mockProductList }),
            error: ref(undefined),
          }),
        ),
        navigateToStub: vi.fn(),
        mockProductList,
      };
    });

  mockComponent("NuxtLayout", { template: "<div><slot/></div>" });
  mockNuxtImport("useSeoMeta", () => vi.fn());
  mockNuxtImport("useLazyFetch", () => useLazyFetchStub);
  mockNuxtImport("useRoute", () =>
    vi.fn(() => ({ params: { slug: mockCategory.slug } })),
  );
  mockNuxtImport("navigateTo", () => navigateToStub);

  async function mountComponent() {
    component = await mountSuspended(Collection);
  }

  it("should create", async () => {
    await mountComponent();

    expect(component.exists()).toBe(true);
  });

  it("should display 3 product cards if loading status is 'success'", async () => {
    await mountComponent();

    expect(component.findAllComponents({ name: "ProductModal" }).length).toBe(
      mockProductList.length,
    );
    expect(component.find("h1").text()).toBe(mockCategory.name);
    expect(component.find("[data-testid='loading-text']").exists()).toBe(false);
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
    expect(component.find("[data-testid='loading-text']").exists()).toBe(true);
  });

  it("should navigate to Products page if loading status is 'success' but the slug parameter is not for a valid collection", async () => {
    const stubValue = await useLazyFetchStub();
    useLazyFetchStub.mockResolvedValueOnce({
      ...stubValue,
      data: ref(undefined),
    });
    await mountComponent();

    expect(navigateToStub).toHaveBeenCalledWith("/products");
  });

  afterEach(() => {
    component?.unmount();
  });
});
