const cards = [
	'fa-diamond',
	'fa-paper-plane-o',
	'fa-anchor',
	'fa-bolt',
	'fa-cube',
	'fa-anchor',
	'fa-leaf',
	'fa-bicycle',
	'fa-diamond',
	'fa-bomb',
	'fa-leaf',
	'fa-bomb',
	'fa-bolt',
	'fa-bicycle',
	'fa-paper-plane-o',
	'fa-cube'
];

let shuffledCards;

//Shuffles the cards
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

//TODO: should run when the browser loads as well as retartings
function startGame() {
	//Have to remove previous cards
	removeOldDeck();

	//Shuffle cards
	shuffledCards = shuffle(cards);
	//Add new cards
	addCardsToDeck(shuffledCards);
	// console.log(shuffledCards);
}

function removeOldDeck() {
	const deck = document.querySelector('.section-deck__grid');
	deck.textContent = '';
}

function addCardsToDeck(cards) {
	const deckGrid = document.querySelector('.section-deck__grid');
	const domFragment = document.createDocumentFragment();
	for (var i = 0; i < cards.length; i++) {
		const card = document.createElement('div');
		card.classList.add('card');
		const icon = document.createElement('i');
		icon.classList.add(`fa`, `${cards[i]}`);
		card.appendChild(icon);
		domFragment.appendChild(card);
	}
	deckGrid.appendChild(domFragment);
}
