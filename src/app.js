import express from "express";

const app = express();

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "server is running!",
  });
});

app.get("/page", (req, res) => {
  return res.render("web/homepage");
});
export { app };
