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
    _id: string;
    name: string;
    slug: string;
    category: string;
}

export interface CartProduct {
    _id: string;
    count: number;
    price: number;
    product: {
        _id: string;
        id: string;
        title: string;
        imageCover: string;
        quantity: number;
        ratingsAverage: number;
        brand: Brand;
        category: Category;
        subcategory: SubCategory[];
    }
}

export interface CartData {
    cartId: string;
    data: {
        cartOwner: string;
        createdAt: string;
        products: CartProduct[];
        totalCartPrice: number;
        updatedAt: string;
        __v: number;
        _id: string;
    }
    numOfCartItems: number;
    status: string;
}