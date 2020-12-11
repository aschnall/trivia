import React, { Component } from 'react';
import { connect } from 'react-redux';

import StartMenu from './components/StartMenu';
import QuestionDisplay from './components/QuestionDisplay';
import {fetchQuestions } from './actions';

class App extends Component {
	state = {
		start: false,
		select: false,
		questionIndex: 0,
		gameOver: false,
		score: 0
	};

	componentDidMount() {
		this.props.fetchQuestions();
	}

	startGame = () => {
		this.setState({start: true});
	}

	onAnswerSelect = () => {
		this.setState({select: true})
	}

	// setting up the next question - if last quetsion has been reached reset the game
	nextQuestion = () => {
		this.setState({questionIndex: this.state.questionIndex + 1});
		const buttons = document.getElementsByTagName('button');
		for (let i = 0; i < buttons.length; i++) {
			if (buttons[i].classList.contains('choice-correct')) {
				buttons[i].classList.remove('choice-correct')
			} else if (buttons[i].classList.contains('choice-incorrect')) {
				buttons[i].classList.remove('choice-incorrect')
			}
		}
		if (this.state.questionIndex < this.props.questions.length - 1) {
			this.setState({select: false});
		} else {
			this.props.fetchQuestions();
			this.setState({
				gameOver: true,
				start: false,
				select: false,
				questionIndex: 0
			})
		}
	}

	incrementScore = () => {
		this.setState({score: this.state.score + 1});
	}

	render() {
		const { select, start, questionIndex, gameOver, score } = this.state;
		const { questions } = this.props;
		return (
			start ? 
				<QuestionDisplay 
					questions={questions}
					next={this.nextQuestion} 
					select={select} 
					onCorrect={this.incrementScore}
					questionIndex={questionIndex}
					length={questions.length}
					onAnswerSelect={this.onAnswerSelect}
				/> : 
				<StartMenu 
					gameOver={gameOver} 
					score={score}
					total={questions.length}
					fetch={fetchQuestions}
					startGame={this.startGame}
				/>
		);
	}
}

const mapStateToProps = state => {
	return { questions: state.questionReducer }
}

export default connect(mapStateToProps, {fetchQuestions})(App);




