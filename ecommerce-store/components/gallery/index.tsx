"use client"

import { Image } from "@/types"
import { TabGroup, TabList } from "@headlessui/react"
import GalleryTab from "./gallery-tab"

interface GalleryProps{
    images: Image[]
}

const Gallery: React.FC<GalleryProps> = (
    {
        images
    }
) => {
    return ( 
       <TabGroup as="div" className="flex flex-col-reverse">
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
               <TabList className="grid drid-cols-4 gap-6">
                    {images.map((item) => (
                        <GalleryTab key={item.id} image = {item}/>
                    ))}
               </TabList>
            </div>
       </TabGroup>
     );
}
 
export default Gallery;