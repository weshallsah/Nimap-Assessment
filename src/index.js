import { app } from "./app.js";
import { connectDB } from "./DB/index.db.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

app.listen(process.env.PORT || 9000, async () => {
  await connectDB();
  console.log(`server is running on port ${process.env.PORT || 9000}`);
});
