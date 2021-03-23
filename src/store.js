import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunk from 'redux-thunk';

const intialState = {
  campuses: [],
  students:[]
}

const LOAD_CAMPUSES = 'LOAD_CAMPUSES';
const LOAD_STUDENTS = 'LOAD_STUDENTS';

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

const loadStudents = (students) => {
  return {
    type: LOAD_STUDENTS,
    students
  }
}

export const fetchStudents = () => {
  return async(dispatch) => {
    const students = await (await axios.get('/api/allStudents')).data;
    dispatch(loadStudents(students));
  }
}

const reducer = (state = intialState, action) => {
  if (action.type === LOAD_CAMPUSES) {
    const campuses = action.campuses
    return {...state, campuses}
  }
  else if (action.type === LOAD_STUDENTS) {
    const students = action.students
    return {...state, students}
  }

  return state
}

export default createStore(
  reducer,
  applyMiddleware(thunk, loggingMiddleware)
);
