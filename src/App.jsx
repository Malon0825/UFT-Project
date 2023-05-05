import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../src/context/auth'
import './App.css'
import { background } from './assets'

const App = () => {

  const [teachertSec, setTeacherSec] = useState(false);
  const [subjectSec, setSubjectSec] = useState(false);

  const [addTeacher, setAddTeacher] = useState(false);
  const [editTeacher, setEditTeacher] = useState(false);
  const [deleteTeacher, setDeleteTeacher] = useState(false);

  const [addSubject, setAddSubject] = useState(false);
  const [editSubject, setEditSubject] = useState(false);
  const [deleteSubject, setDeleteSubject] = useState(false);

  
  const { logout } = useAuth()
  let navigate = useNavigate()

  const handleHomeSect = () => {

    setSubjectSec(false)
    setTeacherSec(false)

  };

  const handleSubjectSect = () => {

    setSubjectSec(true)
    setTeacherSec(false)

  };

  const handleTeacherSect = () => {

    setSubjectSec(false)
    setTeacherSec(true)

  };

  function add_student(){



  };


  async function handleLogOut() {

    try {
      await logout()
      navigate("/")
    }catch {
    }
  }

  return (
    <div className="w-screen h-screen bg-slate-500 overflow-hidden flex">

      <img className="h-full w-full absolute opacity-60" src={background} alt="image" />

      {/* ///////////////     Hero Section      ///////////////////////////////////////////// */}

      <div className="bg-[#cdc7ce] bg-opacity-50 w-[40vw] h-full relative flex flex-col justify-center p-10 gap-20">

        <div>
          <h1 className="font-poppins text-2xl font-semibold text-[#162730]">
            SHS Scheduling App
          </h1>
          <h1 className="font-poppins text-7xl font-semibold text-[#30292f]">
            Every Student,<br /> Is  Special for Us.
          </h1>          
        </div>

        <div className="font-poppins text-2xl font-semibold text-[#162730] flex flex-col gap-2">

          <label className="font-poppins text-2xl font-semibold text-[#162730]">
              Manage schedules here...
          </label>   

          <div className="pl-1 flex gap-4">

            <button className="w-max border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                              transition-all ease-in-out duration-300 p-1"
                    onClick={handleHomeSect}>
                home
            </button>  

            <button className="w-max border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                              transition-all ease-in-out duration-300 p-1"
                    onClick={handleTeacherSect}>
              faculty
            </button>  

            <button className="w-max border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                              transition-all ease-in-out duration-300 p-1"
                    onClick={handleSubjectSect}>
              subjects
            </button>   

            <button className="w-max border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                              transition-all ease-in-out duration-300 p-1">
              schedules
            </button>  


          </div>
               
        </div>

        <div className="flex flex-row gap-2 hover:scale-105 hover:-translate-x-5 transition-all ease-in-out duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                  className="w-10 h-10">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            <button className="font-poppins text-2xl font-medium"
            onClick={handleLogOut}>Logout...</button>        
        </div>

      </div>



      <div className="w-[60vw] h-[500px]l relative flex flex-col items-center justify-center">

        {/* ///////////////////////////     Tachers Data        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

        <div className={`${teachertSec ? 'flex' : 'hidden'} absolute flex-col items-center justify-center`}>


          <h1 className="font-poppins text-5xl font-semibold pb-16">
              Faculty Data
          </h1>

          <div className="h-[500px] w-full text-[#162730] flex justify-center gap-4">



            <label className="font-poppins text-4xl font-semibold"
                    htmlFor="">
                      Find:
            </label>

            <input className="font-poppins text-4xl w-96 bg-transparent border-b-2 border-[#162730] -mt-1 h-[50px] focus:outline-none"
                  type="text" />

            <button className="w-[100px] h-[50px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300">Search</button>

          </div>

          <div className="flex items-center justify-center gap-10">

            <button className="w-[150px] h-[60px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300 animate-pulse"
                    onClick={() => setAddTeacher(true)}>Add</button>
            
            <button className="w-[150px] h-[60px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300 animate-pulse"
                    onClick={() => setEditTeacher(true)}>Edit</button>

            <button className="w-[150px] h-[60px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300 animate-pulse"
                    onClick={() => setDeleteTeacher(true)}>Delete</button>

          </div>


        </div>

        {/* ////////////////////////////      Add Teacher        ///////////////////////////////////////// */}

        <div className={`${addTeacher ? "flex" : "hidden"} flex bg-black bg-opacity-50 h-full w-full absolute items-center justify-center`}>

          <div className="h-[600px] w-[500px] bg-[#cdc7ce] rounded-xl bg-opacity-80 flex flex-col items-center justify-center">

            <h1 className="text-3xl font-poppins font-medium mt-14">Add Teacher</h1>

            <div className="w-full h-full flex flex-col p-5 gap-3">

              <label className="font-poppins text-2xl font-medium"
                      htmlFor="">Faculty Name:</label> 

              <input className="font-poppins text-2xl w-[450px] bg-transparent border-b-2 border-[#162730] -mt-1 h-[50px] focus:outline-none" 
                      type="text" />    

              <label className="font-poppins text-2xl font-medium"
                      htmlFor="">Advisory:</label> 

              <input className="font-poppins text-2xl w-[450px] bg-transparent border-b-2 border-[#162730] -mt-1 h-[50px] focus:outline-none" 
                      type="text" />     

              <button className="w-[150px] h-[40px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300"
                      onClick={add_student}>Add Subject</button>

            </div>

            <div className="mb-5 flex flex-row gap-5">
              <button className="w-[100px] h-[40px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300"
                      onClick={add_student}>Done</button>

              <button className="w-[100px] h-[40px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300"
                       onClick={() => setAddTeacher(false)}>Go Back</button>
            </div>

          </div>
          
        </div>

        {/* ////////////////////////////      Edit Teacher         ///////////////////////////////////////// */}

        <div className={`${editTeacher ? "flex" : "hidden"} flex bg-black bg-opacity-50 h-full w-full absolute items-center justify-center`}>

          <div className="h-[600px] w-[500px] bg-[#cdc7ce] rounded-xl bg-opacity-80 flex flex-col items-center justify-center">

            <h1 className="text-3xl font-poppins font-medium mt-14">Edit Teacher</h1>

            <div className="w-full h-full flex flex-col p-5 gap-4">

              <label className="font-poppins text-2xl font-medium"
                      htmlFor="">Teacher ID:</label> 

              <input className="font-poppins text-2xl w-[250px] bg-transparent border-b-2 border-[#162730] -mt-1 h-[50px] focus:outline-none" 
                      type="number" min="1"/>   

              <label className="font-poppins text-2xl font-medium"
                      htmlFor="">Faculty Name:</label> 

              <input className="font-poppins text-2xl w-[450px] bg-transparent border-b-2 border-[#162730] -mt-1 h-[50px] focus:outline-none" 
                      type="text" />    

              <label className="font-poppins text-2xl font-medium"
                      htmlFor="">Advisory:</label> 

              <input className="font-poppins text-2xl w-[450px] bg-transparent border-b-2 border-[#162730] -mt-1 h-[50px] focus:outline-none" 
                      type="text" />     

              <button className="w-[150px] h-[40px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300"
                      onClick={add_student}>Edit Subject</button>


            </div>

            <div className="mb-5 flex flex-row gap-5">
              <button className="w-[100px] h-[40px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300"
                      onClick={add_student}>Done</button>

              <button className="w-[100px] h-[40px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300"
                      onClick={() => setEditTeacher(false)}>Go Back</button>
            </div>

          </div>

        </div>

        {/* ////////////////////////////      Delete Student         ///////////////////////////////////////// */}

        <div className={`${deleteTeacher ? "flex" : "hidden"} flex bg-black bg-opacity-50 h-full w-full absolute items-center justify-center`}>

          <div className="h-[600px] w-[500px] bg-[#cdc7ce] rounded-xl bg-opacity-80 flex flex-col items-center justify-center">

            <h1 className="text-3xl font-poppins font-medium mt-14">Delete Teacher</h1>

            <div className="w-full h-full flex flex-col p-5">

              <label className="font-poppins text-2xl font-medium"
                      htmlFor="">Teacher ID:</label> 

              <input className="font-poppins text-2xl w-[250px] bg-transparent border-b-2 border-[#162730] -mt-1 h-[50px] focus:outline-none" 
                      type="number" min="1"/>   
                      
            </div>

            <div className="mb-5 flex flex-row gap-5">
              <button className="w-[100px] h-[40px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300"
                      onClick={add_student}>Done</button>

              <button className="w-[100px] h-[40px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300"
                      onClick={() => setDeleteTeacher(false)}>Go Back</button>
            </div>

          </div>

        </div>

        {/* ////////////////////////////     Subjects Data        ////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

        <div className={`${subjectSec ? 'flex' : 'hidden'} absolute flex-col items-center justify-center`}>


          <h1 className="font-poppins text-5xl font-semibold pb-16">
              Subjects Data
          </h1>

          <div className="h-[500px] w-full text-[#162730] flex justify-center gap-4">



            <label className="font-poppins text-4xl font-semibold"
                    htmlFor="">
                      Find:
            </label>

            <input className="font-poppins text-4xl w-96 bg-transparent border-b-2 border-[#162730] -mt-1 h-[50px] focus:outline-none"
                  type="text" />

            <button className="w-[100px] h-[50px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300">Search</button>

          </div>

          <div className="flex items-center justify-center gap-10">

            <button className="w-[150px] h-[60px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300 animate-pulse"
                    onClick={() => setAddSubject(true)}>Add</button>
            
            <button className="w-[150px] h-[60px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300 animate-pulse"
                    onClick={() => setEditSubject(true)}>Edit</button>

            <button className="w-[150px] h-[60px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300 animate-pulse"
                    onClick={() => setDeleteSubject(true)}>Delete</button>

          </div>


        </div>

        {/* ////////////////////////////      Add Subjects        ///////////////////////////////////////// */}

        <div className={`${addSubject ? "flex" : "hidden"} flex bg-black bg-opacity-50 h-full w-full absolute items-center justify-center`}>

          <div className="h-[600px] w-[500px] bg-[#cdc7ce] rounded-xl bg-opacity-80 flex flex-col items-center justify-center">

            <h1 className="text-3xl font-poppins font-medium mt-14">Add Subject</h1>

            <div className="w-full h-full flex flex-col p-5 gap-3">

                <label className="font-poppins text-2xl font-medium"
                      htmlFor="">Subject Name:</label> 

                <input className="font-poppins text-2xl w-[450px] bg-transparent border-b-2 border-[#162730] -mt-1 h-[50px] focus:outline-none" 
                      type="text" />    

                <button className="w-[180px] h-[40px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300"
                      onClick={add_student}>Assign Teacher</button>


            </div>

            <div className="mb-5 flex flex-row gap-5">
              <button className="w-[100px] h-[40px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300"
                      onClick={add_student}>Done</button>

              <button className="w-[100px] h-[40px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300"
                       onClick={() => setAddSubject(false)}>Go Back</button>
            </div>

          </div>
          
        </div>

        {/* ////////////////////////////      Edit Subjects         ///////////////////////////////////////// */}

        <div className={`${editSubject ? "flex" : "hidden"} flex bg-black bg-opacity-50 h-full w-full absolute items-center justify-center`}>

          <div className="h-[600px] w-[500px] bg-[#cdc7ce] rounded-xl bg-opacity-80 flex flex-col items-center justify-center">

            <h1 className="text-3xl font-poppins font-medium mt-14">Edit Subject</h1>

            <div className="w-full h-full flex flex-col p-5 gap-4">

              <label className="font-poppins text-2xl font-medium"
                      htmlFor="">Subject ID:</label> 

              <input className="font-poppins text-2xl w-[250px] bg-transparent border-b-2 border-[#162730] -mt-1 h-[50px] focus:outline-none" 
                      type="number" min="1"/>   

              <label className="font-poppins text-2xl font-medium"
                      htmlFor="">Subject Name:</label> 

              <input className="font-poppins text-2xl w-[450px] bg-transparent border-b-2 border-[#162730] -mt-1 h-[50px] focus:outline-none" 
                      type="text" />    

              <label className="font-poppins text-2xl font-medium"
                      htmlFor="">Assign Teacher:</label> 

              <input className="font-poppins text-2xl w-[450px] bg-transparent border-b-2 border-[#162730] -mt-1 h-[50px] focus:outline-none" 
                      type="text" />  

              <label className="font-poppins text-2xl font-medium"
                      htmlFor="">Subject Units:</label> 

              <input className="font-poppins text-2xl w-[250px] bg-transparent border-b-2 border-[#162730] -mt-1 h-[50px] focus:outline-none" 
                      type="number" />   


            </div>

            <div className="mb-5 flex flex-row gap-5">
              <button className="w-[100px] h-[40px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300"
                      onClick={add_student}>Done</button>

              <button className="w-[100px] h-[40px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300"
                      onClick={() => setEditSubject(false)}>Go Back</button>
            </div>

          </div>

        </div>

        {/* ////////////////////////////      Delete Subjects         ///////////////////////////////////////// */}

        <div className={`${deleteSubject ? "flex" : "hidden"} flex bg-black bg-opacity-50 h-full w-full absolute items-center justify-center`}>

          <div className="h-[600px] w-[500px] bg-[#cdc7ce] rounded-xl bg-opacity-80 flex flex-col items-center justify-center">

            <h1 className="text-3xl font-poppins font-medium mt-14">Delete Subject</h1>

            <div className="w-full h-full flex flex-col p-5">

              <label className="font-poppins text-2xl font-medium"
                      htmlFor="">Subject ID:</label> 

              <input className="font-poppins text-2xl w-[250px] bg-transparent border-b-2 border-[#162730] -mt-1 h-[50px] focus:outline-none" 
                      type="number" min="1"/>   
                      
            </div>

            <div className="mb-5 flex flex-row gap-5">
              <button className="w-[100px] h-[40px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300"
                      onClick={add_student}>Done</button>

              <button className="w-[100px] h-[40px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300"
                      onClick={() => setDeleteSubject(false)}>Go Back</button>
            </div>

          </div>

        </div>

      {/* /////////// Last /////////// */}
      </div>



    </div>
  )
}

export default App
