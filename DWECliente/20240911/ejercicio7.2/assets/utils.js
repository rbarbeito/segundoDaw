import CarritoDeCompras from './clases/carrito.js'
import Inventario from './clases/inventario.js'

const carrito = new CarritoDeCompras()
const inventario = new Inventario()

// Utiles
export const makeid = (length = 10) => {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}

export const interaccion = (sku) => {
  let divProduct = document.getElementById('productos')
  divProduct.classList.toggle('hidden')

  document.getElementById('productDetails').classList.toggle('hidden')
  if (divProduct.classList.contains('hidden')) {
    divDetailsProduct(inventario.findProductBySku(sku))
  }
  document.getElementsByTagName('main')[0].classList.toggle('fullHeight')
}

/* Creando articulos y sus acciones */
export const createArticle = (product) => {
  let article = document.createElement('article')
  article.classList.add('article')
  article.setAttribute('id', `article-${product.sku}`)

  let contenedorImage = document.createElement('div')
  contenedorImage.classList.add('contenedor_imagen')

  let imgProducto = document.createElement('img')
  imgProducto.classList.add('article_img')
  imgProducto.src = product.thumbnail

  let tituloProducto = document.createElement('p')
  tituloProducto.classList.add('titulo_producto')
  tituloProducto.innerText = product.title

  let addCarIcon = document.createElement('a')
  addCarIcon.setAttribute('id', `addCar-${product.sku}`)
  addCarIcon.classList.add('add_car_icon')
  addCarIcon.innerHTML = '<i class="fa-solid fa-cart-plus fa-lg"></i>'

  let divRatingProduct = document.createElement('div')
  divRatingProduct.classList.add('divRatingProduct')

  let ratingStar = document.createElement('span')
  ratingStar.classList.add('estrellas')
  ratingStar.innerHTML = rating(product.rating)

  let priceOutlet = document.createElement('div')
  priceOutlet.classList.add('price_outlet')

  let discountText = document.createElement('p')
  discountText.innerText = precioOferta(
    product.price,
    parseInt(product.discountPercentage)
  )

  let priceText = document.createElement('p')
  priceText.innerText = product.price

  let backgroundStocks =
    product.stock > 5
      ? 'green-background'
      : product.stock > 1
      ? 'orange-background'
      : 'red-background'

  let cantProducts = document.createElement('p')
  cantProducts.classList.add('cant_products')
  cantProducts.classList.add(backgroundStocks)

  let fontAwesomeBoxes = document.createElement('i')
  fontAwesomeBoxes.classList.add('fa-solid', 'fa-boxes-stacked')
  fontAwesomeBoxes.style.fontSize = '.7rem'

  let spanStock = document.createElement('span')
  spanStock.setAttribute('id', `spanStock-${product.sku}`)
  spanStock.style['font-size'] = '.7rem'
  spanStock.innerText = ` ${product.stock} ${disponibilidad(product.stock)}`

  cantProducts.appendChild(fontAwesomeBoxes)
  cantProducts.appendChild(spanStock)

  let oferta = document.createElement('p')
  oferta.classList.add('oferta')
  oferta.innerText = `Ahorra ${product.discountPercentage} %`

  let iconProductDetails = document.createElement('i')
  iconProductDetails.classList.add('fa-solid', 'fa-eye', 'iconProductDetails')
  iconProductDetails.setAttribute('id', `details_${product.sku}`)
  iconProductDetails.style.cursor = 'pointer'

  /**
   * Creacion de tarjeta de producto
   */
  productos.appendChild(article)
  article.appendChild(contenedorImage)
  contenedorImage.appendChild(imgProducto)
  article.appendChild(tituloProducto)
  article.appendChild(addCarIcon)
  article.appendChild(divRatingProduct)
  divRatingProduct.appendChild(ratingStar)

  article.appendChild(cantProducts)

  article.appendChild(priceOutlet)
  article.appendChild(iconProductDetails)

  if (parseInt(product.discountPercentage) > 3) {
    priceOutlet.appendChild(discountText)
    priceOutlet.appendChild(priceText)
    article.appendChild(oferta)
    return
  }

  priceOutlet.appendChild(priceText)
}

export const disponibilidad = (stock) => {
  return stock > 1 ? ' disponibles' : ' disponible'
}

export const addToCar = (producto) => {
  let precio =
    producto.discountPercentage > 3
      ? precioOferta(producto.price, producto.discountPercentage)
      : producto.price

  let compra = Number(inventario.getStock(producto.sku)) - 1

  inventario.updateProductStock(producto.sku, compra)

  if (compra < 0) {
    return
  }

  carrito.agregarProducto(producto.sku, producto.title, precio, 1)

  document.getElementById(
    `spanStock-${producto.sku}`
  ).innerText = ` ${inventario.getStock(producto.sku)}  ${disponibilidad(
    inventario.getStock(producto.sku)
  )}`

  if (carrito.calcularTotalProductos() > 0) {
    let badgeCantidadProductos = document.getElementById(
      'badgeCantidadProductos'
    )
    badgeCantidadProductos.innerText = carrito.calcularTotalProductos()
    badgeCantidadProductos.classList.remove('hide')
  }
}

export const precioOferta = (precio, porciento) => {
  let descuento = Number(precio) * (Number(porciento) / 100)
  let precio_venta = Number(precio) - Number(descuento)

  return precio_venta.toFixed(2)
}

export const rating = (rating) => {
  let full = '<i class="fa-solid fa-star"></i>'
  let half = '<i class="fa-solid fa-star-half-alt"></i>'
  let empty = '<i class="far fa-star"></i>'

  let final = ''

  let ratingList = rating.toString().split('.')

  if (Number(rating) == 0) {
    for (let i = 0; i < 5; i++) {
      final += empty
    }

    return final
  }

  let contador = 0

  for (let index = 0; index < Number(ratingList[0]); index++) {
    final += full
    contador += 1
  }

  if (Number(ratingList[1] > 0)) {
    final += half
    contador += 1
  }

  if (contador < 5) {
    for (let index = 0; index < 5 - contador; index++) {
      final += empty
    }
  }

  return final
}

// Creacion del carrito de compra Lateral
export const createCarTContent = () => {
  let carSlide = document.getElementById('carSlide')
  let productosCar = carrito.productosCarrito()

  carSlide.innerText = ''

  let totalCar = document.createElement('div')
  totalCar.classList.add('totalCar')

  let buttonAPagar = document.createElement('a')
  buttonAPagar.classList.add('buttonAPagar')

  let iconFontAwesomePagar = document.createElement('i')
  iconFontAwesomePagar.classList.add('fa-solid', 'fa-cash-register', 'fa-fw')

  let textoPagar = document.createElement('span')
  textoPagar.textContent = ` Pagar ${'\u20AC'}${Number(
    carrito.calcularTotalDinero()
  ).toFixed(2)}`

  let divProductosCar = document.createElement('div')
  divProductosCar.classList.add('productsCar')

  Object.entries(productosCar).forEach((item) => {
    divProductosCar.appendChild(itemsCar(item))
  })

  buttonAPagar.appendChild(iconFontAwesomePagar)
  buttonAPagar.appendChild(textoPagar)

  carSlide.appendChild(divProductosCar)
  carSlide.appendChild(totalCar)
  totalCar.appendChild(buttonAPagar)
}

export const itemsCar = ([key, product]) => {
  let article = document.createElement('article')
  article.classList.add('article-car')
  article.setAttribute('id', `articleCar-${product.sku}`)

  let divImagenProd = document.createElement('div')
  divImagenProd.classList.add('divImagenProd')

  let imgProdCart = document.createElement('img')
  imgProdCart.classList.add('imgProdCart')
  imgProdCart.src = inventario.getImageThumbnail(key)

  divImagenProd.appendChild(imgProdCart)

  let divInformacionCart = document.createElement('div')
  divInformacionCart.classList.add('divInformacionCart')

  let contentPrimario = document.createElement('div')
  contentPrimario.classList.add('contentPrimario')

  let contentSecundario = document.createElement('div')
  contentSecundario.classList.add('contentSecundario')

  let nombreProductoCar = document.createElement('p')
  let longitudTexto = 25
  nombreProductoCar.innerText = `${product.producto.substring(
    0,
    longitudTexto
  )}${product.producto.length > longitudTexto ? '...' : ''} `

  let precioProductoCar = document.createElement('p')
  precioProductoCar.innerText = product.precio

  const divCantidad = document.createElement('div')
  divCantidad.classList.add('divCantidad')

  // Crear botón de decremento
  const decrementIcon = document.createElement('i')
  decrementIcon.classList.add('fa-solid', 'fa-minus', 'fa-fw')
  decrementIcon.classList.add('decrementIcon')
  decrementIcon.style.cursor = 'pointer'

  // Crear input para mostrar la cantidad
  const inputCantidad = document.createElement('input')
  inputCantidad.classList.add('inputCantidad')
  inputCantidad.setAttribute('readonly', true)
  inputCantidad.value = carrito.cantProductoCarrito(key)

  // Crear botón de incremento
  const incrementIcon = document.createElement('i')
  incrementIcon.classList.add('fa-solid', 'fa-plus', 'fa-fw')
  incrementIcon.classList.add('incrementIcon')
  incrementIcon.style.cursor = 'pointer'

  divCantidad.appendChild(decrementIcon)
  divCantidad.appendChild(inputCantidad)
  divCantidad.appendChild(incrementIcon)

  // Crear ícono de basura (emoji)
  const deleteIcon = document.createElement('i')
  deleteIcon.classList.add('fa-regular', 'fa-trash-can', 'fa-xl')
  deleteIcon.style.color = 'red'
  deleteIcon.style.cursor = 'pointer'

  article.appendChild(divImagenProd)
  article.appendChild(divInformacionCart)

  divInformacionCart.appendChild(contentPrimario)
  contentPrimario.appendChild(nombreProductoCar)
  contentPrimario.appendChild(precioProductoCar)

  // Agregar los elementos al contenedor
  contentSecundario.appendChild(divCantidad)
  contentSecundario.appendChild(deleteIcon)

  divInformacionCart.appendChild(contentSecundario)

  return article
}

// Creacion de los detalles del producto
export const divDetailsProduct = (product) => {
let productDetails=document.getElementById('productDetails')



let productDetailsExtras = document.createElement('div')
productDetailsExtras.classList.add('productDetailsExtras')

let productDetailsGaleria = document.createElement('div')
productDetailsGaleria.classList.add('productDetailsGaleria')


productDetails.appendChild(productDetailsExtras)
productDetails.appendChild(productDetailsGaleria)
}
