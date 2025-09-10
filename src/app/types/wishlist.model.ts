export interface Brand {
    image: string;
    name: string;
    slug: string;
    _id: string;
}

export interface Category {
    image: string;
    name: string;
    slug: string;
    _id: string;
}

export interface SubCategory {
    category: string;
    name: string;
    slug: string;
    _id: string;
}

export interface Product {
    brand: Brand;
    category: Category;
    createdAt: string;
    description: string;
    id: string;
    imageCover: string;
    images: string[];
    price: number;
    quantity: number;
    ratingsAverage: number;
    ratingsQuantity: number;
    slug: string;
    sold: number;
    subcategory: SubCategory[];
    title: string;
    updatedAt: string;
    __v: number;
    _id: string;
}

export interface Wishlist {
    status: string;
    count: number;
    data: Product[];
}