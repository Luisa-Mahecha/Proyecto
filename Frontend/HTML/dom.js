console.log("✅ DOM conectado correctamente");

// --- Seleccionamos elementos existentes ---
const titulo = document.querySelector(".hero-overlay h1");
const descripcion = document.querySelector(".hero-overlay p");

// Cambiamos su texto y color usando el DOM
titulo.textContent = "🏴‍☠️ Bienvenido al Mundo de MugiAnime 🏴‍☠️";
descripcion.style.color = "#FFD700"; // dorado
descripcion.style.fontWeight = "bold";

// --- Creamos un nuevo botón ---
const boton = document.createElement("button");
boton.textContent = "Mostrar Animes Recomendados";
boton.className = "btn btn-danger mt-4";
boton.style.backgroundColor = "#B91010";

// Agregamos el botón al final del main
const main = document.querySelector("main");
main.appendChild(boton);

// --- Creamos un contenedor para los animes ---
const lista = document.createElement("ul");
lista.style.listStyle = "none";
lista.style.padding = "0";
lista.style.marginTop = "20px";
lista.style.color = "white";
lista.style.fontSize = "1.3rem";
main.appendChild(lista);

// --- Evento del botón ---
boton.addEventListener("click", () => {
  const animes = ["One Piece", "Naruto", "Demon Slayer", "Attack on Titan", "Jujutsu Kaisen"];

  lista.innerHTML = ""; // limpiar lista

  animes.forEach(anime => {
    const li = document.createElement("li");
    li.textContent = "⭐ " + anime;
    lista.appendChild(li);
  });
});


// Detectar si estamos en pagina2.html
if (window.location.pathname.includes("pagina2.html")) {
  console.log("✅ DOM activo en página 2");

  // --- Cambiar título del navbar dinámicamente ---
  const titulo = document.querySelector(".navbar-brand");
  if (titulo) {
    titulo.textContent = "🌸 Bienvenida a MugiAnime 🌸";
  }

  // --- Crear un botón para mostrar más animes ---
  const contenedor = document.querySelector(".container.my-4");
  if (contenedor) {
    const boton = document.createElement("button");
    boton.textContent = "Ver más animes 🔥";
    boton.className = "btn btn-warning mt-4";
    contenedor.appendChild(boton);

    // --- Evento del botón ---
    boton.addEventListener("click", () => {
      const nuevosAnimes = [
        {
          nombre: "One Piece",
          imagen: "../Assets/Imagen/Portada5.jpeg",
          descripcion: "Luffy y su tripulación en busca del One Piece.",
          temporadas: "20+ Temporadas"
        },
        {
          nombre: "Spy x Family",
          imagen: "../Assets/Imagen/Portada6.jpeg",
          descripcion: "Una familia peculiar con un espía, una asesina y una telépata.",
          temporadas: "2 Temporadas"
        }
      ];

      nuevosAnimes.forEach(anime => {
        const div = document.createElement("div");
        div.className = "col-md-3";
        div.innerHTML = `
          <div class="card anime-card">
            <img src="${anime.imagen}" class="card-img" alt="${anime.nombre}">
            <div class="overlay">
              <div class="overlay-text">
                <h5>${anime.nombre}</h5>
                <p>${anime.descripcion}</p>
                <h6>${anime.temporadas}</h6>
              </div>
            </div>
          </div>
        `;
        contenedor.querySelector(".row").appendChild(div);
      });

      boton.remove(); // quitar el botón después de mostrar
    });
  }
}