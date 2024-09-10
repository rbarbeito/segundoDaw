const valorMayor = (arrayNumbers) => {
  let result = 0

  for (const element of arrayNumbers) {
    result = element > result ? element : result
  }

  return result
}

let ui = () => {
  let valores = prompt('Teclee lista de numero seprados por comas')

  alert(`El mayor numero de la lista es ${valorMayor(valores)}`)
}


ui()