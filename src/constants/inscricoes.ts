import { SubscriptionType } from "../models/CursoEstudante.model";

export const SUBSCRIPTION_TYPE: { [key: string]: SubscriptionType } = {
  BASIC: "BASIC",
  PREMIUM: "PREMIUM",
};

export const SUBSCRIPTION_TYPE_LIST: SubscriptionType[] = ["BASIC", "PREMIUM"];
