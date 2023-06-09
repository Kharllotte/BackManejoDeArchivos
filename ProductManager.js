const fs = require("fs");

const productos = []

class ProductManager {

    static countId = 0

    constructor(title, description, price, thumbnail, code, stock){
        this.path = "./files",  //Ruta donde se guardaran los archivos
        this.title = title,
        this.description = description,
        this.price = price,
        this.thumbnail = thumbnail,
        this.code = code,
        this.stock = stock   
    }

    contadorId(){
        let id = productos.length
        id = id+1
        return id
    }
    
    addProduct(){
        console.log(this.title)
        let id = this.contadorId()
        let title = this.title
        let description = this.description
        let price = this.price
        let thumbnail = this.thumbnail
        let code = this.code
        let stock = this.stock
        const product = {id, title, description, price, thumbnail, code, stock}
        console.log(product)
        productos.push(product)
        console.log(productos)
        fs.promises.writeFile(`${this.path}/Products.json`, JSON.stringify(productos))

    }

    getProducts= async ()=>{
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            console.log(data)
            const arrayJava = JSON.parse(data)
            console.log(arrayJava)
            return arrayJava
        } else {
            return console.log([])
        } 
    }

    getProductByid= async (id) =>{
        let arrayJava = await this.getProducts()
        let arrayId =arrayJava.find(producto => producto.id === id)
        console.log(arrayId)
    }

    updateProducts = async ({id, ...producto}) =>{
        await this.deleteProducts(id)
        let producroViejo = await this.getProducts();
        let editado =[{id, ...producto}, ...producroViejo]
    }

    deleteProducts = async(id) =>{
        let arrayJava = await this.getProducts()
        let arrayFilter = arrayJava.filter(producto => producto.id != id)
        console.log(arrayFilter);
        console.log("producto eliminado");
    }

}

const producto1 = new ProductManager("producto1", "DescripcionProducto1", 30, "Sin imagen1", "abc123", 25)
const producto2 = new ProductManager("producto2", "DescripcionProducto2", 25, "Sin imagen2", "def456", 2)
const producto3 = new ProductManager("producto3", "DescripcionProducto3", 76, "Sin imagen3", "ghi789", 7)


producto1.addProduct()
console.log("Ver segundo producto")
producto2.addProduct()
producto3.addProduct()
console.log("GET");
producto3.getProducts()
console.log("Delete");
producto1.deleteProducts(1)
producto3.updateProducts(
    {
        id: 3,
        title: 'Actualizando producto',
        description: 'Producto actualizad0',
        price: 200,
        thumbnail: 'Sin imagen3',
        code: 'ghifd789',
        stock: 5
      }
)
// console.log(producto1.contadorId())
