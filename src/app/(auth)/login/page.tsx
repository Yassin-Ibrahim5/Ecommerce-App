"use client";
import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";
// Test@1234
function LoginPage() {
    interface Inputs {
        email: string;
        password: string;
    }

    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();
    const [errorMessage, setErrorMessage] = useState<any>(null);
    const router = useRouter();

    async function onSubmit(values: Inputs) {
        console.log(values, "Login Info");
        try {
            const response = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
            });
            console.log(response);
            if (response?.ok) {
                router.push("/");
            }
        } catch (error : unknown) {
            console.error(error);
            setErrorMessage(error);
        }
    }

    return (
        <div>
            <div className="w-1/2 mx-auto">
                <h2 className="text-3xl tracking-tighter font-bold">Login</h2>
                {errorMessage && <p className="text-red-700 text-center text-lg">{errorMessage}</p>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input {...register("email", {required: "Email is Required"})} className="p-5 my-5" type="email"
                           placeholder="Email"/>
                    {errors.email && <p className="text-red-700">{errors.email.message}</p>}
                    <Input {...register("password", {required: "Password is Required"})} className="p-5 my-5"
                           type="password" placeholder="Password"/>
                    {errors.password && <p className="text-red-700">{errors.password.message}</p>}

                    <Button type="submit" className="px-10 py-5 my-5 cursor-pointer">Login</Button>
                </form>
            </div>
        </div>

    );
}

export default LoginPage;