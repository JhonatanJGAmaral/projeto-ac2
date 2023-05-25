import { getDatabaseFilled } from "../../mock/database";
import { CourseService } from "../../src/services/course.service";

export const getCourseService = () => {
  const { db } = getDatabaseFilled();
  const service = new CourseService(db);

  return { db, service };
};
