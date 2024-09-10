import { aleatorio } from './ejercicio15.js'

let botom = document.getElementById('botom')

const createBotom = () => {
  let btn = document.createElement('button')
  btn.textContent = 'Cambiar Color'
  botom.appendChild(btn)
  btn.addEventListener('click', color)
}

const color = () => {
    document.body.setAttribute(
      'style',
      `background-color: rgba(${aleatorio(255)}, ${aleatorio(255)}, ${aleatorio(255)}, 0.5);`
    )
}

createBotom()
