const invertir = (palabra) => {
  let valor = palabra.split('').reverse().join('')
  return valor
}

const ui = () => {
  let cadena = prompt('Teclee una cadena')
  alert(invertir(cadena))
}

ui()
