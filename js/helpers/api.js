import { getUserId, getSaveId, saveToLocalStorage } from "./localstorage.js"
import { changeWindow, showToast } from "./window.js"

async function handleResponse(response){
    return {}
}

export async function makeHTTPRequest(
    {requestType = "",
    requestBody = {},
    requestHeaders = {},
    requestURL = ""},
    retry = false
){
    showToast("This legacy website is archived.")
    throw new Error("Server connection disabled.")
}

export async function getNewRefresh(){
    return false;
}

export async function getCurrentUser(){
    showToast("Login is disabled.")
}

export async function logOut(){
    changeWindow("index.html");
    localStorage.clear();
}