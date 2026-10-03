class NavigationBar extends HTMLElement{
  connectedCallback(){
    this.innerHTML = `
    
    <header>
        <h2 class="logo">Biscuit</h2>
        <nav class="navigation">
          <a href="../index.html">Home</a>
          <div class="dropdown">
            <button class="dropbtn">Game</button>
            <div class="dropdown-content">
              <a href="stats.html">Stats</a>
              <a href="code.html">Link</a>
              <a href="leaderboard.html">Leaderboard</a>
            </div>
          </div>

          <div class="dropdown">
            <button class="dropbtn">Account</button>
            <div class="dropdown-content">
              <a href="account.html">Details</a>
              <a href="delete.html">Delete</a>
            </div>
          </div>

          <button class="action-btn" id="action-btn">Log out</button>
        </nav>
    </header>

    `;
  }
}

class SecondNavigationBar extends HTMLElement{

  connectedCallback(){
    this.innerHTML = `
      
    <header>
        <h2 class="logo">Biscuit</h2>
        <nav class="navigation">
          <a href="../index.html">Home</a>
          <div class="dropdown">
            <button class="dropbtn">Game</button>
            <div class="dropdown-content">
              <a href="./pages/stats.html">Stats</a>
              <a href="./pages/code.html">Link</a>
              <a href="./pages/leaderboard.html">Leaderboard</a>
            </div>
          </div>

          <div class="dropdown">
            <button class="dropbtn">Account</button>
            <div class="dropdown-content">
              <a href="./pages/account.html">Details</a>
              <a href="./pages/delete.html">Delete</a>
            </div>
          </div>

          <button class="action-btn" id="action-btn">Log out</button>
        </nav>
    </header>

    `;
  }
}

customElements.define("navigation-bar", NavigationBar);
customElements.define("index-navigation-bar", SecondNavigationBar);