import React from 'react'
import Timer from './timer'

function Header({ timer }) {
    return (
        <header className="flex justify-between items-center py-2 px-4 bg-black/85 text-white">
            <h1 className="text-3xl font-semibold">Quiz20</h1>
            <Timer timer={timer} />
            <span>Theme</span>
        </header>
    )
}

export default Header