/*jshint esversion: 6 */

const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    var response

    if (username === "Geraldo" && password === "Cepo132230") {
        response = 1
        console.log("ta funcionando")
    } else {
        alert("Senha incorreta.");
        response = 0;
    }
})

module.exports = {
    response
};