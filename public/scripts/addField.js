//Procurar o botão
document.querySelector("#add-phone")
//Quando clicar no botão 
.addEventListener("click", cloneField)
//Executar uma ação
function cloneField() {
    //Essa ação será duplicar os seguintes campos
    const newFieldContainer = document.querySelector("#phone").cloneNode(true) //Boolean: True or False, Verdadeiro ou Falso
    //Limpar os seguintes campos
    const fields = newFieldContainer.querySelectorAll('input')

    //Para cada campo, limpar
    fields.forEach(function(field) {
        //Pega o field do momento e o limpa
        field.value = ""
    })

    //Então, colocá-los na página. 
    //Aonde?
    document.querySelector('#phonenumber').appendChild(newFieldContainer)
}