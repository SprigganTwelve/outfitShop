import { Product } from "@/types";
import qs from "query-string"
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`

interface Query{
    categoryId?: string;
    colorId?: string;
    sizeId?: string;
    isFeatured?: boolean
}

const getProducts = async (query: Query): Promise<Product[]>  => {
    const url = qs.stringifyUrl({
        url: URL,
        query:{
            colorId: query.colorId,
            sizedId: query.sizeId,
            categoryId: query.categoryId,
            isFeatured: query.isFeatured
        }
    })
    const res = await axios.get(url)
    console.log(res.data)
    return res.data
}

export default getProducts