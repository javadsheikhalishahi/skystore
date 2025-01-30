"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp";
import { sendEmailOTP, verifySecret } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "./ui/button";

const OtpModal = ({ accountId, email}: { accountId: string; email: string;}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const sessionId = await verifySecret({ accountId, password });
      console.log({ sessionId });

      if(sessionId) router.push("/");
    } catch (error) {
      console.log("Failed to verify OTP", error);
    }
    setIsLoading(false);
  };

  const handleResendOtp = async () => {
    await sendEmailOTP({ email });
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader className="relative flex justify-center">
          <AlertDialogTitle className="h2 text-center">Enter your OTP code
            <Image src="/assets/icons/close-bold-svgrepo-com.svg" alt="close" width={20} height={20} onClick={() => setIsOpen(false)} className="close-button-otp"/>
          </AlertDialogTitle>
          <AlertDialogDescription className="sub-2 text-light-100 text-center">
           we've sent a code to <span className="pl-1 text-blue">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup className="otp-shad">
            <InputOTPSlot index={0} className="otp-slot"/>
            <InputOTPSlot index={1} className="otp-slot"/>
            <InputOTPSlot index={2} className="otp-slot"/>
            <InputOTPSlot index={3} className="otp-slot"/>
            <InputOTPSlot index={4} className="otp-slot"/>
            <InputOTPSlot index={5} className="otp-slot"/>
          </InputOTPGroup>
        </InputOTP>

        <AlertDialogFooter>
          <div className="flex w-full flex-col gap-4">
            <AlertDialogAction onClick={handleSubmit} className="h-12 sm:h-14 shad-submit-btns" type="button">Submit
              {isLoading && (
              <Image 
                src="/assets/icons/tube-spinner.svg"
                alt="loader"
                width={24}
                height={24}
                className="animate-spin ml-2"
              />)}
            </AlertDialogAction>
            <div className="sub-2 mt-2 text-center text-light-100">
              Didn't get a code?
              <Button type="button" variant="link" className="pl-1 font-sans text-brand underline" onClick={handleResendOtp}>Click here to resend code</Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OtpModal;
