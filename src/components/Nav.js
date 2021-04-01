import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Nav = (props) => {
  return (
    <div id='nav'>
      <Link
      to='/'
      className={
        props.location.pathname === '/' ? 'selected':undefined
      }>
        <h1>Home</h1>
      </Link>
      <Link
      to='/campuses'
      className={
        props.location.pathname === '/campuses' ? 'selected':undefined
      }>
        <h1>Campuses</h1>
      </Link>
      <Link
      to='/students'
      className={
        props.location.pathname === '/students' ? 'selected':undefined
      }>
        <h1>Students</h1>
      </Link>
    </div>
  )
}

export default Nav
