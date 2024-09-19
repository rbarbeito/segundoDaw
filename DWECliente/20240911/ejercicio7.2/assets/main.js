import Producto from './clases/producto.js'
import Inventario from './clases/inventario.js'

import {
  createArticle,
  addToCar,
  createCarTContent,
  interaccion,
} from './utils.js'

let iconCart = document.getElementById('iconCart')
let carSlide = document.getElementById('carSlide')

let positionRigth = false


const inventario = new Inventario()

window.onload = async () => {
  const consulta = async () => {
    try {
      const respuesta = await fetch('https://dummyjson.com/products')
      const json = await respuesta.json()
      return json
    } catch (error) {
      console.log(error)
    }
  }

  const { products } = await consulta()

  for (const product of products) {
    const producto = await new Producto(product)

    await inventario.addProduct(producto)
    await createArticle(producto)

    document
      .getElementById(`addCar-${producto.sku}`)
      .addEventListener('click', () => {
        addToCar(producto)
      })

   document
     .getElementById(`details_${product.sku}`)
     .addEventListener('click', () => {
      interaccion(product.sku)
     })   
  }
}

iconCart.addEventListener('click', async () => {
  carSlide.style.right = positionRigth != 1 ? '0' : '-450px'
  carSlide.style.display = positionRigth != 1 ? 'flex' : 'none'
  positionRigth = !positionRigth
  createCarTContent()
})

