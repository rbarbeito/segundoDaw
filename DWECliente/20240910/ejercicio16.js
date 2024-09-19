import { generador } from './ejercicio15.js'

const ordenar = () => {
  let lista = generador()

  alert(`Lista aleatoria ${JSON.stringify(lista)}`)
  alert(`Lista ordenada ${JSON.stringify(lista.sort())}`)
}

ordenar()
