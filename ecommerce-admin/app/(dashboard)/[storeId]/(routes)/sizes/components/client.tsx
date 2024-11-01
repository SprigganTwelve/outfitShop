"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { SizeColumn, 
         columns 
        } from "./columns"
import { DataTable } from "@/components/ui/data-table-ui"
import { ApiList } from "@/components/ui/api-list"

interface SizeClientProps {
    data: SizeColumn[]
}

export const SizeClient: React.FC<SizeClientProps> = ({
    data
}) =>{
    const router = useRouter()
    const params = useParams()

    return(
        <> 
            <div className="flex items-center justify-between">
                <Heading
                   title={`Sizes (${data.length})`}
                   description="Manage sizes for your store"
                />
                <Button onClick={ () => router.push(`/${params.storeId}/sizes/new`) }>
                    <Plus className="mr-2 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="Name" columns={columns} data={data} />
            <Heading
                title="Api"
                description="Api calls for sizes"
            />
            <Separator />
            <ApiList 
                entityName="sizes"
                entityIdName="sizeId"
            />
        </>
    )
} 