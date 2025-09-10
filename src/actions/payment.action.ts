"use server";
import {getUserToken} from "@/lib/token.utils";
import axios from "axios";

interface ShippingAddressTypes {
    details: string;
    phone: string;
    city: string;
}

async function makeCashOrder(cartId: string, shippingAddress: {shippingAddress: ShippingAddressTypes}) {
    try {
        const token = await getUserToken();
        const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {shippingAddress}, {
            headers: {
                token: token as string
            }
        });
        console.log(response.data, "make cash order");
        return {
            data: response?.data,
            status: response?.status,
            message: response?.data.message,
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return {
                data: [],
                status: error.response?.status ?? 500,
                message: error.response?.data.message || "Something went wrong. Please try again later.",
            }
        }
        return {
            data: [],
            status: 500,
            message: "Something went wrong. Please try again later.",
        }
    }
}

export {makeCashOrder};