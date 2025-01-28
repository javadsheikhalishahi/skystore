import Image from "next/image";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left section with background */}
      <section className="p-6 md:p-10 bg-cover bg-center w-full md:w-1/2 background-section relative">
        {/* Logo */}
        <div className="absolute top-4 left-4">
          <Image
            src="/assets/icons/logo.png"
            alt="logo"
            width={120}
            height={80}
            className="h-auto"
          />
        </div>

        {/* Content */}
        <div className="max-w-md mx-auto space-y-5 text-center md:text-left mt-96">
          <h1
            className="text-2xl md:text-4xl font-bold"
            style={{
              background: "linear-gradient(to right, #56B8FF, #3DD9B3)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Manage your files the best way
          </h1>

          <p className="text-base font-semibold md:text-lg lg:pt-8 text-zinc-700">
            This is a place where you can store all your documents.
          </p>
        </div>
      </section>

      {/* Right section for form */}
      <section className="flex flex-1 flex-col items-center justify-center bg-white p-6 md:p-10">
        <div className=" relative ">
          <Image
            src="/assets/icons/logo.png"
            alt="logo"
            width={120}
            height={82}
            className="h-auto lg:hidden"
          />
        </div>
        {children}
      </section>
    </div>
  );
};

export default Layout;
