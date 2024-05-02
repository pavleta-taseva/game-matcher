import React from 'react';
import Link from 'next/link';
import { IoGameControllerOutline } from "react-icons/io5";
import { GiEgyptianProfile } from "react-icons/gi";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { RiLoginCircleLine } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import { IoMdPersonAdd } from "react-icons/io";

const Navbar = () => {
    return (
        <div className="p-8 bg-secondary text-lg w-full h-8 flex justify-end items-center">
            <Link href="/">
                <div className="flex items-center hover:text-secondary">
                    <IoGameControllerOutline style={{ marginRight: 8 }} />
                    <div className="w-32 flex justify-start items-center">
                        <p>Home</p>
                    </div>
                </div>
            </Link>
            <Link href="/profile">
                <div className="flex items-center hover:text-secondary">
                    <GiEgyptianProfile style={{ marginRight: 8 }} />
                    <div className="w-32 flex justify-start items-center">
                        <p>Profile</p>
                    </div>
                </div>
            </Link>
            <Link href="/register">
                <div className="flex items-center hover:text-secondary">
                    <IoMdPersonAdd style={{ marginRight: 8 }} />
                    <div className="w-32 flex justify-start items-center">
                        <p>Sign up</p>
                    </div>
                </div>
            </Link>
            <Link href="/favorites">
                <div className="flex items-center hover:text-secondary">
                    <MdOutlineFavoriteBorder style={{ marginRight: 8 }} />
                    <div className="w-32 flex justify-start items-center">
                        <p>Favorites</p>
                    </div>
                </div>
            </Link>
            <Link href="/login">
                <div className="flex items-center hover:text-secondary">
                    <RiLoginCircleLine style={{ marginRight: 8 }} />
                    <div className="w-32 flex justify-start items-center">
                        <p>Login</p>
                    </div>
                </div>
            </Link>
            <Link href="/logout">
                <div className="flex items-center hover:text-secondary">
                    <IoMdLogOut style={{ marginRight: 8 }} />
                    <div className="w-32 flex justify-start items-center">
                        <p>Logout</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Navbar;
