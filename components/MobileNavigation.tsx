"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { navItems } from "@/constants";
import { SignOutUser } from "@/lib/actions/user.actions";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import FileUploader from "./FileUploader";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface Props {
  ownerId: string,
  accountId: string,
  fullName: string,
  email: string,
  avatar: string,
}
const MobileNavigation = ({ ownerId, accountId, fullName, email, avatar}: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
   <header className="mobile-header">
      <Image src="/assets/icons/logo.png" alt="logo-mobile" width={80} height={52} className="h-auto" />
      <Sheet open={open} onOpenChange={setOpen}>
  <SheetTrigger>
    <Image src="/assets/icons/menu.svg" alt="menu" width={30} height={30}/>
  </SheetTrigger>
  <SheetContent className="h-screen px-3 pt-1">
      <SheetTitle>
        <div className="header-user-menu"> 
           <Image src={avatar} alt="avatar" width={44} height={44} className="header-user-avatar-menu"/>
          <div className="sm:hidden lg:block">
           <p className="text-[14px] leading-[20px] font-semibold capitalize">{fullName}</p>
           <p className="text-[12px] leading-[16px] font-normal">{email}</p>
         </div>
        </div>
        <Separator className="mb-4 bg-light-200/40"/>
      </SheetTitle>
      <nav className="mobile-navbar">
        <ul className="mobile-navbar-list">
        {navItems.map(({ name, url, icon }) => (
            <Link key={name} href={url} className="lg:w-full">
                <li className={cn("mobile-navbar-item", pathname === url && "shad-active",)}>
                    <Image src={icon} alt={name} width={24} height={24} className={cn("nav-icon", pathname === url && "nav-icon-active")}/>
                    <p>{name}</p>
                </li>
            </Link>
          ))}
        </ul>
      </nav>
      <Separator className="my-5 bg-light-200/10"/>
      <div className="flex flex-col justify-between gap-5 pb-5">
       <FileUploader accountId={""} ownerId={""} />
        <Button type="submit" className="mobile-sign-out-button" aria-label="Sign out" title="Sign out" onClick={async () => await SignOutUser()}>
                <Image src="/assets/icons/logout-svgrepo-com.svg" alt="logo" width={24} height={24} />
                <p>Logout</p>
            </Button>
      </div>
  </SheetContent>
</Sheet>

   </header>
  )
}

export default MobileNavigation
