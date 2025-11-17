import React from "react";

function Guesses({ guesses }) {
	return (
		<div className="guess-results">
			{guesses.map(({ value, key }) => (
				<p className="guess" key={key}>
					{value.map((char) => (
						<span className={`cell ${char.status}`} key={char.key}>
							{char.value}
						</span>
					))}
				</p>
			))}
		</div>
	);
}

export default Guesses;
