# Project Notes

This is some personal notes based off the project.

### TO DO:
- Game dashboard. This will be a seperate HTML page.
- User account details card. Could also be a seperate page? Only the core content will change so maybe it's not needed. Seperation of concerns may be better though.
- Better cover image

---
### TOOLS
**JavaScript**: The 'brain' of the website. Makes the page dynamic and responsive.

**HTML***: The 'skeleton' of the website. Defines the page elements.

**CSS***: The 'clothing' of the website. Controls how the website looks.

### (FIXED) ISSUES
1. Cross Origin Resource Sharing (CORS)
This is a browser security method that blocks a webpage from requestsing data from a different domain that isn't itself. To fix, the API (FastAPI) must allow and send the correct CORS headers. If you didn't own the API, you'd have to use a proxy server which is a middle man.

2. 422 Unprocessable Entity in createUser
Wasn't matching my schemas. It's defined specifically as email, username and password but I wasn't changing it so when JavaScript sent it, it default to the variable names (which was registerEmailField, for example. It was registerEmailField = "user@example.com", instead of email = "user@example.com")

### DESIGN NOTES
- Could probably have a "Already have an account?" message on the register card. Though there is the login button on the top so maybe it's not needed.
- Default card would be register. User can click the top right button to log in. Once logged in, that button can change to logout and the card will change to user details or a new page. 

### ABBREVIATIONS
HTML: Hyper Text Markup Language

CSS: Cascading Style Sheets