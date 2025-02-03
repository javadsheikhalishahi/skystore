"use client";

import { navItems } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();
  return (
    <aside className="sidebar">
      <Link href="/">
        <Image
          src="/assets/icons/logo.png"
          alt="logo"
          width={160}
          height={50}
          className="hidden lg:block h-auto"
        />
        <Image
          src="/assets/icons/logo.png"
          alt="logo"
          width={52}
          height={52}
          className="lg:hidden"
        />
      </Link>

      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-6">
           {navItems.map(({ name, url, icon }) => (
            <Link key={name} href={url}>
                <li>
                    <Image src={icon} alt={name} width={24} height={24}/>
                    <p>{name}</p>
                </li>
            </Link>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
