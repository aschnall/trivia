import React from 'react';

const NextQuestion = ({next, questionIndex, length}) => {

	//display the next button after user selects an answer
	//if on last question, button will display with text of 'finish' rather than 'next question'
	return (
		questionIndex === length ? 
			<button onClick={next}>Finish</button> :
			<button onClick={next} >
				Next Question
			</button> 

	);
}

export default NextQuestion;