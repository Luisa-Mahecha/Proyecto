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
  console.log("Conectado a la base de datos MySQL");
});

module.exports = db;
