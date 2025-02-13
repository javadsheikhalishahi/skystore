"use client";

import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
    fullName: string,
    avatar: string,
    email: string,
}

const Sidebar = ({ fullName, avatar, email }: Props) => {
    const pathname = usePathname();
  return (
    <aside className="sidebar flex flex-col justify-between ">
      <Link href="/">
        <Image
          src="/assets/icons/logo.png"
          alt="logo"
          width={120}
          height={50}
          className="hidden lg:block h-auto scale-150 relative left-10" 
        />
        <Image
          src="/assets/icons/logo.png"
          alt="logo"
          width={52}
          height={52}
          className="lg:hidden"
        />
      </Link>

      <nav className="sidebar-nav mt-9">
        <ul className="flex flex-1 flex-col gap-6">
           {navItems.map(({ name, url, icon }) => (
            <Link key={name} href={url} className="lg:w-full">
                <li className={cn("sidebar-nav-item", pathname === url && "shad-active",)}>
                    <Image src={icon} alt={name} width={24} height={24} className={cn("nav-icon", pathname === url && "nav-icon-active")}/>
                    <p className="hidden lg:block">{name}</p>
                </li>
            </Link>
          ))}
        </ul>
      </nav>

      <Image src="/assets/images/bottom-main.png" alt="logo1" width={506} height={418} className="bottom-image"/>
      <div className="sidebar-info-user">
        <Image src={avatar} alt="User-Avatar" width={50} height={50} className="sidebar-user-avatar"/>
        <div className="hidden lg:block">
            <p className="text-[14px] leading-[20px] font-semibold capitalize">{fullName}</p>
            <p className="text-[12px] leading-[15px] font-normal">{email}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
