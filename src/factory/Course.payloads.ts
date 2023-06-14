import { CreateCourseDTO, UpdateCourseDTO } from "src/DTOs/Course.dto";

export class CreateCourseFactory {
  public name: string = "";
  public teacher: string = "";
  public countTests?: number = 1;

  constructor(object?: CreateCourseDTO) {
    this.name = String(object?.name || "");
    this.teacher = String(object?.teacher || "");
    this.countTests = Number(object?.countTests || this.countTests);
  }
}

export class UpdateCourseFactory {
  public name: string = "";
  public teacher: string = "";
  public countTests: number;

  constructor(object?: UpdateCourseDTO) {
    this.name = String(object?.name || "");
    this.teacher = String(object?.teacher || "");
    this.countTests = Number(object?.countTests);
  }
}
