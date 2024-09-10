const sumaValores = (arrayObject) => {
  let add = 0
  for (const element of arrayObject) {
    add += Number(element.valor)
  }

  return add
}

const ui = () => {
  let arrayOfObject = []

  let cant = prompt('Defina cuantos  objetos tendra su array')

  if (isNaN(cant) || cant == '') {
    alert('No es un numero valido')
    return
  }

  for (let index = 0; index < Number(cant); index++) {
    let valor = prompt(`Teclee el valor ${index + 1}`)
    arrayOfObject.push({ valor })
  }

  alert(`La suma de los valores es ${sumaValores(arrayOfObject)}`)
}

ui()
