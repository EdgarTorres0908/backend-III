import ProductDao from "../Dao/product.dao";

const productDao = new ProductDao();

/**
 * Función para obtener todos los productos.
 * @param {number} page - Número de página.
 * @param {number} limit - Límite de productos por página.
 * @param {string} title - Título del producto (opcional).
 * @param {string} sort - Orden de los productos (asc o desc).
 * @returns {Promise<object>} - Lista de productos.
 */
export const getAllProducts = async (page, limit, title, sort) => {
  try {
    return await productDao.getAllProducts(page, limit, title, sort);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Función para obtener un producto por su ID.
 * @param {string} id - ID del producto.
 * @returns {Promise<object|boolean>} - Producto encontrado o false si no se encuentra.
 */
export const getProductById = async (id) => {
  try {
    const foundProduct = await productDao.getProductById(id);
    if (!foundProduct) return false;
    else return foundProduct;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Función para crear un nuevo producto.
 * @param {object} obj - Objeto con los datos del nuevo producto.
 * @returns {Promise<object|boolean>} - Producto creado o false si no se puede crear.
 */
export const createProduct = async (obj) => {
  try {
    const newProduct = await productDao.createProduct(obj);
    if (!newProduct) return false;
    else return newProduct;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Función para actualizar un producto existente.
 * @param {string} id .
 * @param {object} obj .
 * @returns {Promise<object|boolean>} .
 */
export const updateProduct = async (id, obj) => {
  try {
    const productUpdate = await productDao.updateProduct(id, obj);
    if (!productUpdate) return false;
    else return productUpdate;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Función para eliminar un producto por su ID.
 * @param {string} id - ID del producto a eliminar.
 * @returns {Promise<object|boolean>} - Producto eliminado o false si no se puede eliminar.
 */
export const deleteProduct = async (id) => {
  try {
    const productToDelete = await productDao.deleteProduct(id);
    if (!productToDelete) return false;
    else return productToDelete;
  } catch (error) {
    console.log(error);
  }
};