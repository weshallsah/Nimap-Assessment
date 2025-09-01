import { Pool } from "pg";
import dotenv from "dotenv";
import {
  createCategoryquery,
  createProductquery,
} from "../constant/CreateQuery.constant.js";
import {
  insertcategory,
  insertproduct,
} from "../constant/InsertQuery.constant.js";
dotenv.config({ path: ".env" });

const connectionString = `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASS}@${process.env.RDS_DOMAIN}:${process.env.RDS_PORT}/${process.env.DB_NAME}`;

const client = new Pool({
  connectionString,
});

const connectDB = async () => {
  try {
    await client.connect().then((val) => {
      console.log("Connected to PostgreSQL");
    });

    await client.query(createCategoryquery);
    await client.query(createProductquery);
    await client.query("COMMIT");

    const category = (await client.query(`select COUNT(*) from category`))
      .rows[0]["count"];
    const product = (await client.query(`select COUNT(*) from product`))
      .rows[0]["count"];
    if (category == 0) {
      await client.query(insertcategory);
      await client.query("COMMIT");
    }
    if (product == 0) {
      await client.query(insertproduct);
      await client.query("COMMIT");
    }
  } catch (error) {
    console.error("Connection error", error);
  }
};

export { client, connectDB };
