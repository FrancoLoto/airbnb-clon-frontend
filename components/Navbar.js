"use client"

import Image from "next/image";
import { useState } from "react";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { Bars3Icon, UserCircleIcon, UserIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from "react-date-range";


export default function Navbar() {
    const [searchInput, setSearchInput] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [noOfGuests, setNoOfGuests] = useState(1);

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    };

    const handleClick = () => {
        fetch("");
    };

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
    };

    return(
        <div>
            <header className="sticky top-0 z-50 px-5 pt-2 pb-4 bg-white border-b flex items-center justify-between">
                <a href="/" className="pl-3">
                    <Image src={"/Airbnb-logo.png"} width={120} height={120} alt="Airbnb logo"/>
                </a>

                <div className="flex items-center placeholder:italic placeholder:text-slate-400 bg-white border border-slate-300 rounded-full shadow-md hover:cursor-pointer">
                    <div className="py-2 px-2 hover:bg-gray-100  hover:rounded-full">
                    
                    <input 
                      className="w-52 rounded-l-full border-r hover:border-none border-slate-300 pl-4 pb-2 text-sm hover:cursor-pointer hover:bg-gray-100"
                      placeholder="Explorar destinos"
                      type="text"
                      name="search"
                      onChange={e => setSearchInput(e.target.value)}
                      value={searchInput}
                    />
                    </div>
                    <div className="rounded-full bg-[#ff385c] hover:bg-[#c51e3def] inline-block items-center ml-3 p-2 hover:cursor-pointer">
                        <MagnifyingGlassIcon className="h-7 p-1 text-white"/>
                    </div>
                </div>

                <div className="flex items-center space- justify-end lg:pr-6">
                    <a href="/propiedades/crearPropiedad" className="hover:cursor-pointer hover:bg-zinc-100 text-sm hover:rounded-full py-3.5 px-4 rounded-full">
                        Poné tu Airbnb
                    </a>

                    <div className="hover:rounded-full hover:bg-zinc-100 hover:cursor-pointer py-3.5 px-4">
                        <GlobeAltIcon className="h-5"/>
                    </div>

                    <a href="/ingresar" className="flex space-x-2 border px-1.5 py-1 ml-1 rounded-full hover:cursor-pointer hover:shadow-md items-center">
                        <Bars3Icon className="h-5 pl-1 text-gray-800"/>
                        <UserCircleIcon className="h-9 text-gray-500"/>
                    </a>
                </div>
            </header>

            { searchInput && (<div>
                <div className="flex align-center my-3">
                    <DateRangePicker 
                      className="mx-auto"
                      ranges={[selectionRange]}
                      minDate={new Date()}
                      rangeColors={["#ff385c"]}
                      onChange={handleSelect}
                    />
                </div>
                <div className="flex items-center justify-center span-x-2">
                    <UserIcon className="h-6"/>
                    <h1 className="text-center">Invitados</h1>
                    <input type="number" className="w-12 border rounded-md" onChange={e => {setNoOfGuests(e.target.value)}} value={noOfGuests} min={1} max={5}/>
                    <button className="text-[#ff385c] pl-16" onClick={handleClick}>Buscar</button>
                </div>
            </div>)}
        </div>
    )
}