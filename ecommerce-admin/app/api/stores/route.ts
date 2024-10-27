import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server'
import prismadb from "@/lib/prisma";

export async function POST(
    req: Request
){
    try {
        const { userId }: { userId: string | null } = await auth()
        const body = await req.json();

        const { name } = body;

        
        if (!userId) {
            return new NextResponse( "Unauthorized", { status: 401 } );
        }

        if (!name) {
            return new NextResponse( "Name is required", { status: 400 } );
        }

        const store = await prismadb.store.create({
            data: {
                name,
                userId
            }
        })

        return NextResponse.json(store)

    } catch (error) {
        console.log('[STORES_POST]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
