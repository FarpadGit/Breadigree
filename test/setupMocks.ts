import { vi } from "vitest";

vi.mock("vue3-carousel/dist/carousel", async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    Carousel: { template: "<div><slot/></div>" },
    Slide: { template: "<div><slot/></div>" },
  };
});
