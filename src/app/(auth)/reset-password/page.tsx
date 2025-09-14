"use client";
import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import axios from "axios";
import {Input} from "@/components/ui/input";
import {Loader} from "lucide-react";
import {Button} from "@/components/ui/button";
import toast from "react-hot-toast";
import ShowHidePassword from "@/components/input-comps/ShowHidePassword";

export default function ResetPasswordPage() {
    interface Inputs {
        email: string;
        newPassword: string;
    }

    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function onSubmit(values: Inputs) {
        setLoading(true);
        try {
            const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values);
            if (response?.statusText === "OK") {
                setErrorMessage(null);
                toast.success("Password Reset Successfully! Please login with your new password.");
                router.push("/login");
            } else {
                setErrorMessage(response?.data.message);
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setErrorMessage(error.response?.data.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={`my-30 font-[Poppins]`}>
            <div className="w-1/2 mx-auto">
                <h2 className="text-3xl mb-3 text-start font-bold uppercase font-[Poppins] text-[#222222]">Reset
                    Password</h2>
                <p className="text-gray-500">Enter your email & new password below</p>
                {errorMessage && <p className="text-red-700 text-center text-lg">{errorMessage}</p>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input {...register("email", {required: "Email is Required"})}
                           className="p-5 my-5 focus-visible:ring-[#717FE080]" type="email"
                           placeholder="Email"/>
                    {errors.email && <p className="text-red-700">{errors.email.message}</p>}
                    <div className="relative">
                        <ShowHidePassword {...register("newPassword", {required: "Password is Required"})}
                                          placeholder="Password"/>
                    </div>
                    {errors.newPassword && <p className="text-red-700">{errors.newPassword.message}</p>}
                    <div className="flex items-center gap-5">
                        <Button type="submit" disabled={loading}
                                className={`px-10 py-5 cursor-pointer my-5 bg-black rounded-[22px] hover:bg-[#717FE0] hover:text-white border-1 transition-all duration-400 border-[#e6e6e6] text-white uppercase font-[Poppins]`}>
                            {loading ? <Loader className={`animate-spin`} size={20}/> : "Reset Password"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

