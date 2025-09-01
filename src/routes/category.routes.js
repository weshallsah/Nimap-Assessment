import { Router } from "express";
import {
  AddCategory,
  CategoryList,
  DeleteCategory,
  UpdateCategory,
} from "../controller/category.controller.js";

const routes = Router();

routes.route("/list/:page").get(CategoryList);

routes.route("/add").put(AddCategory);

routes.route("/delete").delete(DeleteCategory);

routes.route("/update/:id").post(UpdateCategory);

export default routes;
