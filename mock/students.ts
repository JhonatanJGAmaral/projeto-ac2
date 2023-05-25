import { Student } from "../src/models/Estudante.model";
import { SUBSCRIPTION_TYPE } from "../src/constants/inscricoes";

export const MOCKED_STUDENTS = [
  new Student("Eduardo", SUBSCRIPTION_TYPE.BASIC),
  new Student("Jhow", SUBSCRIPTION_TYPE.BASIC),
  new Student("Enrico", SUBSCRIPTION_TYPE.BASIC),
  new Student("Daniel", SUBSCRIPTION_TYPE.BASIC),
  new Student("Carlinhos Maia", SUBSCRIPTION_TYPE.BASIC),
];

export const MOCKED_STUDENT = MOCKED_STUDENTS[4];
