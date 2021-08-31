import React, { FC } from 'react';

interface LoadingProps {
  className?: string;
  chidlren?: React.ReactNode;
}

const Loading: FC<LoadingProps> = () => {
  return <div>Loading..</div>;
};

export default Loading;
