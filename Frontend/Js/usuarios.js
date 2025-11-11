console.log("usuarios cargó correctamente");

document.addEventListener("DOMContentLoaded", cargarUsuarios);

const tabla = document.getElementById("tablaUsuarios");

let modal = new bootstrap.Modal(document.getElementById("modalEditar"));

async function cargarUsuarios() {
    const res = await fetch("http://localhost:3000/api/usuarios");
    const data = await res.json();

    tabla.innerHTML = "";

    data.forEach(usuario => {
        tabla.innerHTML += `
            <tr>
                <td>${usuario.id}</td>
                <td>${usuario.Nombre}</td>
                <td>${usuario.Email}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="abrirEditar(${usuario.id}, '${usuario.Nombre}', '${usuario.Email}', '${usuario.Password}')">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

function abrirEditar(id, nombre, email, password) {
    document.getElementById("editId").value = id;
    document.getElementById("editNombre").value = nombre;
    document.getElementById("editEmail").value = email;
    document.getElementById("editPassword").value = password;

    modal.show();
}

document.getElementById("btnGuardarCambios").addEventListener("click", async () => {
    const id = document.getElementById("editId").value;
    const nombre = document.getElementById("editNombre").value;
    const email = document.getElementById("editEmail").value;
    const password = document.getElementById("editPassword").value;

    const res = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password })
    });

    const data = await res.json();
    alert(data.mensaje);

    modal.hide();
    cargarUsuarios();
});

async function eliminarUsuario(id) {
    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;

    const res = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
        method: "DELETE"
    });

    const data = await res.json();
    alert(data.mensaje);

    cargarUsuarios();
}
