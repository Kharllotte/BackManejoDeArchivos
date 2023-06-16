const fs = require("fs");

class ProductManager{
    static id = 0
    constructor(){
        this.path = "./products.json";
        this.products = []
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        ProductManager.id++
        let newProduct = {id: ProductManager.id, title, description, price, thumbnail, code, stock};
        this.products.push(newProduct);
        fs.promises.writeFile(this.path, JSON.stringify(this.products), "utf-8")
        .then(()=> console.log("Producto añadido exitosamente"))
        .catch((error) => console.error("Error No se pudo agregar el producto:", error));
        
    }

    getProducts = async () => {
        try {
          const data = await fs.promises.readFile(this.path, "utf-8");
          const products = JSON.parse(data);
          console.log(products);
        } catch (error) {
          console.error("No se pudo obtener los productos", error);
        }
    }

    getProductByID = async (id) => {
      try {
        const data = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(data);
        const findProduct = products.find((x) => x.id === id);
        console.log(findProduct);
      } catch (error) {
        console.error("Error No se pudo obtener el producto por id:", error);
      }
    }

    deleteProduct = async (id) => {
      try {
        const data = await fs.promises.readFile(this.path, "utf-8");
        if (data.trim().length === 0) {
          console.log("El archivo está vacío");
          return;
        }
        const products = JSON.parse(data);
        const updateProduct = products.filter((x) => x.id !== id);
        if (products.length === updateProduct.length) {
          console.log("No se encontró ningún producto con el id");
          return;
        }
        await fs.promises.writeFile(this.path, JSON.stringify(updateProduct), "utf-8");
        console.log("El producto se ha eliminado exitosamente");
      } catch (error) {
        console.error("Error No se pudo eliminar el producto:", error);
      }
    }

    updateProducts = async (id, newData) => {
      try {
        const data = await fs.promises.readFile(this.path, "utf-8");
        if (data.trim().length === 0) {
          console.log("El archivo está vacío.");
          return;
        }
        const products = JSON.parse(data);
        const productById = products.findIndex((x) => x.id === id);
        if (productById === -1) {
          console.log("No se encontró ningún producto con el id");
          return;
        }
        products[productById] = { ...products[productById], ...newData };
        await fs.promises.writeFile(this.path, JSON.stringify(products), "utf-8");
        console.log("El producto se actualizo exitosamente.");
      } catch (error) {
        console.error("Error no se pudo actualizar el producto:", error);
      }
    }      
      
}


const producto1 = {title: "producto1", description: "DescripcionProducto1", price: 30, thumbnail: "SinImagen1", code: "abc123", stock: 25}
const producto2 = {title: "producto2", description: "DescripcionProducto2", price: 25, thumbnail: "SinImagen2", code: "def456", stock: 2}
const producto3 = {title: "producto3", description: "DescripcionProducto3", price: 76, thumbnail: "SinImagen3", code: "ghi789", stock: 7}
const updatedData = {title: "producto 24", description: "fewfv", price: 25, thumbnail: "veew", code: "ewgfwe", stock: 100};

const productos = new ProductManager();
productos.addProduct(producto1);
productos.addProduct(producto2);
productos.addProduct(producto3);

// productos.getProducts();
// productos.getProductByID(2);
// productos.deleteProduct(1);
// productos.updateProducts(2, updatedData);

