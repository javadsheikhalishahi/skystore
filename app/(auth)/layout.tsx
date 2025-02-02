import Image from "next/image";
import React from "react";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left section with background */}
      <section className="p-6 md:p-10 bg-cover bg-center w-full md:w-1/2 background-section relative">
      <div className="absolute inset-0 bg-black opacity-10"></div>
        {/* Logo */}
        <div className="absolute top-4 left-4">
          <Image
            src="/assets/icons/logo.png"
            alt="logo"
            width={120}
            height={80}
            className="h-auto transition-transform duration-300 hover:scale-125"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-md mx-auto space-y-5 text-center md:text-left mt-96 pt-24">
          <h1
            className="text-2xl md:text-4xl font-bold "
            style={{
              backgroundImage: "linear-gradient(to right, #1e3a8a, #2563eb, #3b82f6)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              display: "inline-block", 
            }}
          >
            Manage your files the best way
          </h1>

          <p className="text-base font-semibold pb-5 md:text-lg lg:pt-8 text-zinc-900">
            This is a place where you can store all your documents.
          </p>
        </div>
      </section>
      
      {/* Right section for form */}
      <section className="flex flex-1 flex-col items-center justify-center pb-14 bg-white background-section2  p-6 md:p-10">
        <div className=" relative mb-6">
          <Image
            src="/assets/icons/logo.png"
            alt="logo"
            width={120}
            height={82}
            className="h-auto lg:hidden transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div className="w-full max-w-md bg-white p-8 rounded-2xl drop-shadow-2xl">
          {children}
        </div>
      </section>
      <Toaster position="top-center" />
    </div>
  );
};

export default Layout;
