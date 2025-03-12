import React, { useState } from 'react'
import { BsStars } from "react-icons/bs";
import { MapPin, Calendar, Ticket, Search } from 'lucide-react';

export const FindTickets = ({ onSearch, isLoading }) => {
    const [formData, setFormData] = useState({
        // location: '',
        // fromDate: '',
        // toDate: '',
        artist: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isEmptySearch = Object.values(formData).every(value => value.trim() === "");
    
        if (isEmptySearch) {
            onSearch(null);
        } else {
            onSearch(formData);
        }
    };

    return (
        <section id='find-tickets'>
            <div className="flex mb-4 gap-2">
                <BsStars className='text-[#5447FF]' size={25} />
                <h1 className='dark:text-[#f2f2f2] text-xl font-bold'>Find Tickets</h1>
            </div>
            <div className='bg-[#f2f2f2] dark:bg-[#1C1C1E] shadow-md flex w-full py-4 px-4 rounded-xl relative overflow-hidden'>
                {
                    isLoading && <div className='bg-black/30 dark:bg-black/70 absolute flex justify-center items-center w-full h-full top-0 left-0'><div className="loader" /></div>
                }
                <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 max-lg:gap-3 items-center w-full">
                    {/* Location */}
                    <div className="flex-1 min-w-[200px]">
                        <label className="find-ticket-label">
                            <MapPin size={16} />
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            placeholder='Seattle'
                            className="find-ticket-input"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>

                    {/* From Date */}
                    <div className="flex-1 min-w-[200px]">
                        <label className="find-ticket-label">
                            <Calendar size={16} />
                            From Date
                        </label>
                        <input
                            type="text"
                            name="fromDate"
                            placeholder="+ Add date"
                            className="find-ticket-input"
                            value={formData.fromDate}
                            onChange={handleChange}
                        />
                    </div>

                    {/* To Date */}
                    <div className="flex-1 min-w-[200px]">
                        <label className="find-ticket-label">
                            <Calendar size={16} />
                            To Date
                        </label>
                        <input
                            type="text"
                            name="toDate"
                            placeholder="+ Add date"
                            className="find-ticket-input"
                            value={formData.toDate}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Events / Artist */}
                    <div className="max-lg:flex-1 max-lg:min-w-[200px]">
                        <label className="find-ticket-label">
                            <Ticket size={16} />
                            Events / Artist
                        </label>
                        <input
                            type="text"
                            name="artist"
                            placeholder="Nirvana"
                            className="find-ticket-input"
                            value={formData.artist}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Search Button */}
                    <div className="flex max-lg:justify-end lg:items-end max-lg:w-full lg:h-full">
                        <button
                            type="submit"
                            className="text-[#f2f2f2] bg-[#5447FF] hover:bg-[#1636F7] px-2 py-2 rounded-md focus:outline-none"
                        >
                            <Search />
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}