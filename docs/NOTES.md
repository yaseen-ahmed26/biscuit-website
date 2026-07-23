# Project Notes

This is some personal notes based off the project.

[Version 1](#version-1): June 30th, 2026 - July 20th, 2026

[Version 2](#version-2): July 23rd, 2026 - //

## Version 1
### 1. Fixed Issues and Challenges
1. **Cross Origin Resource Sharing (CORS)**: This is a browser security method that blocks a webpage from requestsing data from a different domain that isn't itself. To fix, the API (FastAPI) must allow and send the correct CORS headers. If you didn't own the API, you'd have to use a proxy server which is a middle man.

2. **422 Unprocessable Entity in createUser**: Wasn't matching my schemas. It's defined specifically as email, username and password but I wasn't changing it so when JavaScript sent it, it default to the variable names (which was registerEmailField, for example. It was registerEmailField = "user@example.com", instead of email = "user@example.com")

3. **Race Conditions**: Previously, I was trying to update thw account page with data from index.html. Because account.js was being ran by index.js first, it was finding all the elements. Because index.html does not have say an element with an ID of 'email-label' it caused an issue. Then it redirected. To fix, store the user data (the data returned when we login) in localstorage, then let account.js do its thing.

4. **Changing Pages**: Was trying to change the window after setting that window up, which reset the page back to default and JavaScript had to run again. Because it reset, this time it did not have the user data so it threw an error.

5. **Remember to parse localstorage items**: Got a 422 error when updating the user information because I forgot to parse userData inside localstorage. So user_id was undefined.

6. **UserUpdate payload**: This payload didn't match the Pydantic schema at all. First of all, I never set current_password = currentPassword. So Pydantic saw it as currentPassword = value whereas the schemas use snake_case and so filtered it out. Secondly, the order was wrong. Username should've came first then email, Pydantic mistook email as being the username which messed everything up.

---
### 2. Design Notes
- Could probably have a "Already have an account?" message on the register card. Though there is the login button on the top so maybe it's not needed.
- Default card would be register. User can click the top right button to log in. Once logged in, that button can change to logout and the card will change to user details or a new page. 
- Need to figure out how to store the user's password unhashed password locally. Otherwise could have a verify_password endpoint for users to input before going to the account details page then we can just update it.
- 1 global CSS file is probably better than 1 global and then 1 additonal file for each page. Since each page looks more or less the same.

---
### 3. Extra Notes
- I did way too much in a single commit, commit 4 I think. Did account page, login functionalies, token storage, logut etc. Should've been split into 3 commits. 
- Should probably not include const url = "..." in each file. ~~Production would use a .env file like Python. Since the URL is local, it's fine, but usually would hide it if it's deployed.~~ JavaScript does not have env files.
- Eventually, access tokens would need to be stored in http cookies, rather than localstorage. JavaScript cannot read http cookies so it's better security against malicious scripts.

## Version 2
### 1. Fixed Issues and Challenges
1. **Infinite refresh recursion**: The issue was that we need to catch any 401 due to invalid tokes to get a new refresh token. If we then fail to get a new access token, it will call the request again casuing infinite recursion. The solution was to have a bool that we flip. Initally the bool is false because we don't need to retry. Then if we get a 401, and the refresh endpoint returns success, try the request again. If that request gives a 401, then we know the backend send no and we logut the user.

2. **Double JSON Parsing**: Was parsing the HTTP request response multiple times, and it can only be done once. The solution was just to do it at the end of the function and only look out for 401 response codes.

## LEARNING
### 1. Tools
**JavaScript**: The 'brain' of the website. Makes the page dynamic and responsive.

**HTML***: The 'skeleton' of the website. Defines the page elements.

**CSS***: The 'clothing' of the website. Controls how the website looks.

---
### 2. Abbreviations
HTML: Hyper Text Markup Language

CSS: Cascading Style Sheets