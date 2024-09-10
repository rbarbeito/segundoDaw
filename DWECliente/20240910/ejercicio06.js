const exist = (array, num) => {
  return array.includes(num)
}

const ui = () => {
  let valores = prompt('Teclee lista de valores separados por coma')
  let valorBuscado = prompt('Teclee valor a buscar')

  let arrayValores = valores.split(',')

  if (!exist(arrayValores, valorBuscado)) {
    alert(`El valor ${valorBuscado} no existe en la lista`)
    return
  }

  alert(`El valor ${valorBuscado} esta en la lista`)
}


ui()