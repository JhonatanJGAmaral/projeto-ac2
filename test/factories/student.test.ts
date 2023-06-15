import { CreateStudentDTO, UpdateStudentDTO } from "../../src/DTOs/Student.dto";
import { SUBSCRIPTION_TYPE } from "../../src/constants/inscricoes";
import {
  CreateStudentFactory,
  UpdateStudentFactory,
} from "../../src/factory/Student.payloads";
import { SubscriptionType } from "../../src/models/CursoEstudante.model";

describe("CreateStudentFactory", () => {
  test("should initialize with correct values", () => {
    const dto: CreateStudentDTO = {
      name: "John Doe",
      subscription: SUBSCRIPTION_TYPE.PREMIUM,
    };
    const factory = new CreateStudentFactory(dto);
    expect(factory.name).toBe("John Doe");
    expect(factory.subscription).toBe(SUBSCRIPTION_TYPE.PREMIUM);
  });

  test("should initialize with default values if no object is provided", () => {
    const factory = new CreateStudentFactory();
    expect(factory.name).toBe("");
    expect(factory.subscription).toBe(SUBSCRIPTION_TYPE.BASIC);
  });

  test("should initialize with default subscription value if invalid value is provided", () => {
    const dto: CreateStudentDTO = {
      name: "John Doe",
      subscription: "INVALID_TYPE" as SubscriptionType,
    };
    const factory = new CreateStudentFactory(dto);
    expect(factory.name).toBe("John Doe");
    expect(factory.subscription).toBe(SUBSCRIPTION_TYPE.BASIC);
  });
});

describe("UpdateStudentFactory", () => {
  test("should initialize with correct values", () => {
    const dto: UpdateStudentDTO = {
      name: "John Doe",
      subscription: SUBSCRIPTION_TYPE.PREMIUM,
    };
    const factory = new UpdateStudentFactory(dto);
    expect(factory.name).toBe("John Doe");
    expect(factory.subscription).toBe(SUBSCRIPTION_TYPE.PREMIUM);
  });

  test("should initialize with default values if no object is provided", () => {
    const factory = new UpdateStudentFactory();
    expect(factory.name).toBe("");
    expect(factory.subscription).toBe("");
  });

  test("should initialize with empty string subscription if invalid value is provided", () => {
    const dto: UpdateStudentDTO = {
      name: "John Doe",
      subscription: "INVALID_TYPE" as SubscriptionType,
    };
    const factory = new UpdateStudentFactory(dto);
    expect(factory.name).toBe("John Doe");
    expect(factory.subscription).toBe("");
  });
});
