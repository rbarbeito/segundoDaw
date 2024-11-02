const menuPostres = [
  {
    name: 'Pastel de Chocolate',
    categorie: 'Pasteles',
    price: 5.5,
    image: './assets/img/cake-3577073_1280.jpg',
    count: 10,
  },
  {
    name: 'Pastel de Zanahoria',
    categorie: 'Pasteles',
    price: 4.5,
    image: './assets/img/carrot-cake-2771296_1280.jpg',
    count: 8,
  },
  {
    name: 'Cheesecake',
    categorie: 'Pasteles',
    price: 6.0,
    image: './assets/img/cheesecake-2598695_1280.jpg',
    count: 15,
  },
  {
    name: 'Tarta de Manzana',
    categorie: 'Pasteles',
    price: 5.0,
    image: './assets/img/dessert-6795726_1280.jpg',
    count: 5,
  },
  {
    name: 'Helado de Vainilla',
    categorie: 'Helados',
    price: 3.0,
    image: './assets/img/R.jpeg',
    count: 12,
  },
  {
    name: 'Helado de Chocolate',
    categorie: 'Helados',
    price: 3.5,
    image: './assets/img/6b724913a4d64d47fb47cabc72718075.jpg',
    count: 10,
  },
  {
    name: 'Helado de Fresa',
    categorie: 'Helados',
    price: 3.2,
    image: './assets/img/OIP.jpeg',
    count: 14,
  },
  {
    name: 'Helado de Pistacho',
    categorie: 'Helados',
    price: 3.8,
    image: './assets/img/pistacho.jpeg',
    count: 6,
  },

  {
    name: 'Ensalada de Frutas',
    categorie: 'Postres Saludables',
    price: 4.0,
    image: './assets/img/frutas.jpeg',
    count: 7,
  },
]

const cart = {}

/**
 * The `createProducts` function dynamically generates product cards for desserts with add to cart
 * functionality.
 */
const createProducts = () => {
  let containerDesserts = document.getElementById('container_desserts')
  for (let i = 0; i < 9; i++) {
    const id = uniqueId()
    menuPostres[i].id = id

    const article = document.createElement('article')

    const container_img = document.createElement('div')
    container_img.classList.add('container_img')
    article.appendChild(container_img)

    const container_details = document.createElement('div')
    container_details.classList.add('container_details')
    article.appendChild(container_details)

    const imagen_producto = document.createElement('img')
    imagen_producto.src = `${menuPostres[i].image}`
    container_img.appendChild(imagen_producto)

    const btn_add = document.createElement('div')
    btn_add.setAttribute('id', 'btn_add')
    container_details.appendChild(btn_add)

    const icono_cart = document.createElement('i')
    icono_cart.classList.add('fa-solid', 'fa-cart-plus')
    let add_to_cart = document.createElement('span')
    add_to_cart.innerText = 'Add to Cart'

    btn_add.appendChild(icono_cart)
    btn_add.appendChild(add_to_cart)

    const btn_more = document.createElement('div')
    btn_more.classList.add('btn_more', 'oculto')
    container_details.appendChild(btn_more)

    const span_minus = document.createElement('i')
    span_minus.classList.add('fa-solid', 'fa-circle-minus')

    const span_counter = document.createElement('span')
    span_counter.setAttribute('class', 'span_counter')

    const span_more = document.createElement('i')
    span_more.classList.add('fa-solid', 'fa-circle-plus')

    btn_more.appendChild(span_minus)
    btn_more.appendChild(span_counter)
    btn_more.appendChild(span_more)

    const categorie = document.createElement('p')
    categorie.classList.add('categorie')
    categorie.innerText = `${menuPostres[i].categorie}`
    container_details.appendChild(categorie)

    const name = document.createElement('p')
    name.classList.add('name')
    name.innerText = `${menuPostres[i].name}`
    container_details.appendChild(name)

    const price = document.createElement('p')
    price.classList.add('price')
    price.innerHTML = `&euro; ${Number(menuPostres[i].price).toFixed(2)}`
    container_details.appendChild(price)

    btn_add.addEventListener('click', () => {
      menuPostres[i].incart = 1

      if (Object.keys(cart).length == 0) {
        toggleCart()
      }

      span_counter.innerText = menuPostres[i].incart
      cart[id] = menuPostres[i]
      btn_more.classList.toggle('oculto')
      btn_add.classList.toggle('oculto')
      container_img.classList.toggle('border_in_car')

      createCart(id)
    })

    span_minus.addEventListener('click', () => {
      --cart[id].incart

      const position = positionInCarById(id)

      if (cart[id].incart == 0) {
        btn_more.classList.toggle('oculto')
        btn_add.classList.toggle('oculto')
        container_img.classList.toggle('border_in_car')

        const list = document.getElementById('list_of_cart')
        list.removeChild(list.children[position])
        delete cart[id]
      } else {
        span_counter.innerText = `${cart[id].incart}` || '0'
      }

      updateValoresCarrito()
    })

    span_more.addEventListener('click', () => {
      ++cart[id].incart

      const position = positionInCarById(id)
      updateCar({ id, position })
      span_counter.innerText = `${cart[id].incart}`
    })

    containerDesserts.appendChild(article)
  }
}

/**
 * The `createCart` function dynamically creates and appends a new item to a shopping cart list on a
 * web page.
 */
const createCart = (id) => {
  let list_of_cart = document.getElementById('list_of_cart')

  const li = document.createElement('li')
  li.classList.add('animate__animated', 'animate__fadeIn', 'animate__slower')

  const p_nombre = document.createElement('p')
  li.appendChild(p_nombre)
  p_nombre.innerText = cart[id].name

  const div_contabilidad = document.createElement('div')
  li.appendChild(div_contabilidad)

  const contabilidad_cantidad = document.createElement('span')
  contabilidad_cantidad.setAttribute('class', 'contabilidad_cantidad')
  contabilidad_cantidad.innerText = `${cart[id].incart}x`
  div_contabilidad.appendChild(contabilidad_cantidad)

  const precio_unidad = document.createElement('span')
  precio_unidad.setAttribute('class', 'precio_unidad')
  precio_unidad.innerHTML = `&#64; &euro;${Number(cart[id].price).toFixed(2)}`
  div_contabilidad.appendChild(precio_unidad)

  const total_producto = document.createElement('span')
  total_producto.setAttribute('class', 'total_producto')
  total_producto.innerHTML = `&euro;${Number(
    cart[id].price * cart[id].incart
  ).toFixed(2)}`
  div_contabilidad.appendChild(total_producto)

  const icono_borrar = document.createElement('i')
  icono_borrar.classList.add('fa-regular', 'fa-circle-xmark')
  icono_borrar.setAttribute('id', id)
  li.appendChild(icono_borrar)

  list_of_cart.appendChild(li)
  updateValoresCarrito()

  document.getElementById(`${id}`).addEventListener('click', (oObject) => {
    const id = oObject.target.id

    resetProducts(id)
  })
}

/**
 * The `updateValoresCarrito` function updates the total number of products and the total value of the
 * cart displayed on a webpage.
 */
const updateValoresCarrito = () => {
  const { totalCarrito, totalProducts } = totalOfCart()

  document.getElementById('h2_total').innerHTML = `Your Cart (${totalProducts})`

  document.getElementById(
    'total_cart'
  ).innerHTML = `&euro;${totalCarrito.toFixed(2)}`

  if (Object.keys(cart).length == 0) {
    toggleCart()
  }
}

/**
 * The function `createOrderConfirmation` generates an order confirmation summary based on the items in
 * the cart.
 */
const createOrderConfirmation = () => {
  const ulResumeOrderConfirm = document.getElementById('resume')

  if (ulResumeOrderConfirm.hasChildNodes) {
    while (ulResumeOrderConfirm.firstChild) {
      ulResumeOrderConfirm.removeChild(ulResumeOrderConfirm.firstChild)
    }
  }

  if (Object.keys(cart).length > 0) {
    for (const [key, value] of Object.entries(cart)) {
      const resumeOrderOfCar = document.createElement('li')

      const imgProduct = document.createElement('img')
      resumeOrderOfCar.appendChild(imgProduct)
      imgProduct.src = value.image

      const divDataResume = document.createElement('div')
      divDataResume.classList.add('data_resume')
      resumeOrderOfCar.appendChild(divDataResume)

      const pNameProduct = document.createElement('p')
      pNameProduct.innerText = value.name
      pNameProduct.classList.add('nombre_producto')
      divDataResume.appendChild(pNameProduct)

      const divCantProduct = document.createElement('div')
      divCantProduct.classList.add('cantidad_producto')
      divDataResume.appendChild(divCantProduct)

      const spanCant = document.createElement('span')
      spanCant.innerHTML = `${value.incart}x`
      divCantProduct.appendChild(spanCant)

      const spanPriceUnit = document.createElement('span')
      spanPriceUnit.innerHTML = `&#64; &euro;${Number(value.price).toFixed(2)}`
      divCantProduct.appendChild(spanPriceUnit)

      const pTotalProduct = document.createElement('p')
      pTotalProduct.innerHTML = `&euro;${(
        Number(value.incart) * Number(value.price)
      ).toFixed(2)}`
      pTotalProduct.classList.add('total_producto')
      resumeOrderOfCar.appendChild(pTotalProduct)

      ulResumeOrderConfirm.appendChild(resumeOrderOfCar)
    }

    const { totalCarrito } = totalOfCart()

    document
      .getElementById('total_resume')
      .querySelectorAll('p')[1].innerHTML = `&euro; ${totalCarrito.toFixed(2)}`
  }
}

/**
 * The `updateCar` function updates the quantity and total price of a product in the shopping cart.
 * @param position - The `position` parameter in the `updateCar` function is used to specify the index
 * of the element in the `cart` array that needs to be updated in the HTML document. It is used to
 * target specific elements in the DOM and update their content based on the corresponding data in the
 * `cart
 */

const updateCar = ({ id, position }) => {
  document.querySelectorAll('.contabilidad_cantidad')[
    position
  ].innerText = `${cart[id].incart}x`

  document.querySelectorAll('.total_producto')[
    position
  ].innerHTML = `&euro;${Number(cart[id].price * cart[id].incart).toFixed(2)}`

  updateValoresCarrito()
}

/**
 * The function calculates the total price and quantity of items in a shopping cart and sets up event
 * listeners for deleting items.
 */
const totalOfCart = () => {
  const totalCarrito = Object.values(cart).reduce(
    (accumulator, el) => accumulator + Number(el.price) * Number(el.incart),
    0
  )

  const totalProducts = Object.values(cart).reduce(
    (acumulador, el) => acumulador + Number(el.incart),
    0
  )

  return { totalCarrito, totalProducts }
}

/**
 * The function `positionInCarById` returns the index of a list item element within its parent
 * unordered list element based on the provided element ID.
 * @param id - The `id` parameter is the unique identifier of an element in the HTML document.
 * @returns The function `positionInCarById` returns the index of the `<li>` element within its parent
 * `<ul>` element.
 */
const positionInCarById = (id) => {
  const childElement = document.getElementById(id)
  const liElement = childElement.closest('li')
  const ulElement = liElement.closest('ul')
  return Array.from(ulElement.children).indexOf(liElement)
}

/**
 * The uniqueId function generates a random unique identifier of a specified length.
 * @param [length=16] - The `length` parameter in the `uniqueId` function specifies the length of the
 * unique identifier that will be generated. By default, if no length is provided, the function will
 * generate a unique identifier with a length of 16 characters.
 * @returns The uniqueId function generates a random number based on the current timestamp and returns
 * it as an integer with a specified length.
 */
const uniqueId = (length = 16) => {
  return parseInt(
    Math.ceil(Math.random() * Date.now())
      .toPrecision(length)
      .toString()
      .replace('.', '')
  )
}

/* The above JavaScript code is adding an event listener to an element with the id "new_order". When
this element is clicked, the code loops through the keys of an object named "cart" and calls a
function named "resetProducts" for each key. After that, it calls functions named
"updateValoresCarrito" and "toggleCart". */
document.getElementById('new_order').addEventListener('click', () => {
  for (const key of Object.keys(cart)) {
    resetProducts(key)
  }
})

/**
 * The `resetProducts` function removes a product from the cart and updates the display accordingly.
 * @param id - The `id` parameter in the `resetProducts` function is used to identify the specific
 * product that needs to be reset. This function seems to be part of a larger codebase related to
 * managing a list of products and a shopping cart. When the `resetProducts` function is called with a
 * specific
 */
const resetProducts = (id) => {
  const indexMenu = menuPostres.findIndex((el) => el.id == id)

  const article = document.querySelectorAll('#container_desserts article')[
    indexMenu
  ]

  const containerImagen = article.querySelectorAll('.container_img')[0]
  containerImagen.classList.remove('border_in_car')

  const containerDetails = article.querySelectorAll('.container_details')[0]

  containerDetails.querySelectorAll('.btn_more')[0].classList.toggle('oculto')
  containerDetails.querySelectorAll('#btn_add')[0].classList.toggle('oculto')

  const position = positionInCarById(id)
  const listItems = Array.from(document.querySelectorAll('#list_of_cart li'))

  if (position >= 0 && position < listItems.length) {
    listItems[position].remove()
  } else {
    console.log('Posición inválida')
  }

  delete cart[id]
  updateValoresCarrito()
}

/* The above code is adding an event listener to a button with the id 'btn_confirm'. When the button is
clicked, it will call the function createOrderConfirmation(). */
document.getElementById('btn_confirm').addEventListener('click', () => {
  createOrderConfirmation()

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
})

/**
 * The function `toggleCart` toggles the visibility of two elements with the IDs 'container_empty_car'
 * and 'container_to_pay'.
 */
const toggleCart = () => {
  document.getElementById('container_empty_car').classList.toggle('oculto')
  document.getElementById('container_to_pay').classList.toggle('oculto')
}

createProducts()
