// 1. Importamos las herramientas
const mongoose = require('mongoose');
const express = require('express'); // Nuestro mesero
const cors = require('cors'); // El permiso de seguridad

const app = express(); // Iniciamos a nuestro mesero

// 2. Configuraciones básicas
app.use(cors()); // Permite que tu HTML se conecte sin que Windows lo bloquee
app.use(express.json()); // Le enseña al mesero a entender el formato JSON

// 3. Tu conexión a la base de datos
const urlConexion = "mongodb://cristoferrodriguez610_db_user:2JEW7cyE22megmXO@ac-ppk36si-shard-00-00.cyf7jzh.mongodb.net:27017,ac-ppk36si-shard-00-01.cyf7jzh.mongodb.net:27017,ac-ppk36si-shard-00-02.cyf7jzh.mongodb.net:27017/?ssl=true&replicaSet=atlas-o300vd-shard-0&authSource=admin&appName=Cluster0";

mongoose.connect(urlConexion)
  .then(() => console.log("✅ Conectado a MongoDB Atlas de forma exitosa"))
  .catch((error) => console.log("❌ Error de conexión: ", error));

// 4. Tu Esquema y Modelo
const perfilSchema = new mongoose.Schema({
    nombre: String,
    edad: Number,
    ciudad: String
});
const Perfil = mongoose.model('Perfil', perfilSchema);

// =================================================================
// 5. ¡LA MAGIA! Creamos la "puerta" para que entre la página web
// =================================================================
app.post('/api/guardar-perfil', async (req, res) => {
    try {
        const datosDelHTML = req.body; 
        console.log("¡Recibí datos nuevos desde la web!", datosDelHTML);

        const nuevoPerfil = new Perfil(datosDelHTML);
        await nuevoPerfil.save();

        res.status(200).json({ mensaje: "¡Guardado exitosamente en la nube!" });
    } catch (error) {
        res.status(500).json({ mensaje: "Hubo un error al guardar" });
    }
});

// 6. Encendemos el servidor en el "puerto" 3000
app.listen(3000, () => {
    console.log("==================================================");
    console.log("🚀 Servidor Express escuchando en http://localhost:3000");
    console.log("==================================================");
});