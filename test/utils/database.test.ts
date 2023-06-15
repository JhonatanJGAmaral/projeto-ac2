import { removeByIndex } from "../../src/utils/databse";

describe("removeByIndex", () => {
  test("should remove an element at the given index", () => {
    const list = [1, 2, 3, 4, 5];
    const index = 2;

    const result = removeByIndex(list, index);

    expect(result).toEqual([1, 2, 4, 5]);
  });

  test("should return the original array if index is out of bounds", () => {
    const list = [1, 2, 3];
    const index = 5;

    const result = removeByIndex(list, index);

    expect(result).toEqual([1, 2, 3]);
  });

  test("should return a new array without modifying the original array", () => {
    const list = [1, 2, 3];
    const index = 1;

    const result = removeByIndex(list, index);

    expect(result).toEqual([1, 3]);
    expect(list).toEqual([1, 2, 3]);
    expect(result).not.toBe(list);
  });
});
