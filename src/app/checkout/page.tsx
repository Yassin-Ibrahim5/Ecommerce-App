"use client";
import React, {useState} from 'react';
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Loader} from "lucide-react";
import {makeCashOrder, makeOnlinePayment} from "@/actions/payment.action";
import {useCart} from "@/app/context/CartContext";
import axios from "axios";
import toast from "react-hot-toast";


export default function CheckoutPage() {

    type PaymentMethod = "cash" | "card";

    interface Inputs {
        details: string;
        phone: string;
        city: string;
    }

    const {cartDetails, fetchCart, setCartDetails} = useCart();
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash'); // payment is cash by default

    async function onSubmit(values: Inputs) {
        setLoading(true);
        if (paymentMethod === "cash") {
            try {
                const response = await makeCashOrder(cartDetails?.cartId as string, {shippingAddress: values});
                if (response?.data.status === "success") {
                    setErrorMessage(null);
                    setCartDetails(null);
                    toast.success("Order Placed Successfully");
                    await fetchCart();
                    router.push("/");
                }
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    toast.error("Something went wrong");
                    setErrorMessage(error.message);
                }
            } finally {
                setLoading(false);
            }
        } else if (paymentMethod === 'card') {
            try {
                const response = await makeOnlinePayment(cartDetails?.cartId as string, values);
                if (response?.data.status === "success") {
                    setErrorMessage(null);
                    window.location.href = response?.data.session?.url;
                    toast.success("Order Placed Successfully");
                }
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    toast.error("Something went wrong");
                    setErrorMessage(error.message);
                }
            } finally {
                setLoading(false);
            }
        }

    }

    return (
        <div className={`my-30 font-[Poppins] px-4 sm:px-6 lg:px-8`}>
            <div className="w-full md:w-3/4 lg:w-1/2 mx-auto">
                <h2 className="text-2xl md:text-3xl mb-5 md:text-start font-bold uppercase font-[Poppins] text-[#222222]">Checkout</h2>
                {errorMessage && <p className="text-red-500 text-center text-sm md:text-lg">{errorMessage}</p>}
                <p className="text-sm md:text-lg text-[#555] text-start">Please fill in the form below to complete your
                    order.</p>
                <form onSubmit={handleSubmit(onSubmit)} className={`mt-5`}>
                    <Input {...register("details", {required: "Shipping Details are Required"})}
                           className="p-3 md:p-5 my-3 md:my-5 focus-visible:ring-[#717FE080]"
                           type="text"
                           placeholder="Shipping Details"/>
                    {errors.details && <p className="text-red-500 text-sm">{errors.details.message}</p>}
                    <Input {...register("phone", {required: "Phone Number is Required"})}
                           className="p-3 md:p-5 my-3 md:my-5 focus-visible:ring-[#717FE080]"
                           type="text" placeholder="Phone Number"/>
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    <Input {...register("city", {required: "City is Required"})}
                           className="p-3 md:p-5 my-3 md:my-5 focus-visible:ring-[#717FE080]"
                           type="text" placeholder="City"/>
                    {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                    <div className="flex flex-col sm:flex-row items-center justify-between sm:gap-5 mt-5">
                        <RadioGroup onValueChange={(value) => {
                            setPaymentMethod(value as PaymentMethod);
                        }} className={`flex gap-4 mb-4 sm:mb-0`} defaultValue="cash">
                            <div className="flex items-center space-x-2 group cursor-pointer">
                                <RadioGroupItem value="cash" id="cash" className={`cursor-pointer`}/>
                                <Label htmlFor="cash" className={`group-hover:text-[#717FE0] cursor-pointer transition-all duration-400 text-sm`}>Cash Payment</Label>
                            </div>
                            <div className="flex items-center space-x-2 group cursor-pointer">
                                <RadioGroupItem value="card" id="card" className={`cursor-pointer`}/>
                                <Label htmlFor="card" className={`group-hover:text-[#717FE0] cursor-pointer transition-all duration-400 text-sm`}>Card Payment</Label>
                            </div>
                        </RadioGroup>
                        <Button type={"submit"} disabled={loading}
                                className={`w-full sm:w-auto px-6 py-3 md:px-10 md:my-5 cursor-pointer bg-black rounded-[22px] hover:bg-[#717FE0] hover:text-white border-1 transition-all duration-400 border-[#e6e6e6] text-white uppercase font-[Poppins]`}>
                            {loading ? <Loader className={`animate-spin`} size={20}/> : "Place Order"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

