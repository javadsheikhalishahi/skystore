"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createAccount } from "@/lib/actions/user.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import OtpModal from "./OTPModal";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    fullName:
      formType === "sign-up"
        ? z.string().min(4, "fullName must be at least 4 characters").max(50)
        : z.string().optional(),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [accountId, setAccountId] = useState(null);
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      type === "sign-up" ? { fullName: "", email: "" } : { email: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const user = await createAccount({
        fullName: values.fullName || "",
        email: values.email,
      });

      setAccountId(user.accountId);
    } catch (error: any) {
      if (error.message === "Email already in use") {
        setErrorMessage("This email is already registered. Please use a different email or sign in.");
      } else {
        setErrorMessage("Failed to create an account. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }

    try {
      console.log("Submitting:", values);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Signed in successfully!");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full justify-center transition-all max-w-sm lg:max-w-screen-md space-y-6 mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-3xl font-bold text-center">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
          </h2>
          {type === "sign-up" && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col justify-center rounded-xl border border-light-300 px-4 py-2 shadow-drop-1">
                    <FormLabel className="text-light-100 pt-2 w-full text-[14px] leading-[20px] font-normal">
                      Full Name
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        className="shad-input"
                        {...field}
                      />
                    </FormControl>
                  </div>

                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col justify-center rounded-xl border border-light-300 px-4 py-2 shadow-drop-1">
                  <FormLabel className="text-light-100 pt-2 w-full text-[14px] leading-[20px] font-normal">
                    Email
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full p-5 rounded-2xl"
            disabled={isLoading}
          >
            {type === "sign-in" ? "Sign In" : "Sign Up"}

            {isLoading && (
              <Image
                src="/assets/icons/tube-spinner.svg"
                alt="loader"
                width={26}
                height={26}
                className="ml-2 animate-spin"
              />
            )}
          </Button>

          {errorMessage && (
  <div className="flex items-center gap-2 justify-center  border border-red-400 text-red2 px-4 py-2 rounded-lg text-sm text-center shadow-md">
    <Image src="/assets/icons/error-svgrepo-com.svg" alt="error" width={24} height={24} />
    <span>{errorMessage}</span>
  </div>
)}

          <div className="body-2 flex justify-center">
            <p className="text-light-100 underline">
              {type === "sign-in"
                ? "Don`t have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="ml-1 font-semibold text-blue"
            >
              {" "}
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </form>
      </Form>
      {/* OTP Verification */}

      {accountId && (
        <OtpModal email={form.getValues("email")} accountId={accountId} />
      )}
    </>
  );
};

export default AuthForm;
