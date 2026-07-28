import { makeHTTPRequest, logOut } from "./helpers/api.js"

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

        alert(`Successfully logged in on your ${data.os} in ${data.country}`);
    }catch (error){
        alert(`An error occurred: ${error.message}`)
    }
}

actionBtn.addEventListener("click", logOut);
submitBtn.addEventListener("click", submitCode)