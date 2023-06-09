import { Request, Response, NextFunction } from "express";
import { DataBase } from "../data";
import { StudentService } from "../services/student.service";
import {
  CreateStudentFactory,
  UpdateStudentFactory,
} from "../factory/Student.payloads";

export class StudentController {
  protected service: StudentService;
  constructor(protected readonly db: DataBase) {
    this.service = new StudentService(db);
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    this.service = new StudentService(this.db);

    const response = await this.service.getAll();

    return res.status(response?.error ? 401 : 200).json(response);
  }

  public async getOne(req: Request, res: Response, next: NextFunction) {
    const id: string = String(req.params.id);

    const response = await this.service.getOne(id);

    return res.status(response?.error ? 401 : 200).json(response);
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    let id: string = req.params.id;

    const payload = new UpdateStudentFactory(req.body);

    const response = await this.service.update(id, payload);

    return res.status(response?.error ? 401 : 200).json(response);
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    let id: string = req.params.id;

    const response = await this.service.delete(id);

    return res.status(response?.error ? 401 : 200).json(response);
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    console.log("tentou criar");

    const payload = new CreateStudentFactory(req.body);

    const response = await this.service.create(payload);

    return res.status(response?.error ? 401 : 200).json(response);
  }
}
