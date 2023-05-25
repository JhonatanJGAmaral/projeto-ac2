import { Test } from "./Prova.model";
import { Course } from "./Curso.model";
import { Student } from "./Estudante.model";

import { generateUuid } from "../utils/uuid";

export type SubscriptionType = "BASIC" | "PREMIUM";
export const SubscriptionState = { BASIC: "BASIC", PREMIUM: "PREMIUM" };

export class CourseStudent {
  constructor(public course: Course, public student: Student) {}

  public id: string = generateUuid();
  public isFinished: boolean = false;
  public testAverage: number = 0;
  private _tests: Test[] = [];

  get tests(): Test[] {
    return this._tests;
  }

  public addTest(test: Test) {}

  public removeTest(test: Test) {}
}
