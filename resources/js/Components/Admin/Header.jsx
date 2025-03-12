import React from "react";
import { Bell, Search, Sun } from "lucide-react";
import { Link } from "@inertiajs/react";

const Header = ({ title, searchValue, onSearchChange, navigation }) => {
    return (
        <header className="sticky top-2 w-full h-16 rounded-xl bg-white drop-shadow-md font-medium flex items-center justify-between px-6 text-sm">
            <h1 className="text-[16px] font-semibold max-md:hidden">
                {navigation ? (
                    <div className="flex items-center gap-1.5">
                        <Link
                            as="button"
                            href={navigation.url}
                            className="text-blue-600 hover:text-blue-600 hover:underline"
                        >
                            {navigation.text}
                        </Link>
                        <span>/</span>
                        <span className="text-gray-600">{navigation.current}</span>
                    </div>
                ) : (
                    title
                )}
            </h1>
            <div className="max-h-10 flex gap-6 max-md:justify-between max-md:min-w-full">
                <input
                    type="text"
                    className="h-10 px-4 bg-transparent border-black text-black text-sm rounded-xl placeholder-black"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                <div className="flex items-center gap-4">
                    <button className="text-black hover:text-zinc-700">
                        <Sun size={20} />
                    </button>
                    <button className="text-black hover:text-zinc-700">
                        <Bell size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
