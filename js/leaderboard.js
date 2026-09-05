import { makeHTTPRequest, logOut } from "./helpers/api.js";
import { getSaveId } from "./helpers/localstorage.js";
import { showToast } from "./helpers/window.js";

const rows = document.querySelectorAll('.board .row');
const actionBtn = document.getElementById("action-btn")

async function displayLeaderboard(event){
    const data = await makeHTTPRequest({
        requestType: "GET",
        requestURL: `saves/leaderboard`
    })

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