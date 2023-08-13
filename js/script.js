const button = document.getElementById("btn");
const phoneInputField = document.getElementById("phone");
// const fName = document.forms["newAccountForm"]["first_Name"];
const fNameInput = document.getElementById("first_Name");
const lNameInput = document.getElementById("last_Name");
const emailInput = document.getElementById("email");
const allInput = document.querySelectorAll("input");
const form = document.querySelector("form");

//Divs that contain messages.
const reqDiv = document.getElementsByClassName("reqDiv");
const reqFnameDiv = document.querySelector(".reqFnameDiv");
const reqLnameDiv = document.querySelector(".reqLnameDiv");
const reqEmailDiv = document.querySelector(".reqEmailDiv");
const reqPhoneDiv = document.querySelector(".reqPhoneDiv");

//Messages
const required = "* Required";
const msgEmail = "* Not a valid email.";
const msgPhone = "* Not a valid phone number.";

//Regex
const emailRegex = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$", "i");
const phoneRegex = new RegExp(
  "^(?:([?+0-9]{1})*[- .(]*([0-9]{3})[- .)]*[0-9]{3}[- .]*[0-9]{4})+$"
);

button.addEventListener("click", () => {
  //   console.log(typeof phone.value);
  // const phoneNumber = phone.value;
  // const phoneRegex = new RegExp("[0-9]{3}-[0-9]{3}-[0-9]{4}");
  // function telCheck(string) {
  //   const tel = document.getElementById("phone");
  //   if (string.match(phoneRegex)) {
  //     tel.classList.remove("error");
  //     return true;
  //   } else {
  //     tel.classList.add("error");
  //   }
  // }

  if (fNameInput.value.length <= 1) {
    fNameInput.classList.add("error");
    // fName.setAttribute("required", "");
    console.log(reqDiv);
  } else {
    fNameInput.classList.remove("error");
    // fName.removeAttribute("required", "");
  }
  isRequired();
  // console.log(telCheck(phoneNumber));
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
      msgDiv.textContent = required;
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
// phoneInput.addEventListener("blur", () => {
//   validateByRegex(phoneInput, phoneRegex, reqPhoneDiv, msgPhone);
// });
const phoneInput = window.intlTelInput(phoneInputField, {
  utilsScript:
    "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
});

function validatePhone(event) {
  event.preventDefault();

  const phoneNumber = phoneInput.getNumber();

  if (phoneInput.isValidNumber()) {
    phoneInputField.classList.remove("error");
    reqPhoneDiv.textContent = null;
  } else {
    phoneInputField.classList.add("error");
    reqPhoneDiv.textContent = msgPhone;
  }

  phoneInputField.addEventListener("keyup", () => {
    if (phoneInput.isValidNumber()) {
      phoneInputField.classList.remove("error");
      reqPhoneDiv.textContent = null;
    } else {
      phoneInputField.classList.add("error");
      reqPhoneDiv.textContent = msgPhone;
    }
  });
}

phoneInputField.addEventListener("blur", (e) => {
  validatePhone(e);
});
