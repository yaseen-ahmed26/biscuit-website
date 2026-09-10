import { makeHTTPRequest, logOut } from "./helpers/api.js"
import { showToast } from "./helpers/window.js";

const actionBtn = document.getElementById("action-btn")
const submitBtn = document.getElementById("submit-btn")

const inputCodeField = document.getElementById("input-code")

async function submitCode(){
    try{
        const data = await makeHTTPRequest({
            requestType: "POST",
            requestBody: {login_code: inputCodeField.value},
            requestHeaders: {"Content-Type": "application/json"},
            requestURL: "codes/verify"
        })

        showToast(`Successfully logged in on your ${data.os} in ${data.country}`);
    }catch (error){
        showToast(`${error.message}`)
    }
}

function checkCode(){
    inputCodeField.value = inputCodeField.value.toUpperCase().trim()
    
    if(inputCodeField.value.length !== 7){
        submitBtn.textContent = "Enter Code"
        submitBtn.disabled = true
        submitBtn.style.color = "grey"
        submitBtn.style.cursor = "auto"
    }else{
        submitBtn.textContent = "Link"
        submitBtn.disabled = false
        submitBtn.style.color = "white"
        submitBtn.style.cursor = "pointer"
    }
}

actionBtn.addEventListener("click", logOut);
submitBtn.addEventListener("click", submitCode)
inputCodeField.addEventListener("input", checkCode)

checkCode()
inputCodeField.focus()