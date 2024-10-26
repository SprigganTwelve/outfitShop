import prismadb from "@/lib/prisma";

interface DashboardPagePropos {
    params: { storeId: string}
}


const DashboardPage: React.FC<DashboardPagePropos> = async ({
    params
}) => {
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId
        }
    })
    return ( 
        <div>
            Active Store: {store?.name}
        </div>
     );
}
 
export default DashboardPage;