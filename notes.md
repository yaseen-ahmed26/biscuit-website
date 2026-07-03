# Project Notes

This is some personal notes based off the project.

---
### FUTURE IDEAS:
- Game dashboard. This will be a seperate HTML page.
- Better cover image
- When creating an account, it showed auto-log you in. This probably has to be done by seperating the login and register logic and pages.
- Changing password field in the account details.

---
### TOOLS
**JavaScript**: The 'brain' of the website. Makes the page dynamic and responsive.

**HTML***: The 'skeleton' of the website. Defines the page elements.

**CSS***: The 'clothing' of the website. Controls how the website looks.

---
### (FIXED) ISSUES
1. Cross Origin Resource Sharing (CORS)
This is a browser security method that blocks a webpage from requestsing data from a different domain that isn't itself. To fix, the API (FastAPI) must allow and send the correct CORS headers. If you didn't own the API, you'd have to use a proxy server which is a middle man.

2. 422 Unprocessable Entity in createUser
Wasn't matching my schemas. It's defined specifically as email, username and password but I wasn't changing it so when JavaScript sent it, it default to the variable names (which was registerEmailField, for example. It was registerEmailField = "user@example.com", instead of email = "user@example.com")

3. Race Conditions
Previously, I was trying to update thw account page with data from index.html. Because account.js was being ran by index.js first, it was finding all the elements. Because index.html does not have say an element with an ID of 'email-label' it caused an issue. Then it redirected. To fix, store the user data (the data returned when we login) in localstorage, then let account.js do its thing.

4. Changing Pages
Was trying to change the window after setting that window up, which reset the page back to default and JavaScript had to run again. Because it reset, this time it did not have the user data so it threw an error.

5. Remember to parse localstorage items
Got a 422 error when updating the user information because I forgot to parse userData inside localstorage. So user_id was undefined.

---
### DESIGN NOTES
- Could probably have a "Already have an account?" message on the register card. Though there is the login button on the top so maybe it's not needed.
- Default card would be register. User can click the top right button to log in. Once logged in, that button can change to logout and the card will change to user details or a new page. 
- Need to figure out how to store the user's password unhashed password locally. Otherwise could have a verify_password endpoint for users to input before going to the account details page then we can just update it.
- 1 global CSS file is probably better than 1 global and then 1 additonal file for each page. Since each page looks more or less the same.

---
### EXTRA NOTES
- I did way too much in a single commit, commit 4 I think. Did account page, login functionalies, token storage, logut etc. Should've been split into 3 commits. 
- Should probably not include const url = "..." in each file. Production would use a .env file like Python. Since the URL is local, it's fine, but usually would hide it if it's deployed.

### ABBREVIATIONS
HTML: Hyper Text Markup Language

CSS: Cascading Style Sheets