"use server";
import axios from "axios";
import {cookies} from "next/headers";
import {decode} from "next-auth/jwt";
import {getUserToken} from "@/lib/token.utils";

export default async function getUserCart() {
    try {
        const token = await getUserToken();
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: {
                token: token as string,
            }
        });

        console.log(response?.data, "user cart");
        return {
            data: response?.data,
            status: response?.status,
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