import {Product} from "@/app/types/product.model";

export interface ProductDetail extends Product {
    reviews: Review[];
    __v?: number;
}

interface Review {
    [key: string]: unknown;
}