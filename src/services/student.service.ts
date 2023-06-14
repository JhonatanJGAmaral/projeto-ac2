import { DataBase } from "../data";
import { Student } from "../models/Estudante.model";
import {
  CreateStudentFactory,
  UpdateStudentFactory,
} from "../factory/Student.payloads";

type StudentResponse = {
  data?: Student;
  error: boolean;
  message?: string;
};

type ManyStudentsResponse = {
  data?: Student[];
  error: boolean;
  message?: string;
};

export class StudentService {
  constructor(protected readonly db: DataBase) {}

  public async getOne(studentId: string): Promise<StudentResponse> {
    const data = this.db.getStudentById(studentId);
    const error = !data;
    const message = error ? "Erro ao pegar o aluno" : "Aluno pego com sucesso";

    return {
      data,
      error,
      message,
    };
  }

  public async getAll(): Promise<ManyStudentsResponse> {
    const data = this.db.students;

    const error = !data;
    const message = error
      ? "Erro ao listar os alunos"
      : "Alunos listados com sucesso";

    return {
      error,
      message,
      data: error ? [] : data,
    };
  }

  public async create(payload: CreateStudentFactory): Promise<StudentResponse> {
    const studentCreated = new Student(payload?.name, payload?.subscription);

    if (!studentCreated.name)
      return { error: true, message: "Nome do aluno é inválido" };

    const data = this.db.setStudent(studentCreated);
    const error = !data;
    const message = error
      ? "Erro ao criar o aluno"
      : "Aluno criado com sucesso";

    return {
      data,
      error,
      message,
    };
  }

  public async update(studentId: string, payload: UpdateStudentFactory) {
    let studentUpdated = this.db.getStudentById(studentId);

    if (!studentUpdated)
      return { error: true, message: "Aluno não encontrado" };

    if (payload?.name) studentUpdated.name = payload.name;
    if (payload?.subscription)
      studentUpdated.subscription = payload.subscription;

    const data = this.db.setStudent(studentUpdated);
    const error = !data;
    const message = error
      ? "Erro ao atualizar o aluno"
      : "Aluno atualizado com sucesso";

    return {
      data,
      error,
      message,
    };
  }

  public async delete(studentId: string): Promise<StudentResponse> {
    const response = await this.getOne(studentId);

    if (response.error) return { ...response, message: "Aluno não encontrado" };

    this.db.removeStudent(studentId);

    return {
      error: false,
      message: "Aluno removido com sucesso",
    };
  }
}
