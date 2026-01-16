import { afterEach, describe, expect, it } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import SkeletonCard from "@app/components/SkeletonCard.vue";

describe("SkeletonCard", () => {
  let component: VueWrapper;

  async function mountComponent(
    type: InstanceType<typeof SkeletonCard>["$props"]["type"]
  ) {
    component = await mountSuspended(SkeletonCard, {
      props: { type },
    });
  }

  it("should create", async () => {
    await mountComponent("product");

    expect(component.exists()).toBe(true);
  });

  describe("should display a skeleton loading card for every valid type prop", () => {
    it("article", async () => {
      await mountComponent("article");
      expect(component.html()).not.toBeFalsy();
    });
    it("gallery", async () => {
      await mountComponent("gallery");
      expect(component.html()).not.toBeFalsy();
    });
    it("product", async () => {
      await mountComponent("product");
      expect(component.html()).not.toBeFalsy();
    });
  });

  afterEach(() => {
    component.unmount();
  });
});
