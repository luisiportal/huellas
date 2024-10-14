import React from 'react'

const MainLayout = ({titulo,children}) => {
  return (
    <div className='mt-10 p-4'>
        <h1 className='font-bold text-xl'>{titulo}</h1>
      <div className='bg-neutral-50 h-screen rounded-lg p-2 mt-2 shadow'>{children}</div>
    </div>
  )
}

export default MainLayout
