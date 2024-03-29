document.addEventListener('DOMContentLoaded', () => {

  const mostrar = () => {
    const list = document.getElementById('ulu')
    list.style.display = 'flex'
  }
  const ocultar = () => {
    const list = document.getElementById('ulu')
    list.style.display = 'none'
  }
  console.log(document.getElementById('btnM'))
  const BTNO = document.getElementsByClassName('btnO')
  
  console.log(BTNO)
  for (let element in BTNO) {
    const ele = BTNO[element]
    if (typeof ele === 'object') {
      ele.addEventListener('click', ocultar)
    }
  }

  document.getElementById('btnM').addEventListener('click', mostrar)

  // la magia de los post
    const form = document.querySelector('form')
    const tituloImput = document.getElementById('titulo')
    const articuloImput = document.getElementById('articulo')
    const bodyTabla = document.getElementById('bodyTabla')

  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const titulo = tituloImput.value
    const articulo = articuloImput.value
    const tiempo = tiempoFuncion()
    const fecha = fechaFuncion()
    const numAleatorio = numRandom(1, 120)
    const nombreAleatorio = generateNombreRandom()
    const diaAleatorio = DiaRandom()
    const fechaAleatoria = FechaRandom()
    let posteo = {
      nombreAleatorio : nombreAleatorio,
      titulo : titulo, 
      articulo : articulo,
      diaAleatorio : diaAleatorio,
      numAleatorio : numAleatorio,
      tiempo : tiempo,
      fecha : fecha,
      fechaAleatoria : fechaAleatoria
    };

    if(titulo && articulo) {
      fetch("http://localhost:3000/", {
          method: "Post",
          body: JSON.stringify(posteo),
          headers: {
          "Content-type": "application/json; charset=UTF-8",
          }
      })
          .then((response) => response.json())
          .then((json) => console.log(json));
          generarTabla()
          form.reset()
      }  else {
        alert("Debe llenar todos los datos")
    }
})

  const generarTabla = () => {
    bodyTabla.innerHTML = ''

    fetch('http://localhost:3000/', {
                method: "Get"
            })
            .then(response => response.json())
            .then(json => json.data)
            .then(data=>{console.log(data);

        data.forEach((item, index) => {
          let id = item._id;
          let titulo = item.titulo
          let post = item.articulo

        //gran contenedor//
        const divGranContenedor = document.createElement('div')

        //nombre
        const divNombre = document.createElement('div')
        divNombre.className = 'nombreUsuario'
        const divNombreH3 = document.createElement('H5')
        divNombreH3.textContent = item.nombreAleatorio
        divNombre.appendChild(divNombreH3)
        bodyTabla.appendChild(divNombre)

        //imagen
        divGranContenedor.className = 'juniorDevSectionPadding'
        const divImagen = document.createElement('div')
        divImagen.className = 'imagenDeUsuario'
        const creaImagen = document.createElement('img')
        creaImagen.className = 'profileImage'
        creaImagen.type = 'img'
        divImagen.textContent = item.diaAleatorio + ' ' + item.fechaAleatoria
        bodyTabla.appendChild(divImagen)
        divImagen.appendChild(creaImagen)
        creaImagen.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.numAleatorio}.png`
        
        //contenedorPost//
        const fila = document.createElement('div')
        fila.className = 'contenedorPost'
        fila.classname = 'juniorDevSectionPadding'

        //titulo
        const celdaTitulo = document.createElement('span')
        celdaTitulo.className = 'tituloPost'

        //articulo
        const celdaArticulo = document.createElement('span')
        celdaArticulo.className = 'articuloPost'

        //tags
        const tagsSection = document.createElement('div')
        tagsSection.className = 'tagsAside'
        const tags1 = document.createElement('p')
        tags1.className = 'tag1'
        tags1.textContent = '#JavaScrip'
        const tags2 = document.createElement('p')
        tags2.className = 'tag2'
        tags2.textContent = '#Develop'
        const tags3 = document.createElement('p')
        tags3.className = 'tag3'
        tags3.textContent = '#Soprendente!'
        tagsSection.append(tags1, tags2, tags3)

        //botones
        const accionesBoton = document.createElement('div')
        accionesBoton.className = 'botonesContenedor'
        const editBoton = document.createElement('button')
        const deleteBoton = document.createElement('button')

        //emojis
        const emojisContenedor = document.createElement('div')
        emojisContenedor.className = 'emojisContenedor'
        const emo1 = document.createElement('p')
        emo1.className = 'emoticon1'
        emo1.textContent = '💖'
        const emo2 = document.createElement('p')
        emo2.className = 'emoticon2'
        emo2.textContent = '🦄'
        const emo3 = document.createElement('p')
        emo3.className = 'emoticon3'
        emo3.textContent = '🤩'
        const emo4 = document.createElement('p')
        emo4.className = 'emoticon4'
        emo4.textContent = '🙌'
        const emo5 = document.createElement('p')
        emo5.className = 'emoticon5'
        emo5.textContent = '🔥'
        const emo6 = document.createElement('p')
        emo6.className = 'emoticon6'
        emo6.textContent = '💬' + item.numAleatorio

        emojisContenedor.append(emo1, emo2, emo3, emo4, emo5, emo6)

        //tiempo
        const tiempoContenedor = document.createElement('div')
        tiempoContenedor.className = 'tiempoContenedor'
        const tiempo = document.createElement('p')
        tiempo.type = ''
        tiempo.className = 'tiempo'
        tiempo.textContent = item.tiempo + '  --  ' + item.fecha
        tiempoContenedor.appendChild(tiempo)

        //botones
        celdaTitulo.textContent = item.titulo
        celdaArticulo.textContent = item.articulo
        editBoton.textContent = 'Edit'
        editBoton.className = 'botoncito'
        deleteBoton.textContent = 'Delete'
        deleteBoton.className = 'botoncito'

        //eventos//
        editBoton.addEventListener('click',  () => {
          editInfo(id, titulo, post)
          top()
        })

        deleteBoton.addEventListener('click', () => {
          deleteInfo(id)
          top()
        })

        const top = () => {
          window.scroll({
            top: 100,
            left: 100,
            behavior: 'smooth'
          })
        }
        top()


        accionesBoton.append(editBoton, deleteBoton)

        //contenedor
        const contenedorReaccionesMas = document.createElement('div')
        contenedorReaccionesMas.className = 'contenedorReaccionesMas'
        contenedorReaccionesMas.append(emojisContenedor, tiempoContenedor, tagsSection)

        //meter todos al contenedor
        fila.append(divImagen, divNombre, celdaTitulo, celdaArticulo, accionesBoton, contenedorReaccionesMas)

        //hace que el post se muestre arriba
        bodyTabla.prepend(fila)
      })
    })
  }

  generarTabla()

  const editInfo = (id, titulo, post) => {
    fetch(`http://localhost:3000/${id}`, {
                method: "Put"
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
            tituloImput.value = titulo;
            articuloImput.value = post;
    generarTabla()
  }

  const deleteInfo = (id) => {
    fetch(`http://localhost:3000/${id}`, {
                method: "Delete"
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    generarTabla()
  }

  const d = document
  const searchFilters = (input, selector) => {
    d.addEventListener('keyup', (e) => {
      if (e.target.matches(input)) {
        d.querySelectorAll(selector).forEach((el) => {
          el.textContent.toLowerCase().includes(e.target.value.toLowerCase())
            ? el.classList.remove('filter')
            : el.classList.add('filter')
        })
      }
    })
  }
  searchFilters('.inputNav', '.contenedorPost')
})

let posts = JSON.parse(localStorage.getItem('formData')) || []

const ordenarREL = () => {
  let item = posts
  const newARR = []
  for (const [key, value] of Object.entries(item)) {
    newARR.push(value['titulo'])
    console.log(`${key}: ${value['titulo']}`)
    
  }
  console.log(newARR)
  newARR.sort()
  console.log(newARR)

/*
   for (const i in item) {
    console.log(typeof i)
    console.log(i.value)
  } 

 console.log(typeof item)
  console.log(item.sort((a, b) => new Date(a.fechaAleatoria).getTime() > new Date(b.fechaAleatoria).getTime()))
  console.log(item.fecha) 
}
*/
// Mostrar y ocultar los buscadores por fechas

}
// hora
const tiempoFuncion = () => {
  let date = new Date()
  let hours = date.getHours()
  let min = date.getMinutes()
  let seg = date.getSeconds()
  return hours + ':' + min + ':' + seg
}
tiempoFuncion()

//fecha
const fechaFuncion = () => {
  let date = new Date()
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  return day + '-' + month + '-' + year
}

//numero random
const numRandom = (min, max) => {
  var random = Math.floor(Math.random() * (max - min) + min)
  return random
}
numRandom()

//nombre random
const generateNombreRandom = () => {
  const firstname = [
    'Adrián', 'Agustín', 'Alberto',
    'Alejandro',
    'Alexander',
    'Alexis',
    'Alonso',
    'Andrés Felipe',
    'Ángel',
    'Anthony',
    'Antonio',
    'Bautista',
    'Benicio',
    'Benjamín',
    'Carlos',
    'Carlos Alberto',
    'Carlos Eduardo',
    'Carlos Roberto',
    'César',
    'Cristóbal',
    'Daniel',
    'David',
    'Diego',
    'Dylan',
    'Eduardo',
    'Emiliano',
    'Emmanuel',
    'Enrique',
    'Erik',
    'Ernesto',
    'Ethan',
    'Fabián',
    'Facundo',
    'Felipe',
    'Félix',
    'Félix María',
    'Fernando',
    'Francisco',
    'Francisco Javier',
    'Gabriel',
    'Gaspar',
    'Gustavo Adolfo',
    'Hugo',
    'Ian',
    'Iker',
    'Isaac',
    'Jacob',
    'Javier',
    'Jayden',
    'Jeremy',
    'Jerónimo',
    'Jesús',
    'Jesús Antonio',
    'Jesús Víctor',
    'Joaquín',
    'Jorge',
    'Jorge  Alberto',
    'Jorge Luis',
    'José',
    'José Antonio',
    'José Daniel',
    'José David',
    'José Francisco',
    'José Gregorio',
    'José Luis',
    'José Manuel',
    'José Pablo',
    'Josué',
    'Juan',
    'Juan Ángel',
    'Juan Carlos',
    'Juan David',
    'Juan Esteban',
    'Juan Ignacio',
    'Juan José',
    'Juan Manuel',
    'Juan Pablo',
    'Juan Sebastián',
    'Julio',
    'Julio Cesar',
    'Justin',
    'Kevin',
    'Lautaro',
    'Liam',
    'Lian',
    'Lorenzo',
    'Lucas',
    'Luis',
    'Luis Alberto',
    'Luis Emilio',
    'Luis Fernando',
    'Manuel',
    'Manuel Antonio',
    'Marco Antonio',
    'Mario',
    'Martín',
    'Mateo',
    'Matías',
    'Maximiliano',
    'Maykel',
    'Miguel',
    'Miguel  ngel',
    'Nelson',
    'Noah',
    'Oscar',
    'Pablo',
    'Pedro',
    'Rafael',
    'Ramón',
    'Raúl',
    'Ricardo',
    'Rigoberto',
    'Roberto',
    'Rolando',
    'Samuel',
    'Samuel David',
    'Santiago',
    'Santino',
    'Santos',
    'Sebastián',
    'Thiago',
    'Thiago Benjamín',
    'Tomás',
    'Valentino',
    'Vicente',
    'Víctor',
    'Víctor Hugo'
  ]
  const lastname = [
    'Garcia',
    'Gonzalez',
    'Rodriguez',
    'Fernandez',
    'Lopez',
    'Martinez',
    'Sanchez',
    'Perez',
    'Gomez',
    'Martin',
    'Jimenez',
    'Ruiz',
    'Hernandez',
    'Diaz',
    'Moreno',
    'Alvarez',
    'Muñoz',
    'Romero',
    'Alonso',
    'Gutierrez',
    'Navarro',
    'Torres',
    'Dominguez',
    'Vazquez',
    'Ramos',
    'Gil',
    'Ramirez',
    'Serrano',
    'Blanco',
    'Suarez',
    'Molina',
    'Morales',
    'Ortega',
    'Delgado',
    'Castro',
    'Ortiz',
    'Rubio',
    'Marin',
    'Sanz',
    'Nuñez',
    'Iglesias',
    'Medina',
    'Garrido',
    'Santos',
    'Castillo',
    'Cortes',
    'Lozano',
    'Guerrero',
    'Cano',
    'Prieto',
    'Mendez',
    'Calvo',
    'Cruz',
    'Gallego',
    'Vidal',
    'Leon',
    'Herrera',
    'Marquez',
    'Peña',
    'Cabrera',
    'Flores',
    'Campos',
    'Vega',
    'Diez',
    'Fuentes',
    'Carrasco',
    'Caballero',
    'Nieto',
    'Reyes',
    'Aguilar',
    'Pascual',
    'Herrero',
    'Santana',
    'Lorenzo',
    'Hidalgo',
    'Montero',
    'Ibañez',
    'Gimenez',
    'Ferrer',
    'Duran',
    'Vicente',
    'Benitez',
    'Mora',
    'Santiago',
    'Arias',
    'Vargas',
    'Carmona',
    'Crespo',
    'Roman',
    'Pastor',
    'Soto',
    'Saez',
    'Velasco',
    'Soler',
    'Moya',
    'Esteban',
    'Parra',
    'Bravo',
    'Gallardo',
    'Rojas',
    'Pardo',
    'Merino',
    'Franco',
    'Espinosa',
    'Izquierdo',
    'Lara',
    'Rivas',
    'Silva',
    'Rivera',
    'Casado',
    'Arroyo',
    'Redondo',
    'Camacho',
    'Rey',
    'Vera',
    'Otero',
    'Luque',
    'Galan',
    'Montes',
    'Rios',
    'Sierra',
    'Segura',
    'Carrillo',
    'Marcos',
    'Marti',
    'Soriano',
    'Mendoza'
  ]
  const rand_first = Math.floor(Math.random() * firstname.length)
  const rand_last = Math.floor(Math.random() * lastname.length)
  return firstname[rand_first] + ' ' + lastname[rand_last]
}
generateNombreRandom()

const FechaRandom = () => {
  var anno = 2024
  var randomDia = Math.floor(Math.random() * (29 - 1) + 1)
  var randomMes = Math.floor(Math.random() * (12 - 0) + 1)
  return randomDia + '/' + randomMes + '/' + anno
}
FechaRandom()

const DiaRandom = () => {
  const fecha = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes']
  const fecha_Random = Math.floor(Math.random() * fecha.length)
  return fecha[fecha_Random]
}
DiaRandom()
