import React,{useEffect, useState} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import {BsCart3} from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'

import {BsChevronDown} from 'react-icons/bs'
import { allCategories } from '../../redux/categorySlice'

function NavBar() {
  const navigate = useNavigate()
  

  return (
    <div className='w-100 h-20 flex font-poppins px-5 p-4 place-items-center place-content-center gap-5'>
      <div className="flex flex-1 place-items-center place-content-start gap-12">
          <h1 className='font-semibold text-2xl text-black'>Skillify</h1>
          <div className="flex px-10 rounded-3xl border-2 border-gray-600 py-2 place-items-center ms-3">
            <AiOutlineSearch size={20}></AiOutlineSearch>
            <input type="text" className='focus:outline-none ms-2 bg-transparent' placeholder='search for courses'/>
          </div>
      </div>
      
          
            <Link to="/"><li className='px-1 list-none'>Home</li></Link>
            <Link to="/courses"><li className='px-1 list-none'>Courses</li></Link>
            <Link to="/user/instructor/onboarding"><li className='px-1 list-none'>Become an Instructor</li></Link>
            
            <BsCart3></BsCart3>
        
          
          <div className='flex gap-2'>
            <button className='px-4 py-2 bg-darkPink mx-2 text-white' onClick={()=>{navigate('/login')}}>Login</button>
            <button className='px-4 py-2 bg-primaryBlue text-white mx-2' onClick={()=>{navigate('/register')}}>Sign up</button>
          </div>
      </div>
  )
}

export default NavBar