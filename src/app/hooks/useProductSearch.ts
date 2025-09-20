import {useEffect, useMemo, useState} from "react";
import Fuse from "fuse.js";
import {Product} from "@/app/types/product.model";

function useDebounced<T>(value: T, delay = 250) {
    const [v, setV] = useState(value);
    useEffect(() => {
        const timeout = setTimeout(() => setV(value), delay);
        return () => clearTimeout(timeout);
    }, [value, delay]);
    return v;
}

export function useProductSearch(products: Product[], term: string) {
    const debouncedTerm = useDebounced(term, 250);
    const fuse = useMemo(() => {
        return new Fuse(products, {
            keys: ['title', 'description', 'category.name', 'brand.name'],
            threshold: 0.35,
            ignoreLocation: true,
        })
    }, [products]);

    return useMemo(() => {
        if (!debouncedTerm.trim()) return products;
        return fuse.search(debouncedTerm).map(result => result.item);
    }, [debouncedTerm, fuse, products]);
}