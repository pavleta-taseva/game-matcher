export const navLinks = [
  {
    path: '/register',
    name: 'Sign Up',
    session: false,
  },
  {
    path: '/favorites',
    name: 'Favorites',
    session: true,
    profile: true,
  },
  {
    path: '/login',
    name: 'Login',
    session: false,
  },
  {
    path: '/#',
    name: 'Logout',
    session: true,
    profile: true,
  },
];
