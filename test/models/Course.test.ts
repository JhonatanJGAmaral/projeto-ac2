import { Course } from "../../src/models/Curso.model";

describe("Course", () => {
  test("should initialize with correct values", () => {
    const course = new Course("Math", "John Doe", 5);

    expect(course.name).toBe("Math");
    expect(course.teacher).toBe("John Doe");
    expect(course.countTests).toBe(5);
    expect(course.id).toBeDefined();
  });

  test("should initialize with default countTests value if not provided", () => {
    const course = new Course("Science", "Jane Smith");

    expect(course.countTests).toBe(1);
  });
});
