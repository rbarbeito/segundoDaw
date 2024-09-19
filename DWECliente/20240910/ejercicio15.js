 export const aleatorio = (limite=100) => {
  return Math.floor(Math.random() * limite)
}

export const generador = () => {
  let listaNumeros = []

  let cantidad = prompt('Cuantos elementos quieres en tu lista de numeros')

  if (isNaN(cantidad) || cantidad == '') {
    alert('No tecleaste un numero')
    return
  }

  for (let index = 0; index < Number(cantidad); index++) {
    let numeroNuevo = aleatorio()

    if (listaNumeros.includes(numeroNuevo)) {
      continue
    }

    listaNumeros.push(numeroNuevo)
  }

  return listaNumeros
}

// alert(generador())
