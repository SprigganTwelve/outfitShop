import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
    params
} : {
    children: React.ReactNode;
    params: { storeId: number }
}) {
    const { userId }: { userId: string | null } = await auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const store = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if(!store){
        redirect('/')
    }
    return (
        <>
            <div>This will be a navbar</div>
            {children}
        </>
    )
}