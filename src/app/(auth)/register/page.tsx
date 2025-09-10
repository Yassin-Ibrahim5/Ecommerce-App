"use client";
import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import axios from "axios";
import {Loader} from "lucide-react";

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
            console.log(response);
            if (response?.data.message === "success") {
                setErrorMessage(null);
                router.push("/login");
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data);
                setErrorMessage(error.response?.data.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="w-1/2 mx-auto my-10">
                <h2 className="text-3xl tracking-tighter font-bold">Register</h2>
                {errorMessage && <p className="text-red-700 text-center text-lg">{errorMessage}</p>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input {...register("name", {required: "Name is Required"})} className="p-5 my-5" type="text"
                           placeholder="Name"/>
                    {errors.name && <p className="text-red-700">{errors.name.message}</p>}
                    <Input {...register("email", {required: "Email is Required"})} className="p-5 my-5" type="email"
                           placeholder="Email"/>
                    {errors.email && <p className="text-red-700">{errors.email.message}</p>}
                    <Input {...register("password", {required: "Password is Required"})} className="p-5 my-5"
                           type="password" placeholder="Password"/>
                    {errors.password && <p className="text-red-700">{errors.password.message}</p>}
                    <Input {...register("rePassword", {required: "Confirm Password is Required"})} className="p-5 my-5"
                           type="password"
                           placeholder="RePassword"/>
                    {errors.rePassword && <p className="text-red-700">{errors.rePassword.message}</p>}
                    <Input {...register("phone", {required: "Phone Number is Required"})} className="p-5 my-5"
                           type="text" placeholder="Phone Number"/>
                    {errors.phone && <p className="text-red-700">{errors.phone.message}</p>}
                    <div className="flex items-center gap-5">
                        <Button type="submit" disabled={loading} className="px-10 py-5 my-5 cursor-pointer">
                            {loading ? <Loader className={`animate-spin`} size={20}/> : "Register"}
                        </Button>
                        <p className="text-center">
                            Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
