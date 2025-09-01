import { client } from "../DB/index.db.js";
import { ApiReponse } from "../utils/ApiResponse.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { AsyncHandler } from "../utils/AsyncHandler.utils.js";

const ProductList = AsyncHandler(async (req, res) => {
  try {
    const page = req.params.page;
    const categoryId = req.params.categoryId;
    const limit = 10;
    const count = await client
      .query(`select COUNT(*) from product;`)
      .then((val) => val.rows[0].count);

    const data = await client
      .query(
        `select product.id, product.name,product.created_at,product.description , (category.name) as category ,(category.id) as categoryID from product 
          INNER JOIN category ON Product.categoryID = category.id 
          ${categoryId != 0 ? `where category.id = ${categoryId}` : ""}
          ORDER BY id asc
          offset ${(page - 1) * limit} limit ${limit};`
      )
      .then((val) => val.rows);

    const isnext = page * 10 < count;

    return res
      .status(200)
      .json(
        new ApiReponse(
          200,
          { List: data, isnext: isnext },
          "List fetch success fully"
        )
      );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new ApiReponse(500, error, "Something went wrong"));
  }
});

const AddProduct = AsyncHandler(async (req, res) => {
  try {
    const { name, categoryID, description } = req.body;
    await client.query(
      `INSERT INTO Product (name, description, categoryID) VALUES ('${name}', '${description}',${categoryID}) ON CONFLICT (name) DO NOTHING;;`
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

export { ProductList, AddProduct, DeleteProduct, UpdateProduct };
