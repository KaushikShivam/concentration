//Global Variables

const deck = document.querySelector('.section-deck__grid');
const counter = document.querySelector('.counter');
let attempts = 0;

const cardOpen = 'card__open';
const cardClose = 'card__close';
const cardMatch = 'card__match';
const cardWrong = 'card__wrong';

let openCards = [];

/*
 * Create a list that holds all of your cards
 */
let cards = [
	{ id: 'card-1_a', name: 'fa-diamond', isMatched: false },
	{ id: 'card-2_a', name: 'fa-paper-plane-o', isMatched: false },
	{ id: 'card-3_a', name: 'fa-anchor', isMatched: false },
	{ id: 'card-4_a', name: 'fa-bolt', isMatched: false },
	{ id: 'card-5_a', name: 'fa-cube', isMatched: false },
	{ id: 'card-6_a', name: 'fa-leaf', isMatched: false },
	{ id: 'card-7_a', name: 'fa-bicycle', isMatched: false },
	{ id: 'card-8_a', name: 'fa-bomb', isMatched: false },
	{ id: 'card-1_b', name: 'fa-diamond', isMatched: false },
	{ id: 'card-2_b', name: 'fa-paper-plane-o', isMatched: false },
	{ id: 'card-3_b', name: 'fa-anchor', isMatched: false },
	{ id: 'card-4_b', name: 'fa-bolt', isMatched: false },
	{ id: 'card-5_b', name: 'fa-cube', isMatched: false },
	{ id: 'card-6_b', name: 'fa-leaf', isMatched: false },
	{ id: 'card-7_b', name: 'fa-bicycle', isMatched: false },
	{ id: 'card-8_b', name: 'fa-bomb', isMatched: false }
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function addCardsToDeck(cards) {
	const domFragment = document.createDocumentFragment();
	for (let i = 0; i < cards.length; i++) {
		const card = document.createElement('div');
		card.classList.add('card');
		card.classList.add(cards[i].id);

		const icon = document.createElement('i');
		icon.classList.add(`fa`, `${cards[i].name}`);
		card.appendChild(icon);

		domFragment.appendChild(card);
	}
	deck.appendChild(domFragment);
}

/*
 * Start a new game
 *   - Remove the previous game state
 *   - restart the game with new state
 */

//TODO: should run when the browser loads as well as retarting
function startGame() {
	//Have to remove previous cards
	removeOldDeck();
	//default all cards to begining
	setDefaultCardState(cards);
	//Shuffle cards
	cards = shuffle(cards);
	//Add new cards
	addCardsToDeck(cards);
}

function removeOldDeck() {
	deck.textContent = '';
}

function setDefaultCardState(cards) {
	for (let i = 0; i < cards.length; i++) {
		cards[i].isMatched = false;
	}
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//set up the event listener for a card. If a card is clicked:
deck.addEventListener('click', function(event) {
	if (event.target.classList.contains('card')) {
		let card = event.target;
		//let cardID = extractCardID()
		if (!card.classList.contains(cardMatch)) {
			openCard(card);
			addOpenCardToList(card);
			handleCardMatching(card);
		}

		if (isGameOver()) {
			//show a pop up
			//make a pop up in css and invoke it here
			//start a game
			// pop up should have the option to start the game
		}
	}
});

//display the card's symbol
function openCard(card) {
	card.classList.remove(cardClose);
	card.classList.add(cardOpen);
}

//add the card to a *list* of "open" cards
function addOpenCardToList(card) {
	openCards.push(card);
}

//if the list already has another card, check to see if the two cards match
function handleCardMatching() {
	//if the list already has another card
	if (openCards.length > 1) {
		matchCards(openCards);
	}
}

function matchCards(cardsToMatch) {
	const oldCard = cardsToMatch[0];
	const newCard = cardsToMatch[1];

	const oldCardID = extractCardID(oldCard);
	const newCardID = extractCardID(newCard);

	//Matching ID prefix (ex: card-1)
	const matchID = newCardID.split('_')[0];

	if (oldCardID.includes(matchID) && newCardID.includes(matchID)) {
		//they are a match
		updateMatchedCards(oldCard, newCard);
	} else {
		removeUnmatchedCards(oldCard, newCard);
	}
	updateAttemptCounter();
}

function extractCardID(card) {
	// Using spread operator to concert DOMTokenList to array. Alternatively, use DOMTokenList.contains method
	const cardClasses = [...card.classList];

	let cardID;
	for (let i = 0; i < cardClasses.length; i++) {
		if (cardClasses[i].includes('card-')) {
			cardID = cardClasses[i];
			return cardID;
		}
	}
	return '';
}

function removeUnmatchedCards(oldCard, newCard) {
	oldCard.classList.add(cardWrong);
	newCard.classList.add(cardWrong);

	setTimeout(() => {
		oldCard.classList.remove(cardWrong);
		newCard.classList.remove(cardWrong);
		oldCard.classList.add(cardClose);
		newCard.classList.add(cardClose);

		openCards.length = 0;
	}, 500);
}

function updateMatchedCards(oldCard, newCard) {
	//update dom
	oldCard.classList.add(cardMatch);
	newCard.classList.add(cardMatch);

	//update data source
	updateCardsDataSource(oldCard);
	updateCardsDataSource(newCard);

	//set open cards to default
	openCards.length = 0;
}

function updateCardsDataSource(card) {
	const cardID = extractCardID(card);
	for (let i = 0; i < cards.length; i++) {
		if (cards[i].id === cardID && cards[i].isMatched === false) {
			cards[i].isMatched = true;
			return;
		}
	}
}

function updateAttemptCounter() {
	attempts += 1;
	counter.textContent = `Attempts: ${attempts}`;
}

function isGameOver() {
	return cards.every(card => {
		return card.isMatched;
	});
}
