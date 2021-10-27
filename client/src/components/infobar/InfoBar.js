import React from 'react'
import './InfoBar.css'
import closeIcon from '../icons/closeIcon.png'
import onlineIcon from '../icons/onlineIcon.png'

const InfoBar = ({ room }) => {
  return (
    <div className='infoBarContainer'>
      <div className='leftContainer'>
        <img className='onlineIcon' src={onlineIcon} alt='' />
        <h3>{room}</h3>
      </div>
      <div className='rightContainer'>
        <a href='/'>
          <img src={closeIcon} className='closeIcon' alt='' />
        </a>
      </div>
    </div>
  )
}

export default InfoBar
