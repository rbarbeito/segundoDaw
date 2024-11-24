const testimonios = [
  {
    nombre: 'Elena',
    testimonio:
      'Como amante del fitness, puedo decir que el "gimnasio" ha superado mis expectativas. Desde que me uní, he disfrutado de una experiencia excepcional gracias a sus amplios servicios. El ambiente es motivador; siempre hay personas con la misma pasión por el entrenamiento. Las instalaciones son modernas y bien mantenidas, lo que hace que cada visita sea agradable. Además, la variedad de clases grupales, desde yoga hasta entrenamiento funcional, realmente mantiene las cosas interesantes y me ayuda a desafiarme a mí mismo. Sin duda, es un lugar donde cada entusiasta del fitness debería considerar entrenar. ¡No puedo esperar a seguir logrando mis metas aquí!',
    foto: 'https://cdn.pixabay.com/photo/2017/06/21/07/37/muslim-dressing-2426340_1280.jpg',
  },
  {
    nombre: 'Ana',
    testimonio:
      'Desde que me uní a este gimnasio, he notado un cambio increíble en mi salud y bienestar. Las instalaciones son de primera y el ambiente es muy motivador. Me encanta la variedad de clases que ofrecen; cada día es una nueva oportunidad para superarme. ¡Recomiendo este lugar a todas mis amigas!',
    foto: 'https://cdn.pixabay.com/photo/2017/04/04/20/56/woman-2203100_960_720.jpg',
  },
  {
    nombre: 'Paula',
    testimonio:
      'He estado entrenando aquí durante seis meses y no puedo estar más agradecida. La calidad de los entrenadores es excepcional y siempre están dispuestos a ayudar. Además, la comunidad es fantástica, lo que hace que cada sesión sea divertida y enriquecedora. Definitivamente es el mejor gimnasio en el que he estado.',
    foto: 'https://cdn.pixabay.com/photo/2023/11/13/17/25/women-8386031_1280.jpg',
  },
]

let container_fotos = document.getElementsByClassName('container_fotos')[0]
let pTestimonio = document.getElementById('testimnonio')

let generadorObjetos = (el) => {
  let contenedor = document.createElement('div')
  contenedor.classList.add('imagen_testimonio')

  let imagenPersona = document.createElement('img')
  imagenPersona.classList.add('imagenPersona')
  imagenPersona.setAttribute('alt', `Foto del cliente ${el.nombre}`)
  imagenPersona.src = `${el.foto}`
  contenedor.appendChild(imagenPersona)

  let nombrePersona = document.createElement('p')
  nombrePersona.innerText = `${el.nombre}`
  nombrePersona.classList.add('persona_no_activa')
  contenedor.appendChild(nombrePersona)

  container_fotos.appendChild(contenedor)

  nombrePersona.addEventListener('click', () => {
    pTestimonio.innerText = `${cortarTestimonio(el.testimonio)}`

    for (const el of document.querySelectorAll('.imagenPersona')) {
      el.classList.remove('border_activo')
    }

    for (const el of document.querySelectorAll('.persona_no_activa')) {
      el.classList.remove('persona_activa')
    }

    nombrePersona.classList.add('persona_activa')
    imagenPersona.classList.add('border_activo')
  })
}

let mostrarTestimonios = () => {
  for (const el of testimonios) {
    generadorObjetos(el)
  }

  let contenedor_seleccionado = document.querySelector('.container_fotos')
  contenedor_seleccionado.children[1].children[0].classList.add('border_activo')
  contenedor_seleccionado.children[1].children[1].classList.add(
    'persona_activa'
  )

  pTestimonio.innerText = `${cortarTestimonio(testimonios[0].testimonio)}`
}

let cortarTestimonio = (texto) => {
  let longitud = 300
  return texto.length > longitud
    ? texto.split('').slice(0, longitud).join('') + '... [leer más]'
    : texto
}

mostrarTestimonios()

const showOnPx = 100

document.getElementById('goUp').addEventListener('click', () => {
  document.body.scrollIntoView({
    behavior: 'smooth',
  })
})

const scrollContainer = () => {
  return document.documentElement || document.body
}

document.addEventListener('scroll', () => {
  if (scrollContainer().scrollTop > showOnPx) {
   document.getElementById('goUp').classList.remove('hidden')
  } else {
    document.getElementById('goUp').classList.add('hidden')
  }
})
