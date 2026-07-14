import {getUserId, getToken, getSaveId, saveToLocalStorage} from "./localstorage.js"

const baseURL = "http://127.0.0.1:8000/api"

async function handleResponse(response){
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

        throw new Error(`(${response.status}) ${errorMessage}`);
    };

    return data
}

export async function getCurrentUser(){
    const token = getToken();

    try{
        const response = await fetch(baseURL + "/users/me", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if(!response.ok){
            alert("Failed to fetch user data");
            return;
        }

        const userData = await response.json();
        const {save, ...user} = userData;
        
        saveToLocalStorage("user_data", JSON.stringify(user))

        if(save){
            saveToLocalStorage("user_save", JSON.stringify(save))
        }

        window.location.replace("pages/account.html");
    
    }catch (error){
        alert(`An error occurred: ${error.message}`);
    };
}

export async function loginEndpoint(email, password) {
    const formData = new URLSearchParams();

    formData.append("username", email);
    formData.append("password", password);

    const response = await fetch(`${baseURL}/users/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData
    });

    return handleResponse(response)
}

export async function createUserEndpoint(email, username, password) {
    const userData = {
        email: email,
        username: username,
        password: password
    };

    const response = await fetch(`${baseURL}/users`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userData)
    })

    return handleResponse(response)
}

export async function verifyCodeEndpoint(code) {
    const postData = {
        login_code: code
    }
    const token = getToken()

    const response = await fetch(`${baseURL}/codes/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(postData)
    })

    return handleResponse(response)
}

export async function updateUserEndpoint(username, email, password, currentPassword) {
    const token = getToken();
    const id = getUserId();

    const userData = {
        username: username || null,
        email: email || null,
        password: password || null,
        current_password: currentPassword
    }

    const response = await fetch(`${baseURL}/users/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(userData)
    });

    return handleResponse(response)
}

export async function deleteUserEndpoint(){
    const token = getToken();
    const id = getUserId();

    const response = await fetch(`${baseURL}/users/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });

    return handleResponse(response)
}

export async function getSavedDataEndpoint(){
    const save_id = getSaveId();

    const response = await fetch(`${baseURL}/saves/${save_id}`, {
        method: "GET",
    });

    return handleResponse(response)
}