import { CreateStudentDTO, UpdateStudentDTO } from "src/DTOs/Student.dto";
import { SUBSCRIPTION_TYPE_LIST } from "../constants/inscricoes";
import { SubscriptionType } from "../models/CursoEstudante.model";

export class CreateStudentFactory {
  public name: string = "";
  public subscription: SubscriptionType = "BASIC";

  constructor(object?: CreateStudentDTO) {
    this.name = String(object?.name);
    this.subscription = SUBSCRIPTION_TYPE_LIST.includes(
      String(object?.subscription) as SubscriptionType
    )
      ? (String(object?.subscription) as SubscriptionType)
      : "BASIC";
  }
}

export class UpdateStudentFactory {
  public name: string = "";
  public subscription: SubscriptionType | "" = "";

  constructor(object?: UpdateStudentDTO) {
    this.name = String(object?.name);
    this.subscription = SUBSCRIPTION_TYPE_LIST.includes(
      String(object?.subscription) as SubscriptionType
    )
      ? (String(object?.subscription) as SubscriptionType)
      : "";
  }
}
