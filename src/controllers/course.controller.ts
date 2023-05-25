import { Request, Response, NextFunction } from "express";
import { DataBase } from "../data";
import { CourseService } from "../services/course.service";
import { CreateUpdateCoursePaylod } from "../payloads/Course.payloads";

export class CourseController {
  protected service: CourseService;
  constructor(protected readonly db: DataBase) {
    this.service = new CourseService(db);
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
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

    const payload = new CreateUpdateCoursePaylod(req.body);

    const response = await this.service.update(id, payload);

    return res.status(response?.error ? 401 : 200).json(response);
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    let id: string = req.params.id;

    const response = await this.service.delete(id);

    return res.status(response?.error ? 401 : 200).json(response);
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const payload = new CreateUpdateCoursePaylod(req.body);

    const response = await this.service.create(payload);

    return res.status(response?.error ? 401 : 200).json(response);
  }
}
