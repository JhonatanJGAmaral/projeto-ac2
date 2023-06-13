import {
  CreateCourseFactory,
  UpdateCourseFactory,
} from "../../src/factory/Course.payloads";

describe("CreateCourseFactory", () => {
  test("should initialize with correct values", () => {
    //CENÁRIO
    const factory = new CreateCourseFactory({
      name: "Course Name",
      teacher: "Teacher Name",
      countTests: 10,
    });

    //RESULTADOS
    expect(factory.name).toBe("Course Name");
    expect(factory.teacher).toBe("Teacher Name");
    expect(factory.countTests).toBe(10);
  });

  test("should initialize with default values if no object is provided", () => {
    const factory = new CreateCourseFactory();
    expect(factory.name).toBe("");
    expect(factory.teacher).toBe("");
    expect(factory.countTests).toBe(1);
  });
});

describe("UpdateCourseFactory", () => {
  test("should initialize with correct values", () => {
    const dto = new UpdateCourseFactory({
      name: "Updated Course Name",
      teacher: "Updated Teacher Name",
      countTests: 5,
    });
    const factory = new UpdateCourseFactory(dto);
    expect(factory.name).toBe("Updated Course Name");
    expect(factory.teacher).toBe("Updated Teacher Name");
    expect(factory.countTests).toBe(5);
  });

  test("should initialize with default values if no object is provided", () => {
    const factory = new UpdateCourseFactory();
    expect(factory.name).toBe("");
    expect(factory.teacher).toBe("");
    expect(factory.countTests).toBeNaN();
  });
});
