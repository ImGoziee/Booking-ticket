import { Link, usePage } from '@inertiajs/react';
import { LogOut, User } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import Logo from "../../../public/assets/image/logooosss.png";
import { TbSunFilled } from "react-icons/tb";
import { BsFillMoonStarsFill } from "react-icons/bs";

const Navbar = () => {
  const { auth } = usePage().props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const menuItems = [
    { title: 'Home', path: 'home' },
    // { title: 'Events', path: 'tickets' },
    { title: 'My Ticket', path: 'myticket' },
  ];

  // const [activeMenu, setActiveMenu] = useState(0);
  const activeMenu = menuItems.findIndex((item) => {
    return route().current(item.path);
  });

  const [theme, setTheme] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('theme') || 'light' : 'light'
  );

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  return (
    <header className='bg-white/50 dark:bg-black/50 fixed top-0 w-full z-50 backdrop-blur-md'>
      <nav className='max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between gap-10'>
        <Link tabIndex={-1} as='button' href={route('home')} className='text-[#0A34C2] dark:text-yellow-50 flex gap-2 font-bold text-3xl'>
          <img width={35} src={Logo} alt="Logo" className='rounded-md' />
          <h1>Qickets.</h1>
        </Link>
        <div className='bg-[#D0CEDE] dark:bg-gray-600 h-6 w-[1px] max-md:hidden' />
        <div className='flex flex-1 max-md:hidden'>
          {menuItems.map((item, i) => (
            <Link
              href={route(item.path)}
              as='button'
              key={i}
              className={`${activeMenu === i && 'bg-[#f2f2f2] dark:bg-[#252525] shadow-md rounded-lg'} dark:text-[#f2f2f2] text-sm border-2 border-transparent font-medium px-4 py-2`}
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className='dark:text-[#f2f2f2] flex items-center gap-6'>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className={`bg-[#f2f2f2] dark:bg-[#171717] text-[#5447FF] dark:text-yellow-200 p-2 rounded-xl shadow-md`}>
            {
              theme === 'dark' ? (
                <TbSunFilled size={20} />
              ) : (
                <BsFillMoonStarsFill size={20} />
              )
            }
          </button>
          <div className='bg-[#D0CEDE] dark:bg-gray-600 h-6 w-[1px]' />
          {auth.user ? (
            <div className='relative z-20'
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}>
              {auth.user && (
                <div className='bg-[#f2f2f2] hover:bg-[#f2f2f2] dark:bg-[#171717] dark:hover:bg-[#252525] shadow-md flex gap-2 py-2 px-4 rounded-xl cursor-pointer duration-200'>
                  <span>{auth.user.name}</span>
                  <User size={20} className='text-[#5447FF]' />
                </div>
              )}

              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className='absolute right-0 mt-0 w-40 z-10 pt-2'
                >
                  <div className='bg-[#f2f2f2] dark:bg-[#252525] shadow-md w-full rounded-lg p-2'>
                    <Link as='button' href={route("profile.edit")} className='hover:bg-white dark:text-white dark:hover:bg-[#1C1C1E] hover:shadow-sm flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg w-full'>
                      <User size={16} /> Profile
                    </Link>
                    <Link
                      href={route("logout")}
                      method="post"
                      as="button"
                      className='hover:bg-white dark:text-white dark:hover:bg-[#1C1C1E] hover:shadow-sm flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg w-full text-left'
                    >
                      <LogOut size={16} /> Logout
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>

          ) : (
            <Link as='button' href={route("login")} className={`text-[#f2f2f2] bg-[#5447FF] dark:bg-blue-700 hover:bg-[#1636F7] duration-200 !font-medium py-2 px-6 rounded-full`}>Log in</Link>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar