"use client";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import axios from "axios";
import {Loader} from "lucide-react";
import toast from "react-hot-toast";
import {getUserToken} from "@/lib/token.utils";
import {signOut} from "next-auth/react";

export default function ChangePassword() {
    interface Inputs {
        currentPassword: string;
        password: string;
        rePassword: string;
    }
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function onSubmit(values: Inputs) {
        setLoading(true);
        try {
            const token = await getUserToken();
            const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`, values, {
                headers: {
                    token: token as string
                }
            });
            if (response?.statusText === "OK") {
                setErrorMessage(null);
                toast.success("Password Changed Successfully! Please login with your new password.");
                await signOut({callbackUrl: "/login"});
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
        <div>
            <div className="w-1/2 mx-auto my-10">
                <h2 className="text-3xl tracking-tighter font-bold">Change Password</h2>
                {errorMessage && <p className="text-red-700 text-center text-lg">{errorMessage}</p>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input {...register("currentPassword", {required: "Current Password is Required"})} className="p-5 my-5"
                           type="password" placeholder="Current Password"/>
                    {errors.currentPassword && <p className="text-red-700">{errors.currentPassword.message}</p>}
                    <Input {...register("password", {required: "New Password is Required"})} className="p-5 my-5"
                           type="password" placeholder="New Password"/>
                    {errors.password && <p className="text-red-700">{errors.password.message}</p>}
                    <Input {...register("rePassword", {required: "RePassword is Required"})} className="p-5 my-5"
                           type="password" placeholder="RePassword"/>
                    {errors.rePassword && <p className="text-red-700">{errors.rePassword.message}</p>}
                    <div className="flex items-center gap-5">
                        <Button type="submit" disabled={loading} className="px-10 py-5 my-5 cursor-pointer">
                            {loading ? <Loader className={`animate-spin`} size={20}/> : "Change Password"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}