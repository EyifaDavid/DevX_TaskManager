import React from 'react';
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { MdDashboard, MdOutlineAddTask, MdOutlinePendingActions, MdSettings, MdTaskAlt } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import devX from "../assets/images/devx.jpg"
import { Link, NavLink, useLocation } from 'react-router-dom';
import { setOpenSidebar } from '../redux/slices/authSlice';
import clsx from 'clsx';
import DarkModeToggle from './darkModeToggle';

const linkData=[
    {
        Label:"Dashboard",
        link:"dashboard",
        icon:<MdDashboard/>
    },
    {
        Label:"Tasks",
        link:"tasks",
        icon:<FaTasks/>
    },
    {
        Label:"Completed",
        link:"completed/completed",
        icon:<MdTaskAlt/>
    },
    {
        Label:"In Progress",
        link:"in-progress/in progress",
        icon:<MdOutlinePendingActions/>
    },
    {
        Label:"To Do",
        link:"todo/todo",
        icon:<MdOutlinePendingActions/>
    },
    {
        Label:"Team",
        link:"team",
        icon:<FaUsers/>
    },
    {
        Label:"Trash",
        link:"trashed",
        icon:<FaTrashAlt/>
    },
];

const Sidebar = () => {

    const {user}= useSelector((state)=>state.auth);

    const dispatch = useDispatch()
    const location = useLocation()
    
    const path = location.pathname.split("/")[1]

    const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0,5);

    const closeSidebar =()=>{
        dispatch(setOpenSidebar(false));
    }

    const NavLink =({el}) => {
        return(
            <Link to={el.link} onClick={closeSidebar}
            className={clsx("w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 dark:text-white text-base hover:bg-[#2564ed2d]",
                path === el.link.split("/")[0] ? "bg-blue-700 text-white " : "not-only:"
            )}>
                {el.icon}
                <span className='hover:text-[#2564ed]'>{el.Label}</span>
            </Link>
        )
    }
  return (
    <div className='w-full h-full flex flex-col gap-6 p-5'>
        <h1 className='flex gap-1 items-center'>
        <img src={devX}
        className=' p-2 rounded-full w-25'>
        </img>
        <span className='text-2xl font-bold text-black dark:text-white'>Task Manager</span>
        </h1>
        
        <div className='flex-1 flex-col gap-y-5 py-8'>
            {
                sidebarLinks.map((link)=>(
                    <NavLink el={link} key={link.Label}/>
                ))
            }
        </div>

        <nav className="p-4 bg-white dark:bg-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">App theme</h1>
        <DarkModeToggle />
      </div>
    </nav>
    </div>
  )
}

export default Sidebar