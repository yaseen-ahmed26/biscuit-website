import { makeHTTPRequest, logOut } from "./helpers/api.js";
import { getSaveId } from "./helpers/localstorage.js";
import { changeWindow, showToast } from "./helpers/window.js";

const actionBtn = document.getElementById("action-btn");

const titleLabel = document.getElementById("title")
const descLabel = document.getElementById("description")

const biscuitsLabel = document.getElementById("lifetime-biscuits");
const playtimeLabel = document.getElementById("lifetime-playtime");
const clicksLabel = document.getElementById("lifetime-clicks");

function formatPlaytime(totalSeconds){
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = Math.floor(totalSeconds % 60);

    let paddedHours = String(hours).padStart(2, "0");
    let paddedMinutes = String(minutes).padStart(2, "0");
    let paddedSeconds = String(seconds).padStart(2, "0");

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}

async function loadSaveData(){
    let params = new URLSearchParams(document.location.search);
    const save_id = params.get("id");
    
    if(save_id === null){
        titleLabel.textContent = "Error"
        descLabel.textContent = "No Save ID has been provided."

        biscuitsLabel.parentElement.style.display = "none"
        playtimeLabel.parentElement.style.display = "none"
        clicksLabel.parentElement.style.display = "none"

        return
    };
    
    try{
        const data = await makeHTTPRequest({
            requestType: "GET",
            requestURL: `saves/${save_id}`
        })
        const formattedTime = formatPlaytime(data.total_playtime)

        titleLabel.textContent = `${data.player_username}'s Stats`
        descLabel.textContent = ""

        biscuitsLabel.textContent = "Lifetime Biscuits: " + data.total_biscuits;
        playtimeLabel.textContent = "Lifetime PLaytime: " + formattedTime;
        clicksLabel.textContent = "Lifetime Clicks: " + data.total_clicks;
    }catch (error){
        showToast(`${error.message}`)

        titleLabel.textContent = "400"
        descLabel.textContent = "This link is invalid."

        biscuitsLabel.parentElement.style.display = "none"
        playtimeLabel.parentElement.style.display = "none"
        clicksLabel.parentElement.style.display = "none"
    }
}


actionBtn.addEventListener("click", logOut);

await loadSaveData();