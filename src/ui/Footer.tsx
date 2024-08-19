import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="mt-8 flex h-32 flex-col items-center justify-center bg-footerBackground text-primaryLight">
      <span>&#169; 2024 Pavleta Taseva</span>
      <span>
        Designed with <span className="text-primaryPurple">♡</span> by{' '}
        <Link
          aria-label={'VabiGraphics'}
          href="https://www.teepublic.com/user/vabigraphics"
          target="_blanc"
          className="hover:text-primaryPurple"
        >
          VabiGraphics
        </Link>
      </span>
      <span>All rights reserved</span>
    </div>
  );
};

export default Footer;
