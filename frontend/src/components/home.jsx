import React, { useState, useTransition, useEffect, useRef } from "react";
import { Homecontext } from "./Context/context";
import Header from "./header/header";
import { socket } from "./socket/socket";
import Sidebar from "./sidebar";
import { X } from "lucide-react";
import { getNews } from "./util/news";
import { geolocated } from "react-geolocated";
import Map from "./map";
import { useFetcher } from "react-router-dom";
import { gettime } from "./util/gettime";
import { HeartPulse, Siren, CarFront, FlameKindling } from "lucide-react"
import Tips from "./tips";

export default function Home() {
    const [side, setSide] = useState(false);
    const [dark, setDark] = useState(false);
    const [emebutt, setEmebutt] = useState(false);
    const [sec, setSec] = useState("tips")
    const [news, setNews] = useState([]);
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [reqname, setReqname] = useState(null)
    const buttref = useRef(null);
    const [noti, setNoti] = useState([])
    const [reqtype, setReqtype] = useState();
    const [reqsent, setReqsent] = useState(false);

    useEffect(() => {
        socket.on("emergency", (d) => {
            console.log(d);
            socket.emit("getnotification", "get");
        });
        socket.on("notification", (data) => {
            console.log(data)
            setNoti(data);
        })
        return (() => {
            socket.off("emergency");
        })
    }, [])

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLat(position.coords.latitude);
                    setLong(position.coords.longitude);
                },
                (error) => {
                    console.error(error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);
    useEffect(() => {
        if (dark) {
            document.querySelector('html').classList.add('dark');
        } else {
            document.querySelector('html').classList.remove('dark');
        }
    }, [dark])
    useEffect(() => {
        const fetchData = async () => {
            console.log(sec)
            if (sec === "news") {
                try {
                    const data = await getNews();
                    setNews(data.articles || []); // Assuming data contains 'articles'
                    console.log("News data:", data.articles);
                } catch (error) {
                    console.error("Error fetching news:", error);
                }
            }
            else if (sec === "not") {
                console.log("noti requested")
                socket.emit("getnotification", "get");
            }
        };

        fetchData();
    }, [sec]);

    console.log(side)

    function handleclick() {
        const { date, time } = gettime();
        socket.emit("emereq", { reqname, reqtype, date, time });
        setReqsent(true)
        setTimeout(() => {
            setEmebutt(false)
            setReqsent(false)
        }, 2000);
    }

    return (
        <>
            {
                emebutt && (
                    <div className="fixed  inset-0 z-50  bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
                        <div className="bg-white shadow-2xl w-[90%] h-[90%] p-4 md:w-[40%] md:h-[75%] rounded-md">
                            <div className="flex flex-row">
                                <h1 className="text-center font-semibold text-3xl p-4 w-full">Initiate Emergency Request</h1>
                                <X className="text-black ml-auto  size-12" onClick={() => { setEmebutt(false) }} />
                            </div>
                            <div className="p-4 pl-8 flex gap-4 flex-col mt-8">
                                <p className="font-semibold text-xl capitalize">Emergency Type <span className="text-red-500">*</span></p>
                                <div className="grid grid-cols-2  md:grid-cols-3 justify-items-center place-content-center items-center">

                                    <div className="flex flex-row gap-2 justify-center items-center p-4">
                                        <input className="w-[20px] h-[20px]" type="radio" name="topping" value="Fire" id="regular" onClick={() => { setReqtype("Fire") }} />
                                        <label htmlFor="regular">Fire</label>
                                    </div>

                                    <div className="flex flex-row gap-2 p-4 justify-center items-center">
                                        <input className="w-[20px] h-[20px]" type="radio" name="topping" value="Medium" id="medium" onClick={() => { setReqtype("Medical") }} />
                                        <label htmlFor="medium">Medical</label>
                                    </div>

                                    <div className="flex flex-row gap-2 p-4 justify-center items-center">
                                        <input className="w-[20px] h-[20px]" type="radio" name="topping" value="Large" id="large" onClick={() => { setReqtype("Civil Disturbance") }} />
                                        <label htmlFor="large">Civil Disturbance</label>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-4 justify-center items-center">
                                    <label htmlFor="large">others</label>
                                    <input className=" p-2 shadow-lg border rounded-lg col-span-full outline-none" type="text" placeholder="Specify" id="large" onClick={(e) => { setReqtype(e.target.val) }} />
                                </div>
                            </div>
                            <div className="flex justify-center flex-col gap-4 p-8">
                                <div className="text-xl font-semibold">Name <span className="text-red-500">*</span></div>
                                <input type="text" placeholder="Your Name" className="p-4 rounded-md shadow-md border outline-none" onChange={(e) => { setReqname(e.target.value) }} />
                            </div>
                            <div className="flex gap-4 justify-start p-8">
                                <input type="checkbox" />
                                <label htmlFor="">Allow to access your location </label>
                            </div>
                            <div className="p-8 w-full">
                                <button className="w-full h-12 bg-red-500 rounded-md" onClick={handleclick}>
                                    {reqsent ? (
                                        <lord-icon
                                            src="https://cdn.lordicon.com/oqdmuxru.json"
                                            trigger="in"
                                            colors="primary:#ffffff"
                                            style={{ width: "400px", height: "40px" }}
                                        >
                                        </lord-icon>
                                    ) : (
                                        <div className="text-white font-bold">SEND REQUEST</div>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className="dark:bg-[#172D13] w-full h-[100vh]  overflow-hidden  ">
                <Homecontext.Provider
                    value={{
                        side,
                        setSide,
                        dark,
                        setDark,
                        emebutt,
                        setEmebutt,
                        sec,
                        setSec,
                        buttref,
                        lat,
                        long
                    }}
                >
                    <Header dark={dark} setDark={setDark} val={0} setSide={setSide} side={side} />
                    <div className="dark:bg-[#172D13] w-full h-full  flex flex-row">
                        <Sidebar />
                        <div className=" w-full flex justify-center items-center overflow-scroll z-10 ml-20">
                            {sec === "tips" &&
                                <div className="w-full h-full ">
                                    <Tips />
                                </div>
                            }
                            {sec === "eme" &&
                                <div className="w-full h-full p-8 flex md:flex-col flex-col-reverse overflow-scroll">
                                    <div className="grid  grid-cols-1 md:grid-cols-4 justify-center justify-items-center gap-4">
                                        <div className="flex flex-col dark:bg-[#6BB77B] gap-4 shadow-lg hover:shadow-2xl rounded-md w-80 h-80 border justify-center items-center">
                                            <HeartPulse className="text-red-500 size-16" />
                                            <p>HEALTHCARE</p>
                                        </div>
                                        <div className="flex flex-col dark:bg-[#6BB77B]  gap-4 shadow-lg hover:shadow-2xl  rounded-md w-80 h-80 border justify-center items-center">
                                            <CarFront className="text-black size-16" />
                                            <p>Accident</p>
                                        </div>
                                        <div className="flex flex-col dark:bg-[#6BB77B]  gap-4 shadow-lg hover:shadow-2xl rounded-md w-80 h-80 border justify-center items-center">
                                            <FlameKindling className="text-red-500 size-16" />
                                            <p>Fire <span>&</span> safety</p>
                                        </div>

                                        <div className="flex flex-col dark:bg-[#6BB77B]  gap-4 shadow-lg hover:shadow-2xl  rounded-md w-80 h-80 border justify-center items-center">
                                            <Siren className="text-blue-500 size-16" />
                                            <p>Police</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center mt-16 mb-16 p-16">
                                        <div className="rounded-full w-60 h-60 bg-red-400 flex justify-center items-center">
                                            <div className="rounded-full w-40 h-40 bg-red-500 flex justify-center items-center">
                                                <div className="transition-all duration-200 rounded-full font-bold text-xl hover:w-24 hover:h-24 text-white w-20 h-20 bg-red-600 flex justify-center items-center" onClick={() => { setEmebutt(!emebutt) }}>
                                                    SOS
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }

                            {sec === "news" && (
                                <div className="justify-center p-8  flex-col h-full items-center overflow-y-auto">
                                    {news.map((d, index) => (
                                        d.author && d.urlToImage ? (
                                            <div key={index} className={`news-item items-center justify-center p-4 rounded-md mb-4 h-60 flex gap-8 flex-row ${index % 2 === 0 ? 'reverse' : ''}`}>
                                                <div className="flex flex-row items-start gap-12 rounded-md bg-[#6BB77B] w-[80%] p-4 justify-start">
                                                    <img src={d.urlToImage} className="w-40 h-40 ml-auto rounded-full" alt="" />
                                                    <div className="flex flex-col">
                                                        <p className="dark:text-white font-first text-2xl">{d.title}</p>
                                                        <p className="dark:text-text-one">{d.content}</p>
                                                        <p className="dark:text-text-one">{d.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null
                                    ))}
                                </div>

                            )}
                            {
                                sec === "map" && (
                                    <div className="w-full pl-20 overflow-hidden flex justify-center items-center h-full">
                                        <Map />
                                    </div>
                                )
                            }
                            {
                                sec === "not" && (
                                    <div className="w-full pl-12 md:pl-24 overflow-hidden flex flex-col justify-start md:p-12 items-center h-full">
                                        {noti.length > 0 ? (
                                            noti.map((data, index) => (
                                                <div key={index} className="w-full p-4">
                                                    <div className="p-12 bg-green-200 rounded-lg w-full md:w-[40%] flex flex-col gap-4">
                                                        <div className="text-xl font-semibold flex flex-col md:flex-row gap-4">
                                                            Alert Type : <p className="text-white">{data.type}</p>
                                                        </div>
                                                        <div className="text-xl font-semibold flex flex-col md:flex-row gap-4">
                                                            Issued By : <p className="text-white">{data.by}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="w-full p-4 flex justify-center items-center">
                                                <p className="text-xl text-gray-500">No new notifications</p>
                                            </div>
                                        )}
                                    </div>
                                )
                            }
                        </div>
                    </div>

                </Homecontext.Provider>
            </div>
        </>
    )
}