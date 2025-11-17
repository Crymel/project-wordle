import React from "react";

function Guesses({ guesses }) {
	return (
		<div class="guess-results">
			{guesses.map((guess, id) => (
				<p class="guess" key={id}>
					{guess.map((char) => (
						<span class={`cell ${char.status}`} key={char.key}>
							{char.value}
						</span>
					))}
				</p>
			))}
		</div>
	);
}

export default Guesses;
