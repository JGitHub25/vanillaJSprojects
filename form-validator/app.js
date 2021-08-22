/*
Verificar el tamaño del username.
Verificar que el correo no sea de 2-minute mail?
Verificar que los passwords cuplan los requisitos.
Verificar que los passwords sean iguales. */



/* ===================ELEMENTS======================= */
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password")
const password2 = document.getElementById("password2")
const submitBtn = document.getElementById("submit-button");


/* ===================USERNAME======================= */
username.addEventListener("change", (e) => {
  if (e.currentTarget.value.length < 5) {
    e.currentTarget.classList.add("input-field-error");
    e.currentTarget.nextElementSibling.classList.add("visible-error");
  } else {
    e.currentTarget.classList.remove("input-field-error");
    e.currentTarget.nextElementSibling.classList.remove("visible-error");
  }

})

/* ===================EMAIL======================= */
let takenEmails = ["mary@gmail.com", "jack1@hotmail.com", "markZ@havard.edu.co"]

email.addEventListener("change", () => {
  if (takenEmails.includes(email.value)) {
    email.classList.add("input-field-error");
    document.querySelector("#email-error").classList.add("visible-error");
  } else
  if (email.classList.contains("input-field-error")) {
    email.className = email.className.replace("input-field-error", "");
    document.querySelector("#email-error").classList.remove("visible-error");
  }
})



/* ===================PASSWORD======================= */
let regX = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$/
password.addEventListener("change", () => {

  if (password.value.length < 7 || !regX.test(password.value)) {
    password.classList.add("input-field-error")
    password.nextElementSibling.classList.add("visible-error")
  } else
  if (password.classList.contains("input-field-error")) {
    password.classList.remove("input-field-error")
    password.nextElementSibling.classList.remove("visible-error")
  }
})




/* ===================PASSWORD2======================= */
password2.addEventListener("change", () => {
  if (password.value !== password2.value) {
    password2.classList.add("input-field-error")
    password2.nextElementSibling.classList.add("visible-error")
  } else
  if (password2.classList.contains("input-field-error")) {
    password2.classList.remove("input-field-error")
    password2.nextElementSibling.classList.remove("visible-error")
  }
})


/* ===================SUBMIT======================= */
const checkNsubmit = () => {

  let fieldArray = [username, email, password, password2]
  let completeForm = {}

  fieldArray.forEach(field => {
    if (field.value !== "" && !field.classList.contains("input-field-error")) {
      completeForm[field.id] = `${field.value} is a valid value - ${field.validity.valid}`
    } else {
      completeForm.push("X-error-X")
    }
  })
  console.table(completeForm)
}
submitBtn.addEventListener("click", checkNsubmit)