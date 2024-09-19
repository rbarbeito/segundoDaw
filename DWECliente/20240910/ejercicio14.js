 const ui=()=>{
    let final=prompt("Introduce el numero final")

    if (isNaN(final)|| final=='') {
        alert('No introduciste un numero')
    }

    let count=0
    for (let index = 1; index < Number(final) + 1; index++) {
      if (index % 2 == 0) {
        count += index
      }
    }

    alert(`La suma de los pares hasta ${final} es ${count}`)
 }



 ui()