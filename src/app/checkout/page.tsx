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
                console.log(response);
                if (response?.data.status === "success") {
                    setErrorMessage(null);
                    setCartDetails(null);
                    toast.success("Order Placed Successfully");
                    await fetchCart();
                    router.push("/");
                }
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    console.log(error.message);
                    toast.error("Something went wrong");
                    setErrorMessage(error.message);
                }
            } finally {
                setLoading(false);
            }
        } else if (paymentMethod === 'card') {
            try {
                const response = await makeOnlinePayment(cartDetails?.cartId as string, values);
                console.log(response);
                if (response?.data.status === "success") {
                    setErrorMessage(null);
                    window.location.href = response?.data.session?.url;
                    toast.success("Order Placed Successfully");
                }
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    console.log(error.message);
                    toast.error("Something went wrong");
                    setErrorMessage(error.message);
                }
            } finally {
                setLoading(false);
            }
        }

    }

    return (
        <div>
            <div className="w-1/2 mx-auto my-10">
                <h2 className="text-3xl tracking-tighter font-bold mb-1">Checkout</h2>
                {errorMessage && <p className="text-red-700 text-center text-lg">{errorMessage}</p>}
                <p className="text-lg tracking-tighter">Please fill in the form below to complete your order.</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input {...register("details", {required: "Shipping Details are Required"})} className="p-5 my-5"
                           type="text"
                           placeholder="Shipping Details"/>
                    {errors.details && <p className="text-red-700">{errors.details.message}</p>}
                    <Input {...register("phone", {required: "Phone Number is Required"})} className="p-5 my-5"
                           type="text" placeholder="Phone Number"/>
                    {errors.phone && <p className="text-red-700">{errors.phone.message}</p>}
                    <Input {...register("city", {required: "City is Required"})} className="p-5 my-5"
                           type="text" placeholder="City"/>
                    {errors.city && <p className="text-red-700">{errors.city.message}</p>}
                    <div className="flex items-center gap-5">
                        <Button type={"submit"} disabled={loading} className="px-10 py-5 my-5 cursor-pointer">
                            {loading ? <Loader className={`animate-spin`} size={20}/> : "Place Order"}
                        </Button>
                        <RadioGroup onValueChange={(value) => {
                            setPaymentMethod(value as PaymentMethod);
                        }} className={`flex`} defaultValue="cash">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="cash"
                                                id="cash"/>
                                <Label htmlFor="cash">Cash Payment</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="card" id="card"/>
                                <Label htmlFor="card">Card Payment</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </form>
            </div>
        </div>
    );
}

