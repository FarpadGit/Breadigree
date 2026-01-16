import { afterEach, describe, expect, it, vi } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import defaultLayout from "@app/layouts/default.vue";

describe("Default Layout", () => {
  let component: VueWrapper;
  const mockPageContent = "Mock Page Content";

  const { useRouteMock } = vi.hoisted(() => ({
    useRouteMock: vi.fn(() => ({ path: "" })),
  }));
  mockNuxtImport("useRoute", () => useRouteMock);

  async function mountComponent() {
    component = await mountSuspended(defaultLayout, {
      slots: { default: mockPageContent },
    });
  }

  it("should create", async () => {
    await mountComponent();

    expect(component.exists()).toBe(true);
  });

  it("should display the header navigation buttons, the page contents inside a 'main' element and a footer with many links", async () => {
    await mountComponent();

    expect(component.findComponent({ name: "NavButtons" }).exists()).toBe(true);
    expect(
      component.find("footer").findAllComponents({ name: "NuxtLink" }).length,
    ).toBeGreaterThanOrEqual(8);
    expect(component.find("main").html().includes(mockPageContent)).toBe(true);
  });

  it("should display the header navigation buttons with a layout of 'center' on the root page", async () => {
    useRouteMock.mockReturnValue({ path: "/" });
    await mountComponent();

    expect(
      component.findComponent({ name: "NavButtons" }).props()["layout"],
    ).toBe("center");
  });

  describe("should display the header navigation buttons with a transparent background on select routes", async () => {
    const routesWithTransparentHeader = [
      "/",
      "/about",
      "/products",
      "/collections/anything",
    ];

    routesWithTransparentHeader.forEach(async (route) => {
      it(route, async () => {
        useRouteMock.mockReturnValue({ path: route });
        await mountComponent();

        expect(
          component.findComponent({ name: "NavButtons" }).props()[
            "fillBackground"
          ],
        ).toBe(false);
        expect(
          component.find("img[src*='/separator-bottom.png']").exists(),
        ).toBe(false);
      });
    });
  });

  describe("should display the header navigation buttons with a filled background and a seperator element on every other route", async () => {
    const routesWithFilledHeader = [
      "/articles",
      "/articles/slug",
      "/contact",
      "/anything/anything",
    ];

    routesWithFilledHeader.forEach(async (route) => {
      it(route, async () => {
        useRouteMock.mockReturnValue({ path: route });
        await mountComponent();

        expect(
          component.findComponent({ name: "NavButtons" }).props()[
            "fillBackground"
          ],
        ).toBe(true);
        expect(
          component.find("img[src*='/separator-bottom.png']").exists(),
        ).toBe(true);
      });
    });
  });

  afterEach(() => {
    component.unmount();
  });
});
