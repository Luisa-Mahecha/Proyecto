document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("btnLogin");

  boton.addEventListener("click", async (e) => {
    e.preventDefault();

    const email = document.getElementById("emailLogin").value.trim();
    const password = document.getElementById("passwordLogin").value.trim();

    if (!email || !password) {
      alert("Por favor, ingresa tu correo y contraseña");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Inicio de sesión exitoso 🎉");
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        window.location.href = "../HTML/pagina2.html"; // te lleva a tu página principal
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Hubo un problema al conectar con el servidor");
    }
  });
});
