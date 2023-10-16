import express from "express";
import { categorioriesController } from "./controllers/categoriesController";

const router = express.Router()

router.get('/categories', categorioriesController.index)
router.get('/categories/:id', categorioriesController.show)

export { router }