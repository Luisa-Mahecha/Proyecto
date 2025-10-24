const params = new URLSearchParams(window.location.search);
const query = params.get('busqueda');

if (query) {
  buscarAnime(query);
}

function buscarAnime(nombre) {
  fetch(`https://api.jikan.moe/v4/anime?q=${nombre}&limit=12`)
    .then(res => res.json())
    .then(data => {
      const contenedor = document.getElementById('searchResults');
      contenedor.innerHTML = '';

      data.data.forEach(anime => {
        const card = document.createElement('div');
        card.classList.add('card', 'text-white', 'bg-dark', 'mb-3');
        card.style.width = '18rem';
        card.innerHTML = `
          <img src="${anime.images.jpg.image_url}" class="card-img-top" alt="${anime.title}">
          <div class="card-body">
            <h5 class="card-title">${anime.title}</h5>
            <p class="card-text">${anime.synopsis ? anime.synopsis.substring(0, 100) + '...' : 'Sin descripción.'}</p>
          </div>
        `;
        contenedor.appendChild(card);
      });
    })
    .catch(err => console.error(err));
}


