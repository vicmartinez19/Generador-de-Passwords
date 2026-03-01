const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const passwordField = document.getElementById("password");
const strengthBar = document.getElementById("strengthBar");

lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
});

function generatePassword(){
    const length = lengthSlider.value;
    const uppercase = document.getElementById("uppercase").checked;
    const lowercase = document.getElementById("lowercase").checked;
    const numbers = document.getElementById("numbers").checked;
    const symbols = document.getElementById("symbols").checked;

    if(!uppercase && !lowercase && !numbers && !symbols){
        alert("Selecciona al menos una opción");
        return;
    }

    let chars = "";
    if(uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if(numbers) chars += "0123456789";
    if(symbols) chars += "!@#$%^&*()_+{}[]<>?/";

    let password = "";
    for(let i=0;i<length;i++){
        const randomIndex = Math.floor(Math.random()*chars.length);
        password += chars[randomIndex];
    }

    passwordField.value = password;
    checkStrength(password);
}

function checkStrength(password){
    let strength = 0;

    if(password.length > 12) strength++;
    if(/[A-Z]/.test(password)) strength++;
    if(/[a-z]/.test(password)) strength++;
    if(/[0-9]/.test(password)) strength++;
    if(/[^A-Za-z0-9]/.test(password)) strength++;

    let width = (strength/5)*100;
    strengthBar.style.width = width + "%";

    if(width < 40){
        strengthBar.style.background = "red";
    }else if(width < 70){
        strengthBar.style.background = "orange";
    }else{
        strengthBar.style.background = "lime";
    }
}

function copyPassword(){
    navigator.clipboard.writeText(passwordField.value);
    alert("Contraseña copiada");
}

generatePassword();