import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server'
import prismadb from "@/lib/prisma";

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
){
    try {
        const { userId }: { userId: string | null } = await auth()
        const body = await req.json();

        const { name, value } = body;

        
        if (!userId) {
            return new NextResponse( "Unauthenticated", { status: 401 } );
        }

        if (!value) {
            return new NextResponse( "Value is required", { status: 400 } );
        }

        if (!value) {
            return new NextResponse( "Value is required", { status: 400 } );
        }

        if(!params.storeId){
            return new NextResponse( "Store id is required", { status: 400 } );
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

        const color = await prismadb.color.create({
            data: {
                name,
                value,
                storeId: params.storeId
            }
        })

        return NextResponse.json(color)

    } catch (error) {
        console.log('[COLOR_POST]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}



export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
){
    try {

        if(!params.storeId){
            return new NextResponse( "Store id is required", { status: 400 } );
        }


        if(!params.storeId){
            return new NextResponse( "Store id is required", { status: 400 } );
        }


        const colors = await prismadb.size.findMany({
           where: {
            storeId: params.storeId
           }
        })

        return NextResponse.json(colors)

    } catch (error) {
        console.log('[COLORS_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
