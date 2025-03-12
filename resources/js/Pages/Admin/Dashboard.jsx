import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <main className='flex py-3 px-1 gap-3'>
                <div class="grid grid-cols-8 gap-3 w-full max-w-3xl">
                    <div className="col-span-8 h-80 bg-[#fff] rounded-xl drop-shadow-md">Chart</div>
                    <div className='col-span-4 h-80 bg-[#fff] rounded-xl drop-shadow-md'>Section 1</div>
                    <div className='col-span-4 h-80 flex flex-col gap-3 *:h-full'>
                        <div className='bg-white rounded-xl drop-shadow-md'>1</div>
                        <div className='bg-white rounded-xl drop-shadow-md'>2</div>
                    </div>
                </div>
                <div className='bg-white grow rounded-xl drop-shadow-md'>hell</div>
            </main>
        </AuthenticatedLayout>
    );
}
