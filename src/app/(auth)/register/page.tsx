"use client";
import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import axios from "axios";
import {Loader} from "lucide-react";
import toast from "react-hot-toast";
import ShowHidePassword from "@/components/input-comps/ShowHidePassword";
import Link from "next/link";

export default function RegisterPage() {
    interface Inputs {
        email: string;
        name: string;
        password: string;
        rePassword: string;
        phone: string;
    }

    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function onSubmit(values: Inputs) {
        setLoading(true);
        try {
            const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
            if (response?.data.message === "success") {
                setErrorMessage(null);
                toast.success("Registration Successful! Please login to continue.");
                router.push("/login");
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setErrorMessage(error.response?.data.errors?.msg ? error.response?.data.errors?.msg : error.response?.data.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={`my-30 font-[Poppins] px-4 sm:px-6 lg:px-8`}>
            <div className="w-full md:w-3/4 lg:w-1/2 mx-auto">
                <h2 className="text-2xl md:text-3xl mb-5 md:text-start font-bold uppercase font-[Poppins] text-[#222222]">Register</h2>
                {errorMessage && <p className="text-red-500 text-sm text-center md:text-lg">{errorMessage}</p>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input {...register("name", {required: "Name is Required"})}
                           className="p-3 md:p-5 my-3 md:my-5 focus-visible:ring-[#717FE080]" type="text"
                           placeholder="Name"/>
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                    <Input {...register("email", {required: "Email is Required"})}
                           className="p-3 md:p-5 my-3 md:my-5 focus-visible:ring-[#717FE080]" type="email"
                           placeholder="Email"/>
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                    <div className="relative passwordInput">
                        <ShowHidePassword {...register("password", {required: "Password is Required"})}
                                          placeholder="Password"/>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                    <div className="relative rePasswordInput">
                        <ShowHidePassword {...register("rePassword", {required: "Confirm Password is Required"})}
                                          placeholder="RePassword"/>
                    </div>
                    {errors.rePassword && <p className="text-red-500 text-sm">{errors.rePassword.message}</p>}

                    <Input {...register("phone", {required: "Phone Number is Required"})}
                           className="p-3 md:p-5 my-3 md:my-5 focus-visible:ring-[#717FE080]"
                           type="text" placeholder="Phone Number"/>
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

                    <div className="flex items-center flex-col md:flex-row gap-5">
                        <Button type="submit" disabled={loading}
                                className={`w-full sm:w-auto px-6 py-3 md:px-10 md:py-5 cursor-pointer my-3 md:my-5 bg-black rounded-[22px] hover:bg-[#717FE0] hover:text-white border-1 transition-all duration-400 border-[#e6e6e6] text-white uppercase font-[Poppins]`}>
                            {loading ? <Loader className={`animate-spin`} size={20}/> : "Register"}
                        </Button>
                        <p className="w-full sm:w-auto text-center">
                            Already have an account? <Link href="/login" className="text-[#717FE0] hover:underline">Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
