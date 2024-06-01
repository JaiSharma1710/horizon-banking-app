"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { authFormSchema } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import CustomInput from "./CustomInput";
import { signIn, signUp } from "@/lib/actions/user.actions";

const AuthForm = ({ type }: { type: "signIn" | "signUp" }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      if (type === "signUp") {
        const newUser = await signUp(data);
        setUser(newUser);
      } else if (type === "signIn") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        if (response) {
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image alt="logo" src="/icons/logo.svg" width={34} height={34} />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:test-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "signIn" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link Your Account To Get Started"
              : "Please Enter Your Details"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* paidlink */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {type === "signUp" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      placeholder="Enter your first name"
                      name="firstName"
                      label="First Name"
                    />

                    <CustomInput
                      control={form.control}
                      placeholder="Enter your last name"
                      name="lastName"
                      label="Last Name"
                    />
                  </div>

                  <CustomInput
                    control={form.control}
                    placeholder="Enter your address"
                    name="address"
                    label="Address"
                  />

                  <CustomInput
                    control={form.control}
                    placeholder="Enter your city"
                    name="city"
                    label="City"
                  />

                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      placeholder="Eg: NY"
                      name="state"
                      label="State"
                    />

                    <CustomInput
                      control={form.control}
                      placeholder="Eg: 110112"
                      name="postalCode"
                      label="Postal Code"
                    />
                  </div>

                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      placeholder="YYYY-MM-DD"
                      name="dob"
                      label="Date Of Birth"
                    />
                    <CustomInput
                      control={form.control}
                      placeholder="Eg: 1234"
                      name="ssn"
                      label="SSN"
                    />
                  </div>
                </>
              )}

              <CustomInput
                control={form.control}
                placeholder="Enter your email"
                label="Email"
                name="email"
              />

              <CustomInput
                control={form.control}
                placeholder="Enter your password"
                label="Password"
                name="password"
                isPassword
              />

              <div className="flex flex-col gap-4">
                <Button disabled={isLoading} type="submit" className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      &nbsp; Loading.....
                    </>
                  ) : type === "signIn" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "signIn"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              className="form-link"
              href={type === "signIn" ? "/sign-up" : "/sign-in"}
            >
              {type === "signIn" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
