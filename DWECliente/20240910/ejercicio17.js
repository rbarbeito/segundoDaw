import { generador } from './ejercicio15.js'

const resultado = () => {
  let lista = generador()
  let suma = 0

  for (const el of lista) {
    suma += Number(el)
  }

  let promedio = Number(suma) / Number(lista.length)

  alert(
    `Numero por encima del promedio ${
      lista.filter((el) => el > promedio).length
    }`
  )
}

resultado()
