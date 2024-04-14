import React, { useState } from "react";
import Carousel from "./carasouel"; // Assuming you have a Carousel component defined correctly
import image1 from "./images/1.png";
import image2 from "./images/2.png";
import image3 from "./images/3.png";
import image4 from "./images/4.png";
import fire from "./images/fire.png"
import earth from './images/earth.png'
import { Tooltip } from 'react-tooltip'

export default function Tips() {
    const slides = [image1, image2, image3, image4];
    const [pos, setPos] = useState(-1);
    const mess = [
        "Place smoke alarms on every level of the premises, including storage, electrical room, bedrooms, and outside sleeping areas. Smoke alarms will need to be checked and tested on a regular basis to ensure functionality.",
        "Develop an emergency fire escape plan with multiple exit routes from each room. Orient the escape plan with everyone in the place by placing legible signs and emergency fire exits, and designate a safe meeting point outside the premises. Ensure that fire exits and ladders are safe and free from obstructions.",
        "Keep flammable materials away from heat sources that can potentially ignite the materials. Store them in approved containers and well-ventilated areas. Use caution when handling candles, matches, lighters, and other potential fire starters and never leave them unattended when in use. Keep them away from curtains and other flammable materials.",
        "Never leave cooking unattended as well, especially when using stove tops or ovens. Keep flammable items, such as kitchen towels and curtains, away from heat sources. Learn about grease fires and how to douse them, never use water to put out a grease fire. Instead, simply close the lid to suffocate the flames from oxygen, or have a Class B Dry Chemical Fire Extinguisher easily accessible in your kitchen. Make sure to clean your oven and stovetop regularly to prevent grease buildup.",
        "Avoid overloading electrical outlets and extension cords. Unplug appliances such as ovens, flat iron, and washing machines when not in use and inspect cords for damage regularly. Regularly check electrical cords for fraying, damage, or overheating.",
    ]

    return (
        <div className="flex flex-col  p-20 items-start h-screen">
            <div className="w-full flex justify-center mb-8 dark:text-text-two font-medium text-3xl ">
                Emergency Tips
            </div>
            <div className="w-full flex justify-center">
                <div className="w-[80%] rounded-md">
                    <Carousel autoSlide={true}>
                        {slides.map((slide, index) => (
                            <img key={index} src={slide} alt={`Slide ${index + 1}`} className="w-full h-auto rounded-md" />
                        ))}
                    </Carousel>
                </div>
            </div>
            <div className="flex flex-row w-full mb-16 mt-16 ">
                <div className="flex w-[60%] dark:text-white flex-col gap-8">
                    <div className="font-semibold text-xl dark:text-text-one">Fire Hazard</div>
                    <div  className="text-3xl rounded-lg w-[80%] bg-[#6BB77B] p-4 hover:text-white hover:font-bold" onMouseOut={() => { setPos(-1) }} onMouseOver={() => { setPos(1) }}>
                        Install smoke alarms
                    </div>

                    <div className="text-3xl rounded-lg w-[80%] bg-[#6BB77B] p-4 hover:text-white hover:font-bold" onMouseOut={() => { setPos(-1) }} onMouseOver={() => { setPos(2) }}>
                        Create an escape plan

                    </div>
                    <div className="text-3xl rounded-lg w-[80%] bg-[#6BB77B] p-4 hover:text-white hover:font-bold" onMouseOut={() => { setPos(-1) }} onMouseOver={() => { setPos(3) }}>
                        Keep flammables away from heat source
                    </div>
                    <div className="text-3xl rounded-lg w-[80%] bg-[#6BB77B] p-4 hover:text-white hover:font-bold" onMouseOut={() => { setPos(-1) }} onMouseOver={() => { setPos(4) }}>
                        Practice safe cooking and fire safety in the kitchen
                    </div>
                    <div className="text-3xl rounded-lg w-[80%] bg-[#6BB77B] p-4 hover:text-white hover:font-bold" onMouseOut={() => { setPos(-1) }} onMouseOver={() => { setPos(5) }}>
                        Use electrical appliances responsibly
                    </div>
                </div>
                <div className="md:visible w-[40%] flex justify-center items-center">
                    {

                        (pos === -1 || pos>5)? (
                            <img src={fire} className="size-40" alt="" />
                        ) : (
                            <div className="dark:bg-[#6BB77B] p-8 rounded-lg">
                                <p className="text-2xl text-wrap leading-loose">{mess[pos - 1]}</p>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="flex flex-row-reverse w-full mt-28">
                <div className="flex w-[60%] flex-col dark:text-white text-right gap-8">
                    <div className="font-semibold text-xl dark:text-text-one">EarthQuake Hazard</div>
                    <div className="text-3xl ml-auto rounded-lg w-[80%] bg-[#6BB77B] p-4 hover:text-white hover:font-bold" onMouseOut={() => { setPos(-1) }} onMouseOver={() => { setPos(6) }}>
                        Install smoke alarms
                    </div>
                    <div className="text-3xl ml-auto rounded-lg w-[80%] bg-[#6BB77B] p-4 hover:text-white hover:font-bold" onMouseOut={() => { setPos(-1) }} onMouseOver={() => { setPos(7) }}>
                        Create an escape plan

                    </div>
                    <div className="text-3xl ml-auto rounded-lg w-[80%] bg-[#6BB77B] p-4 hover:text-white hover:font-bold" onMouseOut={() => { setPos(-1) }} onMouseOver={() => { setPos(8) }}>
                        Keep flammables away from heat source
                    </div>
                    <div className="text-3xl ml-auto rounded-lg w-[80%] bg-[#6BB77B] p-4 hover:text-white hover:font-bold" onMouseOut={() => { setPos(-1) }} onMouseOver={() => { setPos(9) }}>
                        Practice safe cooking and fire safety in the kitchen
                    </div>
                    <div className="text-3xl ml-auto rounded-lg w-[80%] bg-[#6BB77B] p-4 hover:text-white hover:font-bold" onMouseOut={() => { setPos(-1) }} onMouseOver={() => { setPos(10) }}>
                        Use electrical appliances responsibly
                    </div>
                </div>
                <div className="md:visible w-[40%] flex justify-center items-center">
                    {
                        pos <= 5 ? (
                            <img src={earth} className="size-40" alt="" />
                        ) : (
                            <div className="dark:bg-[#6BB77B] p-8 rounded-lg">
                                <p className="text-2xl text-wrap leading-loose">{mess[pos - 1]}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
