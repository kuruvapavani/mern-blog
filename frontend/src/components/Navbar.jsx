import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faSun, faMoon, faGraduationCap, faLock, faBook, faUserPlus, faArchive, faCircleHalfStroke, faFolderOpen, faGreaterThan, faLessThan, faChevronCircleRight, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import logo from "./logo.png";
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faClock, faComments } from '@fortawesome/free-regular-svg-icons';
import Dropdown from './Dropdown';
import ListItem from './ListItem';
import GettingStarted from './GettingStarted';
import Contact from './Contact';

const Navbar = () => {
  const currentUrl = window.location.pathname;
  const segments = currentUrl.split('/').filter(segment => segment !== '');
  const decodedSegments = segments.map(segment => decodeURIComponent(segment));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const dropdown1Items = [
    { label: 'Dashboard', link: '#' },
    { label: 'Settings', link: '#' },
    { label: 'Earnings', link: '#' },
    { label: 'Sign out', link: '#' },
  ];
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const [notificationVisible, setNotificationVisible] = useState(true);

  const toggleNotification = () => {
    setNotificationVisible(!notificationVisible);
  };

  const sidebarClass = `fixed top-0 left-0 z-40 w-65 sm:w-70 h-screen transition-transform ${
    sidebarOpen ? '-translate-x-0' : '-translate-x-full'
  } sm:translate-x-0 ${darkMode ? 'dark:bg-gray-800' : 'bg-gray-50'}`;

  const pageContentClass = `p-4 sm:ml-64 pl-10 ${
    darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
  }`;

  return (
    <div>
      {/* Notification Section */}
      <div className={`bg-blue-600 p-3 text-white text-center flex justify-center ${notificationVisible ? 'w-full' : 'hidden'} notification`}>
        <p style={{textWrap:"nowrap"}}>Enable browser notifications to avoid missing out an important activity.</p>
        <button className='bg-blue-600 hover:bg-blue-700' style={{textWrap:"nowrap",fontSize:"0.3rem"}}>Enable Notification <FontAwesomeIcon icon={faBell} /></button>
        <button onClick={toggleNotification} className="absolute top-4 right-4 z-50">
          <FontAwesomeIcon icon={faClock} className="text-white text-xs" />
        </button>
      </div>
      <div>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className={sidebarClass}
        aria-label="Sidebar"
      >
        {/* Close button at the top of sidebar */}
        {isMobile && (
          <button
            className="absolute top-0 right-0 m-1 text-gray-500 hover:text-gray-900 focus:outline-none bg-red"
            onClick={closeSidebar}
          >
            <span className="sr-only ">Close sidebar</span>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}

        {/* Sidebar content */}

{/* Sidebar content */}
<div className="h-full px-3 py-4 overflow-y-auto">
  <ul className="space-y-2 font-medium">
    <li className='pt-0 flex'>
      <a href="/dashboard" className={`flex items-center p-2 rounded-lg group ${darkMode ? 'text-white ' : 'text-black'}`}>
        <img src={logo} alt="Logo" className="w-10 h-10 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
        <span className="ms-3">Dashboard</span>
      </a>
      <a className={`p-4 ${darkMode ? 'text-white' : 'text-black'}`} href='/notifications'>
      <button>
      <FontAwesomeIcon icon={faBell} className='pl-10'/>
      </button>
      </a>
    </li>
    <li>
      <form className="max-w-md mx-auto">   
          <label htmlFor="default-search" className={`mb-2 text-sm font-medium sr-only ${darkMode ? 'text-white' : 'text-black'}`}>Search</label>
          <div className="relative">
             <input type="search" id="default-search" className={`block w-full p-3 pr-16 ps-2 text-xs border border-gray-300 rounded-lg focus:ring-gray-500 focus:border-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-gray-500 ${darkMode ? 'text-white bg-gray-700 dark:bg-gray-700' : 'text-black bg-gray-50 dark:bg-gray-100'}`} placeholder="Ask your AI assistant" required />
              <button type="submit" className={`absolute end-2.5 bottom-2 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-1 ${darkMode ? 'text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800' : 'text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'}`}><FontAwesomeIcon icon={faSearch} /></button>
          </div>
      </form>
    </li>
    <li className='pt-2 text-left pb-3'>
      <div className={`h-auto w-full p-2  text-sm rounded-md m4 p-1.5 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}>
        <h1 className='text-sm'>Your team used 8/50 docs.</h1>
        <p className='text-2xs text-gray-500'>Upgrade to create unlimited docs</p>
      </div>
    </li>
    <ListItem name="catch-up" link="/catch-up" icon={faClock} darkMode={darkMode} />
    <ListItem name="Discussions" link="/Discussions" icon={faComments} darkMode={darkMode} />
    <p className={`text-base ${darkMode ? 'text-white' : 'text-black'} text-left`}>Favourites</p>
    <ListItem name="👋 Getting Started" link="/favourites/getting-started" darkMode={darkMode} />
    <p className={`text-base ${darkMode ? 'text-white' : 'text-black'} text-left`}>My Channels</p>
    <Dropdown title="My Private Channel" items={dropdown1Items} darkMode={darkMode} faicon={faLock}/>
    <Dropdown title="Engineering" items={[
      { label: 'Item 1', link: '/My Private Channel/👋 Getting Started' }
    ]} darkMode={darkMode} faicon={faGraduationCap}/>
    <Dropdown title="Product" items={dropdown1Items} darkMode={darkMode} faicon={faBook}/>
    <div className='relative bottom-0 pt-5'>
      <ListItem icon={faUserPlus} name="Add People" link="/add" darkMode={darkMode}/>
      <ListItem icon={faArchive} name="Archieve" link="/archieve" darkMode={darkMode}/>
      <ListItem icon={faCircleHalfStroke} name="Add People" link="/add" iconclass="rotate-45"darkMode={darkMode}/>
      <ListItem icon={faUserPlus} name="Add People" link="/add" darkMode={darkMode}/>
    </div>
  </ul>
</div>
      </aside>

      {/* Dark mode toggle button */}
      <button
        className="fixed bottom-4 right-4 z-50 p-3 bg-white rounded-full w-15 h-15 shadow-md focus:outline-none text-center"
        onClick={toggleDarkMode}
      >
        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className={darkMode ? 'text-black' : 'text-black'} />
      </button>

      {/* Main content */}
      <div className={pageContentClass}>
  <div className={`flex justify-between ${darkMode ? 'text-gray-500' : 'text-white'}`}>
    <div className='flex text-gray-500 text-sm'>
      <FontAwesomeIcon icon={faFolderOpen} className='text-gray-300 pl-0 pr-3 pt-2 text-xs'/>
      <FontAwesomeIcon icon={faLessThan} className='text-gray-300  pr-1 text-xs pt-2'/>
      <FontAwesomeIcon icon={faGreaterThan} className='text-gray-300 text-xs pr-2 pt-2' />
      <ul className='flex' style={{ flexWrap: 'nowrap' }}>
          <li className={`pl-3 pt-1 text-sm ${!darkMode ? 'text-gray-500' : 'text-white'}`} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <FontAwesomeIcon icon={faChevronCircleRight} className='text-xs text-gray-300 pr-1'/>
👋 Getting Started
          </li>
      </ul>
      </div>
      <div className={`flex flex-grow justify-end  text-sm ${!darkMode ? 'text-gray-500' : 'text-white'}`}>
        <span className='pl-2 pt-1'>Share</span>
        <span className='pl-2 pt-1'><FontAwesomeIcon icon={faComments} /></span>
        <span className='pl-2 pt-1'>⭐</span>
        <span className='pl-2 pt-1 pr-1'><FontAwesomeIcon icon={faEllipsisVertical} /></span>
        {/* Add more options here */}
      </div>
  </div>
  <GettingStarted darkMode={darkMode}/>
  <Contact />
</div>
    </div>
    </div>
  );
};

export default Navbar;
