import { client } from "../DB/index.db.js";
import { ApiReponse } from "../utils/ApiResponse.utils.js";
import { AsyncHandler } from "../utils/AsyncHandler.utils.js";

const CategoryList = AsyncHandler(async (req, res) => {
  try {
    const category = await client
      .query(`select * from category;`)
      .then((val) => val.rows);

    return res
      .status(200)
      .json(
        new ApiReponse(200, { categorys: category }, "List fetch success fully")
      );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new ApiReponse(500, error, "Something went wrong"));
  }
});

export { CategoryList };
