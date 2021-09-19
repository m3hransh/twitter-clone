import React, { FC } from 'react';

interface ErrorMessageProps {
  className?: string;
  chidlren?: React.ReactNode;
  error: string | undefined;
  touched: boolean | undefined;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ error, touched }) => {
  return (
    <>
      {error && touched ? (
        <div className="h-6 text-red-600 text-sm">{error}</div>
      ) : (
        <div className="h-6"></div>
      )}
    </>
  );
};

export default ErrorMessage;
