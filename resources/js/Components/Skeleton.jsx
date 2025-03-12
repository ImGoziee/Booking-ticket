import React from "react";

const Skeleton = () => {
    return (
        <div className="ticket-card relative flex flex-col animate-pulse">
            <div className="w-full min-h-52 p-2 pb-0">
                <div className="bg-[#DDDAE7] dark:bg-zinc-800 w-full h-full rounded-lg"></div>
            </div>
            <div className="w-full h-full flex flex-col gap-2 px-4 justify-center">
                <div className="bg-[#DDDAE7] dark:bg-zinc-800 h-5 rounded w-3/4"></div>
                <div className="flex items-center">
                    <div className="bg-[#DDDAE7] dark:bg-zinc-800 h-4 w-4 rounded mr-2"></div>
                    <div className="bg-[#DDDAE7] dark:bg-zinc-800 h-4 rounded w-20"></div>
                </div>
                <div className="flex items-center">
                    <div className="bg-[#DDDAE7] dark:bg-zinc-800 h-4 w-4 rounded mr-2"></div>
                    <div className="bg-[#DDDAE7] dark:bg-zinc-800 h-4 w-1/2 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default Skeleton;
