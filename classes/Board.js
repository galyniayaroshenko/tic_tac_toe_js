class Board { // This class represents the board, contains methods that checks board state, insert a playerSymbol, etc..
	constructor(state = ['', '', '', '', '', '', '', '', '']) {
		this.state = state; // array representing the state of the board
	}

	insert(playerSymbol, position) {
		if (position > 8 || this.state[position]) {
			return false;
		}
		this.state[position] = playerSymbol;

		return true;
	}

	getAvailableMoves() { // Returns an array containing available moves for the current state
		const moves = [];

		this.state.forEach((cell, index) => {
			if (!cell) {
				moves.push(index);
			}
		});

		return moves;
	}

	isTerminal() { // Checks if a player wins or the board is full with no winner, return {Object} an object containing the winner, direction of winning and row number
		if (this._isEmpty()) {
			return false;
		}

		/* Checking Horizontal Wins */
		if (this.state[0] === this.state[1] && this.state[0] === this.state[2] && this.state[0]) {
			return {'winner': this.state[0], 'direction': 'H', 'row': 1};
		}
		if (this.state[3] === this.state[4] && this.state[3] === this.state[5] && this.state[3]) {
			return {'winner': this.state[3], 'direction': 'H', 'row': 2};
		}
		if (this.state[6] === this.state[7] && this.state[6] === this.state[8] && this.state[6]) {
			return {'winner': this.state[6], 'direction': 'H', 'row': 3};
		}

		/* Checking Vertical Wins */
		if (this.state[0] === this.state[3] && this.state[0] === this.state[6] && this.state[0]) {
			return {'winner': this.state[0], 'direction': 'V', 'row': 1};
		}
		if (this.state[1] === this.state[4] && this.state[1] === this.state[7] && this.state[1]) {
			return {'winner': this.state[1], 'direction': 'V', 'row': 2};
		}
		if (this.state[2] === this.state[5] && this.state[2] === this.state[8] && this.state[2]) {
			return {'winner': this.state[2], 'direction': 'V', 'row': 3};
		}

		/* Checking Diagonal Wins */
		if (this.state[0] === this.state[4] && this.state[0] === this.state[8] && this.state[0]) {
			return {'winner': this.state[0], 'direction': 'D', 'row': 1};
		}
		if (this.state[2] === this.state[4] && this.state[2] === this.state[6] && this.state[2]) {
			return {'winner': this.state[2], 'direction': 'D', 'row': 2};
		}

		if (this._isFull()) {
			return {'winner': 'draw'};
		}

		return false;
	}

	/* private methods */
	_isEmpty() {
		return this.state.every(cell => !cell);
	}

	_isFull() {
		return this.state.every(cell => cell);
	}
}

export default Board;
