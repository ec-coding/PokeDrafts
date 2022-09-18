<p align="center">
<img src="https://github.com/ec-coding/PokeDrafts/blob/main/public/css/pokedrafts.png" width="50%">
</p>
<h2 align="center">A customized deck builder app for the Pokémon Trading Card Game.</h2>
<h3 align="center">Built for the 100Devs 100 Hours Project</h3>
<p align="center">
  <a href="http://pokedrafts.herokuapp.com/" target="_blank">
    <img src="https://img.shields.io/static/v1?label=|&message=WEBSITE&color=23555f&style=plastic&logo=react&logo-color=white"/>
  </a>
</p>

<p align="left">
This app aims to accomplish the following:

SERVER-SIDE
1. Utilize MVC architecture to organize all server-side code. --COMPLETED
2. Enable Google Authentication for user logins. --COMPLETED
3. Ensure that each user has access to their own individual deck. --COMPLETED
4. Connect each user's deck to a separate database (MongoDB).
5. Arrange the user's deck as an object on MongoDB. --COMPLETED
6. Successfully deploy app on Heroku. --COMPLETED
          
FRONT-END
1. Create customizable decks for each user.
2. Establish dynamic carousels to accommodate all card results.
3. Create tab views for Search, Search Results, and Deck. --COMPLETED

UI
1. Highlight the button of whichever tab is active.
2. When a user deletes a card, remove the slide it is on as well. --50% COMPLETE
3. When the user hits the submit button on Card Search, switch the tab to Search Results. --COMPLETED
4. Add radio inputs for Pokemon Type and Card Type. --COMPLETED
5. Add checkbox inputs for Card Set. --COMPLETED
6. Add a card counter on the Deck panel. --COMPLETED
7. Show how much of each card is in a deck.
8. When a user is typing in the name of a card, have the search bar offer suggestions.

DECK RULES
1. A completed deck must have exactly 60 cards. --COMPLETED
2. A deck cannot exceed 60 cards. --COMPLETED
3. No more than 4 of each card can be added to a deck, with the exception of energy cards.


FUTURE GOALS
1. Allow users to manage more than one deck.
2. Allow users to toggle their decks as public or private.
3. If a deck is made public, allow other users to view them.
4. Render a limited number of files initially, and have the carousel render more as it goes on.
5. Provide an option for users to sort the deck in various ways.
6. Enable more avenues of authentication

CHALLENGES:
1. How do you add information from an API's dataset to your own database? --COMPLETED
2. How do you connect a user's ID to a card they added into the database? --COMPLETED
3. How can I remove a user's entire deck without affecting the cards in another user's deck? --COMPLETED


LOGS:
9/10/2022
1. Restructured server-side code to include controllers.
2. Renamed router directories to better relate to their functions.
3. Enabled object name displays on mongoDB by linking it from the front-end code.
4. Fixed user first name display on the profile page.
5. Connected user ID's to each card that is added to the deck.
6. Fixed redirects when re-loading the site as current user. (/decks -> /profile in /middleware/auth.js)


9/11/2022
1. Delete Deck button now only deletes individual user's deck, and not everyone's deck

9/12/2022
1. Implemented Card Counter to show how many cards exist in each user's deck.
2. Implemented dynamic counter to update card count number each time user adds a card to their deck.
3. Enabled single card deletion to also update the card counter appropriately.
4. Blocks users from adding cards to their deck once the card counter has reached 60.

9/15/2022
1. Added update bar on Search Results to show the names of cards added to the user's deck.

9/16/2022
1. Added update bar on Deck to show the names of cards deleted from the user's deck. 
(This was done by adding data-name="<%= cards[i].name %>" to the deck-slide li on Decks.ejs)

9/17/2022
1. Converted Cards schema into Deck schema, which organizes a user's added cards into their own individual deck on mongoDB
</p>
