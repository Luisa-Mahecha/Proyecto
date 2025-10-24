document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("btnRegistro");

  boton.addEventListener("click", async (e) => {
    e.preventDefault(); // evita que recargue la página

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!nombre || !email || !password) {
      alert("Por favor llena todos los campos");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Cuenta creada exitosamente 🎉");
        window.location.href = "../HTML/Iniciar sesión.html"; // redirige
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Hubo un error al conectar con el servidor");
    }
  });
});
