import { ref } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import Articles from "@app/pages/articles/index.vue";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";

describe("Articles Page", async () => {
  let component: VueWrapper;

  const { useLazyFetchStub, mockArticleList } = await vi.hoisted(async () => {
    const mockArticleList = (await import("@test/mocks")).mockArticleList;
    return {
      useLazyFetchStub: vi.fn(() =>
        Promise.resolve({
          status: ref("success"),
          data: ref(mockArticleList),
          error: ref(undefined),
        }),
      ),
      mockArticleList,
    };
  });

  mockNuxtImport("useLazyFetch", () => useLazyFetchStub);

  async function mountComponent() {
    component = await mountSuspended(Articles);
  }

  it("should create", async () => {
    await mountComponent();

    expect(component.exists()).toBe(true);
  });

  it("should display 3 article cards if loading status is 'success'", async () => {
    await mountComponent();

    expect(component.findAllComponents({ name: "ArticleCard" }).length).toBe(
      mockArticleList.length,
    );
  });

  it("should display some skeleton cards if loading status is 'pending'", async () => {
    const stubValue = await useLazyFetchStub();
    useLazyFetchStub.mockImplementationOnce(() =>
      Promise.resolve({ ...stubValue, status: ref("pending") }),
    );
    await mountComponent();

    expect(component.findAllComponents({ name: "SkeletonCard" }).length).toBe(
      4,
    );
  });

  it("should display a text if loading status is 'success' but no articles are returned", async () => {
    const stubValue = await useLazyFetchStub();
    useLazyFetchStub.mockImplementationOnce(() =>
      Promise.resolve({ ...stubValue, data: ref([]) }),
    );
    await mountComponent();

    expect(component.findAllComponents({ name: "ArticleCard" }).length).toBe(0);
    expect(component.find("#empty-list-text").exists()).toBe(true);
  });

  afterEach(() => {
    component?.unmount();
  });
});
