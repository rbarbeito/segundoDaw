let contador = document.getElementById('contador')
let botom = document.getElementById('botom')
let cuenta = 0

const createBotom = () => {
  contador.innerText = `Contador: ${cuenta}`
  let btn = document.createElement('button')
  btn.textContent = 'Sumar'
  botom.appendChild(btn)
  btn.addEventListener('click', sumar)

}

const sumar = () => {
    cuenta += 1
    contador.innerText = `Contador: ${cuenta}`
}

createBotom()
