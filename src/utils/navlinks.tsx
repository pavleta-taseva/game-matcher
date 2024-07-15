import { IoGameControllerOutline } from "react-icons/io5";
import { GiEgyptianProfile } from "react-icons/gi";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { RiLoginCircleLine } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import { IoMdPersonAdd } from "react-icons/io";
import { SiAmazongames } from "react-icons/si";

export const navLinks = [
    {
        path: '/',
        name: 'Home',
        icon: <IoGameControllerOutline className='mr-2' />,
        isLoggedIn: false
    },
    {
        path: '/games',
        name: 'All Games',
        icon: <SiAmazongames className='mr-2' />,
        isLoggedIn: false
    },
    {
        path: '/profile',
        name: 'Profile',
        icon: <GiEgyptianProfile className='mr-2' />,
        isLoggedIn: true
    },
    {
        path: '/register',
        name: 'Sign up',
        icon: <IoMdPersonAdd className='mr-2' />,
        isLoggedIn: false
    },
    {
        path: '/favorites',
        name: 'Favorites',
        icon: <MdOutlineFavoriteBorder className='mr-2' />,
        isLoggedIn: true
    },
    {
        path: '/login',
        name: 'Login',
        icon: <RiLoginCircleLine className='mr-2' />,
        isLoggedIn: false
    },
    {
        path: '/logout',
        name: 'Logout',
        icon: <IoMdLogOut className='mr-2' />,
        isLoggedIn: true
    },
]