"use client"

import * as z from 'zod';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Category, 
         Color, 
         Image, 
         Product, 
         Size } from '@prisma/client'
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
    FormMessage, 
    FormDescription} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useParams, useRouter } from 'next/navigation';
import { AlertModal } from '@/components/modals/alert-modal';
import ImageUpload from '@/components/ui/image-upload';
import { Select, 
         SelectContent, 
         SelectItem, 
         SelectTrigger, 
         SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';




const formSchema = z.object({
    name: z.string().min(1),
    images: z.object({ url: z.string() }).array(),
    price: z.coerce.number().min(1),
    categoryId: z.string().min(1),
    colorId: z.string().min(1),
    sizeId: z.string().min(1),
    isFeatured: z.boolean().default(false).optional(),
    isAborted: z.boolean().default(false).optional(),
})

type ProductFormValue = z.infer<typeof formSchema>

interface ProductFormProps {
    initialData:     Product & {
        images :     Image[]
    } | null;
    categories :     Category[];
    colors     :     Color[];
    sizes      :     Size[]
}


export const ProductForm: React.FC<ProductFormProps> = ({
    initialData,
    categories,
    colors,
    sizes
}) => {
    const params = useParams()
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const title = initialData ? "Edit product": "Create product"
    const description = initialData ? "Edit product": "Add a new product"
    const toastMessage = initialData ? "Product updated": "Product created"
    const action = initialData ? "Saves changes": "Create"

    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData,
            price: parseFloat(String(initialData?.price))
        } : {
            name: '',
            images: [],
            price: 0,
            categoryId: '',
            colorId:'',
            sizeId: '',
            isFeatured: false,
            isAborted: false
        }
    })

    const onSubmit = async (data: ProductFormValue ) => {
       try{
            setLoading(true)
            if(initialData){
                await axios.patch(`/api/${params.storeId}/products/${params.productId}`, data)
            }else {
                await axios.post(`/api/${params.storeId}/products`, data)
            }
            router.refresh()
            router.push(`/${params.storeId}/products`)
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
            await axios.delete(`/api/${params.storeId}/products/${params.productId}`)
            router.refresh()
            router.push(`/${params.storeId}/products`)
            toast.success("Product deleted")
        }catch(error){
            toast.error("Something went wrong")
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
                    <FormField 
                                name='images'
                                control={form.control}
                                render={ ({field}) => (
                                    <FormItem>
                                        <FormLabel>Images</FormLabel>
                                        <FormControl>
                                            <ImageUpload 
                                                value={field.value.map((image) => image.url)}
                                                disabled={loading}
                                                onChange={(url) => {
                                                    field.onChange((prevImages: Image[]) => {
                                                        const updatedImages = [...(prevImages || []), { url }];
                                                        console.log("Updated Images (onChange with functional update):", updatedImages);
                                                        return updatedImages;
                                                    });
                                                }}
                                                onRemove={(url) => {
                                                    field.onChange((prevImages: Image[]) => {
                                                        const updatedImages = (prevImages || []).filter((current) => current.url !== url);
                                                        console.log("Updated Images (onRemove with functional update):", updatedImages);
                                                        return updatedImages;
                                                    });
                                                }}
                                            />
                                            </FormControl>
                                            <FormMessage />
                                    </FormItem>
                            )}
                        />
                        <div className='grid grid-cols-3 gap-8'>
                        <FormField 
                            name='name'
                            control={form.control}
                            render={ ({field}) => (
                                <FormItem >
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='Product name' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                        )}
                        />
                        <FormField 
                            name='price'
                            control={form.control}
                            render={ ({field}) => (
                                <FormItem >
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input type='number' disabled={loading} placeholder='9.99' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                        )}
                        />
                        <FormField 
                            name='categoryId'
                            control={form.control}
                            render={ ({field}) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange= {field.onChange} 
                                            disabled={loading} 
                                            defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue defaultValue={field.value}
                                                                     placeholder="Select a category"
                                                        />                                                 
                                                    </SelectTrigger>
                                                </FormControl>
                                                <FormMessage/>
                                                <SelectContent>
                                                    { categories.map((category)=>(
                                                        <SelectItem 
                                                            key={category.id}
                                                            value={category.id}
                                                        >
                                                            {category.name}
                                                        </SelectItem>

                                                    ))}
                                                </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField 
                            name='sizeId'
                            control={form.control}
                            render={ ({field}) => (
                                <FormItem>
                                    <FormLabel>Size</FormLabel>
                                    <Select onValueChange= {field.onChange} 
                                            disabled={loading} 
                                            defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue defaultValue={field.value}
                                                                     placeholder="Select a size"
                                                        />                                                 
                                                    </SelectTrigger>
                                                </FormControl>
                                                <FormMessage/>
                                                <SelectContent>
                                                    { sizes.map((size)=>(
                                                        <SelectItem 
                                                            key={size.id}
                                                            value={size.id}
                                                        >
                                                            {size.name}
                                                        </SelectItem>

                                                    ))}
                                                </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField 
                            name='colorId'
                            control={form.control}
                            render={ ({field}) => (
                                <FormItem>
                                    <FormLabel>Color</FormLabel>
                                    <Select onValueChange= {field.onChange} 
                                            disabled={loading} 
                                            defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue defaultValue={field.value}
                                                                     placeholder="Select a color"
                                                        />                                                 
                                                    </SelectTrigger>
                                                </FormControl>
                                                <FormMessage/>
                                                <SelectContent>
                                                    { colors.map((color)=>(
                                                        <SelectItem 
                                                            key={color.id}
                                                            value={color.id}
                                                        >
                                                            {color.name}
                                                        </SelectItem>

                                                    ))}
                                                </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField 
                            name='isFeatured'
                            control={form.control}
                            render={ ({field}) => (
                                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                                    <FormControl>
                                        <Checkbox 
                                            checked={field.value} 
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className='space-y-1 leading-none'>
                                        <FormLabel>Featured</FormLabel>
                                        <FormDescription>
                                            This product will appear on the home page
                                        </FormDescription>
                                    </div>
                                </FormItem>
                        )}
                        />
                        <FormField 
                            name='isArchived'
                            control={form.control}
                            render={ ({field}) => (
                                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                                    <FormControl>
                                        <Checkbox 
                                            checked={field.value} 
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className='space-y-1 leading-none'>
                                        <FormLabel>Archived</FormLabel>
                                        <FormDescription>
                                            This product will appear not anywhere in the store
                                        </FormDescription>
                                    </div>
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