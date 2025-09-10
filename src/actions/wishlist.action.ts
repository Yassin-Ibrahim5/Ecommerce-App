import axios from "axios";
import {getUserToken} from "@/lib/token.utils";

async function getWishlist() {
    try {
        const token = await getUserToken();
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers: {
                token: token as string
            }
        });
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

async function addToWishlist(productId: string) {
    try {
        const token = await getUserToken();
        const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {productId}, {
            headers: {
                token: token as string
            }
        });
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

async function removeFromWishlist(productId: string) {
    try {
        const token = await getUserToken();
        const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            headers: {
                token: token as string
            }
        });
        console.log(response, "remove from wishlist");
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

export {getWishlist, addToWishlist, removeFromWishlist};