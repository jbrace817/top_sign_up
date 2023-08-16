const button = document.getElementById("btn");
const form = document.querySelector("form");

//Input Fields
const phoneInput = document.getElementById("phone");
// const fName = document.forms["newAccountForm"]["first_Name"];
const fNameInput = document.getElementById("first_Name");
const lNameInput = document.getElementById("last_Name");
const emailInput = document.getElementById("email");
const allInput = document.querySelectorAll("input");

//Divs that contain messages.
const reqDiv = document.querySelectorAll(".reqDiv");
const reqFnameDiv = document.querySelector(".reqFnameDiv");
const reqLnameDiv = document.querySelector(".reqLnameDiv");
const reqEmailDiv = document.querySelector(".reqEmailDiv");
const reqPhoneDiv = document.querySelector(".reqPhoneDiv");

//Messages
const required = "* Required";
const msgEmail = "* Not a valid email.";
const msgPhone = "* Not a valid phone number.";

//Regex
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = new RegExp(
  "^(?:([?+0-9]{1})*[- .(]*([0-9]{3})[- .)]*[0-9]{3}[- .]*[0-9]{4})+$"
);

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
        isRequired(phoneInput, reqPhoneDiv);
        break;
      default:
        break;
    }
  }
});

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

const phoneInputField = window.intlTelInput(phoneInput, {
  utilsScript:
    "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
});

function validatePhone(event) {
  event.preventDefault();
  const phoneNumber = phoneInputField.getNumber();

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

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

fNameInput.addEventListener("blur", () => {
  isRequired(fNameInput, reqFnameDiv);
});
lNameInput.addEventListener("blur", () => {
  isRequired(lNameInput, reqLnameDiv);
});

emailInput.addEventListener("blur", () => {
  validateByRegex(emailInput, emailRegex, reqEmailDiv, msgEmail);
});
// phoneInputField.addEventListener("blur", () => {
//   validateByRegex(phoneInputField, phoneRegex, reqPhoneDiv, msgPhone);
// });

phoneInput.addEventListener("blur", (e) => {
  validatePhone(e);
});
