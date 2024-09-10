const solucion = () => {
  let frase = prompt('Teclee una frase')

  if (frase == '') {
    alert('La frase no puede estar vacia')
    return
  }

  alert(
    `Su frase tiene ${frase.split(' ').length} ${
      frase.split(' ').length > 1 ? 'palabras' : 'palabra'
    }`
  )
}

solucion()
