import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunk from 'redux-thunk';

const SHOW_ALL = 'SHOW_ALL';
const SHOW_UNREGISTERED_STUDENTS = 'SHOW_UNREGISTERED_STUDENTS';
const SHOW_EMPTY_CAMPUSES = 'SHOW_EMPTY_CAMPUSES'

const BY_GPA = 'BY_GPA';
const BY_LASTNAME = 'BY_LASTNAME';
const BY_NUM_OF_STUDENTS = 'BY_NUM_OF_STUDENTS';

const intialState = {
  campuses: [],
  students:[],
  selectedCampus: {},
  selectedStudent: {},
  newCampus: {},
  newStudent: {},
  visibilityFilter: '',
  sortBy: '',
  campusesOnPage: [],
  studentsOnPage: []
}


const LOAD_CAMPUSES = 'LOAD_CAMPUSES';
const LOAD_STUDENTS = 'LOAD_STUDENTS';
const SELECT_CAMPUS = 'SELECT_CAMPUS';
const SELECT_STUDENT = 'SELECT_STUDENT';
const ADD_CAMPUS = 'ADD_CAMPUS';
const ADD_STUDENT = 'ADD_STUDENT';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const UNREGISTER_STUDENT = 'UNREGISTER_STUDENT';
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
const SORT_BY = 'SORT_BY';
const NAVIGATE_PAGE = 'NAVIGATE_PAGE';

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

const _deleteCampus = (campus) => {
  return {
    type: DELETE_CAMPUS,
    campus
  }
}

export const deleteCampus = (campus) => {
  return async(dispatch) => {
    await axios.delete(`/api/campuses/${campus.id}`);
    dispatch(_deleteCampus(campus));
  }
}

const _deleteStudent = (student) => {
  return {
    type: DELETE_STUDENT,
    student
  }
}

export const deleteStudent = (student) => {
  return async(dispatch) => {
    await axios.delete(`/api/students/${student.id}`);
    dispatch(_deleteStudent(student));
  }
}

const _updateCampus = (selectedCampus) => {
  return {
    type: UPDATE_CAMPUS,
    selectedCampus
  }
}

export const updateCampus = (selectedCampus, history) => {
  return async(dispatch) => {
    const updatedCampus = (await axios.put(`/api/campuses/${selectedCampus.id}`,selectedCampus)).data;
    dispatch(_updateCampus(selectedCampus));
    history.push(`/campuses/${selectedCampus.id}`)
  }
}

const _updateStudent = (selectedStudent) => {
  return {
    type: UPDATE_STUDENT,
    selectedStudent
  }
}

export const updateStudent = (selectedStudent, history) => {
  return async(dispatch) => {
    const updatedStudent = (await axios.put(`/api/students/${selectedStudent.id}`,selectedStudent)).data;
    dispatch(_updateStudent(updatedStudent));
    history.push(`/students/${updatedStudent.id}`)
  }
}

const _unregisterStudent = (selectedStudent) => {
  return {
    type: UNREGISTER_STUDENT,
    selectedStudent
  }
}

export const unregisterStudent = (selectedStudent) => {
  return async(dispatch) => {
    const unregisteredStudent = (await axios.put(`/api/students/${selectedStudent.id}`,selectedStudent)).data;
    dispatch(_unregisterStudent(unregisteredStudent));
    // history.push(`/campuses/${selectedCampus.id}`)
  }
}

export const setVisibility = (text) => {
  return {
    type: SET_VISIBILITY_FILTER,
    text
  }
}

export const sortBy = (text) => {
  return {
    type: SORT_BY,
    text
  }
}

export const navigatePage = (pageId, pageType) => {
  return {
    type: NAVIGATE_PAGE,
    pageId,
    pageType
  }
}

// export const setCurrentPage = (pageId, pageType) => {
//   return async(dispatch) => {
//     const campusesOnPage = await axios.get(`/api/campuses?page=${pageId}`).data
//     dispatch(navigatePage(pageId,pageType))
//   }
// }

const reducer = (state = intialState, action) => {
  if (action.type === LOAD_CAMPUSES) {
    const campuses = action.campuses.map((each) => {
      return { ...each, show: true}
    })
    return {...state, campuses}
  }
  else if (action.type === LOAD_STUDENTS) {
    const students = action.students.map((each) => {
      return {...each, show:true}
    })
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
    state.campusesOnPage.push(newCampus)
    return { ...state, newCampus}
  }
  else if (action.type === ADD_STUDENT) {
    const newStudent = action.newStudent
    state.students.push(newStudent)
    state.studentsOnPage.push(newStudent)
    return { ...state, newStudent}
  }
  else if (action.type === DELETE_CAMPUS) {
    const campuses = state.campuses.filter((campus) => {
      return campus.id !== action.campus.id
    });
    const campusesOnPage = state.campusesOnPage.filter((campus) => {
      return campus.id !== action.campus.id
    });
    return {...state, campuses, campusesOnPage}
  }
  else if (action.type === DELETE_STUDENT) {
    const students = state.students.filter((student) => {
      return student.id !== action.student.id
    });
    const studentsOnPage = state.studentsOnPage.filter((student) => {
      return student.id !== action.student.id
    });
    return {...state, students, studentsOnPage}
  }
  else if (action.type === UPDATE_CAMPUS) {
    const selectedCampus = action.selectedCampus;
    const campuses = state.campuses.map((each) => {
      if (each.id === selectedCampus.id) {
        return selectedCampus
      } else {
        return each
      }
    })
    return {...state, campuses, selectedCampus}
  }
  else if (action.type === UPDATE_STUDENT || action.type === UNREGISTER_STUDENT) {
    const selectedStudent = action.selectedStudent;
    const students = state.students.map((each) => {
      if (each.id === selectedStudent.id) {
        return selectedStudent
      } else {
        return each
      }
    })
    return { ...state, students, selectedStudent}
  }
  else if (action.type === SET_VISIBILITY_FILTER) {
    if (action.text === SHOW_EMPTY_CAMPUSES) {
      const campuses = [...state.campuses].map((each) => {
        if (each.students !== undefined && each.students.length > 0) {
          return { ... each, show: false}
        } else {
          return each
        }
      }).filter((elem) => {
        return elem.show !== false
      })
      return {...state, campuses, visibilityFilter: action.text}
    } else if (action.text === SHOW_ALL) {
      const campuses = [...state.campuses].map((each) => {
        return {...each, show: true}
      })
      const students = [...state.students].map((each) => {
        return { ...each, show:true}
      })
      return {...state, campuses, students, visibilityFilter: action.text}
    } else if (action.text === SHOW_UNREGISTERED_STUDENTS) {
      const students = [...state.students].map((each) => {
        if (each.campusId !== null) {
          return { ...each, show: false}
        } else {
          return each
        }
      }).filter((elem) => {
        return elem.show !== false
      })
      return {...state, students, visibilityFilter: action.text}
    }
  }
  else if (action.type === SORT_BY) {
    if (action.text === BY_GPA) {
      let uniqueCheck = [];
      const students = state.students.map((each)=> {
        return each.gpa
      }).sort().map((each)=> {
        const toUse = state.students.find((elem) => {
          return elem.gpa === each && !uniqueCheck.includes(elem.id)
        })
        uniqueCheck.push(toUse.id)
        return toUse
      })
      return { ...state, students, sortBy:action.text}
    } else if (action.text === BY_LASTNAME) {
      let uniqueCheck = [];
      const students = state.students.map((each)=> {
        return each.lastName
      }).sort().map((each)=> {
        const toUse = state.students.find((elem) => {
          return elem.lastName === each && !uniqueCheck.includes(elem.id)
        })
        uniqueCheck.push(toUse.id)
        return toUse
      })
      return { ...state, students, sortBy:action.text}
    } else if (action.text === BY_NUM_OF_STUDENTS) {
      let uniqueCheck = [];
      const campusesOnPage = state.campusesOnPage.map((each)=> {
        if (each.students && each.students.length > 0) {
          return each.students.length
        } else {
          return 0
        }
      }).sort().map((each)=> {
        const toUse = state.campusesOnPage.find((elem) => {
            return elem.students.length === each && !uniqueCheck.includes(elem.name)
        })
        if (toUse !== undefined) {
          uniqueCheck.push(toUse.name)
        }
        return toUse //need to fix when undefined is returned (1 campus is currently missing)
      })
      return { ...state, campusesOnPage, sortBy:action.text}
    }
  }
  else if (action.type === NAVIGATE_PAGE) {
    if (action.pageType === 'campuses') {
      const campusesOnPage = state.campuses.filter((elem,idx) => {
        if (action.pageId > 1) {
          return idx > (action.pageId*1 - 1)*10 && idx <= action.pageId * 10
        } else {
          return idx <= 10
        }
      })
      return { ...state, campusesOnPage}
    } else if (action.pageType === 'students') {
      const studentsOnPage = state.students.filter((elem,idx) => {
        if (action.pageId > 1) {
          return idx > (action.pageId*1 - 1)*10 && idx <= action.pageId * 10
        } else {
          return idx <= 9
        }
      })
      return { ...state, studentsOnPage}
    }
  }

  return state
}

export default createStore(
  reducer,
  applyMiddleware(thunk, loggingMiddleware)
);
