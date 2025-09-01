import { app } from "./app.js";
import { connectDB } from "./DB/index.db.js";

app.listen(9000, async () => {
  await connectDB();
  console.log("server is running on port 9000");
});
