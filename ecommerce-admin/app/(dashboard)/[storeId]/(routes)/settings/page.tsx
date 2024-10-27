import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SettingsForm } from "./component/settings-form";

interface SettingsPageProps {
    params: {
        storeId: string
    }
}

const SettingsPage: React.FC<SettingsPageProps> = async (
    { params }
) => {
    const { userId }: { userId: string| null } = await  auth()
    const { storeId } = await params 

    if (!userId) {
        redirect('/sign-in')
    }

    const store = await prismadb.store.findFirst({
        where:{
            id: storeId,
            userId
        }
    })

    if (!store) {
        redirect('/')
    }

    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                 <SettingsForm initialData={store} />
            </div>
        </div>
     );
}
 
export default SettingsPage;