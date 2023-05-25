import { generateUuid } from "../utils/uuid";

export class Test {
  constructor(public grade: number = 0) {}

  public id: string = generateUuid();
}
