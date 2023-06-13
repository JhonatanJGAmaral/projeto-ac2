import array from "../../src/utils/array";

describe("isValid", () => {
  test("should return true for a non-empty array", () => {
    //cenário
    const list = [1, 2, 3];

    //execução
    const result = array.isValid(list);

    //resultados
    expect(result).toBe(true);
  });

  test("should return false for an empty array", () => {
    //cenário
    const list = [];

    //execução
    const result = array.isValid(list);

    //resultados
    expect(result).toBe(false);
  });

  test("should return false for a non-array value", () => {
    //cenário
    const list = "not an array";

    //execução
    const result = array.isValid(list as any);

    //resultados
    expect(result).toBe(false);
  });

  test("should return false for null or undefined", () => {
    const list1 = null;
    const list2 = undefined;

    const result1 = array.isValid(list1 as any);
    const result2 = array.isValid(list2 as any);

    expect(result1).toBe(false);
    expect(result2).toBe(false);
  });
});
