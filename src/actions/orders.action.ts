import axios from "axios";

async function getUserOrders(userId: string) {
    try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
        return {
            data: response?.data,
            status: response?.status,
        };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return {
                data: [],
                status: error.response?.status ?? 500,
            }
        }
        return {
            data: [],
            status: 500,
        }
    }
}

export {getUserOrders};