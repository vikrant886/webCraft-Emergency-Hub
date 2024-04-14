import React, { useContext, useRef } from "react";
import { Lightbulb } from "lucide-react";
import { Homecontext } from "../Context/context";

export default function Header({ val, setDark, dark, setSide, side }) {
    const {emebutt , setEmebutt,buttref} = useContext(Homecontext)
    console.log(emebutt)
    return (
        <div>
            {
                val === 1 ? (
                    <div className={`dark:bg-[#172D13] p-4 pr-12 flex items-center`}>
                        {/* Use className template string to conditionally apply dark mode styles */}
                        <Lightbulb className="ml-auto text-black dark:text-yellow-500" onClick={() => setDark(!dark)} />
                    </div>
                ) : (
                    <div className={`dark:bg-[#172D13] p-4 pl-8 pr-12 flex items-center`}>
                        <div className="flex flex-col gap-2 justify-center hover:cursor-pointer " ref={buttref} onClick={() => setSide(!side)}>
                            <div className={` border-y-2  transition-all duration-500 h-1 border border-black dark:border-yellow-500 rounded-md bg-black ${side? "w-8":"w-12"}`}></div>
                            <div className={` border-y-2 h-1 transition-all duration-500 border border-black dark:border-yellow-500 rounded-md bg-black ${side? "w-12":"w-8"}`}></div>
                        </div>
                        <Lightbulb className="ml-auto text-black dark:text-yellow-500 size-7" onClick={() => setDark(!dark)} />
                        <button className="p-2 rounded-md bg-red-600 text-white font-semibold ml-8" onClick={()=>{setEmebutt(true)}}>EMERGENCY</button>
                    </div>
                )
            }
        </div>
    )
}
