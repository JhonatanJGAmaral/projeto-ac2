import { Test } from "../../src/models/Prova.model";

describe("Test", () => {
  test("should initialize with default grade value if not provided", () => {
    const test = new Test();
    expect(test.grade).toBe(0);
  });

  test("should initialize with provided grade value", () => {
    const test = new Test(85);
    expect(test.grade).toBe(85);
  });

  test("should have a generated ID", () => {
    const test = new Test();
    expect(test.id).toBeDefined();
  });
});
