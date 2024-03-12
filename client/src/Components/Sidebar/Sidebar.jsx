import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogutButton from './LogutButton'

function Sidebar() {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
        <SearchInput/>
        <div className='divider px-3'></div>
        <Conversations/>
        <LogutButton/>
    </div>
  )
}

export default Sidebar