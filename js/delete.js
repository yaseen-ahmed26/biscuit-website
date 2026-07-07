import { deleteUserEndpoint } from "./helpers/api.js"

const actionBtn = document.getElementById("action-btn")
const submitBtn = document.getElementById("submit-btn")

const inputPhraseField = document.getElementById("input-phrase")

function logOutUser(){
    alert("Successfully logged out");
    localStorage.clear();
    window.location.replace("../index.html");
}

async function submitCode(){
    try{
        const data = await deleteUserEndpoint()

        alert("Successfully deleted your account");
        logOutUser()
    }catch (error){
        alert(`An error occurred: ${error.message}`)
    }
}

async function checkCorrectPhrase(){
    let phrase = inputPhraseField.value.trim()
    
    if(phrase !== "delete my account"){
        submitBtn.textContent = "Enter Phrase"
        submitBtn.disabled = true
    }else{
        submitBtn.textContent = "Delete"
        submitBtn.disabled = false
    }
}

actionBtn.addEventListener("click", logOutUser);
submitBtn.addEventListener("click", submitCode);
inputPhraseField.addEventListener("focusout", checkCorrectPhrase)