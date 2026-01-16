import { afterEach, describe, expect, it } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import ProductModal from "@app/components/ProductModal.vue";
import { mockProduct } from "@test/mocks";

describe("ProductModal", () => {
  let component: VueWrapper;

  async function mountComponent(product: productType) {
    component = await mountSuspended(ProductModal, {
      props: {
        product,
      },
    });
  }

  it("should create", async () => {
    await mountComponent(mockProduct);

    expect(component.exists()).toBe(true);
  });

  it("should display a card with the product image, name, price and a button", async () => {
    await mountComponent(mockProduct);

    expect(component.find(`img[src*='${mockProduct.image}']`).exists()).toBe(
      true
    );
    expect(component.text()).toContain(mockProduct.name);
    expect(component.text()).toContain(mockProduct.price);
    expect(component.find("button").exists()).toBe(true);
  });

  it("should display a popup modal window if card is clicked, which contains the product image, name, price, description and a close button", async () => {
    await mountComponent(mockProduct);

    await component.get("button").trigger("click");
    await component.vm.$nextTick();
    const modal = document.body.querySelector("#product-modal");

    expect(modal).toBeTruthy();
    expect(
      modal.querySelector(`img[src*='${mockProduct.image}']`)
    ).toBeTruthy();
    expect(modal.querySelector("button#close-btn")).toBeTruthy();
    expect(modal.textContent).toContain(mockProduct.name);
    expect(modal.textContent).toContain(mockProduct.description);
    expect(modal.textContent).toContain(mockProduct.price);
  });

  afterEach(() => {
    component.unmount();
  });
});
