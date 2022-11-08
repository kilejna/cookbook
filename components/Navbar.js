import React from "react";
import Link from "next/link";
import { IoSearchCircleOutline } from "react-icons/io5";
import { IoIosGlobe } from "react-icons/io";
import { BsSun, BsGlobe } from "react-icons/bs";

const Navbar = () => {
    return (
        <div className="fixed top-0 left-0 z-10 w-screen duration-300 ease-in bg-lgrey">
            <div className="flex items-center justify-between w-full p-2 m-auto max-h-20 h-[56px]">
                <Link href='/'>
                    <h1 className="text-[8vmin] text-lblue font-yellowtail">Cookbook</h1>
                </Link>
                <ul className="flex items-center min-w-0 justify-evenly">
                    <li className="flex flex-row px-1 m-2 bg-lblue/20 rounded-2xl place-items-center">
                        <IoSearchCircleOutline className="text-xl" color="#657075"/>
                        <div className="min-w-0 px-1 py-1 text-xs text-dbgrey"><input className="bg-transparent outline-none max-w-[24vw] placeholder:text-dbgrey" placeholder="Quick search..."/></div>
                    </li>
                    <li>
                        <BsSun className="mx-1.5" fill="#d7eefa"/>
                    </li>
                    <li>
                        <IoIosGlobe className="mx-1.5" color="#d7eefa"/>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Navbar