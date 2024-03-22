import sql from "mssql";
import { getConnection } from "../database/connection.js";

//*obtener todos los productos
export const getProducts = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM products");
  res.json(result.recordset);
};

//* obtener solo un producto
export const getProduct = async (req, res) => {
  const pool = await getConnection();

  const result = await pool
    .request()
    .input("id", sql.Int, req.params.id)
    .query("SELECT * FROM products WHERE id = @id");

  if (!result.rowsAffected === 0) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }
  return res.json(result.recordset[0]);
};

//* crear un producto
export const createProduct = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("name", sql.VarChar, req.body.name)
    .input("price", sql.Decimal, req.body.price)
    .input("quantity", sql.Int, req.body.quantity)
    .input("description", sql.Text, req.body.description)
    .query(
      "INSERT INTO products (name, price, quantity, description) VALUES(@name, @price, @quantity, @description); SELECT SCOPE_IDENTITY() AS id "
    );
  console.log(result);
  res.json({
    id: result.recordset[0].id,
    name: req.body.name,
    description: req.body.description,
    quantity: req.body.quantity,
    description: req.body.description,
  });
};

//* actualizar un producto
export const updateProduct = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("id", sql.Int, req.params.id)
    .input("name", sql.VarChar, req.body.name) // Usar req.body en lugar de req.params
    .input("description", sql.Text, req.body.description) // Usar req.body en lugar de req.params
    .input("quantity", sql.Int, req.body.quantity) // Usar req.body en lugar de req.params
    .input("price", sql.Decimal, req.body.price) // Usar req.body en lugar de req.params
    .query(
      "UPDATE products SET name = @name, description = @description, quantity = @quantity, price = @price WHERE id = @id"
    );
  console.log(result);
  if (result.rowsAffected === 0) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json({
    id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    quantity: req.body.quantity,
    price: req.body.price,
  });
};

//* eliminar un producto
export const deleteProduct = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("id", sql.Int, req.params.id)
    .query("DELETE FROM products WHERE id = @id");

  if (!result.rowsAffected === 0) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }
  return res.json({ message: "Producto eliminado" });
};
