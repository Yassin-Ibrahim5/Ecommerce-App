"use client";
import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";
import {Loader} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import ShowHidePassword from "@/components/input-comps/ShowHidePassword";

export default function LoginPage() {
    interface Inputs {
        email: string;
        password: string;
    }

    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function onSubmit(values: Inputs) {
        setLoading(true);
        try {
            const response = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
            });
            if (response?.ok) {
                setErrorMessage(null);
                toast.success("Login Successful!");
                router.push("/");
            } else {
                setErrorMessage("Invalid email or password");
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.message.includes("CredentialsSignin")) {
                    setErrorMessage("Invalid email or password");
                }
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={`my-30 font-[Poppins] px-4 sm:px-6 lg:px-8`}>
            <div className="w-full md:w-3/4 lg:w-1/2 mx-auto">
                <h2 className="text-2xl md:text-3xl mb-5 md:text-start font-bold uppercase font-[Poppins] text-[#222222]">Login</h2>
                {errorMessage && <p className="text-red-500 text-center text-sm md:text-lg">{errorMessage}</p>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input {...register("email", {required: "Email is Required"})}
                           className="p-3 md:p-5 my-3 md:my-5 focus-visible:ring-[#717FE080]" type="email"
                           placeholder="Email"/>
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    <div className="relative">
                        <ShowHidePassword {...register("password", {required: "Password is Required"})}
                                          placeholder={"Password"}/>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    <div className="flex items-center gap-5">
                        <Button type="submit" disabled={loading}
                                className={`w-full sm:w-auto px-6 py-3 md:px-10 md:py-5 cursor-pointer my-5 bg-black rounded-[22px] hover:bg-[#717FE0] hover:text-white border-1 transition-all duration-400 border-[#e6e6e6] text-white uppercase font-[Poppins]`}>
                            {loading ? <Loader className={`animate-spin`} size={20}/> : "Login"}
                        </Button>
                    </div>
                    <p className="mb-2">
                        <Link href="/forgot-password" className="text-[#717FE0] hover:underline">Forgot your
                            password?</Link>
                    </p>
                    <p className="mb-2">
                        Don't have an account? <Link href="/register" className="text-[#717FE0] hover:underline">Register</Link>
                    </p>

                </form>
            </div>
        </div>
    );
}
