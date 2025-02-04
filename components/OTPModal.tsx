"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { sendEmailOTP, verifySecret } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

const OtpModal = ({ accountId, email }: { accountId: string; email: string }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(20); 
  const [isResending, setIsResending] = useState(false);
  const handleClose = () => {
    setTimeout(() => setIsOpen(false), 300);
  };
  const router = useRouter();

  useEffect(() => {
    // Countdown timer for resend OTP
    const timer = setInterval(() => {
      if (resendTimer > 0) setResendTimer((prev) => prev - 1);
      else clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  useEffect(() => {
    const firstOtpField = document.querySelector(".otp-slot") as HTMLElement | null;
    if (firstOtpField) {
      firstOtpField.focus();
    }
  }, []);
  

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const sessionId = await verifySecret({ accountId, password });
  
      if (sessionId) {
        toast.success("OTP verified successfully! ✅");
        router.push("/");
      } else {
        throw new Error("Invalid OTP or session issue"); 
      }
    } catch (error: any) {
      console.error("Failed to verify OTP:", error); 
  
      
      const errorMessage =
        error?.message || "OTP verification failed. Please try again.";
  
      toast.error(errorMessage); 
    } finally {
      setIsLoading(false);
    }
  };
  const handleResendOtp = async () => {
    if (resendTimer === 0 && !isResending) {
      setIsResending(true);
      try {
        await sendEmailOTP({ email });
        setResendTimer(20);
        toast.success("OTP resent successfully!", { icon: "📩" });
      } catch (error) {
        toast.error("Failed to resend OTP. Try again.", { icon: "❌" });
      } finally {
        setIsResending(false);
      }
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader className="relative flex justify-center">
          <AlertDialogTitle className="h2 text-center pb-3">
            Enter your OTP code
            <Image
              src="/assets/icons/close-bold-svgrepo-com.svg"
              alt="close"
              width={20}
              height={20}
              onClick={handleClose}
              className="close-button-otp"
            />
          </AlertDialogTitle>
          <AlertDialogDescription className="sub-2 text-light-100 text-center">
            We've sent a code to{" "}
            <span className="pl-1 text-blue">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup className="otp-shad">
            <InputOTPSlot index={0} className="otp-slot" />
            <InputOTPSlot index={1} className="otp-slot" />
            <InputOTPSlot index={2} className="otp-slot" />
            <InputOTPSlot index={3} className="otp-slot" />
            <InputOTPSlot index={4} className="otp-slot" />
            <InputOTPSlot index={5} className="otp-slot" />
          </InputOTPGroup>
        </InputOTP>

        <AlertDialogFooter>
          <div className="flex w-full flex-col gap-4">
            <AlertDialogAction
              onClick={handleSubmit}
              className="h-12 sm:h-14 shad-submit-btns"
              type="button"
            >
              Verify
              {isLoading && (
                <Image
                  src="/assets/icons/tube-spinner.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="animate-spin ml-2"
                />
              )}
            </AlertDialogAction>
            <div className="sub-2 mt-2 text-center text-light-100">
              Didn't get a code?{" "}
              <Button
  type="button"
  variant="link"
  className="pl-1 text-xs font-semibold text-brand underline"
  onClick={handleResendOtp}
  disabled={resendTimer > 0 || isResending}
>
{isResending ? (
    <>
      <Image
        src="/assets/icons/tube-spinner.svg"
        alt="loader"
        width={20}
        height={20}
        className="animate-spin mr-1"
      />
      Sending...
    </>
  ) : resendTimer > 0 ? (
    `Wait ${resendTimer}s`
  ) : (
    "Click here to resend code"
  )}
</Button>

            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OtpModal;
