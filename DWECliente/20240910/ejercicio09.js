const palindromo = (frase) => {
  let listFrase = frase.split('')

  for (let index = 0; index < listFrase.length / 2; index++) {
    if (listFrase[index] != listFrase[listFrase.length - index - 1]) {
      return 0
    }
  }
  return 1
}

const ui = () => {
  let cadena = prompt('Teclee la cadena a comprobar')

  alert(palindromo(cadena) == 1 ? 'Es palindomro' : 'No es palindomro')
}


ui()