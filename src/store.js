import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunk from 'redux-thunk';

const intialState = {
  campuses: [],
  students:[]
}

const FETCH_CAMPUSES = 'FETCH_CAMPUSES';
const LOAD_CAMPUSES = 'LOAD_CAMPUSES';

const loadCampuses = (campuses) => {
  return {
    type: LOAD_CAMPUSES,
    campuses
  }
}

export const fetchCampuses = () => {
  return async(dispatch) => {
    const campuses = (await axios.get('/api/allCampuses')).data;
    dispatch(loadCampuses(campuses));
  }
}

const reducer = (state = intialState, action) => {
  if (action.type === LOAD_CAMPUSES) {
    const campuses = action.campuses
    return {...state, campuses}
  }

  return state
}

export default createStore(
  reducer,
  applyMiddleware(thunk, loggingMiddleware)
);
