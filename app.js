//aprendiendo a usar node js
//basico

//variables

let number = 12.22;
let string = "cadena de texto";
let boolean = true;
let tallas = ["S", "M", "L", "XL"];//array
const PI = 3.14;//constante

const objeto = {
    nombre: "Juan",
    edad: 21,
    ciudad: "Madrid",
    sexo: "masculino"
};

//funciones
function suma(a, b) {
    return a + b;
}

function descuento(precio, porcentaje) {
    return precio - (precio * porcentaje /100);
}

console.log("Bienvenido a Chaosku")
console.log("El resultado de la suma es: " + suma(5, 10));
console.log("El precio con descuento es: " + descuento(137, 20));
console.log("El valor de PI es: " + PI);
console.log("El nombre del objeto es: " + objeto.nombre);
console.log("La edad del objeto es: " + objeto.edad);
console.log("La ciudad del objeto es: " + objeto.ciudad);
console.log("El sexo del objeto es: " + objeto.sexo);
console.log("Las tallas disponibles son: " + tallas.join(" "));

let arreglo = [4,3,72,4,6];
console.log("El arreglo es: " + arreglo.join(" "));
arreglo.splice(3,0,-1);
console.log("El arreglo con el nuevo elemento es: " + arreglo.join(" "));

// Lo de arriba es jugar/practicar


//Lo de abajo es aprender a manipular el DOM (Document Object Model) para mostrar información en la página web

// 1. Buscamos el contenedor en el HTML usando su ID
const tarjetaContenedor = document.getElementById("perfil");
//nombre
const cajaDeTexto = document.getElementById("inputNombre");
const boton = document.getElementById("btnActualizar");
//edad
const cajaDeTextoEdad = document.getElementById("inputEdad");
const botonEdad = document.getElementById("actualizarEdad");

const cajaDeTextoCiudad = document.getElementById("inputCiudad");
const botonCiudad = document.getElementById("actualizarCiudad");


tarjetaContenedor.classList.add("tarjeta-elegante");
//classList es una propiedad que nos permite acceder a las clases CSS de un elemento HTML. Con classList, podemos agregar,
//  eliminar o verificar la existencia de clases en un elemento de manera sencilla. 
// En este caso, estamos agregando la clase "tarjeta-elegante" 
// al contenedor del perfil para darle un estilo específico definido 
// en el CSS. ClassList.add() es de añadir, classList.remove() es de eliminar, classList.toggle() es de alternar (si la clase existe la elimina, si no existe la agrega) 
// y classList.contains() es para verificar si una clase existe en el elemento.

// 2. Le modificamos el contenido interno (innerHTML) inyectando etiquetas HTML
function dibujarPerfil(){
    tarjetaContenedor.innerHTML = 
    "<h1>Perfil de Usuario</h1>" +
    "<p><strong>Nombre:</strong> " + objeto.nombre + "</p>" +
    "<p><strong>Edad:</strong> " + objeto.edad + " años</p>" +
    "<p><strong>Ciudad:</strong> " + objeto.ciudad + "</p>";
}

// 3. Llamamos a la función por primera vez para que aparezca "Juan" al cargar la página
dibujarPerfil();

//boton para actualizar el nombre del perfil
boton.addEventListener("click",function()
{
  let nuevoNombre = cajaDeTexto.value.trim();
  //trim() es un método que elimina los espacios en blanco al inicio y al final de una cadena de texto.

  if(nuevoNombre ==="")
  {
    alert("Por favor, ingresa un nombre válido.");
  }else{
    objeto.nombre = nuevoNombre;
    dibujarPerfil();
    cajaDeTexto.value = "";
  }

})

//boton para actualizar la edad del perfil
botonEdad.addEventListener("click",function()
{
    let nuevaEdad = parseInt(cajaDeTextoEdad.value);
    if(nuevaEdad < 18 || nuevaEdad > 120 || isNaN(nuevaEdad))
    {
        alert("Por favor, ingresa una edad válida entre 18 y 120 años.");
    }else{
        objeto.edad=nuevaEdad
        dibujarPerfil();
        cajaDeTextoEdad.value = "";
    }
})

//boton para actualizar la ciudad del perfil
botonCiudad.addEventListener("click",function()
{
    let nuevaCiudad = cajaDeTextoCiudad.value.trim();
    if(nuevaCiudad ==="")
    {
        alert("Por favor, ingresa una ciudad válida.");
    }else{
        objeto.ciudad=nuevaCiudad
        dibujarPerfil();
        cajaDeTextoCiudad.value = "";
    }
})

// =================================================================
// NUEVO: MAGIA FULL-STACK (Conectar Frontend con Backend)
// =================================================================
const botonNube = document.getElementById("btnGuardarNube");

botonNube.addEventListener("click", async function() {
    try {
        // Cambiamos el texto del botón temporalmente para que se vea que está cargando
        botonNube.innerText = "⏳ Guardando...";

        // 1. Usamos fetch para llamar a la ventanilla de tu mesero (Express)
        const respuesta = await fetch("http://localhost:3000/api/guardar-perfil", {
            method: "POST", // POST significa "Quiero enviar datos nuevos"
            headers: {
                "Content-Type": "application/json" // Le avisamos que el paquete va en formato JSON
            },
            body: JSON.stringify(objeto) // Convertimos tu 'objeto' actual en texto para que viaje por internet
        });

        // 2. Abrimos la respuesta que nos devolvió el servidor
        const datosServidor = await respuesta.json();

        // 3. Revisamos si fue un éxito (código 200)
        if (respuesta.ok) {
            alert("✅ ¡ÉXITO! " + datosServidor.mensaje);
        } else {
            alert("❌ Uy, hubo un error en el servidor.");
        }
        
    } catch (error) {
        console.error("Error al enviar:", error);
        alert("❌ No se pudo conectar. ¿Seguro que tu servidor Node.js está encendido?");
    } finally {
        // Regresamos el botón a la normalidad
        botonNube.innerText = "☁️ Guardar Perfil en la Nube";
    }
});