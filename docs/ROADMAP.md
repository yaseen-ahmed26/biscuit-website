# v2 Roadmap
Rough roadmap of features I would like to implement and how I will.

Note that the future features on the README were not final.

---

#### Quick Overview
**[ ]** = To-do | **[✓]** = Complete | **[?]** Under Consideration | **[/]** = In Progress

- [✓] Leaderboards
- [ ] Shareable game stats via link
- [?] Profile page
- ~~[ ] Connected sessions page~~
- [ ] Rate limiting for updating lifetime saves
- [?] Unique toast notifications or models
- [✓] Improved api.js structure and factoring for refresh tokens
- [✓] Store access tokens in httponly cookie storage rather than localstorage
- [✓] Automatic login
- [ ] Hide leaderboards/game stats page if not linked
- [ ] Web components

No longer doing a connected sessions page. The project isn't deployed yet so the only way I can get the user's country is the language. Works fine for Godot game linking because it's short and quick but I would prefer to do it the professional way and use IP lookups from Render or similar for a security feature like sessions.

---

#### Implementation

FEATURES

1. **Leaderboards**
- Backend must have an endpoint to retrieve top users.
- For now, keep it top 10 users.
- Should only be 1 leaderboard for now, with support for query paramaters for different types.
    - For now, simply display lifetime biscuits and the top 5.
- Can have it auto update, every 1 minute.


2. **Share game stats by link**
- We would need a share.html page.
    - URL needs quer paramaters, such as share?user=chicken
- Backend needs a GET save_by_username endpoint.
- QoL feature to allow the user to cancel out the link, or set it as private.
- Use the user's username for now, simpler and more standard.
- Could also have a link with a unique ID, that lasts 7 days or so. But this requires a new database table so probably not worth it.

3. **Combine some pages**
- 1 profile page with tabs. One for account details and another for delete account. Also another for general stats like join page and games connected.

4. ~~**Connections, display connect accounts and their device/country**~~

5. **Unique modals to replace native alert**
- Custom modal popup similar to Godot.
- This can either be a modal or toast notifications.
    - Modals match Godot, so more cross flow friendly.
    - However toast notifications are easier and less intrusive. Since the user probably won't spend much time on the website, forcing them to click 'okay' every few seconds would be annoying.

6. **Hide leaderboards if not linked**
- Don't show leaderboards and game stats page if the user hasn't connected their account. 
- Database would need a is_linked, which JavaScript can use to hide.
- ~~Could also hide link game page once linked.~~
    - This defeats the purpose of online saving, if you want to cross progress.

7. **Web components**
- Reduce duplication with HTML structure with web componets.
- Start off with navigation bar, one layout.js file.

---

SMALL STUFF

1. **Display join time**
- Add to the planned profile page.
- If not, could add to the description of account details, though this makes less sense.

2. **Redirect to game stats when linking**
- Add window.replace() to code.js.

3. **Clear password fields when they do not match when registering**
- Add to register.js.