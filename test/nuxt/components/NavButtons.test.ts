import { afterEach, describe, expect, it } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import NavButtons from "@app/components/NavButtons.vue";

describe("NavButtons", () => {
  let component: VueWrapper;

  async function mountComponent(props?: {
    fillBackground?: boolean;
    layout?: "center" | "left" | "mobile";
  }) {
    component = await mountSuspended(NavButtons, {
      props,
    });
  }

  it("should create", async () => {
    await mountComponent();

    expect(component.exists()).toBe(true);
  });

  it("should display 4 nav buttons for each page + a logo button for the home page", async () => {
    await mountComponent();

    expect(component.findAll("a").length).toBe(5);
    expect(component.find("a[href='/']").exists()).toBe(true);
    expect(component.get("a[href='/']").find("img").exists()).toBe(true);
    expect(component.find("a[href='/products']").exists()).toBe(true);
    expect(component.find("a[href='/about']").exists()).toBe(true);
    expect(component.find("a[href='/articles']").exists()).toBe(true);
    expect(component.find("a[href='/contact']").exists()).toBe(true);
  });

  afterEach(() => {
    component.unmount();
  });
});
