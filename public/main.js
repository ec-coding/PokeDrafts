document.querySelector('#search-button').addEventListener('click', getCards)
formatCards()

function getCards() {
    
    const nameInput = document.querySelector('#name-search').value
    const url = `https://api.pokemontcg.io/v2/cards/?`

    const typeInputColorless = document.querySelector('#colorless').checked
    const typeInputPsychic = document.querySelector('#psychic').checked
    const typeInputWater = document.querySelector('#water').checked
    const typeInputFire = document.querySelector('#fire').checked
    const typeInputGrass = document.querySelector('#grass').checked
    const typeInputLightning = document.querySelector('#lightning').checked
    const typeInputFighting = document.querySelector('#fighting').checked

    let supertypeInput = ''
    let subtypeInput = ''
    let subtypeParam = ''

    if (typeInputColorless == true) {
        typeInput = document.querySelector('#colorless').value
    } else if (typeInputPsychic == true) {
        typeInput = document.querySelector('#psychic').value
    } else if (typeInputWater == true) {
        typeInput = document.querySelector('#water').value
    } else if (typeInputFire == true) {
        typeInput = document.querySelector('#fire').value
    } else if (typeInputGrass == true) {
        typeInput = document.querySelector('#grass').value
    } else if (typeInputLightning == true) {
        typeInput = document.querySelector('#lightning').value
    } else if (typeInputFighting == true) {
        typeInput = document.querySelector('#fighting').value
    } else {
        typeInput = ''
    }

    const supertypeInputPokemon = document.querySelector('#card-type-pokemon').checked
    const supertypeInputTrainer = document.querySelector('#card-type-trainer').checked
    const supertypeInputEnergy = document.querySelector('#card-type-energy').checked

    if (supertypeInputPokemon == true) {
        supertypeInput = document.querySelector('#card-type-pokemon').value
    } else if (supertypeInputTrainer == true) {
        supertypeInput = document.querySelector('#card-type-trainer').value
    } else if (supertypeInputEnergy == true) {
        supertypeInput = document.querySelector('#card-type-energy').value
    }

    const subtypeInputBase = document.querySelector('#base').checked
    const subtypeInputJungle = document.querySelector('#jungle').checked
    const subtypeInputFossil = document.querySelector('#fossil').checked

    if (subtypeInputBase == true) {
        subtypeInput = document.querySelector('#base').value
        subtypeParam += ` set.id:base1 OR`
    }
    if (subtypeInputJungle == true) {
        subtypeInput = document.querySelector('#jungle').value
        subtypeParam += ` set.id:base2 OR`
    }
    if (subtypeInputFossil == true) {
        subtypeInput = document.querySelector('#fossil').value
        subtypeParam += ` set.id:base3 OR`
    }
    if (subtypeParam == '') {
        subtypeParam = ` (set.id:base1 OR set.id:base2 OR set.id:base3)`
    } else {
        subtypeParam = subtypeParam.slice(0, -2)
    }

    fetchURLText = url + `page=1&pageSize=20&orderBy=set&q=`
    if (nameInput != '') {
        fetchURLText += ` name:${nameInput}`
    }
    if (typeInput != '') {
        fetchURLText += ` types:${typeInput}`
    }
    if (supertypeInput != '') {
        fetchURLText += ` supertype:${supertypeInput}`
    }
    if (subtypeParam != '') {
        fetchURLText += subtypeParam
    }

    console.log(fetchURLText)

    fetch(fetchURLText, {
        headers: {
            "X-Api-Key": "9aac7fc4-dfb9-41eb-ab2f-f30e2976bd08"
        }
    })
        .then(res => res.json())
        .then(responseData => {
            console.log(responseData)

            const cardContainer = document.querySelector('#card-container .search-slider')
            cardContainer.innerText = ''
            for (var i = 0; i < responseData.data.length; i++) {
                const newCard = document.createElement('li')
                const newCardImg = document.createElement('img')
                newCard.setAttribute('class', 'search-card search-slide slide');
                newCardImg.setAttribute('class', 'card-img');
                newCardImg.src = responseData.data[i].images.small
                newCardImg.dataset.name = newCard.innerText
                cardContainer.appendChild(newCard)
                newCard.appendChild(newCardImg)
                formatSearchCards()
                formatCards()
                newCardImg.addEventListener('click', addCardToDB)
            }

            //Clones a card onto the deck and has its image persist upon reloading.
            async function addCardToDB(event) {
                event.currentTarget;
                let cardName = event.currentTarget.dataset.name
                let img = event.currentTarget
                let selectedCard = {
                    'categories': ['deck'],
                    'name': cardName,
                    'value': img.src
                }
                fetch('/cards', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(selectedCard)
                })
                    .then((response) => response.json())
                    .then(data => {
                        formatCards()
                        // add card AFTER saved to DB
                        createCardReplica(data.insertedId, selectedCard)
                    })
            }
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
}

function createCardReplica(id, selectedCard) {
    console.log('Card added to deck')
    const deckContainer = document.querySelector('#deck-container .deck-slider')
    const newDeckCard = document.createElement('li')
    const newDeckCardImg = document.createElement('img')
    newDeckCardImg.src = selectedCard.value
    // The below does not work because it is not called by an event handler.
    // newDeckCardImg.src = event.currentTarget.src
    newDeckCard.setAttribute('class', 'deck-card deck-slide slide')
    newDeckCardImg.dataset.id = id
    newDeckCard.appendChild(newDeckCardImg)
    deckContainer.appendChild(newDeckCard)
    newDeckCardImg.addEventListener('click', deleteCardFromDB)
}

document.querySelectorAll('.deck-card').forEach(card => card.addEventListener('click', deleteCardFromDB))

//This function removes a card from the deck if you click it, but only after the page has been reloaded after adding said card.
async function deleteCardFromDB(event) {
    console.log('Card Deleted')
    const deletedCard = event.currentTarget;
    let deckCardID = event.currentTarget.dataset.id
    let deckCardName = event.currentTarget.dataset.name
    let deckCardImg = event.currentTarget
    let selectedDeckCard = {
        'id': deckCardID,
        'categories': ['deck'],
        'name': deckCardName,
        'value': deckCardImg.src
    }
    fetch('/delete-single-card', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedDeckCard)
    })

        //Find out how to delete a card from the deck if you click it immediately after adding it to the deck
        .then(res => {
            if (res.ok) {
                deletedCard.remove()
                maxSlide -= 1
                goToNextCard()
                return res
            }
        })
    // .then(res => {
    //     window.location.reload()
    // }) 
}

const deleteButton = document.querySelector('#delete-deck-button')

deleteButton.addEventListener('click', _ => {
    fetch('/delete-all-cards', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        //You don't need to send a body, you just need to send a delete request.
    })
        .then(res => {
            if (res.ok) {
                // document.querySelectorAll('.deck-card').forEach((res) => {
                //     res.currentTarget.remove()
                // })
                return res
            }
        })
        .then(data => {
            window.location.reload()
        })
})


// SEARCH RESULT SLIDERS

function formatSearchCards() {
    const searchSlides = document.querySelectorAll(".search-slide");

    searchSlides.forEach((slide, indx) => {
        slide.style.transform = `translateX(${indx * 100}%)`;
    });

// Why was all of the below put into a function?
// Loop through slides and set each slide's translateX property to index * 100%
searchSlides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${indx * 100}%)`;
});

// Current slide counter
let curSearchSlide = 0;

// Select next slide button
const nextSearchSlide = document.querySelector(".search-btn-next");

//Add event listener and navigation functionality
nextSearchSlide.addEventListener("click", goToNextSearchCard);

function goToNextSearchCard() {
    //Check if current slide is the last and reset current slide
    if (curSearchSlide == maxSearchSlide) {
        curSearchSlide = 0;
    } else {
        curSearchSlide++;
    }

    // Move slide by -100%
    searchSlides.forEach((slide, indx) => {
        slide.style.transform = `translateX(${100 * (indx - curSearchSlide)}%)`
    });
}

// Select prev slide button
const prevSearchSlide = document.querySelector(".search-btn-prev")

// Add event listener and navigation functionality
prevSearchSlide.addEventListener("click", function () {
    // Check if current slide is the first and reset current slide to last
    if (curSearchSlide === 0) {
        curSearchSlide = maxSearchSlide;
    } else {
        curSearchSlide--;
    }

    // Move slide by 100%
    searchSlides.forEach((slide, indx) => {
        slide.style.transform = `translateX(${100 * (indx - curSearchSlide)}%)`
    });
});

// Maximum number of slides
let maxSearchSlide = searchSlides.length - 1;
}


// DECK SLIDERS

function formatCards() {
    const slides = document.querySelectorAll(".deck-slide");

    slides.forEach((slide, indx) => {
        slide.style.transform = `translateX(${indx * 100}%)`;
    });

// Loop through slides and set each slide's translateX property to index * 100%
slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${indx * 100}%)`;
});

// Current slide counter
let curSlide = 0;

// Select next slide button
const nextSlide = document.querySelector(".deck-btn-next");

//Add event listener and navigation functionality
nextSlide.addEventListener("click", goToNextCard);

function goToNextCard() {
    //Check if current slide is the last and reset current slide
    if (curSlide == maxSlide) {
        curSlide = 0;
    } else {
        curSlide++;
    }

    // Move slide by -100%
    slides.forEach((slide, indx) => {
        slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`
    });
}

// Select prev slide button
const prevSlide = document.querySelector(".deck-btn-prev")

// Add event listener and navigation functionality
prevSlide.addEventListener("click", function () {
    // Check if current slide is the first and reset current slide to last
    if (curSlide === 0) {
        curSlide = maxSlide;
    } else {
        curSlide--;
    }

    // Move slide by 100%
    slides.forEach((slide, indx) => {
        slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`
    });
});

// Maximum number of slides
let maxSlide = slides.length - 1;
}

const slides = document.querySelectorAll(".deck-slide");

slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${indx * 100}%)`;
});

// Current slide counter
let curSlide = 0;

function goToNextCard() {
    //Check if current slide is the last and reset current slide
    if (curSlide == maxSlide) {
        curSlide = 0;
    } else {
        curSlide++;
    }

    // Move slide by -100%
    slides.forEach((slide, indx) => {
        slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`
    });
}

// Maximum number of slides
let maxSlide = slides.length - 1;

// Hide slider arrows if there are no cards to display

// when you add a card to the deck, maybe create an empty slide first, go to it, and then have the card appear?
