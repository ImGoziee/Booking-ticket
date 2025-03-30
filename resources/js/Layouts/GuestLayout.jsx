import { Link } from "@inertiajs/react";
import { MoveLeft } from "lucide-react";

export default function GuestLayout({ children, submit }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-[#E8E6EF] pt-6 sm:justify-center sm:pt-0">
            <form onSubmit={submit} className="relative flex overflow-hidden text-white bg-[#fff] xl:w-[70rem] xl:h-[40rem] 2xl:h-[45rem] rounded-3xl shadow-sm">
                <Link as="button" href={route("home")} className="absolute top-4 left-4 z-[200] bg-[#f2f2f2] hover:bg-[#E8E6EF] text-black px-6 py-2 rounded-xl"><MoveLeft /></Link>
                {children}
            </form>
        </div>
    );
}
