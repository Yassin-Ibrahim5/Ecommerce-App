"use client";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import axios from "axios";
import {Loader} from "lucide-react";
import toast from "react-hot-toast";
import {getUserToken} from "@/lib/token.utils";
import {signOut} from "next-auth/react";
import ShowHidePassword from "@/components/input-comps/ShowHidePassword";

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
        console.log(values);
        setLoading(true);
        try {
            const token = await getUserToken();
            if (!token) {
                return;
            }
            if (values.password !== values.rePassword) {
                setErrorMessage("Passwords do not match");
                return;
            }
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
        <div className="my-30 font-[Poppins]">
            <div className="w-1/2 mx-auto">
                <h2 className="text-3xl mb-5 text-start font-bold uppercase font-[Poppins] text-[#222222]">Change
                    Password</h2>
                {errorMessage && <p className="text-red-700 text-center text-lg">{errorMessage}</p>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="relative currentPasswordInput">
                        <ShowHidePassword {...register("currentPassword", {required: "Current Password is Required"})}
                                          placeholder="Current Password"/>
                    </div>
                    {errors.currentPassword && <p className="text-red-700">{errors.currentPassword.message}</p>}

                    <div className="relative newPasswordInput">
                        <ShowHidePassword {...register("password", {required: "New Password is Required"})}
                                          placeholder={"New Password"}/>
                    </div>
                    {errors.password && <p className="text-red-700">{errors.password.message}</p>}
                    <div className="relative rePasswordInput">
                        <ShowHidePassword {...register("rePassword", {required: "RePassword is Required"})}
                                          placeholder={"RePassword"}/>
                    </div>
                    {errors.rePassword && <p className="text-red-700">{errors.rePassword.message}</p>}

                    <div className="flex items-center gap-5">
                        <Button type="submit" disabled={loading}
                                className={`px-10 py-5 cursor-pointer bg-black rounded-[22px] hover:bg-[#717FE0] hover:text-white border-1 transition-all duration-400 border-[#e6e6e6] text-white uppercase font-[Poppins]`}>
                            {loading ? <Loader className={`animate-spin`} size={20}/> : "Change Password"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}