import { AudioLines } from 'lucide-react'
import React from 'react'
import Carousel from './Carousel'

const Hero = () => {
    return (
        <div className="flex">
            <div className="mt-10 w-full">
                <div className='flex max-md:flex-col items-center justify-between'>
                    <div className="text-gray-300 hero-text-header text-xl md:text-3xl max-md:flex max-md:mb-4 font-bold">
                        <div className="flex items-center gap-2">
                            <AudioLines className='text-[#5447FF] dark:text-yellow-200' />
                            <span className='tracking-tight'>Get Ready for the Ultimate</span>
                        </div>
                        <div className='tracking-tight'>Live Experience.</div>
                    </div>
                    <div className='max-w-[20rem]'>
                        <p
                            className='text-end max-md:text-center text-sm hero-text-desc'
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            "Explore top concerts, buy tickets easily, and experience live music moments."
                        </p>
                    </div>
                </div>
                <Carousel />
            </div>
        </div>
    )
}

export default Hero