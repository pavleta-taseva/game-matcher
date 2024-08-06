import React from 'react';
import { GiEgyptianProfile } from 'react-icons/gi';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { RiLoginCircleLine } from 'react-icons/ri';
import { IoMdLogOut } from 'react-icons/io';
import { IoMdPersonAdd } from 'react-icons/io';
import { SiAmazongames } from 'react-icons/si';
import { FaHome } from 'react-icons/fa';

export const navLinks = [
  {
    path: '/',
    name: 'Home',
    icon: <FaHome className="mr-2" />,
    session: false,
    profile: true,
  },
  {
    path: '/games',
    name: 'All Games',
    icon: <SiAmazongames className="mr-2" />,
    session: false,
    profile: true,
  },
  {
    path: '/profile',
    name: 'Profile',
    icon: <GiEgyptianProfile className="mr-2" />,
    session: true,
    profile: true,
  },
  {
    path: '/register',
    name: 'Sign up',
    icon: <IoMdPersonAdd className="mr-2" />,
    session: false,
  },
  {
    path: '/favorites',
    name: 'Favorites',
    icon: <MdOutlineFavoriteBorder className="mr-2" />,
    session: true,
    profile: true,
  },
  {
    path: '/login',
    name: 'Login',
    icon: <RiLoginCircleLine className="mr-2" />,
    session: false,
  },
  {
    path: '/logout',
    name: 'Logout',
    icon: <IoMdLogOut className="mr-2" />,
    session: true,
    profile: true,
  },
];
