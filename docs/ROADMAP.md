# v2 Roadmap
Rough roadmap of features I would like to implement and how I will.

---

#### Quick Overview
**[ ]** = To-do | **[x]** = Complete | **[?]** Under Consideration | **[/]** = In Progress

- [ ] Leaderboards
- [ ] Shareable game stats via link
- [ ] Profile page
- [?] Connected sessions page
- [ ] Rate limiting for updating lifetime saves
- [?] Unique toast notifications or models
- [/] Improved api.js structure and factoring for refresh tokens

---

#### Implementation
- **leaderboards**

call an endpoint to get the data

keep it simple, just top 10 users

all we need to return is lifetime stats and username

could have auto update, every 1m

- **share game stats by link**

make a share.html page
that share.html uses query params for the unique link
will just be the player’s username since every username is unique
share?id=yaseen

backend probably needs a get_save_by_user endpoint with that query param

allow the user to cancel out the link

- **combine some pages**

could have 1 profile page that displays username, join date, games connected

then have a settings page like we do now

- **connections, display connect accounts and their device/country**

ties into the refresh tokens from above

- **unique popup rather than native window alert**

custom modal popup similar to Godot

this can either be a modal or toast notifications

leaning towards modal simply because godot has one so it'll match

---

SMALL STUFF

- **display join time**

- **limit how many times the user can refresh their lifetime data**

essentially prevent spamming, could add rate limiting to the backend or just do it on the frontend (disable the button)

- **redirect to game stats when linking**

- **clear password fields when they do not match when registering**