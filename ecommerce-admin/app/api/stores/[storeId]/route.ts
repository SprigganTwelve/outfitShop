import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH (
    req: Request,
    { params }: { params: { storeId: string }}
){
    try{
        const { userId }: { userId: string | null } = await auth()
        const body = await req.json()

        const {  name } = body

        if(!userId){
            return new NextResponse("Unathenticated", { status: 401 });
        }

        if(!name){
            return new NextResponse("name is required", { status: 401 });
        }
        
        if(!params.storeId){
            return new NextResponse("name is required", { status: 401 });
        }

        const store = await prismadb.store.updateMany({
            where:{
                id: params.storeId,
                userId
            },
            data:{
                name
            }
        })

        return NextResponse.json(store)

    }catch(error){
        console.log('[STORE_PATCH]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}



export async function DELETE (
    req: Request,
    { params }: { params: { storeId: string }}
){
    try{
        const { userId }: { userId: string | null } = await auth()

        if(!userId){
            return new NextResponse("Unathenticated", { status: 401 });
        }
        
        if(!params.storeId){
            return new NextResponse("name is required", { status: 401 });
        }

        const store = await prismadb.store.deleteMany({
            where:{
                id: params.storeId,
                userId
            }
        })

        return NextResponse.json(store)

    }catch(error){
        console.log('[STORE_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}