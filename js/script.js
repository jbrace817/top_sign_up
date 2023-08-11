const button = document.getElementById("btn");
const phone = document.forms["newAccountForm"]["phone"];
// const fName = document.forms["newAccountForm"]["first_Name"];
const fName = document.getElementById("first_Name");
const lName = document.getElementById("last_Name");
const allInput = document.querySelectorAll("input");
const form = document.querySelector("form");
const reqMsg = document.getElementsByClassName("reqMsg");
const reqFnameMsg = document.querySelector(".reqFnameMsg");
const reqLnameMsg = document.querySelector(".reqLnameMsg");

//Messages
const required = "* Required";

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

  if (fName.value.length <= 1) {
    fName.classList.add("error");
    // fName.setAttribute("required", "");
    console.log(reqMsg);
  } else {
    fName.classList.remove("error");
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
      msgDiv.textContent = null;
      // fName.removeAttribute("required", "");
    }
  });
}

function validateEmail(email) {
  const emailRegex = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$", "i");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

fName.addEventListener("blur", () => {
  isRequired(fName, reqFnameMsg);
});
lName.addEventListener("blur", () => {
  isRequired(lName, reqLnameMsg);
});
