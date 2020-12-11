import axios from 'axios';

export const fetchQuestions = () => async(dispatch, getState) => {
    const response = await axios.get('https://opentdb.com/api.php?amount=10&category=9&type=multiple');
    dispatch({ type: 'FETCH_QUESTIONS', payload: response.data.results });
}