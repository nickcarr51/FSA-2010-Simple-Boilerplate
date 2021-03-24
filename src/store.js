import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunk from 'redux-thunk';

const intialState = {
  campuses: [],
  students:[],
  selectedCampus: {},
  selectedStudent: {}
}

const LOAD_CAMPUSES = 'LOAD_CAMPUSES';
const LOAD_STUDENTS = 'LOAD_STUDENTS';
const SELECT_CAMPUS = 'SELECT_CAMPUS';
const SELECT_STUDENT = 'SELECT_STUDENT';

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

const _selectCampus = (selectedCampus) => {
  return {
    type: SELECT_CAMPUS,
    selectedCampus
  }
}

export const selectCampus = (selectedCampusId) => {
  return async(dispatch) => {
    const selectedCampus = (await axios.get(`/api/campuses/${selectedCampusId}`)).data;
    dispatch(_selectCampus(selectedCampus));
  }
}

const _selectStudent = (selectedStudent) => {
  return {
    type: SELECT_STUDENT,
    selectedStudent
  }
}

export const selectStudent = (selectedStudentId) => {
  return async(dispatch) => {
    const selectedStudent = (await axios.get(`/api/students/${selectedStudentId}`)).data;
    dispatch(_selectStudent(selectedStudent));
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
  else if (action.type === SELECT_CAMPUS) {
    const selectedCampus = action.selectedCampus
    return {...state, selectedCampus}
  }
  else if (action.type === SELECT_STUDENT) {
    const selectedStudent = action.selectedStudent
    return {...state, selectedStudent}
  }

  return state
}

export default createStore(
  reducer,
  applyMiddleware(thunk, loggingMiddleware)
);
