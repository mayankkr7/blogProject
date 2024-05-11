import React from 'react'
import myLogo from "../assets/images/Blog Logo.png"

function Logo({width = '100px'}) {
  return (
    <div className="w-12 scale-125 z-50">
      <img className='rounded-md' src={myLogo} alt="My Logo" />
    </div>
  )
}

export default Logo;