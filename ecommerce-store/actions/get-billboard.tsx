import { Billboard } from "@/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`

const getBillboard = async (id: string): Promise<Billboard[]>  => {
    const res = await axios.get(`${URL}/${id}`)
    console.log(res.data)
    return res.data
} 

export default getBillboard