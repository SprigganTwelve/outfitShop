import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Navbar  from "@/components/navabar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
    params
} : {
    children: React.ReactNode;
    params: { storeId: string }
}) {
    const { userId }: { userId: string | null } = await auth()
    const { storeId } = await params

    if (!userId) {
        redirect('/sign-in')
    }

    const store = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId
      }
    })

    if(!store){
        redirect('/')
    }
    
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}