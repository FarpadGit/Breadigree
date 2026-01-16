import { afterEach, describe, expect, it, vi } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import About from "@app/pages/about.vue";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";

describe("About Page", async () => {
  let component: VueWrapper;

  mockNuxtImport("useSeoMeta", () => vi.fn());

  async function mountComponent() {
    component = await mountSuspended(About);
  }

  it("should create", async () => {
    await mountComponent();

    expect(component.exists()).toBe(true);
  });

  it("should display 7 section elements and one h1 heading", async () => {
    await mountComponent();

    expect(component.findAll("section").length).toBe(7);
    expect(component.findAll("h1").length).toBe(1);
  });

  afterEach(() => {
    component?.unmount();
  });
});
