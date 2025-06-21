const inputSlider = document.getElementById("inputSlider");
const sliderValue = document.getElementById("sliderValue");
const passBox = document.getElementById("passBox");

const lowercaseEl = document.getElementById("lowercase");
const uppercaseEl = document.getElementById("uppercase"); // typo fixed
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");

const generateBtn = document.getElementById("genBtn");
const copyBtn = document.getElementById("copyIcon");
const passIndicator = document.getElementById("passIndicator");

const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=[]{}\\|;':\",./<>?";

sliderValue.textContent = inputSlider.value;

inputSlider.addEventListener("input", () => {
    sliderValue.textContent = inputSlider.value;
    generatePassword();
});

function generatePassword() {
    const length = inputSlider.value;
    let characters = "";
    let password = "";

    let charTypes = [];

    if (lowercaseEl.checked) {
        characters += lowercaseLetters;
        charTypes.push(lowercaseLetters);
    }
    if (uppercaseEl.checked) {
        characters += uppercaseLetters;
        charTypes.push(uppercaseLetters);
    }
    if (numbersEl.checked) {
        characters += numbers;
        charTypes.push(numbers);
    }
    if (symbolsEl.checked) {
        characters += symbols;
        charTypes.push(symbols);
    }

    // If no option selected
    if (characters === "") {
        passBox.value = "";
        passIndicator.className = "pass-indicator";
        return;
    }

    // Guarantee at least 1 character from each selected type
    charTypes.forEach(type => {
        password += type.charAt(Math.floor(Math.random() * type.length));
    });

    // Fill the rest of the password
    for (let i = password.length; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Shuffle password so guaranteed characters aren't always at the start
    passBox.value = shufflePassword(password);
    updatePasswordIndicator();
}

generateBtn.addEventListener("click", () => {
    generatePassword();
});

function shufflePassword(password) {
    return password
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');
}

function updatePasswordIndicator() {
    const passwordStrength = getPasswordStrength(passBox.value);
    passIndicator.className = "pass-indicator " + passwordStrength;
}

function getPasswordStrength(password) {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) return "weak";
    else if (strength <= 4) return "medium";
    else return "strong";
}

window.addEventListener('DOMContentLoaded', () => {
    updatePasswordIndicator();
});

copyBtn.addEventListener("click", () => {
    if (passBox.value != "" || passBox.value.length >= 1) {
        navigator.clipboard.writeText(passBox.value);
        copyBtn.innerText = "check";

        setTimeout(() => {
            copyBtn.innerHTML = "content_copy";
        }, 3000);
    }
});
