import prismadb from "@/lib/prisma";
import { OrderClient } from "./components/client"
import { format } from "date-fns"
import { OrderColumn } from "./components/columns";
import { formatter } from "@/lib/utils";


const OrdersPage = async ({
    params
} : {
    params: { storeId: string }
}) => {
    const { storeId } = await params
    const orders = await prismadb.order.findMany({
        where:{
            storeId: storeId
        },
        include:{
            orderItems:{
                include:{
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })
 
    const formattedOders: OrderColumn[] = orders.map(item => ({
        id: item.id,
        phone: item.address,
        address: item.address,
        products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
        totalPrice: formatter.format(item.orderItems.reduce((total, item) => {
            return total + Number(item.product.price)
        }, 0)),
        isPaid: item.isPaid,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data={formattedOders} />
            </div>     
        </div>
    );
};

export default OrdersPage; 