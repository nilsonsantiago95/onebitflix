import express from "express";
import { categorioriesController } from "./controllers/categoriesController";

const router = express.Router()

router.get('/categories', categorioriesController.index)

export { router }