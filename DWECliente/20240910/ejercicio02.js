function par() {
  let numero = prompt('Teclee un número')

  if (isNaN(numero) || numero == '') {
    alert(`El valor tecleado no es un numero`)
    return
  }

  if (Number(numero) % 2 != 0) {
    alert(`${numero} no es un numero par`)
    return
  }
  alert(`${numero} es un numero par`)
}

par()
