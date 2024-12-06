const DOM = {
    titleCount: document.getElementById("titleCount"),
    title: document.getElementById("PublicacionTitulo"),
    descripcion: document.getElementById("PublicacionDescripcion"),
    areaCount: document.getElementById("areaCount"),
    dni: document.getElementById("DNI"),
    select: document.getElementById("stateSelect"),
    anio: document.getElementById("AnioNacimiento"),
    nombre: document.getElementById("Nombre"),
    postal: document.getElementById("CodigoPostal"),
    form: document.querySelector("form"),
    errorDni: document.getElementById("errorDNINIE"),
    errorCheck: document.getElementById("errorCheck"),
    erroresDiv: document.getElementById("erroresDiv"),
    aficiones: document.getElementById("Formato-Aficiones"),
};

// Inicializar los años en el selector
document.addEventListener("DOMContentLoaded", () => {
    for (let i = 1920; i <= 2010; i++) {
        let option = document.createElement("option");
        option.append(i);
        option.value = i;
        DOM.anio.append(option);
    }
});

// Función para mostrar u ocultar la contraseña
function mostrarPassword() {
    var z = document.getElementById("Contrasena");
    z.type = (z.type === "password") ? "text" : "password";
}

// Evento para el título
DOM.title.addEventListener("input", () => {
    DOM.titleCount.textContent = `${DOM.title.value.length} / 15`;
});

// Evento para la descripción
DOM.descripcion.addEventListener("input", () => {
    DOM.areaCount.textContent = `${DOM.descripcion.value.length} / 120`;
});

// Evento para validar el tipo de documento (DNI o NIE)
DOM.select.addEventListener("change", () => {
    if (DOM.select.value === "none") {
        DOM.errorDni.textContent = "Seleccione una de las dos opciones";
        DOM.errorDni.style.display = "inline";
    } else {
        DOM.errorDni.textContent = "";
        DOM.errorDni.style.display = "none";
    }
});

// Validación de las aficiones
DOM.form.addEventListener("submit", (e) => {
    // Validación del código postal
    if (DOM.postal.validationMessage !== "") {
        alert("Fatal: Rellena correctamente el código postal");
        e.preventDefault();
    }

    // Validación de aficiones
    const checkboxes = document.querySelectorAll('input[name="Aficiones"]:checked');
    if (checkboxes.length < 2) {
        e.preventDefault();
        DOM.errorCheck.textContent = "Selecciona al menos 2 aficiones";
        DOM.errorCheck.style.display = "inline";
    } else {
        const aficionesElegidas = Array.from(checkboxes).map(checkbox => checkbox.value);
        DOM.aficiones.value = aficionesElegidas.join(",");
        DOM.errorCheck.textContent = "";
        DOM.errorCheck.style.display = "none";
    }

    // Validación del DNI/NIE
    if (DOM.dni.validationMessage !== "") {
        DOM.errorDni.textContent = "Formato incorrecto";
        DOM.errorDni.style.display = "inline";
        e.preventDefault();
    } else {
        DOM.errorDni.textContent = "";
        DOM.errorDni.style.display = "none";
    }
});
