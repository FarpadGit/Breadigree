import { afterEach, describe, expect, it } from "vitest";
import { VueWrapper } from "@vue/test-utils";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Icon from "@app/components/Icon.vue";

describe("Icon", () => {
  let component: VueWrapper;

  async function mountComponent(
    name: InstanceType<typeof Icon>["$props"]["name"]
  ) {
    component = await mountSuspended(Icon, {
      props: { name },
    });
  }

  it("should create", async () => {
    await mountComponent("close");

    expect(component.exists()).toBe(true);
  });

  describe("should display one and only one icon for every valid name prop", () => {
    it("bsky", async () => {
      await mountComponent("bsky");
      expect(component.findAll("svg").length).toBe(1);
    });
    it("close", async () => {
      await mountComponent("close");
      expect(component.findAll("svg").length).toBe(1);
    });
    it("email", async () => {
      await mountComponent("email");
      expect(component.findAll("svg").length).toBe(1);
    });
    it("facebook", async () => {
      await mountComponent("facebook");
      expect(component.findAll("svg").length).toBe(1);
    });
    it("instagram", async () => {
      await mountComponent("instagram");
      expect(component.findAll("svg").length).toBe(1);
    });
    it("location", async () => {
      await mountComponent("location");
      expect(component.findAll("svg").length).toBe(1);
    });
    it("menu", async () => {
      await mountComponent("menu");
      expect(component.findAll("svg").length).toBe(1);
    });
    it("phone", async () => {
      await mountComponent("phone");
      expect(component.findAll("svg").length).toBe(1);
    });
    it("tiktok", async () => {
      await mountComponent("tiktok");
      expect(component.findAll("svg").length).toBe(1);
    });
  });

  afterEach(() => {
    component.unmount();
  });
});
