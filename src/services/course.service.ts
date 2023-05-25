import array from "../utils/array";
import { DataBase } from "../data";
import { Course } from "../models/Curso.model";
import { CreateUpdateCoursePaylod } from "../../src/payloads/Course.payloads";

type CourseResponse = {
  data?: Course;
  error: boolean;
  message?: string;
};

type ManyCoursesResponse = {
  data?: Course[];
  error: boolean;
  message?: string;
};

export class CourseService {
  constructor(protected readonly db: DataBase) {}

  public async getOne(studentId: string): Promise<CourseResponse> {
    const data = this.db.getCourseById(studentId);
    const error = !data;
    const message = error ? "Erro ao pegar o curso" : "Curso pego com sucesso";

    return {
      data,
      error,
      message,
    };
  }

  public async getAll(): Promise<ManyCoursesResponse> {
    const data = this.db.courses;
    const error = !data && !array.isValid(data);
    const message = error
      ? "Erro ao listar os cursos"
      : "Cursos listados com sucesso";

    return {
      error,
      message,
      data: error ? [] : data,
    };
  }

  public async create(
    payload: CreateUpdateCoursePaylod
  ): Promise<CourseResponse> {
    const courseCreated = new Course(
      payload?.name,
      payload?.teacher,
      payload?.countTests
    );

    if (!courseCreated.countTests) courseCreated.countTests = 1;

    if (!courseCreated.name)
      return { error: true, message: "Nome do curso é inválido" };
    if (courseCreated.countTests < 1)
      return { error: true, message: "Quantidade de provas inválidas" };
    if (!courseCreated.teacher)
      return { error: true, message: "Nome do professor inválido" };

    const data = this.db.setCourse(courseCreated);
    const error = !data;
    const message = error
      ? "Erro ao criar o curso"
      : "Curso criado com sucesso";

    return {
      data,
      error,
      message,
    };
  }

  public async update(studentId: string, payload: CreateUpdateCoursePaylod) {
    let courseUpdated = this.db.getCourseById(studentId);

    if (!courseUpdated) return { error: true, message: "Curso não encontrado" };

    if (payload?.name) courseUpdated.name = payload.name;
    if (payload?.teacher) courseUpdated.teacher = payload.teacher;
    if (payload?.countTests) courseUpdated.countTests = payload.countTests;

    const data = this.db.setCourse(courseUpdated);
    const error = !data;
    const message = error
      ? "Erro ao atualizar o curso"
      : "Curso atualizado com sucesso";

    return {
      data,
      error,
      message,
    };
  }

  public async delete(studentId: string): Promise<CourseResponse> {
    const response = await this.getOne(studentId);

    if (response.error) return { ...response, message: "Curso não encontrado" };
    this.db.removeCourse(studentId);

    return {
      error: false,
      message: "Curso removido com sucesso",
    };
  }
}
