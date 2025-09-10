"use server";
import axios from "axios";
import {useCart} from "@/app/context/CartContext";

async function getUserOrders(userId: string) {

    try {

        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
        return {
            data: response?.data,
            status: response?.status,
            message: response?.data.message,
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return {
                data: [],
                status: error.response?.status,
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

export {getUserOrders};