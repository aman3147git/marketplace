import React from 'react'
import { useSelector } from 'react-redux'

const Dmode = ({children}) => {
    const theme=useSelector((state)=>state.themeSlice.theme);
    
    
  return (
    <div className={theme} >
        <div className='bg-white text-black dark:bg-[#13171C] dark:text-white '>
            {children}
        </div>
        
    </div>
  )
}

export default Dmode