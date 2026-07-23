import { makeHTTPRequest } from "./helpers/api.js"
import { logOut } from "./helpers/localstorage.js";

const actionBtn = document.getElementById("action-btn")
const submitBtn = document.getElementById("submit-btn")

const inputCodeField = document.getElementById("input-code")

async function submitCode(){
    try{
        const data = await makeHTTPRequest("code", [inputCodeField.value])

        alert(`Successfully logged in on your ${data.os} in ${data.country}`);
    }catch (error){
        alert(`An error occurred: ${error.message}`)
    }
}

actionBtn.addEventListener("click", logOut);
submitBtn.addEventListener("click", submitCode)