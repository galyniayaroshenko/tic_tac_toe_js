import Game from './classes/Game';
import Helpers from './classes/Helpers';

import './style.scss';

document.addEventListener('DOMContentLoaded', () => { // eslint-disable-line
	const depth = -1;
	const helpers = new Helpers();
	const game = new Game(helpers);
	let startingPlayer = 1;

	game.newGame(depth, startingPlayer);
	document.getElementById('starting-player').addEventListener('click', event => { // eslint-disable-line
		const startingPlayerChoices = [...document.getElementById('starting-player').children[0].children]; // eslint-disable-line

		if (event.target.tagName !== 'LI' || helpers.hasClass(event.target, 'active')) {
			return;
		}
		startingPlayerChoices.forEach(choice => {
			helpers.removeClass(choice, 'active');
		});
		helpers.addClass(event.target, 'active');
		startingPlayer = event.target.dataset.value;
	}, false);

	document.getElementById('newgame').addEventListener('click', () => { // eslint-disable-line
		game.newGame(depth, startingPlayer);
	});
});
