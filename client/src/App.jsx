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

  return user && user.role === "admin" ? (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-1/5 h-screen bg-white sticky top-0 hidden md:block">
        <Sidebar/>
      </div>
       <MobileSidebar/>

       <div className="flex-1 Overflow-y-auto bg-blue-200">
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
     <Transition
            show= {isSidebarOpen}
            as={Fragment}
            enter='transition-opacity duration-700'
            enterFrom='opacity-x-10'
            enterTo='opacity-x-100'
            leave='transition-opacity duration-700'
            leaveFrom='opacity-x-100'
            leaveTo='opacity-x-0'
          >
     {(ref) => (
      <div 
      ref={(node)=> (mobileMenuRef.current=node)}
      className={clsx(
        "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform"
        , isSidebarOpen ? "translate-x-0": "translate-x-full"
      )}
      
      onClick={() => closeSidebar()}>

        <div className="bg-white w-2/4 h-full"> 
          <div className="w-full flex justify-end px-5 mt-5"> 
            <button
            onClick={()=>closeSidebar()}
            className="flex justify-end items-end">
              <IoMdClose size={25}/>
            </button>
          </div>
          <div className="mt-10">
            <Sidebar/>
          </div>
        </div>
      </div>
     )}       
          </Transition>
    </>
  )
}


function App() {
  return (
    <main className='w-full min-h-screen bg-white'>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Navigate to='/Dashboard' />}/>
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