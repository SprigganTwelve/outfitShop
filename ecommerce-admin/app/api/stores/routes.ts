import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server'
import { supabase } from "@/lib/supabaseClient";

export async function POST(
    req: Request
) {
    try {
        const { userId }: { userId: string | null } = await auth()

        const body = await req.json();
        const { name } = body;

        
        if (!userId) {
            return new NextResponse( "Unauthorized", { status: 401 } );
        }

        if ( !name ) {
            return new NextResponse( "Name is required", { status: 400 } );
        }


        const { data, error } = await supabase
        .from('Store')
        .insert([{ name, userId }]);
    
        if (error) {
            console.error(error);
            return new NextResponse("Erreur lors de l'insertion", { status: 500 });
        }
    
        return NextResponse.json(data);

    } catch (err) {
        console.log('[STORE_POST]', err);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
