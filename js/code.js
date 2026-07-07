import { verifyCodeEndpoint } from "./helpers/api.js"

const actionBtn = document.getElementById("action-btn")
const submitBtn = document.getElementById("submit-btn")

const inputCodeField = document.getElementById("input-code")

function logOutUser(){
    alert("Successfully logged out");
    localStorage.clear();
    window.location.replace("../index.html");
}

async function submitCode(){
    try{
        const data = await verifyCodeEndpoint(inputCodeField.value)

        alert(`Successfully logged in on your ${data.os} in ${data.country}`);
    }catch (error){
        alert(`An error occurred: ${error.message}`)
    }
}

actionBtn.addEventListener("click", logOutUser);
submitBtn.addEventListener("click", submitCode)