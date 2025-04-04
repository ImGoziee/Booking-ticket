import TicketCatAccordion from '@/Components/TicketCatAccordion';
import Venue from '@/Components/Venue';
import MainLayout from '@/Layouts/MainLayout'
import { usePage, Link, Head } from '@inertiajs/react';
import { CalendarDays, MapPin } from 'lucide-react';
import React, { useState, useEffect } from 'react'

const Skeleton = () => {
    return (
        <div className='bg-[#f2f2f2] dark:bg-[#171717] shadow-md w-full h-[420px] animate-pulse rounded-2xl'>
            <div className='h-full relative z-10 flex justify-between items-center px-8'>
                <div className='flex flex-col gap-4'>
                    <div>
                        <div className="bg-[#DDDAE7] dark:bg-zinc-800 w-[30rem] h-10 rounded-xl mb-4" />
                        <div className="bg-[#DDDAE7] dark:bg-zinc-800 w-[25rem] h-10 rounded-xl" />
                    </div>
                    <div>
                        <div className="bg-[#DDDAE7] dark:bg-zinc-800 w-[23rem] h-5 rounded-lg mb-4" />
                        <div className="bg-[#DDDAE7] dark:bg-zinc-800 w-[10rem] h-5 rounded-lg" />
                    </div>
                    <div className='bg-[#DDDAE7] dark:bg-zinc-800 w-52 h-14 rounded-lg' />
                </div>
                <div className="bg-[#DDDAE7] dark:bg-zinc-800 w-[500px] h-[280px] rounded-xl" />
            </div>
        </div>
    )
}

const EventsDetail = () => {
    const { events, tickets } = usePage().props;
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCat, setSelectedCat] = useState(null);

    useEffect(() => {
        if (events) {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }, [events]);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 500);
        }
    }, []);


    return (
        <MainLayout>
            <Head title={events.name} />
            <div className="mb-40">
                {isLoading ? Skeleton() : (
                    <div className='border-[#DDDAE7] dark:border-stone-900 border w-full h-[420px] bg-cover relative overflow-hidden rounded-2xl shadow-md' style={{ backgroundImage: `url(${events.images})`, backgroundPosition: 'center -64px' }}>
                        <div className='bg-black/50 backdrop-blur absolute w-full h-full' />
                        <div className='from-white to-transparent dark:from-black dark:via-transparent absolute w-full h-full bg-gradient-to-r ' />
                        <div className='h-full relative z-10 flex justify-between items-center px-8'>
                            <div className='flex flex-col gap-4'>
                                <h1 className="text-5xl max-w-[30rem] font-bold event-detail-title">{events.name}</h1>
                                <div className='text-[#5447FF] dark:text-yellow-200 font-medium w-full'>
                                    <div className='flex items-center gap-2'>
                                        <CalendarDays size={15} />
                                        <p>{new Date(events.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <MapPin size={15} />
                                        <p>{events.location}</p>
                                    </div>
                                </div>
                                <p className="text-[#474747] dark:text-gray-400 text-lg max-w-[30rem] leading-6 font-medium">{events.description}</p>
                                <Link
                                    as='button'
                                    href="#packages"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        document.getElementById('packages')?.scrollIntoView()
                                    }}
                                    className="bg-[#5447FF] hover:bg-[#1636F7] text-[#f2f2f2] duration-200 max-w-fit py-3 px-6 text-lg rounded-lg">
                                    View Packages
                                </Link>
                            </div>
                            <div className="w-[500px] h-[250px] rounded-xl overflow-hidden">
                                <img
                                    src={events.images}
                                    alt={events.name}
                                    className="w-full h-full object-fit"
                                />
                            </div>
                        </div>
                    </div>
                )}
                <div id='packages' className='flex justify-between gap-6 mt-10 scroll-mt-24'>
                    <TicketCatAccordion getCat={tickets} isLoading={isLoading} onCategorySelect={setSelectedCat} />
                    <Venue getCategory={selectedCat} />
                </div>
            </div>
        </MainLayout>
    )
}

export default EventsDetail