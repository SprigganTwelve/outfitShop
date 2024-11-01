import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";



export async function GET (
    req: Request,
    { params }: { params: {  categoryId: string }}
){
    try{

        if(!params.categoryId){
            return new NextResponse("Billboard is required", { status: 401 });
        }


        const category = await prismadb.category.findUnique({
            where:{
                id: params.categoryId,
            }
        })

        return NextResponse.json(category)

    }catch(error){
        console.log('[CATEGORY_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}


export async function PATCH (
    req: Request,
    { params }: { params: { storeId: string,  categoryId: string }}
){
    try{
        const { userId }: { userId: string | null } = await auth()
        const body = await req.json()

        const {  name, billboardId } = body

        if(!userId){
            return new NextResponse("Unathenticated", { status: 401 });
        }

        if(!name){
            return new NextResponse("Label is required", { status: 401 });
        }
        if(!billboardId){
            return new NextResponse("Image Url is required", { status: 401 });
        }
        
        if(!params.categoryId){
            return new NextResponse("category Id id is required", { status: 401 });
        }


        const storebByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if(!storebByUserId){
            return new NextResponse( "Unauthorized", { status: 403 } );
        }

        const category = await prismadb.category.updateMany({
            where:{
                id: params.categoryId,
            },
            data:{
                name,
                billboardId
            }
        })

        return NextResponse.json(category)

    }catch(error){
        console.log('[CATEGORY_PATCH]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}



export async function DELETE (
    req: Request,
    { params }: { params: { storeId: string,  categoryId: string }}
){
    try{
        const { userId }: { userId: string | null } = await auth()

        if(!userId){
            return new NextResponse("Unathenticated", { status: 401 });
        }
        
        if(!params.categoryId){
            return new NextResponse("BCategory is required", { status: 401 });
        }


        const storebByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if(!storebByUserId){
            return new NextResponse( "Unauthorized", { status: 403 } );
        }


        const category = await prismadb.category.deleteMany({
            where:{
                id: params.categoryId,
            }
        })

        return NextResponse.json(category)

    }catch(error){
        console.log('[CATEGORY_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}