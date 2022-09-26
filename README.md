<p align="center">
<img src="https://github.com/ec-coding/PokeDrafts/blob/main/public/css/pokedrafts.png" width="50%">
</p>
<h2 align="center">A customized deck builder app for the Pokémon Trading Card Game.</h2>
<p align="center">
<img src="https://www.kindpng.com/picc/m/368-3683364_custom-banner-pokemon-starters-never-forget-hd-png.png" width="50%">
</p>
<h3 align="center">Built for the 100Devs 100-Hours Project</h3>
<p align="center">
    <h3 align="center">Access the App <a href="http://pokedrafts.herokuapp.com/" target="blank">Here</a></h3>
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
