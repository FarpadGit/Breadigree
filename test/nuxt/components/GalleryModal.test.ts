import { afterEach, describe, expect, it } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import GalleryModal from "@app/components/GalleryModal.vue";

describe("GalleryModal", () => {
  let component: VueWrapper;

  async function mountComponent(props: {
    gallery: string[];
    image: string;
    startSlideIndex: number;
  }) {
    component = await mountSuspended(GalleryModal, {
      props,
    });
  }

  it("should create", async () => {
    await mountComponent({ gallery: [], image: "", startSlideIndex: 0 });

    expect(component.exists()).toBe(true);
  });

  it("should display a card with the specified image of the gallery", async () => {
    const mockImageUrl = "mockImage.jpg";
    await mountComponent({
      gallery: [mockImageUrl],
      image: mockImageUrl,
      startSlideIndex: 0,
    });

    expect(component.find(`img[src*='${mockImageUrl}']`).exists()).toBe(true);
  });

  it("should display a popup modal window with a close button if card is clicked", async () => {
    const mockImageUrl = "mockImage.jpg";
    await mountComponent({
      gallery: [mockImageUrl],
      image: mockImageUrl,
      startSlideIndex: 0,
    });

    await component.get("img").trigger("click");
    await component.vm.$nextTick();

    expect(document.body.querySelector("#gallery-modal")).toBeTruthy();
    expect(
      document.body
        .querySelector("#gallery-modal")
        .querySelector("button#close-btn")
    ).toBeTruthy();
  });

  afterEach(() => {
    component.unmount();
  });
});
