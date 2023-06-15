import { generateUuid } from "../../src/utils/uuid";

describe("generateUuid", () => {
  test("should not generate a empty string", () => {
    const result = generateUuid();

    expect(result).not.toBe("");
  });

  test("should generate a different UUID on each invocation", () => {
    const uuid1 = generateUuid();
    const uuid2 = generateUuid();

    expect(uuid1).not.toBe(uuid2);
  });
});
