import React from "react";
import { motion } from "framer-motion";
import { FaLocationDot } from "react-icons/fa6";

const Venue = ({ getCategory }) => {

    const getBgColor = (category) => getCategory === category ? "!bg-[#DDDAE7] dark:!bg-stone-400" : "bg-[#fff] hover:bg-[#DDDAE7] dark:bg-stone-300 dark:hover:bg-stone-400";

    const boxPositions = {
        "CAT 3": { left: "calc(50% - 1rem)", top: "calc(1rem - 15px)" },
        "CAT 2A": { left: "calc(25% - 1rem)", top: "calc(6rem - 20px)" },
        "CAT 2B": { left: "calc(75% - 1rem)", top: "calc(6rem - 20px)" },
        "CAT 1A": { left: "calc(30% - 1.5rem)", top: "calc(10rem - 10px)" },
        "CAT 1B": { left: "calc(70% - 1rem)", top: "calc(10rem - 10px)" },
    };

    return (
        <div className="text-black">
            <h1 className="dark:text-white text-xl font-medium">Venue</h1>
            <div className="bg-[#f2f2f2] dark:bg-stone-800 rounded-xl shadow-md mt-6 p-10">
                <div className="relative p-6 w-[450px] h-[320px]">
                    {/* MARKER */}
                    {getCategory && (
                        <motion.div
                            className="absolute z-30"
                            animate={boxPositions[getCategory] || { left: "50%", top: "50%" }}
                            transition={{ type: "tween", duration: 0.35 }}
                        >
                            <FaLocationDot size={30} className="text-red-500" />
                        </motion.div>
                    )}
                    <div
                        className={`${getBgColor("CAT 3")} absolute duration-200 flex justify-center items-center w-80 h-20 top-1.5 left-1/2 -translate-x-1/2`}
                        style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)" }}
                    >
                        <p className="font-bold">CAT 3</p>
                    </div>
                    <div
                        className={`${getBgColor("CAT 2A")} absolute duration-200 w-[270px] h-24 right-0 -translate-x-[calc(100%-2.7rem)] top-[calc(5rem+0.7rem)]`}
                        style={{ clipPath: "polygon(50% 0%, 100% 0, 100% 76%, 32% 60%, 24% 90%, 10% 40%, 30% 0)" }}
                    >
                        <p className="relative left-32 top-5 font-bold">CAT 2 A</p>
                    </div>
                    <div
                        className={`${getBgColor("CAT 2B")} absolute duration-200 w-[270px] h-24 left-0 translate-x-[calc(100%-2.7rem)] top-[calc(5rem+0.7rem)]`}
                        style={{ clipPath: "polygon(0 0, 45% 0, 70% 0, 90% 40%, 76% 90%, 68% 60%, 0 76%)" }}
                    >
                        <p className="relative left-20 top-5 font-bold">CAT 2 B</p>
                    </div>
                    <div
                        className={`${getBgColor("CAT 1A")} absolute duration-200 w-60 h-20 right-0 -translate-x-[calc(100%-0.8rem)] top-[calc(5rem+4.6rem)]`}
                        style={{ clipPath: "polygon(25% 0, 100% 20%, 100% 100%, 65% 100%, 7% 70%)" }}
                    >
                        <p className="relative left-28 top-7 font-bold">CAT 1 A</p>
                    </div>
                    <div
                        className={`${getBgColor("CAT 1B")} absolute duration-200 w-60 h-20 left-0 translate-x-[calc(100%-0.8rem)] top-[calc(5rem+4.6rem)]`}
                        style={{ clipPath: "polygon(75% 0, 95% 75%, 35% 100%, 0 100%, 0 20%)" }}
                    >
                        <p className="relative left-14 top-7 font-bold">CAT 1 B</p>
                    </div>
                    <div
                        className="absolute flex justify-center bg-blue-600 text-blue-50 w-56 h-40 left-1/2 -translate-x-1/2 top-[calc(10rem+4.9rem)]"
                        style={{ clipPath: "polygon(0 0, 100% 0, 85% 40%, 15% 40%)" }}
                    >
                        <p className="relative top-5 font-bold">STAGE</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Venue;
