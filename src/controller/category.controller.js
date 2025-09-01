import { client } from "../DB/index.db.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiReponse } from "../utils/ApiResponse.utils.js";
import { AsyncHandler } from "../utils/AsyncHandler.utils.js";

const CategoryList = AsyncHandler(async (req, res) => {
  try {
    const page = req.params.page;
    const limit = 10;
    const category = await client
      .query(
        `select * from category ORDER BY id asc
          ${page == 0 ? "" : `offset ${(page - 1) * limit} limit ${limit}`};`
      )
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

const AddCategory = AsyncHandler(async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      throw ApiError(400, "Category name not found");
    }
    await client.query(
      `INSERT INTO Category (name, description) VALUES ('${name}', '${description}') ON CONFLICT (name) DO NOTHING;`
    );
    return res
      .status(200)
      .json(new ApiReponse(200, {}, "Category added successfully"));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(
        new ApiReponse(500, error, error.message ?? "Something went wrong")
      );
  }
});

const DeleteCategory = AsyncHandler(async (req, res) => {
  try {
    const id = req.query.id;
    console.log(id);
    if (!id) {
      throw ApiError(400, "Category id not found");
    }
    await client.query(`DELETE From Product WHERE categoryid = ${id};`);
    await client.query(`DELETE FROM category WHERE id = ${id};`);
    return res
      .status(200)
      .json(new ApiReponse(200, {}, "Category deleted successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiReponse(500, { error }, error.message ?? "Something went wrong")
      );
  }
});

const UpdateCategory = AsyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;
    console.log(`${name}, ${description}`);
    if (!name) {
      throw new ApiError(400, "Category name is not found");
    }

    await client.query(`UPDATE Category
        SET name = '${name}', description = '${description}' 
        WHERE id = ${id};`);

    return res
      .status(200)
      .json(new ApiReponse(200, {}, "Category data updated succcessfully"));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new ApiReponse(500, error, "Something went wrong"));
  }
});

export { CategoryList, AddCategory, UpdateCategory, DeleteCategory };
