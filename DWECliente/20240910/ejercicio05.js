function contador(cadena) {
  let count = 0
  for (const el of cadena) {
    if (['a', 'e', 'i', 'o', 'u'].includes(el)) {
      count++
    }
  }

  return count
}


let cadena=prompt("Introduce la caden a comprobar")

alert(`La cadena tiene un total de ${contador(cadena)} vocales`)