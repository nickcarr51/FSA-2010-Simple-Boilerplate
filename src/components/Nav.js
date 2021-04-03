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
          <h3>Home</h3>
        </Link>
      </li>
      <li
      className={
        props.location.pathname === '/campuses' ? 'selected':undefined
      }>
        <Link to='/campuses'>
          <h3>Campuses</h3>
        </Link>
      </li>
      <li
      className={
        props.location.pathname === '/students' ? 'selected':undefined
      }>
        <Link to='/students'>
          <h3>Students</h3>
        </Link>
      </li>
    </ul>
  )
}

export default Nav
