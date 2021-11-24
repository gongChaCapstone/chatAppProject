import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Home = props => {
  const {firstname} = props

  return (
    <div>
      <h3>Welcome, {firstname}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    firstname: state.auth.firstname
  }
}

export default connect(mapState)(Home)
