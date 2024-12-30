import React from 'react'
import './HomeContent.css'
import ContentTable from './ContentTable'

const HomeContent = ({users}) => {
  const formattedUsers = Array.isArray(users) ? users : [users];
  return (
    <>
      <div className='content-header'>
        <h2 className='user-welcome'>Welcome, <span className='details-span'>{users.firstName} {users.lastName}</span></h2>
        <p className='user-balance'>Your current balance: <span className='details-span'>{users.balance}</span></p>
      </div>
      <hr />
      <div className='split-container-content'>
        <div className='content-table'><ContentTable users = {formattedUsers}/></div>
        <div className='side-image-container'></div>
      </div>
    </>
  )
}

export default HomeContent
