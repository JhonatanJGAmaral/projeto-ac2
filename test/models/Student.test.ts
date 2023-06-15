import { Student } from "../../src/models/Estudante.model";

describe("Student", () => {
  test("should initialize with correct values", () => {
    const student = new Student("John Doe", "BASIC");

    expect(student.name).toBe("John Doe");
    expect(student.subscription).toBe("BASIC");
    expect(student.id).toBeDefined();
    expect(student.countAvailableCourses).toBe(0);
  });

  test("should initialize with default countAvailableCourses value", () => {
    const student = new Student("Jane Smith", "PREMIUM");

    expect(student.countAvailableCourses).toBe(0);
  });
});
