import { afterEach, describe, expect, it } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import ArticleCard from "@app/components/ArticleCard.vue";
import { mockArticle } from "@test/mocks";

describe("ArticleCard", () => {
  let component: VueWrapper;

  async function mountComponent(article: articleType) {
    component = await mountSuspended(ArticleCard, {
      props: {
        article,
      },
    });
  }

  it("should create", async () => {
    await mountComponent(mockArticle);

    expect(component.exists()).toBe(true);
  });

  it("should display a card with the title, excerpt, upload date and featured image of the article", async () => {
    await mountComponent(mockArticle);
    const formattedDate = mockArticle.uploadDate.toLocaleDateString("hu-HU", {
      dateStyle: "long",
    } as Intl.DateTimeFormatOptions);

    expect(component.text().toUpperCase()).toContain(
      mockArticle.title.toUpperCase()
    );
    expect(component.text().toUpperCase()).toContain(
      mockArticle.excerpt.toUpperCase()
    );
    expect(component.text().toUpperCase()).toContain(
      formattedDate.toUpperCase()
    );
    expect(
      component.find(`img[src*='${mockArticle.featureImage}']`).exists()
    ).toBe(true);
  });

  it("should display as a link to the article's page", async () => {
    await mountComponent(mockArticle);

    expect(
      component.find(`a[href='/articles/${mockArticle.slug}']`).exists()
    ).toBe(true);
  });

  afterEach(() => {
    component.unmount();
  });
});
