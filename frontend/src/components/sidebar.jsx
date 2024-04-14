import React, { useContext, useRef, useEffect , } from "react";
import { Homecontext } from "./Context/context";
import { MapPinned , LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
    const { side, dark, setSide, buttref, sec, setSec } = useContext(Homecontext)
    const navigate = useNavigate()
    const sideref = useRef(null)
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleClickOutside = (event) => {
        if (sideref.current && !sideref.current.contains(event.target) && !buttref.current.contains(event.target)) {
            setSide(false);
        }
    };

    return (
        <div ref={sideref} className={` bg-white h-[92%]   dark:bg-[#172D13] flex flex-col pt-16 items-center gap-8 absolute z-30 rounded-r-md   ${side ? "left-0 sm:left-0 transition-all duration-500" : "-left-32  sm:-left-32"} `}>

            <div className={`flex  transition-all duration-300  w-full p-4 pr-8  ${sec==="tips"?"bg-[#6BB77B]" : ""} rounded-r-xl items-center`} onClick={() => { setSec("tips") }}>
                <p className={`ml-auto font-first ${dark?"text-white":"text-black"}`}>Tips</p>
                <div className="ml-auto">
                    <lord-icon
                        src="https://cdn.lordicon.com/zyzoecaw.json"
                        trigger="hover"
                        style={{ width: "40px", height: "40px" }}
                        colors={`${!dark ? "primary:#000000" : "primary:#ffffff"}`}
                        >
                        
                    </lord-icon>
                </div>
            </div>
            <div className={`flex transition-all duration-300   w-full p-4 ${sec==="not"?"bg-[#6BB77B]" : ""} rounded pr-8`} onClick={() => { setSec("not") }}>
                <p className={`ml-auto mr-4 font-first ${dark?"text-white":"text-black"}`}>Notifications</p>
                <div className="ml-auto">
                    <lord-icon
                        src="https://cdn.lordicon.com/vspbqszr.json"
                        colors={`${!dark ? "primary:#000000" : "primary:#ffffff"}`}
                        trigger="hover"
                        style={{ width: "40px", height: "40px" }}>
                    </lord-icon>
                </div>
            </div>
            <div className={`flex gap-8 transition-all duration-300  w-full p-4 ${sec==="eme"?"bg-[#6BB77B]" : ""} rounded pr-8`} onClick={() => { setSec("eme") }}>
                <p className={`${dark?"text-white":"text-black"}`}>Emergency Call</p>
                <div className="ml-auto">
                    <lord-icon
                        style={{ marginLeft: 0, width: '40px', height: '40px' }}
                        src="https://cdn.lordicon.com/rsvfayfn.json"
                        trigger="hover"
                        colors={`${!dark ? "primary:#000000" : "primary:#ffffff"}`}
                    // style="width:250px;height:250px"
                    >
                    </lord-icon>
                </div>
            </div>
            <div className={`flex transition-all duration-300   w-full p-4 ${sec==="news"?"bg-[#6BB77B]" : ""} rounded pr-8`} onClick={() => { setSec("news") }}>
                <p className={`${dark?"text-white":"text-black"} ml-auto font-first`}>News</p>
                <div className="ml-auto">
                    <lord-icon
                        // style={{ marginLeft: 0 }}
                        style={{ marginLeft: 0, width: '40px', height: '40px' }}
                        src="https://cdn.lordicon.com/ijahpotn.json"
                        trigger="hover"
                        colors={`${!dark ? "primary:#000000" : "primary:#ffffff"}`}
                    >
                    </lord-icon>
                </div>
            </div>
            <div className={`flex transition-all duration-300  ${sec==="map"?"bg-[#6BB77B]" : ""} rounded  w-full p-4 pr-8`} onClick={() => { setSec("map") }}>
                <p className={`ml-auto mr-9 ${dark?"text-white":"text-black"} font-first`}>Maps</p>
                <div className="ml-auto">
                    <MapPinned className={`size-8 ${dark?"text-white":"text-black"}`} />
                </div>
            </div>
            <div className="flex mt-auto w-full p-4 pr-8 text-[#D76F30]" onClick={() => { navigate('/') }}>
                <p className="ml-auto mr-9 font-first">Exit</p>
                <div className="ml-auto">
                    <LogOut className="size-8" />
                </div>
            </div>

        </div >
    )
}