// 1. Importamos la librería Mongoose
const mongoose = require('mongoose');

// 2. Tu enlace clásico de conexión (Ya validado ayer)
const urlConexion = "mongodb://cristoferrodriguez610_db_user:2JEW7cyE22megmXO@ac-ppk36si-shard-00-00.cyf7jzh.mongodb.net:27017,ac-ppk36si-shard-00-01.cyf7jzh.mongodb.net:27017,ac-ppk36si-shard-00-02.cyf7jzh.mongodb.net:27017/?ssl=true&replicaSet=atlas-o300vd-shard-0&authSource=admin&appName=Cluster0";

// 3. Conectamos a la base de datos
mongoose.connect(urlConexion)
  .then(async () => {
      console.log("==================================================");
      console.log("¡Conexión exitosa a MongoDB Atlas!");
      console.log("==================================================");

      // --- AQUÍ EMPIEZA TU APRENDIZAJE ---

      // PASO 1: Creamos el Esquema (El molde de la gelatina)
      const perfilSchema = new mongoose.Schema({
          nombre: String,
          edad: Number,
          ciudad: String
      });

      // PASO 2: Creamos el Modelo (El constructor basado en el molde)
      // Mongoose creará automáticamente una colección llamada "perfils" en tu nube
      const Perfil = mongoose.model('Perfil', perfilSchema);

      console.log("Intentando guardar un perfil de prueba...");

      // PASO 3: Creamos un dato real usando nuestro constructor
      const nuevoPerfil = new Perfil({
          nombre: "Cristofer Rodríguez",
          edad: 21,
          ciudad: "Tegucigalpa"
      });

      // PASO 4: Ordenamos a Mongoose que lo mande a la nube de AWS
      // Usamos 'await' para esperar que el viaje por internet termine
      const datoGuardado = await nuevoPerfil.save();
      
      console.log("¡ÉXITO TOTAL! Tu dato ya está en la nube permanentemente.");
      console.log("Registro guardado:", datoGuardado);

  })
  .catch((error) => {
      console.log("Hubo un error en el proceso: ", error);
  });