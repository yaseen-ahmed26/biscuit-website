import { makeHTTPRequest, logOut } from "./helpers/api.js"
import { getUserId } from "./helpers/localstorage.js";

const actionBtn = document.getElementById("action-btn")
const submitBtn = document.getElementById("submit-btn")

const inputPhraseField = document.getElementById("input-phrase")

async function submitCode(){
    try{
        const id = getUserId()

        const data = await makeHTTPRequest({
            requestType: "DELETE",
            requestURL: `users/${id}`
        })

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

actionBtn.addEventListener("click", logOut);
submitBtn.addEventListener("click", submitCode);
inputPhraseField.addEventListener("change", checkCorrectPhrase)