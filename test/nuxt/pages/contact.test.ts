import { afterEach, describe, expect, it, vi } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import Contact from "@app/pages/contact.vue";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";

describe("Contact Page", async () => {
  let component: VueWrapper;

  mockNuxtImport("useSeoMeta", () => vi.fn());

  async function mountComponent() {
    component = await mountSuspended(Contact);
  }

  it("should create", async () => {
    await mountComponent();

    expect(component.exists()).toBe(true);
  });

  it("should display 5 form inputs for name, email, subject, phone and message", async () => {
    await mountComponent();

    expect(component.findAllComponents({ name: "FormInput" }).length).toBe(5);
    expect(component.find("input#name").exists()).toBe(true);
    expect(component.find("input#email").exists()).toBe(true);
    expect(component.find("input#subject").exists()).toBe(true);
    expect(component.find("input#phone").exists()).toBe(true);
    expect(component.find("textarea#message").exists()).toBe(true);
  });

  afterEach(() => {
    component?.unmount();
  });
});
