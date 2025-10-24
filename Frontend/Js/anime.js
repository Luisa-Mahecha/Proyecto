const form = document.querySelector("form");
const searchInput = document.querySelector("input[type='search']");
const searchResults = document.getElementById("searchResults");

// Escuchar el evento de búsqueda
form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita recargar la página
    const query = searchInput.value.trim();

    if (query === "") {
        searchResults.innerHTML = "<p>Por favor, escribe algo para buscar.</p>";
        return;
    }

    // Llamar a la API
    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=8`);
        const data = await response.json();

        if (data.data.length === 0) {
            searchResults.innerHTML = "<p>No se encontró ningún anime con ese nombre.</p>";
            return;
        }

        // Mostrar resultados
        searchResults.innerHTML = data.data
            .map(
                (anime) => `
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${anime.images.jpg.image_url}" class="img-fluid rounded-start" alt="${anime.title}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${anime.title}</h5>
                                <p class="card-text">${anime.synopsis ? anime.synopsis.substring(0, 150) + "..." : "Sin descripción disponible."}</p>
                                <p class="card-text"><small class="text-body-secondary">⭐ ${anime.score ?? "N/A"} | Episodios: ${anime.episodes ?? "Desconocido"}</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            `
            )
            .join("");
    } catch (error) {
        console.error(error);
        searchResults.innerHTML = "<p>Error al buscar el anime. Intenta de nuevo más tarde.</p>";
    }
});

