import { getSavedDataEndpoint } from "./helpers/api.js";
import { logOut } from "./helpers/localstorage.js";

const actionBtn = document.getElementById("action-btn");
const refreshBtn = document.getElementById("refresh-btn")

const biscuitsLabel = document.getElementById("lifetime-biscuits")
const playtimeLabel = document.getElementById("lifetime-playtime")
const clicksLabel = document.getElementById("lifetime-clicks")

function loadSaveData(){
    const userSave = localStorage.getItem("user_save");

    if(!userSave){
        alert("No save data found, create an account instead")
        window.location.replace("../index.html");
        return;
    };

    const saveData = JSON.parse(userSave);

    biscuitsLabel.textContent = "Lifetime Biscuits: " + saveData.total_biscuits;
    playtimeLabel.textContent = "Lifetime PLaytime: " + saveData.total_playtime;
    clicksLabel.textContent = "Lifetime Clicks: " + saveData.total_clicks;
}

async function updateSaveData(){
    try{
        const data = await getSavedDataEndpoint()

        alert('Success');

        localStorage.setItem("user_save", JSON.stringify(data));
        
        loadSaveData()
    }catch (error){
        alert(`${error.message}`)
    }
}

actionBtn.addEventListener("click", logOut);
refreshBtn.addEventListener("click", updateSaveData);
loadSaveData();