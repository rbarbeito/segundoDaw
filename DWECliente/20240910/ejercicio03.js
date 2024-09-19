function factorial(valor) {
  if (valor == 0) {
    return 1
  }

  return factorial(Number(valor) - 1) * Number(valor)
}

const inicio = () => {
  let numeroUser = prompt('Teclee un numero')

  if (isNaN(numeroUser) || numeroUser == '') {
    alert('El dato tecleado no es un numero')
    return
  }

  alert(`El factorial de ${numeroUser} es igual a: ${factorial(numeroUser)}`)
}

inicio()
