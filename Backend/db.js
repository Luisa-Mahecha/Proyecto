const mysql = require("mysql2");


const db = mysql.createConnection({
  host: "localhost",   
  user: "root",        
  password: "2005123", 
  database: "Proyecto" 
});


db.connect((err) => {
  if (err) {
    console.error("Error al conectar a MySQL:", err);
    return;
  }
<<<<<<< HEAD
  console.log("Conectado a la base de datos MySQL");
=======
  console.log("Conectado a la base de datos MySQL ✅");
>>>>>>> f487156d80a0eb6a1b43d56eca467758bb47076a
});

module.exports = db;
