export interface CreateStudentDTO {
  name: string;
  subscription?: string;
}

export interface UpdateStudentDTO {
  name?: string;
  subscription?: string;
}
