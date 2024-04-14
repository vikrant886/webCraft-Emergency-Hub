import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./header/header";
import { socket } from "./socket/socket";

export default function Register() {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [registerclicked, setRegisterclicked] = useState(false);
    const [value, setValue] = useState({
        startDate: new Date(),
        endDate: new Date().setMonth(11)
    });
    const [dark, setDark] = useState(false);
    const navigate = useNavigate();

    const handleValueChange = newValue => {
        console.log("newValue:", newValue);
        setValue(newValue);
    };

    function register() {
        setRegisterclicked(true)
        console.log(mail,password);
        socket.emit("register",{mail,password});
        navigate('/home')
    }

    useEffect(() => {
        if (dark) {
            document.querySelector('html').classList.add('dark');
        } else {
            document.querySelector('html').classList.remove('dark');
        }
    })
    return (
        <>
            <Header val={1} setDark={setDark} dark={dark} />
            <div
                className="w-full h-screen bg-cover dark:bg-[#172D13] bg-no-repeat flex items-center justify-center bg-right"
            >
                <div className="h-[60%] w-[75%] md:h-[60%] p-2 bg-third md:w-[30%] flex flex-col rounded-md gap-8">
                    <div className="w-full h-16 flex justify-center items-center">
                        <h1 className="text-white font-bold text-2xl">Create an Account</h1>

                    </div>

                    <div className="h-full  w-full flex  justify-center">
                        <div className="w-[80%] h-full flex gap-4 flex-col ">
                            <p className="flex flex-row text-text-three  font-bold text-md">MAIL<p className="text-red-500 font-light"> *</p></p>
                            <input type="text" className="p-0.8 w-full rounded-sm text-s bg-first text-text-three " placeholder="Enter Email or Phone number" style={{ outline: 'none' }} onChange={(e) => setMail(e.target.value)} />
                            <p className="text-text-three  flex felx-row text-md font-bold">PASSWORD <p className="text-red-500 font-light"> *</p></p>
                            <input type="password" className="rounded-sm w-full  p-0.8 text-s bg-first text-text-three" placeholder="Enter your password" style={{ outline: 'none' }} onChange={(e) => setPassword(e.target.value)} />
                            <button className="w-full p-4 mt-4 rounded-sm bg-loginbutton" onClick={register}>
                                {registerclicked ? (
                                    <div className="flex justify-center">
                                        {/* <CircleSvg className="w-8 h-8 text-white" /> */}
                                    </div>
                                ) : (
                                    <div>Register</div>
                                )}
                            </button>
                            <button onClick={() => navigate('/')} className="text-loginbutton font-light text-0.8r">Already have an account?</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}