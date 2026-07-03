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
    if(inputCodeField.value.length !== 7){
        alert("Code must be exactly 7 characters");
        return;
    };

    const postData = {
        code: inputCodeField.value
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

        const data = await response.json();

        if(!response.ok){
            alert(`An error occurred ${response.status} ${data.detail}`)
            return;
        }

        alert('Success:', data.message);
    }catch (error){
        alert(`An error occurred: ${error.message}`)
    }
}

actionBtn.addEventListener("click", logOutUser);
submitBtn.addEventListener("click", submitCode)