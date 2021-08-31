import React, { FC } from 'react';
import LeftNav from './LeftNav';

interface LayoutProps {
  className?: string;
  chidlren?: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <div className="flex flex-col mx-auto max-w-6xl md:grid lg:grid-cols-layout md:grid-cols-layoutmd">
        {/* Left */}
        <div className="sticky hidden lg:block">
          <LeftNav />
        </div>
        {/* middle */}
        <div className="md:border-r-2 md:border-l-2 border-b-8">
          {children}
        </div>
        {/* right */}
        <div className="bg-accent">Right</div>
      </div>
    </div>
  );
};

export default Layout;
