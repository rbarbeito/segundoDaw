const listaPares = (lista) => {
  let nuevalista = []

  for (const element of lista) {
    if (element % 2 == 0) {
      nuevalista.push(element)
    }
  }

  return nuevalista
}

const ui = () => {
  let valores = prompt('Introduce numero separados por coma')

  let aComprobar=
  alert(`Los numeros pares son ${listaPares(valores.split(','))}`)
}

ui()