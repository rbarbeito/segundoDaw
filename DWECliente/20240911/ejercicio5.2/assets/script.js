let adicionar = document.getElementById('adicionar')
let salvarEdicion = document.getElementById('salvarEdicion')
let listado = document.getElementById('listado')
let loader = document.getElementById('loader')

let totalPersonas = document.getElementById('totalPersonas')
let totalSalarios = document.getElementById('totalSalarios')

// datos del formulario
let nombre = document.getElementById('nombre')
let salario = document.getElementById('salario')
let departamento = document.getElementById('departamento')
let idUser = document.getElementById('idUser')

// filtrado
let timeout = null
let buscar = document.getElementById('buscar-input')

let iconsContainer = document.querySelector('.buscador')
let iconsElementsLupa = iconsContainer.querySelector('.fa-magnifying-glass')
let iconsElementsCircle = iconsContainer.querySelector('.fa-circle-notch')

let personas = {
  qwe: {
    id: 'qwe',
    nombre: 'Roberto',
    salario: 200,
    departamento: 'Contabilidad',
  },
  ert: {
    id: 'ert',
    nombre: 'rodolfo',
    salario: 100,
    departamento: 'TICS',
  },
  yui: {
    id: 'yui',
    nombre: 'maria',
    salario: 100,
    departamento: 'RRHH',
  },
}

// Opciones de toastr
toastr.options = {
  showMethod: 'slideDown',
  hideMethod: 'fadeOut',
  closeMethod: 'fadeOut',
  preventDuplicates: true,
  progressBar: true,
  closeButton: true,
  timeOut: '3000',
}

// addeventListener
adicionar.addEventListener('click', () => {
  nombre.classList.remove('border-red')
  salario.classList.remove('border-red')
  departamento.classList.remove('border-red')

  if (nombre.value == '') {
    mensajeError('Debe escribir un nombre')
    nombre.focus()
    if (!nombre.classList.contains('border-red')) {
      nombre.classList.add('border-red')
    }

    return
  }
  if (salario.value == '') {
    mensajeError('Debe definir el salario')
    salario.focus()
    if (!salario.classList.contains('border-red')) {
      salario.classList.add('border-red')
    }
    return
  }

  if (isNaN(salario.value)) {
    mensajeError('El salario debe ser un numero')
    salario.focus()
    if (!salario.classList.contains('border-red')) {
      salario.classList.add('border-red')
    }
    return
  }

  if (departamento.value == '') {
    mensajeError('Debe definir el departamento')
    departamento.focus()
    if (!departamento.classList.contains('border-red')) {
      departamento.classList.add('border-red')
    }
    return
  }

  let persona = {
    id: makeid(),
    nombre: nombre.value.trim(),
    salario: Number(salario.value.trim()),
    departamento: departamento.value,
  }

  const myPromise = new Promise((resolve, reject) => {
    resolve(add(persona))
  })

  myPromise.then(() => {
    createArticle(persona)
    resetForm()
  })
})

buscar.addEventListener('keyup', (event) => {
  if (event.key == 'Backspace' && buscar.value == '') {
    listado.innerHTML = ''
    Object.entries(personas).forEach(([key, value]) =>
      createArticle(value, 'filtrar')
    )
    iconLupa()
  }
})

nombre.addEventListener('input', () => {
  if (nombre.classList.contains('border-red')) {
    nombre.classList.remove('border-red')
  }
})
salario.addEventListener('input', () => {
  if (salario.classList.contains('border-red')) {
    salario.classList.remove('border-red')
  }
})
departamento.addEventListener('click', () => {
  if (departamento.classList.contains('border-red')) {
    departamento.classList.remove('border-red')
  }
})

// Mensajes
const mensajeError = (mensaje) => toastr.error(mensaje)

// arrwos functions

const add = (persona) => {
  buscar.value = ''
  personas[persona.id] = persona
  toastr.success(
    `${Object.keys(personas).length} personas registradas`,
    'Adición satisfactoria'
  )
}

const buscarNombre = (nombre) => {
  let result = Object.fromEntries(
    Object.entries(personas).filter(([clave, persona]) =>
      persona.nombre.toLowerCase().includes(nombre.toLowerCase())
    )
  )

  return result
}

const borrar = (id) => {
  let artilcleRemove = document.getElementById(id)
  artilcleRemove.classList.add('animate__fadeOut')
  setTimeout(() => {
    artilcleRemove.remove()
  }, 750)
  
  delete personas[id]
  textos()
}

const totalPersonasCalculo = () => {
  return Object.keys(personas).length
}

const totalSalariosCalculo = () => {
  let suma = 0

  Object.entries(personas).forEach(([clave, persona]) => {
    suma += Number(persona.salario)
  })
  return suma
}

const obtenerImagen = async (persona) => {
  try {
    // Obtener el primer nombre
    const nombre = persona.nombre.split(' ')[0]

    // Llamada a la API para obtener el género
    const respSexo = await getSex(nombre)
    sexo = (await respSexo) != undefined ? respSexo : ''

    // Definir el género para el avatar
    let sexdefinition =
      {
        male: '/boy',
        female: '/girl',
      }[sexo] || ''

    // Retornar la URL del avatar
    return `https://avatar.iran.liara.run/public${sexdefinition}?usearname=${nombre}`
  } catch (error) {
    console.error('Error:', error.message)
  }
}

const getSex = async (nombre) => {
  return await fetch(`https://api.genderize.io/?name=${nombre}`)
    .then((response) => response.json())
    .then((data) => data.gender)
    .catch((error) => console.error('Fetch error:', error))
}

const makeid = (length = 10) => {
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

const textos = () => {
  let cantPersonas = totalPersonasCalculo()
  totalSalarios.innerText = `Gasto en salario: ${totalSalariosCalculo()}`
  totalPersonas.innerText =
    Number(cantPersonas) == 1
      ? `${cantPersonas} persona en la plantilla`
      : `${cantPersonas} personas en la plantilla`
}

const resetForm = () => {
  nombre.value = ''
  salario.value = ''
  departamento.value = ''
  idUser.value = ''
}

const createArticle = async (persona, create = 'crear') => {
  loader.classList.toggle('hide')

  let animation_entrada =
    {
      inicial: 'animate__bounceIn',
      filtrar: 'animate__zoomIn',
    }[create] || 'animate__backInLeft'

  let article = document.createElement('article')
  article.classList.add(
    'article',
    'hide',
    'animate__animated',
    animation_entrada
  )
  article.classList.add('hide')
  article.classList.add('hide')
  article.classList.add('hide')

  let imagenAvatar = document.createElement('img')
  imagenAvatar.src = await obtenerImagen(persona)

  imagenAvatar.classList.add('avatar')

  let datos = document.createElement('datos')
  datos.classList.add('datos')

  let nombreH2 = document.createElement('h2')
  nombreH2.innerText = persona.nombre

  let departamentoP = document.createElement('p')
  departamentoP.innerText = persona.departamento

  let salarioP = document.createElement('p')
  salarioP.setAttribute('class', 'salario')
  salarioP.innerText = persona.salario

  let btnBorrar = document.createElement('a')
  btnBorrar.setAttribute('id', 'borrar')
  btnBorrar.setAttribute('name', 'borrar')
  btnBorrar.innerHTML = '<i class="fa-regular fa-trash-can fa-lg"></i>'

  let btnEditar = document.createElement('a')
  btnEditar.setAttribute('id', 'editarButton')
  btnEditar.setAttribute('name', 'editarButton')
  btnEditar.innerHTML = '<i class="fa-solid fa-pen-to-square fa-lg"></i>'

  btnBorrar.addEventListener('click', function () {
    borrar(persona.id)
  })

  btnEditar.addEventListener('click', function () {
    editarUser(persona.id)
  })

  article.appendChild(imagenAvatar)
  article.appendChild(datos)
  article.appendChild(salarioP)
  article.appendChild(btnBorrar)
  article.appendChild(btnEditar)
  datos.appendChild(nombreH2)
  datos.appendChild(departamentoP)

  textos()

  article.setAttribute('id', persona.id)

  setTimeout(() => {
    listado.insertBefore(article, listado.firstChild)
    loader.classList.toggle('hide')
    document.getElementById(persona.id).classList.toggle('hide')
  }, 1)
}

const toggleElementsBuscador = () => {
  iconsElementsCircle.classList.toggle('hide')
  iconsElementsLupa.classList.toggle('hide')
}

const doDelayedSearch = () => {
  if (timeout) {
    clearTimeout(timeout)
  }

  if (buscar.value == '') {
    return
  }

  iconCircle()

  timeout = setTimeout(async () => {
    let personasFiltradas = await buscarNombre(buscar.value)
    listado.innerHTML = ''

    if (Object.keys(personasFiltradas).length == 0) {
      iconLupa()
      toastr.info('No se encontro nada')
      return
    }

    Object.entries(personasFiltradas).filter(([clave, valor]) => {
      createArticle(valor, 'filtrar')
    })

    iconLupa()
  }, 1000)
}

const editarUser = (id) => {
  adicionar.classList.add('hide')
  salvarEdicion.classList.remove('hide')

  let persona = personas[id]

  nombre.value = persona.nombre
  salario.value = persona.salario
  departamento.value = persona.departamento
  idUser.value = id
}

salvarEdicion.addEventListener('click', () => {
  nombre.classList.remove('border-red')
  salario.classList.remove('border-red')
  departamento.classList.remove('border-red')

  if (nombre.value == '') {
    mensajeError('Debe escribir un nombre')
    nombre.focus()
    if (!nombre.classList.contains('border-red')) {
      nombre.classList.add('border-red')
    }

    return
  }
  if (salario.value == '') {
    mensajeError('Debe definir el salario')
    salario.focus()
    if (!salario.classList.contains('border-red')) {
      salario.classList.add('border-red')
    }
    return
  }

  if (isNaN(salario.value)) {
    mensajeError('El salario debe ser un numero')
    salario.focus()
    if (!salario.classList.contains('border-red')) {
      salario.classList.add('border-red')
    }
    return
  }

  if (departamento.value == '') {
    mensajeError('Debe definir el departamento')
    departamento.focus()
    if (!departamento.classList.contains('border-red')) {
      departamento.classList.add('border-red')
    }
    return
  }

  let persona = {
    id: idUser.value.trim(),
    nombre: nombre.value.trim(),
    salario: Number(salario.value.trim()),
    departamento: departamento.value,
  }

  if (JSON.stringify(persona) == JSON.stringify(personas[persona.id])) {
    adicionar.classList.remove('hide')
    salvarEdicion.classList.add('hide')
    resetForm()
    toastr.warning('No se realizaron cambios')
    return
  }
  personas[persona.id] = persona

  let artilcleRemove = document.getElementById(persona.id)
  artilcleRemove.classList.add('animate__fadeOut')
  setTimeout(() => {
    adicionar.classList.remove('hide')
    salvarEdicion.classList.add('hide')
    artilcleRemove.remove()
    resetForm()
    createArticle(persona, 'inicial')
  }, 750)

  toastr.success('Registro actualizado satisfactoriamente', 'Actualización')
})

window.onload = () => {
  if (Object.keys(personas).length == 0) {
    return
  }

  Object.entries(personas).forEach(([clave, persona]) => {
    createArticle(persona, 'inicial')
  })
}

// comportamiento de input buscar
iconCircle = () => {
  if (!iconsElementsLupa.classList.contains('hide')) {
    iconsElementsLupa.classList.add('hide')
  }
  if (iconsElementsCircle.classList.contains('hide')) {
    iconsElementsCircle.classList.remove('hide')
  }
}

iconLupa = () => {
  if (iconsElementsLupa.classList.contains('hide')) {
    iconsElementsLupa.classList.remove('hide')
  }
  if (!iconsElementsCircle.classList.contains('hide')) {
    iconsElementsCircle.classList.add('hide')
  }
}
