import express from "express";
import { getDatabaseFilled } from "../../mock/database";
import { CourseController } from "../controllers/course.controller";
import { StudentController } from "../controllers/student.controller";

const router = express.Router();
const { db } = getDatabaseFilled();

const studentController = new StudentController(db);
const courseController = new CourseController(db);

// #region Students routes

router.get("/student", (...props) => studentController.getAll(...props));
router.get("/student/:id", (...props) => studentController.getOne(...props));
router.post("/student", (...props) => studentController.create(...props));
router.put("/student/:id", (...props) => studentController.update(...props));
router.delete("/student/:id", (...props) => studentController.delete(...props));

// #endregion Students routes

// #region Courses routes

router.get("/course", (...props) => courseController.getAll(...props));
router.get("/course/:id", (...props) => courseController.getOne(...props));
router.post("/course", (...props) => courseController.create(...props));
router.put("/course/:id", (...props) => courseController.update(...props));
router.delete("/course/:id", (...props) => courseController.delete(...props));

// #endregion Courses routes

export = router;
