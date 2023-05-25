import { Course } from "../src/models/Curso.model";

export const MOCKED_COURSES = [
  new Course("Programção básica", "Marivaldo", 3),
  new Course("Programção intermediária", "Cleide", 3),
  new Course("Programção avançada", "Ronaldinho", 5),
  new Course("Programção artística", "Cafu", 4),
  new Course("Programção defensiva", "MArcxos", 4),
  new Course("Programção defensiva intermediária", "Ceni", 4),
  new Course("Programção árabe", "Carlinhos", 4),
  new Course("Programção das lamentações", "Jeremias", 3),
  new Course("Programção felina", "Gilberto", 5),
  new Course("Programção da física", "Bogila", 5),
  new Course("Programção de placas", "Sidnet", 3),
  new Course("Programção fora da caixa", "Do Caos", 5),
  new Course("Programção dentro da caixa", "Da Paz", 3),
  new Course("Programção norte-americana", "André", 3),
];

export const MOCKED_COURSE = MOCKED_COURSES[9];
