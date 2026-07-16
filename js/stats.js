import { getSavedDataEndpoint } from "./helpers/api.js";
import { logOut } from "./helpers/localstorage.js";

const actionBtn = document.getElementById("action-btn");
const refreshBtn = document.getElementById("refresh-btn")

const biscuitsLabel = document.getElementById("lifetime-biscuits")
const playtimeLabel = document.getElementById("lifetime-playtime")
const clicksLabel = document.getElementById("lifetime-clicks")

function formatPlaytime(totalSeconds){
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = Math.floor(totalSeconds % 60);

    let paddedHours = String(hours).padStart(2, "0");
    let paddedMinutes = String(minutes).padStart(2, "0");
    let paddedSeconds = String(seconds).padStart(2, "0");

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}

function loadSaveData(){
    const userSave = localStorage.getItem("user_save");

    if(!userSave){
        alert("No save data found, create an account instead")
        window.location.replace("../index.html");
        return;
    };

    const saveData = JSON.parse(userSave);
    const formattedTime = formatPlaytime(saveData.total_playtime)

    biscuitsLabel.textContent = "Lifetime Biscuits: " + saveData.total_biscuits;
    playtimeLabel.textContent = "Lifetime PLaytime: " + formattedTime;
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