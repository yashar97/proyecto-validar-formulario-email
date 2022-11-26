//variables
const inputEmail = document.querySelector('#email');
const inputAsunto = document.querySelector('#asunto');
const inputMensaje = document.querySelector('#mensaje');
const btnSubmit = document.querySelector('button[type="submit"]');
const spinner = document.querySelector('#spinner');
const formulario = document.querySelector('#formulario');
const btnReset = document.querySelector('button[type="reset"]');

const email = {
    email: "",
    asunto: "",
    mensaje: "",
}

//event listeners
inputEmail.addEventListener('blur', validar);
inputAsunto.addEventListener('blur', validar);
inputMensaje.addEventListener('blur', validar);
formulario.addEventListener('submit', enviarEmail);
btnReset.addEventListener('click', resetear);


//funciones

function alertaMensajeEnviado(referencia) {
    const mensaje = document.createElement('p');
    mensaje.classList.add('mensaje-exitoso');
    mensaje.textContent = "Formulario enviado exitosamente";
    referencia.appendChild(mensaje);
}

function resetear() {
    email.email = "";
    email.asunto = "";
    email.mensaje = "";
    validarCampos();
}

function enviarEmail(e) {
    e.preventDefault();
    spinner.classList.remove('hidden');
    
    setTimeout(() => {
        spinner.classList.add('hidden');
        formulario.reset();
        resetear();
        alertaMensajeEnviado(formulario);
        
    }, 2500);

    setTimeout(() => {
        limpiarAlertaDeExito();
    }, 5000);
}

function validar(e) {
    if (e.target.value.trim() === "") {
        mostrarAlerta(e.target.parentElement, `El campo ${e.target.id} es obligatorio`);
        email[e.target.id] = "";
        validarCampos();
        return;
    }

    if (e.target.id === "email" && !validarEmail(e.target.value)) {
        mostrarAlerta(e.target.parentElement, "El email ingresado no es válido");
        email[e.target.id] = "";
        validarCampos();
        return;
    }

    email[e.target.id] = e.target.value;
    limpiarAlerta(e.target.parentElement);
    validarCampos();


}

function mostrarAlerta(referencia, mensaje) {
    limpiarAlerta(referencia);

    const error = document.createElement('p');
    error.textContent = mensaje;
    error.classList.add('alerta');
    error.style.color = "red";
    referencia.appendChild(error);

}

function limpiarAlerta(referencia) {
    const existe = referencia.querySelector('.alerta');
    if (existe) {
        existe.remove();
    }
}

function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;

}

function validarCampos() {
    if (Object.values(email).includes("")) {
        btnSubmit.classList.add('opacity-50');
        btnSubmit.disabled = true;
    } else {
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }
}

function limpiarAlertaDeExito() {
    const existe = document.querySelector('.mensaje-exitoso');
    if(existe) {
        existe.remove();
    }
}