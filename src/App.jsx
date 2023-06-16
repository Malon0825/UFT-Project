import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../src/context/auth'
import './App.css'
import { background } from './assets'
import { getFirestore, addDoc, collection, doc, query, where, onSnapshot  } from 'firebase/firestore'
import dayjs from 'dayjs'
import cn from '../src/constant/cn'
import { generateDate, months } from '../src/constant/Calendar'

const App = () => {

    const [teachertSec, setTeacherSec] = useState(false);
    const [subjectSec, setSubjectSec] = useState(false);
    const [schedSec, setSchedSec] = useState(false);

    const [addTeacher, setAddTeacher] = useState(false);
    const [editTeacher, setEditTeacher] = useState(false);
    const [deleteTeacher, setDeleteTeacher] = useState(false);

    const [addSubject, setAddSubject] = useState(false);
    const [editSubject, setEditSubject] = useState(false);
    const [deleteSubject, setDeleteSubject] = useState(false);

    const [sched, setSched] = useState(false);
    const [editSched, setEditSched] = useState(false);
    const [viewSched, setViewSched] = useState(false);
    const [schedWindow, setSchedWindow] = useState(false);

    const [messageScreen, setMessageScreen] = useState(false);
    const [popup_message, setPopupMessage] = useState("");

    const teacherNameRef = useRef();
    const teacherAdvisoryRef = useRef();

    const searchTeacherSchedRef = useRef();
    
    const db = getFirestore()
    const teacherColRef = collection(db, 'teachers')
    const subjectColRef = collection(db, 'subjects')
    const scheduleColRef = collection(db, 'schedules')


    const { logout } = useAuth()


    const subjectNameRef = useRef();
    const subjectTeacherRef = useRef();


    let navigate = useNavigate()

    const handleHomeSect = () => {

        setSubjectSec(false)
        setSchedSec(false)
        setTeacherSec(false)

    };

    const handleSubjectSect = () => {

        setSubjectSec(true)
        setSchedSec(false)
        setTeacherSec(false)

    };

    const handleTeacherSect = () => {

        setSubjectSec(false)
        setSchedSec(false)
        setTeacherSec(true)

    };

    const handleSchedSect = () => {

        setSubjectSec(false)
        setTeacherSec(false)
        setSchedSec(true)

    };

    function add_student(){

    };

    function handleMessage(){

        setMessageScreen(false)
        setselectedTeacher("")
        setSelectedSubject("")
        setSelectedValues("")
        setMonthFromSelectedValues("")
        setMonthToSelectedValues("")
        setTimeFromAmPmSelectedValues("")
        setTimeToAmPmSelectedValues("")

        timeFromHourRef.current.value = ""
        timeFromMinRef.current.value = ""

        timeToHourRef.current.value = ""
        timeToMinRef.current.value = ""

        locationRef.current.value = ""
        teacherNameRef.current.value = ""
        teacherAdvisoryRef.current.value = ""

        subjectNameRef.current.value = ""
        subjectTeacherRef.current.value = ""

    };

    function add_faculty(){

        const teacherName = teacherNameRef.current.value;
        const teacherAdvisory = teacherAdvisoryRef.current.value;

        try{
            addDoc(teacherColRef, {
            teacher_name:  teacherName,
            teacher_advisory: teacherAdvisory
            })
        }
        catch{

        }
        setMessageScreen(true)
        setPopupMessage("Teacher added successfuly!!!")
    };

    async function handleLogOut() {

        try {
        await logout()
        navigate("/")
        }catch {
        }
    }

    /////////////// Subjects //////////////


    function add_subject(){

        const subjectName = subjectNameRef.current.value;
        const subjectTeacher = subjectTeacherRef.current.value;

        try{
            addDoc(subjectColRef, {
            subject_name:  subjectName,
            subject_teacher: subjectTeacher
            })
        }
        catch{

        }
        setMessageScreen(true)
        setPopupMessage("Subject added successfuly!!!")

    };


    /////////////// Schedules //////////////

    const locationRef = useRef();
    const timeToHourRef = useRef();
    const timeToMinRef = useRef();

    const timeFromHourRef = useRef();
    const timeFromMinRef = useRef();

    const [scheduleData, setScheduleData] = useState([]);
    const [selectSched, setSelectSched] = useState([]);
    const [scheduleSubject, setScheduleSubject] = useState();
    const [schedValue, setSchedValue] = useState();

    const [selectedTeacher, setselectedTeacher] = useState();  
    const [selectedSubject, setSelectedSubject] = useState();
    const [subjectData, setSubjectData] = useState([]);

    const [selectedValues, setSelectedValues] = useState([]);
    const [monthFromSelectedValues, setMonthFromSelectedValues] = useState();
    const [monthToSelectedValues, setMonthToSelectedValues] = useState();
    const [timeFromAmPmSelectedValues, setTimeFromAmPmSelectedValues] = useState();
    const [timeToAmPmSelectedValues, setTimeToAmPmSelectedValues] = useState();


    const handleSelectTeacher = (event) => {
        const { value } = event.target;
        setselectedTeacher(value);
    };

    const handleSelectSubject = (event) => {
        const { value } = event.target;
        setSelectedSubject(value);
    };

    const handleChangeWeekdays = (event) => {
        const { value } = event.target;
        setSelectedValues((prevValues) => [...prevValues, value]);
    };

    const handleChangeMonthFrom = (event) => {
        const { value } = event.target;
        setMonthFromSelectedValues(value);
    };

    const handleChangeMonthTo = (event) => {
        const { value } = event.target;
        setMonthToSelectedValues(value);
    };

    const handleChangeTimeFromAmPm = (event) => {
        const { value } = event.target;
        setTimeFromAmPmSelectedValues(value);
    };

    const handleChangeTimeToAmPm = (event) => {
        const { value } = event.target;
        setTimeToAmPmSelectedValues(value);
    };

    function handleSetTimeToHours(event) {
        const value = event.target.value;
        if (value.length > 2) {

            event.target.value = value.slice(0, 2);
            const newValue = value.slice(0, 2);

            if (newValue > 12) {
                event.target.value = 12;
            } else if (newValue < 0) {
                event.target.value = 1;
            }
        }

    }

    function handleSetTimeToMinute(event) {
        const value = event.target.value;
        if (value.length > 2) {

            event.target.value = value.slice(0, 2);
            const newValue = value.slice(0, 2);

            if (newValue > 60) {
                event.target.value = 60;
            } else if (newValue < 0) {
                event.target.value = 0;
            }
        }

    }

    function handleSetTimeToMouseLeave(event) {
        const value = event.target.value;
        if (value.length > 2) {

            event.target.value = value.slice(0, 2);
            const newValue = value.slice(0, 2);

            if (newValue > 60) {
                event.target.value = 60;
            } else if (newValue < 0) {
                event.target.value = 0;
            }
        }

    }

    
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const monthNumbers = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11
      };
    const dayNumbers = {
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
        Sunday: 7
    };


    const currentDate = dayjs()

    const [today, setToday] = useState(currentDate)

    const [data, setData] = useState([]);//Array type
    const [searchValue, setSearchValue] = useState([]);//Array type
    
    const [inputValue, setInputValue] = useState('');
    const [teacherNameValue, seTeacherNameValue] = useState();

    useEffect(() => {
        const q = query(teacherColRef);
    
        onSnapshot(q, (snapshot) => {
        let users = [];
        snapshot.docs.forEach((doc) => {
            users.push({ ...doc.data(), id: doc.id });
        });
    
        setData(users);
        setSearchValue(users);
        });
    }, []);

    useEffect(() => {
        const q = query(subjectColRef);
    
        onSnapshot(q, (snapshot) => {
        let users = [];
        snapshot.docs.forEach((doc) => {
            users.push({ ...doc.data(), id: doc.id });
        });
    
        setSubjectData(users);
        });
    }, []);

    useEffect(() => {
        const q = query(scheduleColRef);
    
        onSnapshot(q, (snapshot) => {
        let users = [];
        snapshot.docs.forEach((doc) => {
            users.push({ ...doc.data(), id: doc.id });
        });
        //console.log(users)
        setScheduleData(users);
        });
    }, []);

    const filterTitles = e => {
        const search = e.target.value.toLowerCase()
        setInputValue(search)
        const filteredName = data.filter(user => user.teacher_name.toLowerCase().includes(search))

        if(search === ""){
            setSearchValue(data)

        }else{
            setSearchValue(filteredName)

        }
        
    }
    const handleNameClick = (name) => {
        setInputValue(name)
    }

    const [subject_name, set_subject_name] = useState();
    const [teacher_name, set_teacher_name] = useState();
    const [days_of_weeks, set_days_of_weeks] = useState([]);
    const [location, set_location] = useState();
    const [month_from, set_month_from] = useState();
    const [month_to, set_month_to] = useState();

    const [month_from_name, set_month_from_name] = useState();
    const [month_to_name, set_month_to_name] = useState();
    

    const [time_from, set_time_from] = useState();
    const [time_to, set_time_to] = useState();

    const [highlightedDay, setHighlightedDay] = useState([]);

    const schedSelectSubject = (event) => {
        const { value } = event.target;
        setScheduleSubject(value);
    
        setSelectSched("");
        try {
            console.log(value);
            const q = query(
                scheduleColRef,
                where("subject_name", "==", value),
                where("teacher_name", "==", inputValue)
            );
    
            onSnapshot(q, (snapshot) => {
                let users = [];
                snapshot.docs.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id });
                });
                setSelectSched(users);
    
                const allDaysOfWeek = users.map((user) => user.days_of_weeks);
                const daysAsNumbers = allDaysOfWeek.map((days) =>
                    days.map((day) => dayNumbers[day])
                );
                const arrayOfDays = daysAsNumbers[0];
                set_days_of_weeks(arrayOfDays)
                
                const monthFrom = users[0].month_from;
                set_month_from_name(monthFrom);
                const monthsFromAsNumber = monthNumbers[monthFrom];
                set_month_from(monthsFromAsNumber);

                const monthTo= users[0].month_to;    
                set_month_to_name(monthTo);  
                const monthsToAsNumber = monthNumbers[monthTo];           
                set_month_to(monthsToAsNumber);

                const timeFromHour= users[0].time_from_hour;
                const timeFromMin= users[0].time_from_min;
                const timeFromHorizon= users[0].time_from;
                const timeFrom = timeFromHour + ":" + timeFromMin + " " + timeFromHorizon;
                set_time_from(timeFrom);

                const timeToHour= users[0].time_to_hour;
                const timeToMin= users[0].time_to_min;
                const timeToHorizon= users[0].time_to;
                const timeTo = timeToHour + ":" + timeToMin + " " + timeToHorizon;
                set_time_to(timeTo);

                const teacherName= users[0].teacher_name;
                set_teacher_name(teacherName)

                const subName= users[0].subject_name;
                set_subject_name(subName)

                const location= users[0].location;
                set_location(location)
            });
        } catch {}
    };



    function searchTeacherSched() {
        setViewSched(true);
        setScheduleSubject("")
        seTeacherNameValue("")
      
        const teacherScheds = scheduleData.filter(
          user => user.teacher_name === inputValue
        );
        seTeacherNameValue(teacherScheds);
      }



    function showSchedDetails (event){

        setSchedWindow(true);
        console.log(highlightedDay);
    };

    function viewSchedBack (){

        setViewSched(false)
    };
    

    const setSchedule = () => {

        const location = locationRef.current.value;
        const timeFromHour = timeFromHourRef.current.value;
        const timeToHour = timeToHourRef.current.value;
        const timeFromMin = timeFromMinRef.current.value;
        const timeTomMin = timeToMinRef.current.value;

        try{
            addDoc(scheduleColRef, {
            teacher_name:  selectedTeacher,
            subject_name: selectedSubject,
            location: location,
            days_of_weeks: selectedValues,
            month_from: monthFromSelectedValues,
            month_to: monthToSelectedValues,
            time_from_hour: timeFromHour,
            time_from_min: timeFromMin,
            time_from: timeFromAmPmSelectedValues,
            time_to_hour: timeToHour,
            time_to_min: timeTomMin,
            time_to: timeToAmPmSelectedValues
            })
        }
        catch{

        }
        setMessageScreen(true)
        setPopupMessage("Schedule added successfuly!!!")

    };

  return (
    <div className="w-screen h-screen bg-slate-500 overflow-hidden flex">

      <img className="h-full w-full absolute opacity-60" src={background} alt="image" />

      <div className={`${messageScreen? "flex" : "hidden"}  bg-black bg-opacity-50 h-full w-full absolute z-50 flex items-center justify-center`}>
          <div className="w-[500px] h-[300px] bg-[#cdc7ce] rounded-xl flex flex-col justify-center items-center gap-4">
              <p className="font-poppins text-4xl text-center">
                {popup_message}
              </p>
              <button className="border-2 border-black rounded-lg font-poppins text-2xl" onClick={handleMessage}>
                Done
              </button>
          </div>
      </div>

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
                              transition-all ease-in-out duration-300 p-1"
                    onClick={handleSchedSect}>
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
            
            {/* <button className="w-[150px] h-[60px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300 animate-pulse"
                    onClick={() => setEditTeacher(true)}>Edit</button>

            <button className="w-[150px] h-[60px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300 animate-pulse"
                    onClick={() => setDeleteTeacher(true)}>Delete</button> */}

          </div>


        </div>

        {/* ////////////////////////////      Add Teacher        ///////////////////////////////////////// */}

        <div className={`${addTeacher ? "flex" : "hidden"} flex bg-black bg-opacity-50 h-full w-full absolute items-center justify-center`}>

          <div className="h-[600px] w-[500px] bg-[#cdc7ce] rounded-xl bg-opacity-80 flex flex-col items-center justify-center">

            <h1 className="text-3xl font-poppins font-medium mt-14">Add Teacher</h1>

            <div className="w-full h-full flex flex-col p-5 gap-3">

              <label className="font-poppins text-2xl font-medium"
                      htmlFor="">Teacher Name:</label> 

              <input className="font-poppins text-2xl w-[450px] bg-transparent border-b-2 border-[#162730] -mt-1 h-[50px] focus:outline-none" 
                      type="text" ref={teacherNameRef}/>    

              <label className="font-poppins text-2xl font-medium"
                      htmlFor="">Advisory:</label> 

              <input className="font-poppins text-2xl w-[450px] bg-transparent border-b-2 border-[#162730] -mt-1 h-[50px] focus:outline-none" 
                      type="text" ref={teacherAdvisoryRef}/>     

            </div>

            <div className="mb-5 flex flex-row gap-5">
              <button className="w-[100px] h-[40px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300"
                      onClick={add_faculty}>Done</button>

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
                      htmlFor="">Faculty Name:</label> 

              <input className="font-poppins text-2xl w-[450px] bg-transparent border-b-2 border-[#162730] -mt-1 h-[50px] focus:outline-none" 
                      type="text" />    

              <label className="font-poppins text-2xl font-medium"
                      htmlFor="">Advisory:</label> 

              <input className="font-poppins text-2xl w-[450px] bg-transparent border-b-2 border-[#162730] -mt-1 h-[50px] focus:outline-none" 
                      type="text" />     

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

        {/* ////////////////////////////      Delete Teacher         ///////////////////////////////////////// */}

        <div className={`${deleteTeacher ? "flex" : "hidden"} flex bg-black bg-opacity-50 h-full w-full absolute items-center justify-center`}>

          <div className="h-[600px] w-[500px] bg-[#cdc7ce] rounded-xl bg-opacity-80 flex flex-col items-center justify-center">

            <h1 className="text-3xl font-poppins font-medium mt-14">Delete Teacher</h1>

            <div className="w-full h-full flex flex-col p-5">

              <label className="font-poppins text-2xl font-medium"
                      htmlFor="">Teacher Name:</label> 

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
            
            {/* <button className="w-[150px] h-[60px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300 animate-pulse"
                    onClick={() => setEditSubject(true)}>Edit</button>

            <button className="w-[150px] h-[60px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300 animate-pulse"
                    onClick={() => setDeleteSubject(true)}>Delete</button> */}

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
                      type="text" ref={subjectNameRef}/>    

                
                <label className="font-poppins text-2xl font-medium"
                      htmlFor="">Assign Teacher:</label> 

                <input className="font-poppins text-2xl w-[450px] bg-transparent border-b-2 border-[#162730] -mt-1 h-[50px] focus:outline-none" 
                      type="text" ref={subjectTeacherRef}/> 

                {/* <button className="w-[180px] h-[40px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300"
                      onClick={add_student}>Assign Teacher</button> */}


            </div>

            <div className="mb-5 flex flex-row gap-5">
              <button className="w-[100px] h-[40px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300"
                      onClick={add_subject}>Done</button>

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

{/* ////////////////////////////     Schedules Data        ////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

        <div className={`${schedSec ? 'flex' : 'hidden'} absolute flex-col gap-4 items-center`}>


            <h1 className="font-poppins text-5xl font-semibold pb-16">
                Schedules
            </h1>

            <div className="h-[500px] w-full text-[#162730] flex flex-col gap-4">

                <div className="flex justify-center gap-4">
                    <label className="font-poppins text-4xl font-semibold"
                            htmlFor="">
                            Find:
                    </label>

                    <input className="font-poppins text-4xl w-96 bg-transparent border-b-2 border-[#162730] -mt-1 h-[50px] focus:outline-none"
                        type="text" ref={searchTeacherSchedRef} value={inputValue} onChange={(e) => filterTitles(e)} />

                    <button className="w-[100px] h-[50px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                        transition-all ease-in-out duration-300"
                            onClick={searchTeacherSched}>Search</button>
                </div>

                <div className="h-max w-full p-10 border-2 border-black rounded-xl">

                    <ul className="font-poppins text-4xl cursor-pointer">
                        {Array.isArray(searchValue) &&
                            searchValue.map((user) => {
                            return (
                                <li key={user.teacher_name} onClick={() => handleNameClick(user.teacher_name)}>
                                {user.teacher_name}
                                </li>
                            );
                        })}
                    </ul>

                </div>
        

            </div>

            <div className="flex items-center justify-center gap-10">

                <button className="w-[150px] h-[80px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                    transition-all ease-in-out duration-300 animate-pulse"
                        onClick={() => setSched(true)}>Set Schedules</button>



            </div>


        </div>

        {/* ////////////////////////////     Set Schedules       ////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

        <div className={`${sched ? "flex" : "hidden"} flex bg-black bg-opacity-50 h-full w-full absolute items-center justify-center`}>

          <div className="h-[800px] w-[800px] bg-[#cdc7ce] rounded-xl bg-opacity-80 flex flex-col items-center justify-center">

            <h1 className="text-3xl font-poppins font-medium">Set Schedule</h1>

            <div className="flex">
                <div className=" h-[600px] w-[350px] flex flex-col p-5 gap-3">

                    <label className="font-poppins text-3xl font-medium"
                        htmlFor="">Teacher Name:</label> 

                    <div className="h-[60px] flex">
                        <label className="font-poppins text-2xl font-medium border-b-2 border-[#162730] w-[300px] overflow-y-hidden
                                        flex flex-row items-center scrollbar"
                                htmlFor="">{selectedTeacher}                                    
                        </label> 


                        <select
                        className="font-poppins text-lg w-5 h-[45px] rounded-md mt-2"
                        name="teacher"
                        id="teacher"
                        required
                        onChange={handleSelectTeacher}
                        >
                        {data.map(user => (
                            <option
                            key={user.teacher_name}
                            value={user.teacher_name}
                            className="font-poppins text-lg"
                            >
                            {user.teacher_name}
                            </option>
                        ))}
                        </select>

                    </div>


                    <label className="font-poppins text-3xl font-medium"
                        htmlFor="">Subject:</label> 

                    <div className="h-[60px] flex">
                        <label className="font-poppins text-2xl font-medium border-b-2 border-[#162730] w-[300px] overflow-y-hidden
                                        flex flex-row items-center scrollbar"
                                htmlFor="">{selectedSubject}                                    
                        </label> 


                        <select
                        className="font-poppins text-lg w-5 h-[45px] rounded-md mt-2"
                        name="teacher"
                        id="teacher"
                        required
                        onChange={handleSelectSubject}
                        >
                        {subjectData.map(user => (
                            <option
                            key={user.subject_name}
                            value={user.subject_name}
                            className="font-poppins text-lg"
                            >
                            {user.subject_name}
                            </option>
                        ))}
                        </select>

                    </div>

                    <label className="font-poppins text-3xl font-medium"
                        htmlFor="">Location:</label> 

                    <input className="font-poppins text-2xl w-[300px] bg-transparent border-b-2 border-[#162730] -mt-1 h-[50px] focus:outline-none" 
                        type="text" ref={locationRef}/> 


                </div>

                <div className=" h-[600px] w-[350px] flex flex-col p-5 gap-3">

                    <label className="font-poppins text-3xl font-medium"
                            htmlFor="">Days of the Week:</label> 

                    <div className="h-[60px] flex">
                        <label className="font-poppins text-2xl font-medium border-b-2 border-[#162730] w-[300px] overflow-y-hidden
                                        flex flex-row items-center scrollbar"
                                htmlFor="">{selectedValues}                                    
                        </label> 

                        <select
                                className="font-poppins text-lg w-5 h-[45px] rounded-md mt-2"
                                name="weekdays"
                                id="weekdays"
                                required
                                onChange={handleChangeWeekdays}
								>

                                <option
                                    className="font-poppins text-lg"
                                    value="Sunday"
                                >
                                    Sunday
                                </option>
                                <option
                                    className="font-poppins text-lg"
                                    value="Monday"
                                >
                                    Monday
                                </option>
                                <option
                                    className="font-poppins text-lg"
                                    value="Tuesday"
                                >
                                    Tuesday
                                </option>
                                <option
                                    className="font-poppins text-lg"
                                    value="Wednesday"
                                >
                                    Wednesday
                                </option>
                                <option
                                    className="font-poppins text-lg"
                                    value="Thursday"
                                >
                                    Thursday
                                </option>
                                <option
                                    className="font-poppins text-lg"
                                    value="Friday"
                                >
                                    Friday
                                </option>
                                <option
                                    className="font-poppins text-lg"
                                    value="Saturday"
                                >
                                    Saturday
                                </option>

                        </select>

                    </div>


                    <label className="font-poppins text-3xl font-medium"
                        htmlFor="">Month From:</label> 

            		<div className="h-[60px] flex">
                        <label className="font-poppins text-2xl font-medium border-b-2 border-[#162730] w-[300px] overflow-y-hidden
                                        flex flex-row items-center scrollbar"
                                htmlFor="">{monthFromSelectedValues}                                    
                        </label> 

                        <select
                                className="font-poppins text-lg w-5 h-[45px] rounded-md mt-2"
                                name="weekdays"
                                id="weekdays"
                                required
                                onChange={handleChangeMonthFrom}>

                                <option
                                    className="font-poppins text-lg"
                                    value="January"
                                >
                                    January
                                </option>
                                <option
                                    className="font-poppins text-lg"
                                    value="Febuary"
                                >
                                    Febuary
                                </option>
                                <option
                                    className="font-poppins text-lg"
                                    value=" March"
                                >
                                    March
                                </option>
                                <option
                                    className="font-poppins text-lg"
                                    value="April"
                                >
                                    April
                                </option>
                                <option
                                    className="font-poppins text-lg"
                                    value="May"
                                >
                                    May
                                </option>
                                <option
                                    className="font-poppins text-lg"
                                    value="June"
                                >
                                    June
                                </option>
                                <option
                                    className="font-poppins text-lg"
                                    value="July"
                                >
                                    July
                                </option>
								<option
                                    className="font-poppins text-lg"
                                    value="August"
                                >
                                    August
                                </option>
                                <option
                                    className="font-poppins text-lg"
                                    value="September"
                                >
                                    September
                                </option>
                                <option
                                    className="font-poppins text-lg"
                                    value="October"
                                >
                                    October
                                </option>
                                <option
                                    className="font-poppins text-lg"
                                    value="November"
                                >
                                    November
                                </option>
								<option
                                    className="font-poppins text-lg"
                                    value="December"
                                >
                                    December
                                </option>

                        </select>

                    </div>
                    <label className="font-poppins text-3xl font-medium"
                        htmlFor="">Month To:</label> 

					<div className="h-[60px] flex">
                        <label className="font-poppins text-2xl font-medium border-b-2 border-[#162730] w-[300px] overflow-y-hidden
                                        flex flex-row items-center scrollbar"
                                htmlFor="">{monthToSelectedValues}                                    
                        </label> 

                        <select
                                className="font-poppins text-lg w-5 h-[45px] rounded-md mt-2"
                                name="weekdays"
                                id="weekdays"
                                required
                                onChange={handleChangeMonthTo}>

                                <option
                                    className="font-poppins text-lg"
                                    value="January"
                                >
                                    January
                                </option>
                                <option
                                    className="font-poppins text-lg"
                                    value="Febuary"
                                >
                                    Febuary
                                </option>
                                <option
                                    className="font-poppins text-lg"
                                    value=" March"
                                >
                                    March
                                </option>
                                <option
                                    className="font-poppins text-lg"
                                    value="April"
                                >
                                    April
                                </option>
                                <option
                                    className="font-poppins text-lg"
                                    value="May"
                                >
                                    May
                                </option>
                                <option
                                    className="font-poppins text-lg"
                                    value="June"
                                >
                                    June
                                </option>
                                <option
                                    className="font-poppins text-lg"
                                    value="July"
                                >
                                    July
                                </option>
								<option
                                    className="font-poppins text-lg"
                                    value="August"
                                >
                                    August
                                </option>
                                <option
                                    className="font-poppins text-lg"
                                    value="September"
                                >
                                    September
                                </option>
                                <option
                                    className="font-poppins text-lg"
                                    value="October"
                                >
                                    October
                                </option>
                                <option
                                    className="font-poppins text-lg"
                                    value="November"
                                >
                                    November
                                </option>
								<option
                                    className="font-poppins text-lg"
                                    value="December"
                                >
                                    December
                                </option>

                        </select>

                    </div>

                    <label className="font-poppins text-3xl font-medium"
                        htmlFor="">Time From:</label> 

						<div className="font-poppins text-2xl flex gap-2 items-center">
							<input className="font-poppins text-2xl w-[30px] bg-transparent border-b-2 border-[#162730] -mt-1 h-[50px] focus:outline-none no-spinners" 
                        	type="number" min={0} max={60} maxLength={2} ref={timeFromHourRef} onChange={handleSetTimeToHours} onMouseOut={handleSetTimeToMouseLeave}/>	
							:
							<input className="font-poppins text-2xl w-[30px] bg-transparent border-b-2 border-[#162730] -mt-1 h-[50px] focus:outline-none no-spinners" 
                        	type="number" min={0} max={60} maxLength={2} ref={timeFromMinRef} onChange={handleSetTimeToMinute} onMouseOut={handleSetTimeToMouseLeave}/>

							<label className="font-poppins text-2xl border-b-2 border-[#162730] w-[40px] h-[50px] -mt-1
                                        flex flex-row items-center scrollbar"
                                htmlFor="">{timeFromAmPmSelectedValues}                                    
                       		</label> 

							<select
                                className="font-poppins text-2xl w-5 h-[50px] rounded-md -mt-1 bg-transparent focus:outline-none"
                                name="weekdays"
                                id="weekdays"
                                required
                                onChange={handleChangeTimeFromAmPm}>

                                <option
                                    className="font-poppins text-2xl"
                                    value="AM"
                                >
                                    AM
                                </option>
                                <option
                                    className="font-poppins text-2xl"
                                    value="PM"
                                >
                                    PM
                                </option>
                            </select>

						</div>


                    <label className="font-poppins text-3xl font-medium"
                        htmlFor="">Time To:</label> 

						<div className="font-poppins text-2xl flex gap-2 items-center">
							<input className="font-poppins text-2xl w-[30px] bg-transparent border-b-2 border-[#162730] -mt-1 h-[50px] focus:outline-none no-spinners" 
                        	type="number" min={0} max={60} maxLength={2} ref={timeToHourRef} onChange={handleSetTimeToHours} onMouseOut={handleSetTimeToMouseLeave}/>	
							:
							<input className="font-poppins text-2xl w-[30px] bg-transparent border-b-2 border-[#162730] -mt-1 h-[50px] focus:outline-none no-spinners" 
                        	type="number" min={0} max={60} maxLength={2} ref={timeToMinRef} onChange={handleSetTimeToMinute} onMouseOut={handleSetTimeToMouseLeave}/>

							<label className="font-poppins text-2xl border-b-2 border-[#162730] w-[40px] h-[50px] -mt-1
                                        flex flex-row items-center scrollbar"
                                htmlFor="">{timeToAmPmSelectedValues}                                    
                       		</label> 

							<select
                                className="font-poppins text-2xl w-5 h-[50px] rounded-md -mt-1 bg-transparent focus:outline-none"
                                name="weekdays"
                                id="weekdays"
                                required
                                onChange={handleChangeTimeToAmPm}>

                                <option
                                    className="font-poppins text-2xl"
                                    value="AM"
                                >
                                    AM
                                </option>
                                <option
                                    className="font-poppins text-2xl"
                                    value="PM"
                                >
                                    PM
                                </option>
                            </select>

						</div>

                     
                </div>


            </div>
            
            <div className=" flex flex-row gap-5">
              <button className="w-[100px] h-[40px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300"
                      onClick={setSchedule}>Done</button>

              <button className="w-[100px] h-[40px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                transition-all ease-in-out duration-300"
                       onClick={() => setSched(false)}>Go Back</button>
            </div>

          </div>
          
        </div>

                {/* ////////////////////////////    View Schedules       ////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

        <div className={`${viewSched ? "flex" : "hidden"} flex bg-black bg-opacity-50 h-full w-full absolute items-center justify-center`}>

            <div className="h-[900px] w-[1000px] relative bg-[#cdc7ce] rounded-xl bg-opacity-90 flex flex-col items-center">

                <h1 className="text-3xl font-poppins font-medium mt-14">View Schedules</h1>

                <div className="h-[700px] w-[900px]">

                    <div className="relative sm:mt-6 mt-8 flex items-start w-full">

                        <h1 className="text-white text-4xl font-poppins hover:scale-110 ml-6
                                                    hover:text-fontColor transition-all duration-300
                                                        ease-linear">
                            {months[today.month()]}, {today.year()}
                        </h1>
        
                        <div className="absolute right-6 flex flex-row gap-3 text-4xl">


                                <button className="text-white font-poppins sm:hover:scale-150
                                                    transition-all duration-300 ease-in-out"
                                        onClick={() => {setToday(today.month(today.month() - 1))}}>
                                &lt;
                                </button>     

                                <button className="flex text-fontColor font-poppins
                                                hover:scale-125 rounded-lg 
                                                transition-all ease-in-out duration-300"
                                        onClick={() => {setToday(currentDate)}}>
                                                Today
                                </button>

                                <button className="text-white font-poppins sm:hover:scale-150 
                                                    transition-all duration-300 ease-in-out"
                                        onClick={() => {setToday(today.month(today.month() + 1))}}>
                                &gt;
                                </button>

                        </div>

                    </div>

                    <div className="relative flex flex-col mt-3 m-5 gap-2 text-3xl w-full h-full">

                        <div className="w-full h-10 grid grid-cols-7 text-3xl mt-4">

                            {days.map((day, index) => {
                                
                                return <h1 className="flex justify-center font-poppins text-fontColor" 
                                        key={index}>
                                            {day}
                                    </h1>
                            })}
                        </div>

                        <div className="w-full grid grid-cols-7 calendar-num-style gap-1">

                            {generateDate(today.month(), today.year()).map(
                                ({ date, currentMonth, today }, index) => {
                                    const isSetDay = days_of_weeks.includes(date.day());
                                    const isSetMonth = date.month() === month_from || date.month() === month_to;
                                    const isHighlighted = isSetDay && isSetMonth;
                                    return (
                                    <div
                                        className="flex justify-center border-t-2 border-t-primary calendar-hover-glow h-24 cursor-pointer"
                                        key={index}
                                    >
                                        <h1
                                        className={cn(
                                            currentMonth ? "" : "text-gray-600",
                                            today ? "" : "",
                                            isHighlighted ? "bg-slate-800 text-white w-full h-full text-center" : ""
                                        )}
                                        onClick={() => {
                                            if (isHighlighted) {
                                            setHighlightedDay(isHighlighted);
                                            showSchedDetails();
                                            }
                                        }}
                                        >
                                        {date.date()}
                                        </h1>
                                    </div>
                                    );
                                }
                            )}

                        </div>

                    </div>   

                </div>


                <div className="mt-10 flex flex-row relative w-full">

                    <div className="h-[60px] flex left-4 gap-4 absolute">

                            <label className="font-poppins text-2xl font-medium border-[#162730] overflow-y-hidden
                                                    flex flex-row items-center scrollbar"
                                            htmlFor="">Choose Subject:                                    
                            </label> 
                            <label className="font-poppins text-2xl font-medium border-b-2 border-[#162730] w-[300px] overflow-y-hidden
                                            flex flex-row items-center scrollbar"
                                    htmlFor="">{scheduleSubject}                                    
                            </label> 

                            <select
                            className="font-poppins text-lg w-5 h-[45px] rounded-md mt-2"
                            name="teacher"
                            id="teacher"
                            required
                            onChange={schedSelectSubject}
                            >
                            <option value="" disabled selected>Select a subject</option>
                            {teacherNameValue?.map(user => (
                                <option
                                key={user.subject_name}
                                value={user.subject_name}
                                className="font-poppins text-lg"
                                >
                                {user.subject_name}
                                </option>
                            ))}
                            </select>

                    </div>


                    <button className="w-[100px] h-[40px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                    transition-all ease-in-out duration-300 right-4 absolute"
                            onClick={viewSchedBack}>Go Back</button>
                </div>

                
                <div className={`${schedWindow ? "flex" : "hidden"} h-full w-full bg-[#cdc7ce] rounded-xl bg-opacity-90 absolute justify-center items-center`}>

                    <div className="w-[500px] h-[400px] border-2 border-black bg-slate-800 bg-opacity-70 rounded-xl font-poppins text-2xl gap-5 text-gray-200 flex flex-col p-10">
                        <h1 className="w-full text-center text-3xl text-gray-100">{subject_name}</h1>
                        <div className="flex gap-2">
                            <h1 className="text-black">Teacher:</h1>
                            <h1>{teacher_name}</h1>
                        </div>
                        <div className="flex gap-2">
                            <h1 className="text-black">Location:</h1>
                            <h1>{location}</h1>
                        </div>
                        <div className="flex gap-2">
                            <h1 className="text-black">Month From:</h1>
                            <h1>{month_from_name}</h1>
                        </div>
                        <div className="flex gap-2">
                            <h1 className="text-black">Month To:</h1>
                            <h1>{month_to_name}</h1>
                        </div>
                        <div className="flex gap-2">
                            <h1 className="text-black">Time:</h1>
                            <h1>{time_from}</h1>
                            <h1 className="text-black"> until</h1>
                            <h1> {time_to}</h1>
                            
                        </div>

                    </div>

                    <button className="w-[100px] h-[40px] text-2xl font-semibold border-2 rounded-lg border-black hover:scale-110 hover:border-[#40434a]
                                    transition-all ease-in-out duration-300 absolute bottom-4"
                            onClick={() => setSchedWindow(false)}>Go Back</button>
                </div>

            </div>

        </div>

      {/* /////////// Last /////////// */}
      </div>

      {/*  */}



    </div>
  )
}

export default App
