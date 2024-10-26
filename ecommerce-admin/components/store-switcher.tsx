"use client"

import { 
        Popover,
        PopoverContent,
        PopoverTrigger 
        } from "@/components/ui/popover"
import { 
        Command,
        CommandList , 
        CommandEmpty, 
        CommandInput,  
        CommandGroup, 
        CommandItem, 
        CommandSeparator
        } from "@/components/ui/command"
import { 
        useParams, 
        useRouter 
        } from "next/navigation"
import { 
        Check,
        ChevronsUpDown, 
        PlusCircle, 
        Store as StoreIcon 
        } from "lucide-react"
import { useState } from "react"
import { Store } from '@prisma/client'
import { cn } from "@/lib/utils"

import { useStoreModal } from "@/hooks/use-store-model"
import { Button } from "@/components/ui/button"

type PopoverTriggerProps = React.ComponentPropsWithRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[]
}


export default function StoreSwitcher({
    className,
    items = []
}: StoreSwitcherProps ) {
    const storeModal = useStoreModal();
    const params = useParams()
    const router = useRouter()

    const formattedItem = items.map((item)=> ({
        label: item.name,
        value: item.id
    }))
    
    const currentStore = formattedItem.find( (item) => item.value === params.storeId )

    const [open, setOpen] = useState(false)

    const onStoreSelect = (store: {value: string, label: string } ) => {
        setOpen(false)
        router.push(`/${store.value}`)
    }

    return(
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button 
                    variant="outline"
                    size="sm"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a store"
                    className={cn("w-[200px] justify-between", className)}
                >
                    <StoreIcon className="mr-2 h-4 w-4" />
                     {currentStore?.value}
                    <ChevronsUpDown className="ml-auto h-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Command >
                    <CommandList>
                        <CommandInput placeholder="Search store" />
                        <CommandEmpty>No store found</CommandEmpty>
                        <CommandGroup heading="Store">
                            {formattedItem.map((store) => (
                                <CommandItem 
                                    key={store.value}
                                    onSelect={() => onStoreSelect(store)}
                                    className="text-sm"
                                >
                                    <StoreIcon className="mr-2 h-4 w-4 "/>
                                     {store.label}
                                    <Check 
                                       className={cn(
                                        "ml-auto h-4 w-4",
                                        currentStore?.value === store.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                       )}
                                    />

                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={()=>{
                                    setOpen(false)
                                    storeModal.onOpen()
                                }}
                            >
                                <PlusCircle className="mr-2 h-5 w-5"/>
                                CreateStore
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}