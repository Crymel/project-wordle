import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import Input from "../Input/Input";
import Guesses from "../Guesses/Guesses";
import { NUM_OF_GUESSES_ALLOWED, WORD_LENGTH } from "../../constants";
import { checkGuess } from "../../game-helpers";

// Pick a random word on every pageload.
let answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
	const generateStartArray = () => {
		const startArray = [];

		for (let i = 0; i < NUM_OF_GUESSES_ALLOWED; i++) {
			const emptyWordArray = [];

			for (let j = 0; j < WORD_LENGTH; j++) {
				emptyWordArray.push({
					value: "",
					id: crypto.randomUUID(),
					status: "",
				});
			}
			startArray.push(emptyWordArray);
		}

		return startArray;
	};

	const [guesses, setGuesses] = React.useState(generateStartArray());
	const [guessAmount, setGuessAmount] = React.useState(0);
	const [gameState, setGameState] = React.useState("PLAY");

	function addGuess(guess) {
		if (guessAmount >= NUM_OF_GUESSES_ALLOWED) {
			window.alert("No guesses left :(");
			return;
		}
		if (guess.length !== WORD_LENGTH) {
			window.alert("Invalid Guess");
			return;
		}

		const wordCheck = checkGuess(guess, answer);

		const newGuesses = guesses;
		for (let i = 0; i < guess.length; i++) {
			newGuesses[guessAmount][i].value = guess[i];
			newGuesses[guessAmount][i].status = wordCheck[i].status;
		}
		setGuesses(newGuesses);
		setGuessAmount(guessAmount + 1);

		if (guess === answer) {
			setGameState("WIN");
		} else if (guessAmount >= NUM_OF_GUESSES_ALLOWED - 1) {
			setGameState("LOSE");
		}
	}

	function reset() {
		answer = sample(WORDS);
		setGuesses(generateStartArray());
		setGuessAmount(0);
		setGameState("PLAY");
		console.info({ answer });
	}

	return (
		<div>
			<button onClick={() => reset()}>Reset</button>
			<Guesses guesses={guesses} />
			<Input addGuess={addGuess} disabled={gameState !== "PLAY"} />
			{gameState === "WIN" && (
				<div class="happy banner">
					<p>
						<strong>Congratulations!</strong> Got it in
						<strong>
							{" "}
							{guessAmount} guess{guessAmount > 1 ? "es" : ""}
						</strong>
						.
					</p>
				</div>
			)}
			{gameState === "LOSE" && (
				<div class="sad banner">
					<p>
						Sorry, the correct answer is <strong>{answer}</strong>.
					</p>
				</div>
			)}
		</div>
	);
}

export default Game;
