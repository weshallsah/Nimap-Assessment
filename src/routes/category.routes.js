import { Router } from "express";
import { CategoryList } from "../controller/category.controller.js";

const routes = Router();

routes.route("/list").get(CategoryList);

// routes.route("/add").put();

// routes.route("/delete").delete();

// routes.route("/update").post();

export default routes;
