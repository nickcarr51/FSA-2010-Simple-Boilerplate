import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Nav = (props) => {
  return (
    <ul id='nav'>
      <li
      className={
        props.location.pathname === '/' ? 'selected':undefined
      }>
        <Link to='/'>
          <h1>Home</h1>
        </Link>
      </li>
      <li
      className={
        props.location.pathname === '/campuses' ? 'selected':undefined
      }>
        <Link to='/campuses'>
          <h1>Campuses</h1>
        </Link>
      </li>
      <li
      className={
        props.location.pathname === '/students' ? 'selected':undefined
      }>
        <Link to='/students'>
          <h1>Students</h1>
        </Link>
      </li>
    </ul>
  )
}

export default Nav
