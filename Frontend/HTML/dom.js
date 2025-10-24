console.log("DOM conectado correctamente");

const titulo = document.querySelector(".hero-overlay h1");
const descripcion = document.querySelector(".hero-overlay p");


titulo.textContent = "🏴‍☠️ Bienvenido al Mundo de MugiAnime 🏴‍☠️";
descripcion.style.color = "#FFD700"; 
descripcion.style.fontWeight = "bold";


const boton = document.createElement("button");
boton.textContent = "Mostrar Animes Recomendados";
boton.className = "btn btn-danger mt-4";
boton.style.backgroundColor = "#B91010";


const main = document.querySelector("main");
main.appendChild(boton);


const lista = document.createElement("ul");
lista.style.listStyle = "none";
lista.style.padding = "0";
lista.style.marginTop = "20px";
lista.style.color = "white";
lista.style.fontSize = "1.3rem";
main.appendChild(lista);


boton.addEventListener("click", () => {
  const animes = ["One Piece", "Naruto", "Demon Slayer", "Attack on Titan", "Jujutsu Kaisen"];

  lista.innerHTML = ""; 

  animes.forEach(anime => {
    const li = document.createElement("li");
    li.textContent = "⭐ " + anime;
    lista.appendChild(li);
  });
});



if (window.location.pathname.includes("pagina2.html")) {
  console.log("✅ DOM activo en página 2");

  
  const titulo = document.querySelector(".navbar-brand");
  if (titulo) {
    titulo.textContent = "🌸 Bienvenida a MugiAnime 🌸";
  }

  
  const contenedor = document.querySelector(".container.my-4");
  if (contenedor) {
    const boton = document.createElement("button");
    boton.textContent = "Ver más animes 🔥";
    boton.className = "btn btn-warning mt-4";
    contenedor.appendChild(boton);

    
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

      boton.remove(); 
    });
  }
}