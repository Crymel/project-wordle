import React from "react";
import { WORD_LENGTH } from "../../constants";

function Input({ addGuess, disabled }) {
	const [guessInput, setGuessInput] = React.useState("");

	function submitInput() {
		if (guessInput.length !== WORD_LENGTH) {
			window.alert("invalid guess");
			return;
		}
		addGuess(guessInput);
		setGuessInput("");
	}
	return (
		<form
			className="guess-input-wrapper"
			onSubmit={(event) => {
				event.preventDefault();
				submitInput();
			}}>
			<label htmlFor="guess-input">Enter guess:</label>
			<input
				id="guess-input"
				type="text"
				value={guessInput}
				pattern={`[A-Z]{${WORD_LENGTH}}`}
				maxLength={WORD_LENGTH}
				onChange={(event) => {
					setGuessInput(event.target.value.toUpperCase());
				}}
				disabled={disabled}
			/>
		</form>
	);
}

export default Input;
