<p align="center">
<img src="https://github.com/ec-coding/PokeDrafts/blob/main/public/css/pokedrafts.png" width="50%">
</p>
<h2 align="center">A customized deck builder app for the Pokémon Trading Card Game.</h2>
<p align="center">
<img src="https://www.kindpng.com/picc/m/368-3683364_custom-banner-pokemon-starters-never-forget-hd-png.png" width="50%">
</p>
<h3 align="center">Built for the 100Devs 100-Hours Project</h3>
<p align="center">
  <a href="" target="_blank">
    <h3 align="center">Access the App <a target="_blank" href="http://pokedrafts.herokuapp.com/">Here</a></h3>
  </a>
</p>

## How It's Made:

**Tech used:** <img src="https://img.shields.io/static/v1?label=|&message=EJS&color=cbb148&style=plastic&logo=ejs">
    <img src="https://img.shields.io/static/v1?label=|&message=CSS3&color=285f65&style=plastic&logo=css3"/>
    <img src="https://img.shields.io/static/v1?label=|&message=JAVASCRIPT&color=3c7f5d&style=plastic&logo=javascript"/>
    <img src="https://img.shields.io/static/v1?label=|&message=NODE.JS&color=cdf998&style=plastic&logo=node.js"/>	
    <img src="https://img.shields.io/static/v1?label=|&message=MONGO-DB&color=cdd148&style=plastic&logo=mongodb"/>
    <img src="https://img.shields.io/static/v1?label=|&message=EXPRESS&color=bbb111&style=plastic&logo=express"/>

## Optimizations

- I plan to implement the following features over time:
  - Allow users to manage more than one deck.
  - Allow users to toggle their decks as public or private.
  - If a deck is made public, allow other users to view them.
  - Render a limited number of files initially, and have the carousel render more as it goes on.
  - Provide an option for users to sort the deck in various ways.
  - Enable more avenues of authentication
  - Show how much of each card is in a deck.
  - When a user is typing in the name of a card, have the search bar offer suggestions.
  - Highlight the button of whichever tab is active.
  - No more than 4 of each card can be added to a deck, with the exception of energy cards.

## Lessons Learned:

Building this app has allowed me to learn and exercise a variety of different coding paradigms, such as MVC architecture, Google authentication, and CRUD operations.

## Completed Goals:

- The following features have been sucessfully implemented in the app:
  - Utilize MVC architecture to organize all server-side code. --COMPLETED
  - Enable Google Authentication for user logins. --COMPLETED
  - Ensure that each user has access to their own individual deck. --COMPLETED
  - Arrange the user's deck as an object on MongoDB. --COMPLETED
  - Successfully deploy app on Heroku. --COMPLETED
  - Establish dynamic carousels to accommodate all card results. --COMPLETED
  - Create tab views for Search, Search Results, and Deck. --COMPLETED
  - When a user deletes a card, remove the slide it is on as well. --COMPLETED
  - When the user hits the submit button on Card Search, switch the tab to Search Results. --COMPLETED
  - Add radio inputs for Pokemon Type and Card Type. --COMPLETED
  - Add checkbox inputs for Card Set. --COMPLETED
  - Add a card counter on the Deck panel. --COMPLETED
  - A completed deck must have exactly 60 cards. --COMPLETED
  - A deck cannot exceed 60 cards. --COMPLETED
  - How do you add information from an API's dataset to your own database? --COMPLETED
  - How do you connect a user's ID to a card they added into the database? --COMPLETED
  - How can I remove a user's entire deck without affecting the cards in another user's deck? --COMPLETED
  
  
## Project Logs:
    
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

9/19/2022
1. Finally fixed the issue with a user not being able to delete individual cards from their deeck without having to reload the page.
  - .at(-1) was added to the card variable, and returned as the json response, since that was the last card added to the deck db.
  - This is then returned to the front-end's fetch request, and subsequently rendered on the HTML.

9/20/2022
1. Added 3 new card sets onto the UI: Team Rocket, Gym Heroes, and Gym Challenge.
  
</tr>
</table>
