function suma() {
  let numUno = prompt('teclee el primer numero')

  console.log({ numUno })
  if (isNaN(numUno) || numUno == '') {
    alert(`El valor tecleado no es un numero`)
    return
  }

  let numDos = prompt('teclee el segundo numero')

  if (isNaN(numDos) || numDos == '') {
    alert(`El valor tecleado no es un numero`)
    return
  }

  alert(`La suma de ${numUno} + ${numDos} = ${Number(numUno) + Number(numDos)}`)
}

suma()
