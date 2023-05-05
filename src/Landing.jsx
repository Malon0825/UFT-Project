import React, { useState, useRef } from 'react'
import { background } from './assets'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../src/context/auth'

const Landing = () => {

    const [loginEmail, setLogin] = useState(true);
    const [signup, setSignup] = useState(false);

    const [error, setError] = useState('');
    const [errorMes, setErrorMes] = useState(false);
    const [laoding, setLoading] = useState(false);
    
    const { login } = useAuth();
    const emailRef = useRef();
    const passRef = useRef();

    const handleSignup = () => {

        setLogin(false)
        setSignup(true)
    
    };

    const handleLogin = () => {

        setLogin(true)
        setSignup(false)
    
    };

    let navigate = useNavigate()


    async function handleContinueButton(e) {
        e.preventDefault();
        try {
          setLoading(true);
          setError("");
          if (!emailRef.current.value || !passRef.current.value) {
            setErrorMes(true)
            setError("Please enter a valid email and password!!");
          } else {
            await login(emailRef.current.value, passRef.current.value);
            navigate("/home");
          }
        } catch {
          setError("Failed to sign in!!");
          setErrorMes(true)
        }
        setLoading(false);
    }

  return (
    <div className="w-screen h-screen bg-slate-500 overflow-hidden flex items-center justify-center">

        <img className="h-full w-full absolute opacity-60" src={background} alt="image" />

        <div className="w-[1000px] h-[600px] bg-[#cdc7ce] bg-opacity-30 flex rounded-xl relative overflow-hidden">

            <div className="w-[500px] h-full relative bg-[#cdc7ce] flex flex-col p-10 justify-center gap-4">

                <h1 className="font-poppins text-xl font-semibold">
                    Senior High School Scheduling App
                </h1>

                <h1 className="font-poppins text-4xl font-semibold">
                    Empowering Minds, Shaping Futures.
                </h1>

                <div className="mt-24 flex">

                    <h1 className="font-poppins text-lg font-semibold">
                        If you don't have an account.
                    </h1>

                    <a className="font-poppins text-lg text-[#446c7f] font-semibold cursor-pointer"
                        onClick={handleSignup}>Click here...</a>

                </div>



            </div>

{/* ///////////////////// Login ////////////////////////////////// /////////////////////////*/}

            <div className={`${loginEmail ? "flex" : "hidden"} h-full w-[500px] relative flex flex-col justify-center items-center gap-4`}>

                <h1 className="font-poppins text-4xl font-semibold">Login</h1>

                <div className="mt-10 flex flex-col gap-4">

                    <div className="flex font-poppins text-3xl font-medium text-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            className="w-10 h-10">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg> 

                        <label htmlFor="emailLogin">Email:</label>                       
                    </div>

                    <input className="font-poppins text-2xl w-96 bg-transparent border-b-2 border-[#162730] mt-4 h-[50px] focus:outline-none"
                    type="text" ref={emailRef} id='emailLogin'/>     

                    <div className="flex font-poppins text-3xl font-medium text-center items-center">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                            className="w-10 h-10">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>

                        <label htmlFor="loginPassword">Password:</label>                       
                    </div>

                    <input className="font-poppins text-2xl w-96 bg-transparent border-b-2 border-[#162730] mt-4 h-[50px] focus:outline-none"
                    type="password" ref={passRef} id='loginPassword'/>                  
                </div>

                <div className={`${errorMes ? 'flex' : 'hidden'} w-[300px] h-[80px] border-2 rounded-xl border-[#cdc7ce]`}>
                    <h1 className="font-poppins text-2xl text-center">
                        {error}
                    </h1>
                </div>

                <button className="w-[150px] h-[50px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300 mt-5"
                    onClick={handleContinueButton}
                    disabled= {laoding}>Continue</button>

            </div>

{/* ///////////////////// Signup ////////////////////////////////// /////////////////////////*/}

            <div className={`${signup ? "flex" : "hidden"} h-full w-[500px] relative flex flex-col justify-center items-center gap-4`}>

                <h1 className="font-poppins text-4xl font-semibold">Signup</h1>

                <div className="flex flex-col gap-0 w--96 h-96 overflow-y-scroll scrollbar">
                    <div className="mt-10 flex flex-row gap-4 font-poppins text-xl font-medium text-center items-center">
                        <label className="shrink-0" htmlFor="firstname">First Name:
                        </label>  

                        <input id='firstname' className="font-poppins text-xl w-full bg-transparent border-b-2 border-[#162730] mt-1 h-[50px] focus:outline-none"
                        type="text" />                              
                    </div>

                    <div className="mt-10 flex flex-row gap-4 font-poppins text-xl font-medium text-center items-center">
                        <label className="shrink-0" htmlFor="firstname">Last Name:
                        </label>  

                        <input id='firstname' className="font-poppins text-xl w-full bg-transparent border-b-2 border-[#162730] mt-1 h-[50px] focus:outline-none"
                        type="text" />                              
                    </div>

                    <div className="mt-10 flex flex-row gap-4 font-poppins text-xl font-medium text-center items-center">
                        <label className="shrink-0" htmlFor="firstname">Middle Name:
                        </label>  

                        <input id='firstname' className="font-poppins text-xl w-full bg-transparent border-b-2 border-[#162730] mt-1 h-[50px] focus:outline-none"
                        type="text" />                              
                    </div>

                    <div className="mt-10 flex flex-row gap-4 font-poppins text-xl font-medium text-center items-center">
                        <label htmlFor="firstname">Position:
                        </label>  

                        <input id='firstname' className="font-poppins text-xl w-full bg-transparent border-b-2 border-[#162730] mt-1 h-[50px] focus:outline-none"
                        type="text" />                              
                    </div> 

                    <div className="mt-10 flex flex-row gap-4 font-poppins text-xl font-medium text-center items-center">
                        <label htmlFor="firstname">Gender:
                        </label>  

                        <input id='firstname' className="font-poppins text-xl w-full bg-transparent border-b-2 border-[#162730] mt-1 h-[50px] focus:outline-none"
                        type="text" />                              
                    </div>

                    <div className="mt-10 flex flex-row gap-4 font-poppins text-xl font-medium text-center items-center">
                        <label htmlFor="firstname">Email:
                        </label>  

                        <input id='firstname' className="font-poppins text-xl w-full bg-transparent border-b-2 border-[#162730] mt-1 h-[50px] focus:outline-none"
                        type="text" />                              
                    </div>

                    <div className="mt-10 flex flex-row gap-4 font-poppins text-xl font-medium text-center items-center">
                        <label htmlFor="firstname">Psssword:
                        </label>  

                        <input id='firstname' className="font-poppins text-xl w-full bg-transparent border-b-2 border-[#162730] mt-1 h-[50px] focus:outline-none"
                        type="password" />                              
                    </div>   
                 
                </div>

                

                <div className="flex gap-4">
                    <button className="w-[150px] h-[50px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                    transition-all ease-in-out duration-300 mt-5"
                        onClick={() => setAddTeacher(true)}>Continue</button>
                    
                    <button className="w-[150px] h-[50px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                    transition-all ease-in-out duration-300 mt-5"
                        onClick={handleLogin}>Go Back</button>
                </div>


            </div>

        </div>

    </div>
  )
}

export default Landing