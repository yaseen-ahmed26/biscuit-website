class NavigationBar extends HTMLElement{
  connectedCallback(){
    this.innerHTML = `
    
    <header>
        <h2 class="logo">Biscuit</h2>
        <nav class="navigation">
            <a href="../index.html">Home</a>
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
    const isLoggedIn = localStorage.getItem("user_data")
    const text = isLoggedIn !== null ? "Account" : "Login"
    const registerText = isLoggedIn !== null ? "hidden" : ""

    const isInPagesDir = window.location.pathname.includes("/pages/");
    const homePath = isInPagesDir ? "../index.html" : "./index.html";
    const pagesPath = isInPagesDir ? "./" : "./pages/";

    this.innerHTML = `
    
      <header>
        <h2 class="logo">Biscuit</h2>
        <nav class="navigation">
          <a href="${homePath}">Home</a>
          <a href="${pagesPath}register.html" ${registerText}>Register</a>
          <a href="${pagesPath}login.html">${text}</a>
        </nav>
      </header>

      `;
  }
}

customElements.define("navigation-bar", NavigationBar);
customElements.define("index-navigation-bar", SecondNavigationBar);