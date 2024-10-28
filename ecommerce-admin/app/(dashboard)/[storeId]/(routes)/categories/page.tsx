import prismadb from "@/lib/prisma";
import { BillboardClient } from "./components/client"
import { format } from "date-fns"
import { BillboardColumn } from "./components/columns";


const BillboardsPage = async ({
    params
} : {
    params: { storeId: string }
}) => {
    const { storeId } = await params
    const billboards = await prismadb.billboard.findMany({
        where:{
            storeId: storeId
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const formattedBillboard: BillboardColumn[] = billboards.map(item => ({
        id: item.id,
        label: item.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient data={formattedBillboard} />
            </div>     
        </div>
    );
};

export default BillboardsPage; 