"use client";
import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import axios from "axios";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Loader} from "lucide-react";

export default function ForgotPassword() {
    interface Inputs {
        email: string;
    }

    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();
    const [errorMessage, setErrorMessage] = useState<any>(null);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function onSubmit(values: Inputs) {
        setLoading(true);

        try {
            const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values);
            if (response?.data.statusMsg === "success") {
                router.push("/forgot-password/verify-code");
            } else {
                setErrorMessage(response?.data.message);
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
        <div className="my-30 font-[Poppins]">
            <div className="w-1/2 mx-auto">
                <h2 className="text-3xl mb-3 text-start font-bold uppercase font-[Poppins] text-[#222222]">Recover your
                    Account</h2>
                <p className="text-gray-500 ">You can request a password reset below. We will send a security code to
                    the
                    email address, please make sure it is correct.</p>
                {errorMessage && <p className="text-red-500 text-lg">{errorMessage}</p>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input {...register("email", {required: "Email is Required"})}
                           className="p-5 my-5 focus-visible:ring-[#717FE080]" type="email"
                           placeholder="Email"/>
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    <div className="flex items-center gap-5">
                        <Button type="submit" disabled={loading}
                                className={`px-10 py-5 cursor-pointer my-5 bg-black rounded-[22px] hover:bg-[#717FE0] hover:text-white border-1 transition-all duration-400 border-[#e6e6e6] text-white uppercase font-[Poppins]`}>
                            {loading ? <Loader className={`animate-spin`} size={20}/> : "Send"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

