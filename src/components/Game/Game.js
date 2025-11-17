import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import Input from "../Input/Input";
import Guesses from "../Guesses/Guesses";
import { NUM_OF_GUESSES_ALLOWED, WORD_LENGTH } from "../../constants";
import { checkGuess } from "../../game-helpers";

function Game() {
	const generateStartArray = () => {
		const startArray = [];

		for (let i = 0; i < NUM_OF_GUESSES_ALLOWED; i++) {
			const emptyWordArray = { value: [], key: crypto.randomUUID() };

			for (let j = 0; j < WORD_LENGTH; j++) {
				emptyWordArray.value.push({
					value: "",
					key: crypto.randomUUID(),
					status: "",
				});
			}
			startArray.push(emptyWordArray);
		}

		return startArray;
	};

	const [answer, setAnswer] = React.useState(sample(WORDS));
	const [guesses, setGuesses] = React.useState(generateStartArray());
	const [guessAmount, setGuessAmount] = React.useState(0);
	const [gameState, setGameState] = React.useState("PLAY");

	// To make debugging easier, we'll log the solution in the console.
	console.info({ answer });

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
			newGuesses[guessAmount].value[i].value = guess[i];
			newGuesses[guessAmount].value[i].status = wordCheck[i].status;
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
		setAnswer(sample(WORDS));
		setGuesses(generateStartArray());
		setGuessAmount(0);
		setGameState("PLAY");
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
