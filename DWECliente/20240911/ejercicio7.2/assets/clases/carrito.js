export default class CarritoDeCompras {
  static instance = null
  #productos = {}

  constructor() {
    if (CarritoDeCompras.instance) {
      return CarritoDeCompras.instance
    }

    CarritoDeCompras.instance = this
  }

  static getInstance() {
    if (!CarritoDeCompras.instance) {
      CarritoDeCompras.instance = new CarritoDeCompras()
    }
    return CarritoDeCompras.instance
  }

  agregarProducto(sku, producto, precio, cantidad) {
    if (this.#productos[sku]) {
      this.#productos[sku].cantidad += cantidad
      return
    }
    this.#productos[sku] = { producto, precio, cantidad }

    // console.log(`${producto} agregado al carrito.`)
  }

  eliminarProducto(key) {
    let producto = this.#productos.key.producto
    delete this.#productos.key
    console.log(`${producto} eliminado del carrito.`)
  }

  calcularTotalDinero() {
    let total = 0
    Object.entries(this.#productos).forEach(([key, value]) => {
      total += Number(value.precio) * Number(value.cantidad)
    })
    return total
  }

  calcularTotalProductos() {
    let total = 0
    Object.entries(this.#productos).forEach(([key, value]) => {
      total += Number(value.cantidad)
    })
    return total
  }

  productosCarrito() {
    return this.#productos
  }

  cantProductoCarrito(sku) {
    if (!this.#productos[sku]) {
      return console.log('No existe ese produto en el carrito')
    }
    return this.#productos[sku].cantidad
  }
}
