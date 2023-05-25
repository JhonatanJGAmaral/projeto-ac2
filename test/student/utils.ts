import { getDatabaseFilled } from "../../mock/database";
import { StudentService } from "../../src/services/student.service";

export const getStudentService = () => {
  const { db } = getDatabaseFilled();
  const service = new StudentService(db);

  return { db, service };
};
