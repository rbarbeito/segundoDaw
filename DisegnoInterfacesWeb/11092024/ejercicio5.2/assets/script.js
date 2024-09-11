let adicionar = document.getElementById('adicionar')
let listado = document.getElementById('listado')

// datos del formulario
let departamento = document.getElementById('departamento')
let nombre = document.getElementById('nombre')
let salario = document.getElementById('salario')

let personas = []

const add = (persona) => {
  personas.push(persona)
}

const buscarNombre = (nombre) => {
  return personas.find((el) => el.nombre == nombre)[0]
}

const buscarDepartamento = (departamento) => {
  return personas.filter((el) => (el.departamento = departamento))
}

const createArticle = (persona) => {
  console.log('persona :', persona)

  let article = document.createElement('article')
  article.classList.add('article')

  let imagenAvatar = document.createElement('img')
  imagenAvatar.src = `https://avatar.iran.liara.run/public?usearname=${
    persona.nombre.split(' ')[0]
  }`
  imagenAvatar.classList.add('avatar')

  let datos = document.createElement('datos')
  datos.classList.add('datos')

  let nombreH2 = document.createElement('h2')
  nombreH2.innerText = persona.nombre

  let departamentoP = document.createElement('p')
  departamentoP.innerText = persona.departamento

  let salarioP = document.createElement('p')
  salarioP.setAttribute('class','salario')
  salarioP.innerText = persona.salario

  let btnBorrar = document.createElement('a')
  btnBorrar.setAttribute('id', 'borrar')
  btnBorrar.innerText = 'Borrar'

  article.appendChild(imagenAvatar)
  article.appendChild(datos)
  article.appendChild(salarioP)
  article.appendChild(btnBorrar)
  datos.appendChild(nombreH2)
  datos.appendChild(departamentoP)

  listado.appendChild(article)
}

adicionar.addEventListener('click', () => {
  if (nombre.value == '') {
    alert('El nombre no debe estar vacio')
    return
  }
  if (salario.value == '') {
    alert('El salario no debe estar vacio')
    return
  }
  if (isNaN(salario.value)) {
    alert('El valor introducido no es un numero')
    return
  }

  let persona = {
    nombre: nombre.value,
    salario: Number(salario.value),
    departamento: departamento.value,
  }
  const myPromise = new Promise((resolve, reject) => {
    resolve(add(persona))
  })

  myPromise.then(() => {
    createArticle(persona)
  })
})
