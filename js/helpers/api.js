import {getUserId, getSaveId, saveToLocalStorage } from "./localstorage.js"

const baseURL = "http://127.0.0.1:8000/api"

async function handleResponse(response){
    let data = {};

    try{
        data = await response.json();
    }catch(error){
        data = {};
    };

    if(!response.ok){
        const errorMessage = Array.isArray(data.detail)
            ? data.detail?.[0]?.msg
            : data.message || data.detail || "Unknown error";
        
        throw new Error(`(${response.status}) ${errorMessage}`);
    };

    return data
}

export async function makeHTTPRequest(
    {requestType = "",
    requestBody = {},
    requestHeaders = {},
    requestURL = ""},
    retry = false
){
    let options = {
        method: requestType,
        headers: requestHeaders,
        body: requestBody,
        credentials: "include"
    }

    if(requestType === "GET"){
        options.body = undefined;
    }else{
        if(!requestURL.includes("login")){
            console.log("strinigifying")
            options.body = JSON.stringify(requestBody)
        }
    }

    let response = await fetch(`${baseURL}/${requestURL}`, options)

    if(!response.ok){
        if(response.status === 401 && !requestURL.includes("login")){
            if(retry){
                logOut()
                console.log("(401) Session expired");
            }

            const refreshSuccess = await getNewRefresh();

            if(refreshSuccess){
                return await makeHTTPRequest({
                    requestType,
                    requestBody,
                    requestHeaders,
                    requestURL
                }, true);
            } else {
                logOut()
                console.log("(401) Refresh failed");
            }
        }
    };

    return await handleResponse(response);
}

export async function getNewRefresh(){
    try{
        const response = await fetch(`${baseURL}/auth/refresh`, {
            method: "POST",
            credentials: "include"
        });

        return response.ok;
    }catch(error){
        console.error("Refresh request error: ", error);

        return false;
    }
}

export async function getCurrentUser(){
    try{
        const response = await fetch(baseURL + "/users/me", {
            method: "GET",
            credentials: "include"
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

export async function logOut(){
    const response = await fetch(`${baseURL}/auth/logout`, {
        method: "POST",
        credentials: "include"
    });

    if(response.ok){
        alert("Logged out");

        localStorage.clear();
        window.location.replace("../../../index.html");
    }
}