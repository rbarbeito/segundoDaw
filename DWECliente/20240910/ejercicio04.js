function promedio(arrayNumbers) {
  let count = 0
  for (const element of arrayNumbers) {
    count += Number(element)
  }

  return count / arrayNumbers.length
}

alert(promedio([10, 20, 30, 40]))
