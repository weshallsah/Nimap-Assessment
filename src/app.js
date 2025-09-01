import express from "express";
import cors from "cors";
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

import productroute from "./routes/product.routes.js";
import categoryroute from "./routes/category.routes.js";

app.use("/api/product", productroute);

app.use("/api/category", categoryroute);

app.get("/", (req, res) => {
  return res.render("web/homepage");
});
app.get("/category", (req, res) => {
  return res.render("web/categorypage");
});
export { app };
