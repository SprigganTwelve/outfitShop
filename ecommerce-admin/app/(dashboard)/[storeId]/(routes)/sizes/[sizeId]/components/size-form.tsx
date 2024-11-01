"use client"

import * as z from 'zod';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Size } from '@prisma/client'
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { 
    Form, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormControl, 
    FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useParams, useRouter } from 'next/navigation';
import { AlertModal } from '@/components/modals/alert-modal';




const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1)
})

type SizeFormValue = z.infer<typeof formSchema>

interface SizeFormProps {
    initialData: Size | null;
}


export const SizeForm: React.FC<SizeFormProps> = ({
    initialData
}) => {
    const params = useParams()
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const title = initialData ? "Edit size": "Create size"
    const description = initialData ? "Edit size": "Add a new size"
    const toastMessage = initialData ? "size updated": "size created"
    const action = initialData ? "Saves changes": "Create"

    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            value: ''
        }
    })

    const onSubmit = async (data: SizeFormValue ) => {
       try{
            setLoading(true)
            if(initialData){
                await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data)
            }else {
                await axios.post(`/api/${params.storeId}/sizes`, data)
            }
            router.refresh()
            router.push(`/${params.storeId}/sizes`)
            toast.success(toastMessage)
       }catch(error){
           toast.error("Something went wrong")
            console.log(error)
       }
       finally{
            setLoading(false)
       }

    }

    const onDelete = async () =>{
        try{
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
            router.refresh()
            router.push(`/${params.storeId}/sizes`)
            toast.success("Size deleted")
        }catch(error){
            toast.error("Make sure you removed all products using this size first.")
            console.log(error)
        }
        finally{
            setLoading(false)
            setOpen(false)
        }
    }

    return(
        <>
            <AlertModal 
                isOpen = {open}
                onClose = {()=> setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className='flex items-center justify-between'>
                <Heading
                    title = {title}
                    description = {description}
                /> 
                {
                    initialData && (
                        <Button
                        disabled = {loading}
                        variant='destructive'
                        size="icon"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                    )
                }
            </div>
            <Separator/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                        <div className='grid grid-cols-3 gap-8'>
                        <FormField 
                            name='name'
                            control={form.control}
                            render={ ({field}) => (
                                <FormItem >
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='Size name' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                        )}
                        />
                        <FormField 
                            name='value'
                            control={form.control}
                            render={ ({field}) => (
                                <FormItem >
                                    <FormLabel>value</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='Value name' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                        )}
                        />
                    </div>
                    <Button disabled={loading} className='ml-auto' type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    )   
}