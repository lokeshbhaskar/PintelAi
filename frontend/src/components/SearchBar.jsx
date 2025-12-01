import React from 'react'

const SearchBar = ({ search, setSearch }) => {
    return (
        <div className='mt-4 mb-4 flex justify-center  '>
            <input
                type="text"
                className='w-full md:w-1/2 p-3 pl-6 border-0 rounded-full bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-all duration-300'
                value={search}
                placeholder='search orgs here...'
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    )
}

export default SearchBar