import React from 'react'
import userPlaceholder from "../../../../public/assets/image/user-placeholder.png"

const UsersCard = ({ users }) => {
    return (
        <>
            {users.map((user, i) => (
                <div
                    key={i}
                    className='relative border border-[#171717] col-span-2 h-64 rounded-xl overflow-hidden'
                >
                    <div className='h-[45%] flex justify-center items-center'>
                        <div className='overflow-hidden rounded-full border-4 border-white ring-2 ring-zinc-700'>
                            <img width={65} src={userPlaceholder} className='' alt="Users Placeholder" />
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full">
                        <h1 className='capitalize text-white font-semibold rounded-lg'>{user.name}</h1>
                        <p className='text-zinc-400 text-xs'>{user.email}</p>
                    </div>
                    <div className='absolute bottom-0 w-full h-[20%] flex gap-2 p-2 text-sm'>
                        <button className='duration-200 w-1/2 rounded-md bg-blue-800 hover:bg-blue-950'>Edit</button>
                        <button className='duration-200 w-1/2 rounded-md bg-[#181818] hover:bg-[#131313]'>Delete</button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default UsersCard