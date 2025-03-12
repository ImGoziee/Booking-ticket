import React from "react";
import Logo from "../../../public/assets/image/logooosss.png";
import { Link } from "lucide-react";

const Footer = () => {
    return (
        <footer className="dark:text-white bg-[#f2f2f2] dark:bg-[#171717] flex flex-col justify-center text-center items-center p-10">
            <aside className="flex flex-col gap-5 justify-center">
                <div className='flex flex-col items-center justify-center gap-2 text-[#0A34C2] dark:text-yellow-50'>
                    <img width={35} src={Logo} alt="Logo" className='rounded-md' />
                    <p className="font-bold">
                        Lorem, ipsum dolor.
                        <br />
                        Lorem ipsum dolor sit amet.
                    </p>
                </div>
                <p>
                    Copyright © {new Date().getFullYear()} - All right reserved
                </p>
            </aside>
        </footer>
    );
};

export default Footer;
