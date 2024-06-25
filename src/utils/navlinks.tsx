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
        icon: <IoGameControllerOutline style={{ marginRight: 8 }} />,
        isLoggedIn: false
    },
    {
        path: '/games',
        name: 'All Games',
        icon: <SiAmazongames style={{ marginRight: 8 }} />,
        isLoggedIn: false
    },
    {
        path: '/profile',
        name: 'Profile',
        icon: <GiEgyptianProfile style={{ marginRight: 8 }} />,
        isLoggedIn: true
    },
    {
        path: '/register',
        name: 'Sign up',
        icon: <IoMdPersonAdd style={{ marginRight: 8 }} />,
        isLoggedIn: false
    },
    {
        path: '/favorites',
        name: 'Favorites',
        icon: <MdOutlineFavoriteBorder style={{ marginRight: 8 }} />,
        isLoggedIn: true
    },
    {
        path: '/login',
        name: 'Login',
        icon: <RiLoginCircleLine style={{ marginRight: 8 }} />,
        isLoggedIn: false
    },
    {
        path: '/logout',
        name: 'Logout',
        icon: <IoMdLogOut style={{ marginRight: 8 }} />,
        isLoggedIn: true
    },
]