import express from "express";
import { categorioriesController } from "./controllers/categoriesController";
import { coursesController } from "./controllers/coursesController";

const router = express.Router()

router.get('/categories', categorioriesController.index)
router.get('/categories/:id', categorioriesController.show)

router.get('/courses/featured', coursesController.featured)
router.get('/courses/:id', coursesController.show)

export { router }