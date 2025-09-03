import {getProducts} from "@/actions/products.action";
import ProductsGridSystem from "@/components/products-comps/ProductsGridSystem";

export default async function ProductsPage() {
    const {data : products} = await getProducts();
    return (
        <div>
            <ProductsGridSystem products={products}/>
        </div>
    );
}
