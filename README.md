<h1 align="center">PokéDrafts</h1>
<h2 align="center">A customized deck builder app for the Pokémon Trading Card Game.</h2>
<h3 align="center">Built for the 100Devs 100 Hours Project</h3>


This app aims to accomplish the following:

SERVER-SIDE
1. Utilize MVC architecture to organize all server-side code. --COMPLETED
2. Enable Google Authentication for user logins. --COMPLETED
3. Ensure that each user has access to their own individual deck. --COMPLETED
4. Connect each user's deck to a separate database (MongoDB).
5. Arrange the user's deck as an object on MongoDB.
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
6. Add a card counter on the Deck panel.
7. Show how much of each card is in a deck.

DECK RULES
1. A completed deck must have exactly 60 cards.
2. A deck cannot exceed 60 cards.
3. No more than 4 of each card can be added to a deck, with the exception of energy cards.


FUTURE GOALS
1. Allow users to manage more than one deck.
2. Allow users to toggle their decks as public or private.
3. If a deck is made public, allow other users to view them.
4. Render a limited number of files initially, and have the carousel render more as it goes on.
5. Provide an option for users to sort the deck in various ways.
6. Enable more avenues of authentication

MISC
1. Card object on mongoDB should appear as the following:

deck {  
--card 1:  
----id: 35346346  
----img: 354345345  
----createdAt: Date  
----createdBy: Name  
--card 2:  
----id: 35346346  
----img: 354345345  
----createdAt: Date  
----createdBy: Name   
--card 3:  
----id: 35346346  
----img: 354345345  
----createdAt: Date  
----createdBy: Name   
}


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
<a href="https://github.com/ec-coding/Pkmn-TCG-Deck-Builder">App Link</a>
