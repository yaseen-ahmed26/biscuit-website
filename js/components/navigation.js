class NavigationBar extends HTMLElement{
  connectedCallback(){
    this.innerHTML = `
    
    <header>
        <h2 class="logo">Biscuit</h2>
        <nav class="navigation">
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

class SecondNavigationBar extends HTMLElement{

  connectedCallback(){
    this.innerHTML = `
    
      <header>
        <h2 class="logo">Biscuit</h2>
        <nav class="navigation">
          <a href="../index.html">Home</a>
          <a href="../pages/register.html">Register</a>
          <a href="../pages/login.html">Login</a>
        </nav>
      </header>

      `;
  }
}

customElements.define("navigation-bar", NavigationBar);
customElements.define("index-navigation-bar", SecondNavigationBar);