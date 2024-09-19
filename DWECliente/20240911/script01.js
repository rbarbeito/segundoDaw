const formulario = document.getElementById('formulario')
const nameInput = document.getElementById('name')
const edad = document.getElementById('edad')
const calculo = document.getElementById('calculo')
const volver = document.getElementById('volver')
const respuesta = document.getElementById('respuesta')
const texto = document.getElementById('texto')

calculo.addEventListener('click', () => {
  let nombre = nameInput.value
  console.log('nameInput.value :', nameInput.value)
  let edadTipo = edad.value

  if (nombre == '') {
    alert('Nombre no puede estar vacio')
    return
  }

  if (Number(edadTipo) < 1) {
    alert('Naciste este año, aun no cumples años')
    return
  }

  let yearNow = new Date().getFullYear()
  console.log('yearNow :', yearNow)

  let yearNacimeinto = yearNow - Number(edadTipo)

  texto.innerText = `Hola ${nombre}, naciste en el año ${yearNacimeinto}.`

  formulario.classList.toggle('ocultar')
  respuesta.classList.toggle('ocultar')
})

respuesta.addEventListener('click', () => {
  formulario.classList.toggle('ocultar')
  respuesta.classList.toggle('ocultar')

  nameInput.value = ''
  edad.value = 0
})
