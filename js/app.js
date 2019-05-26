// const cards = [
// 	'fa-diamond',
// 	'fa-paper-plane-o',
// 	'fa-anchor',
// 	'fa-bolt',
// 	'fa-cube',
// 	'fa-anchor',
// 	'fa-leaf',
// 	'fa-bicycle',
// 	'fa-diamond',
// 	'fa-bomb',
// 	'fa-leaf',
// 	'fa-bomb',
// 	'fa-bolt',
// 	'fa-bicycle',
// 	'fa-paper-plane-o',
// 	'fa-cube'
// ];

let cards = [
	{ id: 'card-1_a', name: 'fa-diamond', isOpen: false, isMatched: false },
	{ id: 'card-2_a', name: 'fa-paper-plane-o', isOpen: false, isMatched: false },
	{ id: 'card-3_a', name: 'fa-anchor', isOpen: false, isMatched: false },
	{ id: 'card-4_a', name: 'fa-bolt', isOpen: false, isMatched: false },
	{ id: 'card-5_a', name: 'fa-cube', isOpen: false, isMatched: false },
	{ id: 'card-6_a', name: 'fa-leaf', isOpen: false, isMatched: false },
	{ id: 'card-7_a', name: 'fa-bicycle', isOpen: false, isMatched: false },
	{ id: 'card-8_a', name: 'fa-bomb', isOpen: false, isMatched: false },
	{ id: 'card-1_b', name: 'fa-diamond', isOpen: false, isMatched: false },
	{ id: 'card-2_b', name: 'fa-paper-plane-o', isOpen: false, isMatched: false },
	{ id: 'card-3_b', name: 'fa-anchor', isOpen: false, isMatched: false },
	{ id: 'card-4_b', name: 'fa-bolt', isOpen: false, isMatched: false },
	{ id: 'card-5_b', name: 'fa-cube', isOpen: false, isMatched: false },
	{ id: 'card-6_b', name: 'fa-leaf', isOpen: false, isMatched: false },
	{ id: 'card-7_b', name: 'fa-bicycle', isOpen: false, isMatched: false },
	{ id: 'card-8_b', name: 'fa-bomb', isOpen: false, isMatched: false }
];

const deck = document.querySelector('.section-deck__grid');
const cardOpen = 'card__open';
const cardClose = 'card__close';
const cardMatch = 'card__match';
const cardWrong = 'card__wrong';

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
	cards = shuffle(cards);

	//default all cards to begining
	setDefaultCardState(cards);

	//Add new cards
	addCardsToDeck(cards);
}

function removeOldDeck() {
	deck.textContent = '';
}

function setDefaultCardState(cards) {
	for (let i = 0; i < cards.length; i++) {
		cards[i].isOpen = false;
		cards[i].isMatched = false;
	}
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

//card clicking method
deck.addEventListener('click', function(event) {
	if (event.target.classList.contains('card')) {
		let card = event.target;
		// card.classList.add(cardOpen);
		openCard(card);
	}
});

function openCard(selectedCard) {
	let cardClasses = selectedCard.classList;
	// Use spread operator to concert DOMTokenList to array. Alternatively, use DOMTokenList.contains method
	let cardID = calculateCardID([...cardClasses]);

	// cards.find((card, index) => {
	// 	if (card.id == cardID) {
	// 		if (!card.isOpen) {
	// 			cards[index].isOpen = true;
	// 			return true;
	// 		}
	// 	}
	// });

	// card.classList.add(cardOpen);
}

function calculateCardID(cardClasses) {
	let cardID;
	for (let i = 0; i < cardClasses.length; i++) {
		if (cardClasses[i].includes('card-')) {
			cardID = cardClasses[i];
			return cardID;
		}
	}
	return '';
}

function isAlreadyOpen(cardID) {}

//last count check
//card open logic
//card match logic
