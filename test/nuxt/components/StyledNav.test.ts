import { afterEach, describe, expect, it } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import StyledNav from "@app/components/StyledNav.vue";

describe("StyledNav", () => {
  let component: VueWrapper;
  const mockText = "Mock Link Text";

  async function mountComponent(href: string) {
    component = await mountSuspended(StyledNav, {
      props: {
        href,
      },
      slots: {
        default: mockText,
      },
    });
  }

  it("should create", async () => {
    await mountComponent("/");

    expect(component.exists()).toBe(true);
  });

  it("should display as a regular Nuxt Link", async () => {
    const mockLink = "/mocklink";
    await mountComponent(mockLink);

    expect(component.findComponent({ name: "NuxtLink" }).exists()).toBe(true);
    expect(component.find(`a[href*='${mockLink}']`).exists()).toBe(true);
    expect(component.html()).toContain(mockText);
  });

  afterEach(() => {
    component.unmount();
  });
});
