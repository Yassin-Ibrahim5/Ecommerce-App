"use server";
import axios from "axios";

async function getProducts() {
    try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
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

export {
    getProducts,
}