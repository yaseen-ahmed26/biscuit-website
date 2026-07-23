import {getUserId, getToken, getSaveId, saveToLocalStorage} from "./localstorage.js"

const baseURL = "http://127.0.0.1:8000/api"

const endpoints = {
    login: login,
    create: createUser,
    code: verifyCode,
    update: updateUser,
    delete: deleteUser,
    savedata: getSavedData,
    fallback: () => "No method found"
}

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

export async function makeHTTPRequest(requestName, ...args){
    const request = endpoints[requestName] || endpoints.fallback
    const response = await request(...args)
    const data = await handleResponse(response)

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

        window.location.replace("../../pages/account.html");
    
    }catch (error){
        alert(`An error occurred: ${error.message}`);
    };
}

async function login(email, password) {
    const formData = new URLSearchParams();

    formData.append("username", email);
    formData.append("password", password);

    return fetch(`${baseURL}/users/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData,
        credentials: "include"
    });
}

async function createUser(email, username, password) {
    const userData = {
        email: email,
        username: username,
        password: password
    };

    return fetch(`${baseURL}/users`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userData)
    })
}

async function verifyCode(code) {
    const postData = {
        login_code: code
    }
    const token = getToken()

   return fetch(`${baseURL}/codes/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(postData)
    })
}

async function updateUser(username, email, password, currentPassword) {
    const token = getToken();
    const id = getUserId();

    const userData = {
        username: username || null,
        email: email || null,
        password: password || null,
        current_password: currentPassword
    }

    return fetch(`${baseURL}/users/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(userData)
    });
}

async function deleteUser(){
    const token = getToken();
    const id = getUserId();

    return fetch(`${baseURL}/users/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });
}

async function getSavedData(){
    const save_id = getSaveId();

    return fetch(`${baseURL}/saves/${save_id}`, {
        method: "GET",
    });
}