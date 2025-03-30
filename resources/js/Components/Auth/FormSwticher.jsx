import React from 'react'
import { motion } from 'framer-motion';
import Logo from "../../../../public/assets/image/logooosss.png";

const FormSwticher = ({ isLogin, handleClick, process, processing }) => {
    return (
        <motion.div
            id="card"
            className="absolute w-1/2 h-full"
            animate={{
                right: isLogin ? 0 : "auto",
                left: isLogin ? "auto" : 0,
            }}
            initial={{
                right: 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
            <div className="relative p-1 h-full">
                <img className='relative login-image rounded-2xl opacity-80 z-10' src="assets/image/LoginBanner.png" alt="" />
                <div className="absolute z-50 top-0 flex flex-col items-center justify-end h-full w-full py-28">
                    <div className='text-[#0A34C2] dark:text-yellow-50 flex gap-2 font-bold text-2xl mb-4'>
                        <img width={30} src={Logo} alt="Logo" className='rounded-md' />
                        <h1>Qickets.</h1>
                    </div>
                    <h2 className='text-3xl font-medium text-gray-950'>{isLogin ? "Reconnect with Us" : "Get Started with Us"}</h2>
                    <p className='text-sm mt-2 max-w-[17rem] text-center text-gray-800'>{isLogin ? 'Securely sign in to manage your account and stay connected with us.' : 'Join us today and explore an exciting world of concerts and events.'}</p>
                    <button
                        type='button'
                        onClick={handleClick}
                        className={`mt-7 rounded-lg bg-[#E8E6EF] py-4 text-sm font-medium text-[#171717] transition duration-150 ease-in-out hover:bg-gray-200 w-[50%] ${process ? "opacity-50" : ""}`}
                        disabled={processing}
                    >
                        <span className=''>{isLogin ? 'No Account Yet? ' : 'Have an Account? '}</span><span className='ml-0.5 text-indigo-600'>{isLogin ? 'Sign Up' : 'Sign In'} Now</span>
                    </button>
                </div>
            </div>
            <h3 className='absolute bottom-6 left-[calc(50%+0.5rem)] -translate-x-1/2 text-xs text-gray-600'>© Ibnu Muhammad Gozie Tugas Akhir - 2025</h3>
        </motion.div>
    )
}

export default FormSwticher