import { ref } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import Article from "@app/pages/articles/[slug].vue";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import { mockArticle } from "@test/mocks";

describe("Article Page", async () => {
  let component: VueWrapper;

  const { useLazyFetchStub, useRouteStub, navigateToStub, mockArticleList } =
    await vi.hoisted(async () => {
      const mockArticleList = (await import("@test/mocks")).mockArticleList;
      return {
        useLazyFetchStub: vi.fn(() =>
          Promise.resolve({
            status: ref("success"),
            data: ref(mockArticleList),
            error: ref(undefined),
          }),
        ),
        useRouteStub: vi.fn(() => ({ params: { slug: mockArticle.slug } })),
        navigateToStub: vi.fn(),
        mockArticleList,
      };
    });

  mockNuxtImport("useLazyFetch", () => useLazyFetchStub);
  mockNuxtImport("useRoute", () => useRouteStub);
  mockNuxtImport("navigateTo", () => navigateToStub);

  async function mountComponent() {
    component = await mountSuspended(Article);
  }

  it("should create", async () => {
    await mountComponent();

    expect(component.exists()).toBe(true);
  });

  it("should display a feature image, article title, article body and a table of contents for all articles if loading status is 'success'", async () => {
    await mountComponent();

    expect(
      component.find(`img[src*='${mockArticle.featureImage}']`).exists(),
    ).toBe(true);
    expect(component.text()).toContain(mockArticle.title);
    expect(component.text()).toContain(mockArticle.body);
    mockArticleList.forEach((article) => {
      expect(
        component.find(`a[href='/articles/${article.slug}']`).exists(),
      ).toBe(true);
      expect(component.get(`a[href='/articles/${article.slug}']`).text()).toBe(
        article.title,
      );
    });
  });

  it("should display a loading skeleton if loading status is 'pending'", async () => {
    const stubValue = await useLazyFetchStub();
    useLazyFetchStub.mockResolvedValueOnce({
      ...stubValue,
      status: ref("pending"),
    });
    await mountComponent();

    expect(
      component.find(`img[src*='${mockArticle.featureImage}']`).exists(),
    ).toBe(false);
    expect(component.text()).not.toContain(mockArticle.title);
    expect(component.text()).not.toContain(mockArticle.body);
    mockArticleList.forEach((article) => {
      expect(
        component.find(`a[href='/articles/${article.slug}']`).exists(),
      ).toBe(false);
    });
  });

  it("should navigate to homepage if loading status is 'success' but the slug parameter is not for a valid article", async () => {
    useRouteStub.mockReturnValue({ params: { slug: "bad-slug" } });
    await mountComponent();

    expect(navigateToStub).toHaveBeenCalledWith("/");
  });

  afterEach(() => {
    component?.unmount();
    useRouteStub.mockReset();
  });
});
