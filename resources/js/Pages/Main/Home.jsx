import { FindTickets } from '@/Components/FindTickets';
import Hero from '@/Components/Hero';
import TicketSection from '@/Components/TicketSection';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [events, setEvents] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchEvents = async (searchParams = {}) => {
        setIsLoading(true);
        let eventsData = [];
        try {
            const response = await axios.get("/getData/events", {
                params: searchParams
            });

            eventsData = response.data;
            
            if (Object.keys(searchParams).length > 0 && searchParams.artist) {
                setIsSearching(true);
            }
            
        } catch (error) {
            console.error("Error fetching events:", error);
            setResultCount(0);
        } finally {
            setEvents(eventsData);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleSearch = async (searchData) => {
        if (!searchData) {
            setIsSearching(false);
            await fetchEvents();
        } else {
            setIsSearching(true);
            await fetchEvents(searchData);
        }
    };

    return (
        <MainLayout>
            <Head title="Home" />
            <Hero />
            <FindTickets onSearch={handleSearch} isLoading={isLoading} />
            {isSearching ? (
                <div className='my-10'>
                    {isLoading ? (
                        <TicketSection
                            SectionType={'search-results'}
                            isLoading={true}
                        />
                    ) : (
                        <TicketSection
                            SectionType={'search-results'}
                            ticketData={events}
                        />
                    )}
                </div>
            ) : (
                <div className='my-10'>
                    {isLoading ? (
                        <>
                            <TicketSection
                                SectionType={'upcoming'}
                                isLoading={true}
                            />
                            <TicketSection
                                SectionType={'ongoing'}
                                isLoading={true}
                            />
                        </>
                    ) : (
                        <>
                            <TicketSection
                                SectionType={'upcoming'}
                                ticketData={events}
                            />
                            <TicketSection
                                SectionType={'ongoing'}
                                ticketData={events}
                            />
                        </>
                    )}
                </div>
            )}
        </MainLayout>
    );
}