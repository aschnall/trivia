import React from 'react';

const StartMenu = ({gameOver, score, total, startGame}) => {

//if gameOver is true display user's score and giving them the option to restart the game
//if false display the initial main menu with title and option to start the game
	return (
		gameOver ? 
			<div className="menu-end">
				<div className="score">
					<h2>You scored {score}/{total}</h2>
				</div>
				<div className="restart">
					<button onClick={startGame}>Play Again?</button>
				</div>
			</div> :
			<div className="menu">
				<div className="heading">
					<h1>General Knowledge Trivia</h1>
				</div>
				<div className="start">
					<button onClick={startGame}>Start</button>
				</div>
			</div>
	);
};

export default StartMenu;