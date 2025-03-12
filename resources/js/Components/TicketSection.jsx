import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import { LuArrowUpRight } from "react-icons/lu";
import Skeleton from './Skeleton';
import { motion } from 'framer-motion';
import { CalendarDays, MapPin } from 'lucide-react';
const UpcomingSkeleton = () => {
  return (
    <div className='bg-gradient-to-b from-[#f2f2f2] to-white dark:from-[#171717] dark:to-[#171717] my-4 min-w-44 max-w-44 min-h-72 max-md:min-w-full max-md:min-h-20 rounded-xl animate-pulse shadow-md'>
      <div className='flex flex-col gap-2 justify-center p-4 h-full'>
        <div className='w-36 h-9 bg-[#DDDAE7] dark:bg-zinc-800 rounded-lg' />
        <div className='w-28 h-8 bg-[#DDDAE7] dark:bg-zinc-800 rounded-lg' />
      </div>
    </div>
  );
};

const TicketSection = ({ SectionType, ticketData, isLoading, skeletonCount = 4 }) => {

  const [isHovered, setIsHovered] = useState(null);

  const skeletons = Array(skeletonCount).fill().map((_, index) => (
    <Skeleton key={`skeleton-${index}`} />
  ));

  if (SectionType === 'search-results' && !isLoading && (!ticketData || ticketData.length === 0)) {
    return (
      <section className="mb-10">
        <div className="mb-3">
          <p className="text-xl font-medium">Search Results</p>
        </div>
        <div className="bg-[#f2f2f2] dark:bg-[#1C1C1E] flex justify-center items-center py-20 rounded-xl shadow-md">
          <p className="dark:text-gray-400 text-lg">No events found matching your search criteria</p>
        </div>
      </section>
    );
  }

  return (
    <section className={`mb-10 gap-2 ${SectionType === 'upcoming' && 'flex max-md:flex-col'}`}>
      {
        SectionType === 'upcoming' ? (
          isLoading ? UpcomingSkeleton() :
            <div className='min-w-44 max-w-44 my-4 max-md:min-w-full max-md:h-16 rounded-xl' style={{ backgroundImage: `url('assets/image/grain-grad.png')`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
              <div className='group hover:bg-transparent duration-200 flex flex-col justify-center max-md:items-center md:px-4 h-full w-full'>
                <h1 className='text-[#f2f2f2] dark:text-gray-300 dark:group-hover:text-[#f2f2f2] text-xl md:text-3xl font-bold leading-7'>Upcoming <span className="inline-flex items-center relative">Events<LuArrowUpRight className="absolute -right-8 top-0.5 text-yellow-200 group-hover:text-yellow-400 max-md:hidden" size={30} /></span></h1>
              </div>
            </div>
        ) : SectionType === 'ongoing' ? (
          <div className='mb-3'>
            <p className='text-xl font-medium'>{!isLoading && 'Ongoing Events'}</p>
          </div>
        ) : (
          <div className='mb-3'>
            <p className='text-xl font-medium'>{!isLoading && 'Search Results'}</p>
          </div>
        )
      }
      <div className='flex gap-4 overflow-x-auto rounded-xl ticket-section w-full p-4 pl-0'>
        {isLoading ? skeletons : ticketData?.map((ticket, i) => (
          <Link
            as='button'
            key={i}
            href={route('getDetail', { id: ticket.id })}
            tabIndex={-1}
            className="ticket-card relative group flex flex-col"
            onMouseEnter={() => setIsHovered(i)}
            onMouseLeave={() => setIsHovered(null)}
          >
            <div className='w-full min-h-52 p-2 pb-0'>
              <img
                src={ticket.images}
                loading="lazy"
                className="dark:opacity-40 w-full h-full object-cover duration-200 rounded-lg"
                alt="EventsImg"
              />
            </div>
            <div className='w-full h-full flex flex-col justify-center gap-2 px-4'>
              <h1 className='text-black/70 dark:text-yellow-100 text-lg font-bold text-start max-w-96 truncate'>{ticket.name}</h1>
              <div className='w-full'>
                <div className='text-[#5447FF] flex items-center gap-2'>
                  <CalendarDays size={15} />
                  <p>{new Date(ticket.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className='text-[#5447FF] flex items-center gap-2'>
                  <MapPin size={15} />
                  <p>{ticket.location}</p>
                </div>
              </div>
              {/* backdrop */}
              <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: isHovered === i ? 0 : 40, opacity: isHovered === i ? 1 : 0 }} transition={{ type: "tween", duration: 0.15 }} className='bg-black/50 dark:bg-black/75 absolute w-full h-full inset-0' />
              <motion.div
                className='text-[#0A34C2] dark:text-yellow-200 absolute flex items-center w-full h-full inset-0 justify-center text-lg'
                initial={{ y: 40, opacity: 0 }}
                animate={{
                  y: isHovered === i ? 0 : 40,
                  opacity: isHovered === i ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span className='bg-[#f2f2f2] dark:bg-black py-2 px-4 rounded-xl flex items-center'>
                  <p>See Details</p>
                  <LuArrowUpRight size={20} />
                </span>
              </motion.div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TicketSection;