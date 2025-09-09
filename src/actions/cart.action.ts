import axios from "axios";
import {getUserToken} from "@/lib/token.utils";

async function getUserCart() {
    try {
        const token = await getUserToken();
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: {
                token: token as string
            }
        });
        return {
            data: response?.data,
            status: response?.status,
            message: response?.data.message,
        };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return {
                data: [],
                status: error.response?.status ?? 500,
                message: error.response?.data.message || "Something went wrong. Please try again later.",
            };
        }
        return {
            data: [],
            status: 500,
            message: "Something went wrong. Please try again later.",
        };
    }
}

async function addToCart(productId: string) {
    try {
        const token = await getUserToken();
        const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {productId}, {
            headers: {
                token: token as string
            }
        });
        return {
            data: response?.data,
            status: response?.status,
            message: response?.data.message,
        };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return {
                data: [],
                status: error.response?.status ?? 500,
                message: error.response?.data.message || "Something went wrong. Please try again later.",
            };
        }
        return {
            data: [],
            status: 500,
            message: "Something went wrong. Please try again later.",
        };
    }
}

async function removeFromCart(productId: string) {
    try {
        const token = await getUserToken();
        const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            headers: {
                token: token as string
            }
        });
        console.log(response, "remove from cart");
        return {
            data: response?.data,
            status: response?.status,
            message: response?.data.message,
        };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return {
                data: [],
                status: error.response?.status ?? 500,
                message: error.response?.data.message || "Something went wrong. Please try again later.",
            };
        }
        return {
            data: [],
            status: 500,
            message: "Something went wrong. Please try again later.",
        };
    }
}
export {getUserCart, addToCart, removeFromCart}