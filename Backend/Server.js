const express = require("express");
const cors = require("cors");
const db = require("./db.js");

const app = express();
app.use(express.json());
app.use(cors());


app.post("/api/usuarios", (req, res) => {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ error: "nombre, email y password son requeridos" });
    }

    db.query(
        "INSERT INTO Usuarios (Nombre, Email, Password) VALUES (?, ?, ?)", 
        [nombre, email, password], 
        (err, resultado) => {
            if (err) return res.status(500).json({ error: "Error al insertar los datos en la tabla usuarios" });
            res.json({ id: resultado.insertId, nombre, email });
        }
    );
});


app.get("/api/usuarios", (req, res) => {
    db.query("SELECT * FROM Usuarios", (err, resultados) => {
        if(err) return res.status(500).json({ error: "Error en la base de datos"});
        res.json(resultados);
    });
});


app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ error: "Correo y contraseña son requeridos" });
    }

    db.query("SELECT * FROM Usuarios WHERE Email = ?", [email], (err, results) => {
        if (err) return res.status(500).json({ error: "Error en la base de datos" });

        if (results.length === 0) {
            return res.status(404).json({ error: "El correo no está registrado" });
        }

        const usuario = results[0];

        if (usuario.Password !== password) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        res.json({ 
            mensaje: "Inicio de sesión exitoso",
            usuario: {
                id: usuario.id,
                email: usuario.Email
            }
        });
    });
});


app.put("/api/usuarios/recuperar", (req, res) => {
    const { email, nuevaPassword } = req.body;

    if (!email || !nuevaPassword) {
        return res.status(400).json({ error: "El email y la nueva contraseña son requeridos" });
    }

    db.query(
        "UPDATE Usuarios SET Password = ? WHERE Email = ?", 
        [nuevaPassword, email], 
        (err, result) => {
            if (err) return res.status(500).json({ error: "Error en la base de datos" });
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "El correo no está registrado" });
            }

            res.json({ mensaje: "Contraseña actualizada con éxito" });
        }
    );
});


app.put("/api/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, email, password } = req.body;

    db.query(
        "UPDATE Usuarios SET Nombre = ?, Email = ?, Password = ? WHERE id = ?",
        [nombre, email, password, id],
        (err, result) => {
            if (err) return res.status(500).json({ error: "Error al actualizar usuario" });

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }

            res.json({ mensaje: "Usuario actualizado con éxito" });
        }
    );
});


app.delete("/api/usuarios/:id", (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM Usuarios WHERE id = ?", id, (err, result) => {
        if (err) return res.status(500).json({ error: "Error al eliminar el usuario" });

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json({ mensaje: "Usuario eliminado correctamente" });
    });
});


app.listen(3000, () => {
    console.log("El servidor está corriendo en http://localhost:3000");
});
