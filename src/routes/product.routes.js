import { Router } from "express";
import {
  AddProduct,
  DeleteProduct,
  ProductList,
  UpdateProduct,
} from "../controller/ProductList.controller.js";

const routes = Router();

routes.route("/list/:page/:categoryId").get(ProductList);

routes.route("/add").put(AddProduct);

routes.route("/delete").delete(DeleteProduct);

routes.route("/update/:id").post(UpdateProduct);

export default routes;
