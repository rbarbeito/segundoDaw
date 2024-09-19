import Producto from './producto.js'



export default class Inventario {
  constructor() {
    if (Inventario.instance) {
      return Inventario.instance
    }

    this.products = {} // Usamos un objeto en lugar de un array

    Inventario.instance = this // Guardamos la instancia para futuras referencias
  }

  static getInstance() {
    if (!Inventario.instance) {
      Inventario.instance = new Inventario()
    }
    return Inventario.instance
  }

  /**
   * Método para agregar un nuevo producto al inventario usando el SKU como clave
   * @param {*} product
   */
  addProduct(product) {
    if (!(product instanceof Producto)) {
      return console.log(
        'Solo se pueden agregar instancias de la clase Product.'
      )
    }

    if (this.products[product.sku]) {
      return console.log(
        `Ya existe un producto con el SKU "${product.sku}" en el inventario.`
      )
    }

    this.products[product.sku] = product
    // console.log(
    //   `Producto "${product.title}" agregado al inventario con SKU "${product.sku}".`
    // )
  }

  /**
   *  Método para eliminar un producto por su SKU
   * @param {*} sku
   */
  removeProductBySku(sku) {
    if (!this.products[sku]) {
      return console.log(`Producto con SKU "${sku}" no encontrado.`)
    }

    const removedProduct = this.products[sku]
    delete this.products[sku]
    console.log(`Producto "${removedProduct.title}" eliminado del inventario.`)
  }

  /**
   * Método para buscar un producto por su SKU
   * @param {*} sku
   * @returns
   */
  findProductBySku(sku) {
    return this.products[sku] || null
  }

  /**
   * Método para listar todos los productos del inventario
   */
  listProducts() {
    const productKeys = Object.keys(this.products)
    if (productKeys.length !== 0) {
      let listaProducto = []
      productKeys.forEach((sku) => {
        const product = this.products[sku]
        listaProducto.push(product)
      })
      return listaProducto
    }
    console.log('El inventario está vacío.')
  }

  /**
   * Método para actualizar el stock de un producto por su SKU
   * @param {*} sku
   * @param {*} newStock
   */
  updateProductStock(sku, newStock) {
    const product = this.findProductBySku(sku)

    if (!product) {
      console.log(`Producto con SKU "${sku}" no encontrado.`)
      return
    }

    product.updateStock(newStock)
    // console.log(
    //   `Stock actualizado para el producto "${product.title}". Nuevo stock: ${product.stock}`
    // )
  }

  getStock(sku) {
    const product = this.findProductBySku(sku)

    if (!product) {
      console.log(`Producto con SKU "${sku}" no encontrado.`)
      return
    }

    return product.stock < 0 ? 0 : product.stock
  }

  /**
   * Método para calcular el valor total del inventario
   * @returns
   */
  calculateInventoryValue() {
    return Object.values(this.products).reduce(
      (total, product) => total + product.getFinalPrice() * product.stock,
      0
    )
  }

  /**
   * Método para obtener productos con bajo stock
   * @param {*} threshold
   * @returns
   */
  getLowStockProducts(threshold = 5) {
    const lowStockProducts = Object.values(this.products).filter(
      (product) => product.stock <= threshold
    )
    return lowStockProducts
  }

  getImageThumbnail(sku) {
    const product = this.findProductBySku(sku)

    if (!product) {
      console.log(`Producto con SKU "${sku}" no encontrado.`)
      return
    }

    return product.thumbnail
  }
}
