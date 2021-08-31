import React, { FC } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

interface LoadingProps {
  className?: string;
  chidlren?: React.ReactNode;
}

const Loading: FC<LoadingProps> = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center align-middle">
      <ClipLoader color="#1E9BF0" size={100} />
    </div>
  );
};

export default Loading;
