//Hola José XD
let regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let regexNumTelefono = /^\+?[0-9]{1,3}[0-9]{7,}$/;

// Seleccionamos el formulario
let form = document.querySelector(".formulario");


// Evento que se ejecuta cuando se envía el formulario
form.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que se recargue la página

    // Obtener los valores de los campos
    let numeroTel = document.querySelector(".noTelefono").value;
    let correo = document.querySelector(".correo").value;

    // Validar ambos campos
    if (!regexCorreo.test(correo)) {
        alert("El correo es inválido");
    }
    if (!regexNumTelefono.test(numeroTel)) {
        alert("El número de teléfono es inválido");
    }

    alert("Datos correctos, formulario enviado.");
    form.submit(); // Si todo está correcto, enviamos el formulario
});