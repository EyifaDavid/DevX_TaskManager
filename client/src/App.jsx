import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from 'sonner';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Task from './pages/Task';
import TaskDetails from './pages/TaskDetails';
import Trash from './pages/Trash';
import { setOpenSidebar } from "./redux/slices/authSlice";
import Team from "./pages/Team";


function Layout (){
  const { user } = useSelector((state) => state.auth);
  const location = useLocation()

  console.log("User from Redux:", user);

  return user ? (
    <div className="w-full min-h-screen flex flex-col md:flex-row">
      <div className="w-1/5 h-screen bg-white dark:bg-gray-800 sticky top-0 hidden md:block">
        <Sidebar/>
      </div>
       <MobileSidebar/>

       <div className="flex-1 Overflow-y-auto bg-white dark:bg-gray-800">
        <Navbar/>

        <div className="p-4 2xl:px-10">
        <Outlet/>
       </div>
       </div>
      
    </div>
  ):(
    <Navigate to= "/log-in" state={{from: location}} replace/>
  )

}

const MobileSidebar = ()=>{
  const {isSidebarOpen} = useSelector((state)=>state.auth);
  const mobileMenuRef = useRef(null)
  const dispatch = useDispatch();

  const closeSidebar = ()=> {
    dispatch(setOpenSidebar(false))
  }

  return(
     <>
    <Transition show={isSidebarOpen} as={Fragment}>
  <div className="fixed inset-0 z-50 flex">
    {/* Overlay */}
    <div
      className="fixed inset-0 bg-black/40"
      onClick={closeSidebar}
    />

    {/* Sliding panel */}
    <Transition.Child
      as={Fragment}
      enter="transition ease-in-out duration-300 transform"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
      leave="transition ease-in-out duration-300 transform"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
    >
      <div
        className="relative w-3/5 max-w-xs h-full bg-white dark:bg-gray-800 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end p-4">
          <button onClick={closeSidebar}>
            <IoMdClose size={24} />
          </button>
        </div>
        <Sidebar />
      </div>
    </Transition.Child>
  </div>
</Transition>
    </>
  )
}


function App() {
  return (
    <main className='w-full min-h-screen bg-white'>
      <Routes>
        <Route element={<Layout />}>
          <Route index path='/' element={<Navigate to='/dashboard' />}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/tasks' element={<Task/>}/>
          <Route path='/completed/:status' element={<Task/>}/>
          <Route path='/in-progress/:status' element={<Task/>}/>
          <Route path='/todo/:status' element={<Task/>}/>
          <Route path='/team' element={<Team/>}/>
          <Route path='/trashed' element={<Trash/>}/>
          <Route path='/task/:id' element={<TaskDetails/>}/>
        </Route>

        <Route path='/Log-in' element={<Login/>}/>
      </Routes>

      <Toaster richColors/>
    </main>
  );
}

export default App