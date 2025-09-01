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

const AddCategory = AsyncHandler(async (req, res) => {
  try {
    const { name, description } = req.body;
    await client.query(
      `INSERT INTO Product (name, description) VALUES ('${name}', '${description}',${categoryID}) ON CONFLICT (name) DO NOTHING;;`
    );
    return res
      .status(200)
      .json(new ApiReponse(200, {}, "Product added successfully"));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new ApiReponse(500, error, "Something went wrong"));
  }
});

const DeleteProduct = AsyncHandler(async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      throw ApiError(400, "product id not found");
    }
    await client.query(`DELETE FROM product WHERE id = ${id};`);
    return res
      .status(200)
      .json(new ApiReponse(200, {}, "Product deleted successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiReponse(500, { error }, error.message ?? "Something went wrong")
      );
  }
});

const UpdateProduct = AsyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { name, categoryID, description } = req.body;
    console.log(`${name},${categoryID},${description}`);
    if (!name) {
      throw ApiError(400, "product name is not found");
    }
    if (!categoryID) {
      throw ApiError(400, "product category is not found");
    }
    await client.query(`UPDATE product
        SET name = '${name}', description = '${description}', categoryID = '${categoryID}' 
        WHERE id = ${id};`);

    return res
      .status(200)
      .json(new ApiReponse(200, {}, "product data updated succcessfully"));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new ApiReponse(500, error, "Something went wrong"));
  }
});


export { CategoryList };
