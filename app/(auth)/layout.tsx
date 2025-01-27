import Image from 'next/image';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row relative">
      {/* Left section with background and content */}
      <section className="p-6 md:p-10 bg-cover bg-center w-full md:w-1/2 background-section relative">
        {/* Logo positioned in the top-left corner */}
        <div className="absolute top-4 left-4">
          <Image
            src="/assets/icons/logo.png"
            alt="logo"
            width={120}
            height={80}
            className="h-auto"
          />
        </div>

        {/* Content below */}
        <div className="max-w-md mx-auto md:mx-0 space-y-5 text-center md:text-left text-white mt-24">
          <h1 className="text-2xl md:text-4xl font-bold pt-20 bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text">
            Manage your files the best way
          </h1>
          <p className="text-base font-semibold md:text-lg">
            This is a place where you can store all your documents.
          </p>
        </div>
      </section>
       
      <section className='flex flex-1 flex-col items-center justify-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0'>
       
      </section>
      {/* Right section for children */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default Layout;
