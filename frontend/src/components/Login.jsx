import React, { useEffect, useState } from "react";
import { socket } from "./socket/socket";
import Header from "./header/header";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [dark, setDark] = useState(false);
    const [username, setUsername] = useState()
    const [pass, setPass] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        socket.on("loginres", (data) => {
            console.log(data)
            if (data === "correct") {
                navigate("/home")
            }
        })
        return (() => {
            socket.off("loginres");
        })
    }, [])

    useEffect(() => {
        if (dark) {
            document.querySelector('html').classList.add('dark');
        } else {
            document.querySelector('html').classList.remove('dark');
        }
    })


    function handlelogin() {
        socket.emit("login", { email: username, password: pass })
    }

    return (
        <div className="w-full h-[100vh]">
            <Header val={1} setDark={setDark} dark={dark} />
            <div className="dark:bg-[#172D13] w-full h-full justify-center items-center flex">
                <div className=" h-[70%] w-[80%] md:w-[40%] mobileM:w-1/2 mobileM:h-1/2 bg-third rounded-md">
                    <div className="w-full h-full bg-gray-300 bg-opacity-5 rounded-lg overflow-hidden">

                        <li className="flex items-center flex-col h-[70%] pt-4">
                            <div className="text-white font-bold text-4xl ">LOGIN</div>
                            <div className="w-3/4 h-full flex flex-col justify-center gap-2 items-start mt-2">
                                <p className="flex flex-row text-text-three text-0.8r font-bold">EMAIL OR PHONE NUMBER <p className="text-red-500 font-light"> *</p></p>
                                <input type="text" className="p-4 w-full rounded-md text-s bg-inputfield " placeholder="Enter Email or Phone number" style={{ outline: 'none' }} onChange={(e) => setUsername(e.target.value)} />
                                <p className="text-text-three  flex felx-row text-0.8r font-bold">PASSWORD <p className="text-red-500 font-light"> *</p></p>
                                <input type="password" className="rounded-md w-full text-black p-4 text-s bg-inputfield" placeholder="Enter your password" style={{ outline: 'none' }} onChange={(e) => setPass(e.target.value)} />
                                <button className="text-forgotbutton text-0.8r item-left">Forgot your password?</button>
                                <button className="bg-blue-500 w-full rounded-md  text-slate-100 hover:bg-loginbuttonhover h-12" onClick={handlelogin} >
                                    Login
                                </button>
                                <button className="text-o.8r text-forgotbutton" onClick={() => navigate('/register')}>Create an account</button>
                            </div>
                        </li>
                        <div className="w-full flex flex-row gap-2 justify-center items-center text-white">
                            <div className="w-[40%] h-1 bg-white border border-white "></div>
                            <p className="text-xl font-semibold">or</p>
                            <div className="w-[40%] h-1 bg-white border border-white "></div>
                        </div>
                        <div className="w-full  p-4 flex rounded-md justify-center">
                            <button className="bg-red-500 w-[80%] p-4" onClick={() => { navigate('/home') }}>EMERGENCY</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}