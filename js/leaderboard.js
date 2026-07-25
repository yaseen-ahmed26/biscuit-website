import { makeHTTPRequest } from "./helpers/api.js";
import { logOut } from "./helpers/localstorage.js";

const rows = document.querySelectorAll('.board .row');
const actionBtn = document.getElementById("action-btn")

async function displayLeaderboard(event){
    const data = await makeHTTPRequest("leaderboard")

    data.forEach((e, i) => {
        const row = rows[i]
        const playerSpan = row.querySelector('.player');
        const totalSpan = row.querySelector('.total');

        playerSpan.textContent = `${e.username}`;
        totalSpan.textContent = `${e.total_biscuits}`;
    })
}

actionBtn.addEventListener("click", logOut);

await displayLeaderboard()