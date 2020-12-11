import React, {useRef} from 'react';
import NextQuestion from './NextQuestion';
import '../style/App.scss';

const QuestionDisplay = ({questions, next, select, onCorrect, questionIndex, length, onAnswerSelect}) => {
	const refs = useRef([]);

	//looping through answer choices and checking them against the user's selected choice
	const checkAnswer = event => {
		let refIndex = 0;
		for (let i = 0; i < refs.current.length; i++) {
			if (event.target.textContent === refs.current[i].textContent) {
				refIndex = i;
				break;
			}
		}
		const answerIndex = questions[questionIndex].answer;
		if (event.target.textContent === questions[questionIndex].choices[answerIndex]) {
			refs.current[answerIndex].classList.add("choice-correct");
			onCorrect();
		}
		else {
			//need to find index of the event.target.textcontent ref - loop through refs
			refs.current[refIndex].classList.add("choice-incorrect");
			refs.current[answerIndex].classList.add("choice-correct");
		}
		onAnswerSelect();
	}
	
	const prevent = event => {
		event.preventDefault();
	}

	const choices = questions[questionIndex].choices.map((choice, index) => {
		return (
			<button 
				dangerouslySetInnerHTML={{__html:choice}}
				className="choice"
				key={index}
				ref={el => refs.current.push(el)} 
				onClick={select ? prevent : checkAnswer}
			>
			</button>
		);
	})

	return (
		<div className="container">
			<strong>Question: {questionIndex + 1} of {length}</strong>
			<div className="question-display">
				<div className="question-text">
					<h1 dangerouslySetInnerHTML={{__html:questions[questionIndex].question}}></h1>
				</div>
				<div className="choice-wrapper">
					{choices}
				</div>
			</div>
			<div className="next">
				{select ? <NextQuestion next={next} questionIndex={questionIndex} length={length-1} /> : ''}
			</div>
		</div>
	);
}

export default QuestionDisplay;


