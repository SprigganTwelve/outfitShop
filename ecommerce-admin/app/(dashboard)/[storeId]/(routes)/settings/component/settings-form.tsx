"use client"

import * as z from 'zod';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Store } from '@prisma/client'
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
import { ApiAlert } from '@/components/ui/api-alert';
import { useOrigin } from '@/hooks/use-origin';

interface SettingsFormProps {
    initialData: Store;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
    initialData
}) => {
    const params = useParams()
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const origin = useOrigin()

    const formSchema = z.object({
        name: z.string().min(1),
    })

    type settingFormValue = z.infer<typeof formSchema>
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: initialData 
    })

    const onSubmit = async (data: settingFormValue ) => {
       try{
            setLoading(true)
            await axios.patch(`/api/stores/${params.storeId}`, data)
            router.refresh()
            toast.success("Store updated")
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
            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh()
            router.push('/')
        }catch(error){
            toast.error("Make sure you to remove all products.")
            toast.error("Something went wrong")
            console.log(error)
            toast.success("Store deleted.")
        }
        finally{
            setLoading(false)
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
                    title = "Settings"
                    description = "Manage store preferences"
                />
                <Button
                    disabled = {loading}
                    variant='destructive'
                    size="icon"
                    onClick={() => setOpen(true)}
                >
                    <Trash className="h-4 w-4" />
                </Button>
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
                                        <Input disabled={loading} placeholder='Store name' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                        )}
                        />
                    </div>
                    <Button disabled={loading} className='ml-auto' type="submit">
                        Save changes
                    </Button>
                </form>
            </Form>
            <Separator />
            <ApiAlert 
                title='NEXT_PUBLIC_API_URL'
                description={`${origin}/api/${params.storeId}`}
                variant='public'
            />
        </>
    )   
}