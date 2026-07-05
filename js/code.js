const actionBtn = document.getElementById("action-btn")
const submitBtn = document.getElementById("submit-btn")

const inputCodeField = document.getElementById("input-code")

const url = "http://127.0.0.1:8000/api/codes"

function logOutUser(){
    alert("Successfully logged out");
    localStorage.clear();
    window.location.replace("../index.html");
}

async function submitCode(){
    const postData = {
        login_code: inputCodeField.value
    }
    const token = localStorage.getItem("access_token")

    try{
        const response = await fetch(`${url}/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(postData)
        })

        let data = {};

        try{
            data = await response.json();
        } catch(error){
            console.log(error);
        };

        if(!response.ok){
            const errorMessage = Array.isArray(data.detail)
                ? data.detail?.[0]?.msg
                : data.message || data.detail || "Unknown error";

            alert(`An error occurred: (${response.status}) ${errorMessage}`);
            return;
        };

        alert(`Successfully logged in on your ${data.os} in ${data.country}`);
    }catch (error){
        alert(`An error occurred: ${error.message}`)
    }
}

actionBtn.addEventListener("click", logOutUser);
submitBtn.addEventListener("click", submitCode)