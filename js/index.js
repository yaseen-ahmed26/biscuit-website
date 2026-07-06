let activeCard = "login";

const actionBtn = document.getElementById("action-btn");
const loginBtn = document.getElementById("login-btn")

const loginEmailField = document.getElementById("login-email")
const loginPasswordField = document.getElementById("login-password")

const url = "http://127.0.0.1:8000/api/users"

async function getCurrentUser(token) {
    try{
        const response = await fetch(url + "/me", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if(!response.ok){
            alert("Failed to fetch user data");
            return;
        }

        const userData = await response.json();

        localStorage.setItem("user_data", JSON.stringify(userData));

        window.location.replace("pages/account.html");
    
    }catch (error){
        alert(`An error occurred: ${error.message}`);
    };
};

async function loginUser(event){
    event.preventDefault();
    
    const formData = new URLSearchParams();

    formData.append("username", loginEmailField.value);
    formData.append("password", loginPasswordField.value);

    try{
        const response = await fetch(url + "/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData
        });

        let data = {};

        try{
            data = await response.json();
        } catch(error){
            console.log(error);
        };

       if(!response.ok){
            const errorMessage = Array.isArray(data.detail)
                ? data.detail?.[0]?.msg
                : data.message || data.detail || "Unknown error";

            alert(`An error occurred: (${response.status}) ${errorMessage}`);
            return;
        };

        localStorage.setItem("access_token", data.access_token);
        alert("Login successful");

        await getCurrentUser(data.access_token);
    }catch (error) {
        alert(`An error occurred: ${error.message}`);
    };
};

actionBtn.addEventListener("click", () => {
    window.location.replace("pages/register.html");
});
loginBtn.addEventListener("click", loginUser)