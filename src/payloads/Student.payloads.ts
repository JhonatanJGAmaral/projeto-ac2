import { SUBSCRIPTION_TYPE_LIST } from "../constants/inscricoes";
import { SubscriptionType } from "../models/CursoEstudante.model";

export class CreateStudentPayload {
  public name: string = "";
  public subscription: SubscriptionType = "BASIC";

  constructor(object?: any) {
    this.name = String(object?.name);
    this.subscription = SUBSCRIPTION_TYPE_LIST.includes(
      String(object?.subscription) as SubscriptionType
    )
      ? (String(object?.subscription) as SubscriptionType)
      : "BASIC";
  }
}

export class UpdateStudentPayload {
  public name: string = "";
  public subscription: SubscriptionType | "" = "";

  constructor(object?: any) {
    this.name = String(object?.name);
    this.subscription = SUBSCRIPTION_TYPE_LIST.includes(
      String(object?.subscription) as SubscriptionType
    )
      ? (String(object?.subscription) as SubscriptionType)
      : "";
  }
}
