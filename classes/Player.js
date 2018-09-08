import Board from './Board';

class Player {
	constructor(maxDepth = -1) {
		this._maxDepth = maxDepth; // limits the depth of searching
		this._nodesMap = new Map(); // stores the heuristic values for each possible move
	}
	/**
	 * Uses minimax algorithm to get the best move
	 * @param {Object} board - an instant of the board class
	 * @param {Boolean} maximizing - whether the player is a maximizing or a minimizing player
	 * @param {Function} callback - a function to run after the best move calculation is done
	 * @param {Number} depth - used internally in the function to increment the depth each recursive call
	 * @return {Number} the index of the best move
	 */
	getBestMove(board, maximizing = true, callback = () => {}, depth = 0) { // eslint-disable-line
		if (depth === 0) { // clear nodesMap if the function is called for a new move
			this._nodesMap.clear();
		}
		if (board.isTerminal() || depth === this._maxDepth) { // If the board state is a terminal one, return the heuristic value
			if (board.isTerminal().winner === 'x') {
				return 100 - depth;
			} else // eslint-disable-line
			if (board.isTerminal().winner === 'o') {
				return -100 + depth;
			}
			return 0;
		}

		return maximizing ? this._maximizing(board, callback, depth, -100, 'x', false) : this._maximizing(board, callback, depth, 100, 'o', true);
	}

	/* private */
	_maximizing(board, callback, depth, possibleValue, playerSymbol, maximizingTurn) {
		let best = possibleValue; // Initializ best to the lowest possible value

		board.getAvailableMoves().forEach(index => { // Loop through all empty cells
			const child = new Board(board.state.slice()); // Initialize a new board with the current state (slice() is used to create a new array and not modify the original)

			child.insert(playerSymbol, index); // Create a child node by inserting the maximizing symbol x into the current emoty cell
			const nodeValue = this.getBestMove(child, maximizingTurn, callback, depth + 1); // Recursively calling getBestMove this time with the new board and minimizing turn and incrementing the depth

			best = maximizingTurn ? Math.min(best, nodeValue) : Math.max(best, nodeValue); // Updating best value
			if (depth === 0) { // If it's the main function call, not a recursive one, map each heuristic value with it's moves indicies
				const moves = this._nodesMap.has(nodeValue) ? `${this._nodesMap.get(nodeValue)},${index}` : index; // Comma seperated indicies if multiple moves have the same heuristic value

				this._nodesMap.set(nodeValue, moves);
			}
		});

		if (depth === 0) { // If it's the main call, return the index of the best move or a random index if multiple indicies have the same value
			let ret;

			if (typeof this._nodesMap.get(best) === 'string') {
				const arr = this._nodesMap.get(best).split(',');
				const rand = Math.floor(Math.random() * arr.length);

				ret = arr[rand];
			} else {
				ret = this._nodesMap.get(best);
			}
			callback(ret); // run a callback after calculation and return the index

			return ret;
		}

		return best; // If not main call (recursive) return the heuristic value for next calculation
	}
}

export default Player;
