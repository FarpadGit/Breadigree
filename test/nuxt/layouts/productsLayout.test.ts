import { ref } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import productsLayout from "@app/layouts/productsLayout.vue";
import { mockCategory } from "@test/mocks";

describe("Products Layout", () => {
  let component: VueWrapper;
  const mockPageContent = "Mock Page Content";

  const { useLazyFetch } = vi.hoisted(() => ({
    useLazyFetch: vi.fn(() => ({
      status: ref("success"),
      data: ref([mockCategory]),
    })),
  }));
  mockNuxtImport("useLazyFetch", () => useLazyFetch);

  async function mountComponent(image?: string) {
    component = await mountSuspended(productsLayout, {
      props: { image },
      slots: { default: mockPageContent },
    });
  }

  it("should create", async () => {
    await mountComponent();

    expect(component.exists()).toBe(true);
  });

  it("should display the header image, the page contents and a subheader with the list of fetched categories as links", async () => {
    const mockImage = "/mockImage.jpg";
    await mountComponent(mockImage);

    expect(component.find(`img[src*='${mockImage}']`).exists()).toBe(true);
    expect(
      component.find(`a[href='/collections/${mockCategory.slug}']`).exists()
    ).toBe(true);
    expect(
      component.get(`a[href='/collections/${mockCategory.slug}']`).text()
    ).toBe(mockCategory.name);
    expect(component.html().includes(mockPageContent)).toBe(true);
  });

  it("should display the previous header image if the image prop changes to undefined", async () => {
    const mockImage = "/mockImage.jpg";
    await mountComponent(mockImage);

    expect(component.find(`img[src*='${mockImage}']`).exists()).toBe(true);

    component.setProps({ image: undefined });
    await component.vm.$nextTick();

    expect(component.props()["image"]).toBeUndefined();
    expect(component.find(`img[src*='${mockImage}']`).exists()).toBe(true);
  });

  it("should display the new header image if the image prop changes and is not undefined", async () => {
    const mockImage1 = "/mockImage1.jpg";
    const mockImage2 = "/mockImage2.jpg";
    await mountComponent(mockImage1);

    component.setProps({ image: undefined });
    await component.vm.$nextTick();
    component.setProps({ image: mockImage2 });
    await component.vm.$nextTick();

    expect(component.props()["image"]).toBe(mockImage2);
    expect(component.find(`img[src*='${mockImage2}']`).exists()).toBe(true);
  });

  afterEach(() => {
    component.unmount();
  });
});
