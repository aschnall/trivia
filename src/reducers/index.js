import { combineReducers } from 'redux';

const questionReducer = (state=[], action) => {
    switch(action.type) {
        case 'FETCH_QUESTIONS':
            return action.payload.map((question) => {
                const formattedQuestions = {
                    question: question.question
                }
                const answerChoices = [...question.incorrect_answers];
                formattedQuestions.answer = Math.floor(Math.random() * 3);
                answerChoices.splice(formattedQuestions.answer, 0, question.correct_answer);
                formattedQuestions.choices = [];
                answerChoices.forEach((choice, index) => {
                    formattedQuestions.choices.push(choice);
                })
                return formattedQuestions;
            });
        default:
            return state;
    }
};

export default combineReducers({questionReducer});