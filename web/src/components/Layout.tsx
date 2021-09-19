import React, { FC } from 'react';
import LeftNav from './LeftNav';

interface LayoutProps {
  className?: string;
  chidlren?: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <div className="flex justify-items-stretch mx-auto max-w-6xl lg:grid lg:grid-cols-layout ">
        {/* Left */}
        <div className="sticky w-14 lg:w-auto  h-screen top-0 ">
          <LeftNav />
        </div>
        {/* middle */}
        <div className=" w-full max-w-xl lg:max-w-none lg:w-auto md:border-r-2 md:border-l-2 border-b-8">
          {children}
        </div>
        {/* right */}
        <div className="bg-accent hidden md:block flex-1">Right</div>
      </div>
    </div>
  );
};

export default Layout;
