import React from "react";
import Link from "next/link";
import { BiSearchAlt } from 'react-icons/bi'
import { BsInfo } from 'react-icons/bs'
import { GiSpoon, GiChickenOven, GiShinyApple, GiRiceCooker } from 'react-icons/gi'

const sideNav = [
    {
        text: 'Advanced Search',
        Icon: BiSearchAlt,
        link: '',
    },
    {
        text: 'Recipe Index',
        Icon: GiChickenOven,
        link: '',
    },
    {
        text: 'Ingredient Index',
        Icon: GiShinyApple,
        link: '',
    },
    {
        text: 'Utensil Index',
        Icon: GiSpoon,
        link: '',
    },
    {
        text: 'Appliance Index',
        Icon: GiRiceCooker,
        link: '',
    },
    {
        text: 'About',
        Icon: BsInfo,
        link: '',
    }
];

function Navside() {
    return (
        <div className="fixed right-0 z-20 top-14">
            <div className='relative flex flex-col items-end h-68'>
                {sideNav.map(e => {
                    const { text, Icon, link } = e;
                    return (
                        <button key={text} className='flex flex-row p-2 my-2 rounded-l-lg shadow-sm basis-auto bg-bblue group'>
                            <Icon className='text-[1.1rem] place-self-center lg:text-[1.3rem]' fill='#d7eefa' />
                            <span className='hidden px-2 text-[0.71rem] text-lblue place-self-center lg:text-[0.8rem] group-hover:inline'>{text}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default Navside