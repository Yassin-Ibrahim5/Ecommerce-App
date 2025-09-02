"use server";
import axios from "axios";

async function getCategories() {
    try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
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
    }
}

export {
    getCategories,
}