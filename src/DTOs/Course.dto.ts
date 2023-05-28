export interface CreateCourseDTO {
  name: string;
  teacher: string;
  countTests?: number;
}

export interface UpdateCourseDTO {
  name?: string;
  teacher?: string;
  countTests?: number;
}
