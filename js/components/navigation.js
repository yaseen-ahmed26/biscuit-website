class NavigationBar extends HTMLElement{
  connectedCallback(){
    this.innerHTML = `
    
    <header>
        <h2 class="logo">Biscuit</h2>
        <nav class="navigation">
            <a href="leaderboard.html">Leaderboard</a>
            <a href="stats.html">Game Stats</a>
            <a href="code.html">Link Game</a>
            <a href="account.html">Account Details</a>
            <a href="delete.html">Delete Account</a>
            <button class="action-btn" id="action-btn">Log out</button>
        </nav>
    </header>

    `;
  }
}

customElements.define("navigation-bar", NavigationBar);