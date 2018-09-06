import Board from './Board';
import Player from './Player';

class Game {
	constructor(helpers) {
		this._helpers = helpers;
	}

	newGame(depth = -1, startingPlayer = 1) { // Starts a new game with a certain depth and a startingPlayer of 1 if human is going to start
		const board = document.getElementById('board'); // eslint-disable-line
		const newBoard = new Board(['', '', '', '', '', '', '', '', '']);
		const player = new Player(parseInt(depth));
		const starting = parseInt(startingPlayer);
		const	maximizing = starting;
		let	playerTurn = starting;

		board.className = '';
		board.innerHTML = '<div class="cell-0"></div><div class="cell-1"></div><div class="cell-2"></div><div class="cell-3"></div><div class="cell-4"></div><div class="cell-5"></div><div class="cell-6"></div><div class="cell-7"></div><div class="cell-8"></div>';

		const htmlCells = [...board.children];

		if (!starting) {
			const centerAndCorners = [0, 2, 4, 6, 8];
			const firstChoice = centerAndCorners[Math.floor(Math.random() * centerAndCorners.length)];

			playerTurn = this._implementMove(firstChoice, '', !maximizing, newBoard, htmlCells, 1);
		}

		newBoard.state.forEach((cell, index) => {
			htmlCells[index].addEventListener('click', () => {
				if (this._helpers.hasClass(htmlCells[index], 'x') || this._helpers.hasClass(htmlCells[index], 'o') || newBoard.isTerminal() || !playerTurn) {
					return false;
				}
				playerTurn = this._implementMove(index, 'You won!', maximizing, newBoard, htmlCells, 0);

				player.getBestMove(newBoard, !maximizing, best => {
					playerTurn = this._implementMove(best, 'You lost!', !maximizing, newBoard, htmlCells, 1);
				});
			}, false);

			if (cell) {
				this._helpers.addClass(htmlCells[index], cell);
			}
		});
	}

  /* private methods */
	_implementMove(position, message, maximizing, newBoard, htmlCells, playerTurn) {
		const playerSymbol = maximizing ? 'x' : 'o';

		newBoard.insert(playerSymbol, position);
		this._helpers.addClass(htmlCells[position], playerSymbol);
		if (message && newBoard.isTerminal()) { // If it's a terminal move and it's not a draw, then human won
			const { winner } = newBoard.isTerminal();

			if (winner !== 'draw') {
				console.log(message); // eslint-disable-line
			}
			this._helpers.drawWinningLine(newBoard.isTerminal());
		}
		return playerTurn; // Switch turns
	}
}

export default Game;
