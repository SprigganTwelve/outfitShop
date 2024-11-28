import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

export const revalidate = 0

const HomePage = async () => {
    const products = await getProducts({ isFeatured: true})
    const billboard = await getBillboard("117d3899-5876-484e-ac5e-8d9f8fe6c566")
    return ( 
        <Container>
            <div className="space-y-10 pb-10">
                <Billboard data={billboard} />
            </div>
            <div className=" flex flex-col gap-y-8 px- sm:px-6 lg:px-8" >
                <ProductList title="Featured Product" items={products} />
            </div>
        </Container>
    );
}

export default HomePage