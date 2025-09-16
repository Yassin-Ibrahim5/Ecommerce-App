"use client";
import React, {useState} from "react"
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import {getUserToken} from "@/lib/token.utils";
import {signOut} from "next-auth/react";
import {Loader} from "lucide-react";

export default function ChangeData() {
    interface Inputs {
        name: string;
        email: string;
        phone: string;
    }

    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function onSubmit(values: Inputs) {
        setLoading(true);
        try {
            const token = await getUserToken();
            if (!token) {
                return;
            }
            const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/users/updateMe/`, values, {
                headers: {
                    token: token as string
                }
            });
            if (response?.statusText === "OK") {
                setErrorMessage(null);
                toast.success("Data Changed Successfully! Please login with your new data.");
                await signOut({callbackUrl: "/login"});
            } else {
                setErrorMessage(response?.data.message);
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setErrorMessage(error.response?.data?.errors?.msg);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={`my-30 font-[Poppins] px-4 sm:px-6 lg:px-8`}>
            <div className="w-full md:w-3/4 lg:w-1/2 mx-auto">
                <h2 className="text-2xl md:text-3xl mb-5 md:text-start font-bold uppercase font-[Poppins] text-[#222222]">Change User
                    Data</h2>
                {errorMessage && <p className="text-red-500 text-center text-sm md:text-lg">{errorMessage}</p>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input {...register("name", {required: "Name is Required"})}
                           className="p-3 md:p-5 my-3 md:my-5 focus-visible:ring-[#717FE080]"
                           type="text" placeholder="Name"/>
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                    <Input {...register("email", {required: "Email is Required"})}
                           className="p-3 md:p-5 my-3 md:my-5 focus-visible:ring-[#717FE080]"
                           type="email" placeholder="Email"/>
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                    <Input {...register("phone", {required: "Phone Number is Required"})}
                           className="p-3 md:p-5 my-3 md:my-5 focus-visible:ring-[#717FE080]"
                           type="text" placeholder="Phone Number"/>
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    <div className="flex items-center gap-5">
                        <Button type="submit" disabled={loading}
                                className="w-full sm:w-auto px-6 py-3 md:px-10 md:py-5 cursor-pointer my-3 md:my-5 bg-black rounded-[22px] hover:bg-[#717FE0] hover:text-white border-1 transition-all duration-400 border-[#e6e6e6] text-white uppercase font-[Poppins]">
                            {loading ? <Loader className={`animate-spin`} size={20}/> : "Change Data"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}