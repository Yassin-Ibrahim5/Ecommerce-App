"use client";
import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Loader} from "lucide-react";


export default function VerifyCode() {
    interface Input {
        resetCode: string;
    }

    const {register, handleSubmit, formState: {errors}} = useForm<Input>();
    const [errorMessage, setErrorMessage] = useState(null);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function onSubmit(values: Input) {
        setLoading(true);
        try {
            const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values);
            if (response?.data.status === "Success") {
                toast.success("Security Code Verified Successfully");
                router.push("/reset-password");
            } else {
                setErrorMessage(response?.data.message);
                toast.error("Security Code is Invalid");
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
        <div className="my-30 font-[Poppins]">
            <div className="w-1/2 mx-auto">
                <h2 className="text-3xl mb-3 text-start font-bold uppercase font-[Poppins] text-[#222222]">Security Code
                    to Reset Password</h2>
                <p className="text-gray-500">Insert the security code sent to your email in order to proceed with the
                    password reset.</p>
                {errorMessage && <p className="text-red-700 text-center text-lg">{errorMessage}</p>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input {...register("resetCode", {required: "Security Code is Required",})}
                           className="p-5 my-5 focus-visible:ring-[#717FE080]"
                           type="text" placeholder="Security Code"/>
                    {errors.resetCode && <p className="text-red-700">{errors.resetCode.message}</p>}
                    <div className="flex items-center gap-5">
                        <Button type="submit" disabled={loading}
                                className={`px-10 py-5 cursor-pointer my-5 bg-black rounded-[22px] hover:bg-[#717FE0] hover:text-white border-1 transition-all duration-400 border-[#e6e6e6] text-white uppercase font-[Poppins]`}>
                            {loading ? <Loader className={`animate-spin`} size={20}/> : "Verify"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
