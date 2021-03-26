import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunk from 'redux-thunk';

const intialState = {
  campuses: [],
  students:[],
  selectedCampus: {},
  selectedStudent: {},
  newCampus: {},
  newStudent: {}
}

const LOAD_CAMPUSES = 'LOAD_CAMPUSES';
const LOAD_STUDENTS = 'LOAD_STUDENTS';
const SELECT_CAMPUS = 'SELECT_CAMPUS';
const SELECT_STUDENT = 'SELECT_STUDENT';
const ADD_CAMPUS = 'ADD_CAMPUS';
const ADD_STUDENT = 'ADD_STUDENT';

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

const _addCampus = (newCampus) => {
  return {
    type: ADD_CAMPUS,
    newCampus
  }
}

export const addCampus = (campus) => {
  return async(dispatch) => {
    const newCampus = (await axios.post('/api/campuses/new',campus)).data;
    dispatch(_addCampus(newCampus));
  }
}

const _addStudent = (newStudent) => {
  return {
    type: ADD_STUDENT,
    newStudent
  }
}

export const addStudent = (student) => {
  return async(dispatch) => {
    const newStudent = (await axios.post('/api/students/new',student)).data;
    dispatch(_addStudent(newStudent));
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
  else if (action.type === ADD_CAMPUS) {
    const newCampus = action.newCampus
    state.campuses.push(newCampus)
    return { ...state, newCampus}
  }
  else if (action.type === ADD_STUDENT) {
    const newStudent = action.newStudent
    state.students.push(newStudent)
    return { ...state, newStudent}
  }

  return state
}

export default createStore(
  reducer,
  applyMiddleware(thunk, loggingMiddleware)
);
