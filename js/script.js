const button = document.getElementById("btn");
const form = document.querySelector("form");
const togglePassword = document.querySelector("#togglePassword");

/**Input Fields */
const phoneInput = document.getElementById("phone");
const fNameInput = document.getElementById("first_Name");
const lNameInput = document.getElementById("last_Name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm_password");
const allInput = document.querySelectorAll("input");

/**Divs that contain messages. */
const reqDiv = document.querySelectorAll(".reqDiv");
const reqFnameDiv = document.querySelector(".reqFnameDiv");
const reqLnameDiv = document.querySelector(".reqLnameDiv");
const reqEmailDiv = document.querySelector(".reqEmailDiv");
const reqPhoneDiv = document.querySelector(".reqPhoneDiv");
const reqPasswordDiv = document.querySelector(".reqPasswordDiv");
const reqConfirmDiv = document.querySelector(".reqConfirmDiv");

/**Error messages */
const required = "* Required";
const msgEmail = "* Not a valid email.";
const msgPhone = "* Not a valid phone number.";
let count = 0;

/**Regex */
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = new RegExp(
  "^(?:([?+0-9]{1})*[- .(]*([0-9]{3})[- .)]*[0-9]{3}[- .]*[0-9]{4})+$"
);
const matchsymbol = "[-’/`~!#*$@_%+=.,^&(){}[]|;:”<>?\\]";
const matchNumber = "[0-9]";
const matchCap = "[A-Z]";
const matchLength = ".{8,}";

/**Functions */
/** Adds class="error" to input elements and adds "* Required" to the Div associated to that input element.*/
function isRequired(inputElement, msgDiv) {
  if (inputElement.value.length <= 0) {
    inputElement.classList.add("error");
    // fName.setAttribute("required", "");
    msgDiv.textContent = required;
  } else {
    inputElement.classList.remove("error");
    // fName.removeAttribute("required", "");
  }
  inputElement.addEventListener("keyup", () => {
    if (inputElement.value.length <= 0) {
      inputElement.classList.add("error");
      msgDiv.textContent = required;
      // fName.setAttribute("required", "");
    } else {
      inputElement.classList.remove("error");
      msgDiv.textContent = null;
      // fName.removeAttribute("required", "");
    }
  });
}

/** Validates input elements by regex*/
function validateByRegex(inputElement, regex, msgDiv, message) {
  if (inputElement.value.match(regex)) {
    inputElement.classList.remove("error");
  } else {
    inputElement.classList.add("error");
    msgDiv.textContent = message;
  }

  inputElement.addEventListener("keyup", () => {
    if (inputElement.value.match(regex)) {
      inputElement.classList.remove("error");
      msgDiv.textContent = null;
    } else {
      inputElement.classList.add("error");
      msgDiv.textContent = message;
    }
  });
}

/** Applies the intlTelInput plugin to the phoneInput element. */
const phoneInputField = window.intlTelInput(phoneInput, {
  utilsScript:
    "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
});

/** Validates phone number ising intlTelInput plugin. */
function validatePhone(event) {
  event.preventDefault();
  // const phoneNumber = phoneInputField.getNumber();

  if (phoneInputField.isValidNumber()) {
    phoneInput.classList.remove("error");
    reqPhoneDiv.textContent = null;
  } else {
    phoneInput.classList.add("error");
    reqPhoneDiv.textContent = msgPhone;
  }

  phoneInput.addEventListener("keyup", () => {
    if (phoneInputField.isValidNumber()) {
      phoneInput.classList.remove("error");
      reqPhoneDiv.textContent = null;
    } else {
      phoneInput.classList.add("error");
      reqPhoneDiv.textContent = msgPhone;
    }
  });
}

/**Function let user verify password requirements */
function passwordValidation() {
  const requirements = document.createElement("p");
  const characters = document.createElement("p");
  const symbol = document.createElement("p");
  const number = document.createElement("p");
  const capitalLetter = document.createElement("p");
  requirements.textContent = "Password requirements:";
  characters.textContent = "Minimum 8 characters";
  symbol.textContent = "A symbol";
  number.textContent = "A number";
  capitalLetter.textContent = "One uppercase letter";
  // requirements.style.color = "black";
  reqPasswordDiv.append(
    requirements,
    characters,
    symbol,
    number,
    capitalLetter
  );

  contains(symbol, matchsymbol, "str1");
  contains(number, matchNumber, "str2");
  contains(capitalLetter, matchCap, "str3");
  contains(characters, matchLength, "str4");
  if (count === 4) {
    requirements.style.color = "green";
    passwordInput.classList.remove("error");
  } else {
    requirements.style.color = "red";
    passwordInput.classList.add("error");
  }

  console.log(typeof passwordInput.value);
  passwordInput.addEventListener("keyup", () => {
    contains(symbol, matchsymbol, "str1");
    contains(number, matchNumber, "str2");
    contains(capitalLetter, matchCap, "str3");
    contains(characters, matchLength, "str4");

    /**Turns requirmenets element green or red depending on count. */
    if (count === 4) {
      requirements.style.color = "green";
      passwordInput.classList.remove("error");
    } else {
      requirements.style.color = "red";
      passwordInput.classList.add("error");
    }
  });
}

/**Validates if password has the particular character or length, if so, it turns the text green and add a checkmark. Else removes it and turns red */

function contains(type, char, str) {
  const span = document.createElement("span");
  span.classList.add(str);
  const exists = document.querySelector("." + str);

  if (passwordInput.value.match(char)) {
    type.style.color = "green";

    if (!exists) {
      span.textContent = " ✓";
      type.append(span);
      count++;
    }
  } else {
    type.style.color = "red";
    const spans = document.getElementsByTagName("span");
    for (let i = 0; i < spans.length; i++) {
      if (spans[i].className === str) {
        const s = spans[i];
        s.remove();
        count--;
      }
    }
  }
}

/**Verifies that passwords match in the passwordInput or confirmInput fields, adds a message under the confirmInput field. */
function matchPasswords(pass1, pass2) {
  pass2.addEventListener("keyup", () => {
    if (pass1.value !== pass2.value) {
      confirmInput.classList.add("error");
      reqConfirmDiv.textContent = "Passwords do not match!";
      // reqConfirmDiv.append(matchMessage);
    } else {
      reqConfirmDiv.textContent = null;
      confirmInput.classList.remove("error");
    }
  });
  pass1.addEventListener("keyup", () => {
    if (pass2.value !== pass1.value) {
      confirmInput.classList.add("error");
      reqConfirmDiv.textContent = "Passwords do not match!";
      // reqConfirsmDiv.append(matchMessage);
    } else {
      reqConfirmDiv.textContent = null;
      confirmInput.classList.remove("error");
    }
  });
}

/**When clicked validates input. If incorrect, error is shown. */
button.addEventListener("click", () => {
  for (let i = 0; i < allInput.length; i++) {
    const a = allInput[i];
    switch (a) {
      case fNameInput:
        isRequired(fNameInput, reqFnameDiv);
        break;
      case lNameInput:
        isRequired(lNameInput, reqLnameDiv);
        break;
      case emailInput:
        if (emailInput.value.length == 0) {
          isRequired(emailInput, reqEmailDiv);
          emailInput.addEventListener("keyup", () => {
            validateByRegex(emailInput, emailRegex, reqEmailDiv, msgEmail);
          });
        } else {
          validateByRegex(emailInput, emailRegex, reqEmailDiv, msgEmail);
        }
        break;
      case phoneInput:
        if (phoneInput.value.length == 0) {
          isRequired(phoneInput, reqPhoneDiv);
          phoneInput.addEventListener("keyup", (e) => {
            validatePhone(e);
          });
        }
        break;
      case passwordInput:
        if (reqPasswordDiv.children.length <= 0) {
          passwordValidation();
        }
        break;
      case confirmInput:
        if (confirmInput.value.length === 0) {
          confirmInput.classList.add("error");
          reqConfirmDiv.textContent = "* Required";
        }
        matchPasswords(passwordInput, confirmInput);
      default:
        break;
    }
  }
});

/**Prevents or allows form to be submitted. */
form.addEventListener("submit", (e) => {
  let array = [];
  for (let i = 0; i < allInput.length; i++) {
    const a = allInput[i];
    if (a.classList.contains("error")) {
      e.preventDefault();
      console.log(a);
      array.push(a);
    } else {
      console.log(false);
    }
  }
  array.sort(function (a, b) {
    return a.getAttribute("tabindex") - b.getAttribute("tabindex");
  });
  array[0].focus();
});

/**Event Listeners */

fNameInput.addEventListener("blur", () => {
  isRequired(fNameInput, reqFnameDiv);
});
lNameInput.addEventListener("blur", () => {
  isRequired(lNameInput, reqLnameDiv);
});

emailInput.addEventListener("blur", () => {
  validateByRegex(emailInput, emailRegex, reqEmailDiv, msgEmail);
});

phoneInput.addEventListener("blur", (e) => {
  validatePhone(e);
});

passwordInput.addEventListener("focus", () => {
  if (reqPasswordDiv.children.length <= 0) {
    passwordValidation();
  }
});

confirmInput.addEventListener("focus", () => {
  matchPasswords(passwordInput, confirmInput);
});

/**Togles password field to text field for viewability */
togglePassword.addEventListener("click", function (e) {
  // toggle the type attribute
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  // toggle the eye / eye slash icon
  this.classList.toggle("bi-eye");
});
