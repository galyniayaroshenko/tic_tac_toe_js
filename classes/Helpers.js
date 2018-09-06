class Helpers {
	hasClass(el, className) {
		if (el.classList) {
			return el.classList.contains(className);
		} else { // eslint-disable-line
			return !!el.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
		}
	}

	addClass(el, className) {
		if (el.classList) {
			el.classList.add(className);
		} else
		if (!this.hasClass(el, className)) {
			el.className += `${el.className} ${className}`;
		}
	}

	removeClass(el, className) {
		if (el.classList) {
			el.classList.remove(className);
		} else
		if (this.hasClass(el, className)) {
			const reg = new RegExp(`(\\s|^)${className}(\\s|$)`);

			el.className = el.className.replace(reg, ' ');
		}
	}

	drawWinningLine({ direction, row }) {
		const board = document.getElementById('board'); // eslint-disable-line

		board.className = `${direction}${row}`;
		setTimeout(() => { board.className += ' full'; }, 50); // eslint-disable-line
	}
}

export default Helpers;
