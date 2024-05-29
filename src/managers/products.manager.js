import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async createProduct(obj) {
    try {
      const productFile = await this.getProducts();
      const productExist = productFile.find((u) => u.title === obj.title);
      
      if (productExist) {
        console.log("Error: El producto ya existe");
        return { error: "El producto ya existe" };
      }

      if (!obj.title || !obj.description || obj.price <= 0 || !obj.code || obj.stock <= 0 || !obj.category) {
        console.log("Error: Todos los campos son obligatorios");
        return { error: "Todos los campos son obligatorios" };
      }

      const product = {
        id: uuidv4(),
        status: true,
        ...obj,
      };

      productFile.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(productFile, null, "\t"));
      return product;
    } catch (error) {
      console.error("Error creando el producto:", error);
      return { error: "Error creando el producto" };
    }
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, 'utf8');
        return JSON.parse(products);
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error obteniendo los productos:", error);
      return [];
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const productExist = products.find((p) => p.id === id);
      if (!productExist) return null;
      return productExist;
    } catch (error) {
      console.error("Error obteniendo el producto por ID:", error);
      return null;
    }
  }

  async updateProduct(obj, id) {
    try {
      const products = await this.getProducts();
      let productExist = await this.getProductById(id);
      if (!productExist) return null;

      productExist = { ...productExist, ...obj };
      const newArray = products.filter((u) => u.id !== id);
      newArray.push(productExist);

      await fs.promises.writeFile(this.path, JSON.stringify(newArray, null, "\t"));
      return productExist;
    } catch (error) {
      console.error("Error actualizando el producto:", error);
      return null;
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      if (products.length > 0) {
        const productExist = await this.getProductById(id);
        if (productExist) {
          const newArray = products.filter((u) => u.id !== id);
          await fs.promises.writeFile(this.path, JSON.stringify(newArray, null, "\t"));
          return productExist;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error eliminando el producto:", error);
      return null;
    }
  }

  async deleteFile() {
    try {
      await fs.promises.unlink(this.path);
      console.log("Archivo eliminado");
    } catch (error) {
      console.error("Error eliminando el archivo:", error);
    }
  }
}

export default ProductManager;
