import React from 'react';

interface IContainerProps {
    title?: string
    children?: JSX.Element;
}

export function Container({title, children}: IContainerProps) {
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-2/3 p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
      {children}
      </div>
    </div>
  );
}
